<template>
  <div class='asidebar'>
    <Domain v-if="companyId === '1'"></Domain>
    <Register v-else></Register>
  </div>
</template>

<script>
  import Register from './sidebar-register'
  import Domain from './sidebar-domain'

  export default {
    name: "asidebar",
    components:{ Register, Domain},
    props:{
      companyId:String,
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
