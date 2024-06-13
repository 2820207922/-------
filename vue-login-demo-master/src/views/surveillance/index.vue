<template>
  <div>
    <div class="block">
      <span class="demonstration">请选择监控设备</span>
      <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
    </div>
    <div id="myChart"></div>
    <el-button @click="startDraw">开始绘图</el-button>
  </div>
</template>

<script>
export default {
  name: "dataToChart",
  data() {
    return {
      show: false,
      counter:0,
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [
        {
          label: '风机',
          value: 'http://phmlearn.com/component/data/fengji',
          children: [{
            label: '设备15', value: '15',
            children: [
              { label: 'ng5 1温度', value: 'pitch1_ng5_tmp' },
              { label: 'ng5 2温度', value: 'pitch2_ng5_tmp' },
              { label: 'ng5 3温度', value: 'pitch3_ng5_tmp' }]
          },
          {
            label: '设备21', value: '21',
            children: [
              { label: 'ng5 3温度', value: 'pitch3_ng5_tmp' },
              { label: 'ng5 2温度', value: 'pitch2_ng5_tmp' },
              { label: 'ng5 1温度', value: 'pitch1_ng5_tmp' }]
          }],
        },
        {
          label: '轴承',
          value: 'http://phmlearn.com/component/data/zhoucheng',
          children: [{
            label: '设备100', value: '100',
            children: [
              { label: '驱动端振动信号', value: 'DE_time' },
              { label: '风扇端振动信号', value: 'FE_time' },
              { label: '工作转速', value: 'RPM' }]
          },
          {
            label: '设备108', value: '108',
            children: [
              { label: '驱动端振动信号', value: 'DE_time' },
              { label: '风扇端振动信号', value: 'FE_time' },
              { label: '工作转速', value: 'RPM' }]
          }],
        },
      ],
      apiData: [],
      receiveValue: [],
      url: "",
      url_text: "",
      access_token:
        "b0e2ad69260d4debb7f7d4345ddc99ed.98225421ac30d7ae6ac21055bb8e6a35",
      lineShow: false,
      Lineindex: 10,
      timer: "timer",
    };
  },
  methods: {
    startDraw() {
      if (this.counter === 0) { // 当计数器为0时刷新页面
        this.getData();
        this.counter++; // 计数器加1
      } else {
        // 当计数器为1时执行查询操作
        location.reload();
        this.getData();
        this.counter++; // 计数器加1
      }
    },

    handleChange(value) {
      // console.log(value)
      this.url = value[0]
      this.url_text = `divice_id=${value[1]}&atrribute=${value[2]}&access_token=${this.access_token}`
      //console.log(this.url_text)
    },

    getData() {
      // 数据API
      var httpRequest = new XMLHttpRequest();
      // URL填写
      // 请求方法
      httpRequest.open("POST", this.url);
      // 请求头
      httpRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      var _this = this;
      // 请求参数
      httpRequest.send(this.url_text);
      // httpRequest.send('divice_id=' + this.divice_id + '&atrribute=' + this.atrribute + '&access_token=' + this.access_token);
      httpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const result = JSON.parse(httpRequest.responseText);
          // 返回结果
          console.log(result);
          _this.receiveValue = result.data.data;
          for (var i = 0; i < 8; i++) {
            _this.apiData.push(_this.randomData(i));
          }
          _this.startPushParam();
        }
      };
    },

    startPushParam() {
      this.timer = setInterval(this.handlerData, 1000);
    },

    handlerData() {
      for (var i = this.Lineindex; i < this.Lineindex + 1; i++) {
        this.apiData.shift();
        this.apiData.push(this.randomData(i));
      }
      this.Lineindex += 1;
      this.drawLine();
    },

    randomData(i) {
      return {
        name: String(new Date()),
        value: [new Date(), this.receiveValue[i]],
      };
    },
    drawLine() {
      var option = {
        title: {
          text: "实时监控图",
          left: "1%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        toolbox: {
          right: 10,
        },
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              lte: -3,
              color: "#93CE07",
            },
            {
              gt: -3,
              lte: -2,
              color: "#FBDB0F",
            },
            {
              gt: -2,
              lte: -1,
              color: "#FC7D02",
            },
            {
              gt: 1,
              lte: 2,
              color: "#FD0100",
            },
            {
              gt: 2,
              lte: 3,
              color: "#AA069F",
            },
            {
              gt: 3,
              color: "#AC3B2A",
            },
          ],
          outOfRange: {
            color: "#999",
          },
        },
        series: {
          name: "Beijing AQI",
          type: "line",
          data: this.apiData,
          markLine: {
            silent: true,
            lineStyle: {
              color: "#333",
            },
            data: [
              {
                yAxis: -3,
              },
              {
                yAxis: -2,
              },
              {
                yAxis: -1,
              },
              {
                yAxis: 1,
              },
              {
                yAxis: 2,
              },
              {
                yAxis: 3,
              },
            ],
          },
        },
      };

      // 基于准备好的dom，初始化echarts实例
      var instanceByDom = this.$echarts.getInstanceByDom(
        window.document.getElementById("myChart")
      );
      var myChart =
        instanceByDom === undefined
          ? this.$echarts.init(window.document.getElementById("myChart"))
          : instanceByDom;
      // 将echarts实例内的对象清空，再重新注入
      myChart.clear();
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      // resetSize
      window.onresize = function () {
        myChart.resize();
      };
    },
  },
};
</script>

<style scoped>
#myChart {
  width: 100%;
  height: 400px;
}
</style>