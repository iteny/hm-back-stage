<template>
    <input v-if="domtype === 'text'" name="title" lay-verify="title" autocomplete="off" placeholder="请输入账号" class="layui-input" value="text">
    <input v-else-if="domtype === 'password'" name="title" lay-verify="title" autocomplete="off" placeholder="请输入账号" class="layui-input" value="password">
    <input v-else-if="domtype === 'textarea'" name="title" lay-verify="title" autocomplete="off" placeholder="请输入账号" class="layui-input" value="textarea">
    <input v-else>
</template>
<script>
export default{
    props:{
        domtype: {//类型text,password,textarea之类的
	        type: String,
	        default: "text"
	    },
    },
    data(){
        return{
            text:"asdfsadf",
        }
    },
}
</script>
