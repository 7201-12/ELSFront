import GoBackButton from "../components/GoBackButton";
import {useEffect, useState} from "react";
import {Radar} from "react-chartjs-2"
import { Graph, DefaultLink, DefaultNode } from '@visx/network';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

const IntMap = () => {
    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
    );
    const [results, setResults] = useState([]);

    useEffect(() => {
        let res = [];
        for (let i = 1; i < 4; i++) {
            let resultPol = (parseInt(localStorage.getItem('result_'+i+'_1')));
            let resultChl = (parseInt(localStorage.getItem('result_'+i+'_2')));
            let resultUmn = (parseInt(localStorage.getItem('result_'+i+'_3')));
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
            res.push(data);
        }
        setResults(res);
    },[]);

    const nodes = [
        { x: 50, y: 20 },
        { x: 200, y: 300 },
        { x: 300, y: 40 },
    ];

    const dataSample = {
        nodes,
        links: [
            { source: nodes[0], target: nodes[1] },
            { source: nodes[1], target: nodes[2] },
            { source: nodes[2], target: nodes[0] },
        ],
    };

    const MyGraph = () => (
        <Graph graph={dataSample} linkComponent={DefaultLink} nodeComponent={DefaultNode} />
    );

    return (
        <section className="bg-gray-50">
            <GoBackButton/>
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Интеллектуальная карта
                    </h1>
                    <Radar
                        data={results[0]}
                    />
                </div>
            </div>
        </section>
    )
}

export default IntMap