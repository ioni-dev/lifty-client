/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/routes', // the url
    icon: 'GpsIcon', // the component being exported from icons/index.js
    name: 'Routes', // name that appear in Sidebar
  },
  {
    path: '/app/drivers',
    icon: 'UsersIcon',
    name: 'Drivers',
  },
  {
    path: '/app/trucks',
    icon: 'TruckIcon',
    name: 'Trucks',
  },
  {
    path: '/app/clients',
    icon: 'ClientsIcon',
    name: 'Clients',
  },
  {
    path: '/app/activity',
    icon: 'ModalsIcon',
    name: 'Activity',
  },
  {
    path: '/app/reports',
    icon: 'TablesIcon',
    name: 'Reports',
  },
]

export default routes
