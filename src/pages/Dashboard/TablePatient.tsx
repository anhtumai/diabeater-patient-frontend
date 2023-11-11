import React, { useEffect, useRef } from 'react';
import UserOne from '../../images/user/user-01.png';
import UserTwo from '../../images/user/user-02.png';
import UserThree from '../../images/user/user-03.png';
import UserFour from '../../images/user/user-04.png';
import UserFive from '../../images/user/user-05.png';
import { capitalizeFirstLetter } from '../../helper';
import DangerAnimated from '../../images/animated/danger.gif';

const SeverityPill = ({ severity }: { severity: string }) => {
  let indicator;
  switch (severity) {
    case 'danger':
      indicator = 'bg-danger';
      break;
    case 'high':
      indicator = 'bg-danger-1';
      break;
    case 'warning':
      indicator = 'bg-warning';
      break;
    default:
      indicator = 'bg-primary';
      break;
  }

  return (
    <p className={`w-20 text-center rounded-2xl text-white py-1 ${indicator}`}>
      {capitalizeFirstLetter(severity)}
    </p>
  );
};
const TablePatient = () => {
  const data = [
    {
      name: 'Adam Messy',
      age: 28,
      sex: 'Male',
      severity: 'danger',
      type: '1',
      warning: ['GMI closed to threshold', 'eAG below average', 'Unusual TIR'],
      avatar: UserOne,
    },
    {
      name: 'Celine Ohio',
      age: 38,
      sex: 'Female',
      type: '2',
      severity: 'danger',
      warning: ['GMI closed to threshold', 'eAG below average', 'Unusual TIR'],
      avatar: UserTwo,
    },
    {
      name: 'Mathias Jason',
      age: 40,
      sex: 'Female',
      type: 'G',
      severity: 'high',
      warning: ['GMI closed to threshold', 'eAG below average'],
      avatar: UserThree,
    },
    {
      name: 'Olivia Lee',
      age: 49,
      sex: 'Female',
      type: '2',
      severity: 'high',
      warning: ['GMI closed to threshold', 'eAG below average'],
      avatar: UserFour,
    },
    {
      name: 'Duc Vu',
      age: 27,
      sex: 'Male',
      type: 'G',
      severity: 'warning',
      warning: ['GMI closed to threshold'],
      avatar: UserFive,
    },
  ];
  return (
    <div className="rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Patients
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Type
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Severity
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Warning
            </h5>
          </div>
        </div>

        {data.map((item) => (
          <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-4">
            <div className="flex items-center gap-3 p-2.5 xl:p-5 relative">
              <div className="flex-shrink-0">
                <img className="w-10" src={item.avatar} alt="" />
              </div>
              <div>
                <p className="hidden text-black dark:text-white sm:block">
                  {item.name}
                </p>
                <span>{`${item.sex}, ${item.age}`} years</span>
              </div>
              {item.severity === 'danger' && <img className='w-8 absolute -right-5' src={DangerAnimated} alt="danger icon" />}
            </div>

            <div className=" items-center justify-center p-2.5 xl:p-5 hidden sm:flex">
              <p className="text-black dark:text-white ">{item.type}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <SeverityPill severity={item.severity} />
            </div>

            <div className="p-2.5 xl:p-5 ">
              {item.warning.map((item) => (
                <p className="text-black dark:text-white">{item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePatient;
