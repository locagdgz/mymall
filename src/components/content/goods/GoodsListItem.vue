<template>
  <div class="goods-item">
<!--    <a :href="goodsItem.link">-->
      <img :src="goodsItem.show.img" alt="">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">¥{{goodsItem.price}}</span>
        <span class="cfav">⭐️{{goodsItem.cfav}}</span>
      </div>
<!--    </a>-->
  </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props:{
          goodsItem: {
            type:Object,
            default(){
              return []
            }
          }
        }

    }
</script>

<style scoped>
  .goods-item{
    width: 50%;
    /*padding: 2px;*/
    text-align: center;
    font-size: var(--font-size);
    position: relative;
    padding: 0 2px 40px 2px;

  }
  .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
  }
  .price{
    color: var(--color-high-text);
  }
  .goods-item p {
    overflow: hidden;/*溢出隐藏*/
    white-space: nowrap;/*文字不换行*/
    text-overflow: ellipsis;/*溢出省略号*/
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  a{
    display: block;
  }
  .cfav{
    padding-left: 3px;
  }

</style>
