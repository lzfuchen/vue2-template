<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style>
.el-footer,
.el-header {
  color: #333;
  background-color: #b3c0d1;
}

.el-main {
  color: #333;
  background-color: #e9eef3;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #d3dce6;
}
</style>
