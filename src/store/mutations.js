import tools from "../utils/tools";

export default{
  login(state) {
    state.type = 1;
    tools.setGlobal("type",'1')
  },
  logout(state) {
    state.type = 0;
    tools.setGlobal("type",'0')
  },
  setMasterId(state,value) {
    state.masterId = value;
    tools.setGlobal("masterId",value);
  },
  setUserInfo(state,info){
    state.userInfo = info;
  },
  setMasterFilter(state,list){
    state.masterFilter = list;
  },
  showPersonal(state,flag){
    state.showPersonal = flag;
  },
  changePass(state,flag){
    state.changePassword = flag;
  },
  changeUserInfo(state,flag){
    state.changeUserInfo =  flag;
  },
  routeChange(state){
    state.isRouteChange = true;
  },
  setCompanyId(state,flag){
    state.companyId = flag;
  }
}
