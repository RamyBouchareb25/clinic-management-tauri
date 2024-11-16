import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { useMedications } from "../context/MedicationContext";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
const PrescriptionTab = () => {
  const { selectedMedications } = useMedications();
  return (
    <>
      {selectedMedications.map(
        (
          med: {
            medication: {
              _id: Key | null | undefined;
              NOM_DE_MARQUE:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
            };
          },
          _: any
        ) => {
          return (
            <div key={med.medication._id} className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={faX}
                onClick={() => {
                  // TODO Sa9si karim mnin jab had function
                  // handleDeliteOneSelectedMedication(med.medication._id)
                }}
                className="cursor-pointer mr-2"
              />
              <p className="mr-2">{med.medication.NOM_DE_MARQUE}</p>
              <input type="text" />
            </div>
          );
        }
      )}
    </>
  );
};

export default PrescriptionTab;
