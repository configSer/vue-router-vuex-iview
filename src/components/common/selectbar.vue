<template>
  <div class="selectbar" v-clickoutside="hideDropDown">
    <Icon type="ios-arrow-down"  :class="isMedia ? 'icon_down transform_180' : 'icon_down' "/>
    <div class="select_box" @click="showHidden">
      <span v-if="checkedData.length === 0" class="placeholder">{{placeholder}}</span>
      <span v-else>共选择了{{checkedData.length}}项</span>
    </div>
    <Row type="flex" justify="center" align="middle" class="drop_down" v-if="isMedia && showDrop">
      <Col :span="22">
        <Row>
          <Col><Input :placeholder="searchPlaceholder" v-model="searchInput" /></Col>
        </Row>
        <Row type="flex" justify="space-between" align="middle" class="opt_row">
          <Col><span style="cursor: pointer;color:#0c7cd5" @click="checkedAll">全选</span></Col>
          <Col><span >已选{{checkedData.length}}项</span></Col>
        </Row>
        <Row type="flex" align="middle" justify="center" style="padding:1rem 0;" v-if="selectData.length === 0">
          <Col>暂无数据</Col>
        </Row>
        <Row class="list_box" v-else>
          <Col :span="24">
            <label v-for="item in selectData" :key="item.id">
              <Row type="flex" align="middle" justify="space-between" class="opt_row">
                <Col :span="20"><div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.name}}</div></Col>
                <Col :span="4"><div><Checkbox v-model="item.checked" @on-change="changeCheckedList(item)"></Checkbox></div></Col>
              </Row>
            </label>
          </Col>
        </Row>
        <Row type="flex" justify="space-between" align="middle" class="foot_box">
          <Col><span @click="clearChecked">清除</span></Col>
          <Col><span @click="sureChecked">确定</span></Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  import clickoutside from './../../../static/js/clickoutside.js'
  export default {
    name: "selectbar",
    props: {
      placeholder: String,
      searchPlaceholder:String,
      listData: Array,
      showDrop:Boolean,
      dropIndex:String,
    },
    data() {
      return {
        selectData: [],
        checkedData:[],
        selectBar:'',
        searchInput:'',
        isMedia:false,
      }
    },
    directives:{clickoutside},
    watch: {
      listData(value){
        this.selectData = value.map(item => {return {...item,checked:false}});
      },
      searchInput(){
        this.searchChange();
      },
      showDrop(value){
        if (!value){
          this.isMedia = false;
        }
      }
    },
    mounted() {
      this.selectData = this.listData.map(item => {return {...item,checked:false}});
    },
    methods: {
      hideDropDown(){
        this.isMedia = false;
      },
      showHidden(e){
        if (e && e.stopPropagation) {
          // this code is for Mozilla and Opera
          e.stopPropagation();
        } else if (window.event) {
          // this code is for IE
          window.event.cancelBubble = true;
        }
        this.isMedia = !this.isMedia;
        this.$emit('dropDown',this.dropIndex)
      },
      changeCheckedList(item){
        if (item.checked){
          this.checkedData.push(item)
        } else {
          let idArr = this.checkedData.map(item => item.id);
          if (idArr.indexOf(item.id) !== -1) {
            this.checkedData.splice(idArr.indexOf(item.id),1);
          }
        }
        this.$emit('setSelectData',[this.checkedData,this.dropIndex])
      },
      checkedAll(){
        this.selectData = this.selectData.map(item => {return {...item, checked:true}});
        let idArr = this.checkedData.map(item => item.id);
        this.selectData.forEach(item => {
          if (idArr.indexOf(item.id) === -1){
            this.checkedData.push(item);
          }
        })
        this.$emit('setSelectData',[this.checkedData,this.dropIndex])
      },
      clearChecked(){
        this.checkedData = [];
        this.selectData = this.selectData.map(item => {return {...item,checked:false}});
        this.$emit('setSelectData',[this.checkedData,this.dropIndex])
      },
      sureChecked(){
        this.isMedia = false;
      },
      searchChange(){
        this.selectData = [];
        let checkedIds = this.checkedData.map(item => item.id);
        this.listData.forEach(item => {
          if (item.name.indexOf(this.searchInput) !== -1) {
            this.selectData.push(item);
          }
        });
        this.selectData = this.selectData.map(item => {
          if (checkedIds.indexOf(item.id) !== -1) {
            item.checked = true;
          } else {
            item.checked = false;
          }
          return item;
        })
      }
    }
  }
</script>

