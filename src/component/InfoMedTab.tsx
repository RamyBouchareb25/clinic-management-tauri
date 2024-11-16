import EditMedicalInfoModal from "./EditMedicalInfoModal";

const InfoMedTab = ({ patient }: { patient: any }) => {
  return (
    <>
      <div className="patientMedicalInfo  mb-3">
        <h2 className="text-center text-lg font-semibold text-[#1e71b8] border-b-2 ">
          Information Medicale
        </h2>
        <div className="flex-col items-center justify-center  ">
          <p className="p-1">
            <span className="font-bold text-gray-700">
              antecedentsPersonnels
            </span>
            : {patient.antecedentsPersonnels}
          </p>
          <p className="p-1">
            <span className="font-bold text-gray-700">
              antecedentsFamiliaux
            </span>
            : {patient.antecedentsFamiliaux}
          </p>
          <p className="p-1">
            <span className="font-bold text-gray-700">informationsUtiles</span>:{" "}
            {patient.informationsUtiles}
          </p>
          <p className="p-1">
            <span className="font-bold text-gray-700">
              Antecedents Chirurgicaux
            </span>
            : {patient.antecedentsChirurgicaux}
          </p>
          <p className="p-1">
            <span className="font-bold text-gray-700">Allergies</span>:{" "}
            {patient.Allergies}
          </p>
          <p className="p-1">
            <span className="font-bold text-gray-700">
              Traitements en cours
            </span>
            : {patient.TraitementsEnCours}
          </p>
        </div>
        <div className="flex justify-end">
          <EditMedicalInfoModal
            patientMedicalInfo={{
              id: patient._id,
              antecedentsPersonnels: patient.antecedentsPersonnels,
              antecedentsFamiliaux: patient.antecedentsFamiliaux,
              informationsUtiles: patient.informationsUtiles,
              antecedentsChirurgicaux: patient.antecedentsChirurgicaux,
              Allergies: patient.Allergies,
              TraitementsEnCours: patient.TraitementsEnCours,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default InfoMedTab;
