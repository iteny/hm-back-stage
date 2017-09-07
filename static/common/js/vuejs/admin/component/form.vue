<template>
    <form class="layui-form" :action="url">
        <slot></slot>
    </form>
</template>
<script>
export default{
    props:{
        url:[String]
    },
}
</script>
