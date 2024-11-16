
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Consultation from "./ConsultationTab";
import DossierMedicalTab from "./DossierMedicalTab";
import InfoPersoTab from "./InfoPersoTab";
import InfoMedTab from "./InfoMedTab";
import CreateConsultTab from "./CreateConsultTab";
import CMHForm from "./CMHForm";
import CMHForm2 from "./CMHForm2";

import {
  faHospitalUser,
  faFolder,
  faPersonCircleQuestion,
  faPersonCirclePlus,
  faNotesMedical,
  faFileMedical,
  faFileWaveform,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useMedications } from "../context/MedicationContext";



const PatientComponent =

  ({ patient, consultation }: { patient: any; consultation: any }) => {
    // const [selectedTab, setSelectedTab] = useState("Consultation");
    const formData = {
      date: "2023-10-01",
      nom: "Doe",
      prenom: "John",
      dob: "1990-01-01",
      motif: "Routine Checkup",
      medicalHistory: "Hypertension, Diabetes",
      surgicalHistory: "Appendectomy in 2010",
      allergies: "Penicillin",
      treatment: "Metformin, Lisinopril",
    };
    const tabs = [
      {
        key: "Consultation",
        title: "Consultation",
        icon: (
          <FontAwesomeIcon
            icon={faNotesMedical}
            size="1x"
            color="#1e71b8"
            className="mr-2"
          />
        ),
      },
      {
        key: "Nouvelle consult",
        title: "Ajouter Consultation",
        icon: (
          <FontAwesomeIcon
            icon={faPlus}
            size="1x"
            color="#1e71b8"
            className="mr-2"
          />
        ),
      },
      {
        key: "Information Personnelle",
        title: "Info Personnelles",
        icon: (
          <FontAwesomeIcon
            icon={faPersonCircleQuestion}
            size="1x"
            color="#1e71b8"
            className="mr-2"
          />
        ),
      },
      {
        key: "Informations Medicales",
        title: "Info Medicales",
        icon: (
          <FontAwesomeIcon
            icon={faPersonCirclePlus}
            size="1x"
            color="#1e71b8"
            className="mr-2"
          />
        ),
      },
      {
        key: "Dossier Medicale",
        title: "Dossier Medicale",
        icon: (
          <FontAwesomeIcon
            icon={faFolder}
            size="1x"
            color="#1e71b8"
            className="mr-2"
          />
        ),
      },
      {
        key: "ScannerEtRadio",
        title: "Scanner/Radio",
        icon: (
          <FontAwesomeIcon
            icon={faFileWaveform}
            size="1x"
            color="#1e71b8"
            className="mr-2"
          />
        ),
      },
      {
        key: "Ordonnace",
        title: " Ordonnace",
        icon: (
          <FontAwesomeIcon
            icon={faFileMedical}
            size="1x"
            color="#1e71b8"
            className="mr-2"
          />
        ),
      },
    ];
    const handleTabsClick = (tab: String) => {
      setActiveTab(tab.toString());
      console.log("active tab", activeTab);
    };
    const { setActiveTab, activeTab, patientId, selectedMedications } =
      useMedications();
    console.log("active tab", activeTab);
    console.log("patientId", patientId);
    console.log("selectedMedications", selectedMedications);
    return (
      <>
        <div className="flex h-full  justify-between   ">
          <div
            style={{ width: "23%" }}
            className="card  bg-white p-6 rounded-lg shadow-lg  border-solid border-2 h-full"
          >
            <div className=" mridicon text-center  ">
              <FontAwesomeIcon
                icon={faHospitalUser}
                color="#1e71b8"
                size="4x"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-center">
              {patient.nom} {patient.prenom}
            </h3>
            <p className="text-center text-gray-500">{patient.telephone}</p>
            <div className="mt-6 tabs flex flex-col items-center ">
              {tabs.map((tab, index) => {
                return (
                  <div
                    key={index}
                    className="border-solid border-2 w-11/12 p-2 mt-1  flex items-center  cursor-pointer rounded-md bg-[#E3E5E6]"
                    onClick={() => handleTabsClick(tab.key)}
                  >
                    {tab.icon}
                    {tab.title}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-3/4 bg-white h-full    overflow-y-auto ">
            {activeTab == "Consultation" && (
              <Consultation consultation={consultation} patient={patient} />
            )}
            {activeTab == "Nouvelle consult" && (
              <CreateConsultTab patient={patient} />
            )}
            {activeTab == "Ordonnace" && <CMHForm2 patient={patient} />}
            {activeTab == "ScannerEtRadio" && <CMHForm formData={formData} />}
            {activeTab == "Dossier Medicale" && (
              <DossierMedicalTab patient={patient} />
            )}
            {activeTab == "Information Personnelle" && (
              <InfoPersoTab patient={patient} />
            )}
            {activeTab == "Informations Medicales" && (
              <InfoMedTab patient={patient} />
            )}
          </div>
        </div>
      </>
    );
  };

export default PatientComponent;
