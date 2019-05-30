<template>
  <div class='place_index'>
    <MasterFilter :select-change="selectChange"></MasterFilter>
    placement
  </div>
</template>

<script>
  import tools from '../../../utils/tools';
  import MasterFilter from './../../common/master-filter'
  export default {
    name: "place_index",
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
