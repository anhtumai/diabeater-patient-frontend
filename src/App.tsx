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
    const role = authInfo!.roles[0];
    return (
      <QueryClientProvider client={queryClient}>
        {role === 'ROLE_PATIENT' ? <PatientApp /> : <DoctorApp />}
      </QueryClientProvider>
    );
  }
  return <UnauthenticatedApp />;
}

function UnauthenticatedApp() {
  return <SignIn />;
}

function PatientApp() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      <Routes>
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
    </>
  );
}

function DoctorApp() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      <Routes>
        <Route element={<DoctorLayout />}>
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
      </Routes>
    </>
  );
}

export default AuthWrapper;
