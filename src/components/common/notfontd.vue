<template>
  <div class="container ad_account">
    <Row type="flex" justify="center" align="top">
      <img src="./../../assets/vision_404.png" alt="" />
    </Row>
    <Row type="flex" justify="center" align="top">
      <span style="margin-top:20px">Oops!! 页面好像崩溃了...</span>
    </Row>
    <Row type="flex" justify="center" align="top">
      <router-link to="/">
        <img src="./../../assets/back_to_home.png" alt="" style="margin-top:20px" />
      </router-link>
    </Row>
  </div>
</template>

<script>

  export default {
    name:"404",
    data(){
      return {

      }
    },
  }
</script>
