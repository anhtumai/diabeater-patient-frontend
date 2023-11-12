import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import Breadcrumb from '../../components/Breadcrumb';
import Loader from '../../common/Loader';

import { useChartStats } from '../../services/stats';

type Stat = {
  id: number;
  userId: number;
  eag: number;
  gmi: number;
  cv: number;
  bmi: number;
  createTime: string;
};

function generateOptions(categories: string[]): ApexOptions {
  return {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
    },
  };
}

// assume data is sorted by time order, from farthest to soonest
export const GeneralChart: React.FC = (props: {
  metric: string;
  data: number[];
  categories: string[];
}) => {
  const { metric, data, categories } = props;
  const options = generateOptions(categories);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5"></div>
        <div className="flex w-full max-w-45 justify-end"></div>
      </div>

      <div>
        <div id={`char${metric}`} className="-ml-5">
          <ReactApexChart
            options={options}
            series={[
              {
                name: metric,
                data,
              },
            ]}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

function getDayMonthFromTime(time: string) {
  const x = time.split('T')[0].split('-');
  const month = x[1];
  const day = x[2];
  return `${day}/${month}`;
}

export const GeneralChartBody: React.FC = (props: {
  chartName: string;
  metric: 'eag' | 'gmi' | 'cv' | 'bmi';
}) => {
  const chartStatsQuery = useChartStats();

  if (chartStatsQuery.isLoading) {
    return <Loader />;
  }

  const { stats } = chartStatsQuery.data.data;

  const data: string[] = (stats as Stat[])
    .map((stat) => (stat as any)[props.metric])
    .reverse();

  const days = (stats as Stat[])
    .map((stat) => getDayMonthFromTime(stat.createTime))
    .reverse();

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <h1 className="text-xl font-semibold text-black dark:text-white">
          {props.metric}
        </h1>
        <GeneralChart metric={props.metric} data={data} categories={days} />
      </div>
    </>
  );
};

const GeneralChartPage: React.FC = (props: {
  chartName: string;
  metric: 'eag' | 'gmi' | 'cv' | 'bmi';
}) => {
  return (
    <>
      <Breadcrumb pageName={props.chartName} />
      <GeneralChartBody chartName={props.chartName} metric={props.metric} />
    </>
  );
};

export default GeneralChartPage;
