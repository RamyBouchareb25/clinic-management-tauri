import { Button } from "@nextui-org/react";
import AploadNewDocumentModal from "./AploadNewDocumentModal";
import EditConsultationInfo from "./EditConsultationInfo";
import ShowDocumentModal from "./ShowDocumentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Key } from "react";
import { useNavigate } from "react-router-dom";

const Consultation = ({
  consultation,
  patient,
}: {
  consultation: any;
  patient: any;
}) => {
  const navigate = useNavigate();
  const hundleDeliteConsultation = async (consultationId: any) => {
    let confirmDelete = window.confirm(
      "tu veux vraiment supprimer cette consultation ?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/patient/${patient._id}/consultation`, {
          method: "DELETE",
          body: JSON.stringify({
            consultationId,
          }),
        });
        const data = await res.json();
        if (data.status === 200) {
          window.alert("consultation supprimé");
          navigate(0);
        } else {
          window.alert("Erreur lors de la suppression de l'utilisateur");
        }
      } catch (err) {
        console.log("error deleting document : ", err);
      }
    }
  };

  const hundleDeiteDocumentConsultation = async (
    consultationId: any,
    docName: any
  ) => {
    // console.log("docName", docName);

    let confirmDelete = window.confirm(
      "tu veux vraiment supprimer ce document de cette consultation ?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(
          `/api/patient/${patient._id}/consultation/docierConsultation`,
          {
            method: "DELETE",
            body: JSON.stringify({
              documentName: docName,
              consultationId: consultationId,
            }),
          }
        );
        const data = await res.json();
        if (data.status === 200) {
          window.alert("Document supprimé");
          navigate(0);
        } else {
          window.alert("Erreur lors de la suppression de l'utilisateur");
        }
      } catch (err) {
        console.log("error deleting document : ", err);
      }
    }
  };

  return (
    <>
      <div className="patientDocument  my-2 px-4 ">
        <div className="">
          {consultation && consultation.length > 0 ? (
            consultation.map(
              (
                consult:
                  | {
                      consultationDocuments: any[];
                      resumeConsultation: any;
                      symptomes: any;
                      motif: any;
                      date: string | number | Date;
                      _id: string;
                    }
                  | undefined
              ) =>
                consult && (
                  <div
                    key={consult._id}
                    className="bg-[#E3E5E6] border border-gray-200 rounded-lg p-4 mb-4 shadow-sm "
                  >
                    <div className="flex justify-between border-solid border-2 mb-4">
                      <div className="flex ">
                        <div className="date mr-8">
                          <p className="text-gray-600 mb-4">
                            Date:{" "}
                            {new Date(consult.date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="consultInfo">
                          <p>
                            <span className="font-bold">Motif</span> :{" "}
                            {consult.motif}
                          </p>
                          <p>
                            <span className="font-bold">Symptomes</span> :{" "}
                            {consult.symptomes}
                          </p>
                          <p>
                            <span className="font-bold">Resumé</span> :{" "}
                            {consult.resumeConsultation}
                          </p>
                        </div>
                      </div>
                      <div className="btn flex items-center gap-2">
                        <Button
                          className=" bg-red-500 text-white rounded hover:bg-red-600 "
                          onClick={() => hundleDeliteConsultation(consult._id)}
                        >
                          Supprimer
                        </Button>
                        <EditConsultationInfo
                          consultationInfo={consult}
                          patient={patient}
                        />
                      </div>
                    </div>

                    <div
                      //  className="consultdocuments grid grid-cols-1 md:grid-cols-3 gap-4 "
                      className="consultdocuments flex flex-wrap gap-3 "
                    >
                      <p className="font-bold mb-4">Documents :</p>

                      {consult.consultationDocuments &&
                      consult.consultationDocuments.length > 0 ? (
                        consult.consultationDocuments.map(
                          (docName: Key | null | undefined) => (
                            <div
                              key={docName}
                              //  className="flex items-start mb-2 p-1 bg-gray-100 rounded-lg shadow-sm"
                              className="flex mb-1  bg-white rounded-lg shadow-sm"
                            >
                              <FontAwesomeIcon
                                icon={faX}
                                onClick={() =>
                                  hundleDeiteDocumentConsultation(
                                    consult._id,
                                    docName
                                  )
                                }
                                className="cursor-pointer  text-red-600 border-solid border-4 p-1"
                              />
                              <div className="flex-1">
                                <ShowDocumentModal fileName={String(docName)} />
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <p>cette consultation n&apos;a aucun document </p>
                      )}
                    </div>
                    <div className="apploaddocument flex justify-end mt-1">
                      <AploadNewDocumentModal
                        patient={patient}
                        consultation={consult}
                        fetchPath={`/api/patient/${patient._id}/consultation/docierConsultation`}
                        fieldName="consultationDocuments"
                      />
                    </div>
                  </div>
                )
            )
          ) : (
            <p>ce patient n&apos;a aucun consultation </p>
          )}
        </div>
        {/* <div className="flex justify-end mt-2">
                      <AddConsultationModal patient={patient} />
                    </div> */}
      </div>
    </>
  );
};

export default Consultation;
