import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

const SalesDonutChart = () => {
  const options: ApexOptions = {
    series: [75, 47, 82],
    labels: ['Hanoi', 'Ho Chi Minh', 'Da Nang'],
    chart: { height: 269, type: 'donut' },
    colors: ['#0f9cf3', '#34c38f', '#f46a6a'],
    legend: { show: true, position: 'bottom', horizontalAlign: 'center' },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true, offsetY: -7 },
            value: { show: true, offsetY: 5 },
            total: { show: true, showAlways: true, label: 'Total' },
          },
        },
      },
    },
    dataLabels: { enabled: false },
  }

  return (
    <ReactApexChart
      options={options}
      series={options.series as number[]}
      type="donut"
      height={269}
    />
  )
}

export default SalesDonutChart
