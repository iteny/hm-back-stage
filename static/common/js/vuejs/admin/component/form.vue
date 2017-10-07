<template>
<form class="hm-form form-horizontal" :action="url">
    <slot></slot>
</form>
</template>
<script>
export default {
    props: {
        url: [String]
    },
}
</script>
