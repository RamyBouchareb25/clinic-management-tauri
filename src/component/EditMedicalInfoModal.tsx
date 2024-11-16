
import { useEffect } from "react";
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

type patientMedicalInfoProps = {
  patientMedicalInfo :{ 
    id:string,
    antecedentsPersonnels : string ,
    informationsUtiles : string ,
    antecedentsFamiliaux : string 
    antecedentsChirurgicaux: string,
    Allergies : string,
    TraitementsEnCours: string,
  }
};


export default function EditPersonnalInfoModal({patientMedicalInfo} : patientMedicalInfoProps ) {
  // const router = useRouter();
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState(patientMedicalInfo);
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
    console.log("formData mojamaa from inputs in edit medical info ", formData);
    const formDataToSend = new FormData();

    formDataToSend.append("antecedentsPersonnels", formData.antecedentsPersonnels);
    formDataToSend.append("antecedentsFamiliaux", formData.antecedentsFamiliaux);
    formDataToSend.append("informationsUtiles", formData.informationsUtiles);
    formDataToSend.append("TraitementsEnCours", formData.TraitementsEnCours);
    formDataToSend.append("antecedentsChirurgicaux", formData.antecedentsChirurgicaux);
    formDataToSend.append("Allergies", formData.Allergies);
  

    console.log("formDataToSend to the backend in edit medical info: ");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    try {
      const res = await fetch(`http://localhost:3000/api/patient/${patientMedicalInfo.id}/medical_info`, {
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

 {/* /*antecedentsFamiliaux*/ }
 <div className="col-span-full">
                        <label
                          htmlFor="antecedentsFamiliaux"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          antecedents Familiaux :
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="antecedentsFamiliaux"
                            name="antecedentsFamiliaux"
                            onChange={handleChange}
                            required
                            value={formData.antecedentsFamiliaux}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ></textarea>
                        </div>
                      </div>
                      {/* antecedentsPersonnels */}
                      <div className="col-span-full">
                        <label
                          htmlFor="antecedentsPersonnels"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          antecedents Personnels :
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="antecedentsPersonnels"
                            name="antecedentsPersonnels"
                            onChange={handleChange}
                            required
                            value={formData.antecedentsPersonnels}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ></textarea>
                        </div>
                      </div>
                      {/* informationsUtiles */}
                      <div className="col-span-full">
                        <label
                          htmlFor="informationsUtiles"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          informations Utiles :
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="informationsUtiles"
                            name="informationsUtiles"
                            onChange={handleChange}
                            required
                            value={formData.informationsUtiles}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="Allergies"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Allergies :
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="Allergies"
                            name="Allergies"
                            onChange={handleChange}
                            required
                            value={formData.Allergies}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="TraitementsEnCours"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Traitements En Cours :
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="TraitementsEnCours"
                            name="TraitementsEnCours"
                            onChange={handleChange}
                            required
                            value={formData.TraitementsEnCours}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="antecedentsChirurgicaux"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Antecedents Chirurgicaux :
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="antecedentsChirurgicaux"
                            name="antecedentsChirurgicaux"
                            onChange={handleChange}
                            required
                            value={formData.antecedentsChirurgicaux}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          ></textarea>
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
                {/* <Button color="primary"  onPress={handleSubmit} form="myform" type="submit" disabled={true}>
                  Ajouter
                </Button> */}
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
