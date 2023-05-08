import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           如果设置为noRedirect，则面包屑不会重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
 *  roles: ['admin','editor']     控制页面角色（您可以设置多个角色）
 *  title: 'title'                侧边栏和面包屑中显示的名称（建议设置）
 *  icon: 'svg-name'/'el-icon-x'  侧边栏中显示的图标
 *  breadcrumb: false             如果设置为false，则该项将在面包屑中隐藏（默认为true）
 *  activeMenu: '/example/list'   如果设置了路径，则侧边栏将突出显示您设置的路径
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: '主页',
      component: () => import('@/views/home/Home'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/',
    name: 'Home',
    component: (Home) => import('@/views/home/Home')
  },
  {
    path: '/test',
    name: 'test',
    component: (Home) => import('@/views/test')
  },
  {
    path: '/system',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'el-icon-s-tools'
    },
    alwaysShow: true,
    children: [
      {
        path: 'sysRole',
        component: () => import('@/views/system/sysRole/list'),
        meta: {
          title: '用户列表',
          icon: 'el-icon-s-help'
        }
      }
    ]
  },
  {
    path: '/questions/list',
    component: Layout,
    name: '题库管理',
    meta: {
      title: '题库管理',
      icon: 'el-icon-notebook-2'
    },
    children: [
      {
        path: 'list',
        name: '题库列表',
        component: () => import('@/views/questions/list'),
        meta: {
          title: '题库列表',
          icon: 'table'
        }
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/questions/add'),
        meta: {
          title: '单选题创建',
          icon: 'el-icon-edit-outline'
        }
      },
      {
        path: 'addMore',
        name: 'addMore',
        component: () => import('@/views/questions/addMore'),
        meta: {
          title: '多选题创建',
          icon: 'el-icon-edit-outline'
        }
      },
      {
        path: 'addTF',
        name: 'addTF',
        component: () => import('@/views/questions/addTF'),
        meta: {
          title: '判断题创建',
          icon: 'el-icon-edit-outline'
        }
      },
      {
        path: 'addSAQ',
        name: 'addSAQ',
        component: () => import('@/views/questions/addSAQ'),
        meta: {
          title: '简答题创建',
          icon: 'el-icon-edit-outline'
        }
      }
    ]
  },
  {
    path: '/exam/list',
    component: Layout,
    name: '考试管理',
    meta: {
      title: '考试管理',
      icon: 'el-icon-notebook-2'
    },
    children: [
      {
        path: 'list',
        name: '考试列表',
        component: () => import('@/views/exam/list'),
        meta: {
          title: '考试列表',
          icon: 'table'
        }
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/exam/add'),
        meta: {
          title: '考试创建',
          icon: 'el-icon-edit-outline'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
