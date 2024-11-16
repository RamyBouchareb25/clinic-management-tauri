import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const DoctorInfoForm = ({ infoDoctor }: { infoDoctor: any }) => {
  const [formData, setFormData] = useState(infoDoctor);
  const [disableButton, setDisableButton] = useState(false);

  const [_, setErrMsg] = useState("");
  const [__, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setDisableButton(true);
    if (disableButton) return;
    setErrMsg("");
    setSuccessMsg("");
    e.preventDefault();
    console.log("formData ghg:", formData);

    try {
      const res = await fetch(`http://localhost:3000/api/medecin`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const resback = await res.json();
      console.log("res from the back in the front", resback);
      if (resback.status != 200) {
        setErrMsg(resback.message);
      } else {
        setSuccessMsg(resback.message);
        setFormData({});
        navigate(0);
      }
    } catch (error) {
      console.error("error fetch font", error);
      setErrMsg((error as Error).message);
    }
  };

  return (
    <>
      <form id="thisone" onSubmit={handleSubmit}>
        <label htmlFor="Nom">Nom</label>
        <input
          id="Nom"
          name="nom"
          type="text"
          className=""
          value={formData.nom}
          onChange={handleChange}
        />
        <label htmlFor="Prenom">Prenom</label>
        <input
          id="Prenom"
          name="prenom"
          type="text"
          className=""
          value={formData.prenom}
          onChange={handleChange}
        />
        <label htmlFor="Addresse">Addresse</label>
        <input
          id="Addresse"
          name="Addresse"
          type="text"
          className=""
          value={formData.Addresse}
          onChange={handleChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          id="contact"
          name="contact"
          type="text"
          className=""
          value={formData.contact}
          onChange={handleChange}
        />
        <label htmlFor="specialite">Specialité</label>
        <input
          id="specialite"
          name="specialite"
          type="text"
          className=""
          value={formData.specialite}
          onChange={handleChange}
        />
        <Button type="submit" form="thisone">
          Enregistrer
        </Button>
      </form>
    </>
  );
};

export default DoctorInfoForm;
