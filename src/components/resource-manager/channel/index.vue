<template>
    <div class='channel_index'>
      <MasterFilter :select-change="selectChange"></MasterFilter>
      channel
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
