import { lazy } from 'react'
// import Trucks from '../pages/Trucks'

// use lazy for better code splitting, a.k.a. load faster
const Routes = lazy(() => import('../pages/Routes'))
const Drivers = lazy(() => import('../pages/Drivers'))
const Trucks = lazy(() => import('../pages/Trucks'))
const Clients = lazy(() => import('../pages/Clients'))
const Activity = lazy(() => import('../pages/Activity'))
const Reports = lazy(() => import('../pages/Reports'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/routes', // the url
    component: Routes, // view rendered
  },
  {
    path: '/drivers',
    component: Drivers,
  },
  {
    path: '/trucks',
    component: Trucks,
  },
  {
    path: '/clients',
    component: Clients,
  },
  {
    path: '/activity',
    component: Activity,
  },
  {
    path: '/reports',
    component: Reports,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
