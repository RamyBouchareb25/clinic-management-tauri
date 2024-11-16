import EditPersonnalInfoModal from "./EditPersonnalInfoModal";

const InfoPersoTab = ({ patient }: { patient: any }) => {
  return (
    <>
      <div className="flex-col items-center justify-center ">
        <p className="p-2">
          <span className="font-bold ">Nom</span>: {patient.nom}
        </p>
        <p className="p-2 text-century-gothic">
          <span className="font-bold ">Prénom</span>: {patient.prenom}
        </p>
        <p className="p-2 text-century-gothic">
          <span className="font-bold ">Age</span>: {patient.age}
        </p>
        <p className="p-2 text-century-gothic">
          <span className="font-bold ">Sexe</span>: {patient.sexe}
        </p>
        <p className="p-2 text-century-gothic ">
          <span className="font-bold ">Téléphone</span>: {patient.telephone}
        </p>
        <p className="p-2 text-century-gothic">
          <span className="font-bold *">Adresse</span>: {patient.Addresse}
        </p>
        <p className="p-2 text-century-gothic">
          <span className="font-bold ">Profession</span>: {patient.profession}
        </p>
        <p className="p-2 text-century-gothic">
          <span className="font-bold ">Assurance</span>: {patient.assurance}
        </p>
        <p className="p-2 text-century-gothic">
          <span className="font-bold ">État Civil: </span> {patient.etatCivil}
        </p>
        <div className="flex justify-end">
          <EditPersonnalInfoModal
            patientPersonnalInfo={{
              id: patient._id,
              nom: patient.nom,
              prenom: patient.prenom,
              age: patient.age,
              sexe: patient.sexe,
              telephone: patient.telephone,
              Addresse: patient.Addresse,
              profession: patient.profession,
              assurance: patient.assurance,
              etatCivil: patient.etatCivil,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default InfoPersoTab;
