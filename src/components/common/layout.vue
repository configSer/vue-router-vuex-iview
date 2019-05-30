<template>
    <Layout class="layout_all">
      <HeadTemp :username="username" :isLogin="isLogin"></HeadTemp>
      <Layout class="layout_content">
        <SideBar class="layout_side" :companyId="companyId"></SideBar>
        <Content style="padding:2rem;"><router-view /></Content>
      </Layout>
    </Layout>
</template>

<script>
  import HeadTemp from './headtemp'
  import SideBar from './asidebar/index'
  import {mapActions} from 'vuex'
  import tools from './../../utils/tools'
  export default {
    name: "layout",
    components:{SideBar,HeadTemp},
    data() {
      return {
        username:"",
        companyId:"",
        isLogin:true,
      }
    },
    mounted(){
      let vm = this;
      let type = sessionStorage.getItem('type');
      if (type && type === '1') {
        vm.$store.commit('login');
        vm.isLogin = true;
      } else {
        vm.$store.commit('logout');
        vm.isLogin = false;
      }
      vm.getUserInfo().then(res =>{
        vm.username = vm.$store.state.userInfo.name;
        vm.companyId = vm.$store.state.userInfo.companyId;
        tools.getMasterFilter().then(data => {
          vm.$store.state.masterFilter = data.lists;
        })
      });
    },
    methods:{
      ...mapActions({getUserInfo:'getUserInfo'})
    },
  }
</script>

<style scoped>

</style>
