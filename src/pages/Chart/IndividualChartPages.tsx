import GeneralChartPage from './GeneralChartPage';

export const ChartEAGPage: React.FC = () => {
  return <GeneralChartPage chartName="EAG" metric="eag" />;
};

export const ChartGMIPage: React.FC = () => {
  return <GeneralChartPage chartName="GMI" metric="gmi" />;
};

export const ChartCVPage: React.FC = () => {
  return <GeneralChartPage chartName="CV" metric="cv" />;
};

export const ChartBMIPage: React.FC = () => {
  return <GeneralChartPage chartName="BMI" metric="bmi" />;
};
