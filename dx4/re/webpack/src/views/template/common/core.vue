<template>
  <div id="homepage_login">
    <div class="right_qr_lo" v-show="showChange">
      <div class="sms_qr_switcher no-select" id="sms_qr_switcher" @click="changeLoginType">
        <img v-show="loginType=='sms_code'" @mouseenter="loginTypeOver=true" @mouseleave="loginTypeOver=false"
             :src="imgs['temp-code-container']" alt="扫码登录">
        <img v-show="loginType!=='sms_code'" @mouseenter="loginTypeOver=true" @mouseleave="loginTypeOver=false"
             :src="imgs['qr-code-container']" alt="短信登录" style="padding-top: 0;">
      </div>
      <div class="Scavenging no-select">
        <img v-show="loginType=='sms_code' && loginTypeOver" src="../../../assets/images/login/qr_group.svg" alt="扫码登录">
        <img v-show="loginType!=='sms_code' && loginTypeOver" src="../../../assets/images/login/pass_group.svg"
             alt="短信登录">
      </div>
    </div>
    <div class="right_qr_lo sms_qr_switcher" v-show="!showChange"></div>
    <div class="login_img">
      <p>
        <img :src="getImgUrl()" class="align-middle no-select" ondragstart="return false">
        <span class="font-bold text-3x p-l-4 align-middle">{{appName}}</span>
      </p>
    </div>
    <div>
      <div id="qr-code-container" class="qr-code-container" v-show="loginType!=='sms_code'">
        <div class="qrcode_box">
          <div>
            <div class="qrcode_title">
              <a href="javascript:void(0);" data-toggle="#qrcode_layer_dd" v-show="qrTypes.includes('ding_ding')"
                 :class="{'active':qrType=='ding_ding'}" @click="changeQrType('ding_ding')">钉钉登录</a>
              <a href="javascript:void(0);" data-toggle="#qrcode_layer_dd" v-show="qrTypes.includes('qr_code')"
                 :class="{'active':qrType=='qr_code'}" @click="changeQrType('qr_code')">APP扫码登录</a>
            </div>
          </div>
          <ding-talk v-show="qrType=='ding_ding'" ref="DingTalk"></ding-talk>
          <yto-qr v-show="qrType=='qr_code'" ref="YtoQr"></yto-qr>
        </div>
      </div>
      <account v-show="loginType=='sms_code'" ref="Account"></account>
      <div class="brower-down">
        <a class="chrome-link" href="https://www.google.cn/intl/zh-CN/chrome/"  target="_blank" title="非推荐浏览器，请下载最新版本">下载推荐浏览器</a>
      </div>
    </div>
  </div>
</template>

<script>
  import DingTalk from '../../logintype/DingTalk';
  import Account from '../../logintype/Account';
  import YtoQr from '../../logintype/YtoQr';

  export default {
    name: 'Core',
    components: {
      DingTalk,
      Account,
      YtoQr
    },
    data() {
      return {
        // 登录类型
        loginType: '',
        qrType: '',
        qrTypes: [],
        showChange: true,
        loginTypeOver: false,
        appName: '',
        logos: [],
        imgs: {
          'yto-logo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABXFBMVEUAAABHCGxHCWhHB2xHCGxHCGxHCGtHB2xIB21HCGxHCG1ICW1ICGtHB2xGCW1GB2tOAHZNAGZVAIBHCGtHCGxHCGz/////ALnAq839ALhPEnKLZKP0ALRpNoe9psqYdKxKDG5JCW3Pv9nYAahRB3BMB26uk7+ffrKSbai4ApuRBItfKX9vBX3v6fLjAK2OaKXHAqG8Ap2tA5abBI9RFnTp4u24n8aaeK+GXZ5sOoqBBYRbJHxYH3lcBnVWB3JND3Ds5vC6o8iymMH4ALahgbTfAayVcaqKYaGwA5h7TpZ5S5R0RZBxQI1kL4NVGndjBnfz7/Xx7fTm3eusj7ylhreigrSce7ChA5KKBIhoM4Z9BYN3BYB0BX9oBnlYB3P/zPHj2unXyd/FstGnibmniLjnAK/CAp+BVpp1RpH18vfb0OLLudX/TM7gXsbKObLtALHeFLDOAqW6HKNzRJBrCzP3AAAAFXRSTlMA+RbtxL8/zbKln5R4b1RFDQoG397aOxCUAAADjElEQVRIx6VXh1IiQRAFgTMiKrQIS86IkkWQJIog0axnvDN7Of1/1U3PRhEXqH1VQG/VPl5v95veGVV/zBtmprQmjVqtMWmnZgzzqqExptep4RXUOv3YUNQPEyJTyp/4MJiqhXehlaePTYIsJmWSn9XAAGhm36EuTMMQmF7ox53TwVDQzfV53HEYEuNjb3SROyy7R3tBByNA9/q5p2EkTL/qEYyIWUmxNKOSNWLRJmEg9nb/hFekXhP8PJi7sm02my0fQQTvc+1g8o4ZYfNLVsnQwj4zi5U30hODyf5tlrwHF/F4nM1+gpZaDYMRplwvQJL8pAChxoLrMcouEbyQwOpY6sHPvxt+8MWRWwSIkt8LoNATMjVmZJHglgTriz34hIU688P1Bj7wBhbdx5mUzEk2awfe+ALW1V7ydzbhG0AUf5E4zk+1eZWBjTp4owec/YQROyh39YjhFXAwqGa46A5v/bdJvlY9BLd4ue/x/PjttVF2AlJeGjwBjxnVFBfl8O4D/KrjZRAjJ9unZWqv6yTlRn0CeUq01zcu0UMXFv0AU7ACi0sLYe1eUm5RajIjH7Y5MoMXpxitA48EoT2WiHzYByKMKnE1eiTCqxJhvkNuG64MCTQq0V+FAJJjwHf7VLKoMOOSzWw5k5LVErJrjTDWULi8icWzQo8yfXIpWZJ2DOVCGNFuB0FEgpbKjFiWpm0ShA9RuMwL76cBiklptUtPdE3fCGST2CoG5WoY1TA6AbiJmuN7Yp8BlvFPkmKrBJO4PxPGZpl7dhQu7SAnyjksDARJlHYLJhHsWRcsFcLomOhQktTb4LOht0V7GgRh7Cwv/KVLopRF4HpL4lBICQuDX5JZaimh6Pdse70s1ZbiJx9mkxSWJDcMIOhwOCq0s8cOgi4/rlPh8NmFX3RLIpHgm6WjY+gd2HMQcbkj+XwLrPkGRFpuOG+6oZUDFnqZAfhcDdVzp6HW0QMTtH9lzreywQ751GvVBjcAZUZvhWEqcHwEASts2Z1w4mTuCkvZQrvSSLOjV27oZ+x2BjIZdyBNyAycNO2hfLcZOLfGnOzQl3vdNI6qTKzZdgYenOuEHMmE7iOZWOC5Ggxxrxs56UgHCrhQ03Yok0y7OYB82wUduyA8+BVb67+dU/RyV7KtULKhUbSVUrKJU7J9VLJxVbhlVr5ZV35MUH5AUX40Un4oE4+DRjwOGmWOg/8BjIEe4SmAYbkAAAAASUVORK5CYII=',
          'temp-code-container': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAwCAYAAABT9ym6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowRTQwNDQ3MTkwMTFFQTExQjk5QkEwMzQwMEU3ODEwNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QUZGMkFBOTExOUUxMUVBQkE5MUQwQjRDNzIzQjY3MiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QUZGMkFBODExOUUxMUVBQkE5MUQwQjRDNzIzQjY3MiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBFNDA0NDcxOTAxMUVBMTFCOTlCQTAzNDAwRTc4MTA0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBFNDA0NDcxOTAxMUVBMTFCOTlCQTAzNDAwRTc4MTA0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mK6EeAAAA8pJREFUeNrsWV9IU1EYP+b+SNMw5ky2NB/KhyaZYJYsajOS/ghBkEEvPVUPQU+9FfUQPQaBIPTgS/WSBUa4LEN9CSxTMNBQSNHAoSN1THK6udn33Z075r37c+71zt079sGPXc6957v7ds75fb/vW8EWGMkB20NyxPKB5APJB5IPRFumS3ajq+vtjhxXV1eTxsYT3PXw8A8yOzu7I39tbdfSrsh9wFYurMgzgBfQCdALHygsLCQlJSVMzsLhMFldXU35DPpCnyyGvtCnlK31CvAXgPvJJHxxS8t5Jmc+n4/09X1J+UxT0ylSWlrK5A99oU+ph70XcA6wlAuH/TvgNOAT4JDw4YGBQbK2trZtrKGhgVRUHJD84kAgQPr7B0TjNTU1gCOKsNYkwEGDqY2/gUEIAwmHN2X9gpFIROQLLRQKKppH5gFnAF9zISGuAFoAH3IhswcAVyk1azOzxx8DwC3AAhzsB8IzYTabZb0Yc4nFYhGNm0ymjAVCaOZ/COy0CJ/PldBoRUVFxOVyZk00tgNuAIKa21ooEQTZ9Q1VAd2Y+IWSgkV2sBqrPGEKBF+cQHb0A1wAN0BSNhwa+qa6emSUqoAZVW8trCcY7DdVAZ8Bx+JvlJWVJbzOlBUo1J9DOfsecFbrpS6ywQVKAFmxpCvS0+OWlecAHYDblZUHSV1dHTe4vr5OpqenaX2zj1RVVW6btLCwSEZGRlI6bm29LO+MJFKmjCrgDn63jY3gI34QA5mY+MVd22xWUSCoFmS+L+NdlMeAuzQwdSRELEtllrodtBfwGmBMNc9ms6XtkmRrRXh7B7gI8KtB/W6r6rBEFZrBYCB6vT7ZtEFKy9gTqIipUCAZ/lzodDpiNIoXbXl5hWxuRtV2eblFuUD8fn/CLondfhRgTzV1LC5xHubJxO3+GCMAh8MhmoRMxus8lgbdbtkMlTSjWd9aCtgiFZvdtPUUo3q+pYrkwve9rFYrcw9stwPhBDXgEuAl4DrXHFjxcf1hfpvyX7621q4a1kpmQVqgtWdlaxUXFxOn05mgzt7LPM9oNPBMF4Ff/x7dbk9QLuG4xVIemzc1NQXbLsqS9fXHlQsEaTIdDbLOQ7qmTPcUJQ3gBdVqMZub+xNjrXSBqOWPnk7adgpkbGslKXUl1djj4xPE4/GIVqm52cVde71eMjb2ExuBfENwv9T6Xk7zQbIhvQp9xCuBUCjE38cWLbZqse9sU5PWkmPjVAVMZqPUzYSZaZfmpFZXhLclmv17tR4I2j/AFRL9a1DTgXBcALhJon/aJrX/AgwAXGlEflBbt4oAAAAASUVORK5CYII=',
          'qr-code-container': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAwCAYAAABT9ym6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowRTQwNDQ3MTkwMTFFQTExQjk5QkEwMzQwMEU3ODEwNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RkE4REQ3NTExOUUxMUVBQkVCMDg0MUNDQURBMENBQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4RkE4REQ3NDExOUUxMUVBQkVCMDg0MUNDQURBMENBQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBFNDA0NDcxOTAxMUVBMTFCOTlCQTAzNDAwRTc4MTA0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBFNDA0NDcxOTAxMUVBMTFCOTlCQTAzNDAwRTc4MTA0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1+vUpQAAArJJREFUeNrsmT9oE1Ecx39XmybF2MRAIJglg+nkkIBdTFFEEHFQFIPi4iDqIDi5KQiKo1NBcOiiIIqD4lIXB8EhobYGKSTUUtJKRBOLRpO72KDx+7u8KkpiLv/7HvnBhzty7y7ve/fe+/15WgVGCtgQKWIDIQMhAyEDIXLZcKMGuVyOZmdfUaFQ6EsHnU4nTUzsJq/X2/CLXAZ1nWIsFu+bCDb+b+6DlS9yC2TBNLD928AwDPPo9+8A/p6KyGQy4P3vPlgZWvfAJ/AIbK3V0O12UyAQ6KmQYrFoCml2ss+AA2BNhVWLB+MkWFFh+U2BCFhQwY9kwF7wUgWH+BkcBE9V8Oy87h0XS7P0IcoPcA7cVCHWYs9/FVwCP1UIGqfAabCuQvT7EBwG31QI45+D/eCjCvnInIgCllVIrJZEFPBGhQzxA9gHXmzqDPFPSK1TNpurd/kLOATug2OdC+P1zgtJp9Mm/7ESiILb4LzsxQeOAi6A6xs/hMMhikZPUDC4U8oqyjVwkYX5fD7SNI342FchbXSAh9ipWCz+PZlM0fz865Y7aaUPWqNdhXK5TIuLbymfz1Ol0lyYVSgU+T52nE/AmMfjodFRh+X7NW2IXC4XjY8HyWaztSekHeMXkEgk+DTENYFIZI+vW5WYXlUaE8JxLsk22WvZsghp5rrx8LaGVqlUMoeOYZRqp5eG8VeV0uUao5ER+zacPqZq6ck0njehUIgcDkfLfRlu5y0kk0laXX1nuX0+/5VE+M9pwF1wcuOa3W6Hzwn3Z2jput7qresiQZvqwLO6v2pZtCvgBvdFdiFsZ8EdsEV2IWxHwAOe+7ILIbE8c0Fwu+xC2HaBZ6CpEGAz7iEuiCggJbsQthUxzOKyC2FbE95/RnYhZtoOjlJ1a1BqIWZKBM5QddO2rv0SYABfHdQ1x+GfDAAAAABJRU5ErkJggg=='
        }
      }
    },
    created() {
      this.getImgsFile()
    },
    methods: {
      changeQrType(type) {
        this.loginType = this.qrType = type
        this.$store.commit('refreshLoginType', this.loginType)
        switch (type) {
          case 'ding_ding':
            this.toLoginDD()
            break
          case 'qr_code':
            this.toYtoQr()
            break
          default:
        }
      },
      changeLoginType() {
        this.loginType = this.loginType === 'sms_code' ? this.qrType : 'sms_code'
        this.$store.commit('refreshLoginType', this.loginType)
      },
      getImgsFile() {
        const paths = require.context('../../../assets/images/syslogo', true, /.png$/).keys()
        const imgFiles = []
        paths.flatMap(item => {
          const filePath = item.replace('./', '')
          imgFiles.push(filePath)
        })
        this.logos = imgFiles
      },
      getImgUrl() {
        const logo = this.$store.state.loginConfig.applicationLogoUrl
        if (logo && this.logos.includes(logo)) {
          return require('../../../assets/images/syslogo/' + logo)
        } else {
          return require('../../../assets/images/syslogo/yto.png')
        }
      },
      getLoginModeSupport(config) {
        var _this = this
        _this.qrTypes = []
        if (config) {
          if (config.appExtend && config.appExtend.backTitle) {
            this.appName = config.appExtend.backTitle
          } else {
            this.appName = '信息系统导航'
          }
          let lt = ''
          for (let i = 0; i < config.supportLoginModes.length; i++) {
            _this.qrTypes.push(config.supportLoginModes[i].mode)
          }
          if (_this.qrTypes.includes('ding_ding')) {
            lt = 'ding_ding'
          } else if (_this.qrTypes.includes('qr_code')) {
            lt = 'qr_code'
          } else if (_this.qrTypes.includes('sms_code')) {
            lt = 'sms_code'
          }
          _this.loginType = _this.qrType = _this.loginType ? _this.loginType : lt
          _this.showChange = _this.qrTypes.length > 1 && _this.qrTypes.includes('sms_code')
        }
        _this.$store.commit('refreshLoginType', _this.loginType)
        _this.getCurrentSelectConfig()
      },
      toLoginDD() {
        const _this = this
        this.$nextTick(() => {
          _this.$refs.DingTalk.obtainDDQRCode()
        })
      },
      toLoginAccount() {
        const _this = this
        this.$nextTick(() => {
          _this.$refs.Account.obtainAcountCode()
        })
      },
      toYtoQr() {
        const _this = this
        this.$nextTick(() => {
          _this.$refs.YtoQr.obtainYtoQRCode()
        })
      },
      getCurrentSelectConfig() {
        switch (this.loginType) {
          case 'ding_ding':
            this.toLoginDD()
            break
          case 'sms_code':
            this.toLoginAccount()
            break
          case 'qr_code':
            this.toYtoQr()
            break
          default:
        }
      }
    }
  }
</script>

<style scoped>
  .no-select {
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none
  }

  .align-middle {
    vertical-align: middle
  }

  .font-bold {
    font-weight: 700
  }

  .text-3x {
    font-size: 24px
  }

  .p-l-4 {
    padding-left: 20px
  }

  .chrome-link {
    display: inline-block;
    font-size: 12px;
    color: #7D8790;
    margin-top: 10px;
    padding: 5px;
    text-decoration: none;
  }

  .chrome-link:hover {
    color: #824c96;;
    color: var(--themeColor);
  }

  #homepage_login {
    width: 100%;
    border: 1px #d6d9dc dashed;
    padding-bottom: 20px;
    height: 500px;
  }

  .right_qr_lo:after, .other:after, .application_list:after, .qrcode_box:after {
    clear: both;
    content: '';
    display: block;
  }

  .right_qr_lo > div {
    float: right;
  }

  .sms_qr_switcher {
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    width: 50px;
    height: 48px;
    display: inline-block;
  }

  .sms_qr_switcher img {
    height: 100%;
    cursor: pointer;
  }

  /*授权码样式*/

  #temp-code-container input {
    border-bottom: 1px solid rgba(220, 223, 230, 1);
    border-top: 0;
    border-left: 0;
    border-right: 0;
    width: 100%;
    padding: 26px 0 26px 1em;
  }

  #temp-code-container input:focus {
    border-bottom: 1px solid #824c96;;
    border-bottom: 1px solid var(--themeColor);
    outline: none;
  }

  button {
    font-size: 14px;
    background: #824c96;;
    background: var(--themeColor);
    padding: 5px 8px;
    border-radius: 4px;
    color: #fff;
    width: 100%;
    height: 35px;
    border: 0;
    margin-top: 20px;
    cursor: pointer;
  }

  .qr-code-container {
    display: block;
    padding-top: 0.6em;
  }

  .Scavenging {
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin-top: 6px;
  }

  .Scavenging img {
    display: block;
  }

  .login_img img {
    width: 60px;
  }

  .login_img > div {
    position: relative;
    margin-left: 40px;
    float: left;
    top: 11px;
  }

  .login_img > div > h2 {
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 15px;
  }

  .login_img {
    text-align: center;
  }

  .qr-code-container {
    display: block;
    padding-top: 0.6em;
  }

  .qrcode_box {
    padding: 0 20px;
    text-align: center;
    position: relative;
  }

  .qrcode_title {
    font-size: 16px;
    font-weight: bold;
    position: relative;
    margin: 0 4px 8px;
    border-bottom: 0px solid rgba(247, 247, 247, 1);
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
    border-bottom: 3px solid #824c96;;
    border-bottom: 3px solid var(--themeColor);
    color: var(--themeColor);
  }

  .brower-down {
    position: absolute;
    bottom: 5px;
    width: 100%;
    text-align: center;
  }
</style>
