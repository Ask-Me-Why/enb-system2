/*
 * @Author: askMeWhy
 * @Date:   2017-12-29 14:44:52
 * @Last Modified by:   smile
 * @Last Modified time: 2018-03-20 10:59:17
 */
import {
	PAGE_CHANGE,
	PAGE_CHANGE_SUCCESS,
	ERROR_MSG,
	AJAX_REQUEST,
	AJAX_REQUEST_COMPLETE
} from './mutations-types';

import {
	sessionStorage
} from '@/utils';
export const pageMutations = {
	[PAGE_CHANGE](state) {
		state.pageLoader = true;
	},
	[PAGE_CHANGE_SUCCESS](state) {
		state.pageLoader = false;
	}
}
export const ajaxMutations = {
	[AJAX_REQUEST](state) {
		if (state.ajaxLoaderIndex == 0) state.ajaxLoader = true;
		state.ajaxLoaderIndex++;
	},
	[AJAX_REQUEST_COMPLETE](state, payload) {
		state.ajaxLoaderIndex--;
		if (state.ajaxLoaderIndex == 0) state.ajaxLoader = false;
	}
}
