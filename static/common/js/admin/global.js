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
    this.language = {};
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
}
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
}
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
}

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
}
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
}
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
}
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
                $('#main-container').height(hg);
                break;
            default:
                console.log("phone");
        }
    } else {
        switch (status) {
            case "index":
                var hg = window.innerHeight - 51;
                $('#main-container').height(hg);
                break;
            default:
                console.log("pc");
        }
    }
}
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
}
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
}
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
$('#hm-shade').animateCss('fadeOutDown');
console.log(hm.noticeAnimateIn());
console.log(hm.noticeAnimateOut());
