import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from "../axios"
import { Chart as ChartJS } from 'chart.js/auto';
import { Dropdown } from 'flowbite-react';

const Dashboard = () => {

  const [month, setMonth] = useState("")
  const [sale, setSale] = useState("")
  const [year, setYear] = useState(new Date(Date.now()).getFullYear())
    
  
//   const fetchGraphdata = async () => {   
//     console.log(year);
//     try {
//         const response = await axios.get(
//           `sales/perfomance/?year=${year}`);
//         setMonth(response.data.response.monthly)
//         setSale(response.data.response.type_wise)
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };


const fetchGraphdata = async () => {   
  // api to call entries of bavas  
  console.log(year)
  try {
    const response = await axios.get(
      `sales/perfomance/?year=${year}`);
    setMonth(response.data.response.monthly)
    setSale(response.data.response.type_wise)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
  
  useEffect(() => {

  fetchGraphdata()
  
  }, [year]);


    return (

        <div className='bg-gray-200 h-screen '>
          <div className='h-[5%]'>
          <div className='h-[5%] px-10 py-3 '>
          <Dropdown label={year} dismissOnClick={true} color={""}>
            <Dropdown.Item onClick={()=>setYear(2021)}>2021</Dropdown.Item>
            <Dropdown.Item onClick={()=>setYear(2022)}>2022</Dropdown.Item>
            <Dropdown.Item onClick={()=>setYear(2023)}>2023</Dropdown.Item>
            <Dropdown.Item onClick={()=>setYear(2024)}>2024</Dropdown.Item>
            <Dropdown.Item onClick={()=>setYear(2025)}>2025</Dropdown.Item>
            <Dropdown.Item onClick={()=>setYear(2026)}>2026</Dropdown.Item>
          </Dropdown>
          </div>
          </div>
          <div className="h-[45%] py-5 flex justify-evenly pb-1">
          <div className='bg-white items-center px-4 h-full  w-[48%] rounded-3xl flex justify-center'>
          <Bar
              data={{
                // x-axis label values
                labels: ["Full", "Body", "Quick", "Wash", "Paint", "Others"],
                datasets: [
                  {
                    label: 'Sales',
                    backgroundColor: [
                      '#7AFF5D',
                      '#FF6B57',
                      '#64CEFF',
                      '#FFC96A',
                      '#F7A791',
                      '#BE7BF1'
                    ],
                    hoverBackgroundColor: [
                    '#8AC27E',
                    '#BB5A4D',
                    '#5CAACE',
                    '#D8A958',
                    '#C68E7F',
                    '#9F6CC6'
                    ],
                    data: Object.values(sale)
                  }
                ],
                }}
    
          />
          </div>
          <div className='bg-white items-center py-4 px-4 h-full w-[45%] rounded-3xl flex justify-center'>
              <Pie
              data={
                {
                  labels: Object.keys(sale),
                  datasets: [
                    {
                      label: 'Sales',
                      backgroundColor: [
                        '#7AFF5D',
                        '#FF6B57',
                        '#64CEFF',
                        '#FFC96A',
                        '#F7A791',
                        '#BE7BF1'
                      ],
                      hoverBackgroundColor: [
                      '#8AC27E',
                      '#BB5A4D',
                      '#5CAACE',
                      '#D8A958',
                      '#C68E7F',
                      '#9F6CC6'
                      ],
                      data: Object.values(sale)
                    }
                  ]
                }
              }
              options={{
                title:{
                  display:true,
                  text:'Average sale per month',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'left'
                }
              }}
            />

          </div>
          </div>
          <div className="h-[40%] p-5 ">
          <div className='bg-white h-full w-[100%] rounded-3xl flex justify-center'>
          <Line
              data={{
                // x-axis label values
                labels: ["Jan", "Feb", "Mar", "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                  {
                      label: "Sales per month",
                      // y-axis data plotting values
                      data: month,
                      fill: false,
                      borderWidth:4,
                      backgroundColor: "#404142",
                      borderColor:'#2bb821',
                      responsive:true
                    },
                  ],
                }}
                width={500} 
     
          />
          </div>
          </div>
        </div>


















  );
};

export default Dashboard;
