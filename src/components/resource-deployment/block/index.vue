<template>
    <div class='block'>
      <MasterFilter :select-change="selectChange"></MasterFilter>
        广告块
    </div>
</template>

<script>

  import tools from '../../../utils/tools';
  import MasterFilter from './../../common/master-filter'
  export default {
    components:{ MasterFilter },
    data() {
      return {}
    },
    methods:{
      selectChange(id){
        this.$store.commit('setMasterId',parseInt(id));
        tools.setGlobal("masterId",parseInt(id))
      }
    },
  }
</script>

<style scoped>

</style>
