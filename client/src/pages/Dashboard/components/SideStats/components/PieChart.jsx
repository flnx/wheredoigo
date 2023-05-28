import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend, Title);

export const PieChart = ({ placeData }) => {
    const { data } = placeData;

    let chartData = {
        labels: ['No data for this place yet'],
        datasets: [
            {
                data: [1], // A single value for the gray circle
                backgroundColor: ['#F9DA8B'],
            },
        ],
    };

    if (data.length > 0) {
        chartData = {
            labels: data.map((place) => place.rating),
            datasets: [
                {
                    label: 'Votes',
                    data: data.map((place) => place.totalVotes),
                    backgroundColor: [
                        '#FF6384 ',
                        '#36A2EB ',
                        '#FFCE56 ',
                        '#9966FF ',
                        '#4BC0C0 ',
                    ],
                },
            ],
        };
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Place rating data',
                font: {
                    size: 14,
                },
            },
        },
    };

    return <Pie key={placeData.name} data={chartData} options={options} />;
};
