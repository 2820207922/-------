<template>
  <div>
    <div id="myChart"></div>
    <el-button @click="getData">开始绘图</el-button>
  </div>
</template>

<script>
export default {
  name: "dataToChart",
  data() {
    return {
      apiData: [],
      receiveValue: [],
      divice_id:"15",
      atrribute:"pitch3_ng5_DC",
      access_token:"c64f499b2e064ac3961b34b1a9d36738.4a0d12300ff303b921be06a48bdc7f1a",
      url:"https://phmlearn.com/component/data/fengji",
      lineShow: false,
      Lineindex: 10,
      timer: 'timer'
    }
  },
  methods:{
    getData() {
      // 数据API
      var httpRequest = new XMLHttpRequest()
      // URL填写
      // 请求方法
      httpRequest.open('POST', this.url)
      // 请求头
      httpRequest.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
      )
      var _this = this
      // 请求参数
      httpRequest.send(`divice_id=${this.divice_id}&atrribute=${this.atrribute}&access_token=${this.access_token}`)
      httpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const result = JSON.parse(httpRequest.responseText)
          // 返回结果
          console.log(result)
          _this.receiveValue = result.data.data
          for (var i = 0; i < 8; i++) {
            _this.apiData.push(_this.randomData(i))
          }
          _this.startPushParam()
        }
      }
    },

    startPushParam() {
      this.timer = setInterval(this.handlerData, 1000)
    },

    handlerData() {
      for (var i = this.Lineindex; i < this.Lineindex + 1; i++) {
        this.apiData.shift()
        this.apiData.push(this.randomData(i))
      }
      this.Lineindex += 1
      this.drawLine()

    },

    randomData(i) {
      return {
        name: String(new Date()),
        value: [new Date(),this.receiveValue[i]]
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var option = {
        title: {
          text: '实时监控图'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            params = params[0]
            var date = params.value[0]
            return (
                date.getSeconds() +
                '/' +
                date.getMinutes() +
                '/' +
                date.getHours() +
                '/' +
                ' : ' +
                params.value[1]
            )
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: this.apiData
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myChart'))
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myChart")) : instanceByDom
      // 将echarts实例内的对象清空，再重新注入
      myChart.clear()
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      // resetSize
      window.onresize = function () {
        myChart.resize();
      };
    }


  }

}
</script>

<style scoped>
#myChart{
  width: 100%;
  height: 400px;
}
</style>