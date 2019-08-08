<template>
  <div class='tag_index'>
    <MasterFilter :select-change="selectChange"></MasterFilter>
    tag
  </div>
</template>

<script>
  import tools from '../../../utils/tools';
  import MasterFilter from './../../common/master-filter'
  export default {
    name: "tag_index",
    components:{ MasterFilter },
    data() {
      return {
        title:'标签',
      }
    },
    mounted(){
      document.title = this.title;
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
