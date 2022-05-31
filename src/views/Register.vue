<script setup>
import { reactive, ref } from 'vue'
import { register } from '../apis/user/index'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// 表单里的字段值
const form = reactive({
    username: '',
    password: '',
    verifyPassword: ''
})

// 表单对象
const ruleFormRef = ref()

// 自定义校验规则
const validateVerifyPass = (rule, value, cb) => {
  if (value === '') {
    cb(new Error('请再次输入密码'))
  } else {
    if (value !== form.password) {
      cb(new Error('两次输入的密码不一致'))
    }
    cb()
  }
}

// 表单整体校验规则
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ],
  verifyPassword: [
    { validator: validateVerifyPass, trigger: 'blur' }
  ]
})

// 创建路由对象
const router = useRouter()

// 提交事件
const onSubmit = (ruleFormRef) => {
  ruleFormRef.validate(async (valid, fields) => {
    if (valid) {
      const data = await register(form).catch(() => {})
      if (data.code === 200) {
        ElMessage({
          message: '注册成功',
          type: 'success'
        })
       router.push('/Login')
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
  <div class="register">
    <div class="back-container">
      <img src="../assets/返回.svg" @click="router.back()"><span @click="router.back()">返回</span>
    </div>
    <div class="register-form-container">
      <h2>用户注册</h2>
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
          <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input type="password" show-password v-model="form.password" />
          </el-form-item>
          <el-form-item label="再次输入密码" prop="verifyPassword">
              <el-input type="password" show-password v-model="form.verifyPassword" />
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit(ruleFormRef)">注册</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less">
  .register {
    .back-container {
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

    .register-form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 150px 300px;
      h2 {
        width: 80%;
        margin-bottom: 30px;
        text-align: center;
      }
      .el-form {
        width: 80%;
        .el-form-item {
            label {
                min-width: 120px;
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
    }
  }
</style>
