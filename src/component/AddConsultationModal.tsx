
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

export default function AddConsultationModal({ patient }: any) {
  // const router = useRouter();
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [disableButton, setDisableButton] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    motif: "",
    resumeConsultation: "",
    consultationDocuments: [],
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

  const handleSubmit = async (e: any) => {
    setDisableButton(true);
    if (disableButton) return;
    setErrMsg("");
    setSuccessMsg("");
    e.preventDefault();
    console.log("formData mojamaa : ", formData);
    const formDataToSend = new FormData();

    formDataToSend.append("motif", formData.motif);
    formDataToSend.append("resumeConsultation", formData.resumeConsultation);

    if (
      formData.consultationDocuments &&
      formData.consultationDocuments.length
    ) {
      formData.consultationDocuments.forEach((file) => {
        formDataToSend.append("consultationDocuments", file);
      });
    }

    console.log("formDataToSend : ");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/patient/${patient._id}/consultation`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const resback = await res.json();
      console.log("res from the back in the front", resback);
      if (resback.status != 200) {
        setErrMsg(resback.message);
      } else {
        setSuccessMsg(resback.message);
        setTimeout(() => {
          onClose();
        }, 1000);
        setFormData({
          motif: "",
          resumeConsultation: "",
          consultationDocuments: [],
        });
        navigate(0);
      }
    } catch (error: any) {
      console.error("error fetch font", error);
      setErrMsg(error.message);
    }
  };
  return (
    <>
      <Button
        className="py-2 px-4 font-medium text-white bg-[#1e71b8] hover:bg-[#3abff0] rounded-full"
        onPress={onOpen}
      >
        Ajouter une consultation
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
                Ajout d une consultation
              </ModalHeader>
              <ModalBody>
                <form id="myform" onSubmit={handleSubmit}>
                  <div className="flex  justify-around items-center ">
                    <div className="  infoPersonnelle w-2/5 border-r">
                      <div className="py-1 flex gap-x-4 items-center">
                        <label htmlFor="motif" className="text-gray-600">
                          Motif :
                        </label>

                        <textarea
                          id="motif"
                          name="motif"
                          onChange={handleChange}
                          required
                          value={formData.motif}
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>

                      <div className="py-1 flex gap-x-4 items-center">
                        <label
                          htmlFor="resumeConsultation"
                          className="text-gray-600"
                        >
                          Resumé de la consultation:
                        </label>

                        <textarea
                          id="resumeConsultation"
                          name="resumeConsultation"
                          onChange={handleChange}
                          required
                          value={formData.resumeConsultation}
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>

                      {/* document */}
                      <div className="py-3 flex gap-x-4 items-center">
                        <label
                          htmlFor="consultationDocuments"
                          className="text-gray-600"
                        >
                          Dossier de Consultation :
                        </label>
                        <input
                          type="file"
                          name="consultationDocuments"
                          onChange={handleFileChange}
                          multiple
                          id="consultationDocuments"
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
