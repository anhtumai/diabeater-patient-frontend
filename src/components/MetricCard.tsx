import * as React from 'react';

import { Link } from 'react-router-dom';

function IconInfoCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
      <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
    </svg>
  );
}

function InfoPopover({ description }: { description: string }) {
  return (
    <div
      className="tooltip tooltip-right absolute right-4"
      data-tip={description}
    >
      <IconInfoCircle />
    </div>
  );
}

const ChangeInStat = ({ stat }: { stat: number }) => {
  return (
    <>
      <span className="font-bold text-xl group-hover:text-white">{stat}%</span>

      {stat > 0 ? (
        <svg fill="#D83F31" viewBox="0 0 16 16" height="2em" width="2em">
          <path
            fillRule="evenodd"
            d="M8 12a.5.5 0 00.5-.5V5.707l2.146 2.147a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 10.708.708L7.5 5.707V11.5a.5.5 0 00.5.5z"
          />
        </svg>
      ) : (
        <svg fill="#F4CE14" viewBox="0 0 16 16" height="2em" width="2em">
          <path
            fillRule="evenodd"
            d="M8 4a.5.5 0 01.5.5v5.793l2.146-2.147a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L7.5 10.293V4.5A.5.5 0 018 4z"
          />
        </svg>
      )}
    </>
  );
};

const MetricCard: React.FC = (props: {
  metricName:
    | 'eag'
    | 'gmi'
    | 'cv'
    | 'tir'
    | 'hypoevents'
    | 'hyperevents'
    | 'Glucose Level'
    | 'A1C Level'
    | 'bmi';
  average: number;
  latest: number;
  date: string;
  unit: string;
  description: string;
  generalAnalysis: string;
  changePercentage: number;
  isUp: boolean;
}) => {
  const {
    average,
    latest,
    unit,
    metricName,
    description,
    generalAnalysis,
    changePercentage,
  } = props;

  let redirectPath: string = metricName;
  if (metricName === 'Glucose Level') {
    redirectPath = 'glucoseLevel';
  }
  if (metricName === 'A1C Level') {
    redirectPath = 'a1c';
  }

  return (
    <div className="group rounded-xl border border-stroke bg-white py-4 px-5 shadow-default dark:border-strokedark dark:bg-boxdark relative hover:bg-primary cursor-pointer hover:text-white transition-all">
      <InfoPopover description={description} />
      <div className="absolute bottom-3 right-3 flex items-center ">
        <ChangeInStat stat={changePercentage} />
      </div>

      <div className="flex">
        <span className="group-hover:text-white row-span-3 my-auto font-bold text-lg w-40 text-graydark">
          {metricName}
        </span>
        <div>
          <p className="group-hover:text-white font-bold text-xl text-primary">
            {average} {unit}
          </p>
          <span>Average</span>
        </div>
      </div>

      <div className="mt-3">
        <p>
          Latest: {latest} {unit}
        </p>
        <p>{generalAnalysis}</p>
      </div>

      <Link
        to={`/chart/${redirectPath}`}
        className="inline-flex items-center justify-center bg-black text-center font-small text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-5 rounded-sm"
        style={{
          minWidth: '100px',
        }}
      >
        Detail
      </Link>
    </div>
  );
};

export default MetricCard;
