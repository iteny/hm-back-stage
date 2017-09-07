var layer = layui.layer,
    form = layui.form,
    layedit = layui.layedit,
    laydate = layui.laydate;

var hm = {
    /**
     * form提交处理
     * @param submitName 给提交设定一个名字，防止冲突
     */
    submit:function(submitName){
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
            layer.alert(JSON.stringify(data.field), {
              title: '最终的提交信息'
            })
            return false;
        });
    },
}
