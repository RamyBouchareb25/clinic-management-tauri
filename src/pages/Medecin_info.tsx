// @ts-ignore
import DoctorInfoForm from "../component/DoctorInfoForm";



const MedecinInfo = () => {
//   const doctor = await getDoctor();
  // console.log("doctor", doctor)
  const infoDoctor = {
    nom: "iarkane",
    prenom: "karim",
    Addresse: "Ain Benian Alger",
    contact: "0558000466",
    specialite: "Dentiste",
  };
  return (
    <>
      <DoctorInfoForm infoDoctor={infoDoctor} />
    </>
  );
};

export default MedecinInfo;
