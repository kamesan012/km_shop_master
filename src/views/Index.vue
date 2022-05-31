<template>
  <div class="shop-home">
    <div class="ad">
      <div class="inner"></div>
    </div>
    <div class="nav">
      <div>书籍</div>
      <div>服装</div>
      <div>家电</div>
    </div>
    <div class="search"></div>
    <div class="pics"></div>
    <div class="items"></div>
    <div class="user" @click="showUserOp = !showUserOp">
      <Avatar style="width: 1em; height: 1em;"/>
    </div>
    <div class="user-op" v-show="showUserOp">
      <div>查看订单</div>
      <div>登录</div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const showUserOp = ref(false)
</script>

<style lang="less">
  .shop-home {
    width: 100vw;
    height: 100vh;
    background: #ccc;
  }
  .ad {
    height: 80px;
    background-color: rgb(255, 101, 70);
    .inner {
      width: 1190px;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
      background: url('../assets/ad.webp');
      background-size: cover;
    }
  }
  .nav {
    display: flex;
    align-items: center;
    width: 100vw;
    background: #fff;
    div {
      flex: 1;
      text-align: center;
    }
  }

  .user {
    position: absolute;
    bottom: 300px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
  }

  .user-op {
    position: absolute;
    bottom: 255px;
    right: 65px;
    width: 58px;
    background: #fff;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 58px;
      height: 60px;
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
</style>
