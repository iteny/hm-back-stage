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


    this.config = language();
}
/**
 * @description 设置语言，默认为cn
 * @param lg 什么语言，如果在下列选项中没有，那么将设置成cn
 */
BaseFunc.languageSet = function(lg) {
    if (lg == 'cn') {
        BaseFunc.language = 'cn';
    } else if (lg == 'en') {
        BaseFunc.language = 'en';
    } else {
        BaseFunc.language = 'cn'
    }
}
/**
 * @description 设置语言，默认为cn
 * @param time cookie设定个时间，不填则为3天
 */
BaseFunc.languageRun = function(time) {
    // console.log(BaseFunc.config);
    if ($.cookie('language') == null) {
        $.cookie('language', BaseFunc.language, {
            expires: time ? time : 3, //有限日期，可以是一个整数或一个日期(单位：天)。这个地方也要注意，如果不设置这个东西，浏览器关闭之后此cookie就失效了
            // path: "/", //cookie值保存的路径，默认与创建页路径一致。
            // domin: , //cookie域名属性，默认与创建页域名一样。这个地方要相当注意，跨域的概念，如果要主域名二级域名有效则要设置".xxx.com"
            // secure: true //一个布尔值，表示传输cookie值时，是否需要一个安全协议。
        })
    }
}

// BaseFunc.prototype.config = [];
function language() {
    // var that;
    var test;
    // if (window.XMLHttpRequest) {
    //     test = new XMLHttpRequest();
    // } else if (window.ActiveXObject) {
    //     test = new window.ActiveXObject();
    // } else {
    //     alert("请升级至最新版本的浏览器");
    // }
    // if (test != null) {
    //     test.open("GET", "/static/common/js/admin/language.json", true);
    //     test.send(null);
    //     test.onreadystatechange = function() {
    //         if (test.readyState == 4 && test.status == 200) {
    //             var obj = JSON.parse(test.responseText);
    //             // console.log(obj);
    //             return obj;
    //         }
    //     };
    //
    // }
    // return that;

    $.ajax({
        type: "GET",
        url: "/static/common/js/admin/language.json",
        dataType: "JSON",
        async: false,
        success: function(data) {
            // console.log(data);
            // 传入参数进行配置
            // var bj = ;
            // alert(bj);
            // var str = eval('(' + data + ')');
            // $.extend(true, that.language, str);
            // return that;
            test = data;
            console.log(test);
        }
    });
    return test;
}
// BaseFunc.prototype.sss = BaseFunc.readJsonFile(function(result) {
//     console.log(result);
//     return result;
// });

// BaseFunc.config = JSON.stringify(BaseFunc.readJsonFile());
// BaseFunc.readJsonFile();

BaseFunc.languageSet('en');
BaseFunc.languageRun();

/**
 * @description 弹出一个错误对话框
 * @author Nicholas Mars
 * @param msg   对话框的信息
 * @param title 对话框的标题
 */
BaseFunc.prototype.errorDialog = function(msg, time, title) {
    var btn, lgtitle;
    switch ($.cookie('language')) {
        case 'cn':
            btn = ['我明白了'];
            lgtitle = '提示信息';
            break;
        case 'en':
            btn = ['I know'];
            lgtitle = 'Notify Message';
            break;
        default:
            btn = ['我明白了'];
            lgtitle = '提示信息';
    }
    layer.alert(msg, {
        title: title ? title : lgtitle,
        icon: 2,
        time: time ? time : 0,
        resize: false,
        zIndex: layer.zIndex,
        anim: Math.ceil(Math.random() * 6),
        offset: 't',
        shade: 0.1,
        btn: btn
    });
    return;
}
//创建HmMenuTab对象
var Base = new BaseFunc();
// Base.readJsonFile();
// Base.language();
// console.log(varss);
// console.log(language());
console.log(Base.config.firstName);
