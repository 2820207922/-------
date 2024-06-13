<template>
  <div>
    <el-button type="success" @click="change(isShow)">change</el-button>
  </div>
</template>

<script>
export default {
  name: 'btn',
  data () {
    return {
      isShow: false,
      api_data: [1, 2, 3, 5, 7, 9, 0, 10]
    }
  },
  methods: {
    change (item) {
      // console.log(item)
      this.isShow = !item
      this.$bus.$emit('emittingChange')
      if (item) {
        this.$bus.$emit('passApi', this.api_data)
      } else {
        this.$bus.$emit('passApi-1', this.api_data)
      }
    }
  }
}
</script>

<style scoped>

</style>
