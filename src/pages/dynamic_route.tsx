import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import PatientComponent from "../component/PatientComponent";
import { useParams } from "react-router-dom";

// Replace the API call with the Tauri command call
const getPatient = async (id: string) => {
  try {
    // Use the invoke function to call the backend command in Rust
    const response = (await invoke("get_patient_by_id", { id })) as {
      patient: any;
      consultation: any;
    };
    return response;
  } catch (err) {
    console.error("Error fetching patient:", err);
    return { patient: null, consultation: null }; // Return null if an error occurs
  }
};

const DynamicPage = () => {
  const [patientData, setPatientData] = useState<{
    patient: any;
    consultation: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams(); // Access the dynamic route parameter
  if (!id) return <p>No patient id found</p>;
  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const response = await getPatient(id);
        setPatientData(response);
      } catch (err) {
        setError("Failed to load patient data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!patientData?.patient) return <p>No patient data found</p>;

  return (
    <>
      <PatientComponent
        patient={patientData.patient}
        consultation={patientData.consultation}
      />
    </>
  );
};

export default DynamicPage;
