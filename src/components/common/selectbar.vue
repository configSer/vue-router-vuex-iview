<template>
  <Select :placeholder="placeholder" v-model="showSelectNum" class="selectbar" @on-open-change="openChange">
    <Row type="flex" justify="center" align="middle">
      <Col :span="22">
        <Row>
          <Col><Input :placeholder="searchPlaceholder" v-model="searchInput" /></Col>
        </Row>
        <Row type="flex" justify="space-between" align="middle" class="opt_row">
          <Col><span style="cursor: pointer;color:#0c7cd5" @click="checkedAll">全选</span></Col>
          <Col><span >已选{{checkedData.length}}项</span></Col>
        </Row>
        <Row class="list_box">
          <Col :span="24">
            <label v-for="item in selectData" :key="item.id">
              <Row type="flex" align="middle" justify="space-between" class="opt_row">
                <Col :span="20"><div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.name}}</div></Col>
                <Col :span="4"><div><Checkbox v-model="item.checked" @on-change="changeCheckedList"></Checkbox></div></Col>
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
  </Select>
</template>

<script>
  export default {
    name: "selectbar",
    props: {
      placeholder: String,
      searchPlaceholder:String,
      listData: Array,
    },
    data() {
      return {
        selectData: [],
        checkedData:[],
        showSelectNum:'',
        searchInput:''
      }
    },
    watch: {
      listData(value){
        this.selectData = value.map(item => {return {...item,checked:false}});
      },
      searchInput(){
        this.searchChange();
      }
    },
    mounted() {
      this.selectData = this.listData.map(item => {return {...item,checked:false}});
    },
    methods: {
      changeCheckedList(){
        this.checkedData = [];
        this.selectData.forEach(item => {
          if (item.checked){
            this.checkedData.push(item);
          }
        });
        this.showSelectNum = `已选择${this.checkedData.length}项`
      },
      checkedAll(){
        this.checkedData = this.selectData = this.selectData.map(item => {return {...item, checked:true}});
        this.showSelectNum = `已选择${this.checkedData.length}项`
      },
      clearChecked(){
        this.selectData = this.selectData.map(item => {return {...item,checked:false}});
        this.checkedData = [];
        this.showSelectNum = ``
      },
      sureChecked(){

      },
      openChange(value){

      },
      searchChange(){
        let idArr = this.checkedData.map(item => item.id);
        let arr = this.listData;
        let val = this.searchInput;
        let searchArr = [];
        this.checkedData = [];
        arr.forEach(item =>{
          if (idArr.indexOf(item.id) != -1) {
            item.checked = true;
            this.checkedData.push(item);
          }
          if (item.name.indexOf(val) != -1) {
            searchArr.push(item);
          }
        });
        this.selectData = searchArr;
        this.changeCheckedList();
      }
    }
  }
</script>

