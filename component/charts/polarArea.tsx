import { PolarArea } from 'react-chartjs-2';

export default function PolarAreaChart(){
    const labels = ['Total Profit', 'Total Income','Total Expense'];
    const data = {
    labels: labels,
    datasets: [
        {
        label: 'Sales',
        data: [20,12,6],
        backgroundColor: ['rgba(164, 223, 223, 0.5)','rgba(255, 179, 194, 0.5)','#9ad0f552']
        }
    ]
    };
    return <PolarArea type={'polarArea'}  data={data} />
}

