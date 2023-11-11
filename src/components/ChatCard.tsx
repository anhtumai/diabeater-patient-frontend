import { Link } from 'react-router-dom';
import UserOne from '../images/user/user-01.png';
import UserTwo from '../images/user/user-02.png';
import UserThree from '../images/user/user-03.png';
import UserFour from '../images/user/user-04.png';
import UserFive from '../images/user/user-05.png';
import React from 'react';

const ChatCard = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Chats
      </h4>

      <div>
        <Link
          to="/"
          className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
        >
          <div className="relative h-14 w-14 rounded-full">
            <img src={UserFive} alt="User" />
            <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-meta-6"></span>
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h5 className="font-medium">Doctor Strange</h5>
              <p>
                <span className="text-sm">I will send your precription</span>
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
