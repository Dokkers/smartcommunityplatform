<template>
  <!--整个大盒子-->
  <div class="main">
    <div v-for="(icon, index) in iconList" :key="index">
      <!--每个图标的小盒子-->
      <div class="box">
        <!--放图片的小盒子-->
        <div class="img">
          <img :src=icon.url alt="#" @click="pathTo(icon.path)">
        </div>
        <!--图标名字-->
        <p>{{ icon.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigateView',
  data () {
    return {
      iconList: [{
        name: '社区知识图谱',
        url: require('@/assets/知识图谱.png'),
        path: '#'
      }, {
        name: '社区数字生态',
        url: require('@/assets/社区生态.png'),
        path: 'ecology'
      }, {
        name: '智慧社区模式',
        url: require('@/assets/社区模式.png'),
        path: '#'
      }, {
        name: '冲突消解工具',
        url: require('@/assets/冲突消解.png'),
        path: '#'
      }, {
        name: '社区服务画像',
        url: require('@/assets/服务画像.png'),
        path: '#'
      }]
    }
  },
  methods: {
    pathTo (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.main{
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
.header{
  width: 100vw;
  height: 10vh;
  background-color: #e3e3e3;
}
.box{
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 100px;
  height: 140px;
  margin: 20px;
}
.img{
  width: 100px;
  height: 100px;
  box-shadow: 18px 18px 30px rgba(0,0,0,0.1),
              -18px -18px 30px rgba(255,255,255,1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow .2s ease-in-out;
  position: relative;
}
.img:hover{
  box-shadow: 0px 0px 0px rgba(0,0,0,0.1),
              0px 0px 0px rgba(255,255,255,1),
  inset 18px 18px 30px rgba(0,0,0,0.1),
  inset -18px -18px 30px rgba(255,255,255,1);
  transition: box-shadow .2s ease-in-out;
  cursor: pointer;
}
.img img{
  width: 60px;
  transition: width .2s ease-in-out;
}
.img:hover img{
  width: 58px;
  transition: width .2s ease-in-out;
}
p{
  font-weight: 800;
  color: slategray;
}
</style>
