import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import useAuth, { AuthProvider } from './contexts/auth';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import SignIn from './pages/Authentication/SignIn';
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
import Dashboard from './pages/Dashboard/Dashboard';
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import { useClient } from './hooks/useClient';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

// Create a client
const queryClient = new QueryClient();

function AuthWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

function App() {
  const { isAuthenticated, authInfo } = useAuth();

  if (isAuthenticated()) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthenticatedApp />
      </QueryClientProvider>
    );
  }
  return <UnauthenticatedApp />;
}

function UnauthenticatedApp() {
  return <SignIn />;
}

function AuthenticatedApp() {
  const { authInfo } = useAuth();

  const user: User = {
    id: authInfo!.id!.toString(),
    name: authInfo?.username,
    image: 'https://i.ticketweb.com/i/00/08/79/39/81/Original.jpg?v=1',
  };

  const apiKey = 'ej4geb6tqveu';
  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNCJ9.EgY4I-MMZ9AuF2CVz6DmVUP38Te9DwlhSfmsAAPe4pM';

  const chatClient = new StreamChat(apiKey);
  chatClient.connectUser(user, userToken);

  const channel = chatClient.channel('messaging', 'health_channel_4', {
    // add as many custom fields as you'd like
    image:
      'https://www.racefans.net/wp-content/uploads/2021/11/racefansdotnet-21-11-11-11-53-05-5.jpg',
    name: 'Dr. Kimi Räikkönen',
    members: ['4', '3'],
  });

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      <Routes>
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
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

      {/* <div className="absolute z-999 right-5 bottom-5 ">
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
      </div> */}
    </>
  );
}

export default AuthWrapper;
