<template>
  <div class="col h-full" style="overflow: auto;">
    <div class="w-full h-full login-wrap">
      <div class="login-body">
        <div class="login-content">
          <core ref="core"></core>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Core from '../common/core';
    export default {
      components: {
        Core
      },
      methods: {
       getLoginModeSupport (config) {
         console.log(3)
          this.$refs.core.getLoginModeSupport(config)
        }
      }
    }
</script>

<style scoped>
  .h-full {
    height: 100%
  }
  .w-full {
    width: 100%
  }
  .col {
    float: left;
    width: 100%
  }
  .login-wrap {
    display: table
  }
  .login-body {
    display: table-cell;
    vertical-align: middle
  }
  .login-content {
    position: relative;
    margin: auto;
    text-align: center;
    width: 100%;
    max-width: 380px;
  }
  .right_qr_lo > div {
    float: right;
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
    color: #824c96;;
    color: var(--themeColor);
  }
</style>
