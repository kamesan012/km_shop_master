<script setup>
import { onMounted, ref } from 'vue';
import { getRoutes, deleteRoute, modifyRoute } from '../../apis/route/index'
import IconSelectList from '../../components/IconSelectList.vue'
import AddRoute from '../../components/AddRoute.vue';
import { ElMessage, ElMessageBox } from 'element-plus'

const routeList = ref([])
const totalNum = ref(0)
const pageSize = ref(10)
const pageNum = ref(1)
const iconList = [
    'Avatar', 'Bell', 'Box', 'Briefcase', 'Calendar',
    'Camera', 'Fold', 'ChatDotRound', 'ChatLineRound', 'ChatRound',
    'Checked', 'CircleCheckFilled', 'Clock', 'Cloudy', 'Coin',
    'Comment', 'Compass', 'Connection', 'Setting', 'Menu'
]
onMounted(() => {
    getData()
})
const getData = async () => {
    const data = await getRoutes({pageSize: pageSize.value, pageNum: pageNum.value})
    const { list, total } = data.data
    list.map(item => {
        item.editFlag = false
    })
    routeList.value = list
    totalNum.value = total
}

const handleSizeChange = (val) => {
    pageSize.value = val
    getData()
}

const handleCurrentChange = (val) => {
    pageNum.value = val
    getData()
}

const handleEdit = async (index, row) => {
    row.editFlag = !row.editFlag
    if (!row.editFlag) {
        const data = await modifyRoute(row)
        if (data.code === 200) {
            ElMessage({
                type: 'success',
                message: '编辑成功',
            })
            getData()
        } else {
            ElMessage({
                type: 'error',
                message: '编辑失败',
            })
        }
    }
    console.log(index, row)
}

const handleDelete = (index, row) => {
    ElMessageBox.confirm(
        '是否删除此路由？',
        '',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(async () => {
            const { rid } = row
            const data = await deleteRoute({ rid })
            if (data.code === 200) {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
                getData()
            } else {
                ElMessage({
                    type: 'error',
                    message: '删除失败',
                })
            }
            // 接口调用
        })
    .catch(() => {})
    console.log(index, row)
}

const showIconSelect = ref(false)
const currentSelect = ref({})
const showSelect = (current) => {
    currentSelect.value = current
    showIconSelect.value = true
}
const hideSelect = () => {
    showIconSelect.value = false
}
const changeIcon = (e) => {
    const current = currentSelect.value
    current.iconName = e
    hideSelect()
}

const showAddRoute = ref(false)
const addRoute = () => {
    showAddRoute.value = true
}
const hideAddRoute = () => {
    showAddRoute.value = false
}
const updateNewData = () => {
    hideAddRoute()
    getData()
}
</script>

<template>
    <div class="route">
        <h2>路由管理</h2>
        <div class="button-container">
            <el-button type="success" @click="addRoute">新增</el-button>
        </div>
        <el-table :data="routeList" style="width: 100%;" fit>
            <el-table-column prop="tagName" label="路由名称" align="center">
                <template #default="scope">
                    <el-input class="pass-input" v-model="scope.row.tagName" v-show="scope.row.editFlag"></el-input>
                    <span v-show="!scope.row.editFlag">{{scope.row.tagName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="组件名称" align="center">
                <template #default="scope">
                    <el-input class="pass-input" v-model="scope.row.name" v-show="scope.row.editFlag"></el-input>
                    <span v-show="!scope.row.editFlag">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="path" label="组件地址" align="center">
                <template #default="scope">
                    <el-input class="pass-input" v-model="scope.row.path" v-show="scope.row.editFlag"></el-input>
                    <span v-show="!scope.row.editFlag">{{scope.row.path}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="iconName" label="图标" align="center">
                <template #default="scope">
                    <el-icon v-show="!scope.row.editFlag"><component class="icons" :is="scope.row.iconName" /></el-icon>
                    <el-icon class="editableIcon" v-show="scope.row.editFlag" @click="showSelect(scope.row)"><component class="icons" :is="scope.row.iconName" /></el-icon>
                </template>
            </el-table-column>
            <el-table-column prop="belong" label="所属" align="center">
                <template #default="scope">
                    <el-input class="pass-input" v-model="scope.row.belong" v-show="scope.row.editFlag"></el-input>
                    <span v-show="!scope.row.editFlag">{{scope.row.belong}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">{{scope.row.editFlag ? '保存' : '编辑'}}</el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <span>共{{totalNum}}条记录 第{{pageNum}}/{{Math.ceil(totalNum / pageSize)}}页</span>
            <el-pagination layout="sizes, prev, pager, next" :total="totalNum" :page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        </div>
        <IconSelectList :show="showIconSelect" @changeIcon="changeIcon"/>
        <AddRoute :show="showAddRoute" @cancel="hideAddRoute" @add="updateNewData"/>
        <div class="cover" v-show="showIconSelect || showAddRoute"  @click="hideSelect"></div>
    </div>
</template>
    
<style lang="less">
    .route {
        width: 100%;
        min-height: 100%;
        .button-container {
            margin-top: 15px;
        }
        .el-table {
            margin-top: 15px;
            .editableIcon {
                cursor: pointer;
            }
        }
        .pagination-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 50px;
            margin-top: 15px;
        }
        .pass-input {
            .el-input__inner {
                text-align: center;
            }
        }
        .cover {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 10;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, .3);
        }
    }
</style>