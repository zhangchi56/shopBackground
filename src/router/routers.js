const Home = () => import('views/home/Home')
const Login = () => import('views/login/Login')

export default ([{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'Home',
  component: Home

}, {
  path: '/login',
  name: 'Login',
  component: Login
}])
