import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Dialog, Transition } from '@headlessui/react';

import MetricCard from '../../components/MetricCard';
import ChatCard from '../../components/ChatCard.tsx';

const InsertMetricModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className="inline-flex ml-auto items-center justify-center gap-2.5 rounded-full border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        onClick={openModal}
      >
        Insert metricss
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden text-left align-middle shadow-xl trannsition-all rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Insert metrics
                  </Dialog.Title>
                  <div className="mt-2">
                    <form action="#">
                      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-6.5">
                          <div>
                            <label className="mb-3 block text-black dark:text-white">
                              Glucose Level (mg/dL)
                            </label>
                            <input
                              type="number"
                              step={0.01}
                              placeholder="Glucose Level"
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="mb-3 block text-black dark:text-white">
                              A1C level (mg/dL)
                            </label>
                            <input
                              type="number"
                              step={0.01}
                              placeholder="A1C level"
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                          </div>

                          <div>
                            <label className="mb-3 block text-black dark:text-white">
                              Weight (kg)
                            </label>
                            <input
                              type="number"
                              placeholder="Weight"
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                          </div>

                          <div>
                            <label className="mb-3 block text-black dark:text-white">
                              Height (m)
                            </label>
                            <input
                              type="number"
                              step={0.01}
                              placeholder="Height"
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const EAGLevelCard: React.FC = () => (
  <MetricCard
    metric="eag"
    average={10.0}
    latest={12.0}
    date="11/11/2023"
    generalAnalysis="All is good"
    changePercentage={0.43}
    isUp={true}
  />
);

const GMICard: React.FC = () => (
  <MetricCard
    metric="gmi"
    average={10.0}
    latest={12.0}
    date="11/11/2023"
    generalAnalysis="All is good"
    changePercentage={0.43}
    isUp={true}
  />
);

const CVCard: React.FC = () => (
  <MetricCard
    metric="cv"
    unit="%"
    average={10.0}
    latest={12.0}
    date="11/11/2023"
    generalAnalysis="All is good"
    changePercentage={0.43}
    isUp={true}
  />
);

const TIRCard: React.FC = () => (
  <MetricCard
    metric="tir"
    unit="%"
    average={10.0}
    latest={12.0}
    date="11/11/2023"
    generalAnalysis="All is good"
    changePercentage={0.43}
    isUp={true}
  />
);

const HypoEventsCard: React.FC = () => (
  <MetricCard
    metric="hypoevents"
    average={10.0}
    latest={12.0}
    date="11/11/2023"
    generalAnalysis="All is good"
    changePercentage={0.43}
    isUp={true}
  />
);

const HyperEventsCard: React.FC = () => (
  <MetricCard
    metric="hyperevents"
    unit="mg/dL"
    average={10.0}
    latest={12.0}
    date="11/11/2023"
    generalAnalysis="All is good"
    changePercentage={0.43}
    isUp={true}
  />
);

const BMICard: React.FC = () => (
  <MetricCard
    metric="bmi"
    average={10.0}
    latest={12.0}
    date="11/11/2023"
    generalAnalysis="All is good"
    changePercentage={0.43}
    isUp={true}
  />
);

const ECommerce = () => {
  return (
    <>
      <div className="grid grid-cols w-full mb-4">
        <InsertMetricModal />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <EAGLevelCard />
        <GMICard />
        <CVCard />
        <TIRCard />
        <HypoEventsCard />
        <HyperEventsCard />
        <BMICard />
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

//                   className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
