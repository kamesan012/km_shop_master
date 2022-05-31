<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
    <div class="back-container">
      <img src="../assets/返回.svg" @click="router.back()"><span @click="router.back()">返回</span>
    </div>
    <div class="page-404">
        404 Not Found
    </div>
</template>
    
<style lang="less">
    .back-container {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        padding-top: 15px;
        padding-left: 15px;
        img {
            width: 16px;
            height: 16px;
        }
        span {
            cursor: pointer;
        }
    }
    .page-404 {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 96px;
    }
</style>