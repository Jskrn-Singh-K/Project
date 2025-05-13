import {  useNavigate} from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function LineChart({value}) {

    
    const navigate = useNavigate();
     
        
        const arr=[];
        const name=[];
        value.map((item)=>{
            item.products.map((product)=>{
                if(name.includes(product.name)){
                    const i=name.indexOf(product.name);
                    arr[i]+=product.quantity;
                   
                }
                name.push(product.name);
                arr.push(product.quantity);
               
            })
        });

        
        const data={
            labels:name,
            datasets:[{
                label:name,
                data:arr,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                fill: true,
            
            }]
        }
        const options = {
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Product name',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Sold',
                },
              },
            },
            elements: {
              line: {
                tension: 0.4,         
                borderWidth: 2,       
                borderColor: 'blue',  
              },
              point: {
                radius: 4,
                backgroundColor: 'blue',
              },
            },
          };
          
          

    return (
  
        <div>
            <Line options={options} data={data}/>
        </div>
    )
  }

export default LineChart;