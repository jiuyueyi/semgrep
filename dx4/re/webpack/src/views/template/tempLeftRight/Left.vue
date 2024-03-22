<template>
  <div :style="{'background-image': 'url('+bgurl+')','background-color':theme}" class="login-bg"></div>
</template>

<script>
    import defBg from '../../../assets/images/login/bg-sso1.gif'

    export default {
        data () {
          return {
            bgurl: '',
            theme: ''
          }
        },
        methods: {
          getLoginModeSupport (config) {
            if (config) {
              if (config.appExtend) {
                this.bgurl = config.appExtend.backImg ? config.appExtend.backImg : defBg
                this.theme = config.appExtend.theme ? config.appExtend.theme : 'var(--themeColor)'
              } else {
                this.bgurl = defBg
                this.theme = 'var(--themeColor)'
              }
            }
          }
        }
    }
</script>

<style scoped>
  .login-bg {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
