import { useRef, useEffect } from 'react';
import Highcharts, { Chart as HighchartsChart, type SeriesPieOptions, Point } from 'highcharts';

interface ChartProps {
  userValue: number;
  adminValue: number;
}

const UsersChart: React.FC<ChartProps> = ({ userValue, adminValue }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<HighchartsChart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Override the pie series animate method
    (() => {
      const H:any = Highcharts;
     H.seriesTypes.pie.prototype.animate = function (this: Highcharts.Series,init: boolean ) {
        const series = this as any;
      const chart = series.chart;
      const points = series.points;
      const { animation } = series.options;
      const { startAngleRad } = series;

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
                    points.forEach((p: any) => {
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
                          innerSize: '90%',
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
          points.forEach((point: any) => {
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
    if (chartRef.current) {
    chartInstanceRef.current = Highcharts.chart(chartRef.current as HTMLElement, {
      chart: {
        type: 'pie',
        events: {
          load: function () {
            // const chart = this;
     
            const centerX = this.plotLeft + this.plotWidth / 2;
            const centerY = this.plotTop + this.plotHeight / 2;

            this.renderer.text('Users', centerX, centerY)
              .css({
                fontSize: '14px',
                fontWeight: 'bold',
             
                textAlign: 'center', 
               
              
              })
              .attr({
                zIndex: 5,
                align: 'center' 
              })
              .add();
          }
        }
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
          '\u25cf ' +
          '{point.name}: {point.percentage:.1f}%',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          innerSize: "40%",
          allowPointSelect: true,
          borderWidth: 2,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}<br>{point.percentage:.1f}%', // Added <br> for better formatting
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
            { name: 'User', y: userValue, color: '#54D14D' },
            { name: 'Admin', y: adminValue, color: '#35C2FD' },
          ],
        } as SeriesPieOptions,
      ],
    }as Highcharts.Options
  )};
    // cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [userValue, adminValue]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '250px' }} />
  );
};

export default UsersChart;