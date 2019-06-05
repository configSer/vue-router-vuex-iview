export default {
  showLogin(context){
    context.commit('login')
  },
  hideLogin(context){
    context.commit('logout')
  },
  getMsterFilter(context,list){
    context.commit('setMasterFilter',list)
  },
  getUserInfo(context,info) {
    context.commit('setUserInfo',info);
  },
}
