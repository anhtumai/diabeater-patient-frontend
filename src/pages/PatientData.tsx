import React from 'react';

import { useParams } from 'react-router-dom';

import Breadcrumb from '../components/Breadcrumb';

import Loader from '../common/Loader';

import { useChartStats } from '../services/stats';

import { GeneralChart } from './Chart/GeneralChartPage';
import { useFetchPatients } from '../services/patients';

type Stat = {
  id: number;
  userId: number;
  glucoseLevel: number;
  a1cLevel: number;
  eag: number;
  gmi: number;
  cv: number;
  bmi: number;
  createTime: string;
};

function getDayMonthFromTime(time: string) {
  const x = time.split('T')[0].split('-');
  const month = x[1];
  const day = x[2];
  return `${day}/${month}`;
}

const metricToNameMap = {
  glucoseLevel: 'Glucose Level',
  a1cLevel: 'A1C Level',
  eag: 'EAG',
  gmi: 'GMI',
  cv: 'CV',
  bmi: 'BMI',
};

const GeneralPatientChartBody: React.FC = (props: {
  chartName: string;
  metric: 'glucoseLevel' | 'a1cLevel' | 'eag' | 'gmi' | 'cv' | 'bmi';
  userId: number;
}) => {
  const chartStatsQuery = useChartStats(props.userId);

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
      <div className="gap-4 md:gap-6 2xl:gap-7.5">
        <h1 className="text-sm text-title-md mb-3 font-semibold text-black dark:text-white">
          {metricToNameMap[props.metric]}
        </h1>
        <GeneralChart metric={props.metric} data={data} categories={days} />
      </div>
    </>
  );
};

const PatientData = () => {
  const { userId } = useParams();
  const chartStatsQuery = useChartStats(Number(userId));

  const fetchPatientsQuery = useFetchPatients();

  if (chartStatsQuery.isLoading || fetchPatientsQuery.isLoading) {
    return <Loader />;
  }

  const patients = fetchPatientsQuery.data.data;

  const patient = patients.find((item) => item.userId === Number(userId));
  return (
    <>
      <Breadcrumb pageName="Patient Information" />

      <div className="mb-6">
        <div className="mb-3 flex">
          <button
            className="flex justify-center items-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 hover:opacity-90"
            type="submit"
          >
            <svg
              className="mr-2"
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z" />
            </svg>
            Message
          </button>

          <button
              className="bg-secondary ml-3 flex justify-center items-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 hover:opacity-90"
              onClick={() =>  window.location.href = "tel:+358417217783"}
          >
            <svg
            className='mr-2 '
              viewBox="0 0 512 512"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={32}
                d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z"
              />
            </svg>
            Call
          </button>
        </div>

        <div>
          <p>
            Name:{' '}
            <span className="text-primary font-semibold text-xl">
              {patient.fullName}
            </span>
          </p>
          <p>
            Age:{' '}
            <span className="text-primary font-semibold text-xl">
              {patient.age}
            </span>
          </p>
          <p>
            Gender:{' '}
            <span className="text-primary font-semibold text-xl">
              {patient.gender}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <GeneralPatientChartBody
          chartName="Glucose Level"
          metric="glucoseLevel"
          userId={userId}
        />

        <GeneralPatientChartBody
          chartName="A1C"
          metric="a1cLevel"
          userId={userId}
        />

        <GeneralPatientChartBody chartName="EAG" metric="eag" userId={userId} />

        <GeneralPatientChartBody chartName="GMI" metric="gmi" userId={userId} />

        <GeneralPatientChartBody chartName="CV" metric="cv" userId={userId} />

        <GeneralPatientChartBody chartName="BMI" metric="bmi" userId={userId} />
      </div>
    </>
  );
};

export default PatientData;
