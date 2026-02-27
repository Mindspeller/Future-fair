import { createRouter, createWebHistory } from 'vue-router'
import JobFairPage from './components/JobFairPage.vue'
import EkonomikaJF from './components/EkonomikaJF.vue'

const routes = [
    {
        path: '/',
        redirect: '/superNova_23March_Belgium'
    },
    {
        path: '/superNova_23March_Belgium',
        name: 'JobFair',
        component: JobFairPage
    },
    // {
    //     path: '/ekonomika_jobfair_26February_Belgium',
    //     name: 'EkonomikaJF',
    //     component: EkonomikaJF
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
