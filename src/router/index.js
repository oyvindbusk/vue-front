import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import Profile from '../views/Profile.vue';
import Home from '../views/Home.vue';
import Samples from '../views/Samples.vue';
import Variants from '../views/Variants.vue';



const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/variants",
        name: "Variants",
        component: Variants
    },
    {
        path: "/samples",
        name: "Samples",
        component: Samples
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile
    }
]
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})
export default router;