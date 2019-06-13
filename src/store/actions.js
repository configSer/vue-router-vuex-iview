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
  getMasterId(context,id){
    context.commit('setMasterId',id);
  },
  personal(context,flag) {
    context.commit('showPersonal',flag)
  },
  changeInfo(context,flag) {
    context.commit('changeUserInfo',flag)
  },
  changeWord(context,flag) {
    context.commit('changePass',flag)
  }
}
