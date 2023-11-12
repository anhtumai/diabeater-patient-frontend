import React, { useEffect, useRef } from 'react';
import UserOne from '../../images/user/user-01.png';
import UserTwo from '../../images/user/user-02.png';
import UserThree from '../../images/user/user-03.png';
import UserFour from '../../images/user/user-04.png';
import UserFive from '../../images/user/user-05.png';
import { capitalizeFirstLetter } from '../../helper';
import DangerAnimated from '../../images/animated/danger.gif';
import { Link } from 'react-router-dom';
import { useFetchPatients } from '../../services/patients';
import Loader from '../../common/Loader';

type Patient = {
  userId: number;
  age: number;
  fullName: string;
  gender: string;
  status: string;
  details: string[];
};

function getUserAvatar(userId: number) {
  if (userId === 3) {
    return UserOne;
  }
  return UserThree;
}

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
  const fetchPatientsQuery = useFetchPatients();

  console.log('Fetch Patient Query', fetchPatientsQuery);

  if (fetchPatientsQuery.isLoading) {
    return <Loader />;
  }

  const patients: Patient[] = fetchPatientsQuery.data.data;

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

        {patients.map((patient) => (
          <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-4">
            <div className="flex items-center gap-3 p-2.5 xl:p-5 relative">
              <div className="flex-shrink-0">
                <img
                  className="w-10"
                  src={getUserAvatar(patient.userId)}
                  alt=""
                />
              </div>
              <div>
                <Link to={`/patients/${patient.userId}`}>
                  <p className="hidden text-black dark:text-white sm:block">
                    {patient.fullName}
                  </p>
                </Link>

                <span>{`${patient.gender}, ${patient.age}`} years</span>
              </div>
              {patient.status === 'danger' && (
                <img
                  className="w-8 absolute -right-5"
                  src={DangerAnimated}
                  alt="danger icon"
                />
              )}
            </div>

            <div className=" items-center justify-center p-2.5 xl:p-5 hidden sm:flex">
              <p className="text-black dark:text-white ">{patient.type}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <SeverityPill severity={patient.status} />
            </div>

            <div className="p-2.5 xl:p-5 ">
              {patient.details.map((detail) => (
                <p className="text-black dark:text-white">{detail}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePatient;
