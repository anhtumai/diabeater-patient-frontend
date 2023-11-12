import { Link } from 'react-router-dom';
import DangerAnimated from '../images/animated/danger.gif';
import React from 'react';

export const copyPopup = {
  initial: {
      opacity: 0,
      scale: 0.5
  },
  animate: {
      opacity: 1,
      scale: 1,
      transition: {
          ease: "easeInOut",
          duration: 0.1
      }
  },
  exit: {
      opacity: 0
  }
}

const ChatCard = () => {
  return (
    <div className="relative slide-in col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Chats
      </h4>

      <img className='absolute right-2 top-2 w-12' src={DangerAnimated} alt="" />

      <div>
        <Link
          to="/"
          className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
        >
          <div className="relative h-16 w-16 rounded-full">
            <img className='rounded-full w-16 h-16 object-cover' src={"https://www.themoviedb.org/t/p/original/t9Ap19WC4uPMTFNrmX0cTRU6GIn.jpg"} alt="User" />
            <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-6"></span>
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h5 className="font-medium">Dr. Kimi Räikkönen</h5>
              <p>
                <span className="text-md">Hi, looks like your glucose levels are on the rise, we should schedule a checkup</span>
                <span className="text-xs"> . 10:12 PM</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChatCard;
