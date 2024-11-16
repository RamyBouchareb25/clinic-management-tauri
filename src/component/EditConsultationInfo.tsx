
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

type consultaionProps = {
  consultationInfo: {
    _id: string;
    motif: string;
    resumeConsultation: string;
  };
  patient: {
    _id: string;
  };
};

export default function EditConsultationInfo({
  consultationInfo,
  patient,
}: consultaionProps) {
  // const router = useRouter();
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState(consultationInfo);
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

    formDataToSend.append("motif", formData.motif);
    formDataToSend.append("resumeConsultation", formData.resumeConsultation);
    formDataToSend.append("id", consultationInfo._id);

    console.log("formDataToSend : ");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/patient/${patient._id}/consultation`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );
      const resback = await res.json();
      console.log("res from the back in the front", resback);
      if (resback.status != 200) {
        setErrMsg(resback.message);
      } else {
        setSuccessMsg(resback.message);
        navigate(0);
        setTimeout(() => {
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
      <Button
        onPress={onOpen}
        className=" bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        modifier{" "}
      </Button>
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
                Modification du consultation
              </ModalHeader>
              <ModalBody>
                <form id="myform" onSubmit={handleSubmit}>
                  {/* /*antecedentsFamiliaux*/}
                  <div className="col-span-full">
                    <label
                      htmlFor="motif"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Motif de consultation :
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="motif"
                        name="motif"
                        onChange={handleChange}
                        required
                        value={formData.motif}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                  {/* antecedentsPersonnels */}
                  <div className="col-span-full">
                    <label
                      htmlFor="resumeConsultation"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Resumé de consultation :
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="resumeConsultation"
                        name="resumeConsultation"
                        onChange={handleChange}
                        required
                        value={formData.resumeConsultation}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                  {/* informationsUtiles */}

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
                  className="px-4 py-2 text-blue-700 rounded-2xlP   duration-150 hover:text-white hover:bg-indigo-500 active:bg-indigo-700"
                >
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
