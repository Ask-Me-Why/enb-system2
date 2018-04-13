/**
 * 刷新标题
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 */
export const refreshTitle = (title) => {

	let iframe = document.createElement("iframe");
	iframe.style.display = "none";
	document.title = title;

	iframe.setAttribute("src", './static/refresh_title.html');
	iframe.addEventListener('load', function() {
		setTimeout(function() {
			document.body.removeChild(iframe);
		}, 0);
	});
	document.body.appendChild(iframe);
}

/**
 * 将数字格式化为金额显示格式（100,000.00）
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   num 值				例: 250000.01
 * @return   {[type]}   返回金额格式字符串      250,000.01
 */
export const amountFormat = (num) => {
	var num = (num || 0).toString().replace(/\,/g, "").split('\.'),
		result = '';
	while (num[0].length > 3) {
		result = ',' + num[0].slice(-3) + result;
		num[0] = num[0].slice(0, num[0].length - 3);
	}
	if (num[0]) { result = num[0] + result; }
	if (num.length > 1) result += '.' + num[1];
	return result;
}

export const twoFloat = (val)=> {
	let _v = (val || 0).toString().replace(/\,/g, "").split('\.');
	if (_v.length <= 1) {
		return _v[0] + '.00';
	} else {
		if (_v[1].length == 1) {
			return _v[0] + '.' + _v[1] + '0';
		} else {
			return _v[0] + '.' + _v[1].substr(0, 2);
		}
	}
}
/**
 * 处理时间差
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   difference [毫秒]的数值
 * @return   {[type]}              返回多少天多少小时多少分多少秒
 */

export const timeConvert = (difference) => {
	let curDay = handlerSingleDigit(parseInt(difference / (1000 * 60 * 60 * 24), 10)),
		curHours = handlerSingleDigit(parseInt(difference / (1000 * 60 * 60) % 24, 10)),
		curMinutes = handlerSingleDigit(parseInt(difference / (1000 * 60) % 60, 10)),
		curSeconds = handlerSingleDigit(parseInt(difference / (1000) % 60, 10));
	return {
		d: curDay,
		h: curHours,
		m: curMinutes,
		s: curSeconds
	}
}
/**
 * 为小于10或大于-10的数前面加上0
 * @Author   陈龙
 * @DateTime 2017-08-30
 * @version  [version]
 * @param    {[type]}   num  例:   -1   2    12
 * @return   {[type]}             -01   02   12
 */
export const handlerSingleDigit = (num) => {
	return num >= -10 ? num >= 0 ? num < 10 ? '0' + num : num : '-0' + Math.abs(num) : num;
}


/*
let domTiming = window.performance.timing;
console.log('//浏览器开始解析 HTML 文档第一批收到的字节')
console.log(domTiming.domLoading);
console.log('// 浏览器完成解析并且所有 HTML 和 DOM 构建完毕')
console.log(domTiming.domInteractive);
console.log('//DOM 解析完成后，网页内资源加载开始的时间')
console.log(domTiming.domContentLoadedEventStart);
console.log('// DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）')
console.log(domTiming.domContentLoadedEventEnd);
console.log('//网页上所有资源（图片等）下载完成,且准备就绪的时间')
console.log(domTiming.domComplete);
console.log('总共耗时')
console.log(domTiming.domComplete - domTiming.domLoading)
*/

/* 检测是否存在某个类名 */
export function hasClass(el, cls) {
	if (!el || !cls) return false;
	if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
	if (el.classList) {
		return el.classList.contains(cls);
	} else {
		return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}
};

/* 添加类名 */
export function addClass(el, cls) {
	if (!el) return;
	var curClass = el.className;
	var classes = (cls || '').split(' ');

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.add(clsName);
		} else {
			if (!hasClass(el, clsName)) {
				curClass += ' ' + clsName;
			}
		}
	}
	if (!el.classList) {
		el.className = curClass;
	}
};

/* 删除类名 */
export function removeClass(el, cls) {
	if (!el || !cls) return;
	var classes = cls.split(' ');
	var curClass = ' ' + el.className + ' ';

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.remove(clsName);
		} else {
			if (hasClass(el, clsName)) {
				curClass = curClass.replace(' ' + clsName + ' ', ' ');
			}
		}
	}
	if (!el.classList) {
		el.className = trim(curClass);
	}
};
//高德地图初始化
export const AMapLoad = (k) => {
	return new Promise(function(resolve, reject) {
		window.initTheMap = function() {
			resolve(AMap);
		}

		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = 'http://webapi.amap.com/maps?v=1.3&callback=initTheMap&key=' + k;
		script.onerror = function(e) {
			reject(e);
		};
		document.head.appendChild(script);
	})
}
//合并对象
export const merge = (...arg) => {
	if (arg.length == 0) {
		throw Error(`merge error=>请传入需要合并的对象`);
	}
	let target = arg[0] || {},
		depath = false,
		length = arg.length,
		i = 1;

	if (Object.prototype.toString.call(target) == '[object Boolean]') {
		depath = target;
		target = arg[i];
		i++
	}

	if (typeof target !== "object") {
		target = {};
	}

	if (i == 2 && length <= 1) {
		throw Error(`merge error=>请传入需要合并的对象`);
	}

	for (; i < length; i++) {
		let source = arg[i] || {};
		if (source != null) {
			for (let key in source) {
				let src = target[key],
					copy = source[key];
				if (target === copy) {
					continue;
				}
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					if (depath && copy && (isObject(copy) || Array.isArray(copy))) {
						let clone;
						if (Array.isArray(copy)) {
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && isObject(src) ? src : {};
						}
						target[key] = merge(depath, clone, copy);
					} else if (copy !== void 0) {
						target[key] = copy;
					}
				}
			}
		}
	}
	return target;
}

export const isObject = (target) => {
	return Object.prototype.toString.call(target) === '[object Object]';
}
export const isEmptyObject = (obj) => {
	for (let key in obj) {
		return false;
	}
	return true;
}

export const trim = (payload) => {
	let str = payload,
		whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	for (let i = 0, len = str.length; i < len; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}
	for (let i = str.length - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	// return payload == null ? "" : (payload + "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

export const getTransfrom = () => {
	let transform = '',
		// document.createElement() 创建元素节点，
		divStyle = document.createElement('div').style, // 返回的是一组object对象，里面包含了transform
		// 可能涉及到的几种兼容性写法，通过循环，找出浏览器识别的那个
		// 依次为： 全部、Safari 和 Chrome、firefox、ie9、opera
		transformArr = ['transfrom', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
	for (let i = 0; i < transformArr.length; i++) {
		if (transformArr[i] in divStyle) {
			// 找到以后立刻返回，结束函数
			return transform = transformArr[i];
		}
	}
	return transform;
}

export const debounce = function(func, delay) {
	let timer = null;
	return function() {
		let context = this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			func.apply(context, args);
		}, delay);
	}
}

import { localStorage } from './storage.js';

export const detectOrient = function(handlerHorizontal, handlerVertical) {
	let data = localStorage.getItem('J-recordOrientX');
	let cw = document.documentElement.clientWidth;
	let _Width = 0,
		_Height = 0;
	if (!data) {
		let sw = window.screen.width,
			sh = window.screen.height;

		// 2.在某些机型（如华为P9）下出现 srceen.width/height 值交换，所以进行大小值比较判断
		_Width = sw < sh ? sw : sh;
		_Height = sw >= sh ? sw : sh;
		localStorage.setItem('J-recordOrientX', { w: _Width, h: _Height });
	} else {
		_Width = data.w;
		_Height = data.h;
	}
	if (cw == _Width) {
		// 竖屏
		handlerVertical && handlerVertical();
		return;
	}
	if (cw == _Height) {
		// 横屏
		handlerHorizontal && handlerHorizontal();
		return;
	}
}
