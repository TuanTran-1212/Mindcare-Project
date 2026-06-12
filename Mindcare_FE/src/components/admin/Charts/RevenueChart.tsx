import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

const RevenueChart = () => {
  const options: ApexOptions = {
    series: [
      { name: 'Revenue', data: [31000, 40000, 28000, 51000, 42000, 109000, 100000] },
      { name: 'Orders', data: [11000, 32000, 45000, 32000, 34000, 52000, 41000] },
    ],
    chart: { height: 350, type: 'area', toolbar: { show: false } },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.5, stops: [0, 90, 100] },
    },
    colors: ['#0f9cf3', '#34c38f'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
    grid: { strokeDashArray: 3, padding: { left: 0, right: 0, top: 30 } },
    legend: { show: true, position: 'top', horizontalAlign: 'right', floating: true, offsetY: 15 },
    tooltip: { y: { formatter: (val: number) => `$${val}` } },
  }

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="area"
      height={350}
    />
  )
}

export default RevenueChart
