import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 사업관리, 상담관리, 통계, 기타관리
 */
export const asyncRoutes = [
  {
    path: '/biz', // 사업관리 - 사업별 상담, 사업별 일정, 사업별 실적, 바이어 신청 내역
    component: Layout,
    redirect: '/biz/consulting/list',
    alwaysShow: true, // will always show the root menu
    name: 'Biz',
    meta: {
      title: 'bizManage', // will i18n route.permission
      icon: 'el-icon-suitcase',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'consulting/list',
        component: () => import('@/views/kotra/biz/consulting_list'), // 상담주선
        name: 'BizConsultingList',
        meta: { title: "consulting" }
      },
      {
        path: 'consulting/edit/:id',
        component: () => import('@/views/kotra/biz/consulting_edit'), // 상담 주선 설정
        name: 'BizConsultingSetup',
        meta: { title: "consultingSetup", noCache: true, activeMenu: '/biz/consulting/list' },
        hidden: true,
      },
      {
        path: 'schedule',
        component: () => import('@/views/kotra/biz/schedule'), // 상담주선
        name: 'BizSchedule',
        meta: {
          title: 'schedule'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'performance',
        component: () => import('@/views/kotra/biz/performance_list'), // 상담주선
        name: 'BizPerformanceList',
        meta: {
          title: 'performance'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'buyerRequest',
        component: () => import('@/views/kotra/biz/buyer_request_list'),
        name: 'BizBuyerRequestList',
        meta: {
          title: 'buyerRequest'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/consulting', // 상담관리 - 상담 주선, 참가 기업, 상담 승인, 상담 일정, 상담 결과
    component: Layout,
    redirect: '/consulting/match',
    alwaysShow: true, // will always show the root menu
    name: 'Consulting',
    meta: {
      title: 'consultingManage', // will i18n route.permission
      icon: 'el-icon-chat-dot-square',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'match',
        component: () => import('@/views/kotra/consulting/match_list'),
        name: 'ConsultingMatchList',
        meta: {
          title: 'consultingMatch',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'company',
        component: () => import('@/views/kotra/consulting/company'),
        name: 'ConsultingCompany',
        meta: {
          title: 'consultingCompany',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'accept',
        component: () => import('@/views/kotra/consulting/accept_list'),
        name: 'ConsultingAcceptList',
        meta: {
          title: 'consultingAccept',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'schedule',
        component: () => import('@/views/kotra/consulting/schedule'),
        name: 'ConsultingSchedule',
        meta: {
          title: 'consultingSchedule',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'result',
        component: () => import('@/views/kotra/consulting/result_list'),
        name: 'ConsultingResultList',
        meta: {
          title: 'consultingResult',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/statistic', // 통계 - 사업별 통계, 무역관별 통계, 기업별 통계
    component: Layout,
    redirect: '/statistic/biz',
    alwaysShow: true, // will always show the root menu
    name: 'Statistic',
    meta: {
      title: 'statistic', // will i18n route.permission
      icon: 'chart',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'biz',
        component: () => import('@/views/permission/page'),
        name: 'StatisticBiz',
        meta: {
          title: 'statisticBiz',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'trade',
        component: () => import('@/views/permission/page'),
        name: 'StatisticTrade',
        meta: {
          title: 'statisticTrade',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'company',
        component: () => import('@/views/permission/page'),
        name: 'StatisticCompany',
        meta: {
          title: 'statisticCompany',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/etc', // 기타 - 사용자 권한 관리, 대행업체 관리, 이메일/SMS 관리, 설문 관리, 공지사항 관리, Q&A 관리, 코드 관리
    component: Layout,
    redirect: '/etc/user',
    alwaysShow: true, // will always show the root menu
    name: 'Etc',
    meta: {
      title: 'etc', // will i18n route.permission
      icon: 'el-icon-s-operation',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/permission/page'),
        name: 'EctUser',
        meta: {
          title: 'ectUser',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'company',
        component: () => import('@/views/permission/page'),
        name: 'EtcCompany',
        meta: {
          title: 'etcCompany',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'email',
        component: () => import('@/views/permission/page'),
        name: 'EtcEmail',
        meta: {
          title: 'etcEmail',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'survey',
        component: () => import('@/views/permission/page'),
        name: 'EtcSurvey',
        meta: {
          title: 'etcSurvey',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'notice',
        component: () => import('@/views/permission/page'),
        name: 'EtcNotice',
        meta: {
          title: 'etcNotice',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'qa',
        component: () => import('@/views/permission/page'),
        name: 'EtcQA',
        meta: {
          title: 'etcQA',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'code',
        component: () => import('@/views/permission/page'),
        name: 'EtcCode',
        meta: {
          title: 'etcCode',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/kotra', // 데모 페이지
    component: Layout,
    redirect: '/kotra/demo',
    alwaysShow: true, // will always show the root menu
    name: 'Kotra',
    meta: {
      title: 'kotra', // will i18n route.permission
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'demo',
        component: () => import('@/views/components-demo/kotra'),
        name: 'KotraDemo',
        meta: {
          title: 'demo',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'calendar',
        component: () => import('@/views/components-demo/calendar'),
        name: 'KotraCalendar',
        meta: {
          title: 'calendar',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },

  // 아래는 처음부터 있던것.
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'permission', // will i18n route.permission
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'rolePermission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'createArticle', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'articleList', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'mergeHeader' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'pdf', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

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
