use dirs::home_dir;
use std::process::{Command, Child};
use tauri::utils::platform::resource_dir;
use tauri::Env;
use tauri::PackageInfo;

// Windows-specific imports
#[cfg(windows)]
use std::os::windows::process::CommandExt;
#[cfg(windows)]
use winapi::um::winbase::CREATE_NO_WINDOW;

pub async fn start_mongodb(package_info: &PackageInfo) -> Result<Child, String> {
    if let Some(home_path) = home_dir() {
        let db_path = home_path.join(".mongodb").join("data");

        // Create the DB directory, handle potential errors
        std::fs::create_dir_all(&db_path)
            .map_err(|e| format!("Failed to create DB directory: {}", e))?;

        let env = Env::default();

        // Retrieve the resource directory, handle potential errors
        let resource_dir_result = resource_dir(&package_info, &env);
        let resource_dir = match resource_dir_result {
            Ok(dir) => dir.to_path_buf(), // Ensure ownership by converting to PathBuf
            Err(e) => return Err(format!("Failed to get resource directory: {}", e)),
        };
        println!("Resource directory: {:?}", resource_dir);
        let mongod_path = resource_dir.join("assets").join("bin").join("mongod.exe");

        // Start the MongoDB process with hidden window, handle potential errors
        let mut cmd = Command::new(mongod_path);
        cmd.arg("--dbpath").arg(&db_path);

        #[cfg(windows)]
        {
            // Set the CREATE_NO_WINDOW flag to hide the console window
            let no_window_flag = CREATE_NO_WINDOW;
            cmd.creation_flags(no_window_flag);
        }

        let child = cmd.spawn()
            .map_err(|e| format!("Failed to start MongoDB: {}", e))?;
        
        Ok(child)
    } else {
        eprintln!("Failed to get home directory");
        Err("Failed to get home directory".to_string())
    }
}