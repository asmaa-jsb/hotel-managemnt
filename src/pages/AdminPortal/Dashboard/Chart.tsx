// AnimatedPieChart.tsx
import React, { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';

const AnimatedPieChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // (Include the custom animate override code here, as I explained earlier)
    (function (H) {
       H.seriesTypes.pie.prototype.animate = function (init: boolean) {
          // ... your custom animation code here ...
       };
    })(Highcharts);

    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: { type: 'pie' },
        title: { text: 'Departmental Strength of a Company' },
        subtitle: { text: 'Custom animation of pie series' },
        tooltip: {
          headerFormat: '',
          pointFormat:
            '<span style="color:{point.color}">\u25cf</span> ' +
            '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: { valueSuffix: '%' }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            borderWidth: 2,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b><br>{point.percentage}%',
              distance: 20,
            },
          },
        },
        series: [
          {
            enableMouseTracking: false,
            animation: { duration: 2000 },
            colorByPoint: true,
            data: [
              { name: 'Customer Support', y: 21.3 },
              { name: 'Development', y: 18.7 },
              { name: 'Sales', y: 20.2 },
              { name: 'Marketing', y: 14.2 },
              { name: 'Other', y: 25.6 },
            ],
          },
        ],
      });
    }
  }, []);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
  );
};

export default AnimatedPieChart;