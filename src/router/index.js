import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由
import routes from './routers'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

// 全局前置守卫
// router.beforeEach((to, from, next) => {
//   // 获取token
//   let token = window.sessionStorage.getItem('token')

//   if (token) { // 已登录
//     // 防止重复登录
//     if (to.path === '/login') {
//       Vue.prototype.$message.error('请不要重复登录');
//       return next({
//         path: '/home'
//       })
//     }
//     // 其他验证...
//     // if(to.name !== 'error_404'){
//     // 	let rules = window.sessionStorage.getItem('rules')
//     // 	rules = rules ? JSON.parse(rules) : []

//     // 	let index = rules.findIndex(item=>{
//     // 		return item.rule_id > 0 && item.desc === to.name
//     // 	})
//     // 	if(index === -1){
//     // 		Vue.prototype.$message.error('你没有权限')
//     // 		return next({name:from.name ? from.name : 'error_404'})
//     // 	}
//     // }
//     next();
//   } else {
//     // 跳过登录页验证
//     if (to.path === '/login') {
//       return next();
//     }
//     // 未登录
//     Vue.prototype.$message.error('请先登录');
//     next({
//       path: '/login'
//     })
//   }
// })


export default router
