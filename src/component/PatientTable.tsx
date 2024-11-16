import { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { useMedications } from "../context/MedicationContext";
import { useNavigate } from "react-router-dom";


const PatientTable = ({ data }: { data: any }) => {
  // @ts-ignore
  const { _, setCurrentPatient } = useMedications();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  //  const router = useRouter()
  const navigate = useNavigate();

  interface Patient {
    _id: string;
    nom: string;
    prenom: string;
    age: number;
    sexe: string;
    telephone: string;
    Addresse: string;
    etatCivil: string;
    profession: string;
    assurance: string;
    informationsUtiles: string;
    antecedentsFamiliaux: string;
    antecedentsPersonnels: string;
    patientHistoryDocuments: string[];
  }

  useEffect(() => {
    const searchTerms = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((term) => term.trim() !== "");
    // console.log("searchTerms", searchTerms)
    const filtered = data.filter((patient: Patient) => {
      const patientFullName = `${patient.nom.toLowerCase()} ${patient.prenom.toLowerCase()}`;
      return searchTerms.every((term) => patientFullName.includes(term));
    });
    setFilteredPatients(filtered);
    // console.log('filtered' , filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, data]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredPatients.slice(firstItemIndex, lastItemIndex);

  const hundleDeliteClick = async (id: any) => {
    let confirmDelete = window.confirm(
      "tu veux vraiment supprimer cet patient ?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/patient/${id}`, {
          method: "DELETE",
        });
        const resback = await res.json();
        if (resback.status === 200) {
          window.alert("patient supprimé");
          navigate(0);
        } else {
          window.alert("Erreur lors de la suppression de l'utilisateur");
        }
      } catch (err) {
        console.log("error deleting user : ", err);
      }
    }
  };
  const handleConsulterClick = (patient: any) => {
    setCurrentPatient(patient);
    console.log(
      "parientId of the context after selecting consulter ce patient ",
      patient._id
    );
  };

  const hundlesearchChange = (e: any) => {
    console.log("hundlesearchChange tbdlet ");
    setSearchTerm(e.target.value);
    console.log("searchTerm", searchTerm);
  };
  return (
    <div className=" max-w-screen-xl mx-auto px-4 md:px-8 py-2 text-[#02001b]  bg-white  ">
      <div className="items-end justify-between md:flex">
        <div className="max-w-lg  ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="max-w-md px-4 mx-auto mt-12"
          >
            <div className="relative">
              <FontAwesomeIcon
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                icon={faMagnifyingGlass}
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                // className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-[#f0f0f0] focus:bg-white focus:border-[#1e71b8]"
                // onChange={(e)=>setSearchTerm(e.target.value)}
                onChange={(e) => hundlesearchChange(e)}
              />
            </div>
          </form>
        </div>

        <div className="mt-3 md:mt-0">
          <AddUserModal />
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead
            //  className="bg-gray-50 text-gray-600 font-medium border-b"
            className="bg-[#1d3e8e] text-[#edffec] font-bold border-b"
          >
            <tr>
              <th className="py-3 px-6">Nom</th>
              <th className="py-3 px-6">Prenom</th>
              <th className="py-3 px-6">Age</th>
              <th className="py-3 px-6">Sexe</th>
              <th className="py-3 px-6">contact</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody
            //  className="text-gray-600 divide-y"
            className="text-[#02001b] divide-y"
          >
            {currentItems.map((item: any, idx: any) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.nom} </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.prenom} </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.age} </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sexe} </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.telephone}
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <a href={`/Home/${item._id}`}>
                    <button
                      onClick={() => handleConsulterClick(item)}
                      // className="py-2 leading-none px-3 font-medium text-indigo-600 duration-150 hover:bg-gray-50 rounded-lg"
                      className="py-2 leading-none px-3 font-medium text-[#1d3e8e] duration-150 hover:bg-[#edffec] rounded-lg"
                    >
                      consulter
                    </button>
                  </a>

                  <button
                    onClick={() => hundleDeliteClick(item._id)}
                    // className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-[#edffec] rounded-lg"
                  >
                    supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*pagination*/}

      <div
        className="max-w-screen-xl mx-auto mt-12 px-4 text-[#02001b] md:px-8"
        // className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8"
      >
        <div className="hidden justify-end text-sm md:flex">
          <div
            //  className="flex items-center gap-12" aria-label="Pagination"
            className="flex items-center gap-12"
            aria-label="Pagination"
          >
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              // className="cursor-pointer hover:text-indigo-600"
              className="cursor-pointer rounded-full  py-2 px-4 text-white bg-[#1e71b8] "
            >
              précédent
            </button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              // className="cursor-pointer hover:text-indigo-600"
              // className="py-2 px-4 font-medium text-white bg-[#1d3e8e] hover:bg-[#3abff0] rounded-full"
              className="cursor-pointer py-2 px-4  text-white bg-[#1e71b8]  rounded-full"
            >
              suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientTable;
