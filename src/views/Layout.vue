<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRoutesByIdentity } from '../apis/route/index'

const menuList = ref([])
const defaultIndex = ref(['1'])
onMounted(() => {
    const index = sessionStorage.getItem('accessIndex')
    if (index !== undefined) {
        defaultIndex.value = index
    } else {
        defaultIndex.value = 1
    }
    console.log(defaultIndex.value)
    getData()
})
const getData = async () => {
    const info = sessionStorage.getItem('info')
    const { identity } = JSON.parse(info)
    const data = await getRoutesByIdentity({ belong: identity })
    menuList.value = data.data
}
const router = useRouter()
const isCollapse = ref(false)
const navTo = (path, index) => {
    console.log(index)
    sessionStorage.setItem('accessIndex', index)
    router.push(path)
}

const exit = () => {
    sessionStorage.clear()
    router.push('/Login')
}
</script>

<template>
    <div class="layout">
        <div class="side-bar">
            <el-menu
                :default-active="defaultIndex"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
            >
                <el-menu-item index="1" @click="navTo('/Layout/Home', 1)">
                    <el-icon><component class="icons" :is="'menu'" /></el-icon>
                    <template #title>主页</template>
                </el-menu-item>
                <el-menu-item v-for="(item, index) in menuList" v-bind:key="index" :index="(index + 2) + ''" @click="navTo(`/Layout/${item.name}`, index + 2)">
                    <el-icon><component class="icons" :is="item.iconName" /></el-icon>
                    <template #title>{{item.tagName}}</template>
                </el-menu-item>
                <el-menu-item :index="menuList.length + 2" @click="exit">
                    <el-icon><component class="icons" :is="'CloseBold'" /></el-icon>
                    <template #title>退出</template>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

    
<style lang="less">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .layout {
        display: flex;
        overflow: hidden;
        .side-bar {
            height: 100vh;
            .el-menu-vertical-demo {
                height: 100%;
            }
        }
        .content {
            flex: 1;
            height: 100vh;
            padding-top: 20px;
            padding-left: 20px;
            overflow-y: auto;
        }
    }
</style>