import tools from './tools'

export default{
  methods:{
    selectChange(id){
      this.$store.dispatch('getMasterId',id);
      tools.setGlobal("masterId",id);
      this.setFormParam({name:'masterIds',value:id});
      this.getTableData();
    },
    setFormParam:function(param){
      this.formData[param.name]=param.value;
    },
    //保存检索条件，并请求对应的列表数据
    setDefineDate:function(){
      tools.dateSet.resource.defaultShow = this.datePicker.defaultShow;
      tools.dateSet.resource.startDate = this.datePicker.startDate;
      tools.dateSet.resource.endDate = this.datePicker.endDate;
    },
    //选择日期后触发
    dateChange:function(start,end,defaultShow,isNotGetData){
      this.datePicker.startDate = start;
      this.datePicker.endDate = end;
      this.datePicker.defaultShow = defaultShow;
      this.setFormParam({
        name:"startTime",
        value:start
      });
      this.setFormParam({
        name:"endTime",
        value:end
      });
      this.setDefineDate();
      if(!isNotGetData){
        this.getTableData();
      }
    },
  
    setSelection(selection, row) {
      let flag = selection.some(item => {return item.id === row.id;});
      let bool = this.checkedDataArr.some(item => {return item.id === row.id});
      if ( flag && !bool) {
        this.checkedDataArr.push({...row,_checked:true})
        this.table.data = this.table.data.map(item => {
          if (item.id === row.id) {
            item._checked = true
          }
          return item;
        });
      } else {
        this.checkedDataArr.forEach( (item,i) => {
          if (item.id === row.id) this.checkedDataArr.splice(i,1);
          this.table.data = this.table.data.map(item => {
            if (item.id === row.id) {
              item._checked = false;
            }
            return item;
          });
        })
      }
    },
    setSelectAll(selection) {
      if (selection.length) {
        this.table.data = this.table.data.map(item => {return {...item,_checked:true}});
        if (!this.isCheckedAll){
          let idArr = this.checkedDataArr.map(item => item.id);
          this.table.data.forEach(item => {
            if (idArr.indexOf(item.id) === -1) {
              this.checkedDataArr.push(item);
            }
          })
        }
      } else {
        this.table.data = this.table.data.map(item => {return {...item,_checked:false}});
        this.isCheckedAll = false;
        this.table.data.forEach(item => {
          this.checkedDataArr.forEach((temp,i) => {
            if (item.id === temp.id) {
              temp._checked = false;
              this.checkedDataArr.splice(i,1)
            }
          })
        });
      }
    },
    setCheckedData(data){
      if (this.isCheckedAll) {
        this.table.data = this.table.data.map(item => {return {...item,_checked:true}});
      }
      else {
        let idArr = this.checkedDataArr.map(item => item.id);
        this.table.data = this.table.data.map((item) => {
          if ( idArr.indexOf(item.id) !== -1) {
            item._checked = true;
          } else {
            item._checked = false;
          }
          return item;
        })
      }
    },
    allDataChecked(bool){
      if (bool) {
        this.table.data = this.table.data.map(item => {return {...item,_checked:true}});
        let idArr = this.checkedDataArr.map(item => item.id);
        this.idList.forEach((item) => {
          if (idArr.indexOf(Number(item)) === -1) {
            this.checkedDataArr.push({id:Number(item),_checked:true})
          }
        });
      } else {
        this.table.data = this.table.data.map(item => {return {...item,_checked:false}});
        this.isCheckedAll = false;
        this.checkedDataArr = [];
      }
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
  }
};
