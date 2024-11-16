// lib.rs

mod db;
use db::start_mongodb;
use futures::stream::StreamExt;
use mongodb::{bson::doc, options::ClientOptions, Client, Collection};
use serde::{Deserialize, Serialize};
use std::process::Child;
use std::sync::{Arc, Mutex};
use tauri::async_runtime::spawn;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mongodb_process: Arc<Mutex<Option<Child>>> = Arc::new(Mutex::new(None));

    tauri::Builder::default()
        .setup({
            let mongodb_process = Arc::clone(&mongodb_process);
            move |app| {
                let package_info = app.package_info().clone();
                spawn(async move {
                    match start_mongodb(&package_info).await {
                        Ok(child) => {
                            let mut process_guard = mongodb_process.lock().unwrap();
                            *process_guard = Some(child);
                            println!("MongoDB started successfully");
                        }
                        Err(e) => eprintln!("Failed to start MongoDB: {}", e),
                    }
                });
                Ok(())
            }
        })
        .on_window_event({
            let mongodb_process = Arc::clone(&mongodb_process);
            move |_, event| {
                if let tauri::WindowEvent::CloseRequested { .. } = event {
                    let mut process_guard = mongodb_process.lock().unwrap();
                    if let Some(child) = process_guard.as_mut() {
                        child.kill().expect("Failed to kill MongoDB process");
                        println!("MongoDB process killed");
                    }
                }
            }
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_medicaments,
            get_all_patients,
            add_patient
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[derive(Debug, Serialize, Deserialize)]
struct Medicament {
    name: String,
    dosage: String,
    // Add other fields as necessary
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn get_medicaments() -> Result<Vec<Medicament>, String> {
    // Define the MongoDB URI
    let client_uri = "mongodb://127.0.0.1:27017";

    // Set up MongoDB client
    let client_options = match ClientOptions::parse(client_uri).await {
        Ok(options) => options,
        Err(err) => return Err(format!("Failed to parse MongoDB URI: {}", err)),
    };

    let client = match Client::with_options(client_options) {
        Ok(client) => client,
        Err(err) => return Err(format!("Failed to initialize MongoDB client: {}", err)),
    };
    // Access the database and collection
    let database = client.database("medicaments_db");
    let collection: Collection<Medicament> = database.collection("medicaments");

    // Query the collection (find all documents)
    let cursor = collection.find(doc! {}).await.map_err(|e| e.to_string())?;

    // Collect results into a vector
    let mut medicaments = Vec::new();
    // Iterate through the cursor and deserialize documents
    let mut cursor = cursor;
    while let Some(result) = cursor.next().await {
        match result {
            Ok(document) => {
                medicaments.push(document);
            }
            Err(e) => {
                return Err(format!("Error processing document: {}", e));
            }
        }
    }

    Ok(medicaments)
}

#[derive(Serialize, Deserialize)]
struct PatientData {
    nom: String,
    prenom: String,
    age: String,
    sexe: String,
    telephone: String,
    addresse: String,
    etat_civil: String,
    profession: String,
}

#[tauri::command]
async fn get_all_patients() -> Result<Vec<PatientData>, String> {
    let client_uri: &str = "mongodb://127.0.0.1:27017";
    // Set up MongoDB client
    let client_options = match ClientOptions::parse(client_uri).await {
        Ok(options) => options,
        Err(err) => return Err(format!("Failed to parse MongoDB URI: {}", err)),
    };
    let client = match Client::with_options(client_options) {
        Ok(client) => client,
        Err(err) => return Err(format!("Failed to initialize MongoDB client: {}", err)),
    };
    // Access the database and collection
    let database = client.database("patients_db");
    // Replace with your database name
    let collection: Collection<PatientData> = database.collection("patients");
    // Query the collection (find all documents)
    let cursor = collection.find(doc! {}).await.map_err(|e| e.to_string())?;
    // Collect results into a vector
    let mut patients = Vec::new();
    let mut cursor = cursor;
    while let Some(result) = cursor.next().await {
        match result {
            Ok(document) => {
                patients.push(document);
            }
            Err(e) => {
                return Err(format!("Error processing document: {}", e));
            }
        }
    }
    // Return the list of patients
    Ok(patients)
}

#[tauri::command]
async fn add_patient(data: PatientData) -> Result<String, String> {
    // Set up MongoDB client and connect to database
    let client = Client::with_uri_str("mongodb://localhost:27017")
        .await
        .map_err(|e| format!("Failed to connect to MongoDB: {}", e))?;

    // Access the database and collection
    let database = client.database("patients_db");
    let collection: Collection<PatientData> = database.collection("patients");
    // Check if the patient already exists
    let existing_patient_result = collection
        .find_one(doc! {"nom": &data.nom, "prenom": &data.prenom})
        .await;
    if let Err(e) = existing_patient_result {
        return Err(format!("Failed to check for existing patient: {}", e));
    }
    let existing_patient = existing_patient_result.unwrap();
    if existing_patient.is_some() {
        return Ok("Patient already exists".to_string());
    }
    // Insert the new patient data into MongoDB
    collection
        .insert_one(data)
        .await
        .map_err(|e| format!("Failed to insert patient: {}", e))?;
    Ok("Patient added successfully".to_string()) // Success message
}
