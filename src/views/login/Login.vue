<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
          <div class="card mt-5">
            <div class="card-header bg-white">
              <h3 class="text-center mb-0 text-secondary">{{$conf.logo}}</h3>
            </div>
            <div class="card-body">
              <el-form ref="ruleForm" :rules="rules" :model="form">
                <el-form-item prop="username">
                  <el-input v-model="form.username" size="medium" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="form.password"
                    size="medium"
                    type="password"
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="medium"
                    class="w-100"
                    @click="submit"
                    :loading="loading"
                  >{{loading? '登录中...' : '立即登录'}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from 'network/login'

export default {
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(e => {
        if (!e) return
        // 提交表单
        this.loading = true
        // 发送登录请求
        login(this.form)
          .then(res => {
            if (res.data.meta.status !== 200) {
              this.$message.error(res.data.meta.msg)
              this.loading = false
              return
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: 'success'
              })
              // 存储到vuex
              // 存储到本地存储
              this.$store.commit('login', res.data.data)

              this.loading = false
              // 跳转后台首页
              this.$router.push('/home')
              console.log(res.data.data)
            }
          })
          .catch(err => {
            this.loading = false
          })
      })
    }
  }
}
</script>

<style>
</style>
