<template>
  <Modal v-model="$store.state.changePassword" @on-visible-change="changeModal">
    <div slot="header">
      <Icon type="md-arrow-round-back" @click="goBack" />
      <span>修改密码</span>
    </div>
    <Content class="change_password">
      <Form ref="passwordChanged" :model="formData" :rules="formRules">
        <FormItem prop="oldPassword">
          <Row type="flex" align="middle" justify="center" class="lay_row">
            <Col :span="5" align="right">旧密码:</Col>
            <Col :span="12" :offset="1">
              <Input v-model="formData.oldPassword" placeholder="请输入旧密码" />
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="newPassword">
          <Row type="flex" align="middle" justify="center" class="lay_row">
            <Col :span="5" align="right">新密码:</Col>
            <Col :span="12" :offset="1">
              <Input v-model="formData.newPassword" placeholder="请输入新密码" />
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="rePassword">
          <Row type="flex" align="middle" justify="center" class="lay_row">
            <Col :span="5" align="right">确认密码:</Col>
            <Col :span="12" :offset="1">
              <Input v-model="formData.rePassword" placeholder="请再次输入新密码" />
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Content>
    <div slot="footer" style="height:5rem;">
      <Row type="flex" align="middle" justify="space-around">
        <Col :span="8">
          <Button size="large" type="primary" long @click="closeModal" >关闭</Button>
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
    name: "changePassword",
    data() {
      return {
        formData:{
          oldPassword:'',
          newPassword:'',
          rePassword:''
        },
        formRules:{
          oldPassword:[{required:true,trigger:'blur',message:'此项不能为空'}],
          newPassword:[{required:true,trigger:'blur',message:'此项不能为空'}],
          rePassword:[{required:true,trigger:'blur',message:'此项不能为空'}],
        },
      }
    },
    methods:{
      goBack(){
        this.$refs['passwordChanged'].resetFields();
        this.$store.dispatch('changeWord',false);
        this.$store.dispatch('personal',true)
      },
      closeModal(){
        this.$refs['passwordChanged'].resetFields();
        this.$store.dispatch('changeWord',false);
      },
      submitForm(){
        this.$refs['passwordChanged'].validate( valid => {
          if (valid) {
            this.$Message.success('Success!');
            this.$refs['passwordChanged'].resetFields();
            this.$store.dispatch('changeWord',false);
          } else {
            this.$Message.error('验证不通过!');
          }
        });
      },
      changeModal(bool){
        if (!bool) this.$refs['passwordChanged'].resetFields();
      }
    }
  }
</script>

<style scoped>
  .ivu-form-item-error-tip{
   left:16.8rem;
  }
</style>
