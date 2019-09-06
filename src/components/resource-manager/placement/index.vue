<template>
  <div class='place_index'>
    <Row type="flex" justify="space-between" align="middle" class-name="lay_row">
      <Col><MasterFilter :select-change="selectChange"></MasterFilter></Col>
      <Col><DatePickerCustom :change-date-handler="dateChange" :datePicker="datePicker"></DatePickerCustom></Col>
    </Row>
    <Row type="flex" class-name="lay_row">
      <Col>
        <span class="lay_title">广告位列表</span>
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
        <SelectBar :listData="channelData"
                   placeholder="请选择频道"
                   search-placeholder="请输入名称关键字或ID"
                   :showDrop="showChannelDrop"
                   dropIndex="2"
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
                   dropIndex="3"
                   @dropDown="setShowDrop"
                   @setSelectData="setSelectData"
                   :noCheckbox="true"
        ></SelectBar>
      </Col>
    </Row>
    <Row class-name="lay_row" type="flex" :gutter="10">
      <Col class="width_8">
        <Input v-model="formData.qStr"
               :search="true"
               suffix="ios-search"
               placeholder="请输入广告位名称关键字或ID"
               @on-search="toSearchData"
        ></Input>
      </Col>
      <Col class="width_4">
        <SelectBar :listData="plateForm"
                   placeholder="请选择类型"
                   search-placeholder="请输入名称关键字或ID"
                   :showDrop="showTypeDrop"
                   dropIndex="4"
                   @dropDown="setShowDrop"
                   @setSelectData="setSelectData"
                   :noCheckbox="true"
                   :noSearchInput="true"
                   style="z-index: 99;"
        ></SelectBar>
      </Col>
      <Col class="width_4">
        <SelectBar :listData="plateForm"
                   placeholder="请选择标签"
                   search-placeholder="请输入名称关键字或ID"
                   :showDrop="showTagDrop"
                   dropIndex="5"
                   @dropDown="setShowDrop"
                   @setSelectData="setSelectData"
                   :noCheckbox="true"
                   :noSearchInput="true"
                   style="z-index: 99;"
        ></SelectBar>
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
                  :columns-data="table.columnsAll"
                  :loading-data="table.isLoading"
                  :set-selection="setSelection"
                  :set-select-all="setSelectAll"
                  :total="table.total"
                  :page-size="table.pageSize"
                  :page-size-opts="table.pageSizeOpts"
                  :current-page="table.pageIndex"
                  :page-change="pageChange"
                  :page-size-change="pageSizeChange"
                  :options="table.options"
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
  import SelectBar from './../../common/selectbar'
  import ListData from './../../common/table/list-data'
  export default {
    name: "place_index",
    mixins:[mixins],
    components:{ MasterFilter, DatePickerCustom, SelectBar, ListData },
    data() {
      return {
        title:'广告位',
        //datepicker初始化配置
        datePicker: {
          defaultShow: 3,
          maxDate: "",
          minDate: "",
          startDate: "",
          endDate: "",
        },
        mediaData:[],
        channelData:[],
        plateForm:[
          {name:'PC',id:0},
          {name:'WAP',id:1},
          {name:'APP',id:2},
          {name:'小程序',id:3},
        ],
        showMediaDrop:false,
        showChannelDrop:false,
        showFlateDrop:false,
        showTypeDrop: false,
        showTagDrop:false,
        isCheckedAll:false,
        selectNum:0,
        total:0,
        //表单提交的数据
        formData:{
          masterIds:[],
          mediaIds:[],
          channelIds:[],
          platform:"",
          type:"",
          tag:[],
          qStr:"",
          startTime:"",
          endTime:"",
          pageIndex:1,
          pageSize:40,
          orderBy:"",
          orderType:"",
        },
        //表格初始化的列和数据
        table:{
          page:1,
          total:100,
          pageSize:40,
          pageSizeOpts:[10,20,40,50,100],
          allIdList:[],
          checkedList:{},
          columnsAll:[
            {id:"1",title:"刊例ID",key:"kid",isShow:false,isSort:false,type:"基础列"},
            {id:"2",title:"精准ID",key:"id",isShow:true,isSort:false,type:"基础列"},
            {id:"3",title:"广告位",key:"name",isShow:true,isSort:false,type:"基础列"},
            {id:"4",title:"频道",key:"channelName",isShow:true,isSort:false,type:"基础列"},
            {id:"5",title:"媒体",key:"mediaName",isShow:true,isSort:false,type:"基础列"},
            {id:"6",title:"平台",key:"platform",isShow:true,isSort:false,type:"基础列"},
            {id:"7",title:"广告位标签",key:"tagName",isShow:true,isSort:false,type:"基础列"},
            {id:"8",title:"广告位类型",key:"type",isShow:true,isSort:false,type:"基础列"},
            {id:"9",title:"尺寸",key:"pSize",isShow:false,isSort:false,type:"基础列"},
            {id:"10",title:"计费方式",key:"feeType",isShow:false,isSort:false,type:"基础列"},
            {id:"11",title:"有效时间",key:"effectiveTime",isShow:false,isSort:false,type:"基础列"},
            {id:"12",title:"广告块",key:"blockName",isShow:true,isSort:false,type:"基础列"},
            {id:"13",title:"创建时间",key:"createTime",isShow:false,isSort:false,type:"基础列"},
            {id:"14",title:"创建人",key:"creator",isShow:false,isSort:false,type:"基础列"},
            // {id:"15",name:"备注",key:"remark",isShow:false,isSort:false,type:"基础列"},


            {id:"16",title:"曝光量",key:"displayAmount",isShow:true,isSort:true,type:"指标列"},
            {id:"17",title:"点击量",key:"clickAmount",isShow:true,isSort:true,type:"指标列"},
            {id:"18",title:"点击率",key:"clickRate",isShow:false,isSort:true,type:"指标列"},
            {id:"19",title:"广告请求量",key:"requestAmount",isShow:false,isSort:true,type:"指标列"},
            {id:"20",title:"可见曝光量",key:"visibleDisplay",isShow:false,isSort:true,type:"指标列"},
            {id:"21",title:"独立曝光量",key:"singleDisplay",isShow:false,isSort:true,type:"指标列"},
            {id:"22",title:"独立点击量",key:"singleClick",isShow:false,isSort:true,type:"指标列"},
            {id:"23",title:"独立点击率",key:"singleRate",isShow:false,isSort:true,type:"指标列"},
            {id:"24",title:"填充率",key:"fillRate",isShow:false,isSort:true,type:"指标列"},

          ],
          data:[],
          options:{
            specifications:{
              name:"规格",
              icon:"pencil",
              callback:this.positionSpecifications,
            },
            price:{
              name:"价格",
              icon:"pencil",
              callback:this.positionPrice,
            },
            edit:{
              name:"编辑",
              icon:"pencil",
              callback:this.positionEdit,
            },
            delete:{
              name:"删除",
              icon:"delete",
              callback:this.deletePosition,
            },
          },
        }
      }
    },
    mounted(){
      document.title = this.title;
    },
    methods:{
      toSearchData() {
        this.setFormParam({name: "pageIndex", value: 1});
        this.getTableData();
      },
      selectChange(id){
        this.$store.commit('setMasterId',Number(id));
        tools.setGlobal("masterId",Number(id))
      },
      setSelectData(value){
        if (value[1] === '1'){
          this.setFormParam({name:'mediaIds',value:value[0].map(item => item.id).join()})
        } else  if (value[1] === '2'){
          this.setFormParam({name:'channelIds',value:value[0].map(item => item.id).join()})
        } else  if (value[1] === '3'){
          this.setFormParam({name:'platform',value:value[0].map(item => item.id).join()})
        }
        this.getTableData();
      },
      setShowDrop(index){
        if (index === '1'){
          this.showMediaDrop = true;
          this.showFlateDrop = false;
          this.showChannelDrop = false;
          this.showTypeDrop = false;
          this.showTagDrop = false;
        } else if(index === '2'){
          this.showMediaDrop = false;
          this.showFlateDrop = false;
          this.showChannelDrop = true;
          this.showTypeDrop = false;
          this.showTagDrop = false;
        } else  if(index === '3'){
          this.showMediaDrop = false;
          this.showFlateDrop = true;
          this.showChannelDrop = false;
          this.showTypeDrop = false;
          this.showTagDrop = false;
        } else if (index === '4'){
          this.showMediaDrop = false;
          this.showFlateDrop = false;
          this.showChannelDrop = false;
          this.showTypeDrop = true;
          this.showTagDrop = false;
        } else if (index === '5'){
          this.showMediaDrop = false;
          this.showFlateDrop = false;
          this.showChannelDrop = false;
          this.showTypeDrop = false;
          this.showTagDrop = true;
        }else {
          this.showMediaDrop = false;
          this.showFlateDrop = false;
          this.showChannelDrop = false;
          this.showTypeDrop = false;
          this.showTagDrop = false;
        }
      },
      //请求媒体列表
      getMediaList(){
        let vm = this;
        fetch("/ssp-manager/v1/media_filter/list", {
          method: 'post',
          body: JSON.stringify({masterIds:tools.getGlobal('masterId') ? Number(tools.getGlobal('masterId')) : vm.$store.state.masterId})
        }).then(res => {
          vm.mediaData = res.result.lists;
        })
      },
      positionSpecifications(id,row){
        let mediaName = row.mediaName;
        let channelName = row.channelName;
        let positionName = row.name;
        tools.newWinRoute("/res_manage/position_specifications/specifications/"+id+"?mediaName="+mediaName+"&channelName="+channelName+"&positionName="+positionName);
      },
      positionPrice(id,row){
        // this.$router.push("/res_manage/position_price/price/"+id);
        // let platform = row.platform == "小程序" ? 3 : 0;
        tools.newWinRoute("/res_manage/position_price/price/"+id);
      },

      deletePosition(id,row){
        let vm = this;
        tools.ajax({
          url:"/ssp-manager/v1/media/checkDelSource?id="+id+"&type=3",
          type:"get",
        },function(message,data,errorCode){
          if (errorCode == 0) {
            tools.modalMessage("你确定删除广告位“"+row.name+"”?",null,function(){
              tools.ajax({
                url:"/ssp-manager/v1/ad/delete?id="+id,
                type:"get",
              },function(message,data){
                vm.getTableData();
              });
            });
          }
        });

      },
      positionEdit(id,row){
        let _platform = ''
        switch(row.platform) {
          case "APP":
            _platform = '1';
            break;
          case "小程序":
            _platform = '3';
            break;
          default:
            _platform = '0';
        }
        // this.$router.push("/res_manage/position_edit/"+id+"/"+(row.platform=="APP"?1:0)+"/"+this.formData.masterIds);
        tools.newWinRoute("/res_manage/position_edit/"+id+"/"+_platform+"/"+this.formData.masterIds);
      },
    },

  }
</script>

<style scoped>

</style>
