
import { useRef, useEffect } from 'react';
import Highcharts, { Chart as HighchartsChart, SeriesPieOptions, Point } from 'highcharts';
interface ChartProps {
    pendingValue: number;
    completedValue: number;
}
const BookingChart: React.FC<ChartProps> =({pendingValue, completedValue}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<HighchartsChart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Override the pie series animate method
    (() => {
      const H = Highcharts;
      H.seriesTypes.pie.prototype.animate = function (init: boolean) {
        const series = this,
          chart = series.chart,
          points = series.points,
          { animation } = series.options,
          { startAngleRad } = series;

        function fanAnimate(point: Point, startAngleRad: number) {
          const graphic = point.graphic,
            args = point.shapeArgs;

          if (graphic && args) {
            graphic
              // Set initial animation values
              .attr({
                start: startAngleRad,
                end: startAngleRad,
                opacity: 1,
              })
              // Animate to the final position
              .animate(
                {
                  start: args.start,
                  end: args.end,
                },
                {
                  duration: (animation.duration || 1000) / points.length,
                },
                function () {
                  // on complete, start animating the next point
                  if (points[point.index + 1]) {
                    fanAnimate(points[point.index + 1], args.end);
                  }

                  // On the last point, fade in data labels and apply inner size
                  if (point.index === series.points.length - 1) {
                    if (series.dataLabelsGroup) {
                      series.dataLabelsGroup.animate({
                        opacity: 1,
                      });
                    }
                    points.forEach((p: Point) => {
                      p.opacity = 1;
                    });
                    series.update(
                      {
                        enableMouseTracking: true,
                      },
                      false
                    );
                    chart.update({
                      plotOptions: {
                        pie: {
                          innerSize: '40%',
                          borderRadius: 8,
                        },
                      },
                    });
                  }
                }
              );
          }
        }

        if (init) {
          // Hide points on init
          points.forEach((point: Point) => {
            if (point.graphic) {
              point.graphic.attr({ opacity: 0 });
            }
            point.opacity = 0;
          });
        } else {
          // Start animation from first point
          fanAnimate(points[0], startAngleRad || 0);
        }
      };
    })();

    // Generate chart
    chartInstanceRef.current = Highcharts.chart(chartRef.current, {
chart: {
  type: 'pie',
},
 title: {
        text: ''
    },
credits: {
  enabled: false
},

  tooltip: {
        headerFormat: '',
        pointFormat:
          '<span style="color:{point.color}">\u25cf</span> ' +
          '{point.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          borderWidth: 2,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.percentage:.1f}%',
            distance: 20,
            // Start hidden, will fade in during animation
            opacity: 0,
          },
        },
      },
      series: [
        {
          type: 'pie',
          enableMouseTracking: false, // Disable mouse tracking initially
          animation: {
            duration: 2000,
          },
          colorByPoint: true,
          data: [
      { name: 'Pending', y: pendingValue, color: '#007bff' }, 
      { name: 'Completed', y: completedValue, color: '#6f42c1' }, 
    ],
        } as SeriesPieOptions,
      ],
    });

    // cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };

  }, [completedValue, pendingValue]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
  );
};

export default BookingChart;