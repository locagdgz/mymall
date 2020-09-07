<template>
  <swiper :interval="1000">
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "HomeSwiper",
        props: {
          banner:{
            type: Array,
            default(){
              return []
            }
          }
        },
        data(){
          return {
            isLoaded: false
          }
        },
        components:{
          Swiper,
          SwiperItem
        },
        methods:{
          imageLoaded(){
            // if (!this.isLoaded) {
              this.$emit('swiperImageLoaded')
              // this.isLoaded = true
            // }
          }
        }
    }
</script>

<style scoped>

</style>
