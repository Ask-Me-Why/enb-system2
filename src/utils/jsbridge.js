/*
 * @Author: askMeWhy
 * @Date:   2018-02-12 10:58:04
 * @Last Modified by:   bigWave
 * @Last Modified time: 2018-02-28 10:58:27
 */

import {
    bIsIpad,
    bIsIphoneOs,
    bIsAndroid,
    bIsPc
} from './webType.js';
var JsBridgePlugin = {};

JsBridgePlugin.install = function(Vue, option) {

    //初始化jsBridge
    Vue.prototype.$jsBridge = {
        isInit: "no",
        registerHandler: function(name, callback) {
            console.error('"' + name + '"没有注册成功')
        },
        callHandler: function(name, params, callback) {
            console.error('"' + name + '"没有调用成功');
        }
    }

    //先注释掉 初始化jsBridge 需要用到时再初始化
    if (!bIsPc) {
        if (bIsAndroid) {
            androidSetWebViewJavascriptBridge(function(bridge) {
                bridge.init();
                Vue.prototype.$jsBridge = bridge;
                console.log('初始化$jsBridge' + (typeof bridge.registerHandler == 'function'))
            })
        } else if (bIsIphoneOs || bIsIpad) {
            iosSetupWebViewJavascriptBridge(function(bridge) {
                bridge.init();
                Vue.prototype.$jsBridge = bridge
                // console.log('初始化$jsBridge',Vue.prototype.$jsBridge)
            })
        }
    }

};
export default JsBridgePlugin;

//安卓
export function androidSetWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        console.log('有WebViewJavascriptBridge对象')
        return callback(WebViewJavascriptBridge)
    } else {
        console.log('没有WebViewJavascriptBridge对象,等待WebViewJavascriptBridgeReady事件回调')
        document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function() {
                console.log('WebViewJavascriptBridgeReady事件回调了')
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
}

//ios
export function iosSetupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
}


let func = function() {

};

if (!bIsPc) {
    if (bIsAndroid) {
        func = androidSetWebViewJavascriptBridge;
    } else if (bIsIphoneOs || bIsIpad) {
        func = iosSetupWebViewJavascriptBridge;
    }
}

//在路由中使用这个方法 注册web方法让原生调用
export let setJsBridge = func;