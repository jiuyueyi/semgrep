<template>
  <div style="width: 100%; height: 100%;">
    <component v-bind:is="templateType" ref="template"></component>
  </div>
</template>

<script>
  import TempRight from './template/tempRight/TempRight'
  import TempLeftRight from './template/tempLeftRight/TempLeftRight'
  import TempPortal from './template/tempPortal/TempPortal'
  import TempXc from './template/tempXc/TempXc'
  import TempCenter from './template/tempCenter/TempCenter'
  import TempNone from './template/none/TempNone'
  import TempDef from './template/tempDef2/TempDef'
    export default {
      components: {
        TempNone,
        TempDef,
        TempXc,
        TempRight,
        TempLeftRight,
        TempCenter,
        TempPortal
      },
      data () {
        return {
          templateType: 'TempNone'
        }
      },
      created () {
        this.getLoginModeSupport()
      },
      methods: {
        async getLoginModeSupport () {
          const type = {
            temp_def: 'TempDef',
            temp_xc: 'TempXc',
            temp_left_right: 'TempLeftRight',
            temp_center: 'TempCenter',
            temp_right: 'TempRight',
            temp_portal: 'TempPortal'
          }
          var _this = this
          this.templateType = ''
          await this.$axios.get('ulp-sso/sso/getLoginModeSupport' + window.location.search).then(res => {
            if (res && res.status === 200) {
              let config = {}
              if (res.data && res.data.data) {
                config = res.data.data
                if (res.data.data.appExtend) {
                  _this.templateType = type[res.data.data.appExtend.templateType]
                  if (res.data.data.appExtend.theme) {
                    document.body.style.setProperty('--themeColor', res.data.data.appExtend.theme);
                  }
                }
                _this.templateType = _this.templateType ? _this.templateType : 'TempDef'
                _this.$store.commit('refreshLoginConfig', config)
                this.$nextTick(() => {
                  if (_this.$refs.template) {
                    _this.$refs.template.refreshLogin(config)
                  }
                })
              } else {
                return _this.$message.error(res.data.message ? res.data.message : '获取登录配置异常,请联系管理员')
              }
            } else {
              _this.$message.error('获取登录配置异常,请联系管理员')
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
