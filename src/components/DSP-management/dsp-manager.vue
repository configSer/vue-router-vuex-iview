<template>
    <div class='dsp-manager'>
      <MasterFilter :select-change="selectChange"></MasterFilter>
      dsp
    </div>
</template>

<script>
  import tools from '../../utils/tools';
  import MasterFilter from './../common/master-filter'
  export default {
    name: "dsp-manager",
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
