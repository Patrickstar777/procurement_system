
<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1']">
        <el-submenu index="1" class="home-menu">
          <template slot="title">
            <i class="el-icon-tickets"></i>商品管理
          </template>
          <router-link to="/home/list">
            <el-menu-item>全部商品</el-menu-item></router-link
          >

          <el-submenu index="1" class="pass-menu">
            <template slot="title"> 已审批 </template>
            <router-link to="/home/examine?pass=true">
              <el-menu-item>已通过</el-menu-item></router-link
            >
            <router-link to="/home/examine?pass=false">
              <el-menu-item>已拒绝</el-menu-item></router-link
            >
          </el-submenu>

          <router-link to="/home/no-examine">
            <el-menu-item>未审批</el-menu-item></router-link
          >
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 16px">
        <span class="pagename">管理员页面</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <router-link to="/home"> <span>物品管理系统</span></router-link>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.el-menu-item {
  font-size: 18px;
}
.el-submenu__title {
  font-size: 18px;
}
.pass-menu .el-menu-item {
  font-size: 16px;
}
.pagename {
  float: left;
  font-weight: 700;
  font-size: 23px;
  margin-left: 600px;
}
</style>


