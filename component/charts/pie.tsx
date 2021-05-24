import { Pie } from 'react-chartjs-2';

export default function PieChart(props){
    const labels = ['Male', 'Female'];
    const data = {
    labels: labels,
    datasets: [
        {
        label: 'Sales',
        data: props.data,
        backgroundColor: ['#a5dfdf','#ffb1c1']
        }
    ]
    };
    return <Pie type={'polarArea'}  data={data} />
}

