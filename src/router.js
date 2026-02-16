import { createRouter, createWebHistory } from 'vue-router'
import JobFairPage from './components/JobFairPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/superNova_23March_Belgium'
    },
    {
        path: '/superNova_23March_Belgium',
        name: 'JobFair',
        component: JobFairPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
