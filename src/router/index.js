import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getRoutesByIdentity } from '../apis/route/index'

let flag = true
const routes = [
    {
        path: '/',
        component: () => import('../views/Index.vue')
    },
    {
        name: 'Login',
        path: '/Login',
        component: () => import('../views/Login.vue')
    },
    {
        name: 'Register',
        path: '/Register',
        component: () => import('../views/Register.vue')
    },
    {
        name: '404',
        path: '/404',
        component: () => import('../views/404.vue')
    },
    {
        name: 'Layout',
        path: '/Layout',
        component: () => import('../views/Layout.vue'),
        children: [
            {
                path: '',
                component: () => import('../views/home/Home.vue')
            },
            {
                name: 'Home',
                path: 'Home',
                component: () => import('../views/home/Home.vue')
            }
        ]
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async(to, from, next) => {
    // 登录注册页不需要token
    if (['/Register', '/Login', '/'].includes(to.path)) {
        next()
    } else {
        if (!sessionStorage.getItem('token')) {
            ElMessage({
                message: '您没有权限访问此页面',
                type: 'error'
            })
            router.push('/')
        } else {
            if (flag) {
                const info = sessionStorage.getItem('info')
                const { identity } = JSON.parse(info)
                const data = await getRoutesByIdentity({ belong: identity })
                data.data.map((item, index) => {
                    router.addRoute('Layout', {
                        name: item.name,
                        path: item.name,
                        component: () => import(`../views/${item.path}.vue`)
                    })
                })
                flag = false
                next({...to, replace: true})
                return
            }
            // console.log(router.getRoutes())
            if (router.hasRoute(to.name)) {
                next()
            } else {
                ElMessage({
                    message: '页面不存在',
                    type: 'error'
                })
                router.replace('/404')
                next()
            }
        }
    }
})
export default router
