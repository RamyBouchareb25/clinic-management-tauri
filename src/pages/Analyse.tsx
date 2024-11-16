import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
// @ts-ignore
import TableAnalyse from "../component/TableAnalyse";

const AnalysesPage = () => {
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        setLoading(true);
        const data = await invoke("get_analyses") as any[]; // Call the Tauri command to get analyses
        setAnalyses(data);
      } catch (err) {
        console.error("Error fetching analyses:", err);
        setError("Failed to fetch analyses");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []); // Empty dependency array to run once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <TableAnalyse analyses={analyses} />;
};

export default AnalysesPage;
