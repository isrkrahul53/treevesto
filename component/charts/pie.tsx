import { Pie } from 'react-chartjs-2';

export default function PieChart(){
    const labels = ['Male', 'Female'];
    const data = {
    labels: labels,
    datasets: [
        {
        label: 'Sales',
        data: [20,12],
        backgroundColor: ['#a5dfdf','#ffb1c1']
        }
    ]
    };
    return <Pie type={'polarArea'}  data={data} />
}

