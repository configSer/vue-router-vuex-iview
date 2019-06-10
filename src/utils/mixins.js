import tools from './tools'

export default{
  methods:{
    selectChange(id){
      this.$store.dispatch('getMasterId',id);
      tools.setGlobal("masterId",id);
      this.setFormParam({name:'masterIds',value:id});
      this.getTableData();
    },
    setFormParam:function(param){
      this.formData[param.name]=param.value;
    },
    //保存检索条件，并请求对应的列表数据
    setDefineDate:function(){
      tools.dateSet.resource.defaultShow = this.datePicker.defaultShow;
      tools.dateSet.resource.startDate = this.datePicker.startDate;
      tools.dateSet.resource.endDate = this.datePicker.endDate;
    },
    //选择日期后触发
    dateChange:function(start,end,defaultShow,isNotGetData){
      this.datePicker.startDate = start;
      this.datePicker.endDate = end;
      this.datePicker.defaultShow = defaultShow;
      this.setFormParam({
        name:"startTime",
        value:start
      });
      this.setFormParam({
        name:"endTime",
        value:end
      });
      this.setDefineDate();
      if(!isNotGetData){
        this.getTableData();
      }
    },
  }
};
