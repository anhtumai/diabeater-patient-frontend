import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Dashboard from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes, { doctorRoute } from './routes';
import React from 'react';
import DoctorLayout from './layout/DoctorLayout';

import { StreamChat, User } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';
import './layout.css';

const userId = 'cool-limit-6';
const userName = 'Jason Diabetes';

const user: User = {
  id: userId,
  name: userName,
  image: 'https://i.ticketweb.com/i/00/08/79/39/81/Original.jpg?v=1',
};

const apiKey = 'ej4geb6tqveu';
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY29vbC1saW1pdC02In0.NEPRWLrIE5m-eBs1355GjWF_-rNOxcEHHzkdnpORXuI';

const chatClient = new StreamChat(apiKey);
chatClient.connectUser(user, userToken);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  image: 'https://www.racefans.net/wp-content/uploads/2021/11/racefansdotnet-21-11-11-11-53-05-5.jpg',
  name: 'Dr. Kimi Räikkönen',
  members: [userId],
});

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
// 43ywm67bpfq7tuzdmgekepestyf8tapms2879kadcjcgmakaf624xb5eg3skswzn
function App() {
  useEffect(() => {
    setTimeout(() => chatClient.disconnectUser()
    , 2000);
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route element={<DoctorLayout />}>
          {doctorRoute.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>

        <Route element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>

      <div className="absolute z-999 right-5 bottom-5 ">
        <Chat client={chatClient} theme="str-chat__theme-light">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </>
  );
}

export default App;
