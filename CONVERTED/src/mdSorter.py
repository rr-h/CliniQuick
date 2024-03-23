import os
import shutil

def move_md_files(src_dir, target_dir):
    # Check if the source directory exists
    if not os.path.exists(src_dir):
        print(f"The source directory {src_dir} does not exist.")
        return
    
    # Create the target directory if it does not exist
    os.makedirs(target_dir, exist_ok=True)
    
    # Loop through the files in the source directory
    for filename in os.listdir(src_dir):
        # Construct the full file path
        file_path = os.path.join(src_dir, filename)
        
        # Check if it is a file and has a .md extension
        if os.path.isfile(file_path) and filename.endswith('.md'):
            # Construct the destination path
            destination_path = os.path.join(target_dir, filename)
            
            # Move the file
            shutil.move(file_path, destination_path)
            print(f"Moved {filename} to {target_dir}")

if __name__ == "__main__":
    source_directory = 'pages'
    target_directory = 'content/md'
    
    move_md_files(source_directory, target_directory)
    print("Done moving .md files.")
