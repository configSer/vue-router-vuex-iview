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
        vm.$store.dispatch('showLogin');
        vm.isLogin = true;
      } else {
        vm.$store.dispatch('hideLogin');
        vm.isLogin = false;
      }
      tools.getUserInfo().then((res) =>{
        if (res.errorCode === 0) {
          vm.$store.dispatch('getUserInfo',res.result);
          tools.setGlobal("companyId",res.result.companyId);
          if (res.result.companyId === '1') {

            let masteId = parseInt(tools.getGlobal("masterId"));
            if (masteId && res.result.masterIds.indexOf(masteId) !== -1) {
              vm.$store.commit('setMasterId',parseInt(masteId))
            } else {
              vm.$store.commit('setMasterId',parseInt(res.result.masterIds.split(',')[0]));
              tools.setGlobal("masterId",parseInt(res.result.masterIds.split(',')[0]));
            }

          } else {
            vm.$store.commit('setMasterId',parseInt(res.result.masterIds))
            tools.setGlobal("masterId",res.result.masterIds);
          }
        }
        vm.username = vm.$store.state.userInfo.name;
        vm.companyId = vm.$store.state.userInfo.companyId;
        tools.getMasterFilter().then(data => {
          vm.$store.dispatch('getMsterFilter',data.result.lists)
        })
      },err => {
        this.$router.push('/login');
        if (err.errorCode === 50000) {
          this.$Message.error('请重新登录');
        } else {
          this.$Message.error(err);
        }
      });
    },
  }
</script>

<style scoped>

</style>
