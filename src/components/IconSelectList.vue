<script setup>

defineProps({
  show: Boolean
})

const emit = defineEmits(['changeIcon'])

const iconList = [
    'Avatar', 'Bell', 'Box', 'Briefcase', 'Calendar',
    'Camera', 'Fold', 'ChatDotRound', 'ChatLineRound', 'ChatRound',
    'Checked', 'CircleCheckFilled', 'Clock', 'Cloudy', 'Coin',
    'Comment', 'Compass', 'Connection', 'Setting', 'Menu'
]

const changeIcon = (value) => {
    emit('changeIcon', value)
}
</script>

<template>
    <div class="iconSelectContainer" v-show="show">
        <div class="iconContainer" v-for="(item, index) in iconList" :key="index" @click="changeIcon(item)">
            <component class="icons" :is="item"/>
        </div>
    </div>   
</template>
    
<style lang="less">
    .iconSelectContainer {
        display: flex;
        flex-wrap: wrap;
        position: fixed;
        z-index: 11;
        top: calc(50% - 200px);
        left: calc(50% - 400px);
        width: 800px;
        height: 400px;
        background: #fff;
        .iconContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: 160px;
            height: 100px;
            border: 1px solid #ccc;
            cursor: pointer;
            .icons {
                width: 48px;
                height: 48px;
            }
        }
    }
</style>