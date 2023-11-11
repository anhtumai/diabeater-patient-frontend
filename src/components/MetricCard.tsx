import * as React from 'react';

import { Link } from 'react-router-dom';

const metricsDetails = {
  eag: {
    metricName: 'eAG',
    unit: 'mg/dL',
    description:
      'Estimated average glucose (eAG) is an estimated average of your blood sugar (glucose) levels over a period of 2 to 3 months.\nKnowing your eAG helps you know your blood sugar levels over time. It shows how well you are controlling your diabetes.',
  },
  gmi: {
    metricName: 'GMI (A1C)',
    unit: 'mg/dL',
    description:
      'The glucose management indicator (GMI) is a metric that helps people with diabetes understand the current state of their glucose management.',
  },
  cv: {
    metricName: 'CV',
    unit: '%',
    description:
      'Coefficient of Variation is a measure of glucose variability.',
  },
  tir: {
    metricName: 'TIR / TAR / TBR',
    unit: '%',
    description: `Time In Range (TIR) is the percentage of time the blood sugar levels stay within a predetermined range for people with diabetes\n
      Time Above Range (TAR) is the percentage of time they stay above the range.\n
      Time Below Range (TBR) is the percentage of time they stay above the range.`,
  },
  hypoevents: {
    metricName: 'Hypoglycemic Events',
    unit: 'mg/dL',
    description:
      'The count of hypoglycemic events is typically a simple tally of the number of times that glucose values fall below a certain threshold (e.g., 70 mg/dL for adults). The duration of these events could also be tracked.',
  },
  hyperevents: {
    metricName: 'Hyperglycemic Events',
    unit: 'mg/dL',
    description:
      'The count of hyperglycemic events is a tally of the times that glucose values rise above a certain threshold (e.g., 180 mg/dL for adults). The duration of these events can also be tracked.',
  },
  bmi: {
    metricName: 'BMI',
    unit: 'kg/m2',
    description:
      'BMI is a measure used to determine whether a person has a healthy body weight for their height',
  },
};

function IconInfoCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
      <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
    </svg>
  );
}

function InfoPopover(props: { metric: string }) {
  const description = (metricsDetails[props.metric] as any).description;
  return (
    <div className="tooltip tooltip-right" data-tip={description}>
      <IconInfoCircle />
    </div>
  );
}

const MetricCard: React.FC = (props: {
  metric:
    | 'eag'
    | 'gmi'
    | 'cv'
    | 'tir'
    | 'hypoevents'
    | 'hyperevents'
    | 'bmi'
    | 'bmi';
  average: number;
  latest: number;
  date: string;
  generalAnalysis: string;
  changePercentage: number;
  isUp: boolean;
}) => {
  const {
    metric,
    average,
    latest,
    date,
    generalAnalysis,
    changePercentage,
    isUp,
  } = props;
  const { metricName, unit } = metricsDetails[metric];
  return (
    <div className="rounded-sm border border-stroke bg-white py-4 px-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <InfoPopover metric={metric} />
      <div className="grid grid-cols-3 grid-flow-row gap-2">
        <div className="col-span-1 grid grid-rows-5">
          <div className="row-span-3 my-auto">{metricName}</div>
          <div className="row-span-2 pt-11">
            <Link
              to="/chart"
              className="inline-flex items-center justify-center bg-black text-center font-small text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              style={{
                minWidth: '100px',
              }}
            >
              Stats
            </Link>
          </div>
        </div>
        <div className="col-span-2 grid grid-rows-4">
          <div className="row-span-1">
            Average: {average} {unit}
          </div>
          <div className="row-span-1">
            Latest ({date}): {latest} {unit}
          </div>
          <div className="row-span-1">{generalAnalysis}</div>
          <div className="row-span-1 flex flex-row-reverse pt-5">
            {changePercentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
