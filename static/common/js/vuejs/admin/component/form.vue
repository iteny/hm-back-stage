<template>
<form class="hm-form form-horizontal" :action="url" data-parsley-validate="">
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
