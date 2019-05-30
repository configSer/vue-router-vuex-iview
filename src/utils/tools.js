import fetch from './fetch';
import store from './../store/index'
let tools = {
  getGlobal(key){
    return sessionStorage.getItem(key);
  },
  setGlobal(key,value){
    return sessionStorage.setItem(key,value);
  },
  removeGlobal(key) {
    sessionStorage.removeItem(key);
  },
  getMasterFilter(){
    return new Promise( resolve => {
      fetch("/ssp-manager/v1/master_filter/list",{
        method:"post",
        body:JSON.stringify({companyId:tools.getGlobal("companyId") ? tools.getGlobal("companyId") : store.state.userInfo.companyId })
      }).then(res => {
        resolve(res.result)
      })
    })
  }
};
export default  tools;
