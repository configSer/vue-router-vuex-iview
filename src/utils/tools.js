import fetch from './fetch';
let tools = {
  dateSet: {
    resource: {
      defaultShow: 3,
      startDate: "",
      endDate: "",
    },
    account: {
      defaultShow: 3,
      startDate: "",
      endDate: "",
    },
    system: {
      defaultShow: 3,
      startDate: "",
      endDate: "",
    },
  },
  getGlobal(key){
    return sessionStorage.getItem(key);
  },
  setGlobal(key,value){
    return sessionStorage.setItem(key,value);
  },
  removeGlobal(key) {
    sessionStorage.removeItem(key);
  },
  getUserInfo(){
    return new Promise((resolve,reject) => {
      fetch("/ssp-manager/v1/user/list").then(res => {
        resolve(res);
      },err => {
        reject(err)
      })
    })
  },
  getMasterFilter(companyId){
    return new Promise( resolve => {
      fetch("/ssp-manager/v1/master_filter/list",{
        method:"post",
        body:JSON.stringify({companyId:companyId ? companyId : tools.getGlobal("companyId") })
      }).then(res => {
        resolve(res)
      })
    })
  },
  initQuickDate() {
    let currentDate = new Date();
    let list = [];
    
    //自定义
    list.push({id: 1, name: "自定义", value: "0,1"});
    
    //昨天
    let yesterday_start = tools.subDays(currentDate, 1);
    list.push({id: 2, name: "昨天", value: yesterday_start + "," + yesterday_start + "," + "2"});
    
    //今天
    let today_start = tools.subDays(currentDate, 0);
    list.push({id: 3, name: "今天", value: today_start + "," + today_start + "," + "3"});
    
    //本月
    let today_arr = today_start.split("-");
    today_arr[2] = "01";
    let currentMonth_start = today_arr.join("-");
    list.push({id: 4, name: "本月", value: currentMonth_start + "," + today_start + "," + "4"});
    
    //上月
    let lastMonth_end = tools.subDays(new Date(currentMonth_start), 1);
    let lastMonth_arr = lastMonth_end.split("-");
    lastMonth_arr[2] = "01";
    let lastMonth_start = lastMonth_arr.join("-");
    list.push({id: 5, name: "上月", value: lastMonth_start + "," + lastMonth_end + "," + "5"});
    
    //最近七天
    let lastSeven_start = tools.subDays(currentDate, 6);
    list.push({id: 6, name: "最近7天", value: lastSeven_start + "," + today_start + "," + "6"});
    
    //最近30天
    let lastThirty_start = tools.subDays(currentDate, 29);
    list.push({id: 7, name: "最近30天", value: lastThirty_start + "," + today_start + "," + "7"});
    
    //最近3个月
    let lastNinety_first_month_end = tools.subDays(new Date(lastMonth_start), 1);
    let lastNinety_first_month_arr = lastNinety_first_month_end.split("-");
    lastNinety_first_month_arr[2] = "01";
    let lastNinety_start = lastNinety_first_month_arr.join("-");
    list.push({id: 8, name: "最近3个月", value: lastNinety_start + "," + today_start + "," + "8"});
    
    return list
  },
  subDays(date, days) {
    let result = new Date(date.valueOf() - days * 24 * 3600 * 1000);
    
    let year = result.getFullYear();
    let month = result.getMonth() + 1;
    let day = result.getDate();
    let dateStr = year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day);
    
    return dateStr;
  },
  addDays(date, days) {
    let result = new Date(date.valueOf() + days * 24 * 3600 * 1000);
    
    let year = result.getFullYear();
    let month = result.getMonth() + 1;
    let day = result.getDate();
    let dateStr = year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day);
    
    return dateStr;
  },
  subDate(date1, date2) {
    let from_date = new Date(date1);
    let end_date = new Date(date2);
    
    let time_different = (from_date - end_date) / 86400000;
    return time_different
  },
};
export default  tools;
