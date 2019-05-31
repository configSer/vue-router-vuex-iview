export default {
  isLogin(state){
    return state.type;
  },
  getInfo(state){
    return state.userInfo;
  },
  getMaster(state){
    return state.masterFilter;
  },
  masterIds(state){
    return state.masterId;
  }
}
