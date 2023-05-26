import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend, Title);

import styles from './SideStats.module.css';

const data = [
    {
        id: 1,
        rating: '1 star',
        userVotes: 2,
    },
    {
        id: 2,
        rating: '2 stars',
        userVotes: 13,
    },
    {
        id: 3,
        rating: '3 stars',
        userVotes: 10,
    },
    {
        id: 4,
        rating: '4 stars',
        userVotes: 25,
    },
    {
        id: 5,
        rating: '5 stars',
        userVotes: 50,
    },
];

export const SideStats = () => {
    const [chartData, setChartData] = useState({
        labels: data.map((data) => data.rating),
        datasets: [
            {
                label: 'Users Gained ',
                data: data.map((data) => data.userVotes),
                backgroundColor: [
                    'rgba(75,192,192,1)',
                    '#ecf0f1',
                    '#50AF95',
                    '#f3ba2f',
                    '#2a71d0',
                ],
            },
        ],
    });

    return (
        <div className={styles.chart}>
            <Pie
                data={chartData}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Places rating data',
                            font: {
                                size: 14,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};
