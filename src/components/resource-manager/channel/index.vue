<template>
  <div class='channel_index'>
    <Row type="flex" justify="space-between" align="middle" class-name="lay_row">
      <Col><MasterFilter :select-change="selectChange"></MasterFilter></Col>
      <Col><DatePickerCustom :change-date-handler="dateChange" :datePicker="datePicker"></DatePickerCustom></Col>
    </Row>
    <Row type="flex" class-name="lay_row">
      <Col>
        <span class="lay_title">频道列表</span>
      </Col>
    </Row>
    <Row type="flex" class-name="lay_row" :gutter="10">
      <Col  class="width_4">
        <SelectBar :listData="mediaData"
                   placeholder="请选择媒体"
                   search-placeholder="请输入名称关键字或ID"
                   :showDrop="showMediaDrop"
                   dropIndex="1"
                   @dropDown="setShowDrop"
                   @setSelectData="setSelectData"
                   :noSearchInput="true"
        ></SelectBar>
      </Col>
      <Col class="width_4">
        <SelectBar :listData="plateForm"
                   placeholder="请选择投放平台"
                   search-placeholder="请输入名称关键字或ID"
                   :showDrop="showFlateDrop"
                   dropIndex="2"
                   @dropDown="setShowDrop"
                   @setSelectData="setSelectData"
                   :noCheckBox="true"
        ></SelectBar>
      </Col>
      <Col class="width_4">
        <SelectBar :listData="plateTag"
                   placeholder="请选择投放标签"
                   search-placeholder="请输入名称关键字或ID"
                   :showDrop="showTagDrop"
                   dropIndex="3"
                   @dropDown="setShowDrop"
                   @setSelectData="setSelectData"
                   :noSearchInput="true"
        ></SelectBar>
      </Col>
    </Row>
    <Row class-name="lay_row">
      <Col class="width_7">
        <Input v-model="formData.channel"
               :search="true"
               suffix="ios-search"
               placeholder="请输入频道名称关键字或ID"
               @on-search="toSearchData"
        ></Input>
      </Col>
    </Row>
    <Row class-name="lay_row" type="flex" justify="space-between" align="middle"  style="margin-top:5rem;">
      <Col>
        <Checkbox v-model="isCheckedAll" class="total_checkbox" @on-change="allDataChecked" :disabled="table.data.length === 0">全选</Checkbox>
        <span class="data_total">(共{{total}}项)</span>
        <span>已选{{selectNum}}项</span>
        <span class="clear_data" @click="allDataChecked(false)">清空选择</span>
      </Col>
      <Col>
        <div class="export_btn">
          <div class="sub_btn sub_btn_4">
            <div class="sub_export_btn" data-flag="0">按日</div>
            <div class="sub_export_btn" data-flag="1">按时</div>
            <div class="sub_export_btn" data-flag="2">按平台</div>
            <div class="sub_export_btn" data-flag="3">当前视图</div>
          </div>
          <Button type="primary" class="btn_name">导出报告</Button>
        </div>
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
                  :isSelectAll="isCheckedAll"
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
  import SelectBar from './../../common/selectbar'

  export default {
    name: "channel_index",
    mixins: [mixins],
    components: {MasterFilter, DatePickerCustom, ListData, SelectBar},
    data() {
      return {
        title:'频道',
        showMediaDrop:false,
        showFlateDrop:false,
        showTagDrop:false,
        total:0,
        selectNum:0,
        idList:[],
        isCheckedAll:false,
        //表单提交的数据
        formData: {
          channel: "",
          channelType: "",
          endTime: "",
          masterIds: "",
          mediaIds: "",
          pageIndex: 1,
          pageSize: 10,
          platefrom: "",
          startTime: ""
        },
        //datepicker初始化配置
        datePicker: {
          defaultShow: 3,
          maxDate: "",
          minDate: "",
          startDate: "",
          endDate: "",
        },
        plateForm:[
          {name:'全部',id:''},
          {name:'PC',id:0},
          {name:'WAP',id:1},
          {name:'APP',id:2},
          {name:'小程序',id:3},
        ],
        plateTag:[],
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
            title: '频道ID',
            isShow: true,
            width: 80,
            key: 'id',
            align: 'center',
          },
          {
            title: '频道',
            isShow: true,
            key: 'name',
            align: 'left',
          },
          {
            title: '媒体',
            isShow: true,
            key: 'mediaName',
            align: 'left',
          },
          {
            title: '投放平台',
            isShow: true,
            // width:80,
            key: 'platform',
            align: 'center',
          },
          {
            title: '频道标签',
            isShow: true,
            // width:80,
            key: 'channelTage',
            align: 'center',
          },
          {
            title: '广告位数',
            isShow: true,
            // width:80,
            key: 'placeNum',
            align: 'center',
          },
          {
            title: '页面URL',
            isShow: true,
            // width:80,
            key: 'pageUrl',
            align: 'center',
          }
        ],
        options: {
          edit: {
            name: "编辑",
            callback: this.channelEdit,
          },
          delete: {
            name: "删除",
            callback: this.channelDelete,
          },
        },
        checkedDataArr: [],
        mediaData:[],
      }
    },
    watch: {
      'formData.pageIndex'(value) {
        this.table.pageIndex = value;
      },
      checkedDataArr(value){
        this.selectNum = value.length;
        if (this.idList.length === value.length){
          this.isCheckedAll = true;
        } else {
          this.isCheckedAll = false;
        }
      },
      '$store.state.masterId'(id){
        this.setFormParam({name:'masterId',value:id});
        this.getMediaList();
        this.getTagList();
        this.getTableData();
      }
    },
    mounted() {
      document.title = this.title;
      if(this.$store.state.isRouteChange){
        this.setFormParam({name:'masterIds',value:tools.getGlobal('masterId') ? Number(tools.getGlobal('masterId')) : this.$store.state.masterId});
        this.getMediaList();
        this.getTagList();
        this.getTableData();
      }
    },
    methods: {
      setSelectData(value){
        if (value[1] === '1'){
          this.setFormParam({name:'mediaIds',value:value[0].map(item => item.id).join()})
        } else  if (value[1] === '2'){
          this.setFormParam({name:'platefrom',value:value[0].map(item => item.id).join()})
        } else  if (value[1] === '3'){
          this.setFormParam({name:'channelType',value:value[0].map(item => item.id).join()})
        }
        this.getTableData();
      },
      setShowDrop(index){
        if (index === '1'){
          this.showMediaDrop = true;
          this.showFlateDrop = false;
          this.showTagDrop = false;
        } else if(index === '2'){
          this.showMediaDrop = false;
          this.showFlateDrop = true;
          this.showTagDrop = false;
        } else  if(index === '3'){
          this.showMediaDrop = false;
          this.showFlateDrop = false;
          this.showTagDrop = true;
        } else {
          this.showMediaDrop = false;
          this.showFlateDrop = false;
          this.showTagDrop = false;
        }
      },

      //请求媒体列表
      getMediaList(){
        let vm = this;
        let masterId = tools.getGlobal('masterId') ? Number(tools.getGlobal('masterId')) : vm.$store.state.masterId;
        tools.getMediaList(masterId,function (list) {
          vm.mediaData = list;
        })
      },
      //请求投放标签
      getTagList(){
        let vm = this;
        let masterId = tools.getGlobal('masterId') ? Number(tools.getGlobal('masterId')) : vm.$store.state.masterId;
        tools.getTagList(masterId,function (list) {vm.plateTag = list})
      },
      //请求表格数据
      getTableData() {
        let vm = this;
        fetch("/ssp-manager/v1/channel/lists", {
          method: 'post',
          body: JSON.stringify(vm.formData)
        }).then(res => {
          vm.table.total = res.result.totalPages;
          vm.table.data = res.result.lists;
          vm.idList = res.result.idlist.split(',');
          vm.total = res.result.totalPages;
          vm.setCheckedData(vm.table.data);
        })
      },
      toSearchData() {
        this.setFormParam({name: "pageIndex", value: 1});
        this.getTableData();
      },
      newCreatTemp() {
        tools.newWinRoute("/index/channel/add");
      },
      channelEdit(id) {
        tools.newWinRoute("/index/channel/edit/" + id);
      },
      channelDelete(id) {
        let vm = this;
        fetch(`/ssp-manager/v1/media/checkDelSource?id=${id}&type=2`).then(res => {
          vm.$Message.info({content:'请调用删除接口',duration:3})
        }, err => {
          vm.$Message.warning({content:err.errorMsg,duration:3})
        })
      },
    }
  }
</script>

<style scoped>

</style>
