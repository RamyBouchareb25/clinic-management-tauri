import { useEffect, useState } from "react";
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

type ComponentProp = {
  patient: {
    _id: string;
  };
  consultation?: {
    _id: string;
  };
  fetchPath: string;
  fieldName: string;
};

export default function AploadNewDocumentModal({
  patient,
  fetchPath,
  fieldName,
  consultation,
}: ComponentProp) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  // const router = useRouter();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ [key: string]: string[] }>({
    [fieldName]: [],
  });

  useEffect(() => {
    if (isOpen) {
      setSuccessMsg("");
      setErrMsg("");
      setButtonDisable(false);
      console.log("fetchPath", fetchPath);
      console.log("fieldName", fieldName);
      console.log("patient", patient);
    }
  }, [isOpen, fetchPath, fieldName, patient]);

  const handleFileChange = (e: any) => {
    // Assuming you're using the same state structure
    const { name, files } = e.currentTarget;
    const selectedfilesUrls = [];
    const selectedfiles = Array.from(files); // convert files object to an array of fileq
    console.log("selectedfiles", selectedfiles);
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

  const submitDocumentForPatient = async (e: any) => {
    setButtonDisable(true); // Disable button to prevent multiple submissions
    console.log("buttondisable", buttonDisable);

    if (buttonDisable) {
      console.log("button is disabled");
      return;
    } // Prevent function from proceeding if button is already disabled
    console.log("hadi ray tt submita intik");
    console.log("formData mojamaa : ", formData);
    e.preventDefault();
    const formDataToSend = new FormData();
    console.log(
      "patient li howa l id soit ta3 patient sah sah soit consultatin",
      patient
    );
    formDataToSend.append("id", patient._id);
    formDataToSend.append("consultationId", consultation?._id ?? "");
    if (formData[fieldName] && formData[fieldName].length) {
      formData[fieldName].forEach((file) => {
        formDataToSend.append(fieldName, file);
      });
    }
    console.log("formDataToSend : ");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const res = await fetch(fetchPath, {
        method: "POST",
        body: formDataToSend,
      });
      console.log("res from the fetch method ", res);
      const data = await res.json();
      if (data.status === 200) {
        setSuccessMsg(data.message);
        setTimeout(() => {
          onClose();
        }, 1000);
        setFormData({
          [fieldName]: [],
        });
        navigate(0);
      } else {
        setErrMsg(data.message);
      }
      console.log("data", data);
    } catch (err) {
      console.log("err khrjet men aploadDocument", err);
    }
  };

  return (
    <>
      <Button
        className="py-2 px-4 font-medium text-white bg-[#1e71b8] hover:bg-[#3abff0] rounded-full"
        onPress={onOpen}
      >
        Ajouter document
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ajout d un document{" "}
              </ModalHeader>
              <ModalBody>
                <form id="myform" onSubmit={submitDocumentForPatient}>
                  <label htmlFor={fieldName}>Ajouter nouveaux douments</label>
                  <input
                    type="file"
                    id={fieldName}
                    name={fieldName}
                    multiple
                    onChange={handleFileChange}
                  />
                </form>
                {errMsg && <p className="text-red-500">{errMsg}</p>}
                {successMsg && <p className="text-green-500">{successMsg}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button>
                <button
                  form="myform"
                  type="submit"
                  disabled={buttonDisable}
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
