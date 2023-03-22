import GoBackButton from "../components/GoBackButton";
import {useEffect, useState, cloneElement} from "react";
import {Radar} from "react-chartjs-2"
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend, scales,
} from 'chart.js';
import LoadingScreen from "../components/LoadingScreen";

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(results.length > 0) {
            setIsLoading(false);
        }
    }, [results]);

    useEffect(() => {
        let res = [];
        for (let i = 1; i < 4; i++) {
            const resultPol = (parseInt(localStorage.getItem('result_'+i+'_1')));
            const resultChl = (parseInt(localStorage.getItem('result_'+i+'_2')));
            const resultUmn = (parseInt(localStorage.getItem('result_'+i+'_3')));
            const data = {
                labels: ['POL', 'CHL', 'UMN'],
                datasets: [
                    {
                        label: 'баллы',
                        data: [resultPol/1.5, resultChl/3, resultUmn/9],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ],
            };
            res.push(data);
        }
        let data = {
            labels: ['POL', 'CHL', 'UMN'],
            datasets: [
                {
                    label: 'баллы',
                    data: [(res[0].datasets[0].data[0] + res[1].datasets[0].data[0])/2,
                        (res[0].datasets[0].data[1] + res[1].datasets[0].data[1])/2,
                        (res[0].datasets[0].data[2] + res[1].datasets[0].data[2])/2],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };
        res.push(data)
        data = {
            labels: ['POL', 'CHL', 'UMN'],
            datasets: [
                {
                    label: 'баллы',
                    data: [(res[2].datasets[0].data[0] + res[3].datasets[0].data[0])/2,
                        (res[2].datasets[0].data[1] + res[3].datasets[0].data[1])/2,
                        (res[2].datasets[0].data[2] + res[3].datasets[0].data[2])/2],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };
        res.push(data)
        setResults(res);
    },[]);

    const Node = (props) => {
        const { inputs, outputs, data } = props;

        return (
            <div className="max-h-64">
                <Radar
                    width={1}
                    height={1}
                    data={results[data.themeId]}
                    options= {{
                        title: {
                            display: 'ahaha',
                            text: this.props.title,
                        },
                        scales: {
                            r: {
                                ticks: {
                                    color: 'red',
                                    stepSize: 0.1
                                },
                                min: 0,
                                max: 1
                            }
                        }
                    }}
                />
                <div style={{marginTop: '20px'}}>
                    {inputs.map((port) => cloneElement(port, {
                        style: { width: '50px', height: '25px', background: '#1B263B' }
                    }))}
                    {outputs.map((port) => cloneElement(port, {
                        style: { width: '50px', height: '25px', background: '#1B263B' }
                    }))}
                </div>
            </div>
        );
    };

    // const initialSchema = createSchema({
    //     nodes: [
    //         {
    //             id: 'node1',
    //             coordinates: [150, 60],
    //             render: Node,
    //             disableDrag: true,
    //             inputs: [ { id: 'port-1', alignment: 'right' } ],
    //             data: {
    //                 themeId: 0
    //             }
    //         },
    //         {
    //             id: 'node2',
    //             coordinates: [250, 60],
    //             render: Node,
    //             disableDrag: true,
    //             outputs: [ { id: 'port-2',  alignment: 'left' } ],
    //             data: {
    //                 themeId: 1
    //             }
    //         },
    //     ],
    //     links: [
    //         { input: 'port-1',  output: 'port-2', readonly: true, label: "yo" },
    //     ]
    // });

    // const UncontrolledDiagram = () => {
    //     const [schema, { onChange }] = useSchema(initialSchema);
    //
    //     return (
    //         <div style={{ height: '22.5rem' }}>
    //             <Diagram schema={schema} onChange={onChange} />
    //         </div>
    //     );
    // };

    function Chance() {
        let a = results[4].datasets[0].data[0]
        let b = results[4].datasets[0].data[1]
        let c = results[4].datasets[0].data[2]
        console.log(a,b,c, Math.sin(120*(Math.PI/180)))
        let square0 = a*b*Math.sin(120*(Math.PI/180))/2
        let square1 = c*b*Math.sin(120*(Math.PI/180))/2
        let square2 = a*c*Math.sin(120*(Math.PI/180))/2
        console.log(square0,square1,square2)
        let fullSquare = Math.sin(120*(Math.PI/180))*3/2
        console.log(fullSquare)
        return (square2+square1+square0)/fullSquare
    }

    return (
        <>
            {isLoading ? (<LoadingScreen/>) : (
        <section className="bg-gray-50">
            <GoBackButton/>
            <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="mt-20 text-2xl font-bold sm:text-3xl">
                        Интеллектуальная карта
                    </h1>
                    <h5 className="text-md">
                        Вероятность прохождения = {Chance().toFixed(2)}
                    </h5>
                    {/*<UncontrolledDiagram />*/}
                    <div className="grid grid-cols-3">
                        <div className={radarBoxStyle}>
                            Результаты 1 теста
                            <Radar
                                data={results[0]}
                            />
                        </div>
                        <div className={radarBoxStyle}>
                            Результаты 2 теста
                            <Radar
                                data={results[1]}
                            />
                        </div>
                        <div className="h-128 w-128 border-2 border-slate-800 rounded-sm">
                            <div></div>
                            {/*<Radar*/}
                            {/*    data={results[3]}*/}
                            {/*/>*/}
                        </div>
                        <div className={radarBoxStyle}>
                            Результаты 3 теста
                            <Radar
                                data={results[2]}
                            />
                        </div>
                        <div className="h-128 w-128 border-2 border-slate-800 rounded-sm">
                            <div></div>
                            {/*<Radar*/}
                            {/*    data={results[3]}*/}
                            {/*/>*/}
                        </div>
                        <div className={radarBoxStyle}>
                            Результаты 1+2 теста
                            <Radar
                                data={results[3]}
                            />
                        </div>
                        <div className={radarBoxStyle}>
                            Итоговые результаты
                            <Radar
                                data={results[4]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>)
            }
        </>
    )
}

const radarBoxStyle = "max-h-128 border-2 border-slate-800 rounded-sm"

export default IntMap