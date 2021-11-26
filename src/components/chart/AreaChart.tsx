import React from 'react';
import classNames from 'classnames/bind';
import styles from './AreaChart.module.scss';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const cx = classNames.bind(styles);
const defaultSeries = [
  {
    name: 'Series 1',
    data: [2, 35, 123, 221, 256, 456, 543],
  },
];

const AreaChart: React.FC = () => {
  const option: ApexOptions = {
    chart: {
      height: 280,
      type: 'area',
      //   background: '#39496a'
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories: [
        '01 Jan',
        '02 Jan',
        '03 Jan',
        '04 Jan',
        '05 Jan',
        '06 Jan',
        '07 Jan',
      ],
    },
    yaxis: {
      show: false,
    },
  };
  return (
    <div className={cx('area-chart')}>
      <div id="chart" style={{height: 500}}>
        <ReactApexChart
          options={option}
          series={defaultSeries}
          width="100%"
          type="area"
          height="100%"
        />
      </div>
    </div>
  );
};
export default AreaChart;
