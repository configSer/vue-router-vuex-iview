import fetch from "../utils/fetch";
import tools from "../utils/tools";

export default {
  getUserInfo({state}) {
    return new Promise(resolve => {
      fetch("/ssp-manager/v1/user/list").then(res => {
        if (res.errorCode === 0) {
          state.userInfo = res.result;
          tools.setGlobal("companyId",res.result.companyId);
          if (res.result.companyId === '1') {
            
            let masteId = parseInt(tools.getGlobal("masterId"));
            if (masteId && res.result.masterIds.indexOf(masteId) !== -1) {
              state.masterId = masteId;
            } else {
              state.masterId = parseInt(res.result.masterIds.split(',')[0]);
              tools.setGlobal("masterId",state.masterId);
            }
            
          } else {
            state.masterId = parseInt(res.result.masterIds);
            tools.setGlobal("masterId",state.masterId);
          }
          
          resolve(res.result)
        }
      })
    })
  }
}
