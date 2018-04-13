/*
 * @Author: askMeWhy
 * @Date:   2017-12-27 18:05:52
 * @Last Modified by:   bigWave
 * @Last Modified time: 2017-12-29 15:21:59
 */
const sUserAgent = navigator.userAgent.toLowerCase();

export const bIsIpad = "ipad" == sUserAgent.match(/ipad/i);
export const bIsIphoneOs = "iphone os" == sUserAgent.match(/iphone os/i);
export const bIsAndroid = "android" == sUserAgent.match(/android/i);
export const bIsPc = !bIsIpad && !bIsIphoneOs && !bIsAndroid;
export const weixin = "micromessenger" == sUserAgent.match(/MicroMessenger/i);
export const qq = "QQ/" == navigator.userAgent.match(/QQ\//i);
export const weibo = "weibo" == sUserAgent.match(/WeiBo/i);
export const onClick = "ontouchend" in window ? "touchend" : "click";