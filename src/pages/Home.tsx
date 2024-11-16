import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
// @ts-ignore
import PatientTable from "../component/PatientTable";

const Home = () => {
  const [allPatients, setAllPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await invoke("get_all_patients") as any[]; // Call the Tauri command to get patients
        setAllPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []); // Empty dependency array to run once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <PatientTable data={allPatients} />;
};

export default Home;
