<template>
<!--    ref -> 绑定给子组件的属性以获取 dom-->
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props: {
          probeType: {
            type: Number,
            default: 0
          },
          pullUpLoad: {
            type: Boolean,
            default: false
          }
        },
        data(){
          return {
            scroll: null
          }
        },
        components: {
          BScroll
        },
        mounted() {
          // 创建 better scroll
          this.scroll = new BScroll(this.$refs.wrapper, {
            click:true,
            probeType: this.probeType,
            // 上拉加载
            pullUpLoad: this.pullUpLoad
          })
          this.scroll.on('scroll',position => {
            this.$emit('scroll',position)
          })
          this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
          })
        },
        methods: {
          scrollTo(x, y, time=300) {
            this.scroll.scrollTo(x, y, time)
          },
          finishPullUp(){
            this.scroll.finishPullUp()
          },
          refresh(){
            this.scroll.refresh()
          }
        }
    }
</script>

<style scoped>

</style>
