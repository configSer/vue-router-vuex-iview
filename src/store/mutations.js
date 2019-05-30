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
  }
}
