var layer = layui.layer,
    form = layui.form,
    layedit = layui.layedit,
    laydate = layui.laydate;

var hm = {
    /**
     * form提交处理
     * @param submitName 给提交设定一个名字，防止冲突
     */
    submit:function(submitName,submitUrl){
        //自定义验证规则
        // form.verify({
        //     title: function(value){
        //       if(value.length < 5){
        //         return '标题至少得5个字符啊';
        //       }
        //     }
        //     ,pass: [/(.+){6,12}$/, '密码必须6到12位']
        //     ,content: function(value){
        //       layedit.sync(editIndex);
        //     }
        // });
        //监听提交
        form.on('submit('+submitName+')', function(data){
            // layer.alert(JSON.stringify(data.field), {
            //   title: '最终的提交信息'
            // })
            $.ajax({
                type: 'post',
                url: submitUrl,
                data : data.field,
                dataType:"json",
                beforeSend: function(){
                    myload = layer.load(0,{time:3*1000});
                },
                success: function(msg){
                    if(msg.status === 1){
                        admin.success(msg.info,'#loginsubmit');
                        setTimeout(function(){window.location.href=redirect}, 3000);
                    }else{
                        layer.close(myload);
                        admin.error(msg.info,'#loginsubmit');
                        formLogin.attr('disabledSubmit',"");
                        // refreshs();
                        // $('.yanzheng_img').eq(0).click();
                        // $('#verify').val('')
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    admin.error('网络连接异常！','#loginsubmit');
                    formLogin.attr('disabledSubmit',"");
                    return false;
                }
            });
            return false;
        });
    },
}
