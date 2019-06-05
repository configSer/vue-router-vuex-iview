<template>
    <div class='media_index'>
      <Row type="flex" align="space-between">
        <Col>
          <MasterFilter :select-change="selectChange"></MasterFilter>
        </Col>
        <Col>
          <DatePickerCustom :change-date-handler="dateChange" :datePicker="datePicker"></DatePickerCustom>
        </Col>
      </Row>
      media
    </div>
</template>

<script>
  import qs from 'qs';
  import tools from '../../../utils/tools';
  import MasterFilter from './../../common/master-filter'
  import DatePickerCustom from './../../common/datepicker'
  export default {
    name: "media_index",
    components:{ MasterFilter, DatePickerCustom },
    data() {
      return {
        //表单提交的数据
        formData:{
          qStr:"",
          masterIds:[],
          startTime:"",
          endTime:"",
          pageIndex:1,
          pageSize:10,
          orderBy:"",
          orderType:"",
        },
        //datepicker初始化配置
        datePicker:{
          defaultShow:3,
          maxDate:"",
          minDate:"",
          startDate:"",
          endDate:"",
        },
      }
    },
    methods:{
      selectChange(id){
        this.$store.commit('setMasterId',parseInt(id));
        tools.setGlobal("masterId",parseInt(id))
      },
      //保存检索条件，并请求对应的列表数据
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
      //请求表格数据
      getTableData(){
        let vm = this;
        fetch("/ssp-manager/v1/media/list",{
          method:'post',
          body:qs.stringify(vm.formData)
        },'list')
      },
    },

  }
</script>

<style scoped>

</style>
