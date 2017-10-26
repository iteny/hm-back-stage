<template>
<div class="form-group has-feedback">
    <div class="col-sm-12">
        <slot></slot>
        <input v-if="domtype === 'text'" type="text" :name="name" class="form-control" autocomplete="off" :placeholder="hint" v-model="inputValue" :data-parsley-required="isempty" :data-parsley-minlength="minlen" :data-parsley-maxlength="maxlen">
        <input v-else-if="domtype === 'password'" type="password" :name="name" class="form-control" autocomplete="off" :placeholder="hint" v-model="inputValue" :data-parsley-required="isempty" :data-parsley-minlength="minlen" :data-parsley-maxlength="maxlen">
        <textarea v-else-if="domtype === 'textarea'" type="password" :name="name" class="form-control" autocomplete="off" :placeholder="hint" v-model="inputValue"></textarea>
        <input v-else type="text" :name="name" class="form-control" autocomplete="off" :placeholder="hint" v-model="inputValue">
        <span class="glyphicon glyphicon-star form-control-feedback" aria-hidden="true"></span>
    </div>
</div>
</template>
<script>
export default {
    props: { //相当于html标签自定义属性
        domid: [String],
        value: [String, Number], //通常不使用
        hint: [String, Number], //对应html的placeholder，输入提示或暗示
        verify: [String, Number], //验证规则为自定义的字符串，例如：验证A|验证B|验证C
        domtype: { //html的type,类型text,password,textarea之类的
            type: String,
            default: "text"
        },
        name: { //html的name
            type: String,
            default: ''
        },
        isempty: [String],
        minlen: [Number],
        maxlen: [Number],
        email: [String],
    },
    beforeCreat() { //组件实例刚创建，组件属性计算之前，如data属性等。

    },
    created() { //组件实例创建完成，属性已绑定,但DOM还未生成,$el属性还不存在。
    },
    beforeMount() { //模板编译挂载之前

    },
    mounted() { //模板编译挂载之后
        // if (this.domtype === 'edit') {
        //     var editIndex = layedit.build(this.domid);
        //     layedit.sync(editIndex)
        //     // return;
        // }
    },
    data() {
        return {
            inputValue: this.value,
            // inputTitle: this.title,
        }
    },
    watch: {
        'inputValue' (val, oldValue) {
            // if (!validator.isEmail(val)) {
            //     console.log("内容不是email");
            //     // this.changeText("asdfsadf");
            // }
            console.log(val);
        }
    },
    methods: {
        changeText(text) {
            this.title = text;
        }
    }
}
</script>
