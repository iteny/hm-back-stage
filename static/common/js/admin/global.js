/**
 * @description 抛出异常错误信息
 * @homepage    http://www.hemacms.com/
 * @copyright   hemacms
 * @author Nicholas Mars
 * @date 2017-09-18
 */
var layer = layui.layer,
    form = layui.form,
    layedit = layui.layedit,
    laydate = layui.laydate;
var lan;
var BaseFunc = function() {


    this.config = {
        language: 'cn',
    };
    this.language = {};
}
/**
 * @description 设置语言，默认为cn
 * @param lg 什么语言，如果在下列选项中没有，那么将设置成cn
 */
BaseFunc.prototype.languageSet = function(lg) {
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
BaseFunc.prototype.languageRun = function(time) {
    var that = this;
    if ($.cookie('language') == null) {
        $.cookie('language', that.config.language, {
            expires: time ? time : 3, //有限日期，可以是一个整数或一个日期(单位：天)。这个地方也要注意，如果不设置这个东西，浏览器关闭之后此cookie就失效了
            // path: "/", //cookie值保存的路径，默认与创建页路径一致。
            // domin: , //cookie域名属性，默认与创建页域名一样。这个地方要相当注意，跨域的概念，如果要主域名二级域名有效则要设置".xxx.com"
            // secure: true //一个布尔值，表示传输cookie值时，是否需要一个安全协议。
        })
    }
}

// BaseFunc.prototype.config = [];
// var dtd = $.Deferred();
BaseFunc.prototype.readJsonFile = function() {
    var that = this;
    var lang;
    var langFile;
    var defer = $.Deferred();
    switch ($.cookie('language')) {
        case 'cn':
            langFile = "cn";
            break;
        case 'en':
            langFile = "en";
            break;
        default:
            langFile = "cn";
            break;
    }
    $.ajax({
        type: "GET",
        url: "/static/common/js/admin/language/" + langFile + ".js",
        dataType: "JSON",
        success: function(data) {
            console.log(data);
            defer.resolve(data)
            // lang = data;

        },
    });
    return defer.promise();
    // console.log(lang);
    // that.language = lang;
}

/**
 * @description 弹出一个消息框
 * @author Nicholas Mars
 * @param msg   消息框的信息
 * @param title 消息框的标题
 */
BaseFunc.prototype.noticeErr = function(type,msg,title, time) {
    PNotify.prototype.options.styling = "bootstrap3";
    var icon,that = this;
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
    setTimeout(function () {
        new PNotify({
            title: title ? title : that.language.noticeTitle, //标题
            text: msg ? msg : that.language.noticeMsg, //内容
            animate: {
                animate: true,
                in_class: 'bounceInRight',
                out_class: 'bounceOut'
            },
            // styling: "fontawesome", //选择样式,"brighttheme", "bootstrap3", "fontawesome"
            addclass: "hm-custom", //增加class用以自定义样式
            cornerclass: "dddd", //增加消息框边框样式
            width: "300px", //宽度
            // min_height: "16px", //最小高度
            icon: 'fa ' + icon, //图标
            type: type ? type : "info", //类型notice,info,success,error
            shadow: true, //阴影
            delay: time ? time : 3000, //多少毫秒后消息被删除
            hide: true, //是否自动关闭
            mouse_reset: true, //鼠标悬浮的时候，时间重置
            nonblock: {
                nonblock: false,
            },
        });
        var noticeHeight = $('.ui-pnotify').innerHeight() / 2;
        $('.ui-pnotify-sticker').attr('style', 'cursor: pointer; visibility: visible;height:'+noticeHeight+'px;line-height:'+(noticeHeight/2)+'px');
        $('.ui-pnotify-closer').attr('style', 'cursor: pointer; visibility: visible;height:'+noticeHeight+'px;line-height:'+(noticeHeight/2)+'px');
        $('.ui-pnotify-closer>span').html(that.language.noticeClose ? that.language.noticeClose : "关闭");
        $('.ui-pnotify-sticker>span').html(that.language.noticePause ? that.language.noticePause : "暂停");
        $('.hm-custom').attr('style', 'display:none;top:70px;width:300px;right:16px;');
    }, 100);


    // var btn, lgtitle;
    // switch ($.cookie('language')) {
    //     case 'cn':
    //         btn = ['我明白了'];
    //         lgtitle = '提示信息';
    //         break;
    //     case 'en':
    //         btn = ['I know'];
    //         lgtitle = 'Notify Message';
    //         break;
    //     default:
    //         btn = ['我明白了'];
    //         lgtitle = '提示信息';
    // }
    // layer.alert(msg, {
    //     title: title ? title : lgtitle,
    //     icon: 2,
    //     time: time ? time : 0,
    //     resize: false,
    //     zIndex: layer.zIndex,
    //     anim: Math.ceil(Math.random() * 6),
    //     offset: 't',
    //     shade: 0.1,
    //     btn: btn
    // });
    // return;
}
//创建HmMenuTab对象
var Base = new BaseFunc();
Base.languageSet('en');
Base.languageRun();
console.log(Base.config.language)
$.when(Base.readJsonFile()).done(function(data){
    Base.language = data;
    return Base.language;
});
setTimeout(function () {
    console.log(Base.language);
}, 3000);
