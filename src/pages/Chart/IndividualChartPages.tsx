import GeneralChartPage from './GeneralChartPage';

export const ChartGlucoseLevelPage: React.FC = () => {
  return <GeneralChartPage chartName="Glucose Level" metric="glucoseLevel" />;
};

export const ChartA1CPage: React.FC = () => {
  return <GeneralChartPage chartName="A1C" metric="a1cLevel" />;
};

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
