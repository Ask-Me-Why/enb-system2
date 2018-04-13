/*
 * @Author: askMeWhy
 * @Date:   2017-12-29 14:44:52
 * @Last Modified by:   smile
 * @Last Modified time: 2018-03-20 10:58:28
 */
import {
	PAGE_CHANGE,
	PAGE_CHANGE_SUCCESS,
	ERROR_MSG,
	AJAX_REQUEST,
	AJAX_REQUEST_COMPLETE,
	MATCH_INFO_ID
} from './mutations-types';
import {
	sessionStorage
} from '@/utils';
export const pageActions = {
	pageChangeStart({ commit }) {
		commit(PAGE_CHANGE);
	},
	pageChangeEnd({ commit }){
		setTimeout(()=>{
			commit(PAGE_CHANGE_SUCCESS);
		},500);
	}
}

export const ajaxActions = {
	ajaxRequestStart({ commit }) {
		commit(AJAX_REQUEST);
	},
	ajaxRequestEnd({ commit }){
		setTimeout(()=>{
			commit(AJAX_REQUEST_COMPLETE);
		},300);
	}
}
