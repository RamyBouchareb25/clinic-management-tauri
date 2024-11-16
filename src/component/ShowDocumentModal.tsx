import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
export default function ShowDocumentModal({fileName} : {fileName : string}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const onlyFileName  = fileName.split("-").pop()
  const OnlyfileNameWithoutExtension = onlyFileName?.split(".").shift()
  const patientName = fileName.split("-")[0]
  const fileExtension = onlyFileName?.split(".").pop()?.toLowerCase() ?? "";
  const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);


  return (
    <>
      <Button onPress={onOpen} 
      // className="w-4/5 text-left bg-[#1d3e8e] text-white"
      className="  bg-white"
      >{OnlyfileNameWithoutExtension}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">{onlyFileName}  de {patientName } </ModalHeader>
              <ModalBody className="overflow-auto">
              {
                  isImage ? (
                  
                    <img  src={`/uploads/${fileName}`} alt={onlyFileName  || "rien n'est specifié"} className="block m-auto " />
                  ) : (
                    <iframe  className="w-full h-screen border-none" src={`/uploads/${fileName}`} title={onlyFileName}></iframe>
                  )
                }              </ModalBody>
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
