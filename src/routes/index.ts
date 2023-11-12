import { lazy } from 'react';
import {
  ChartGlucoseLevelPage,
  ChartA1CPage,
  ChartEAGPage,
  ChartGMIPage,
  ChartCVPage,
  ChartBMIPage,
} from '../pages/Chart/IndividualChartPages';

const DoctorDashboard = lazy(
  () => import('../pages/Dashboard/DoctorDashboard'),
);
const Calendar = lazy(() => import('../pages/Calendar'));
const AllCharts = lazy(() => import('../pages/Chart/AllCharts'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: AllCharts,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const chartRoutes = [
  {
    path: '/chart/glucoseLevel',
    title: 'Chart Glucose Level',
    component: ChartGlucoseLevelPage,
  },
  {
    path: '/chart/a1c',
    title: 'Chart A1C',
    component: ChartA1CPage,
  },
  {
    path: '/chart/bmi',
    title: 'Chart BMI',
    component: ChartBMIPage,
  },
  {
    path: '/chart/eag',
    title: 'Chart EAG',
    component: ChartEAGPage,
  },
  {
    path: '/chart/gmi',
    title: 'Chart GMI',
    component: ChartGMIPage,
  },
  {
    path: '/chart/cv',
    title: 'Chart CV',
    component: ChartCVPage,
  },
  {
    path: '/chart/bmi',
    title: 'Chart BMI',
    component: ChartBMIPage,
  },
];

const routes = [...coreRoutes, ...chartRoutes];
export const doctorRoute = [
  {
    path: '/doctor',
    title: 'Doctor Dashboard',
    component: DoctorDashboard,
  },
];

export default routes;
