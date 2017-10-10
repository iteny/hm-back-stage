<template>
<button type="submit" class="btn btn-primary" :redirect="redirect"><slot></slot></button>
</template>
<script>
export default {
    props: {
        submit: [String, Number],
        url: {
            type: String,
            default: '',
        },
        redirect: {
            type: String,
            default: '',
        },
    },
    // data(){
    //     return{
    //         submitUrl:this.url,
    //     }
    // },
    methods: {
        // submitForm() {
        //     // console.log('执行submitForm');
        //
        //     // hm.submit(this.submit, this.url, this.redirect)
        //     //监听提交
        //     // alert(this.submit);
        //     // form.on('submit('+this.submit+')', function(data){
        //     //     layer.alert(JSON.stringify(data.field), {
        //     //       title: '最终的提交信息'
        //     //     })
        //     //     return false;
        //     // });
        // }
    },
}
</script>
