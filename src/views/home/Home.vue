<template>
  <div class="home">
    <el-container>
      <!-- 顶部区域开始 -->
      <el-header>
        <div class="my-el-header">
          <div class="left">
            <img src="~assets/logo.png" width="40px" alt />
            <span>vue 电商后台管理系统</span>
          </div>
          <div class="right">
            <el-button type="primary" @click="loginOut" size="medium">退出登录</el-button>
          </div>
        </div>
      </el-header>
      <!-- 顶部区域结束 -->

      <el-container class="menu">
        <!-- 侧边栏 布局容器开始-->
        <el-aside :width="menuAsideWidth">
          <!-- 侧边栏 直接容器-->
          <el-menu
            router
            unique-opened
            :collapse-transition="false"
            :collapse="isCollapse"
            :default-active="activePath"
          >
            <!-- :unique-opened="true"->只允许展开一个菜单 -->
            <!-- :collapse-transition="false" -> 关闭动画 -->
            <!-- router -> 导航开启路由模式 -->
            <div @click="toggleMenu" style="height:40px;line-height:40px;text-align:center">| | |</div>
            <el-submenu
              v-for="menuItem in menuList"
              :key="menuItem.id"
              :index="(menuItem.id).toString()"
            >
              <!-- 一级菜单 -->
              <template slot="title">
                <i :class="iconsObj[menuItem.id]"></i>
                <span slot="title" style="padding-left:10px">{{menuItem.authName}}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item
                @click="getCurrentPath('/'+item.path)"
                v-for="item in menuItem.children"
                :key="item.id"
                :index="'/'+item.path"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ item.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 侧边栏 布局容器结束-->

        <!-- 主要内容区域开始 -->
        <el-main>
          <!-- 主内容核心组件 -->
          <router-view></router-view>
          <!-- 面包屑导航开始 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 面包屑导航结束 -->

          <el-card class="box-card">
           
            <!-- 表格部分开发 -->
            <user-list-table></user-list-table>
          </el-card>

          <home-main></home-main>
        </el-main>
        <!-- 主要内容区域结束 -->
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/javascript">
import { menus } from 'network/home'

import HomeMain from './comps/HomeMain'
import UserListTable from './comps/UserListTable'

export default {
  data() {
    return {
      menuList: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false, //切换左侧菜单显示和隐藏
      menuAsideWidth: '200px',
      activePath: '',
      search: '',
    }
  },
  components: {
    HomeMain,
    UserListTable
  },
  created() {
    //获取左侧菜单
    menus().then(res => {
      this.menuList = res.data.data
      // console.log(this.menuList)
    })
    this.activePath = sessionStorage.getItem('activePath')
  },
  methods: {
    //点击左侧菜单获取当前地址
    getCurrentPath(path) {
      sessionStorage.setItem('activePath', path)
      this.activePath = sessionStorage.getItem('activePath')
    },
    //切换左侧菜单显示和隐藏
    toggleMenu() {
      this.isCollapse = !this.isCollapse
      this.menuAsideWidth = this.isCollapse ? '63px' : '200px'
    },
    //退出登录
    loginOut() {
      this.$store.commit('logout')
      console.log(window.sessionStorage.getItem('token'))
      if (window.sessionStorage.getItem('token')) {
        this.$message.error('退出登录失败')
      } else {
        this.$router.push('/login')
        this.$message({
          message: '退出登录成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>
.home,
.el-container {
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.my-el-header {
  display: flex;
}
.my-el-header .right {
  margin-left: auto;
}

.menu > .el-aside {
  overflow: hidden;
}
.menu .el-menu .template {
  text-align: left !important;
  /* margin-left: 0; */
}
.home >>> .el-menu-item-group__title {
  padding: 0;
}
</style>
