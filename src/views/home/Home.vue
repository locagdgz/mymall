<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <h2>首页</h2>
  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import {getHomeMultiData} from "network/home";

    export default {
        name: "Home",
        components: {
          NavBar
        },
        data(){
          return {
            banner: [],
            dKeyword: [],
            keywords: [],
            recommend:[]
          }
        },
        created() {
          // 请求多个数据
          getHomeMultiData().then(data => {
            console.log(data);
            this.banner = data.banner.list
            this.dKeyword = data.dKeyword.list
            this.keywords = data.keywords.list
            this.recommend = data.recommend.list
          })
        }
    }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
