<template>
  <el-container class="container">
    <el-main class="container-left">
      <left ref="refreshLoginImg"></left>
    </el-main>
    <el-container class="container-right">
      <right ref="refreshLogin"></right>
    </el-container>
  </el-container>
</template>

<script>
import Left from './Left'
import Right from './Right'
export default {
    components: {
      Left,
      Right
    },
    methods: {
      refreshLogin (config) {
        console.log(1)
        this.$refs.refreshLoginImg.getLoginModeSupport(config)
        this.$refs.refreshLogin.getLoginModeSupport(config)
      }
    }
}
</script>

<style scoped lang="less">
.container{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
@media (min-width:900px) {
  .container-left{
    margin: 0;
    padding: 0;
    width: 70%;
  }
  .container-right{
    margin: 0;
    padding: 0;
    width: 30%;
    min-width: 420px;
  }
}
@media (max-width:899px) {
  .container-left {
    display: none!important
  }
}
</style>
