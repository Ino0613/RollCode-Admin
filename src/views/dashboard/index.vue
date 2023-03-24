<template>
  <div class="admin-dashboard">
    <!-- 顶部导航栏 -->
    <el-header class="admin-header">
      <div class="admin-logo">
        <img src="./assets/logo.png" alt="logo">
        <span class="admin-title">在线刷题平台</span>
      </div>
      <el-menu class="admin-menu" mode="horizontal" :default-active="activeMenu" @select="handleMenuSelect">
        <el-menu-item index="dashboard">仪表盘</el-menu-item>
        <el-submenu index="user">
          <template #title>用户管理</template>
          <el-menu-item index="user-list">用户列表</el-menu-item>
          <el-menu-item index="user-add">添加用户</el-menu-item>
        </el-submenu>
        <el-submenu index="question">
          <template #title>题目管理</template>
          <el-menu-item index="question-list">题目列表</el-menu-item>
          <el-menu-item index="question-add">添加题目</el-menu-item>
        </el-submenu>
        <el-menu-item index="exam">考试管理</el-menu-item>
        <el-menu-item index="settings">系统设置</el-menu-item>
      </el-menu>
      <div class="admin-user">
        <el-dropdown trigger="click">
          <span class="admin-avatar">
            <img src="./assets/avatar.png" alt="avatar">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 主体内容区域 -->
    <el-container class="admin-container">
      <!-- 左侧菜单栏 -->
      <el-aside class="admin-aside">
        <el-menu :default-openeds="['user']" :default-active="activeSubMenu" class="admin-submenu" @select="handleSubMenuSelect">
          <el-submenu index="user">
            <template #title>用户管理</template>
            <el-menu-item index="user-list">用户列表</el-menu-item>
            <el-menu-item index="user-add">添加用户</el-menu-item>
          </el-submenu>
          <el-submenu index="question">
            <template #title>题目管理</template>
            <el-menu-item index="question-list">题目列表</el-menu-item>
            <el-menu-item index="question-add">添加题目</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容区域 -->
      <el-main class="admin-main">
        <router-view />
      </el-main>
    </el-container>

    <!-- 底部版权信息 -->
    <el-footer class="admin-footer">©2023 在线刷题平台</el-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: 'dashboard', // 当前选中的菜单项
      activeSubMenu: 'user-list' // 当前选中的子菜单项
    }
  },
  methods: {
    // 顶部菜单项选中事件
    handleMenuSelect(index) {
      this.activeMenu = index
      if (index === 'user' || index === 'question') {
        this.activeSubMenu = index + '-list'
      } else {
        this.activeSubMenu = ''
      }
    },
    // 左侧子菜单项选中事件
    handleSubMenuSelect(index) {
      this.activeSubMenu = index
    }
  }
}
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.admin-logo {
  display: flex;
  align-items: center;
}
.admin-logo img {
  height: 32px;
  margin-right: 10px;
}
.admin-title {
  font-size: 18px;
  font-weight: bold;
}
.admin-menu {
  line-height: 64px;
}
.admin-user {
  display: flex;
  align-items: center;
}
.admin-avatar {
  display: block;
  width: 40px;
  height: 40
