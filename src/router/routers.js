const Home = () => import('views/home/Home')
const Welcome = () => import('views/home/comps/Welcome')
const Login = () => import('views/login/Login')

export default ([{
  path: '/',
  redirect: '/login'
}, {
  path: '/home',
  name: 'Home',
  // redirect: '/welcome',
  component: Home,
  children: [{
    path: "/users",
    component: Welcome
  },{
    path: "/users",
    component: Welcome
  }]

}, {
  path: '/login',
  name: 'Login',
  component: Login
}])
