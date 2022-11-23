import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Radar} from "react-chartjs-2";
import GoBackButton from "../components/GoBackButton";
import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip} from "chart.js";
import LoadingScreen from "../components/LoadingScreen";

const Result = () => {
    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
    );
    const [resultChl, setResultChl] = useState(0);
    const [resultPol, setResultPol] = useState(0);
    const [resultUmn, setResultUmn] = useState(0);
    const params = useParams();
    const themeId = params.themeId;

    useEffect(() => {
        setResultPol(parseInt(localStorage.getItem('result_'+themeId+'_1')));
        setResultChl(parseInt(localStorage.getItem('result_'+themeId+'_2')));
        setResultUmn(parseInt(localStorage.getItem('result_'+themeId+'_3')));
    },[]);

    const data = {
        labels: ['POL', 'CHL', 'UMN'],
        datasets: [
            {
                label: 'баллы',
                data: [resultPol, resultChl, resultUmn],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return(
        <>
            <div className="bg-gray-50">
                <GoBackButton/>
            </div>
            <section className="bg-gray-50">
                <div className="mx-auto max-w-screen-4xl px-4 py-24 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Результаты теста №{themeId}
                        </h1>
                        <Radar
                            data={data}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Result;