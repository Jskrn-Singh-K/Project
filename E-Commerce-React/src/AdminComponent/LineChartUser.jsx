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

function LineChartUser({value}) {

    
    const navigate = useNavigate();
     
        
        const arr=[];
        const user=[];
        value.map((item)=>{

            item.products.map((product)=>{
                if(user.includes(product.user)){
                    const i=user.indexOf(item.userName);
                    arr[i]+=product.quantity;
                   
                }
                user.push(item.userName);
                arr.push(product.quantity);
               
            })
        });

        const data={
            labels:user,
            datasets:[{
                label:"user",
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
                  text: 'Product user',
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

export default LineChartUser;