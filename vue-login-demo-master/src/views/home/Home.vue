<template>
  <div class="image">
    <el-image :src="img1_url" :fit="fit" @click="form"></el-image>
    <el-image :src="img2_url" :fit="fit" @click="monitor"></el-image>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      fit: 'scale-down',
      img1_url: 'https://img1.baidu.com/it/u=1678285,4252925767&fm=253&fmt=auto&app=138&f=JPEG?w=506&h=300',
      img2_url: 'https://zhengxin-pub.bj.bcebos.com/mark/f7c3bddc49cb20d9176da52c0a0aa00e.jpg',
    }
  },
  created () {
  },
  // data() {
  //   return {
  //     user: {
  //       uname: "",
  //       uid: null,
  //     },
  //   };
  // },
  methods: {
    form() {
      if (this.user.position == "管理员" || this.user.position == "主管") {
        this.$router.push('/findform')
      }
      else {
        this.$message('你没有此权限')
      }
    },
    monitor() {
      this.$router.push('/surveillance')
    }
  },
  mounted() {
    if (sessionStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.user = JSON.parse(sessionStorage.getItem('userInfo'));
      console.log(this.user)
    }
  },
};
</script>

<style scoped>

.image {
  display: flex;
  width: 500px;
  height: 250px;
  margin: 0 auto;
  /* padding: 10px 100px; */
}

</style>