<template>
  <div class="custom1-bg" :style="{'background-color':theme}" >
    <left></left>
    <div class="login-content">
      <core ref="core"></core>
    </div>
  </div>
</template>

<script>
  import Core from '../common/core'
  import defBg from '../../../assets/images/login/login_bg.jpg'
  import Left from './Left'
  export default {
    components: {
      Left,
      Core
    },
    data () {
      return {
        bgurl: '',
        theme: ''
      }
    },
    methods: {
      refreshLogin (config) {
        if (config) {
          if (config.appExtend) {
            this.bgurl = config.appExtend.backImg ? config.appExtend.backImg : defBg
            this.theme = config.appExtend.theme ? config.appExtend.theme : 'var(--themeColor)'
          } else {
            this.bgurl = defBg
            this.theme = 'var(--themeColor)'
          }
          this.$refs.core.getLoginModeSupport(config)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .custom1-bg{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .login-content{
    position: absolute;
    margin: auto;
    text-align: center;
    width: 100%;
    max-width: 380px;
    background: #FFF;
    top: calc(50% - 250px);
    right: 5%;
  }
  @media (min-width:1400px) {
    right: 10%;
  }

</style>
