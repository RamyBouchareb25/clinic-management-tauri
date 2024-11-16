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
import { invoke } from "@tauri-apps/api/core";

export default function AddUserModal() {
  // const router = useRouter();
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [disableButton, setDisableButton] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    sexe: "Male",
    telephone: "",
    Addresse: "",
    etatCivil: "Célibataire",
    profession: "",
    assurance: "",
    antecedentsPersonnels: "",
    antecedentsFamiliaux: "",
    informationsUtiles: "",
    patientHistoryDocuments: [],
    antecedentsChirurgicaux: "",
    TraitementsEnCours: "",
    Allergies: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e: any) => {
    // Assuming you're using the same state structure
    const { name, files } = e.currentTarget;
    const selectedfilesUrls = [];
    const selectedfiles = Array.from(files); // convert files object to an array of fileq
    for (let i = 0; i < selectedfiles.length; i++) {
      const file = files[i];
      const fileUrl = URL.createObjectURL(file); // to show it in the front before applading
      selectedfilesUrls.push(fileUrl);
    }
    console.log("selectedfilesUrls : ", selectedfilesUrls);
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedfiles,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      setSuccessMsg("");
      setErrMsg("");
      setDisableButton(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setDisableButton(true);
    if (disableButton) return;

    setErrMsg("");
    setSuccessMsg("");
    e.preventDefault();
    console.log(
      "formData mojamaa from inputs in the add user modal: ",
      formData
    );

    const patientData = {
      nom: formData.nom,
      prenom: formData.prenom,
      age: formData.age,
      sexe: formData.sexe,
      telephone: formData.telephone,
      addresse: formData.Addresse,
      etat_civil: formData.etatCivil,
      profession: formData.profession,
      assurance: formData.assurance,
      antecedents_personnels: formData.antecedentsPersonnels,
      antecedents_familiaux: formData.antecedentsFamiliaux,
      informations_utiles: formData.informationsUtiles,
      antecedents_chirurgicaux: formData.antecedentsChirurgicaux,
      traitements_en_cours: formData.TraitementsEnCours,
      allergies: formData.Allergies,
      patient_history_documents: formData.patientHistoryDocuments,
    };

    console.log("patientData to send to the backend: ", patientData);

    try {
      // Call the Rust function via Tauri invoke
      const result = await invoke("add_patient", { data: patientData }) as string;

      // Handling the result directly from Rust
      if (result) {
        setSuccessMsg(result); // Display success message
        setTimeout(() => {
          onClose();
        }, 1000);
        setFormData({
          nom: "",
          prenom: "",
          age: "",
          sexe: "Male",
          telephone: "",
          Addresse: "",
          etatCivil: "Célibataire",
          profession: "",
          assurance: "",
          antecedentsPersonnels: "",
          antecedentsFamiliaux: "",
          informationsUtiles: "",
          patientHistoryDocuments: [],
          antecedentsChirurgicaux: "",
          TraitementsEnCours: "",
          Allergies: "",
        });
        navigate(0); // Refresh or reload the page if necessary
      } else {
        setErrMsg("An error occurred");
      }
    } catch (error) {
      console.error("Error invoking add_patient", error);
      setErrMsg((error as Error).message);
    }
  };
  return (
    <>
      <Button
        className="py-2 px-4 font-medium text-white bg-[#1e71b8]  rounded-full"
        onPress={onOpen}
      >
        Ajouter un patient
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="5xl"
        className="border-solid border-2"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ajout du Patient
              </ModalHeader>
              <ModalBody>
                <form id="myform" onSubmit={handleSubmit}>
                  <div className="flex  justify-around items-center ">
                    <div className="  infoPersonnelle w-2/5 border-r">
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

                    <div className="infoMedical  w-2/4  ">
                      {/* /*antecedentsFamiliaux*/}
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

                      {/* 3 jded  */}
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

                      {/* document */}
                      <div className="py-3 flex gap-x-4 items-center">
                        <label htmlFor="documents" className="text-gray-600">
                          Docier de patient :
                        </label>
                        <input
                          type="file"
                          name="patientHistoryDocuments"
                          onChange={handleFileChange}
                          multiple
                          id="documents"
                          className=" pr-12 pl-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                      </div>
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

                <button
                  form="myform"
                  type="submit"
                  disabled={disableButton}
                  className="px-4 py-2 text-blue-700 rounded-2xlP   duration-150 hover:text-white hover:bg-indigo-500 active:bg-indigo-700"
                >
                  Ajouter
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
