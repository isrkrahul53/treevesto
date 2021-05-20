import { Line } from 'react-chartjs-2';
const labels = ['Jan', 'Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
const data = {
    labels: labels,
    datasets: [
        // {
        // label: 'Total Profit',
        // data: [2,5,12,24,15,32,25,27,33,40,35,50],
        // borderColor: '#ffe6aa',
        // backgroundColor: '#ffe6aa',
        // },
        {
        label: 'Total Income',
        data: [3,4,9,5,18,22,30,25,27,35,40,32,46],
        borderColor: '#a5dfdf',
        backgroundColor: '#a5dfdf',
        },
        {
        label: 'Total Expenses',
        data: [32,25,35,20,15,10,15,4,42,32,50,46],
        borderColor: '#ffb1c1',
        backgroundColor: '#ffb1c1',
        }
    ]
};

export default function LineChart(){

    return (
        <Line type="line" data={data} />
    )
}

