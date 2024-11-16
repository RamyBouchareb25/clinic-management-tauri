import AploadNewDocumentModal from "./AploadNewDocumentModal";
import ShowDocumentModal from "./ShowDocumentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Key } from "react";

const DossierMedicalTab = ({ patient }: { patient: any }) => {
  return (
    <>
      <div className="patientDocument  mb-2">
        <h2 className="text-center text-lg font-semibold text-[#1e71b8] border-b-2 mb-3">
          Dossier Medicale : {patient.patientHistoryDocuments.length} document
        </h2>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {patient.patientHistoryDocuments &&
          patient.patientHistoryDocuments.length > 0 ? (
            patient.patientHistoryDocuments.map((docName: Key | null | undefined) => (
              <div
                key={docName}
                className="flex items-center justify-around gap-1  bg-gray-100 rounded-lg shadow hover:bg-gray-200 py-2"
              >
                <ShowDocumentModal fileName={docName as string} />
                <button
                  onClick={() => {
                    // TODO : implement delete document 
                    // hundleDeliteClick(docName)
                  }}
                  className="text-gray-600 hover:text-red-600"
                >
                  {" "}
                  <FontAwesomeIcon icon={faTrash} size="1x" />
                </button>
              </div>
            ))
          ) : (
            <p>ce patient n&apos;a aucun document </p>
          )}
        </div>
        <div className="flex justify-end mt-2">
          <AploadNewDocumentModal
            patient={patient}
            fetchPath={`/api/patient/${patient._id}/documents`}
            fieldName="patientHistoryDocuments"
          />
        </div>
      </div>
    </>
  );
};

export default DossierMedicalTab;
