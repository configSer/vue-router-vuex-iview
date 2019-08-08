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
  </div>
</template>

<script>
  import tools from '../../../utils/tools';
  import fetch from '../../../utils/fetch'
  import mixins from '../../../utils/mixins';
  import MasterFilter from './../../common/master-filter'
  import DatePickerCustom from './../../common/datepicker'
  import SelectBar from './../../common/selectbar'
  export default {
    name: "place_index",
    mixins:[mixins],
    components:{ MasterFilter, DatePickerCustom, SelectBar },
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
            {id:"1",name:"刊例ID",key:"kid",isShow:false,isSort:false,type:"基础列"},
            {id:"2",name:"精准ID",key:"id",isShow:true,isSort:false,type:"基础列"},
            {id:"3",name:"广告位",key:"name",isShow:true,isSort:false,type:"基础列"},
            {id:"4",name:"频道",key:"channelName",isShow:true,isSort:false,type:"基础列"},
            {id:"5",name:"媒体",key:"mediaName",isShow:true,isSort:false,type:"基础列"},
            {id:"6",name:"平台",key:"platform",isShow:true,isSort:false,type:"基础列"},
            {id:"7",name:"广告位标签",key:"tagName",isShow:true,isSort:false,type:"基础列"},
            {id:"8",name:"广告位类型",key:"type",isShow:true,isSort:false,type:"基础列"},
            {id:"9",name:"尺寸",key:"pSize",isShow:false,isSort:false,type:"基础列"},
            {id:"10",name:"计费方式",key:"feeType",isShow:false,isSort:false,type:"基础列"},
            {id:"11",name:"有效时间",key:"effectiveTime",isShow:false,isSort:false,type:"基础列"},
            {id:"12",name:"广告块",key:"blockName",isShow:true,isSort:false,type:"基础列"},
            {id:"13",name:"创建时间",key:"createTime",isShow:false,isSort:false,type:"基础列"},
            {id:"14",name:"创建人",key:"creator",isShow:false,isSort:false,type:"基础列"},
            // {id:"15",name:"备注",key:"remark",isShow:false,isSort:false,type:"基础列"},


            {id:"16",name:"曝光量",key:"displayAmount",isShow:true,isSort:true,type:"指标列"},
            {id:"17",name:"点击量",key:"clickAmount",isShow:true,isSort:true,type:"指标列"},
            {id:"18",name:"点击率",key:"clickRate",isShow:false,isSort:true,type:"指标列"},
            {id:"19",name:"广告请求量",key:"requestAmount",isShow:false,isSort:true,type:"指标列"},
            {id:"20",name:"可见曝光量",key:"visibleDisplay",isShow:false,isSort:true,type:"指标列"},
            {id:"21",name:"独立曝光量",key:"singleDisplay",isShow:false,isSort:true,type:"指标列"},
            {id:"22",name:"独立点击量",key:"singleClick",isShow:false,isSort:true,type:"指标列"},
            {id:"23",name:"独立点击率",key:"singleRate",isShow:false,isSort:true,type:"指标列"},
            {id:"24",name:"填充率",key:"fillRate",isShow:false,isSort:true,type:"指标列"},

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
        } else if(index === '2'){
          this.showMediaDrop = false;
          this.showFlateDrop = false;
          this.showChannelDrop = true;
        } else  if(index === '3'){
          this.showMediaDrop = false;
          this.showFlateDrop = true;
          this.showChannelDrop = false;
        } else {
          this.showMediaDrop = false;
          this.showFlateDrop = false;
          this.showChannelDrop = false;
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

    },

  }
</script>

<style scoped>

</style>
