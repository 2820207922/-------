<template class="topBox">
  <div class="topItem">
    <!-- 通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。 row代表行，col代表列-->
    <el-row>
      <el-col :span="3">
        <!-- Icon 图标：提供了一套常用的图标集合。直接通过设置类名为 el-icon-iconName 来使用即可。 -->
        <i class="el-icon-arrow-left" style="font-weight: bold" @click="goBack" />
      </el-col>
      <el-col :span="17">
      </el-col>
      <el-col :span="3">
        <i class="el-icon-s-home" style="font-weight: bold" @click="home" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'topBarA',
  // 数据区域
  data() {
    return {

    }
  },
  // 组件初始化前的准备操作，在此处执行
  created() {
    // 事件监听，this.$bus.$on事件一般在此处定义

    // 初始数据载入

  },
  // 组件初始化后需要进行的操作，在此处执行
  mounted() {
    // 组件渲染，传递参数，this.$bus.$emit

  },
  // JS方法
  methods: {
    goBack() {
      this.$router.back()
    },
    home() {
      if (this.$route.path !== '/home') {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped>
.topBox{
  width: 100%;
  text-align: center;
}
.topItem{
  width: 100%;
  text-align: center;
}
.textContent .el-icon-arrow-left{
  padding-top:3%;
}
</style>
