import { createRouter, createWebHistory } from 'vue-router'
import JobFairPage from './components/JobFairPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/futureFair_23March_Belgium'
    },
    {
        path: '/futureFair_23March_Belgium',
        name: 'JobFair',
        component: JobFairPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
