import {Radar} from "react-chartjs-2";

const RadarChart = (resultPol, resultChl, resultUmn) => {
    return (
        <Radar
            data={{
                labels: ['POL', 'CHL', 'UMN'],
                datasets: [
                    {
                        label: 'баллы',
                        data: [resultPol/(1.5*5), resultChl/(3*5), resultUmn/(9*5)],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ],
            }}
        />
    )
}

export default RadarChart