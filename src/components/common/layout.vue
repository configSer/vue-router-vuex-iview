<template>
  <Layout class="layout_all">
    <HeadTemp :username="username" :isLogin="isLogin"></HeadTemp>
    <Layout class="layout_content">
      <SideBar class="layout_side" :companyId="companyId"></SideBar>
      <Content class="layout_scroll">
        <router-view/>
      </Content>
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
    components: {SideBar, HeadTemp},
    data() {
      return {
        username: "",
        companyId: "",
        isLogin: true,
      }
    },
    mounted() {
      let vm = this;
      let type = tools.getGlobal('type');
      if (type && type === '1') {
        vm.$store.dispatch('showLogin');
        vm.isLogin = true;
      } else {
        vm.$store.dispatch('hideLogin');
        vm.isLogin = false;
      }
      tools.getUserInfo().then((res) => {
        vm.username = res.result.name;
        vm.companyId = res.result.companyId;
        vm.$store.dispatch('getUserInfo',res.result);
        tools.getMasterFilter(res.result.companyId).then(data => {
          vm.$store.commit('setMasterFilter',data.result.lists);
          let MID = tools.getGlobal('masterId');
          if (vm.companyId != 1) {
            if (MID && res.result.masterIds == MID){
              vm.$store.commit('setMasterId',Number(MID))
            } else {
              vm.$store.commit('setMasterId', Number(res.result.masterIds))
              tools.setGlobal('masterId', res.result.masterIds);
            }
          } else {
            if ( MID && res.result.masterIds.indexOf(MID) !=-1 ){
              vm.$store.commit('setMasterId',Number(MID))
            } else {
              vm.$store.commit('setMasterId', Number(res.result.masterIds.split(',')[0]));
              tools.setGlobal('masterId', res.result.masterIds.split(',')[0]);
            }
          }
        });
      }, err => {
        this.$router.push('/login');
        if (err.errorCode === 50000) {
          this.$Message.error('请重新登录');
        } else {
          this.$Message.error(err.errorMsg);
        }
      });
    },
  }
</script>

<style scoped>

</style>
