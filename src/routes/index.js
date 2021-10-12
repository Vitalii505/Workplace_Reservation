import { paths } from '../constants'
import Layout from '../components/Layout'
import Login from '../pages/login/Login'
import Users from '../pages/users/Users'
import Workplace from '../pages/plan_workplace/Workplace'
import Reserved from '../pages/reserved/Reserved'
import Workplaces from '../pages/workplaces/Workplaces'
import Error404Page from '../pages/error404/Error404Page'

export const routes = [
  {
    path: paths.login(), // /login
    exact: true,
    component: Login
  }, // /login

  {
    path: paths.loginAdmin(), // /login
    exact: true,
    component: Login
  }, // /login


  // admin routes
  {
    component: Layout,
    path: paths.admin.prefix(), // /admin
    routes: [
      { exact: true, path: paths.admin.users(), component: Users }, // /admin/users
      { exact: true, path: paths.admin.workplaces(), component: Workplaces }, // /admin/workplaces
    ],
  },


  // user routes
  {
    component: Layout,
    path: paths.user.prefix(), // /profile
    routes: [
      { exact: true, path: paths.user.plan(), component: Workplace }, // /profile/plan
      { exact: true, path: paths.user.reservation(), component: Reserved }, // /profile/reservation
    ],
  },


  { path: '*', component: Error404Page },
]
