
import{ useEffect } from "react";
import { useState } from "react";


import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

type patientPersonnalInfoProps = {
  patientPersonnalInfo :{ 
    id : string,
    prenom:string
    nom:string
    age:number
    sexe:string
    Addresse : string
    etatCivil:string
    telephone:string
    profession: string,
    assurance: string,  
  }
};


export default function EditPersonnalInfoModal({patientPersonnalInfo} : patientPersonnalInfoProps ) {
  // const router = useRouter();
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState(patientPersonnalInfo);
  const handleChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      setSuccessMsg("");
      setErrMsg("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: any) => {
    setErrMsg("");
    setSuccessMsg("");
    e.preventDefault();
    console.log("formData mojamaa : ", formData);
    const formDataToSend = new FormData();

    formDataToSend.append("nom", formData.nom);
    formDataToSend.append("prenom", formData.prenom);
    formDataToSend.append("age", formData.age.toString());
    formDataToSend.append("sexe", formData.sexe);
    formDataToSend.append("telephone", formData.telephone);
    formDataToSend.append("Addresse", formData.Addresse);
    formDataToSend.append("etatCivil", formData.etatCivil);
    formDataToSend.append("profession", formData.profession);
    formDataToSend.append("assurance", formData.assurance);
   

    console.log("formDataToSend : ");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    try {
      const res = await fetch(`http://localhost:3000/api/patient/${patientPersonnalInfo.id}`, {
        method: "PUT",
        body: formDataToSend,
      });
      const resback = await res.json();
      console.log("res from the back in the front", resback);
      if (resback.status != 200) {
        setErrMsg(resback.message);
      } else {
        setSuccessMsg(resback.message);
        navigate(0);        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error: any) {
      console.error("error fetch font", error);
      setErrMsg(error.message);
    }
    // setErrMsg("")
    // setSuccessMsg("")
  };
  return (
    <>
      <Button  className="py-2 px-4 font-medium text-white bg-[#1e71b8] hover:bg-[#3abff0] rounded-full" onPress={onOpen}>modifier le patient</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="2xl"
        className="border-solid border-2"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col  items-center gap-1">
                Modification du Patient
              </ModalHeader>
              <ModalBody>
                <form id="myform" onSubmit={handleSubmit}>
                    <div className="  infoPersonnelle  ">
                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="nom" className="text-gray-600">
                          Nom:
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          id="nom"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>

                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="prenom" className="text-gray-600">
                          Prenom:
                        </label>
                        <input
                          type="text"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          id="prenom"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>

                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="age" className="text-gray-600">
                          Age :
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          id="age"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>

                      <div className="py-2 flex gap-x-4 items-center">
                        <label htmlFor="sexe" className="text-gray-600">
                          Sexe :
                        </label>
                        <select
                          name="sexe"
                          value={formData.sexe}
                          onChange={handleChange}
                          id="sexe"
                          required
                          defaultChecked
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        >
                          <option value="Male">Male</option>
                          <option value="Femme">Femme</option>
                        </select>
                      </div>
                      <div className="py-2 flex gap-x-4 items-center">
                        <label htmlFor="etatCivil" className="text-gray-600">
                          Etat Civil :
                        </label>
                        <select
                          name="etatCivil"
                          value={formData.etatCivil}
                          onChange={handleChange}
                          id="etatCivil"
                          required
                          defaultChecked
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        >
                          <option value="Célibataire">Célibataire</option>
                          <option value="Marié">Marié</option>
                          <option value="Veuf">Veuf</option>
                          <option value="Divorcé">Divorcé</option>
                        </select>
                      </div>
                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="phone_number" className="text-gray-600">
                          contact :
                        </label>
                        <input
                          type="text"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleChange}
                          id="phone_number"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>
                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="addresse" className="text-gray-600">
                          addresse
                        </label>
                        <input
                          type="text"
                          name="Addresse"
                          value={formData.Addresse}
                          onChange={handleChange}
                          id="addresse"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>
                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="profession" className="text-gray-600">
                          profession :
                        </label>
                        <input
                          type="text"
                          name="profession"
                          value={formData.profession}
                          onChange={handleChange}
                          id="profession"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>
                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="assurance" className="text-gray-600">
                          assurance :
                        </label>
                        <input
                          type="text"
                          name="assurance"
                          value={formData.assurance}
                          onChange={handleChange}
                          id="assurance"
                          required
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>
                    </div>

                 

                  {successMsg && (
                    <div className="text-green-500">{successMsg}</div>
                  )}
                  {errMsg && <div className="text-red-500">{errMsg}</div>}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>
              
                <button form="myform" type="submit"  className="px-4 py-2 text-blue-700 rounded-2xlP   duration-150 hover:text-white hover:bg-indigo-500 active:bg-indigo-700">
                  modifier
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
