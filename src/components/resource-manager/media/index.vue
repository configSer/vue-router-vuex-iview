<template>
    <div class='media_index'>
      <MasterFilter :select-change="selectChange"></MasterFilter>
      media
    </div>
</template>

<script>
  import tools from '../../../utils/tools';
  import MasterFilter from './../../common/master-filter'
  export default {
    name: "media_index",
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
