<template>
  <div class='media_index'>
    <Row type="flex" justify="space-between" align="middle" class-name="lay_row">
      <Col>
        <MasterFilter :select-change="selectChange"></MasterFilter>
      </Col>
      <Col>
        <DatePickerCustom :change-date-handler="dateChange" :datePicker="datePicker"></DatePickerCustom>
      </Col>
    </Row>
    <Row type="flex" class-name="lay_row">
      <Col>
        <span class="lay_title">媒体列表</span>
        <Button type="primary" icon="md-add" @click="newCreatTemp">新建</Button>
      </Col>
    </Row>
    <Row class-name="lay_row">
      <Col :span="6">
        <Input v-model="formData.qStr"
               :search="true"
               suffix="ios-search"
               placeholder="请输入媒体名称关键字或ID"
               @on-search="toSearchData"
        ></Input>
      </Col>
    </Row>
    <Row class-name="lay_row">
      <Col>
        <ListData :table-data="table.data"
                  :columns-data="columns"
                  :loading-data="table.isLoading"
                  :set-selection="setSelection"
                  :set-select-all="setSelectAll"
                  :total="table.total"
                  :page-size="table.pageSize"
                  :page-size-opts="table.pageSizeOpts"
                  :current-page="table.pageIndex"
                  :page-change="pageChange"
                  :page-size-change="pageSizeChange"
                  :options="options"
        />
      </Col>
    </Row>
  </div>
</template>

<script>
  import tools from '../../../utils/tools';
  import fetch from '../../../utils/fetch'
  import mixins from '../../../utils/mixins';
  import MasterFilter from './../../common/master-filter'
  import DatePickerCustom from './../../common/datepicker'
  import ListData from './../../common/table/list-data'

  export default {
    name: "media_index",
    mixins: [mixins],
    components: {MasterFilter, DatePickerCustom, ListData},
    data() {
      return {
        //表单提交的数据
        formData: {
          qStr: "",
          masterIds: '',
          startTime: "",
          endTime: "",
          pageIndex: 1,
          pageSize: 10,
          orderBy: "",
          orderType: "",
        },
        //datepicker初始化配置
        datePicker: {
          defaultShow: 3,
          maxDate: "",
          minDate: "",
          startDate: "",
          endDate: "",
        },
        table: {
          isLoading: false,
          data: [],
          total: 0,
          pageIndex: 1,
          pageSize: 10,
          pageSizeOpts: [10, 20, 40, 70, 100],
        },
        columns: [
          {
            title: '编号',
            isShow: true,
            width: 80,
            key: 'id',
            align: 'center',
          },
          {
            title: '媒体',
            isShow: true,
            key: 'name',
            align: 'left',
          },
          {
            title: '媒体简称',
            isShow: true,
            key: 'shortName',
            align: 'left',
          },
          {
            title: '媒体类型',
            isShow: true,
            // width:80,
            key: 'mediaType',
            align: 'center',
          },
          {
            title: '投放平台',
            isShow: true,
            // width:80,
            key: 'platform',
            align: 'center',
          },
        ],
        options: {
          edit: {
            name: "编辑",
            callback: this.mediaEdit,
          },
          delete: {
            name: "删除",
            callback: this.mediaDelete,
          },
        },
        checkedDataArr: [],
      }
    },
    watch: {
      'formData.pageIndex'(value) {
        this.table.pageIndex = value;
      },
      'table.data'(value) {
        this.setCheckedData(value)
      }
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      //请求表格数据
      getTableData() {
        let vm = this;
        fetch("/ssp-manager/v1/media/list", {
          method: 'post',
          body: JSON.stringify(vm.formData)
        }).then(res => {
          vm.table.total = res.result.totalPages;
          vm.table.data = res.result.lists;
        })
      },
      toSearchData() {
        this.setFormParam({name: "pageIndex", value: 1});
        this.getTableData();
      },
      newCreatTemp() {
        tools.newWinRoute("/index/media/add");
      },
      setSelection(selection, row) {
        if (JSON.stringify(selection).indexOf(JSON.stringify(row)) === -1) {
          this.checkedDataArr.forEach((item, i) => {
            if (item.id === row.id) this.checkedDataArr.splice(i, 1);
          })
        } else {
          this.checkedDataArr.push(row);
        }
      },
      setSelectAll(selection) {
        let vm = this;
        if (selection.length > 0) {
          let idArr = vm.checkedDataArr.map(item => item.id);
          vm.table.data.forEach((item) => {
            if (idArr.indexOf(item.id) === -1) vm.checkedDataArr.push(item)
          })
        } else {
          let idArr = vm.table.data.map(item => item.id);
          let count = vm.checkedDataArr.length;
          for (let a = count-1; a >= 0; a --){
            if (idArr.indexOf(vm.checkedDataArr[a].id) !== -1) {
              vm.checkedDataArr.splice(a,1);
            }
          }
        }
      },
      setCheckedData() {
        let vm = this;
        let idArr = vm.checkedDataArr.map(item => item.id);
        vm.table.data.map(item => { idArr.indexOf(item.id) === -1 ?  item._checked = false : item._checked = true;})
      },
      pageChange(pageIndex) {
        this.setFormParam({name: "pageIndex", value: pageIndex});
        this.getTableData();
      },
      pageSizeChange(pageSize) {
        this.setFormParam({name: 'pageSize', value: pageSize});
        this.setFormParam({name: "pageIndex", value: 1});
        this.getTableData();
      },
      mediaEdit(id) {
        tools.newWinRoute("/index/media/edit/" + id);
      },
      mediaDelete(id) {
        let vm = this;
        fetch(`/ssp-manager/v1/media/checkDelSource?id=${id}&type=1`).then(res => {
          console.log(res)
        }, err => {
          this.$Message.warning(err.errorMsg, 3000)
        })
      }
    },

  }
</script>

<style scoped>

</style>
