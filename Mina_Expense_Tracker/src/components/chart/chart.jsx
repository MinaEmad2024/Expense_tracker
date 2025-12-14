import Chart from 'react-apexcharts'




export default function TransactionChart({expense , income }){

    const options = {
  labels: ["Income", "Expense"],
  colors: ["#213ebf","#FD5E53"],
  };
    return <Chart 

        options={options}
        series={[income, expense]}
        type='pie'
        width={'100%'}
        height={'100%'}
    />
}
