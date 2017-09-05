<template>
    <input v-if="domtype === 'text'" v-model="inputValue" :name="name" lay-verify="title" autocomplete="off" placeholder="请输入账号" class="layui-input">
    <input v-else-if="domtype === 'password'" v-model="inputValue" :name="name" lay-verify="title" autocomplete="off" placeholder="请输入账号" class="layui-input">
    <input v-else-if="domtype === 'textarea'" :name="name" lay-verify="title" autocomplete="off" placeholder="请输入账号" class="layui-input" v-model="inputValue">
    <input v-else>
</template>
<script>
export default{
    props:{
        value: [String, Number],
        domtype: {//类型text,password,textarea之类的
	        type: String,
	        default: "text"
	    },
        name: {//form提交用到的name
	        type: String,
	        default: ''
	    },
    },
    data(){
        return{
            inputValue:this.value,
        }
    },
    watch:{
        'inputValue'(val, oldValue) {
            console.log(val);
        }
    }
}
</script>
