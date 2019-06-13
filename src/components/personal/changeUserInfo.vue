<template>
  <Modal v-model="$store.state.changeUserInfo" @on-visible-change="changeModal">
    <div slot="header">
      <Icon type="md-arrow-round-back" @click="goBack" />
      <span>编辑个人信息</span>
    </div>

    <Content class="change_userinfo">
      <Form ref="userInfoChanged" :model="formData" :rules="formRules">
        <FormItem prop="username">
          <Row type="flex" align="middle" justify="center" class="lay_row">
            <Col :span="5" align="right">用户名:</Col>
            <Col :span="12" :offset="1">{{username}}</Col>
          </Row>
        </FormItem>
        <FormItem prop="name">
          <Row type="flex" align="middle" justify="center" class="lay_row">
            <Col :span="5" align="right">真实姓名:</Col>
            <Col :span="12" :offset="1">{{name}}</Col>
          </Row>
        </FormItem>
        <FormItem prop="email">
          <Row type="flex" align="middle" justify="center" class="lay_row">
            <Col :span="5" align="right">邮箱:</Col>
            <Col :span="12" :offset="1">
              <Input v-model="formData.email" placeholder="请输入邮箱号" />
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="cell">
          <Row type="flex" align="middle" justify="center" class="lay_row">
            <Col :span="5" align="right">联系方式:</Col>
            <Col :span="12" :offset="1">
              <Input v-model="formData.cell" placeholder="请输入联系方式" />
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="code">
          <Row type="flex" align="middle" justify="center" class="lay_row">
            <Col :span="5" align="right">短信验证码:</Col>
            <Col :span="12" :offset="1">
              <Input v-model="formData.code">
                <Button slot="append" :disabled="isDisabled" type="primary" @click="getCode" class="code">{{secondMsg}}</Button>
              </Input>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Content>

    <div slot="footer" style="height:5rem;">
      <Row type="flex" align="middle" justify="space-around">
        <Col :span="8">
          <Button size="large" type="primary" long @click="closeModal">关闭</Button>
        </Col>
        <Col :span="8">
          <Button size="large" type="primary" long @click="submitForm">确定</Button>
        </Col>
      </Row>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "changeUserInfo",
    data() {
      return {
        username:"",
        name:"",
        formData:{
          email:"",
          cell:"",
          code:"",
        },
        formRules:{
          email:[{required:true,trigger:'blur',message:'此项不能为空'}],
          cell:[{required:true,trigger:'blur',message:'此项不能为空'}],
          code:[{required:true,trigger:'blur',message:'此项不能为空'}],
        },
        isDisabled:false,
        secondMsg:"获取验证码"
      }
    },
    watch:{
      '$store.state.changeUserInfo'(value){
        if (value) {
          this.$store.dispatch('personal',false);
        }
      },
      '$store.state.userInfo'(value){
        this.username = value.username;
        this.name = value.name;
        this.formData.email = value.email;
        this.formData.cell = value.cell;
      }
    },
    mounted(){
    },
    methods:{
      goBack(){
        this.$store.dispatch('changeInfo',false);
        this.$store.dispatch('personal',true)
      },
      closeModal(){
        this.$store.dispatch('changeInfo',false);
      },
      submitForm(){
        this.$refs['userInfoChanged'].validate( valid => {
          if (valid) {
            this.$refs['userInfoChanged'].resetFields();
            this.formData.email = this.$store.state.userInfo.email;
            this.formData.cell = this.$store.state.userInfo.cell;
            this.$store.dispatch('changeInfo',false);
          } else {
            this.$Message.error('验证不通过!');
          }
        });
      },
      changeModal(bool){
        if (!bool) this.$refs['userInfoChanged'].resetFields();
        this.formData.email = this.$store.state.userInfo.email;
        this.formData.cell = this.$store.state.userInfo.cell;
      },
      getCode(){
        let count = 120;
        this.secondMsg = count;
        this.isDisabled = true;
        let timer = setInterval(() => {
          count --;
          this.secondMsg = count.toString();
          if (count <= 0){
            clearInterval(timer);
            this.secondMsg = '获取验证码';
            this.isDisabled = false;
          }
        },1000)
      }
    }
  }
</script>

<style scoped>

</style>
