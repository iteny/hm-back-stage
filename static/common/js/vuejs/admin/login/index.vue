<style>

</style>
<template>
    <div id="login">
        <form class="layui-form" action="">
            <h1>Hmcms管理登录</h1>
            <div class="layui-form-item">
                <label class="layui-form-label">账号</label>
                <div class="layui-input-block">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入账号" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">密码</label>
                <div class="layui-input-block">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入密码" class="layui-input">
                </div>
            </div>
            <slot></slot>
            <button @click="submitForm('hmForm')" class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>


        </form>
    </div>
</template>
<script>
export default {
    methods: {
        submitForm(formName) {
            hm.submit()
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
            // form.on('submit(demo1)', function(data){
            //     layer.alert(JSON.stringify(data.field), {
            //       title: '最终的提交信息'
            //     })
            //     return false;
            // });
        }

    }
}
</script>
