import { usePieChartData } from './usePieChartData';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend, Title);

export const PieChart = ({ data }) => {
    const chartData = usePieChartData(data);
    
    return (
        <Pie
            data={chartData}
            options={{
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
            }}
        />
    );
};
