<template>
  <div class="col h-full animate-wrap no-select" ondragstart="return false">
      <img class="up-angle" src="../../../assets/images/defui/up2.png">
      <!-- 动画 -->
      <div class="animate-body" id="animate-body">
        <img src="../../../assets/images/defui/main2.png" class="animation animation-main">
        <img src="../../../assets/images/defui/cloud2.png" class="animation animation-cloud cloud">
        <img src="../../../assets/images/defui/anquan2.png" class="animation animation-anquan anquan">
        <canvas id="canvas" class="canvas-stars"></canvas>
      </div>
      <img class="downbl" src="../../../assets/images/defui/downbl2.png">
  </div>

</template>

<script>
    export default {
        data () {
          return {
          }
        },
        mounted() {
            // this.drawCanvans();
        },
        methods: {
            drawCanvans() {
              const canvas = document.getElementById('canvas');
              const ab = document.getElementById('animate-body');
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = '#FF0000';
              ctx.fillRect(0, 0, 60, 30);
              console.log(ab.clientWidth)
            }
        }
    }
</script>

<style scoped>
  .h-full {
    height: 100%
  }

  .no-select {
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none
  }

  .col {
    float: left;
    width: 100%
  }
  .downbl{
    width: 100%;
    position: absolute;
    bottom: 0;
    max-height: 180px;
  }
  .canvas-stars{
    position: absolute;
    left: 43%;
    width: 11%;
    top: 2%;
  }
  .up-angle{
    position: absolute;
    top: 0;
    left: 0;
    width: 22%;
    height: auto;
    max-width: 300px;
  }
  .anquan{
    position: absolute;
    left: 45%;
    width: 11%;
    top: 10%;
  }
  .cloud{
    position: absolute;
    width: 5.6%;
    left: 15%;
    top: 12%;
  }

  .animate-wrap {
    position: relative;
    overflow: hidden;
    background-color: #380083;
    background-image: linear-gradient(45deg,#37009f,#39004e);
    background-image: -webkit-linear-gradient(45deg,#37009f,#39004e);
    background-image: -moz-linear-gradient(45deg,#37009f,#39004e)
  }

  .animate-body {
    position: absolute;
    top: 20%;
    right: 0;
    bottom: 0;
    left: 5%;
    height: 670px;
    width: 100%;
    max-width: 550px;
  }
  @media (min-width:1200px) {
    .animate-body {
      max-width: 650px;
    }
    .cloud{
      top: 13%;
    }
    .animate-body {
      left: 10%;
    }
  }
  @media (min-width:1400px) {
    .animate-body {
      max-width: 800px;
    }
    .cloud{
      top: 16%;
    }
    .anquan{
      top:15%;
    }
    .animate-body {
      left: 10%;
    }
  }
  @media (min-width:1600px) {
    .animate-body {
      max-width: 900px;
    }
    .cloud{
      top: 20%;
    }
    .animate-body {
      left: 15%;
    }
  }
  @media (min-width:2000px) {
    .animate-body {
      max-width: 1000px;
    }
    .cloud{
      top: 22%;
    }
    .anquan{
      top:18%;
    }
  }
  @media (min-width:2500px) {
    .animate-body {
      max-width: 1200px;
    }
    .cloud{
      top: 26%;
    }
    .anquan{
      top:20%;
    }
  }
  .animation {
    animation-duration: 1.8s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate
  }

  @keyframes animation-anquan {
    0% {
      transform: translateY(0)
    }

    50% {
      transform: translateY(-15px)
    }

    100% {
      transform: translateY(0)
    }
  }

  .animation-anquan {
    animation-name: animation-anquan;
    animation-duration: 3.6s;
    animation-timing-function: linear;
    animation-direction: normal
  }
  @keyframes animation-cloud {
    0% {
      transform: translateY(0)
    }

    50% {
      transform: translateY(5px)
    }

    100% {
      transform: translateY(0)
    }
  }
  .animation-cloud {
    animation-name: animation-cloud;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-direction: normal
  }
</style>
