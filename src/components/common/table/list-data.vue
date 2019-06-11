<template>
  <div class='list-data'>
    <Table :data="tableData"
           ref="selection"
           :columns="columns"
           :stripe="true"
           :loading="loadingData"
           no-data-text="暂无数据"
           no-filtered-data-text="没有检索到您要的数据"
           @on-selection-change="setSelection"
           @on-select-all="setSelectAll"
    ></Table>
    <Page :total="total"
          :current="currentPage"
          :page-size="pageSize"
          :page-size-opts="pageSizeOpts"
          show-sizer
          show-elevator
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          class="paginational"
    ></Page>
  </div>
</template>

<script>
  export default {
    name: "list-data",
    props: {
      tableData: Array,
      columnsData: Array,
      loadingData: Boolean,
      setSelection: Function,
      setSelectAll: Function,
      pageChange: Function,
      pageSizeChange: Function,
      total: Number,
      currentPage: Number,
      pageSize: Number,
      pageSizeOpts: Array,
      options: {
        type: Object, default: function () {
          return {}
        }
      },
    },
    data() {
      return {
        columns: [],
      }
    },
    beforeMount() {
      let vm = this;
      vm.columns = vm.setEditColumn();
      vm.checkedListTemp = vm.checkedList;

      vm.$watch(function () {
        return vm.columnsAll;
      }, function (newVal, oldVal) {
        vm.columns = vm.setEditColumn();
      }, {
        deep: true
      })

    },
    methods: {
      setEditColumn() {
        let vm = this;
        let selectColumns = [];
        vm.columnsData.forEach(item => {
          if (item.isShow) {
            let columnRender = {
              title: item.title,
              key: item.key
            };
            selectColumns.push(columnRender)
          }
        });
        selectColumns.unshift({
          type: 'selection',
          key: 'checked',
          isShow: true,
          width: 60,
          align: 'center'
        },);

        if (vm.options && Object.keys(vm.options).length > 0) {
          let width = Object.keys(vm.options).length * 60;
          selectColumns.push({
            title: '操作',
            isShow: true,
            key: 'action',
            width: width,
            align: 'center',
            render(h, params) {
              let optionArr = [];
              for (let key in vm.options) {
                let name = vm.options[key].name;
                optionArr.push(h(
                  'span',
                  {
                    'style': {'margin': '0 5px', color: '#2d8cf0', cursor: 'pointer'},
                    'on':{click:() => {vm.options[key].callback(params.row.id)}}
                  },
                  name));
              }
              return optionArr;
            }
          })
        }
        return selectColumns
      }
    }
  }
</script>

<style scoped>
  .paginational {
    margin-top: 2rem;
    float: right;
  }
</style>
