import {useEffect, useState} from "react";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {useNavigate} from "react-router-dom";

const Result = () => {
    const [resultChlPol, setResultChlPol] = useState('');
    const [resultUmn, setResultUmn] = useState('');
    const navigate = useNavigate();

    const getBack = () => {
        navigate("/");
    }

    useEffect(() => {
        setResultChlPol(localStorage.getItem('result_chl_pol'));
        setResultUmn(localStorage.getItem('result_umn'));
    },[]);

    return(
        <>
            <div className="bg-gray-50">
                <ArrowLeftIcon className="max-h-8 max-w-8 cursor-pointer hover:bg-gray-200" onClick={getBack}/>
            </div>
            <section className="bg-gray-50">
                <div className="mx-auto max-w-screen-4xl px-4 py-24 lg:flex lg:h-screen lg:items-center">

                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-2xl font-bold sm:text-5xl">
                            Результат теста на целостность и полноту знаний: {resultChlPol}
                        </h1>
                        <h1 className="text-2xl font-bold sm:text-5xl">
                            Результат теста на умения: {resultUmn}
                        </h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Result;