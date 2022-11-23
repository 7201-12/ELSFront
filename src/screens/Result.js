import {useEffect, useState} from "react";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";
import {useNavigate, useParams} from "react-router-dom";

const Result = () => {
    const [resultChl, setResultChl] = useState('');
    const [resultPol, setResultPol] = useState('');
    const [resultUmn, setResultUmn] = useState('');
    const navigate = useNavigate();
    const params = useParams();
    const themeId = params.themeId;

    const getBack = () => {
        navigate("/");
    }

    useEffect(() => {
        setResultPol(localStorage.getItem('result_'+themeId+'_1'));
        setResultChl(localStorage.getItem('result_'+themeId+'_2'));
        setResultUmn(localStorage.getItem('result_'+themeId+'_3'));
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
                            Результат теста на полноту знаний: {resultPol}
                        </h1>
                        <h1 className="text-2xl font-bold sm:text-5xl">
                            Результат теста на целостность знаний: {resultChl}
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