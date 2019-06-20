<template>
  <div class='media-form'>
    <Breadcrumb class="breadcrumb" v-if="$route.params.id">
      <BreadcrumbItem class="active">编辑媒体</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb class="breadcrumb" separator="<i class='ivu-icon ivu-icon-md-send'></i>" v-else>
      <BreadcrumbItem class="active">新建媒体</BreadcrumbItem>
      <BreadcrumbItem>新建频道</BreadcrumbItem>
      <BreadcrumbItem>新建广告位</BreadcrumbItem>
      <BreadcrumbItem>新建规格</BreadcrumbItem>
    </Breadcrumb>
    <Row class="padding-402">
      <Col><h4>基本信息</h4></Col>
    </Row>
    <Row>
      <Col style="width:500px">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="媒体名称" prop="mediaName">
            <Input v-model="formValidate.mediaName"/>
          </FormItem>
          <FormItem label="媒体简称" prop="mediaShortName">
            <Input v-model="formValidate.mediaShortName"/>
          </FormItem>
          <FormItem label="媒体类型" prop="mediaType">
            <Select v-model="formValidate.mediaType">
              <Option v-for="item in mediaTypeList" :key="item.id" v-model="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="投放平台" prop="plate">
            <RadioGroup v-model="formValidate.plate">
              <Radio :label="0">PC</Radio>
              <Radio :label="1">WAP</Radio>
              <Radio :label="2">APP</Radio>
              <Radio :label="3">小程序</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="主页地址" prop="homeUrl">
            <Input v-model="formValidate.homeUrl" placeholder="http://"/>
          </FormItem>
          <FormItem label="库存锁定时间" prop="lock_time">
            <DatePicker type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        placement="bottom-start"
                        style="width:380px;"
                        v-model="formValidate.lock_time"
                        :options="optionsDis"
                        :editable="false"
            ></DatePicker>
          </FormItem>
          <FormItem label="备注" prop="note">
            <Input type="textarea" v-model="formValidate.note" style="min-height:115px"/>
          </FormItem>
          <FormItem class="btn_group">
            <Row type="flex" align="middle" justify="space-between">
              <Button @click="handleReset('formValidate')">取消</Button>
              <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
              <Button type="primary" @click="handleSubmit('formValidate')">下一步</Button>
            </Row>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
  import tools from './../../../utils/tools'
  import fetch from './../../../utils/fetch'

  export default {
    name: "media-form",
    data() {
      return {
        formValidate: {
          mediaName: "",
          mediaShortName: "",
          mediaType: "",
          plate: 0,
          homeUrl: "",
          lock_time: "",
          note: "",
        },
        optionsDis: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        isEdit: false,
        mediaTypeList: [],
        ruleValidate: {}
      }
    },
    watch: {},
    beforeMount: function () {
      let vm = this;
      if (vm.$route.params.id) {
        vm.isEdit = true;
        fetch("/ssp-manager/v1/media/editinfo?id=" + vm.$route.params.id).then(res => {
          let data = res.result;
          vm.formValidate = {
            mediaName: data.name ? data.name : "",
            mediaShortName: data.shortname ? data.shortname : "",
            mediaType: data.mediatype ? data.mediatype.toString() : "",
            plate: data.platform,
            homeUrl: data.homepage ? data.homepage : "",
            lock_time: data.enddate,
            note: data.mediadesc ? data.mediadesc : "",
          };
        })
      } else {
        vm.masterId = tools.getGlobal('masterId') ? tools.getGlobal('masterId') : vm.$store.state.masterId;
      }
    },
    mounted() {
      let vm = this;
      tools.getMediaTypeList((list) => {
        if (list.length > 0 && !vm.isEdit) {
          vm.formValidate.mediaType = list[0].id;
        }
        vm.mediaTypeList = list;
      })
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

