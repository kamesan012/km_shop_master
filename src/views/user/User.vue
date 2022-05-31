<script setup>
import { onMounted } from 'vue';
import { getUsers, deleteUser, modifyPass } from '../../apis/user/index';
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const userList = ref([])
const totalNum = ref(0)
const pageSize = ref(10)
const pageNum = ref(1)
onMounted(() => {
    getData()
})
const getData = async () => {
    const data = await getUsers({pageSize: pageSize.value, pageNum: pageNum.value})
    const { list, total } = data.data
    list.map(item => {
        item.editFlag = false
    })
    userList.value = list
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
        const data = await modifyPass(row)
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
        '是否删除此用户的数据？',
        '',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(async () => {
            const { uid } = row
            const data = await deleteUser({ uid })
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
</script>
    
<template>
    <div class="user">
        <h2>用户管理</h2>
        <el-table :data="userList" style="width: 100%;" fit>
            <el-table-column prop="username" label="用户名" align="center" />
            <el-table-column prop="password" label="密码" align="center">
                <template #default="scope">
                    <el-input class="pass-input" v-model="scope.row.password" v-show="scope.row.editFlag"></el-input>
                    <span v-show="!scope.row.editFlag">{{scope.row.password}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="identity" label="身份" align="center" />
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
    </div>
</template>

<style lang="less">
    .user {
        width: 100%;
        min-height: 100%;
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
    }
</style>