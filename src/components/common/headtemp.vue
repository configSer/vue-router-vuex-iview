<template>
  <Header class="headtemp">
    <Row type="flex" align="middle" justify="space-between">
      <Col span="18" :xs="8" :sm="8" :md="12" :lg="16" :xl="18" :xxl="18" order="1" class-name="head_left">
        <Row type="flex" align="middle" justify="start">
          <Col><img src="./../../assets/header_logo.png" alt="" class="log_img"></Col>
          <Col span="12"><h3 class="log_tit">一站式营销服务平台</h3></Col>
        </Row>
      </Col>
      <Col span="6"  :xs="16" :sm="16" :md="12" :lg="8" :xl="6" :xxl="6" order="2"  class-name="head_right">
        <Row type="flex" align="middle" justify="end">
          <Col>
            <span>欢迎您, <b style="cursor:pointer">{{username}}</b></span>
            <Icon type="ios-contact" title="个人中心" @click="toPersonal"/>
            <Icon type="ios-power" title="退出" @click="logout" />
          </Col>
        </Row>
      </Col>
    </Row>
  </Header>
</template>

<script>
  import fetch from './../../utils/fetch'
  export default {
    name: "headtemp",
    props:{
      username:String,
    },
    data() {
      return {}
    },
    methods:{
      logout(){
        let vm = this;
        vm.$Modal.confirm({
          title: "登出",
          content: '确定退出登录吗？',
          onOk() {
            fetch("/common-portal/common/portal/logout").then(res => {
              vm.$store.dispatch('hideLogin');
              vm.$router.push("/login")
            })
          },
          onCancel(){}
        })

      },
      toPersonal(){
        this.$store.dispatch('personal',true)
      }
    }
  }
</script>

<style scoped>

</style>
