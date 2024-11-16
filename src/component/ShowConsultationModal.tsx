import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ShowConsultationModal({patient , consultation} : {patient : any , consultation : any}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();



  return (
    <>
      <Button onPress={onOpen} className=" bg-blue-500 text-white rounded hover:bg-blue-600" > voir</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">consultation de {patient.nom} {patient.prenom}  </ModalHeader>
              <ModalBody>

    <div className="flex-col items-center justify-center  ">
    <p className="text-gray-600 mb-4">
    <span className="font-bold text-gray-700">Date de consultation :</span>:{" "}

                                  {new Date(consultation.date).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">Motif de consultation : </span>:{" "}
              {consultation.motif}
            </p>
            <p className="p-2">
              <span className="font-bold text-gray-700">resumé consultation : </span>:{" "}
              {consultation.resumeConsultation}
            </p>
         

           
          </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
