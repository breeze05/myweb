var ajaxHandlerName = "/WealthManagement/AjaxHandler.aspx";
var ajaxSecureHandlerName = "/WealthManagement/AjaxSecureHandler.aspx";
var ajaxSecureUnlockHandler = "/WealthManagement/AjaxSecureUnlockHandler.aspx";

//获取URL中参数param的值
function getParameter(val) {
    var uri = window.location.search;
    var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
    return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
}

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外 
//使用方法：$(window).keydown(banBackSpace);
function banBackSpace(e) {
    var ev = e || window.event; //获取event对象    
    var obj = ev.target || ev.srcElement; //获取事件源    
    var t = obj.type || obj.getAttribute('type'); //获取事件源类型  
    //获取作为判断条件的事件类型    
    var vReadOnly = obj.readOnly;
    var vDisabled = obj.disabled;
    //处理undefined值情况    
    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
    vDisabled = (vDisabled == undefined) ? true : vDisabled;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，     
    //并且readOnly属性为true或disabled属性为true的，则退格键失效   
    var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";     //判断
    if (flag2 || flag1)
        e.preventDefault();
}

function getServerList() {
    var serverList = "";
    var serverInfo = document.getElementsByTagName('head')[0].getAttribute('serverinfo', 1);
    if (serverInfo != null && serverInfo != '') {
        serverList = serverInfo.split('|');
    }
    return serverList;
}

function getServerInfo(alis) {
    var serverList = getServerList();
    var tmp = '';
    var ipList = "";
    for (var i = 0; i < serverList.length; i++) {
        tmp = serverList[i].split(',');
        if (tmp == null) continue;
        if (tmp.length != 2) continue;

        var boolFlag = tmp[0].toLowerCase() == alis.toLowerCase();
        if (boolFlag) {
            ipList = tmp[1].split(';');

            for (var j = 0; j < ipList.length; j++) {
                return ipList[j];
            }
        }
    }
    return alis;
}

function isIE6() {
    return ($.browser.msie && $.browser.version == '6.0');
}

function isIE7() {
    return ($.browser.msie && $.browser.version == '7.0');
}

//判断是否IE
function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function isMobile() {
    if (navigator && navigator.userAgent)
        return !!navigator.userAgent.match(/Mobile/i) || !!navigator.userAgent.match(/Android/i);
    return false;
}

/*显示信息 替换alert*/
function showAlert(msg, title, type) {
    if (msg === '' || msg === undefined) {
        return;
    }

    if ($('#dialogAlert').length == 0) {
        $('<div id="dialogAlert"><div class="ui-widget-content"></div></div>').appendTo('body');
    }
    var iconfont = '';
    switch (type) {
        case 'warning':
        default:
            iconfont = '&#xe612;';
            break;
        case 'info':
            iconfont = '&#xe611;';
            break;
    }

    var html = '<p><span class="iconfont">' + iconfont + '</span>&nbsp;&nbsp;<span>' + msg + '</span></p>';

    $('#dialogAlert > .ui-widget-content').html(html);
    $('#dialogAlert').dialog({
        title: title || '提示',
        resizable: false,
        dialogClass: 'dialogAlert dialog-msg',
        minHeight: 0,
        modal: true,
        buttons: {
            "确定": function () {
                $(this).dialog("close");
            }
        }
        , open: function (event, ui) {
            //取消dialog自动focus（在终端中ie11下会有绿色边框）
            $(this).parent('.ui-dialog').find('.ui-state-focus').blur();
        }
    })
}

function showConsoleMsg(msg) {
    if ($('#___divConsole').length == 0) {
        $('<div id="___divConsole" style="position:absolute;right:0px;top:0px;height:200px;color:#000;width:200px;background: #ccc;opacity: 0.7; overflow:auto;"><p></p></div>').appendTo('body');
    }
    $('#___divConsole p').prepend('<span>' + msg + '</span><br/>');
}

function showMsg(msg, type, $dom) {
    $dom = $dom || $('#__msgBox');
    if (msg) {
        switch (type) {
            case 'info':
                msg = '<span class="iconfont">&#xe611;</span> ' + msg;
                break;
            default:
            case 'warning':
                msg = '<span class="iconfont">&#xe612;</span> ' + msg;
                break;
        }
        $dom.html(msg).show();
    }
    else
        $dom.hide();
}

function showConfirm(msg, title, yesCallback, noCallback) {
    if (msg === '' || msg === undefined) {
        return;
    }

    var dg = $('#__dialogConfirm');
    if (dg.length == 0) {
        dg = $('<div id="__dialogConfirm"><div class="ui-widget-content"></div></div>').appendTo('body');
    }
    var iconfont = '&#xe612;';

    var html = '<p><span class="iconfont">' + iconfont + '</span>&nbsp;&nbsp;<span>' + msg + '</span></p>';

    dg.find('.ui-widget-content').html(html);
    dg.dialog({
        title: title || '提示',
        resizable: false,
        dialogClass: 'dialogConfirm dialog-msg',
        minHeight: 0,
        modal: true,
        buttons: [{
            text: '确定',
            click: function () {
                $(this).dialog("close");
                if (typeof yesCallback == 'function')
                    yesCallback();
            }
        }
//        , {
//                text:'取消',
//                click: function () {
//                    $(this).dialog("close");
//                    if (typeof noCallback == 'function')
//                        noCallback();
//                }
//        }
        ]
           , open: function (event, ui) {
               //取消dialog自动focus（在终端中ie11下会有绿色边框）
               $(this).parent('.ui-dialog').find('.ui-state-focus').blur();
           }
    })
}


/*js Date日期扩展*/
Date.prototype.format = function (fmt, useUTC) {
    var o = {
        "M+": useUTC ? (this.getUTCMonth() + 1) : (this.getMonth() + 1), //月份     
        "d+": useUTC ? this.getUTCDate() : this.getDate(), //日     
        "h+": useUTC ? (this.getUTCHours() % 12 == 0 ? 12 : this.getUTCHours() % 12) : (this.getHours() % 12 == 0 ? 12 : this.getHours() % 12), //小时     
        "H+": useUTC ? this.getUTCHours() : this.getHours(), //小时     
        "m+": useUTC ? this.getUTCMinutes() : this.getMinutes(), //分     
        "s+": useUTC ? this.getUTCSeconds() : this.getSeconds(), //秒     
        "q+": useUTC ? Math.floor((this.getUTCMonth() + 3) / 3) : Math.floor((this.getMonth() + 3) / 3), //季度     
        "S": useUTC ? this.getUTCMilliseconds() : this.getMilliseconds() //毫秒     
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((useUTC ? this.getUTCFullYear() : this.getFullYear()) + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[(useUTC ? this.getUTCDay() : this.getDay()) + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

Date.prototype.addDays = function (d) {
    var result = new Date(this);
    result.setDate(result.getDate() + d);
    return result;
};


Date.prototype.addWeeks = function (w) {
    var result = new Date(this);
    result.addDays(w * 7);
    return result;
};

Date.prototype.addMonths = function (m) {
    var result = new Date(this);
    var d = result.getDate();
    result.setMonth(result.getMonth() + m);

    if (result.getDate() < d)
        result.setDate(0);
    return result;
};

Date.prototype.addUTCMonths = function (m) {
    var result = new Date(this);
    var d = result.getUTCDate();
    result.setUTCMonth(result.getUTCMonth() + m);

    if (result.getUTCDate() < d)
        result.setUTCDate(0);
    return result;
};

Date.prototype.addYears = function (y) {
    var result = new Date(this);
    var m = result.getMonth();
    result.setFullYear(result.getFullYear() + y);

    if (m < result.getMonth()) {
        result.setDate(0);
    }

    return result;
};

function toDecimalH2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 100) / 100;
    return f;
}

function setDatePocker(txtId, option) {
    $("#" + txtId).datepicker({
        showOn: "button",
        buttonImage: "/WealthManagement/MFRB/resource/images/Frame/calendar.png",
        buttonImageOnly: true,
        firstDay: 1,
        currentText: '今天',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        showMonthAfterYear: true,
        yearSuffix: ''
        //minDate: new Date()
    });

    //option = {} || option;
    option.changeYear = true;
    option.changeMonth = true;
    option.autoSize = true;
    //option.yearRange = "c-30:c+10";
    $('#' + txtId).datepicker('option', option);
}

//通用初始化操作
jQuery(function ($) {

    //    //为移动终端增加样式文件
    //    if (isMobile()) {
    //        $('head').append('<link rel="stylesheet" href="/WealthManagement/wfc/resource/css/WFCMobile.css"/>');
    //    }

    //    //用于本地化时，静态htm文件访问服务器资源时加上sessionid（不会自动设置cookie，或设置cookie的域与服务器不一致）
    //    var sessionid = getParameter("wind.sessionid");
    //    if (sessionid) {
    //        //addCookie("wind.sessionid", sessionid, "180.96.8.44");
    //        $.ajaxSetup({ headers: { "wind.sessionid": getParameter("wind.sessionid")} });
    //    }

    /*修改第三方组件默认配置*/
    //datepicker
    if ($.datepicker) {
        $.datepicker.regional['zh-CN'] = {
            showOn: "both",
            buttonImage: "/WealthManagement/MFRB/resource/images/Frame/calendar.png",
            buttonImageOnly: true,
            changeYear: true,
            changeMonth: true,
            buttonText: '',
            closeText: '关闭',
            prevText: '&#x3C;上月',
            nextText: '下月&#x3E;',
            currentText: '今天',
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
		'七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月',
		'七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
            weekHeader: '周',
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
    }

    //Highcharts
    if (typeof (Highcharts) != 'undefined' && Highcharts.setOptions) {
        //扩展symbol star

        function star(x, y, w, h) {
            return [
                    'M', x, y + 0.3 * h,
                    'L',
                    x + 0.3 * w, y + 0.3 * h,
                    x + 0.5 * w, y,
                    x + 0.7 * w, y + 0.3 * h,
                    x + w, y + 0.3 * h,
                    x + 0.8 * w, y + 0.6 * h,
                    x + 0.9 * w, y + h,
                    x + 0.5 * w, y + 0.8 * h,
                    x + 0.1 * w, y + h,
                    x + 0.2 * w, y + 0.6 * h,
                   'Z'
            ];
        }

        if (Highcharts.SVGRenderer) {
            Highcharts.SVGRenderer.prototype.symbols.star = star;
        }

        if (Highcharts.VMLRenderer) {
            Highcharts.VMLRenderer.prototype.symbols.star = star;
        }
        
        Highcharts.setOptions({
            symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down', 'star'],
            chart: {
                marginTop: 15
                , spacingLeft: 5
                , spacingRight: 10
                , spacingBottom: 5
                , animation: false //除了series初始化动画以外的动画
            }
            , title: {
                text: null,
                style: {
                    color: '#666',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    fontFamily: '微软雅黑,黑体,"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
                }
            }
            , exporting: {
                enabled: false
            }
            , subtitle: {
                style: {
                    color: '#666',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    fontFamily: '微软雅黑,黑体,"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
                }
            }
            , colors: ['#43538d', '#88a500', '#ff9900', '#d92400', '#7191be', '#333333', '#9360d3']
            , xAxis: {
                title: {
                    text: null,
                    style: {
                        fontFamily: 'Arial,微软雅黑',
                        color: '#000000',
                        fontWeight: 'normal',
                        fontSize: '11px'
                    }
                },
                labels: {
                    style: {
                        fontFamily: 'Arial,微软雅黑'
                        , color: '#000000'
                        , fontSize: '11px'
                    },
                    overflow: 'justify'
                },
                tickColor: '#666666',
                tickWidth: 1,
                tickLength: 2,
                lineColor: '#666666',
                tickmarkPlacement: 'on',
                dateTimeLabelFormats: {
                    day: "%m-%d",
                    month: "%Y-%m",
                    week: "%m-%d",
                    year: "%Y"
                }
            }
            , yAxis: {
                title: {
                    text: null,
                    align: 'high',
                    style: {
                        fontFamily: 'Arial,微软雅黑',
                        color: '#000000',
                        fontWeight: 'normal',
                        fontSize: '11px'
                    }
                },
                labels: {
                    style: {
                        fontFamily: 'Arial,微软雅黑'
                        , color: '#000000'
                        , fontSize: '11px'
                    },
                    overflow: 'justify'
                },
                gridLineDashStyle: 'shortdot',
                lineWidth: 0,
                tickPixelInterval: 48,
                dateTimeLabelFormats: {
                    day: "%m-%d",
                    month: "%Y-%m",
                    week: "%m-%d",
                    year: "%Y"
                }
            }
            , plotOptions: {
                series: { animation: false },//series初始化动画
                line: {
                    lineWidth: 2,
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    events: {
                        legendItemClick: function (evt) {
                            return false;
                        }
                    },
                    turboThreshold: 5000
                },
                bar: {
                    pointPadding: 0,
                    borderWidth: 0,
                    //                    marker: {//bar、column、pie图无marker
                    //                        enabled: false
                    //                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    events: {
                        legendItemClick: function (evt) {
                            return false;
                        }
                    }
                },
                pie: {
                    slicedOffset: 0,
                    size: '100%',
                    colors: ['#43538d', '#88a40a', '#ff9900', '#eb1400', '#6e8bb4', '#1a1a1a', '#9897b4'],
                    allowPointSelect: false,
                    showInLegend: false,
                    dataLabels: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    point: {
                        events: {
                            legendItemClick: function (evt) {
                                return false;
                            }
                        }
                    }
                },
                column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    events: {
                        legendItemClick: function (evt) {
                            return false;
                        }
                    }
                },
                area: {
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    events: {
                        legendItemClick: function (evt) {
                            return false;
                        }
                    }
                },
                scatter: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    events: {
                        legendItemClick: function (evt) {
                            return false;
                        }
                    }
                }
            }
            , tooltip: {
                enabled: false
            }
            , legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0,
                margin: 5,
                itemStyle: {
                    color: '#000000',
                    fontFamily: 'Arial,微软雅黑',
                    fontSize: '10px',
                    cursor: 'default'
                },
                symbolHeight: 10,
                itemHoverStyle: {
                    color: '#000000'
                }
            }
            , credits: {
                enabled: false
            }
        });
    }

    //修改blockUI的默认配置
    if (typeof ($.blockUI) == 'function') {
        $.extend(true, $.blockUI.defaults, {
            message: '<img src="../resource/images/Frame/loading.gif" />',
            noIframe:true,//https下iframe使用javascript:false引发终端显示免责声明，但若使用about:blank，ie下https非常慢
            theme: false,
            css: {
                padding: 0,
                margin: 0,
                width: '32px',
                height: '32px',
                //top: '40%',
                //left: '35%',
                textAlign: 'center',
                color: '#000',
                border: '0px solid #A6C9E2',
                background: 'transparent', /*jquery.css在ie下使用backgroundColor会将背景色设置为灰色*/
                cursor: 'wait'
            },
            overlayCSS: {
                backgroundColor: '#FFFFFF',
                opacity: 0.4,
                cursor: 'wait'
            }
        });
    }
});

/*js String 对象扩展*/
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}

String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
};

/*全局guid生成器，从1000开始递增，添加字母G开头，确保不重复*/
(function () {
    var guid = 1000;
    window.GUID = function () {
        return 'G' + (guid++)
    }
})();

//数字增加千位符
function milliFormat(s) {
    s = s.toString();
    if (/[^0-9\.-]/.test(s)) return null;
    s = s.replace(/^(\d*)$/, "$1.");
    s = s.replace(/(\d*\.\d*)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) {
        s = s.replace(re, "$1,$2");
    }
    s = s.replace(/,(\d*)$/, ".$1");
    s = s.replace(/\.$/, "");
    return s.replace(/^\./, "0.")
}

function isNullorEmpty(o) {
    if (o == null) return true;
    if (o == '') return true;
    if (o == 'undefined') return true;
    if (o == undefined) return true;
    return false;
}
function is_numeric(num) {
    var reg = /^\-?([0-9]\d*|0)(\.\d+)?$/;
    if (reg.test(num)) {
        return true;
    }
    else {
        return false;
    }
}
function fomatDouble(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

Date.prototype.DateAdd = function (strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}

//阻止事件冒泡
function stopProp(evt) {
    if (evt.stopPropagation)
        evt.stopPropagation();
    else
        evt.cancelBubble = true;
}

function WriteUserBehavior(behaviorType) {
    var dataParameters = { MethodAlias: "WriteUserBehaviors", Parameter: new Array(behaviorType) };
    AjaxRequest(ajaxSecureUnlockHandler, dataParameters, null, null);
}

function removeDivBeforeLoading() {
    $('#divBeforeLoading').remove();
}

function showDivError() {
    $('body').append("<div class='divError'><div>出错了...请试试<a href='javascript:window.location.href=window.location.href;'>重新加载<a>。</div></div>");
}

//下载文件（iframe方式）
function DownloadFile(url) {
    if ($('#ifrDownloadFile').length <= 0) {
        $('<iframe id="ifrDownloadFile" style="display:none"></iframe>').appendTo('body');
    }

    $('#ifrDownloadFile').attr('src', url);
    //  if (typeof callback == 'function') {
    //        $('#ifrDownloadFile')[0].contentDocument.onload(function () {
    //            callback();
    //        });
    //        $($('#ifrDownloadFile')[0].contentDocument).ready(function () {
    //            callback();
    //        });
    //        $($('#ifrDownloadFile')[0].contentDocument).load(function () {
    //            callback();
    //        });
    //        $('#ifrDownloadFile')[0].onreadystatechange = function () {
    //            if (this.readyState == "complete") {
    //                callback();
    //            }
    //        }
    //   }
}


/*终端与web交互调用

//防止textbox被键盘精灵抢焦点
function bindTextForKeyWizard()
{
//var cmd = { func: "WFC_BindEvents", isGlobal: 1};
if(window.external&&window.external.ClientFunc)
window.external.ClientFunc('{"func":"WFC_BindEvents","isGlobal":1}');
}
*/


//cookie操作方法
function addCookie(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);
    //判断是否设置过期时间
    if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime() + expiresHours * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }

    //    if (domain) {
    //        cookieString = cookieString + "; domain=" + domain;
    //    }

    document.cookie = cookieString;
}

function deleteCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=v; expires=" + date.toGMTString();
}

function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}

//移动端兼容性处理
function amendDatePicker(datePickerIds) {
    if (isMobile()) {
        $(datePickerIds).each(function (i, e) {
            //$('#'+e).datepicker("option", "closeText", "Close");
            $('#' + e).datepicker("option", "showButtonPanel", true);
        });
    }
}

//for fix bug 0073024
function removeIpadBlank() {
    if (isMobile()) {
        $('input[type="text"]').add('textarea').blur(function () {
            var reg = new RegExp(String.fromCharCode(8198), "g");
            $(this).val($(this).val().replace(reg, ''));
        });
    }
}

//parse DateString(如yyyy-MM-dd) to Date
function parseDate(strDate) {
    if (strDate && strDate.match) {
        var result = strDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (result && result.length == 5) {
            return new Date(result[1], result[3] - 1, result[4]);
        }
    }
    return false;
}

//create style element
function CreateStyle(str) {
    var poorIE = ($.browser.msie && parseInt($.browser.version) < 10);
    var head = document.getElementsByTagName("head")[0];
    var el = document.getElementById("gridHeadColor");
    if (el) {
        head.removeChild(el);
    }
    el = document.createElement("style");
    el.id = "gridHeadColor";
    if (poorIE) {
        if (el.styleSheet) {
            el.styleSheet.cssText = str;
        }
    } else {
        el.appendChild(document.createTextNode(str));
    }
    head.appendChild(el);
}

//颜色操作帮助
var ColorHelper = (function () {
    /**
    * @constructor
    * @param {number} r 0-255
    * @param {number} g 0-255
    * @param {number} b 0-255
    * @param {number=} a 0-1
    */
    function Color(r, g, b, a) {
        this.r = r;
        this.b = b;
        this.g = g;
        this.a = typeof a == "number" ? a : 1;
    };
    /**
    * Return an rgb() or rgba() color
    * 
    * @override
    * @return {string}
    */
    Color.prototype.toString = function () {
        var r = Math.round(this.r),
        g = Math.round(this.g),
        b = Math.round(this.b),
        a = this.a;

        if (a === 1)
            return "rgb(" + r + ", " + g + ", " + b + ")";
        else
            return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    };
    /**
    * Be liberal in finding RGB values: find the first three numbers.
    * 
    * @param {string} haystack
    * @return {Color}
    */
    function findRGB(haystack) {
        var match = /([\d]{1,3})[^\d]+([\d]{1,3})[^\d]+([\d]{1,3})/.exec(haystack);

        return match && new Color(
                parseInt(match[1], 10),
                parseInt(match[2], 10),
                parseInt(match[3], 10)
            );
    };
    /**
    * @param {string} haystack
    * @return {Color}
    */
    function findRGBA(haystack) {
        var match = /([\d]{1,3})[^\d]+([\d]{1,3})[^\d]+([\d]{1,3})[^\d]+([01]?\.[\d]+|0|1)/.exec(haystack);

        return match && new Color(
                 parseInt(match[1], 10),
                 parseInt(match[2], 10),
                 parseInt(match[3], 10),
                 parseFloat(match[4])
            );
    };
    //Convert hev to rgb
    function findHex(haystack) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (reg.test(haystack) && haystack.length == 7) {
            return new Color(
                parseInt(haystack.substr(1, 2), 16),
                parseInt(haystack.substr(3, 2), 16),
                parseInt(haystack.substr(5, 2), 16)
            );
        }
        return false;
    };
    //Convert rgba to rgb
    function rgbaTorgb(color, opacity, bg) {
        if (!bg) bg = new Color(255, 255, 255);
        var setColor = new Color(
            (1 - opacity) * bg.r + opacity * color.r,
            (1 - opacity) * bg.g + opacity * color.g,
            (1 - opacity) * bg.b + opacity * color.b
        );
        return setColor;
    };
    function getColor(haystack) {
        var color;
        if (/^(rgba|RGBa)/.test(haystack)) { color = findRGBA(haystack); opacity = color.a; }
        else if (/^(rgb|RGB)/.test(haystack)) color = findRGB(haystack);
        else if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(haystack)) color = findHex(haystack);
        return color;
    };
    return {
        /**
        * fade color by opacity
        * @param {string} haystack (hex 6,rgb,rgb)
        * @return {Color}
        */
        fadeColor: function (haystack, opacity) {
            var color = getColor(haystack);
            if (color) return rgbaTorgb(color, opacity).toString();
            return "";
        },
        isEqualColor: function (haystackColorA, haystackColorB) {
            var colorA = getColor(haystackColorA);
            var colorB = getColor(haystackColorB);
            if (colorA && colorB && colorA.r === colorB.r && colorA.g === colorB.g && colorA.b === colorB.b) {
                return true;
            }
            return false;
        }
    };
})();


//autocomplete实现键盘精灵
function initKeyboardWizardSearch(selector, selCallback) {
    $(selector).autocomplete({
        source: function (request, response) {
            var parameters = [request.term, "19,20,49,50,42,43,44,45", "12"];//大陆公墓基金，香港基金，券商集合理财，私募基金
            var dataParameters = { MethodAlias: 'MFRB_GetProductsByKey', Parameter: parameters };
            AjaxRequest(ajaxSecureUnlockHandler, dataParameters, function (result) {
                if (result.State === 0) {
                    //获取已选择的产品代码集合
					//此处获取当前操作行
                    var currentSelCode = $('.InvestmentSetting').find("tr[ptype='0'] td input.ui-state-focus").parent().next("td.tCode").text();
                    var productCodes = $.map($('.InvestmentSetting').find("tr[ptype='0'] td.tCode"), function (item) {
                        var code=$(item).text();
                        if (code != "--" && code != currentSelCode)
                            return code;
                    });
                    //增加功能：过滤已选择的基金
                    result.Data = $.map(result.Data, function (item) {
                        if ($.inArray(item.WindCode, productCodes)=== -1)
                            return item;
                    });
                    response($.map(result.Data, function (item) {
                        return {
                            label: item.WindCode + "   " + item.Name,
                            value: item.Name
                        }
                    }));
                } else {
                    showAlert("键盘精灵获取数据失败。");
                }
            });
        },
        minLength: 1,
        select: function (event, obj) {
            var label = obj.item.label;
            var l = label.split("   ");
            if (l.length > 1) {
                selCallback(l[0], l[1]);
            }

        }
    });
    var __defaultText = $(selector).filter('input').attr('placeholder') || "";
    $(selector).focus(function () {
        if ($(this).val() === __defaultText) {
            $(this).filter('input').removeClass('placeholder');
            $(this).val('');
        }
    }).blur(function () {
        if ($(this).val() === '') {
            $(this).filter('input').addClass('placeholder');
            $(this).val(__defaultText);
        }
    }).blur();
}

$.widget("ui.placeholder", {
    version: '1.0',
    options: {
        placeholder:null
    },
    _create: function () {
        var self = this, opt = this.options, ele = this.element;
        var placeholder = opt.placeholder || ele.attr('placeholder');
        if (placeholder) {
            ele.attr('placeholder', placeholder);
            if (!('placeholder' in document.createElement('input'))) {

                if (ele.val() == '') {
                    ele.val(placeholder).addClass('placeholder').blur();
                }

                ele.bind('focus.placeholder', function () {
                    var self = $(this);
                    if (self.val() == placeholder) {
                        self.val('').removeClass('placeholder');
                    }
                });

                ele.bind('blur.placeholder', function () {
                    var self = $(this);
                    if (self.val() == '') {
                        self.val(placeholder).addClass('placeholder');
                    }
                });                
                
                /*此端代码试图完美重现chrome下效果，即focus时placeholder还在直到有内容输入，但这样做确实麻烦
                //ctrl+cv能够解决，但邮件复制粘贴无法解决
                ele.bind('keydown.placeholder', function () {
                    var self = $(this);
                    //console.log('keydown' + self.val());//test
                    //if (self.val() == placeholder) {
                    //    self.val('').removeClass('placeholder');
                    //}
                    //当按键可能影响input数值时，remove placeholder状态
                    if (self.hasClass('placeholder')) {
                        self.val('').removeClass('placeholder');
                    }
                });
                ele.bind('keyup.placeholder', function () {
                    var self = $(this);
                    //console.log('keyup' + self.val());//test
                    //当按键可能让input为空时，检查input是否为空，若是则add placeholder状态
                    if (self.val() == '') {
                        self.val(placeholder).addClass('placeholder');
                        //鼠标需要放到最前面//虽可实现但似乎需要settimeout
                    }
                });
                */
            }
        }
    },
    _destroy: function () {
        var self = this, opt = this.options, ele = this.element;
        var placeholder = opt.placeholder || ele.attr('placeholder');
        ele.removeClass('placeholder').unbind('focus.placeholder blur.placeholder');
        if (ele.val() == placeholder) {
            ele.val('');
        }
    }
});

/*
 * 设置输入域(input/textarea)光标的位置
 * @param {HTMLInputElement/HTMLTextAreaElement} elem
 * @param {Number} index
 */
function setCursorPosition(elem, index) {
    var val = elem.value;
    var len = val.length;

    // 超过文本长度直接返回
    if (len < index) {
        return;
    }
    setTimeout(function () {
        elem.focus();
        if (elem.setSelectionRange) { // 标准浏览器
            elem.setSelectionRange(index, index);
        } else { // IE9-
            var range = elem.createTextRange();
            range.moveStart("character", -len);
            range.moveEnd("character", -len);
            range.moveStart("character", index);
            range.moveEnd("character", 0);
            range.select();
        }
    }, 10);
}

//----------------- WFCFrame使用公共函数 begin --------------------------------

//获取图片请求handler
function getImageHandler() {
    //handler = GetRootURL() + "/WealthManagement/MFRB/handlers/ImageDownLoadHandler.ashx?imageSrc=";
    handler = "/WealthManagement/MFRB/handlers/ImageDownLoadHandler.ashx?imageSrc=";
    return handler;
};

//GetRootURL
function GetRootURL() {
    var rootUrl = window.location.origin;
    if (!window.location.origin) {
        rootUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    return rootUrl;
}

//判断两个js object是否相等
function IsObjEqual(obj1, obj2) {
    if (obj1 && obj2 && typeof (obj1) == 'object' && typeof (obj2) == 'object') {
        var result = true;
        $.each(obj1, function (index, item) {
            if (!IsObjEqual(obj1[index], obj2[index])) {
                result = false;
                return false;
            }
        })
        if (result) {
            $.each(obj2, function (index, item) {
                if (!obj1.hasOwnProperty(index)) {
                    result = false;
                    return false;
                }

            })
        }

        return result;
    } else {
        return obj1 == obj2;
    }
}

function showDebugMsg(msg) {
    if (typeof DEBUG != 'undefined' && DEBUG) {
        if ($('#msgDebug').length > 0)
            $('#msgDebug').append(mag + '<br/>').show();
        else if (typeof (console) != 'undefined' && console.log)
            console.log(msg);
    }
}

//判断一个数字是整数还是浮点数
function isFloat(num) {
    var num1 = parseInt(num);
    return num > num1;
}

//转换后台传回的chart数据，遍历series，当x属性为null时，去除它
function convertChartData(series) {
    if (series) {
        $.each(series, function (index, sery) {
            $.each(sery.data, function (j, item) {
                if (!item.x) {
                    delete item.x;
                }
            });
        });
    }
}

//将url中的“协议+host部分”替换为replacement
function replaceUrl(url, replacement) {
    var reg = new RegExp("\\bhttp(s?)://(\\w|.)[^//]*");
    return url.replace(reg, replacement);
}

function getPeriod(endTime) {
    var date;
    switch (typeof endTime) {
        case "object":
            {
                date = new Date(endTime);
                break;
            }
        case "string":
            {
                var dateArr = endTime.split("-");
                date = new Date();
                date.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
                break;
            }
    }
    var period = '';
    if (date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 3 || (month == 3 && day < 31)) {
            period = (date.getFullYear() - 1) + "-12-31";
        } else if (month < 6 || (month == 6 && day < 30)) {
            period = date.getFullYear() + "-03-31";
        } else if (month < 9 || (month == 9 && day < 30)) {
            period = date.getFullYear() + "-06-30";
        } else if (month < 12 || (month == 12 && day < 31)) {
            period = date.getFullYear() + "-09-30";
        } else {
            period = date.getFullYear() + "-12-31";
        }
    }
    return period;
}

function getTimeRange(strRange, foundingDate) {
    var result = {};
    switch (strRange) {
        case 'Max':
            result.beginTime = foundingDate || '';//开始值需设置为对应产品的开始日期
            result.endTime = new Date().format('yyyy-MM-dd');
            break;
        case '1Y':
            result.beginTime = new Date().addYears(-1).addDays(1).format('yyyy-MM-dd');
            result.endTime = new Date().format('yyyy-MM-dd');
            break;
        case '3Y':
            result.beginTime = new Date().addYears(-3).addDays(1).format('yyyy-MM-dd');
            result.endTime = new Date().format('yyyy-MM-dd');
            break;
        case '5Y':
            result.beginTime = new Date().addYears(-5).addDays(1).format('yyyy-MM-dd');
            result.endTime = new Date().format('yyyy-MM-dd');
            break;
    }
    if (foundingDate && result.beginTime && foundingDate > result.beginTime) {
        result.beginTime = foundingDate;
    }
    return result;
}

/*
** 在控件标题中显示时间区间
** objSetting{ showTimeRangeLabel:v1,beginTime:v2,endTime:v3,reportPeriod:v4 }
*/
function getTimeRangeLabelText(objSetting) {
    var showTimeRangeLabel = parseInt(objSetting.showTimeRangeLabel);
    var _text = "";
    switch (showTimeRangeLabel) {
        case 2: {
            _text += "( " + objSetting.beginTime + "至" + objSetting.endTime + " )";
            break;
        }
        case 3: {
            _text += "( " + "截止于" + objSetting.endTime + " )";
            break;
        }
        case 4: {
            _text += "( " + getPeriodChineseText(objSetting.reportPeriod) + " )";
            break;
        }
        default:
            break;
    }
    return _text;
}

/*
** 根据报告期获取到对应季度的中文名称
** period格式必须为 yyyy-MM-dd
** 例如：2014-09-30 => 2014三季度
*/
function getPeriodChineseText(period) {
    var _text = "";
    if (period.length === 10) {
        var _year = period.substr(0, 4);
        var _month = period.substr(6, 2);
        _text = _year.toString();
        switch (parseInt(_month)) {
            case 3:
                _text += "一季度";
                break;
            case 6:
                _text += "二季度";
                break;
            case 9:
                _text += "三季度";
                break;
            case 12:
                _text += "四季度";
                break;
            default:
                _text = "";
                break;
        }
    }
    return _text;
}

function moveEnd(obj) {

    obj.focus();

    var len = obj.value.length;

    if (document.selection) {

        var sel = obj.createTextRange();

        sel.moveStart('character', len);

        sel.collapse();

        sel.select();

    } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {

        obj.selectionStart = obj.selectionEnd = len;

    }
}

function getResultMsg(result) {
    var msg = '';
    if (result && result.State != 0) {
        msg = '系统发生异常';
        if (result.ErrorMessage) {
            msg = result.ErrorMessage;
        } else if (result.ErrorCode) {
            switch (result.ErrorCode) {
                case "1000":
                    msg = '查询数据失败';
                    break;
                case "2000":
                    msg = '无权限';
                    break;
            }
        }
    }
    return msg;
}

//设置终端键盘精灵状态（避免键盘精灵捕获输入导致动态加入的input框无效）
function setClientSmartInput(enabled /* 1:true,0:false */) {
    try {
        var cmd = { func: "setsmartinput", isGlobal: 1, enable: enabled };
        window.external.ClientFunc(JSON2.stringify(cmd));
    } catch (e) {
    }
}

//-----------------WFCFrame使用公共函数 end--------------------------------


//arr[i]或arr[i][prop]最好为string或number，否则可能无法达到预期效果
function uniqueArray(arr, prop) {
    if (arr && arr.length) {
        var obj = {}, result = [], max = arr.length, key;
        for (var i = 0; i < max; i++) {
            key = String(typeof prop == 'string' ? arr[i][prop] : arr[i]);
            if (!obj.hasOwnProperty(key)) {
                obj[key] = true;
                result.push(arr[i]);
            }
        }
        return result;
    }
    return arr;
}
