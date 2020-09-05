<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
    <feature-view></feature-view>
  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import {getHomeMultiData} from "network/home";

    export default {
        name: "Home",
        components: {
          NavBar,
          HomeSwiper,
          RecommendView,
          FeatureView
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
