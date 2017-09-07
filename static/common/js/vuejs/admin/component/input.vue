<template>
    <input v-if="domtype === 'text'" type="text" :name="name" :lay-verify="verify" autocomplete="off" :placeholder="hint" class="layui-input" v-model="inputValue">
    <input v-else-if="domtype === 'password'" type="password" :name="name" :lay-verify="verify" autocomplete="off" :placeholder="hint" class="layui-input" v-model="inputValue">
    <textarea v-else-if="domtype === 'textarea'" :name="name" :lay-verify="verify" autocomplete="off" :placeholder="hint" class="layui-textarea" v-model="inputValue"></textarea>
    <textarea v-else-if="domtype === 'edit'" class="layui-textarea layui-hide" name="content" lay-verify="content" :id="domid"></textarea>
    <input v-else>
</template>
<script>
export default{
    props:{//相当于html标签自定义属性
        domid:[String],
        value: [String, Number],//通常不使用
        hint:[String,Number],//对应html的placeholder，输入提示或暗示
        verify: [String, Number],//验证规则为自定义的字符串，例如：验证A|验证B|验证C
        domtype: {//html的type,类型text,password,textarea之类的
	        type: String,
	        default: "text"
	    },
        name: {//html的name
	        type: String,
	        default: ''
	    },
    },
    beforeCreat(){//组件实例刚创建，组件属性计算之前，如data属性等。

    },
    created(){//组件实例创建完成，属性已绑定,但DOM还未生成,$el属性还不存在。
    },
    beforeMount(){//模板编译挂载之前

    },
    mounted(){//模板编译挂载之后
        if(this.domtype === 'edit'){
            var editIndex = layedit.build(this.domid);
            layedit.sync(editIndex)
            // return;
        }
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
