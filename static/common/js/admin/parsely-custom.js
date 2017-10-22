
window.Parsley.addValidator('username', {
    requirementType: 'regexp',
    validateString: function(value, rment) {

        var regu = eval("/^[a-zA-Z][a-zA-Z0-9_]{" + "5,16" + "}$/");
        var re = new RegExp(regu);
        if (re.test(value)) {
            return true;
        } else {
            return false;
        }

    },
    messages: {
        en: 'Invalid words detected.'
    }
});
window.Parsley.on('field:error', function() { //验证失败显示图标
    this.$element.parents(".col-sm-12").find('.glyphicon').addClass('glyphicon-remove').removeClass('glyphicon-ok');
    // console.log(this.$element.parents(".col-sm-12").find('div.jt').length == 0);
    if (this.$element.parents(".col-sm-12").find('div.jt').length == 0) {
        this.$element.parents(".col-sm-12").find('.parsley-errors-list').append('<div class="jt"></div>');
    }

});
window.Parsley.on('field:success', function() { //验证成功显示图标
    this.$element.parents(".col-sm-12").find('.glyphicon').addClass('glyphicon-ok').removeClass('glyphicon-remove');
});

Parsley.on('form:submit', function() {
    console.log('进去了');
    var that = $('.hm-form');
    var param = that.serialize();
    console.log(param);

    // console.log(that.serialize());
    Pace.track(function() {


        $.ajax({
            type: 'post',
            url: that.attr('action'),
            data: param,
            dataType: "json",
            beforeSend: function() {
                //进度条给予遮罩层
                $("#hm-shade").addClass('on');
                //给遮罩层一个消失动画
                $('#hm-shade').animateCss('fadeOut');
                Pace.restart();
            },
            success: function(msg) {
                if(msg.status === 1){
                    hm.notice('success',msg.info);
                    Pace.stop();
                    setTimeout(function() {
                        window.location.href = that.attr('redirect')
                    }, 3000);
                }else{
                    hm.notice('error',msg.info);
                    Pace.stop();
                }

                // if (msg.status === 1) {
                //     admin.success(msg.info, '#loginsubmit');
                //     setTimeout(function() {
                //         window.location.href = redirect
                //     }, 3000);
                // } else {
                //     layer.close(myload);
                //     admin.error(msg.info, '#loginsubmit');
                //     formLogin.attr('disabledSubmit', "");
                //     // refreshs();
                //     // $('.yanzheng_img').eq(0).click();
                //     // $('#verify').val('')
                // }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // admin.error('网络连接异常！', '#loginsubmit');
                // formLogin.attr('disabledSubmit', "");
                // return false;
                Pace.stop();
            }
        });
    });
    return false; // Don't submit form for this demo
});
$('.hm-form').parsley();
