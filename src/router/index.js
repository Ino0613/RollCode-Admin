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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
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
          title: '用户管理',
          icon: 'el-icon-s-help'
        }
      },
      {
        path: 'UserList',
        component: () => import('@/views/user/index'),
        name: 'UserList',
        meta: { title: '用户列表', icon: 'list' }
      },
      {
        path: 'UserAdd',
        component: () => import('@/views/user/index'),
        name: 'UserAdd',
        meta: { title: '添加用户', icon: 'add' }
      }
    ]
  },
  {
    path: '/questions',
    component: Layout,
    name: '题库管理',
    meta: {
      title: '题库管理',
      icon: 'el-icon-s-tools'
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
        name: '单选题创建',
        component: () => import('@/views/questions/add'),
        meta: {
          title: '单选题创建',
          icon: 'el-icon-s-help'
        }
      },
      {
        path: 'addMore',
        name: '多选题创建',
        component: () => import('@/views/questions/addMore'),
        meta: {
          title: '多选题创建',
          icon: 'el-icon-s-help'
        }
      },
      {
        path: 'addTF',
        name: '判断题创建',
        component: () => import('@/views/questions/addTF'),
        meta: {
          title: '判断题创建',
          icon: 'el-icon-s-help'
        }
      },
      {
        path: 'addSAQ',
        name: '简答题创建',
        component: () => import('@/views/questions/addSAQ'),
        meta: {
          title: '简答题创建',
          icon: 'el-icon-s-help'
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
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
