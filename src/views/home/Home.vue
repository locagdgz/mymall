<template>
  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="scrollContent"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoaded.once="homeSwiperImageLoaded"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackClick"></back-top>
  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import Scroll from "components/common/scroll/Scroll";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import BackTop from "components/content/backTop/BackTop";

    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import {getHomeMultiData, getHomeGoods} from "network/home";
    import {debounce} from "common/utils";

    export default {
        name: "Home",
        components: {
          NavBar,
          TabControl,
          GoodsList,
          Scroll,
          HomeSwiper,
          RecommendView,
          FeatureView,
          BackTop
        },
        computed:{
          showGoods(){
            return this.goods[this.currentType].list;
          }
        },
        data(){
          return {
            banner: [],
            dKeyword: [],
            keywords: [],
            recommend:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]}
            },
            currentType: 'pop',
            isShowBackClick: false,
            tabOffsetTop: 616,
            isTabFixed: false
          }
        },
        created() {
          this.getHomeMultiData()
          this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')
        },
        mounted() {
          // 图片加载的事件监听 - 防抖处理
          let refresh = debounce(this.$refs.scroll.refresh, 300)
          this.$bus.$on('imageLoadedRefresh',()=>{
            refresh()
          })
        },
        methods: {
            /**
             * 网络请求相关
             */
            getHomeMultiData(){
              // 请求多个数据
              getHomeMultiData().then(data => {
                this.banner = data.banner.list
                this.dKeyword = data.dKeyword.list
                this.keywords = data.keywords.list
                this.recommend = data.recommend.list
              })
            },
            getHomeGoods(type){
              let thisGoods = this.goods[type]
              // 请求商品数据
              getHomeGoods(type,++thisGoods.page).then(data => {
                thisGoods.list.push(...data.list)
                // 完成加载更多!才能继续下一次上拉加载!
                this.$refs.scroll.finishPullUp()

              })
            },
            /**
             * 事件监听方法
             */
            tabClick(index){
              switch (index) {
                case 0:
                  this.currentType = 'pop'
                  break
                case 1:
                  this.currentType = 'new'
                  break
                case 2:
                  this.currentType = 'sell'
                  break
                default:
                  this.currentType = 'pop'
              }
              this.$refs.tabControl1.currentIndex = index
              this.$refs.tabControl2.currentIndex = index

            },
            backClick(){
              this.$refs.scroll.scrollTo(0,0,500)
            },
            scrollContent(position) {
              // 判断 backTop 按钮是否显示
              this.isShowBackClick = (- position.y) > 1000
              // 决定 tabControl 是否吸顶(position:fixed)
              this.isTabFixed =  (- position.y) > this.tabOffsetTop
            },
            loadMore(){
              this.getHomeGoods(this.currentType)
              // TODO refresh 的更好解决办法
              // this.$refs.scroll.refresh()
            }

        }
    }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .content{
    height: calc(100% - 44px - 49px);
    /*height: 300px;*/
    /*margin-top: 44px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control{
    background-color: #ffffff;
    position: relative;
    z-index: 9;
  }
  .tab-control-active{

    display: block;
    background-color: #ffffff;
  }
</style>
