import { useState } from 'react';

export const usePieChartData = (data) => {
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

    return chartData;
};
