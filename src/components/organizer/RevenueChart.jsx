import { useState } from 'react';
import Chart from 'react-apexcharts';

const RevenueChart = ({ data, type = 'revenue' }) => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  const getChartData = () => {
    if (type === 'revenue') {
      return {
        options: {
          chart: {
            id: 'revenue-chart',
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false,
            }
          },
          colors: ['#3b82f6'],
          xaxis: {
            categories: timeRange === 'monthly' ? data.months : data.days,
            labels: {
              style: {
                colors: Array(12).fill('#94a3b8')
              }
            }
          },
          yaxis: {
            labels: {
              formatter: function(value) {
                return '$' + value.toFixed(0);
              },
              style: {
                colors: ['#94a3b8']
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'vertical',
              shadeIntensity: 0.3,
              opacityFrom: 0.7,
              opacityTo: 0.2,
              stops: [0, 100]
            }
          },
          stroke: {
            curve: 'smooth',
            width: 3
          },
          grid: {
            borderColor: '#e2e8f0',
            strokeDashArray: 4,
            row: {
              colors: ['transparent']
            }
          },
          tooltip: {
            theme: 'dark',
            y: {
              formatter: function(value) {
                return '$' + value.toFixed(2);
              }
            }
          }
        },
        series: [{
          name: 'Revenue',
          data: timeRange === 'monthly' ? data.revenueMonthly : data.revenueDaily
        }]
      };
    } else {
      return {
        options: {
          chart: {
            id: 'tickets-chart',
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false,
            }
          },
          colors: ['#10b981'],
          xaxis: {
            categories: timeRange === 'monthly' ? data.months : data.days,
            labels: {
              style: {
                colors: Array(12).fill('#94a3b8')
              }
            }
          },
          yaxis: {
            labels: {
              formatter: function(value) {
                return value.toFixed(0);
              },
              style: {
                colors: ['#94a3b8']
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'vertical',
              shadeIntensity: 0.3,
              opacityFrom: 0.7,
              opacityTo: 0.2,
              stops: [0, 100]
            }
          },
          stroke: {
            curve: 'smooth',
            width: 3
          },
          grid: {
            borderColor: '#e2e8f0',
            strokeDashArray: 4,
            row: {
              colors: ['transparent']
            }
          },
          tooltip: {
            theme: 'dark'
          }
        },
        series: [{
          name: 'Tickets Sold',
          data: timeRange === 'monthly' ? data.ticketsMonthly : data.ticketsDaily
        }]
      };
    }
  };

  const chartData = getChartData();

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">
          {type === 'revenue' ? 'Revenue Overview' : 'Tickets Sold'}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('daily')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              timeRange === 'daily'
                ? "bg-primary text-white"
                : "bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              timeRange === 'monthly'
                ? "bg-primary text-white"
                : "bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <div className="h-72">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height="100%"
        />
      </div>
    </div>
  );
};

export default RevenueChart;