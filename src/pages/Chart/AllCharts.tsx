import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';

import Loader from '../../common/Loader';

import { GeneralChartBody } from './GeneralChartPage';

import { GeneralChart } from './GeneralChartPage';

import { useChartStats } from '../../services/stats';
import useAuth from '../../contexts/auth';

const ChartGlucoseLevelBody: React.FC = () => {
  return <GeneralChartBody chartName="Glucose Level" metric="glucoseLevel" />;
};

const ChartA1CBody: React.FC = () => {
  return <GeneralChartBody chartName="A1C" metric="a1cLevel" />;
};

const ChartEAGBody: React.FC = () => {
  return <GeneralChartBody chartName="EAG" metric="eag" />;
};

const ChartGMIBody: React.FC = () => {
  return <GeneralChartBody chartName="GMI" metric="gmi" />;
};

const ChartCVBody: React.FC = () => {
  return <GeneralChartBody chartName="CV" metric="cv" />;
};

const ChartBMIBody: React.FC = () => {
  return <GeneralChartBody chartName="BMI" metric="bmi" />;
};

const AllCharts = () => {
  const { authInfo } = useAuth();
  const chartStatsQuery = useChartStats(authInfo!.id);

  if (chartStatsQuery.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Chart" />

      <ChartGlucoseLevelBody />
      <ChartA1CBody />
      <ChartEAGBody />
      <ChartGMIBody />
      <ChartCVBody />
      <ChartGMIBody />
    </>
  );
};

export default AllCharts;
