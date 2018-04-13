/*
 * @Author: askMeWhy
 * @Date:   2018-01-15 15:26:22
 * @Last Modified by:   bigWave
 * @Last Modified time: 2018-04-13 14:59:37
 */
import {
	ajax,
	askDialogToast,
	merge,
	localStorage,
	docCookies
} from '@/utils';

import * as config from '@/config.js';

const baseURL = config.BASE_URL;

//登录和登出类
export class User {
	get user() {
		return docCookies.getItem('user') || 'none';
	}
	set user(val) {
		if (docCookies.hasItem('user')) docCookies.removeItem('user');
		docCookies.setItem('user', val);
	}

	get auth() {
		return docCookies.getItem('auth') || 'none';
	}
	set auth(val) {
		if (docCookies.hasItem('auth')) docCookies.removeItem('auth');
		docCookies.setItem('auth', val);
	}

	login(opt) {
		let option = {
			username: opt.username,
			password: opt.password
		};

		return this._ajax('post', 'site/login', option);
	}
	setUserInfo(opt) {
		this.user = {
			email: opt.email,
			name: opt.username,
			company: opt.company,
		};
		this.auth = {
			token: opt.token,
			type: opt.role_type
		};
	}
	loginOut(force) {
		if (docCookies.hasItem('user')) docCookies.removeItem('user');
		if (docCookies.hasItem('auth')) docCookies.removeItem('auth');
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
	_ajax(method, url, options) {
		options = options || {};
		return ajax({
			method: method,
			url: `${baseURL}${url}`,
			data: options,
			before: (r) => {},
			complete: (r) => {
				if (r.error) {
					askDialogToast({ msg: r.error.message || '网络请求错误', time: 2000, class: 'danger' });
					return;
				}
				if (r.data.code != 200) {
					if (r.data.code == 402) {
						askDialogToast({ msg: '参数传递错误!', time: 2000, class: 'danger' });
					}
					if (r.data.code == 503) {
						askDialogToast({ msg: '服务器内部错误!', time: 2000, class: 'danger' });
					}
					if (r.data.code == 601) {
						askDialogToast({ msg: r.data.message, time: 2000, class: 'danger' });
					}
					if (r.data.code == 403) {
						askDialogToast({ msg: '登录过期，请重新登录!', time: 2000, class: 'danger' });
					}
					return;
				}
				this.setUserInfo(r.data.data);
			}
		});
	}
}

//注册和邮箱验证
export const RegisterAndEmailValidate = (option) => {

	let options = {
		"email": "", //用户名
		"password": "", //密码
		"repeat_pw": "", //重复密码
		"email_code": "", //邮箱验证码
		"company_name": "", //不必须
	};
	options = merge(true, options, option);

	return ajax({
		method: 'post',
		url: `${baseURL}site/sign-up`,
		data: options,
		before: (r) => {},
		complete: (r) => {
			if (r.error) {
				askDialogToast({ msg: r.error.message || '网络请求错误', time: 2000, class: 'danger' });
				return;
			}
			if (r.data.code != 200) {
				if (r.data.code == 402) {
					askDialogToast({ msg: '参数传递错误!', time: 2000, class: 'danger' });
				}
				if (r.data.code == 503) {
					askDialogToast({ msg: '服务器内部错误!', time: 2000, class: 'danger' });
				}
				if (r.data.code == 601) {
					askDialogToast({ msg: r.data.message, time: 2000, class: 'danger' });
				}
				if (r.data.code == 403) {
					askDialogToast({ msg: '登录过期，请重新登录!', time: 2000, class: 'danger' });
				}
				return;
			}
		}
	});
}

const userInfo = new User();
class publicModal {
	constructor() {
		this.default = {
			"token": userInfo.auth.token
		}
	}
	_ajax(method, url, options, headers = {}) {
		options = options || {};
		const isAbsUrl = url.indexOf('http:') === 0 || url.indexOf('https:') === 0
		return ajax({
			method: method,
			url: isAbsUrl ? url : `${baseURL}${url}`,
			data: options,
			headers,
			before: (r) => {},
			complete: (r) => {
				if (r.error) {
					askDialogToast({ msg: r.error.message || '网络请求错误', time: 2000, class: 'danger' });
					return;
				}
				if (r.data.code != 200) {
					if (r.data.code == 402) {
						askDialogToast({ msg: '参数传递错误!', time: 2000, class: 'danger' });
					}
					if (r.data.code == 503) {
						askDialogToast({ msg: '服务器内部错误!', time: 2000, class: 'danger' });
					}
					if (r.data.code == 601) {
						askDialogToast({ msg: r.data.message, time: 2000, class: 'danger' });
					}
					if (r.data.code == 403) {
						askDialogToast({ msg: '登录过期，请重新登录!', time: 2000, class: 'danger' });
					}
					return;
				}
			}
		});
	}
}

// 成统 - 赛段详情
export class ScoreStageApi extends publicModal {
	getList(opt) {
		let option = {
			...this.default,
			...opt,
		}
		return this._ajax('post', 'stage-score/list', option)
	}
}

// 赛段管理API
export class StageManageApi extends publicModal {
	getIndex(opt) {
		let option = {
			...this.default,
			...opt,
		}
		return this._ajax('post', 'competition-stage/index', option);
	}
	updateLocation(opt) {
		let option = {
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-stage/map-update', option);
	}
	uploadFile(opt) {
		return this._ajax('post', 'competition-stage/create', opt, {
			'Content-Type': 'multipart/form-data'
		});
	}
	removeFile(opt) {
		let option = {
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-stage/delete', option);
	}
	sortFiles(opt) {
		let option = {
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-stage/editor', option);
	}
	getDetail(url) {
		return this._ajax('get', url);
	}
}

//管理功能权限API
export class RootApi extends publicModal {
	getRoot(opt) {
		let option = {
			...this.default,
			...opt,
		}
		return this._ajax('post', 'competition-app-manager/list', option)
	}
	getOpen(id) {
		let option = {
			"id": id,
			...this.default,
		}
		return this._ajax('post', 'competition-app-manager/open', option)
	}
	getClose(id) {
		let option = {
			"id": id,
			...this.default,
		}
		return this._ajax('post', 'competition-app-manager/close', option)
	}
	saveTimeClose(opt) {
		let option = {
			"id": "",
			"timer_close": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-app-manager/timer-close', option)
	}
	saveTimeOpen(opt) {
		let option = {
			"id": "",
			"timer_open": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-app-manager/timer-open', option)
	}
}

// 操作记录API
export class MatchLogsApi extends publicModal {
	query(opt) {
		let option = {
			page: '',
			pageSize: 10,
			...this.default,
			...opt,
		}
		return this._ajax('post', 'competition-referee-operation/list', option);
	}
}

// 车队管理API
export class TeamManageApi extends publicModal {
	create(opt) {
		let option = {
			"name": "",
			"manager": "",
			"phone": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'car-team/create', option);
	}
	remove(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', 'car-team/delete', option);
	}
	query(opt) {
		let option = {
			"time": "",
			"page": "",
			"pageSize": 10,
			...this.default,
			...opt,
		}
		return this._ajax('post', 'car-team/list', option);
	}
	update(opt) {
		let option = {
			id: "",
			"name": "",
			"manager": "",
			"phone": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'car-team/update', option);
	}
}

// 车辆管理API
export class TeamCarsManageApi extends publicModal {
	query(opt) {
		let option = {
			"competition_id": "",
			"team_id": "",
			...this.default,
			...opt,
		}
		return this._ajax('post', 'cars/list', option);
	}
	create(opt) {
		let option = {
			...this.default,
			...opt
		}
		return this._ajax('post', 'cars/create', option);
	}
	remove(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', 'cars/delete', option);
	}
	update(opt) {
		let option = {
			...this.default,
			...opt
		}
		return this._ajax('post', 'cars/update', option);
	}
}

//赛事管理相关API
export class MatchManageApi extends publicModal {
	create(opt) {
		let option = {
			"competition_name": "",
			"competition_start": "",
			"competition_end": "",
			"competition_area": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-info/create', option);
	}
	remove(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', 'competition-info/delete', option);
	}

	query(opt) {
		let option = {
			"time": "",
			"page": "",
			"pageSize": 10,
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-info/list', option);
	}
	update(opt) {
		let option = {
			"id": "",
			"competition_name": "",
			"competition_start": "",
			"competition_end": "",
			"competition_area": "",
			"is_online": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-info/update', option);
	}
}

//运营者相关API
export class OperatorApi extends publicModal {
	getAccount() {
		return this._ajax('post', 'admin/useful-username', this.default);
	}
	modifyPassword(opt) {
		let option = {

			"old_pass": "",
			"new_pass": "",
			"repeat_new": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'admin/update-password', option);
	}
	modifyCompany(company) {
		let option = {

			"company": company,
			...this.default
		}
		return this._ajax('post', 'admin/update-company', option);
	}
	create(opt) {
		let option = {

			"type": "",
			"username": "",
			"password": "",
			"repeat": "",
			"site": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'admin/create-account', option);
	}
	remove(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', 'admin/delete-account', option);
	}

	query(opt) {
		let option = {
			"page": "",
			"pageSize": 10,
			...this.default,
			...opt
		}
		return this._ajax('post', 'admin/list-account', option);
	}

	update(opt) {
		let option = {
			"id": "",
			"password": "",
			"repeat": "",
			"site": "",
			"type": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'admin/update-account', option);
	}
}
//赛事模块相关API

export class MatchApi extends publicModal {
	getUploadData() {
		return {
			url: `${baseURL}site/img-upload`,
			default: this.default
		}
	}
	//	基础信息图片上传
	// getUploadDataBasic(){
	// return {
	// url: `${baseURL}competition-editor/upload`,
	// default:this.default
	//   }
	// }
	queryId(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', 'competition-editor/base-query', option);
	}
	update(opt) {
		let option = {
			"name": "",
			"competition_start": "",
			"competition_end": "",
			"log_url": "",
			"img_url": "",
			"site": "",
			"full_stage": '',
			"status": '',
			"phone_one": "",
			"phone_two": "",
			"start_site": "",
			"start_longitude": "",
			"start_latitude": "",
			"end_site": "",
			"end_longitude": "",
			"end_latitude": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-editor/base-update', option);
	}
}
//赛事详情相关API
export class MatchDetailsApi extends publicModal {
	queryId(id) {
		let option = {
			'id': id,
			...this.default
		}
		return this._ajax('post', 'competition-editor/detail-query', option);
	}

	//编辑赛事详情
	update(opt) {
		let option = {
			"competition_id": '',
			"full_name": "",
			"host_unit": "",
			"undertaker": "",
			"time_str": "",
			"site": "",
			"stage_name": "",
			"full_mileage": '',
			"stage_mileage": '',
			"join_start": "",
			"join_end": "",
			"join_site": "",
			"join_way": "",
			"qq": "",
			"wx": "",
			"fax": "",
			"email": "",
			"telephone": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-editor/detail-save', option);
	}
	//请求赛事详细信息
	query(opt) {
		let option = {
			id: "",
			...this.default,
			...opt,
		}
		return this._ajax('post', 'competition-editor/detail-query', option);
	}
	//删除自定义赛事信息
	remove(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', 'admin/delete-account', option);
	}
}
//自定义赛事相关API
export class MatchOtherApi extends publicModal {
	queryId(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', 'competition-editor/custom-query', option);
	}
	//创建自定义赛事
	create(opt) {
		let option = {
			"competition_id": "",
			"title": "",
			"content": "",
			// "token" : "jSytWFkpn82lS3nJLwTegzQU-FPFkp_h15hBAdjcPk5Y8ZTjtL_hVANgs48i",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-editor/custom-add', option);
	}
	//编辑自定义赛事
	update(opt) {
		let option = {
			"competition_id": '',
			"title": "",
			"content": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-editor/custom-update', option);
	}
	//删除自定义赛事信息
	remove(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', "competition-editor/custom-delete", option);
	}
}
//赛事文件相关API
export class MatchFileApi extends publicModal {
	//赛事文件列表
	queryId(opt) {
		let option = {
			"page": "",
			"pageSize": 10,
			"competition_id": "",
			"send_type": "",
			"type": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-file/list', option);
	}
	//创建赛事文件
	create(opt) {
		let option = {
			"competition_id": "",
			"title": "",
			"type": "",
			"content": "",
			"is_alert": "",
			"end_time": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-file/create', option);
	}
	//赛事文件发送
	send(id) {
		let option = {
			"id": id,
			...this.default,
			...opt
		}
		return this._ajax('post', 'competition-file/send', option);
	}
	//取消赛事文件发送
	reset(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', 'competition-file/reset', option);
	}
	//删除赛事资料
	remove(id) {
		let option = {
			"id": id,
			...this.default
		}
		return this._ajax('post', "competition-file/delete", option);
	}
}
//发车表相关API
export class StatisticalApi extends publicModal {
	carList(id) {
		let option = {
			"competition_id": id,
			...this.default
		}
		return this._ajax('post', 'competition-stage/base-list', option);
	}
	queryType(opt) {
		let option = {
			"competition_id": '',
			"stage_id": "",
			"car_type": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'departure/list', option);
	}

	sortType(opt) {
		let option = {
			"competition_id": '',
			"stage_id": "",
			"car_type": "",
			"sort_type": "",
			"sort_condition": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'departure/auto-sort', option);
	}
	singleSort(opt) {
		let option = {
			"competition_id": "",
			"stage_id": "",
			"car_type": "",
			"new_sort": "",
			"old_sort": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'departure/manual-sort', option);
	}
	exportExcel(opt) {
		let option = {
			"stage_id": "",
			"car_type": "",
			...opt
		}
		let _o = '';
		Object.keys(option).forEach((key, index) => {
			if (index == 0) {
				_o += `${key}=${option[key]}`;
			} else {
				_o += `&${key}=${option[key]}`;
			}

		});
		return `${baseURL}departure/export-excel?${_o}`;
	}
	issuedMatch(opt) {
		let option = {
			"title": "", //标题 
			"release_date": "", //发布日期的时间戳,单位:秒 
			"car_type": "", //1-汽车,2-摩托车 
			"competition_id": "", //赛事id 
			"stage_id": "", //赛段id 
			"signature_file": "", //数据格式为:formdata 
			...this.default,
			...opt
		}

		let formData = new FormData();

		Object.keys(option).forEach((key, index) => {
			formData.append(key, option[key]);
		});

		return this._ajax('post', 'departure/release', formData, { "Content-Type": "multipart/form-data" });
	}
	setCarInterval(opt) {
		let option = {
			"competition_id": "", //所有字段必填 
			"stage_id": "",
			"car_type": "",
			"departure_start": "", //发车时间,用户输入的时间转换成秒数（注:不是时间戳） 
			"group": [],
			...this.default,
			...opt
		}
		return this._ajax('post', 'departure/car-config', option);
	}
	setMotorInterval(opt) {
		let option = {
			"competition_id": "", //所有字段必填 
			"stage_id": "",
			"car_type": "",
			"departure_start": "", //发车时间,用户输入的时间转换成秒数（注:不是时间戳） 
			"number": "",
			"motor_interval": "",
			...this.default,
			...opt
		}
		return this._ajax('post', 'departure/motor-config', option);
	}
}
/*
class publicModal{
	constructor(){
		this.default = {
			// "wid": user.user.wid||'none',
			// "unid": user.user.unid||'none',
			// "duty_type": user.user.duty_type||'none',
			// "duty_num": user.user.duty_num||'none',
			"access_token": userInfo.auth
		}
	}

	_ajax(method,options){
		options = options || {};
		//TODO 使用cookie模式登录的
		if(userInfo.user.type && userInfo.user.type == "cookie"){
			userInfo.auth = docCookies.getItem('access_token') || 'none';
			options.access_token = userInfo.auth;
		}
		return ajax({
			method: method,
			url: baseURL,
			data: options,
			before: (r) => {
			},
			complete: (r) => {
				if (r.error) {
					askDialogToast({ msg: r.error.message || '网络请求错误', time: 2000, class: 'danger' });
					return;
				}
				if(!r.data.ok) {
					askDialogToast({ msg: r.data.error || r.data.message || '网络请求错误', time: 2000, class: 'danger' });
					return;
				}
			}
		});
	}
}
export class Product extends publicModal{
	getType(){
		let option = merge(true,{method: 'pos_goodsType'},this.default);
		return this._ajax('post',option);
	}
	getGoods(opt){
		let option = {
			method: "pos_goods",
			type_id: 0,
			offset: 0,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}
}

export class Order extends publicModal{

	create(opt){
		let option = {
			method: "pos_createOrder",
			order_data: "",
			posid: "",
			//good_xuid: "",//会员支付则传递此参数，否则不传递
			...this.default,
			...opt
		}

		return this._ajax('post',option);
	}

	all(opt){
		let option = {
			method: "pos_newSelectOrder",
			status: 0,
			offset: 0,
			...this.default,
			...opt
		}

		return this._ajax('post',option);
	}

	remove(id){
		let option = {
			method: "pos_cancelOrder",
			order_id: id || 0,
			...this.default
		}
		return this._ajax('post',option);
	}

	byId(id,offset){
		let option = {
			method: "pos_newSelectOrder",
			order_id: id,
			offset: offset || 0,
			status: 0,
			...this.default
		}

		return this._ajax('post',option);
	}
}

export class Member extends publicModal{
	sendCode(phone){
		let option = {
			method: "user_getCode",
			phone: phone,
			type: 5
		}
		return this._ajax('post',option);
	}
	
	getInfo(opt){
		let option = {
			method: "pos_memberInfo",

			"card":"",//卡号优先级高于手机+验证码,如果有,则不需要手机号和验证码
    		"phone":"",//手机号
    		"code":"",//验证码
    		"pay_code":"",//付款码查找会员
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}
}

export class Manages extends publicModal{
	getStaff(opt){
		let option = {

			method: "pos_employeeList",
    		"offset": 0,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}

	getStore(opt){
		let option = {

			method: "pos_storeList",
    		"offset": 0,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}
}

export class Report extends publicModal{
	getReport(opt){
		let option = {

			method: "pos_report",
    		"type": 1,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}

	getTop(opt){
		let option = {

			method: "pos_topTen",
    		"type": 1,
			...this.default,
			...opt
		}
		return this._ajax('post',option);
	}
}*/
