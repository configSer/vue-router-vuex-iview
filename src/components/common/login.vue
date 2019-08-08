<template>
  <div class="login">
    <Row type="flex" class-name="login_box">
      <Col span="18" :xs="0" :sm="0" :md="12" :lg="16" :xl="18" :xxl="18" order="1" class-name="bg_img"></Col>
      <Col span="6"  :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="6" order="2"  class-name="login_form">
        <Form ref="formCustom"
              :model="formCustom"
              :rules="ruleCustom"
              :label-width="0"
              show-message
              label-position="left"
        >
          <Row class-name="logo_tit">
            <Col><img src="./../../assets/logo.png" alt=""></Col>
            <Col><h2>一站式业务服务平台</h2></Col>
          </Row>
          <Row class-name="err_log" :style="isError ? {visibility:'visible'} : {visibility:'hidden'}">{{errorMsg}}</Row>
          <FormItem label="" prop="username">
            <Input prefix="md-person" type="text" v-model="formCustom.username" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="" prop="password">
            <Input prefix="md-lock" type="password" v-model="formCustom.password" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
            <!--<Button  style="margin-left: 1rem">注册</Button>-->
            <Col>(系统推荐使用Chrome浏览器)</Col>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { Row, Col,} from 'iview'
  import fetch from './../../utils/fetch'
  import qs from 'qs'
  import { mapMutations } from 'vuex'
  export default {
    name:"login",
    data() {
      return {
        formCustom: {
          username:'',
          password: '',
        },
        ruleCustom: {
          /*
          * string: 必须是字符串类型。这是默认类型
            number: 必须是数字
            boolean: 必须是布尔型的
            method:必须是类型函数
            regexp: 必须是ReGEXP的实例，或者是在创建新的ReGEXP时不会生成异常的字符串
            integer:必须是整数.
            float:必须是浮点数.
            array: 必须是由Array.isArray确定的数组
            object: 必须是类型对象而不是Array.isArray
            enum: 枚举中必须存在值。
            date: 按日期确定的值必须有效
            url: 必须是URL类型。
            hex: 必须是十六进制。
            email:必须是电子邮件类型。
          * */
          username:[
            {required: true, whitespace:true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        isError: false,
        errorMsg: '用户名或密码输入不正确'
      };
    },
    mounted(){
      let vm = this;
      document.onkeyup = function(evt){
        if (evt.keyCode === 13) {
          vm.handleSubmit('formCustom')
        }
      }
    },
    methods: {
      ...mapMutations({
        login: 'login'
      }),
      handleSubmit (name) {
        let vm = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            fetch("/common-portal/common/portal/login",{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              method: 'post',
              body: qs.stringify(vm.formCustom),
            }).then(() => {
              this.login();
              this.isError = false;
              this.$Message.success('登陆成功!');
              this.$router.push("/")
            },(err) => {
              this.errorMsg = err;
              this.isError = true;
            });
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
