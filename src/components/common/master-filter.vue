<template>
    <Select v-model="master" style="width:200px" @on-change="selectChange" :disabled="$store.state.companyId !=='1'">
      <Option v-for="item in masterFilter" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
</template>

<script>
  import { mapState } from 'vuex';
  import tools from '../../utils/tools'
  export default {
    name: "media_index",
    props:{selectChange:Function,},
    data() {
      return {master:-1}
    },
    mounted(){
      this.master = tools.getGlobal('masterId') ? Number(tools.getGlobal('masterId')) : this.$store.state.masterId;
    },
    watch:{
      '$store.state.masterId':{
        deep:true,
        handler(value){
          this.master = value;
          this.$store.commit('setMasterId',value);
          tools.setGlobal("masterId",value)
        }
      }
    },
    computed:{
      ...mapState({
        masterId(state){this.master = state.masterId ? tools.getGlobal("masterId") : Number(tools.getGlobal("masterId"));},
        masterFilter: state => state.masterFilter
      })
    }
  }
</script>

<style scoped>

</style>
