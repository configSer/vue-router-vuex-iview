<template>
	<div>
		<TableC ref="table" @on-sort-change="sortChangeHandler" class="table" :stripe="true" :columns="columns" :data="data" :no-data-text="noData()"></TableC>
		<PageC v-if="!noPage" ref="page" @on-change="changePage" @on-page-size-change="changePageSize" class="page" :total="total" :page-size-opts="pageSizeOpts" :page-size="pageSize" size="small" show-sizer show-elevator placement="top" :current="current"></PageC>
	</div>
</template>

<script>

    import $ from "jquery";
    import mixins from "../pageComponents/common/mixins.js";
	import {Row,Col,Button,Input,Icon,Menu,Modal,Select,Option,Table,Page,DatePicker,MenuItem,Submenu} from "ui";

    export default {
        name: 'DatePickerCustom',
        components: { TableC:Table,PageC:Page},
        props: {
        	columnsAll:Array,
            data:Array,

            primarykey:String,
            secondKey:String,

            total:Number,
            pageSizeOpts:Array,
            pageSize:Number,
            
            checkedList:Object,

            checkBoxClick:Function,
            changePage:Function,
            changePageSize:Function,
            sortChange:Function,

            current:Number,

            options:{ type:Object , default:function(){return {}} },

            noCheckBox:{ type:Boolean , default:false },

            noPage:{type:Boolean , default:false}
        },
        data (){
            return{
                columns:[],
                checkedListTemp:[],
                lock:true,
            }
        },
        mixins:[mixins.tableMixins],
        mounted(){
            let vm = this;

            $(vm.$el).on("click",".table .table_head_check",function(){
                vm.toggleCheckBoxState(this);
                let isActive = $(this).hasClass('active');
                let single_check = $(vm.$el).find(".table_single_check");
                if(isActive){
                    for(let i=0;i<single_check.length;i++){
                        vm.changeCheckBoxState(single_check.eq(i).get(),true);
                        vm.addCheckListItem(single_check.eq(i).attr("data-id"));
                    }
                }else{
                    for(let i=0;i<single_check.length;i++){
                        vm.changeCheckBoxState(single_check.eq(i).get(),false);
                        vm.removeCheckListItem(single_check.eq(i).attr("data-id"));
                    }
                }
                vm.checkBoxClick(vm.checkedListTemp);
            });

            $(vm.$el).on("click",".table_single_check",function(){
                vm.toggleCheckBoxState(this);
                if($(this).hasClass("active")){
                    vm.addCheckListItem($(this).attr("data-id"));
                }else{
                    vm.removeCheckListItem($(this).attr("data-id"));
                }
                vm.isCurrentPageCheckAll();
                vm.checkBoxClick(vm.checkedListTemp);
            });

            $(vm.$el).on("click",".table_btn",function(){
                let row = {};
                for(let i=0;i<vm.data.length;i++){
                    if(vm.data[i][vm.primarykey]==$(this).attr("data-id")){
                        if($(this).attr("data-skey")!=""&&vm.data[i][vm.secondKey]==$(this).attr("data-skey")){
                            row = vm.data[i]
                        }else{
                            if($(this).attr("data-skey")==""){
                                row = vm.data[i]
                            }
                        }
                        
                    }
                }
                vm.options[$(this).attr("data-type")].callback($(this).attr("data-id"),row);
            });
        },
        methods:{

            getSelectedColumns(){
                let vm = this;
                let selectedColumns = [];
                vm.columnsAll.forEach((item,i)=>{
                    if(item.isShow){
                        selectedColumns.push({
                            title: item.name,
                            key: item.key,
                            sortable:item.isSort,
                        });
                    }
                });

                if(!vm.noCheckBox){
                    selectedColumns.unshift({
                        width: 50,
                        align: 'center',
                        key:"checked",
                        render (h,params){
                            let row = params.row;
                            return h(
                                "i",{
                                    "class":{
                                        "ivu-icon":true,
                                        "table_single_check":true,
                                        "ivu-icon-android-checkbox":vm.checkedListTemp[row[vm.primarykey]],
                                        "ivu-icon-android-checkbox-outline-blank":!vm.checkedListTemp[row[vm.primarykey]],
                                        "active":vm.checkedListTemp[row[vm.primarykey]],
                                    },
                                    "attrs":{
                                        "data-id":row[vm.primarykey],
                                    }
                                },
                                ""
                            )
                        },
                        renderHeader (h,params){
                            let isCheck = false;
                            
                            if(vm.data.length!=0){
                                let currentPageCheckedCount = 0;

                                for(let j=0;j<vm.data.length;j++){
                                    let id = vm.data[j][vm.primarykey];
                                    if(vm.checkedListTemp[id]){
                                        currentPageCheckedCount++;
                                    }
                                }

                                isCheck =(currentPageCheckedCount == vm.data.length);
                            }

                            vm.watchCheckedList();

                            return (
                                h(
                                    "i",{
                                        "class":{
                                            "ivu-icon":true,
                                            "table_head_check":true,
                                            "ivu-icon-android-checkbox":isCheck,
                                            "ivu-icon-android-checkbox-outline-blank":!isCheck,
                                            "active":isCheck,
                                        },
                                    },
                                    ""
                                )
                            )
                        },
                    });
                }
                

                if(vm.options&&Object.keys(vm.options).length>0){
                    let width = Object.keys(vm.options).length*50;
                    selectedColumns.push({
                        title: '操作',
                        key: 'action',
                        width: width,
                        align: 'center',
                        render (h,params){
                            let row = params.row;
                            let optionsArr = [];
                            for(let key in vm.options){
                                let name = "";
                                if(vm.options[key].type=="multi"){
                                    for(let i=0;i<vm.options[key].stateValue.length;i++){
                                        if(row[vm.options[key].stateKey]==vm.options[key].stateValue[i]){
                                            name = vm.options[key].name[i];
                                        }
                                    }
                                }else{
                                    name = vm.options[key].name;
                                }
                                
                                optionsArr.push(h(
                                    "span",{
                                        "class":{
                                            "table_btn":true,
                                        },
                                        "attrs":{
                                            "data-type":key,
                                            "data-id":row[vm.primarykey],
                                            "data-skey":vm.secondKey?row[vm.secondKey]:""
                                        }
                                    },
                                    name
                                ));
                            }
                            return optionsArr
                        },
                    });
                }
                return selectedColumns;
            },
        },
    };
</script>