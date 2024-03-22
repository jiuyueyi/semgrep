<template>
  <div class="qrcode_layer" id="qrcode_layer_dd">
    <div class="img-box">
      <div v-show="!ddRefresh">
        <iframe :src="ddUrl" allowTransparency="true" frameborder="0" scrolling="no" class="qrcode_img_dd"></iframe>
      </div>
      <div v-show="ddRefresh">
        <img src="../../assets/images/login/qr_dingding.png" class="qrcode_img_dd">
      </div>
      <div class="qr_modal" v-show="ddRefresh">
        <img src="../../assets/images/login/qr_refresh.svg" alt="" @click="refreshDDQrCode" class="refresh_qrCode"
             data-code="2">
      </div>
    </div>
    <div class="qr_error_text">{{ refreshMsg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ddQRTimer: '',
      appid: '',
      ddRefresh: false,
      refreshMsg: '请使用钉钉,扫描二维码登录',
      redirect_uri: '',
      ddUrl: ''
    }
  },
  methods: {
    obtainDDQRCode: function () {
      var _this = this
      const config = this.$store.getters.getLoginConfig
      try {
        if (!config) return this.$Message.error('配置异常')
        this.ddUrl = 'https://login.dingtalk.com/login/qrcode.htm?style=margin-top:-37px;&goto=' + config.obj.urlEncodeGoto
        const hanndleMessage = function (event) {
          const origin = event.origin
          // 判断是否来自ddLogin扫码事件
          if (origin === 'https://login.dingtalk.com') {
            const loginTmpCode = event.data
            // 这里url不用进行urlencode编码
            if (loginTmpCode !== '') {
              window.location.href = config.obj.rawGoto + '&loginTmpCode=' + loginTmpCode
            }
          }
        }
        if (typeof window.addEventListener !== 'undefined') {
          window.removeEventListener('message', hanndleMessage, false)
          window.addEventListener('message', hanndleMessage, false)
        } else if (typeof window.attachEvent !== 'undefined') {
          window.attachEvent('onmessage', hanndleMessage)
        }
        setTimeout(function () {
          _this.ddRefresh = false
          _this.refreshMsg = '请使用钉钉,扫描二维码登录'
        }, 500)
        this.ddQRTimer = setTimeout(function () {
          // 遮住原本钉钉自己检查过期后，会在二维码上显示红色的字
          _this.ddRefresh = true
          _this.refreshMsg = '二维码失效，请刷新获取'
        }, 90000)
      } catch (err) {
        console.error(err)
        // ddErrorTipsDiv.html("请使用钉钉,扫描二维码登录");
        // this.$message.error(data?.message ?? '登录失败')
      }
    },
    refreshDDQrCode() {
      this.clearDDQRTimer()
      this.reloadConfig()
    },
    clearDDQRTimer: function () {
      if (this.ddQRTimer != null) {
        clearTimeout(this.ddQRTimer)
        this.ddQRTimer = null
      }
    },
    async reloadConfig() {
      var _this = this
      this.templateType = ''
      console.log(window.location.search)
      await this.$axios.get('ulp-sso/sso/getLoginModeSupport' + window.location.search).then(res => {
        if (res && res.status === 200) {
          let config = {}
          if (res.data && res.data.data) {
            config = res.data.data
          } else {
            return _this.$message.error(res.data.message)
          }
          _this.$store.commit('refreshLoginConfig', config)
          _this.obtainDDQRCode()
        } else {
          _this.$message.error('获取登录配置异常,请联系管理员')
        }
      })
    }
  }
}
</script>

<style scoped>
.img-box {
  display: inline-block;
  border-radius: 2px;
  vertical-align: middle;
  text-align: center;
  position: relative;
  background: #FFFFFF;
  width: 230px;
  height: 230px;
  overflow: hidden;
}

.img-box img {
  width: 100%;
}

.qr_modal {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.93);
  left: 0;
  top: -10px;
  transition: .3s;
}

.qr_modal.active {
  opacity: 1;
  display: block;
}

.qr_modal > img {
  width: 56px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.qrcode_title span {
  color: #3497FA;
}

.qrcode_title > a {
  margin: 0 10px;
  padding-bottom: 15px;
  color: #222222;
  display: inline-block;
}

.qrcode_title .active {
  color: #824c96;;
  border-bottom: 3px solid #824c96;;
  border-bottom: 3px solid var(--themeColor);
  color: var(--themeColor);
}

.qrcode_img_dd {
  width: 220px;
  height: 220px;
}
</style>
