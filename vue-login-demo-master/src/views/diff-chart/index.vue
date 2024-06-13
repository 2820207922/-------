<template>
  <div>
    <btn/>
    <charts/>
  </div>
</template>

<script>

import Btn from './components/btn'
import Charts from './components/charts'
export default {
  name: 'index',
  components: {Charts, Btn},
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
