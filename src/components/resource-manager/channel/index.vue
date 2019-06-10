<template>
    <div class='channel_index'>
      <Row type="flex" justify="space-between" align="middle" class-name="lay_row">
        <Col><MasterFilter :select-change="selectChange"></MasterFilter></Col>
        <Col><DatePickerCustom :change-date-handler="dateChange" :datePicker="datePicker"></DatePickerCustom></Col>
      </Row>
    </div>
</template>

<script>
  import tools from '../../../utils/tools';
  import mixins from '../../../utils/mixins';
  import MasterFilter from './../../common/master-filter'
  import DatePickerCustom from './../../common/datepicker'
  export default {
    mixins:[mixins],
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
      getTableData() {}
    },
  }
</script>

<style scoped>

</style>
