import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';

import Loader from '../../common/Loader';

import { GeneralChartBody } from './GeneralChartPage';

import { GeneralChart } from './GeneralChartPage';

import { useChartStats } from '../../services/stats';
import useAuth from '../../contexts/auth';

const ChartGlucoseLevelBody: React.FC = () => {
  return (
    <GeneralChartBody
      chartName="Glucose Level"
      metric="glucoseLevel"
      showHeader
    />
  );
};

const ChartA1CBody: React.FC = () => {
  return <GeneralChartBody chartName="A1C" metric="a1cLevel" showHeader />;
};

const ChartEAGBody: React.FC = () => {
  return <GeneralChartBody chartName="EAG" metric="eag" showHeader />;
};

const ChartGMIBody: React.FC = () => {
  return <GeneralChartBody chartName="GMI" metric="gmi" showHeader />;
};

const ChartCVBody: React.FC = () => {
  return <GeneralChartBody chartName="CV" metric="cv" showHeader />;
};

const ChartBMIBody: React.FC = () => {
  return <GeneralChartBody chartName="BMI" metric="bmi" showHeader />;
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <ChartGlucoseLevelBody />
        <ChartA1CBody />
        <ChartEAGBody />
        <ChartGMIBody />
        <ChartCVBody />
        <ChartBMIBody />
      </div>
    </>
  );
};

export default AllCharts;
