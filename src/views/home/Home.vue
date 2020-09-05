<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                  @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    <ul>
      <li>li1</li>
      <li>li2</li>
      <li>li3</li>
      <li>li4</li>
      <li>li5</li>
      <li>li6</li>
      <li>li7</li>
      <li>li8</li>
      <li>li9</li>
      <li>li10</li>
      <li>li11</li>
      <li>li12</li>
      <li>li13</li>
      <li>li14</li>
      <li>li15</li>
      <li>li16</li>
      <li>li17</li>
      <li>li18</li>
      <li>li19</li>
      <li>li20</li>
      <li>li21</li>
      <li>li22</li>
      <li>li23</li>
      <li>li24</li>
      <li>li25</li>
      <li>li26</li>
      <li>li27</li>
      <li>li28</li>
      <li>li29</li>
      <li>li30</li>
      <li>li31</li>
      <li>li32</li>
      <li>li33</li>
      <li>li34</li>
      <li>li35</li>
      <li>li36</li>
      <li>li37</li>
      <li>li38</li>
      <li>li39</li>
      <li>li40</li>
      <li>li41</li>
      <li>li42</li>
      <li>li43</li>
      <li>li44</li>
      <li>li45</li>
      <li>li46</li>
      <li>li47</li>
      <li>li48</li>
      <li>li49</li>
      <li>li50</li>
      <li>li51</li>
      <li>li52</li>
      <li>li53</li>
      <li>li54</li>
      <li>li55</li>
      <li>li56</li>
      <li>li57</li>
      <li>li58</li>
      <li>li59</li>
      <li>li60</li>
      <li>li61</li>
      <li>li62</li>
      <li>li63</li>
      <li>li64</li>
      <li>li65</li>
      <li>li66</li>
      <li>li67</li>
      <li>li68</li>
      <li>li69</li>
      <li>li70</li>
      <li>li71</li>
      <li>li72</li>
      <li>li73</li>
      <li>li74</li>
      <li>li75</li>
      <li>li76</li>
      <li>li77</li>
      <li>li78</li>
      <li>li79</li>
      <li>li80</li>
      <li>li81</li>
      <li>li82</li>
      <li>li83</li>
      <li>li84</li>
      <li>li85</li>
      <li>li86</li>
      <li>li87</li>
      <li>li88</li>
      <li>li89</li>
      <li>li90</li>
      <li>li91</li>
      <li>li92</li>
      <li>li93</li>
      <li>li94</li>
      <li>li95</li>
      <li>li96</li>
      <li>li97</li>
      <li>li98</li>
      <li>li99</li>
      <li>li100</li>
    </ul>
  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";

    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import {getHomeMultiData, getHomeGoods} from "network/home";

    export default {
        name: "Home",
        components: {
          NavBar,
          TabControl,
          GoodsList,
          HomeSwiper,
          RecommendView,
          FeatureView
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
            currentType: 'pop'
          }
        },
        created() {
          this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')
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
        }
      }
    }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #ffffff;
    z-index: 999;
  }
</style>
