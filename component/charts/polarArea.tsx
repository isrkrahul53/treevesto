import { PolarArea } from 'react-chartjs-2';

export default function PolarAreaChart(props){
    const labels = ['Products', 'Vendors','Users','Sales'];
    const data = {
    labels: labels,
    datasets: [
        {
        label: 'Sales',
        data: props.data,
        backgroundColor: ['#ffcf9f8f','rgba(164, 223, 223, 0.5)','rgba(255, 179, 194, 0.5)','#9ad0f552']
        }
    ]
    };
    return <PolarArea type={'polarArea'}  data={data} />
}

