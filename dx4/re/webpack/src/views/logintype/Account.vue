<template>
  <div id="temp-code-container" class="login_center">
    <div class="tmp_code_tips" v-show="errorMsg">
      <i class="el-icon-warning"></i>
      <span id="tmp_code_tips">{{errorMsg}}</span>
    </div>
    <form action="" class="account-form">
<!--
      <input type="text" placeholder="请输入您的工号/手机号" id="username" name="username" v-model="form.userCodeOrMobile"/>
-->
      <input type="text" placeholder="请输入您的工号"  v-model="form.userCode"/>
      <input type="text" placeholder="请输入你的手机号" maxlength="" v-model="form.mobile"/>
      <div style="position: relative">
        <input type="password" value="" placeholder="请输入验证码"  v-model="form.code">
        <div class="code_btn">
          <a href="javascript:void (0);" v-if="!activeCodeTimer" class="send_auth active" id="send_auth" @click="getActiveCode">获取验证码</a>
          <span class="tip-timer" v-else >重新发送（{{activeBtnTxt}}s）</span>
        </div>
      </div>
      <div style="height: 35px">
        <div style="color: green;text-align: left;line-height: 30px" v-show="activeCodeTimer"><i class="el-icon-success"></i>短信验证码已发送</div>
      </div>
    </form>
    <div class="btn_container">
      <button id="btn_temp_code_submit"  @click="loginCode"> 登录</button>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          errorMsg: '',
          activeCodeUrl: '',
          loginUrl: '',
          activeCodeTimer: null,
          activeBtnTxt: 60,
          form: {
            userCode: '',
            mobile: '',
            userCodeOrMobile: '',
            code: ''
          }
        }
      },
      methods: {
          obtainAcountCode: function () {
            const config = this.$store.getters.getLoginConfig
            if (!config) return this.$Message.error('配置异常')
            this.activeCodeUrl = config.obj.step1.url
            this.loginUrl = config.obj.step2.url
          },
          getActiveCode () {
            this.obtainAcountCode()
            /*
            if (!this.form.userCodeOrMobile) {
              this.errorMsg = '请输入工号/手机号'
              return
            }
            */
            this.errorMsg = ''
            if (!this.form.userCode) {
              this.errorMsg = '请输入工号'
              return
            }
            if (!this.form.mobile) {
              this.errorMsg = '请输入手机号'
              return
            }
            /*
            if (this.form.mobile.length !== 11) {
              this.errorMsg = '手机号格式错误'
              return
            }
            */
            var _this = this
            this.$axios.post(this.activeCodeUrl, this.form, { headers: { closeMsg: true } }).then(res => {
                if (res && res.data) {
                  if (res.data.message !== 'OK') {
                    _this.errorMsg = res.data.message
                  } else if (res.data.data) {
                    _this.startActiveTimer()
                    _this.form.code = res.data.data
                  } else {
                    _this.startActiveTimer()
                  }
                }
            })
          },
          startActiveTimer: function () {
            var _this = this
            this.activeCodeTimer = setInterval(function () {
              _this.activeBtnTxt--
              if (_this.activeBtnTxt <= 0) {
                _this.clearActiveTimer()
              }
            }, 1000)
          },
          clearActiveTimer: function () {
            if (this.activeCodeTimer != null) {
              clearTimeout(this.activeCodeTimer)
              this.activeCodeTimer = null
              this.activeBtnTxt = 60
            }
          },
          loginCode () {
            var _this = this
            this.obtainAcountCode()
            this.errorMsg = ''
            if (!this.form.userCode) {
              this.errorMsg = '请输入工号'
              return
            }
            if (!this.form.mobile) {
              this.errorMsg = '请输入手机号'
              return
            }
            if (!this.form.code) {
              this.errorMsg = '请输入短信验证码'
              return
            }
            this.$axios.post(this.loginUrl, this.form, { headers: { closeMsg: true } }).then(res => {
              if (res && res.data) {
                if (res.data.message !== 'OK') {
                  _this.errorMsg = res.data.message
                } else if (res.data.data) {
                  window.location.href = res.data.data
                }
              }
            })
          }
      }
    }
</script>

<style scoped>
  .login_center {
    padding-top: 50px;
    max-width: 270px;
    margin: auto;
    position: relative;
  }

  .login_center .inp_text input.active {
    border-bottom: 1px solid #824c96;;
    border-bottom: 1px solid var(--themeColor);
  }
  /*授权码样式*/

  #temp-code-container input {
    border-bottom: 1px solid rgba(220, 223, 230, 1);
    border-top: 0;
    border-left: 0;
    border-right: 0;
    width: 100%;
    padding: 30px 0 10px 1em;
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
  .code_btn {
    position: absolute;
    right: 0px;
    top: 22px;
    text-align: center;
  }
  .code_btn > a {
    font-size: 12px;
    display: none;
    padding: 5px 8px;
    border-radius: 2px;
    background-color:#824c96;
    background-color: var(--themeColor);
    color: #fff;
  }

  .code_btn > a.active {
    display: block;
  }

  .code_btn > a.time_send_auth {
    cursor: no-drop;
    background-color: #C8C9CC;
  }
  .tmp_code_tips {
    color: #FF7039;
    background: #FFDFD3;
    border: 1px solid #FF7039;;
    padding: 6px 12px;
    font-size: 12px;
    text-align: left;
    width: 100%;
    position: absolute;
    top: 10px
  }
  #btn_temp_code_submit{
    margin-top: 62px;
    margin-bottom: 15px;
  }
  .tip-timer{
    color: #824c96;;
    color: var(--themeColor);
  }
</style>
