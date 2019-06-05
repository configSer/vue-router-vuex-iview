<template>
  <Row type="flex" justify="end" align="middle">
    <Col>
      <Select @on-change="quickSelect" class="quick_select" :value="quickDateList[datePicker.defaultShow-1].value">
        <Option v-for="item in quickDateList" :value="item.value" :key="item.id">{{item.name}}</Option>
      </Select>
    </Col>
    <Col>
      <DatePicker @on-change="inputSelect"
                   :clearable="false"
                   type="daterange"
                   :editable="false"
                   class="start_date"
                   :value="[datePicker.startDate,datePicker.endDate]"
                   :options="option"
                   format="yyyy-MM-dd"
                   placement="bottom-end"
                   placeholder="选择日期"
      ></DatePicker>
    </Col>
  </Row>
</template>

<script>
  import tools from "../../utils/tools.js";

  export default {
    name: 'DatePickerCustom',
    props: {
      datePicker: Object,
      changeDateHandler: Function,
    },
    data() {
      return {
        option: {
          disabledDate: this.disabledDate,
        },
        isInputChange: false,  //判端是否是因为选择日期引起的下拉框变化
        quickDateList: [
          {id: 1, name: "自定义", value: ""},
          {id: 2, name: "昨天", value: ""},
          {id: 3, name: "今天", value: ""},
          {id: 4, name: "本月", value: ""},
          {id: 5, name: "上月", value: ""},
          {id: 6, name: "最近七天", value: ""},
          {id: 7, name: "最近30天", value: ""},
          {id: 8, name: "最近3个月", value: ""},
        ],
      }
    },
    beforeMount: function () {
      //初始化自定义时段
      this.quickDateList = tools.initQuickDate();

      this.datePicker.defaultShow = this.datePicker.defaultShow ? this.datePicker.defaultShow : 3;

      if (this.datePicker.defaultShow != 1) {
        this.datePicker.startDate = this.quickDateList[this.datePicker.defaultShow - 1].value.split(",")[0];
        this.datePicker.endDate = this.quickDateList[this.datePicker.defaultShow - 1].value.split(",")[1];
      }

      this.changeDateHandler(this.datePicker.startDate, this.datePicker.endDate, this.datePicker.defaultShow, true);
    },
    methods: {
      quickSelect: function (dateRange) {
        let defaultShow = 0;
        let range_arr = dateRange.split(",");
        if (range_arr[0] != "0") {
          this.datePicker.startDate = range_arr[0];
          this.datePicker.endDate = range_arr[1];
          defaultShow = range_arr[2];
        } else {
          if (!this.isInputChange) {
            this.datePicker.startDate = "";
            this.datePicker.endDate = "";
          }
          defaultShow = range_arr[1];
        }

        this.changeDateHandler(this.datePicker.startDate, this.datePicker.endDate, defaultShow);

        this.isInputChange = false;

      },
      inputSelect: function (dateRange) {
        this.isInputChange = true;

        let defaultShow = 1;
        this.datePicker.defaultShow = 1;
        for (let i = 1; i < this.quickDateList.length; i++) {
          let quickDateArr = this.quickDateList[i].value.split(",");
          if (dateRange.join(",") == quickDateArr[0] + "," + quickDateArr[1]) {
            this.datePicker.defaultShow = quickDateArr[2];
            defaultShow = quickDateArr[2];
            break;
          }
        }
        this.datePicker.startDate = dateRange[0];
        this.datePicker.endDate = dateRange[1];

        this.changeDateHandler(this.datePicker.startDate, this.datePicker.endDate, defaultShow);

      },

      disabledDate: function (date) {
        let flag = false;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let dateStr = year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day);

        if (this.datePicker.minDate && (new Date(dateStr)).valueOf() < (new Date(this.datePicker.minDate)).valueOf()) {
          flag = true;
        }

        if (this.datePicker.maxDate && (new Date(dateStr)).valueOf() > (new Date(this.datePicker.maxDate)).valueOf()) {
          flag = true;
        }

        return flag;
      },
    }
  };
</script>
