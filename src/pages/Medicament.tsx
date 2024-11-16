import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
// @ts-ignore
import MedicationTable from "../component/TableMedication";

const MedicamentPage = () => {
  const [medicaments, setMedicaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicaments = async () => {
      try {
        setLoading(true);
        console.log(await invoke("greet", { name:"test" }));
        const data = await invoke("get_medicaments") as any[]; // Call the Tauri command
        setMedicaments(data);
      } catch (err) {
        console.error("Error fetching medicaments:", err);
        setError("Failed to fetch medicaments");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicaments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <MedicationTable medicaments={medicaments} />;
};

export default MedicamentPage;
