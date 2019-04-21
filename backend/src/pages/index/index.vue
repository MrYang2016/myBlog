<template>
  <div>
    <el-container class="backend-content">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>文章管理
            </template>
            <el-menu-item-group>
              <router-link to="/">
                <el-menu-item index="1-1">
                  <i class="el-icon-circle-plus-outline"></i>新增
                </el-menu-item>
              </router-link>
              <router-link to="/docList">
                <el-menu-item index="1-2">
                  <i class="el-icon-edit"></i>编辑文章
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="height:auto;">
          <h1>羊锡贵的博客管理后台</h1>
        </el-header>

        <router-view style="margin:20px;"></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.backend-content {
  height: 100%;
  width: 100%;
  position: fixed;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

