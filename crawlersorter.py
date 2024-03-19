import os
import re
import shutil
import argparse
import logging

# Setup basic configuration for logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

def find_files(directory, extensions, exclude_dirs=None, case_insensitive=True, return_relative=False):
    """Recursively finds all files within the directory that match the specified extensions."""
    exclude_dirs = set(exclude_dirs) if exclude_dirs else set()
    extensions = {ext.lower() if case_insensitive else ext for ext in extensions}

    for root, dirs, files in os.walk(directory, topdown=True):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            file_ext = os.path.splitext(file)[1]
            if case_insensitive:
                file_ext = file_ext.lower()
            if any(file_ext == ext for ext in extensions):
                file_path = os.path.join(root, file)
                yield os.path.relpath(file_path, directory) if return_relative else file_path

def build_component_map(directory, extensions, naming_convention=None, handle_duplicates='list'):
    """Builds a map of component names to their file paths."""
    component_map = {}
    for file_path in find_files(directory, extensions):
        filename = os.path.basename(file_path)
        component_name = naming_convention(filename) if naming_convention else os.path.splitext(filename)[0]
        
        if handle_duplicates == 'unique':
            unique_key = os.path.join(os.path.relpath(os.path.dirname(file_path), directory), component_name)
            component_map[unique_key] = file_path
        elif handle_duplicates == 'list':
            component_map.setdefault(component_name, []).append(file_path)
        else:
            logging.warning(f"Unknown duplicate handling strategy: {handle_duplicates}")
        
        logging.debug(f"Mapping {component_name} to {file_path}")

    return component_map

def update_import_paths(file_path, file_content, component_map, import_regex, create_backup=True):
    """Updates import paths in the given file content."""
    if create_backup:
        backup_path = f"{file_path}.bak"
        shutil.copyfile(file_path, backup_path)
        logging.info(f"Backup created at {backup_path}")

    updated_content = file_content
    for match in re.finditer(import_regex, file_content):
        component_name, static_path, dynamic_path, css_import, css_url = match.groups()
        search_path = static_path or dynamic_path or css_import or css_url
        correct_path = None

        for name, path in component_map.items():
            if search_path in path:
                correct_path = os.path.relpath(path, os.path.dirname(file_path))
                break
        
        if correct_path:
            correct_path = correct_path.replace(os.path.sep, '/')
            if not correct_path.startswith('.'):
                correct_path = './' + correct_path
            
            if file_path.endswith(('.css', '.scss')):
                correct_path = f"'{correct_path}'" if css_import or css_url else f"'{os.path.splitext(correct_path)[0]}'"
                new_import_statement = f"@import {correct_path};\n" if css_import else f"url({correct_path});\n"
            else:
                new_import_statement = f"import {{ {component_name} }} from '{os.path.splitext(correct_path)[0]}';\n"
            
            updated_content = updated_content.replace(match.group(0), new_import_statement)

    return updated_content

def main(project_directory, extensions, import_regex_pattern, dry_run=False):
    component_map = build_component_map(project_directory, extensions)

    for file_path in find_files(project_directory, extensions):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            updated_content = update_import_paths(file_path, content, component_map, import_regex_pattern)

            if content != updated_content and not dry_run:
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(updated_content)
                logging.info(f"Updated imports in {file_path}")
            elif dry_run:
                logging.info(f"Dry run: {file_path} would be updated.")
        except Exception as e:
            logging.error(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Update import paths in a project.")
    parser.add_argument("project_dir", help="The root directory of the project")
    parser.add_argument("--extensions", nargs="+", default=['.js', '.jsx', '.astro', '.ts', '.tsx', '.css', '.scss'],
                        help="File extensions to process")
    parser.add_argument("--import_regex", help="Regex pattern for matching import statements, including CSS/SCSS @import and url()")
    parser.add_argument("--dry_run", action="store_true", help="Perform a dry run without modifying files")
    parser.add_argument("--verbose", action="store_true", help="Increase output verbosity")
    args = parser.parse_args()

    # Adjust logging level based on verbose option
    logging.getLogger().setLevel(logging.DEBUG if args.verbose else logging.INFO)

    # Check if custom naming convention function is needed
    naming_convention = None
    if args.verbose:
        logging.info("Verbose mode enabled. Displaying detailed operation logs.")

    main(args.project_dir, args.extensions, args.import_regex, dry_run=args.dry_run)

