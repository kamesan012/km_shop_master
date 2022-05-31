<script setup>
import { reactive, ref } from 'vue'
import { login } from '../apis/user/index'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const form = reactive({
    username: '',
    password: ''
})

const ruleFormRef = ref()

const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ]
})

// 创建路由对象
const router = useRouter()

const onSubmit = (ruleFormRef) => {
    ruleFormRef.validate(async (valid, fields) => {
        if (valid) {
            const data = await login(form).catch(() => {})
            if (data.code === 200) {
                ElMessage({
                    message: '登录成功',
                    type: 'success'
                })
                sessionStorage.setItem('token', data.data.token)
                sessionStorage.setItem('info', JSON.stringify(data.data.info))
                router.push('/Layout')
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
</script>

<template>
    <div class="login">
        <div class="img-container">
            <!-- <img src="../assets/back.png"> -->
        </div>
        <div class="input-container">
            <h2>用户登录</h2>
            <el-form :model="form" :rules="rules" ref="ruleFormRef" @keyup.enter="onSubmit(ruleFormRef)">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" show-password v-model="form.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="reg-link-container">
                <a href="" @click.prevent="router.push('/Register')">没有账号？注册一个</a>
            </div>
        </div>
        
    </div>
</template>

<style lang="less">
    .login {
        display: flex;
        height: 100vh;
        .img-container {
            width: 70%;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .input-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 30%;
            border-left: 1px solid #ccc;
            h2 {
                width: 80%;
                text-align: center;
                margin-bottom: 30px;
            }
            .el-form {
                width: 80%;
                .el-form-item {
                    label {
                        min-width: 60px;
                    }
                    .el-form-item__content {
                        justify-content: center;
                        .el-button {
                            box-sizing: content-box;
                            width: 96px;
                            padding: 0;
                        }
                    }
                }
            }
            .reg-link-container {
                width: 80%;
                text-align: right;
            }
        }
    }
</style>
