<template>
    <footer>
        <p>Copyright 2017 {{ title }}</p>
    </footer>
</template>
<script>
export default {
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data(){
        return{
        }
    }
}
</script>
<style scoped>

</style>
