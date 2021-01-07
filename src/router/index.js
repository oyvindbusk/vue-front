import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Profile from '../views/Profile.vue';
import Home from '../views/Home.vue';
import Samples from '../views/Samples.vue';
import Variants from '../views/Variants.vue';
import Report from '../views/Report.vue';
import AllVariants from '../views/AllVariants.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/variants/:id',
		name: 'Variants',
		component: Variants,
		props: true
	},
	{
		path: '/variants',
		name: 'AllVariants',
		component: AllVariants,
		props: true
	},
	{
		path: '/samples',
		name: 'Samples',
		component: Samples
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile
	},
	{
		path: '/report/:id',
		name: 'Report',
		component: Report
	}
];
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});
export default router;
