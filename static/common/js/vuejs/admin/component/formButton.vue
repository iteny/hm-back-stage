<template>
    <button @click="submitForm()" class="layui-btn" lay-submit="" :lay-filter="submit"><slot></slot></button>
</template>
<script>
export default{
    props:{
        submit:[String,Number],
        url:{
            type:String,
            default:'',
        },
    },
    // data(){
    //     return{
    //         submitUrl:this.url,
    //     }
    // },
    methods: {
        submitForm() {
            hm.submit(this.submit,this.url)
            //监听提交
            // alert(this.submit);
            // form.on('submit('+this.submit+')', function(data){
            //     layer.alert(JSON.stringify(data.field), {
            //       title: '最终的提交信息'
            //     })
            //     return false;
            // });
        }
    },
}
</script>
