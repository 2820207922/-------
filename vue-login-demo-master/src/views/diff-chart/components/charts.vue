<template>
  <div>
    <div v-if="isShow1">
      <histogram/>
    </div>
    <div v-else>
      <line-chart/>
    </div>
  </div>
</template>

<script>
import Histogram from '../../../components/second/chartComp/Histogram'
import LineChart from '../../../components/second/chartComp/LineChart'
export default {
  name: 'charts',
  data () {
    return {
      isShow1: false
    }
  },
  components: {
    Histogram,
    LineChart
  },
  created () {
    this.$bus.$off('emittingChange')
    this.$bus.$on('emittingChange', this.change)
  },
  methods: {
    change() {
      this.isShow1 = !this.isShow1
    }
  }
}
</script>

<style scoped>

</style>
