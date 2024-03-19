import os
import re
import shutil
import argparse
import logging

# Setup basic configuration for logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

def find_files(directory, extensions):
    """Recursively finds all files in the directory with the specified extensions."""
    for root, dirs, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                yield os.path.join(root, file)

def build_component_map(directory, extensions):
    """Builds a map of component names to their file paths."""
    component_map = {}
    for file_path in find_files(directory, extensions):
        filename = os.path.basename(file_path)
        component_name = filename.split('.')[0]
        component_map[component_name] = file_path
    return component_map

def update_import_paths(file_path, file_content, component_map, import_regex, create_backup=True):
    """Updates import paths in the given file content."""
    if create_backup:
        backup_path = f"{file_path}.bak"
        shutil.copyfile(file_path, backup_path)
        logging.info(f"Backup created at {backup_path}")

    updated_content = file_content
    for match in re.finditer(import_regex, file_content):
        component_name, static_path, dynamic_path = match.groups()
        correct_path = None
        if component_name in component_map:
            correct_path = os.path.relpath(component_map[component_name], os.path.dirname(file_path))
        else:
            search_path = static_path or dynamic_path
            for name, path in component_map.items():
                if search_path in path:
                    correct_path = os.path.relpath(path, os.path.dirname(file_path))
                    break
        if correct_path:
            correct_path = correct_path.replace(os.path.sep, '/')
            if not correct_path.startswith('.'):
                correct_path = './' + correct_path
            correct_path = os.path.splitext(correct_path)[0]
            if static_path:
                new_import_statement = f"import {{ {component_name} }} from '{correct_path}';\n"
            else:
                new_import_statement = f"import(/* webpackChunkName: \"{component_name}\" */) '{correct_path}';\n"
            updated_content = updated_content.replace(match.group(0), new_import_statement)
    return updated_content

def main(project_directory, extensions, import_regex_pattern):
    component_map = build_component_map(project_directory, extensions)

    for file_path in find_files(project_directory, extensions):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            updated_content = update_import_paths(file_path, content, component_map, import_regex_pattern)
            
            if content != updated_content:
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(updated_content)
                logging.info(f"Updated imports in {file_path}")
        except Exception as e:
            logging.error(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Update import paths in a project.")
    parser.add_argument("project_dir", help="The root directory of the project")
    parser.add_argument("--extensions", nargs="+", default=['.js', '.jsx', '.astro', '.ts', '.tsx'],
                        help="File extensions to process")
    parser.add_argument("--import_regex", default=r"import\s+(?:\{\s*(\w+)\s*\}\s+from\s+)?'(.+?)';|import\((?:\/\* webpackChunkName: \"\w+\" \*\/ )?'(.+?)'\)",
                        help="Regex pattern for matching import statements")

    args = parser.parse_args()

    main(args.project_dir, args.extensions, args.import_regex)
