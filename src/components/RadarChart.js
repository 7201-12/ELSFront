import {Radar} from "react-chartjs-2";

const RadarChart = (resultPol, resultChl, resultUmn) => {
    return (
        <Radar
            data={{
                labels: ['POL', 'CHL', 'UMN'],
                datasets: [
                    {
                        label: 'баллы',
                        data: [(1.5*5)/resultPol, (3*5)/resultChl, (9*5)/resultUmn],
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