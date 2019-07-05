<template>
<div>
  <b-navbar type="dark" variant="info" fixed="top">
    <b-navbar-brand href="#">Logo</b-navbar-brand>
    <b-button size="sm"  id="addButton" class="my-2 my-sm-0 ml-auto" href="http://localhost:8080/#/add">add</b-button>
  </b-navbar>
</div>
</template>


<script>
export default {
  name:"headerfile",
    props: {
  
    },
    data(){
        return{
        }
    },
   
}
</script>
<style scoped>
header{
    background-color: aqua;
    height: 60px;
}
</style>
