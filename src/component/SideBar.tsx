import "../globals.css";


import {
  faStethoscope,
  faUserGroup,
  faHouseChimney,
  faXRay,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
const SideBar = () => {
    const navigation = [
        {
          icon: (
            <FontAwesomeIcon
              icon={faUserGroup}
              size="1x"
              color="#1e71b8"
              className="mr-2"
            />
          ),
          href: "/Home",
          name: "Patients",
        },
        {
          icon: (
            <FontAwesomeIcon
              icon={faHouseChimney}
              size="1x"
              color="#1e71b8"
              className="mr-2"
            />
          ),
          href: "/Home/Medicaments",
          name: "BDD Medicaments",
        },
        {
          icon: (
            <FontAwesomeIcon
              icon={faXRay}
              size="1x"
              color="#1e71b8"
              className="mr-2"
            />
          ),
    
          href: "/Home/Analyse",
          name: "BDD Analyse",
        },
        {
    
            icon :  <FontAwesomeIcon
            icon={faQuestion}
            size="1x"
            color="#1e71b8"
            className="mr-2"
          />,
    
          href: "/Home/MedecinInfo",
          name: "Info Medecin",
        },
      ];
      const location = useLocation(); // Get the current path
      const pathname = location.pathname;

  return (
<>

<div className=" border-r-4  w-1/6 bg-white  ">
            <div
              // className="sm:w-80  border-r-3   bg-white  flex justify-center "
              className=" flex justify-center"
            >
              <div className="flex flex-col h-full  w-full  pt-12  ">
                <div className=" sama3aticon flex justify-center w-full">
                  <FontAwesomeIcon
                    size="6x"
                    color="#1e71b8"
                    icon={faStethoscope}
                  />
                </div>
                <div className="flex-1 flex flex-col h-full overflow-auto mt-10">
                  <ul
                    // className=" text-sm font-medium flex-1"
                    className="w-full"
                  >
                    {navigation.map((item, idx) => (
                      <li key={idx} className={` my-2 py-5 pl-2  ${pathname ==item.href ? 'bg-gray-300' : 'text-[#BECOC2]'  }  `} >

                        <a
                          href={item.href}
                          className=' py-5 w-full ' 
                        

                          //   className="flex items-center w-full h-full  justify-center gap-x-2  p-5 rounded-lg hover:bg-[#3abff0] active:bg-[#82388c] duration-150" //  className="flex items-center w-full h-full justify-center gap-x-2 text-gray-600 p-5 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                        >
                            {item.icon}
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
</>  )
}

export default SideBar