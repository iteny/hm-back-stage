/**
 * @description 抛出异常错误信息
 * @homepage    http://www.hemacms.com/
 * @copyright   hemacms
 * @author Nicholas Mars
 * @date 2017-09-18
 */
//给jQuery增加一个方法animateCss,用于给dom元素增加动画效果
$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});
var HmObj = function() {
    this.config = {
        language: 'cn', //js设置国际化
        animateRandom: true, //是否开启动画随机，默认true开启，false关闭
    };
    this.menuCfg = {
        top_menu: undefined, //顶部顶级菜单
        data: undefined, //数据源
        url: undefined, //数据源地址
        type: 'GET', //读取方式
        cached: true, //是否启用菜单数据项缓存，默认localStorage
        spreadOne: false, //设置是否只展开一个二级菜单
        topFilter: 'TopMenu', //顶级菜单过滤器
        left_menu: undefined, //左侧二级导航
        leftFilter: 'LarrySide', //左侧菜单过滤器
        larry_elem: undefined, //tab选项卡容器
        tabFilter: 'larryTab', //tab过滤器
        maxTab: 50, //默认允许最大打开tab个数
        tabSession: true, //是否开启已打开tab选项卡缓存
        closed: true, // 选项卡是否包含删除按钮进而可关闭操作
        contextMenu: false, //是否屏蔽页面右键，使用页面级自定义右键菜单
        autoRefresh: false, //是否支持选项卡重新打开时自动刷新操作
    };
    this.menuData = {};//菜单数据
    this.language = {};//语言数据
    //过渡动画
    this.animateIn = {
        1: 'bounce',
        2: 'flash',
        3: 'pulse',
        4: 'rubberBand',
        5: 'shake',
        6: 'headShake',
        7: 'swing',
        8: 'tada',
        9: 'wobble',
        10: 'jello',
        11: 'bounceIn',
        12: 'bounceInDown',
        13: 'bounceInLeft',
        14: 'bounceInRight',
        15: 'bounceInUp',
        16: 'fadeIn',
        17: 'fadeInDown',
        18: 'fadeInDownBig',
        19: 'fadeInLeft',
        20: 'fadeInLeftBig',
        21: 'fadeInRight',
        22: 'fadeInRightBig',
        23: 'fadeInUp',
        24: 'fadeInUpBig',
        25: 'flipInX',
        26: 'flipInY',
        27: 'flipOutX',
        28: 'flipOutY',
        29: 'lightSpeedIn',
        30: 'rotateIn',
        31: 'rotateInDownLeft',
        32: 'rotateInDownRight',
        33: 'rotateInUpLeft',
        34: 'rotateInUpRight',
        35: 'hinge',
        36: 'jackInTheBox',
        37: 'rollIn',
        38: 'zoomIn',
        39: 'zoomInDown',
        40: 'zoomInLeft',
        41: 'zoomInRight',
        42: 'zoomInUp',
        43: 'slideInDown',
        44: 'slideInLeft',
        45: 'slideInRight',
        46: 'slideInUp',
    };
    //消失动画
    this.animateOut = {
        1: 'bounceOut',
        2: 'bounceOutDown',
        3: 'bounceOutLeft',
        4: 'bounceOutRight',
        5: 'bounceOutUp',
        6: 'fadeOut',
        7: 'fadeOutDown',
        8: 'fadeOutDownBig',
        9: 'fadeOutLeft',
        10: 'fadeOutLeftBig',
        11: 'fadeOutRight',
        12: 'fadeOutRightBig',
        13: 'fadeOutUp',
        14: 'fadeOutUpBig',
        15: 'lightSpeedOut',
        16: 'rotateOut',
        17: 'rotateOutDownLeft',
        18: 'rotateOutDownRight',
        19: 'rotateOutUpLeft',
        20: 'rotateOutUpRight',
        21: 'rollOut',
        22: 'zoomOut',
        23: 'zoomOutDown',
        24: 'zoomOutLeft',
        25: 'zoomOutRight',
        26: 'zoomOutUp',
        27: 'slideOutDown',
        28: 'slideOutLeft',
        29: 'slideOutRight',
        30: 'slideOutUp',
    };
};
/**
 * @description 设置语言，默认为cn
 * @param lg 什么语言，如果在下列选项中没有，那么将设置成cn
 */
HmObj.prototype.languageSet = function(lg) {
    var that = this;
    if (lg == 'cn') {
        that.config.language = 'cn';
    } else if (lg == 'en') {
        that.config.language = 'en';
    } else {
        that.config.language = 'cn';
    }
    return that;
};
/**
 * @description 设置语言，默认为cn
 * @param time cookie设定个时间，不填则为3天
 */
HmObj.prototype.languageRun = function(time) {
    var that = this;
    if ($.cookie('back-language') == null) {
        $.cookie('back-language', that.config.language, {
            expires: time ? time : 3, //有限日期，可以是一个整数或一个日期(单位：天)。这个地方也要注意，如果不设置这个东西，浏览器关闭之后此cookie就失效了
            // path: "/", //cookie值保存的路径，默认与创建页路径一致。
            // domin: , //cookie域名属性，默认与创建页域名一样。这个地方要相当注意，跨域的概念，如果要主域名二级域名有效则要设置".xxx.com"
            // secure: true //一个布尔值，表示传输cookie值时，是否需要一个安全协议。
        })
    }
};

/**
 * @description 国际化
 * @author Nicholas Mars
 */
HmObj.prototype.readJsonFile = function() {
    var that = this;
    switch ($.cookie('back-language')) {
        case 'cn':
            that.language = language.cn;
            break;
        case 'en':
            that.language = language.en;
            break;
        default:
            that.language = language.cn;
            break;
    }
};
/**
 * @description 随机过渡动画
 * @author Nicholas Mars
 */
HmObj.prototype.noticeAnimateIn = function() {
    var sj = Math.ceil(Math.random() * 46),
        that = this,
        amin = "";
    for (var k in that.animateIn) {
        if (sj == k) {
            amin = that.animateIn[k];
        }
    }
    return amin;
};
/**
 * @description 随机消失动画
 * @author Nicholas Mars
 */
HmObj.prototype.noticeAnimateOut = function() {
    var sj = Math.ceil(Math.random() * 30),
        that = this,
        amout = "";
    for (var k in that.animateOut) {
        if (sj == k) {
            amout = that.animateOut[k];
        }
    }
    return amout;
};
/**
 * @description 判断浏览器设备类型
 * @author Nicholas Mars
 * @param status 如果不设置此参数，那么仅仅输出设备类型
 * @param callback 回调函数，用于加入自己的一些行为
 */
HmObj.prototype.browserType = function(status, callback) {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        switch (status) {
            case "index":
                var hg = window.innerHeight + 10;
                var frame = window.innerHeight +8;
                $('#main-container').height(hg);
                $('.hm-frame').height(frame);
                break;
            default:
                console.log("phone");
        }
    } else {
        switch (status) {
            case "index":
                var hg = window.innerHeight - 51;
                var frame = window.innerHeight - 92;
                $('#main-container').height(hg);
                $('.hm-frame').height(frame);
                break;
            default:
                console.log("pc");
        }
    }
};
/**
 * @description 弹出一个消息框
 * @author Nicholas Mars
 * @param type  消息框类型，只允许4种，info<warn<error<success，如果没有设置或错误设置，那么默认为info
 * @param msg   消息框的信息,如果不设置自动调用语言文件里相应的内容
 * @param title 消息框的标题,如果不设置自动调用语言文件里相应的内容
 * @param time  消息框持续时间，如果不设置，默认为3秒
 */
HmObj.prototype.notice = function(type, msg, title, time) {
    PNotify.prototype.options.styling = "bootstrap3";
    var icon, that = this,
        amin = this.noticeAnimateIn(),
        amout = this.noticeAnimateOut();
    //判断错误信息类型，更改背景和图标
    switch (type) {
        case "info": //普通消息
            icon = "fa-info-circle";
            break;
        case "warn": //警告
            icon = "fa-exclamation-circle";
            type = "notice";
            break;
        case "error": //错误
            icon = "fa-times-circle";
            break;
        case "success": //成功
            icon = "fa-check-circle";
            break;
        default:
            icon = "fa-info-circle";
            break;
    }
    //由于依赖语言文件加载为先，所以需要延迟0.1秒，否则读取不了语言文件

    new PNotify({
        title: title ? title : that.language.noticeTitle, //标题
        text: msg ? msg : that.language.noticeMsg, //内容
        animate: { //动画效果
            animate: true,
            in_class: amin ? amin : 'bounceInRight',
            out_class: amout ? amout : 'bounceOut'
        },
        // styling: "fontawesome", //选择样式,"brighttheme", "bootstrap3", "fontawesome"
        addclass: "hm-custom", //增加class用以自定义样式
        cornerclass: "hm-custom-content", //增加消息框边框样式
        width: "300px", //宽度
        // min_height: "16px", //最小高度
        icon: 'fa ' + icon, //图标
        type: type ? type : "info", //类型notice,info,success,error
        shadow: true, //阴影
        delay: time ? time : 3000, //多少毫秒后消息被删除
        hide: true, //是否自动关闭
        mouse_reset: true, //鼠标悬浮的时候，时间重置
        nonblock: {
            nonblock: false, //无阻塞消息
        },
    });
    //设置关闭与暂停的高度
    var noticeHeight = $('.hm-custom.ui-pnotify').innerHeight() / 2;
    $('.hm-custom .ui-pnotify-sticker').attr('style', 'cursor: pointer; visibility: visible;height:' + noticeHeight + 'px;line-height:' + (noticeHeight / 2) + 'px');
    $('.hm-custom .ui-pnotify-closer').attr('style', 'cursor: pointer; visibility: visible;height:' + noticeHeight + 'px;line-height:' + (noticeHeight / 2) + 'px');
    //设置关闭与暂停多语言
    $('.hm-custom .ui-pnotify-closer>span').html(that.language.noticeClose ? that.language.noticeClose : "关闭");
    $('.hm-custom .ui-pnotify-sticker>span').html(that.language.noticePause ? that.language.noticePause : "暂停");
    //自定义具体窗口高度的位置
    $('.hm-custom.ui-pnotify').attr('style', 'display:none;top:70px;width:300px;right:16px;');
};
HmObj.prototype.dialog = function(type) {
    //判断错误信息类型，更改背景和图标
    switch (type) {
        case "info": //普通消息
            icon = "info";
            break;
        case "warn": //警告
            icon = "warning";
            type = "notice";
            break;
        case "error": //错误
            icon = "error";
            break;
        case "success": //成功
            icon = "success";
            break;
        default:
            icon = "info";
            break;
    }
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        allowOutsideClick: false
    }).then(function() {
        swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
    }, function(dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
            swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    });
};
HmObj.prototype.menuCfgReset = function(options) {
    var that = this;
    if (!options.hasOwnProperty('url')) {
        that.notice('error','没有传入数据源:url参数，菜单项无法正常初始化！');
    }
    var allow = ['top_menu', 'left_menu', 'data', 'url', 'type', 'cached', 'spreadOne', 'topFilter', 'leftFilter'];
    var option = that.configFilter(options, allow);
    // 传入参数进行配置
    $.extend(that.menuCfg, options);
    return that;
};
// 获取菜单数据
HmObj.prototype.getMenuData = function() {
    var _that = this;
    var _config = _that.menuCfg;
    var data;
    if (_config.url === undefined) {
        that.notice('error','菜单错误: 请为菜单项配置数据源【Url】!');
    }
    if (typeof(_config.data) === 'object') {
        _that.larryCompleteMenu(_config.data);
        _that.init();
    } else {
        //若未传入data参数 通过url方式获取
        $.ajax({
            type: _config.type,
            url: _config.url,
            // async: false,
            dataType: 'json',
            success: function(result, status, xhr) {
                // 取得数据
                if(result == null){
                    _that.notice('error','获取菜单数据失败');
                }else{
                    window.localStorage.setItem('hm_menu_data', JSON.stringify(result));
                }
            },
            error: function(xhr, status, error) {
                _that.notice('error','LarryMS Error: ' + error);
            },
            complete: function() {
                // _that.init();
            }
        });
    }

};
HmObj.prototype.menuSet = function(){
    var data = JSON.parse(window.localStorage.getItem('hm_menu_data'));
    if(data != null){
        var str='',count = data.length;
        for(var i = 0;i<count;i++){
            console.log(data[i]);
            str+= '<li data-id="'+data[i]["id"]+'"><a href="#">'+data[i]['name']+'</a></li>';
        }

        $('#hm_menu_top').html(str);
    }
};

/**
 * [larryCompleteMenu 菜单扩展处理程序]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
HmObj.prototype.larryCompleteMenu = function(data) {
    var that = this;
    var _config = that.menuCfg;
    that.menuData = data;
    // var $leftNav = that.elemCheck(_config.left_menu, 'left_menu');
    // //左侧导航设置正确
    // if ($leftNav !== 'error') {
    //     // 顶级菜单容器过滤
    //     var $topNav = that.elemCheck(_config.top_menu, 'top_menu');
    //     // 开启了顶部菜单
    //     if ($topNav !== 'undefined') {
    //         var html = that.getHtml(data, 'on');
    //         // 存入localStorage.larry_menu
    //         window.localStorage.setItem('larry_menu', JSON.stringify(html));
    //         LeftMenuElem = html.left;
    //         // 生成初始化菜单数据
    //         $topNav.html(html.top);
    //         $leftNav.html(html.left[0]);
    //         element.init();
    //         that.config.top_menu = $topNav;
    //         that.config.left_menu = $leftNav;
    //     } else { // 未开启顶部菜单，只有左侧菜单暂时只支持2级导航
    //         var html = that.getHtml(data, 'off');
    //         window.localStorage.setItem('larry_menu', JSON.stringify(html));
    //         LeftMenuElem = html;
    //         $leftNav.html(html);
    //         element.init();
    //         _that.config.left_menu = $leftNav;
    //     }
    // }
};
/**
 * www.larrycms.com
 * [getHtml getHtml 功能函数]
 * @param  {[type]} data      [description]
 * @param  {[type]} topStatus [description]
 * @return {[type]}           [description]
 */
HmObj.prototype.getHtml = function(data, topStatus) {
    // 开启顶部导航
    if (topStatus == 'on') {
        var ulHtml = {
            top: '',
            left: []
        };
        // 第一层循环取出top_menu
        for (var i = 0; i < data.length; i++) {
            if (i == 0) {
                ulHtml.top += '<li class="layui-nav-item layui-this">';
            } else {
                ulHtml.top += '<li class="layui-nav-item">';
            }
            ulHtml.top += '<a  data-group="' + i + '"">';
            ulHtml.top += '<i class="larry-icon" data-icon="' + data[i].icon + '">' + data[i].icon + '</i>';
            ulHtml.top += '<cite>' + data[i].title + '</cite>';
            ulHtml.top += '</a>'
            ulHtml.top += '</li>';
            // 进入第二层左侧二级导航
            if (data[i].children !== undefined && data[i].children !== null && data[i].children.length > 0) {
                ulHtml.left[i] = '';
                for (var j = 0; j < data[i].children.length; j++) {
                    if (i == 0 && j == 0) {
                        ulHtml.left[i] += '<li class="layui-nav-item layui-this">';
                    } else if (j == 0 && (data[i].children[j].children !== undefined && data[i].children[j].children !== null && data[i].children[j].children.length > 0)) {
                        ulHtml.left[i] += '<li class="layui-nav-item layui-nav-itemed">';
                    } else if (j == 0 && !(data[i].children[j].children !== undefined && data[i].children[j].children !== null && data[i].children[j].children.length > 0)) {
                        ulHtml.left[i] += '<li class="layui-nav-item layui-this">';
                    } else if (data[i].children[j].spread && j != 0) {
                        ulHtml.left[i] += '<li class="layui-nav-item layui-nav-itemed">';
                    } else {
                        ulHtml.left[i] += '<li class="layui-nav-item">';
                    }
                    // 有三级菜单
                    if (data[i].children[j].children !== undefined && data[i].children[j].children !== null && data[i].children[j].children.length > 0) {
                        ulHtml.left[i] += '<a>';
                        if (data[i].children[j].icon !== undefined && data[i].children[j].icon !== '') {
                            // 暂时只定义一种用法
                            ulHtml.left[i] += '<i class="larry-icon" data-icon="' + data[i].children[j].icon + '">' + data[i].children[j].icon + '</i>';
                        }
                        ulHtml.left[i] += '<cite>' + data[i].children[j].title + '</cite>';
                        ulHtml.left[i] += '</a>';
                        ulHtml.left[i] += '<dl class="layui-nav-child">';
                        // for循环取出第三级菜单
                        for (var k = 0; k < data[i].children[j].children.length; k++) {
                            if (j == 0 && k == 0) {
                                ulHtml.left[i] += '<dd class="layui-this">';
                            } else {
                                ulHtml.left[i] += '<dd>';
                            }
                            ulHtml.left[i] += '<a data-url="' + data[i].children[j].children[k].url + '">';
                            if (data[i].children[j].children[k].icon !== undefined && data[i].children[j].children[k].icon !== '') {
                                // 暂时只定义一种用法
                                ulHtml.left[i] += '<i class="larry-icon" data-icon="' + data[i].children[j].children[k].icon + '">' + data[i].children[j].children[k].icon + '</i>';
                            }
                            ulHtml.left[i] += '<cite>' + data[i].children[j].children[k].title + '</cite>';
                            ulHtml.left[i] += '</a>';
                            ulHtml.left[i] += '</dd>';
                        }
                        ulHtml.left[i] += '</dl>';
                    } else { //无三级菜单
                        var dataUrl = (data[i].children[j].url !== undefined && data[i].children[j].url !== '') ? 'data-url="' + data[i].children[j].url + '"' : '';
                        ulHtml.left[i] += '<a ' + dataUrl + '>';
                        if (data[i].children[j].icon !== undefined && data[i].children[j].icon !== '') {
                            // 暂时只定义一种用法
                            ulHtml.left[i] += '<i class="larry-icon" data-icon="' + data[i].children[j].icon + '">' + data[i].children[j].icon + '</i>';
                        }
                        ulHtml.left[i] += '<cite>' + data[i].children[j].title + '</cite>';
                        ulHtml.left[i] += '</a>';
                    }
                    ulHtml.left[i] += '</li>';
                }
            }
        }
        return ulHtml;
    } else {
        // 只定义左侧导航且二级
        var ulhtml = '';
        for (var i = 0; i < data.length; i++) {

            if (i == 0) {
                ulHtml += '<li class="layui-nav-item layui-this">';
            } else {
                ulHtml += '<li class="layui-nav-item">';
            }

            if (data[i].children !== undefined && data[i].children !== null && data[i].children.length > 0) {
                ulHtml += '<a>';
                if (data[i].icon !== undefined && data[i].icon !== '') {
                    ulHtml += '<i class="larry-icon" data-icon="' + data[i].icon + '">' + data[i].icon + '</i>';
                }
                ulHtml += '<cite>' + data[i].title + '</cite>';
                ulHtml += '</a>';
                ulHtml += '<dl class="layui-nav-child">';
                for (var j = 0; j < data[i].children.length; j++) {
                    ulHtml += '<dd>';
                    ulHtml += '<a data-url="' + data[i].children[j].url + '">';
                    if (data[i].children[j].icon !== undefined && data[i].children[j].icon !== '') {
                        ulHtml += '<i class="larry-icon" data-icon="' + data[i].children[j].icon + '">' + data[i].children[j].icon + '</i>';
                    }
                    ulHtml += '<cite>' + data[i].children[j].title + '</cite>';
                    ulHtml += '</a>';
                    ulHtml += '</dd>';
                }
                ulHtml += '</dl>';
            } else {
                var dataUrl = (data[i].url !== undefined && data[i].url !== '') ? 'data-url="' + data[i].url + '"' : '';
                ulHtml += '<a ' + dataUrl + '>';
                ulHtml += '<i class="larry-icon" data-icon="' + data[i].icon + '">' + data[i].icon + '</i>';
                ulHtml += '<cite>' + data[i].title + '</cite>';
                ulHtml += '</a>';
            }
            ulHtml += '</li>';
        }


        return ulHtml;
    }
}
/**
 * 针对传入容器进行检查
 * @param  elem 容器
 * @param  elemName 系统容器名
 * @return {[type]}
 */
HmObj.prototype.elemCheck = function(elem, elemName) {
    var $container;
    if (elemName != 'top_menu') {
        if (typeof(elem) !== 'string' && typeof(elem) !== 'object') {
            this.notice('error',elemName + '参数未定义或设置出错');
            $container = 'error';
            return $container;
        }
    } else {
        if (typeof(elem) !== 'string' && typeof(elem) !== 'object') {
            $container = 'undefined';
            return $container;
        }
    }
    // 若为字符串
    if (typeof(elem) === 'string') {
        $container = $('' + elem + '');
    }
    // 若为object
    if (typeof(elem) === 'object') {
        $container = elem;
    }
    if ($container.length === 0) {
        common.larryCmsError(elemName + ': 您设置了 ' + elemName + '参数，但DOM文档中找不到定义的【 ' + elem + ' 】元素', common.larryCore.paramsTit);
        $container = 'error';
        return $container;
    }
    var filter = $container.attr('lay-filter');
    if (filter === undefined || filter === '') {
        common.larryCmsError('请为【' + elem + '】容器设置一个lay-filter过滤器', 'lay-filter设置提示');
    }
    return $container;
}
/**
 * config传入参数过滤处理
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
HmObj.prototype.configFilter = function(obj, allow) {
    var newO = {};
    for (var o in obj) {
        if ($.inArray(o, allow)) {
            newO[o] = obj[o];
        }
    }
    return newO;
};
//创建HmMenuTab对象
var hm = new HmObj();
//如果后台没有设置语言，JS来设置
hm.languageSet('en');
hm.languageRun();
//启动国际化
hm.readJsonFile();
//进度条给予遮罩层
$("#hm-shade").addClass('on');
//给遮罩层一个消失动画
$('#hm-shade').animateCss('fadeOut');
console.log(hm.noticeAnimateIn());
console.log(hm.noticeAnimateOut());
