<template>
    <Menu theme="light"
          mode="vertical"
          ref="side_menu"
          accordion
          :active-name="activeName"
          :open-names="openArr"
          @on-open-change="openChange"
          @on-select="selectChange"
    >
      <Submenu v-for="item in browsRoute" :key="item.routeName" :name="item.name">
        <template slot="title">
          <img :src="item.icon" alt="">
          {{item.routeName}}
        </template>
        <router-link v-for="temp in item.children" :to="temp.path" :key="temp.routeName">
          <MenuItem :name="temp.name">
            <img :src="temp.icon" alt="">
            {{temp.routeName}}
          </MenuItem>
        </router-link>
      </Submenu>
    </Menu>
</template>

<script>
  import {browsRoute} from '../../../router/routes'

  export default {
    name: "asidebar",
    props:{
      setWidth:String,
      routeName:String,
    },
    data() {
      return {
        browsRoute: [],
        activeName:"",
        openArr:['i0'],
      }
    },
    mounted() {
      this.activeName = this.routeName ? this.routeName : 'i0-0';
      this.browsRoute = Object.keys(browsRoute).map((item) => {
        return browsRoute[item];
      });
      //对应默认状态
      this.browsRoute.forEach(item => {
        if (item.children && item.children !==[]){
          item.children.forEach(temp => {
            if (temp.path === this.$route.path){
              this.activeName = temp.name;
              this.openArr = [item.name]
            }
          })
        }
      });
      //调用默认状态
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      })
    },
    methods: {
      selectChange(name){

      },
      openChange(value){
        this.browsRoute.forEach((item,index) => {
          if (item.name === value[0]){
            if (item.children && item.children.length >0) {
              this.activeName = item.children[0].name;
              this.openArr = [item.name];
              this.$router.push(item.children[0].path)
            } else {
              this.activeName = item.name;
              this.openArr = [item.name]
              this.$router.push(item.path)
            }
          }
        });
      }
    }
  }
</script>

<style scoped>
  img{
    height:1rem;
  }
</style>
