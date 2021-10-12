export const paths = {
  login: () => '/',
  loginAdmin: () => '/loginAdmin',
  admin: {
    prefix: () => '/admin',
    login: () => getAdminRoute('/login'),
    users: () => getAdminRoute('/users'),
    workplaces: () => getAdminRoute('/workplaces'),
  },
  user: {
    prefix: () => '/profile',
    plan: () => getUserRoute('/workplaces'),
    reservation: () => getUserRoute('/reservation'),
  },
}

const getAdminRoute = (route) => `/admin${route}`
const getUserRoute = (route) => `/profile${route}`

export const userTabs = [
  {
    url: paths.user.plan(),
    title: 'Workplaces'
  },
  {
    url: paths.user.reservation(),
    title: 'Reserved'
  }
]

export const adminTabs = [
  {
    url: paths.admin.users(),
    title: 'Users'
  },
  {
    url: paths.admin.workplaces(),
    title: 'Workplace'
  }
]