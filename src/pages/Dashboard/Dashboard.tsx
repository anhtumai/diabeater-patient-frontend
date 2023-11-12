import { useState, Fragment, useId } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Dialog, Transition } from '@headlessui/react';

import MetricCard from '../../components/MetricCard';
import ChatCard from '../../components/ChatCard';

import {
  fetchStats,
  useCreateUserStats,
  useUserStats,
} from '../../services/stats';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import React from 'react';
import useAuth from '../../contexts/auth';
import fireToast from '../../hooks/fireToast';
import toast from 'react-hot-toast';

const schema = z.object({
  glucoseLevel: z.coerce.number({
    required_error: 'Glucose level is required',
  }),
  a1cLevel: z.coerce.number({ required_error: 'A1C level is required' }),
  weight: z.coerce.number(),
  height: z.coerce.number(),
});

const InsertMetricModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authInfo } = useAuth();
  const { mutateAsync: createStat, isPending } = useCreateUserStats();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleCreateStat(data: any) {
    toast("You're doing great!", {
      position: 'bottom-right',
      icon: (
        <svg fill="#00A9FF" viewBox="0 0 16 16" height="1em" width="1em">
          <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-3.97-3.03a.75.75 0 00-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-.01-1.05z" />
        </svg>
      ),
    });
    // await createStat({ ...data, userId: authInfo?.id });
    closeModal();
  }

  return (
    <>
      <button
        className="bg-primary font-bold text-xl text-white inline-flex ml-auto items-center justify-center gap-2.5 rounded-xl border border-primary py-4 px-10 text-center hover:bg-opacity-90 lg:px-8 xl:px-10"
        onClick={openModal}
      >
        Insert metricss
      </button>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="moda relative slide-out text-lg">
        <div className="modal-box bg-primary text-white">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This is patient homepage. Try to add some new metrics by clicking the Insert button, then logout and login again with provided doctor account to continue!</p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden text-left align-middle shadow-xl trannsition-all rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-boxdark mb-2"
                  >
                    Insert metrics
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(handleCreateStat)}>
                    <div className="flex flex-col gap-5.5 p-2">
                      <div>
                        <label className="mb-3 block text-black dark:text-white">
                          Glucose Level (mg/dL)
                        </label>
                        <input
                          {...register('glucoseLevel')}
                          step={0.01}
                          placeholder="Glucose Level"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.glucoseLevel?.message && (
                          <p className="text-danger mt-2">
                            {errors.glucoseLevel?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-3 block text-black dark:text-white">
                          A1C level (mg/dL)
                        </label>
                        <input
                          {...register('a1cLevel')}
                          step={0.01}
                          placeholder="A1C level"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.a1cLevel?.message && (
                          <p className="text-danger mt-2">
                            {errors.a1cLevel?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-3 block text-black dark:text-white">
                          Weight (kg)
                        </label>
                        <input
                          {...register('weight')}
                          step={0.01}
                          placeholder="A1C level"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.weight?.message && (
                          <p className="text-danger mt-2">
                            {errors.weight?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-3 block text-black dark:text-white">
                          Height (m)
                        </label>
                        <input
                          {...register('height')}
                          step={0.01}
                          placeholder="A1C level"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.height?.message && (
                          <p className="text-danger mt-2">
                            {errors.height?.message}
                          </p>
                        )}
                      </div>

                      <button
                        disabled={isPending}
                        onClick={(e) => {}}
                        className="mt-4 bg-primary w-full text-white py-5 hover:bg-opacity-90 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const Dashboard = () => {
  const { authInfo } = useAuth();
  const { data } = useUserStats(authInfo?.id.toString());
  return (
    <>
      <div className="grid grid-cols w-full mb-4">
        <InsertMetricModal />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {data &&
          data.data &&
          data?.data?.data.map((item) => (
            <MetricCard
              metricName={item.metricName}
              average={item.average}
              latest={item.latest}
              unit={item.unit}
              description={item.description}
              generalAnalysis="All is good"
              changePercentage={item.change}
              isUp={true}
            />
          ))}

        {/* <EAGLevelCard />
        <GMICard />
        <CVCard />
        <TIRCard />
        <HypoEventsCard />
        <HyperEventsCard />
        <BMICard /> */}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChatCard />
      </div>
    </>
  );
};

export default Dashboard;
