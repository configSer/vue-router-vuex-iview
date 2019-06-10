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
      ></Page>
    </div>
</template>

<script>
  export default {
    name: "list-data",
    props:{
      tableData:Array,
      columnsData:Array,
      loadingData:Boolean,
      setSelection:Function,
      setSelectAll:Function,
      pageChange:Function,
      pageSizeChange:Function,
      total:Number,
      currentPage:Number,
      pageSize:Number,
      pageSizeOpts:Array,
      options:{type:Object,default:function(){return {}}},
    },
    data() {
      return {
        columns:[],
      }
    },
    mounted() {
      this.columns = this.columnsData;
    },
    methods:{

    }
  }
</script>

