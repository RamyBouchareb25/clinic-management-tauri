import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

// Create the context
const MedicationContext = createContext<{
  setConsultationDetails: Dispatch<SetStateAction<{
    motif: string;
    resumeConsultation: string;
    symptomes: string;
    consultationDocuments: any[];
  }>>;
  consultationDetails: {
    motif: string;
    resumeConsultation: string;
    symptomes: string;
    consultationDocuments: any[];
  };
  setSelectedAnalyse: Dispatch<SetStateAction<any[]>>;
  selectedAnalyse: any[];
  selectedMedications: any[];
  setSelectedMedications: Dispatch<SetStateAction<any[]>>;
  currentPatient: any;
  setCurrentPatient: Dispatch<SetStateAction<any>>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  patientId: any;
  setPatientId: Dispatch<SetStateAction<any>>;
}>({
  setConsultationDetails: () => {},
  consultationDetails: {
    motif: "",
    resumeConsultation: "",
    symptomes: "",
    consultationDocuments: [],
  },
  setSelectedAnalyse: () => {},
  selectedAnalyse: [],
  selectedMedications: [],
  setSelectedMedications: () => {},
  currentPatient: null,
  setCurrentPatient: () => {},
  activeTab: "Consultation",
  setActiveTab: () => {},
  patientId: null,
  setPatientId: () => {},
});

// Create a provider component
export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMedications, setSelectedMedications] = useState<any[]>([]); // For storing the selected medications
  const [patientId, setPatientId] = useState(null); // For storing the current patient ID
  const [currentPatient, setCurrentPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("Consultation");
  const [selectedAnalyse, setSelectedAnalyse] = useState<any[]>([]); // For storing the active tab
  const [consultationDetails, setConsultationDetails] = useState<
    | {
        motif: string;
        resumeConsultation: string;
        symptomes: string;
        consultationDocuments: any[];
      }
    | any
  >({
    motif: "",
    resumeConsultation: "",
    symptomes: "",
    consultationDocuments: [],
  });
  return (
    <MedicationContext.Provider
      value={{
        setConsultationDetails,
        consultationDetails,
        setSelectedAnalyse,
        selectedAnalyse,
        selectedMedications,
        setSelectedMedications,
        currentPatient,
        setCurrentPatient,
        activeTab,
        setActiveTab,
        patientId,
        setPatientId,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

// Custom hook to use the context
export const useMedications = () => {
  return useContext(MedicationContext);
};
