import { Link } from 'react-router-dom';

import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import * as React from 'react';

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

function InfoPopover() {
  return (
    <div
      className="tooltip tooltip-right"
      data-tip="ECM is a good metric to measure this data. It sucks. DCM this assignment."
    >
      <IconInfoCircle />
    </div>
  );
}

const MetricCard: React.FC = (props: {
  metricName: string;
  unit: string;
  average: number;
  latest: number;
  date: string;
  generalAnalysis: string;
  changePercentage: number;
  isUp: boolean;
}) => {
  const {
    metricName,
    unit,
    average,
    latest,
    date,
    generalAnalysis,
    changePercentage,
    isUp,
  } = props;
  return (
    <div className="rounded-sm border border-stroke bg-white py-4 px-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <InfoPopover />
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

const CardOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg
          className="fill-primary dark:fill-white"
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
            fill=""
          />
          <path
            d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
            fill=""
          />
        </svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            $3.456K
          </h4>
          <span className="text-sm font-medium">Total views</span>
        </div>

        <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
          0.43%
          <svg
            className="fill-meta-3"
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
              fill=""
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export { MetricCard };
export default CardOne;
