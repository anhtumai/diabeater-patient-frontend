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
        <h1 className="text-sm text-title-md2 font-semibold text-black dark:text-white">
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
  console.log(
    '🚀 ~ file: PatientData.tsx:86 ~ PatientData ~ patients:',
    patients,
  );
  const patient = patients.find((item) => item.userId === Number(userId));

  return (
    <>
      <Breadcrumb pageName="Patient Information" />

      <div>
        <p>General user info</p>
        <p>Age: {patient.age}</p>
        <p>Gender: {patient.gender}</p>
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
