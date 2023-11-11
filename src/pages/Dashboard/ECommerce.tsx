import { Link } from 'react-router-dom';

import { MetricCard } from '../../components/CardOne';
import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/TableOne.tsx';
import ChartBMI from '../../components/ChartBMI';
import React from 'react';

const InsertNewDataButton = () => {
  return (
    <Link
      to="#"
      className="inline-flex ml-auto items-center justify-center gap-2.5 rounded-full border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      <span></span>
      Insert metrics
    </Link>
  );
};

const BloodLevelCard = () => (
  <MetricCard
    metricName="Blood Level"
    unit="unit"
    average={10.0}
    latest={12.0}
    date="11/11/2023"
    generalAnalysis="Dcm frontend"
    changePercentage={0.43}
    isUp={true}
  />
);

const ECommerce = () => {
  return (
    <>
      <div className="grid grid-cols w-full mb-4">
        <InsertNewDataButton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <BloodLevelCard />
        <BloodLevelCard />
        <BloodLevelCard />
        <BloodLevelCard />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChatCard />
      </div>
    </>
  );
};

//<ChartOne />
//    <ChartTwo />
//       <ChartThree />
//       <MapOne />
//<div className="col-span-12 xl:col-span-8">
//  <TableOne />
//</div>;
export default ECommerce;
