import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //默认进入
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    // 登录页面
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/index.vue')
    },
    //总览
    {
      path: '/zonglan',
      name: 'zonglan',
      component: () => import('../components/menu/zonglan.vue')
    },
    // 雨情
    {
      path: '/shuzidatingYQ',
      name: 'shuzidatingYQ',
      component: () => import('../components/menu/shuzidatingYQ.vue')
    },
    // 水情
    {
      path: '/shuzidatingSQ',
      name: 'shuzidatingSQ',
      component: () => import('../components/menu/shuzidatingSQ.vue')
    },
    // 工情
    {
      path: '/shuzidatingGQ',
      name: 'shuzidatingGQ',
      component: () => import('../components/menu/shuzidatingGQ.vue')
    },
    // 圩区
    {
      path: '/shuzidatingWQ',
      name: 'shuzidatingWQ',
      component: () => import('../components/menu/shuzidatingWQ.vue')
    },
    //台风
    {
      path: '/shuzidatingTyphoon',
      name: 'shuzidatingTyphoon',
      component: () => import('../components/menu/shuzidatingTyphoon.vue')
    },
    // 预报
    {
      path: '/yubao',
      name: 'yubao',
      component: () => import('../components/menu/yubao.vue')
    },
    // 预警
    {
      path: '/yubaoyujing',
      name: 'yubaoyujing',
      component: () => import('../components/menu/yubaoyujing.vue')
    },
    // 预演
    {
      path: '/yuyan',
      name: 'yuyan',
      component: () => import('../components/menu/yuyan.vue')
    },
    //台风专题
    {
      path: '/shuzidatingTFZT',
      name: 'shuzidatingTFZT',
      component: () => import('../components/menu/shuzidatingTFZT.vue')
    },
    //槽蓄量专题
    {
      path: '/shuzidatingCXL',
      name: 'shuzidatingCXL',
      component: () => import('../components/menu/shuzidatingCXL.vue')
    },
    // 工情
    {
      path: '/shuzidatingLL',
      name: 'shuzidatingLL',
      component: () => import('../components/menu/shuzidatingLL.vue')
    },
    //pinggu
    {
      path: '/pinggu',
      name: 'pinggu',
      component: () => import('../components/menu/pinggu.vue')
    },
    //气象板块：降水、增水
    {
      path: '/qixiangMap',
      name: 'qixiangMap',
      component: () => import('../components/menu/qixiangMap.vue')
    },
    //气象板块：雷达图
    {
      path: '/qixiang',
      name: 'qixiang',
      component: () => import('../components/menu/qixiang.vue')
    },
  ]
})

// 全局路由守卫：已登录用户访问登录页时直接跳转到总览
// router.beforeEach((to, from, next) => {
//   if (to.path === '/' || to.path === '/login') {
//     const token = localStorage.getItem("token");
//     if (token) {//说明是登录状态的
//       window.location.href = "/zonglan";
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router