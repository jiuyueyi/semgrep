<template>
    <div class="custom3-bg" :style="{'background-image': 'url('+bgurl+')','background-color':theme,'background-size':bs,'background-position':bp}">
        <div class="login-content">
          <core ref="core"></core>
        </div>
    </div>
</template>

<script>
  import Core from '../common/core'
  import defBg from '../../../assets/images/login/xc.png'
    export default {
      components: {
        Core
      },
      data () {
        return {
          bgurl: '',
          theme: '',
          bs: '600px',
          bp: '10% 50%'
        }
      },
      methods: {
        refreshLogin (config) {
          if (config) {
            if (config.appExtend) {
              if (config.appExtend.backImg) {
                const url = new URL(config.appExtend.backImg)
                for (const [name, value] of url.searchParams) {
                  if (name === 'background-size') {
                    this.bs = value
                  }
                  if (name === 'background-position') {
                    this.bp = value
                  }
                }
              }
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
  .custom3-bg{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment:fixed;
  }
  .custom3-bgimg{
    height:400px;
    width: 600px;
  }
  .login-content{
    position: absolute;
    margin: auto;
    text-align: center;
    width: 100%;
    max-width: 380px;
    background: #FFF;
    top: calc(50% - 250px);
    right: calc(10%);
  }

</style>
