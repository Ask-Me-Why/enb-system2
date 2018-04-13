import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store';
import Index from '@/views/index.vue';
import Login from '@/views/user/login.vue';

import Layout from '@/views/layout.vue';

import {
	refreshTitle
} from '@/utils'
import {
	User
} from '@/services';

const user = new User();

//懒加载路由

//view->注册页面
const Register = resolve => require.ensure([], () => resolve(require('@/views/user/register.vue')), '');

//view->账户管理相关页面
//sub->赛事管理页面
const AccountManage = resolve => require.ensure([], () => resolve(require('@/views/account/manage.vue')), '');
//sub->权限管理页面
const AccountPermission = resolve => require.ensure([], () => resolve(require('@/views/account/permission.vue')), '');

//view->赛事资料相关页面
const MatchInformation = resolve => require.ensure([], () => resolve(require('@/views/match/information.vue')), '');

//views -> 功能权限
const MatchRoot = resolve => require.ensure([], () => resolve(require('@/views/match/matchRoot/root.vue')), '');

// 车队管理页面
const MatchTeam = resolve => require.ensure([], () => resolve(require('@/views/match/team/index.vue')), '');
// 车队车辆管理页面
const MatchTeamCars = resolve => require.ensure([], () => resolve(require('@/views/match/team/cars.vue')), '');

// 赛段文件浏览
const MatchStage = resolve => require.ensure([], () => resolve(require('@/views/match/stage.vue')), '');
// 赛事文件管理页面
const MatchFile = resolve => require.ensure([], () => resolve(require('@/views/match/matchFile/index.vue')), '');
const addMatchFile = resolve => require.ensure([], () => resolve(require('@/views/match/matchFile/createFile.vue')), '');

// 操作记录页面
const MatchLogs = resolve => require.ensure([], () => resolve(require('@/views/match/matchLogs/index.vue')), '');
//sub->表格制作页面
const StatisticalMakeTable = resolve => require.ensure([], () => resolve(require('@/views/match/statistical/make-table.vue')), '');

//sub->表格制作-发车表页面
const StatisticalCarTable = resolve => require.ensure([], () => resolve(require('@/views/match/statistical/car-table.vue')), '');



// 赛事成绩页面
// 首页
const MatchScore = resolve => require.ensure([], () => resolve(require('@/views/score/index.vue')), '');
// 赛段详情
const MatchScoreStage = resolve => require.ensure([], () => resolve(require('@/views/score/stage.vue')), '');
const beforeEach = (toRoute, fromRoute, next) => {
	if (user.auth != 'none' && user.auth.token) {
		Vue.prototype.$user = {
			username: user.user.name,
			email: user.user.email,
			company: user.user.company,
			token: user.auth.token,
			role: user.auth.type,
			loginOut: user.loginOut
		};
	} else {
		Vue.prototype.$user = null;
	}
	refreshTitle(toRoute.meta && toRoute.meta.title || 'ENB·System');

	if (toRoute.path == '/login' && user.auth != 'none' && user.auth.token) {
		next({
			replace: true,
			path: '/'
		});
	} else {
		if (toRoute.meta && toRoute.meta.requiresAuth && user.auth == 'none') {
			next({
				path: '/login',
				replace: true,
				query: {
					redirect: toRoute.fullPath
				}
			});
		} else {
			next();
			// if (toRoute.path == '/login') {
			// 	next({
			// 		path: '/accountmanage',
			// 		replace: true,
			// 	});
			// }else{
			// 	next();
			// }
		}
	}
}
const afterEach = (toRoute, fromRoute) => {}

Vue.use(Router)
const AccountRouter = [{
	path: '/accountmanage',
	name: 'accountmanage',
	component: AccountManage,
	meta: {
		title: 'ENB·账户管理·赛事管理',
		showNavBar: true,
		requiresAuth: true
	}
}, {
	path: '/accountpermission',
	name: 'accountpermission',
	component: AccountPermission,
	meta: {
		title: 'ENB·账户管理·权限管理',
		showNavBar: true,
		requiresAuth: true
	}
}]

const MatchRouter = [{
	path: '/match/:matchId',
	name: 'match',
	component: Layout,
	redirect: '/match/:matchId/information',
	children: [{
			path: 'information',
			name: 'matchInformation',
			component: MatchInformation,
			meta: {
				title: 'ENB·账户管理·赛事资料',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		}, {
			path: 'team',
			name: 'matchTeam',
			component: MatchTeam,
			meta: {
				title: 'ENB·账户管理·车队管理',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		}, {
			path: 'team/:teamId',
			name: 'matchTeamCars',
			component: MatchTeamCars,
			meta: {
				title: 'ENB·账户管理·车队管理·车辆管理',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		}, {
			path: 'stage',
			name: 'matchStage',
			component: MatchStage,
			meta: {
				title: 'ENB·账户管理·赛段文件浏览',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		}, {
			path: 'matchfile',
			name: 'matchFile',
			component: MatchFile,
			meta: {
				title: 'ENB·账户管理·赛事文件',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		}, {
			path: 'matchLogs',
			name: 'matchLogs',
			component: MatchLogs,
			meta: {
				title: 'ENB·账户管理·操作记录',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		},
		{
			path: 'maketable',
			name: 'statisticalMakeTable',
			component: StatisticalMakeTable,
			meta: {
				title: 'ENB·成绩统计·表格制作',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		},
		{
			path: 'cartable',
			name: 'statisticalCarTable',
			component: StatisticalCarTable,
			meta: {
				title: 'ENB·成绩统计·表格制作·发车表',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		},
		{
			path: 'createFile',
			name: 'createFile',
			component: addMatchFile,
			meta: {
				title: 'ENB·赛事·赛事文件',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		},
		{
			path: 'matchroot',
			name: 'matchRoot',
			component: MatchRoot,
			meta: {
				title: 'ENB·管理·功能权限',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		},
		{
			path: 'score',
			name: 'matchScore',
			component: MatchScore,
			meta: {
				title: 'ENB·成绩·赛事成绩',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		},
		{
			path: 'score/stage',
			name: 'matchScoreStage',
			component: MatchScoreStage,
			meta: {
				title: 'ENB·成绩·赛事成绩·赛段详情',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		},
		{
			path: 'score/stage/:stageId',
			name: 'matchScoreStageDetail',
			component: MatchScoreStage,
			meta: {
				title: 'ENB·成绩·赛事成绩·赛段详情',
				showNavBar: true,
				showMenuBar: true,
				requiresAuth: true
			}
		}
	]
}];

export const AllRoutersMap = [{
		path: '/',
		name: 'index',
		component: Index,
		redirect: '/accountmanage',
		meta: {
			title: 'ENB·首页',
			requiresAuth: true,
			showNavBar: true,
			showMenuBar: true
		}
	},
	{
		path: '/404',
		name: '404',
		component: resolve => require.ensure([], () => resolve(require('@/views/errorPage/404.vue')), ''),
		meta: {
			title: 'ENB·404',
		}
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			title: 'ENB·登录'
		}
	}, {
		path: '/register',
		name: 'register',
		component: Register,
		meta: {
			title: 'ENB·注册',
			showNavBar: true,
		}
	},
	...AccountRouter,
	...MatchRouter, {
		path: '*',
		redirect: '/404'
	}
];

const router = new Router({
	routes: AllRoutersMap
})

router.beforeEach(beforeEach)
// router.afterEach(afterEach)
export default router;
