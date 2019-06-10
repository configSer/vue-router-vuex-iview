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
        this.$store.commit('setMasterId',Number(id));
        tools.setGlobal("masterId",Number(id))
      }
    },

  }
</script>

<style scoped>

</style>
