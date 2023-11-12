import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';

import Loader from '../../common/Loader';

import { GeneralChartBody } from './GeneralChartPage';

import { GeneralChart } from './GeneralChartPage';

import { useChartStats } from '../../services/stats';

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
  const chartStatsQuery = useChartStats();

  if (chartStatsQuery.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb pageName="Chart" />

      <ChartEAGBody />
      <ChartGMIBody />
      <ChartCVBody />
      <ChartGMIBody />
    </>
  );
};

export default AllCharts;
