import fetch from "../utils/fetch";
import tools from "../utils/tools";

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
