import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import GetBack from "./GetBack";
import {useLocation, useNavigate} from "react-router-dom";

const GoBackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <ArrowLeftIcon className="max-h-24 ml-24 mt-16 absolute max-w-24 cursor-pointer hover:bg-gray-200" onClick={() => GetBack(navigate, location)}/>
        </div>
    )
}

export default GoBackButton