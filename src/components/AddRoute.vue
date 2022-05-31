<script setup>
import { reactive, ref } from 'vue'
import IconSelectList from './IconSelectList.vue'
import { addRoute } from '../apis/route/index'
import { ElMessage } from 'element-plus'

defineProps({
  show: Boolean
})

const emit = defineEmits(['cancel', 'add'])

// 表单数据
const form = reactive({
    tagName: '',
    name: '',
    path: '',
    iconName: 'Menu',
    belong: ''
})

const cancel = () => {
    emit('cancel')
}
const add = () => {
    emit('add')
}
const ruleFormRef = ref()
const rules = reactive({
  tagName: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
  name: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
  path: [{ required: true, message: '请输入组件地址', trigger: 'blur' }],
  belong: [{ required: true, message: '请选择所属值1', trigger: 'blur' }]
})
const belongOptions = ref([
    {value: 'admin', label: 'admin'},
    {value: 'user', label: 'user'}
])
const onSubmit = (ruleFormRef) => {
    ruleFormRef.validate(async (valid, fields) => {
        if (valid) {
            const data = await addRoute(form).catch(() => {})
            if (data.code === 200) {
                ElMessage({
                    message: '添加成功',
                    type: 'success'
                })
                add()
            } else {
                ElMessage({
                    message: data.msg,
                    type: 'error'
                })
            }
        } else {
            console.log(fields)
        }
    })
}

const showIconSelect = ref(false)
const showSelect = () => {
    showIconSelect.value = true
}
const changeIcon = (e) => {
    form.iconName = e
    showIconSelect.value = false
}
</script>

<template>
    <div class="addRouterContainer" v-show="show">
        <el-form :model="form" :rules="rules" ref="ruleFormRef">
            <el-form-item label="路由名称" prop="tagName" label-width="80px">
                <el-input v-model="form.tagName" />
            </el-form-item>
            <el-form-item label="组件名称" prop="name" label-width="80px">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="组件地址" prop="path" label-width="80px">
                <el-input v-model="form.path" />
            </el-form-item>
            <el-form-item label="图标" prop="iconName" label-width="80px">
                <!-- <el-input v-model="form.iconName" /> -->
                <component class="icons" :is="form.iconName" @click="showSelect"/>
            </el-form-item>
            <el-form-item label="所属" prop="belong" label-width="80px">
                <el-select v-model="form.belong" class="m-2" placeholder="请选择" size="large">
                    <el-option
                    v-for="item in belongOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item class="button-container">
                <el-button type="primary" @click="cancel">取消</el-button>
                <el-button type="primary" @click="onSubmit(ruleFormRef)">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
    <IconSelectList :show="showIconSelect" @changeIcon="changeIcon"/>
</template>
    
<style lang="less">
    .addRouterContainer {
        position: fixed;
        z-index: 11;
        top: calc(50% - 175px);
        left: calc(50% - 275px);
        width: 500px;
        height: 300px;
        padding: 25px;
        background: #fff;
        .button-container {
            .el-form-item__content {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .icons {
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
    }
</style>