<template>
  <Modal
    v-model="$store.state.showPersonal"
    title="个人中心"
  >
    <Content>
      <Row type="flex" align="middle" justify="center" class="lay_row" v-for="(item,index) in info" :key="index">
        <Col :span="6" align="right">{{item.label}}:</Col>
        <Col :span="12" :offset="1">{{item.value}}</Col>
      </Row>
    </Content>
    <div slot="footer" style="height:5rem;">
      <Row type="flex" align="middle" justify="space-around">
        <Col :span="8">
          <Button size="large" type="primary" long @click="changePassword">修改密码</Button>
        </Col>
        <Col :span="8">
          <Button size="large" type="primary" long @click="changeUserInfo">编辑个人账户</Button>
        </Col>
      </Row>
    </div>
  </Modal>
</template>

<script>

  export default {
    name: "personal",
    data() {
      return {
        info: [],
      }
    },
    watch: {
      '$store.state.userInfo'(val) {
        let arr = Object.entries(val);
        arr.forEach(item => {
          if (item[0] === 'username') {
            this.info.push({label: '用户名', value: item[1]})
          } else if (item[0] === 'name') {
            this.info.push({label: '真实姓名', value: item[1]})
          } else if (item[0] === 'email') {
            this.info.push({label: '邮箱', value: item[1]})
          } else if (item[0] === 'cell') {
            this.info.push({label: '联系方式', value: item[1]})
          }
        })
      },
    },
    methods:{
      changePassword(){
        this.$store.dispatch('personal',false);
        this.$store.dispatch('changeWord',true)
      },
      changeUserInfo(){
        this.$store.dispatch('personal',false);
        this.$store.dispatch('changeInfo',true)
      }
    }
  }
</script>

<style scoped>

</style>
