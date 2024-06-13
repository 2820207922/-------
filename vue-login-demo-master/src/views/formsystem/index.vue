<template class="formBox">
  <div class="formItem">
    <!-- h3是用来控制字体标识的标签，用h1到h5来表示不同字体大小-->
    <h3 style="text-align: center;font-size: 25px">创建表单</h3>
    <!-- el-form是调用了element-ui这一三方库的form组件 -->
    <!-- ref是某一元素的别名，:model为双向数据绑定，:rules是绑定表单规则，prop用来绑定数据键值对中的键名 -->
    <el-form ref="form" :model="form" :rules="rules" label-position="left" style="text-align: center">
      <!-- el-form-item为el-form组件中的某一个子元素 -->
      <el-form-item label="设备名称" prop="deviceName">
        <el-input v-model="form.deviceName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="工单数量" prop="workNumber">
        <el-input v-model="form.workNumber" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="工单时间" prop="formTime">
        <van-cell title="选择工单日期" :value="form.formTime" @click="show1 = true" />
        <van-calendar v-model="show1" @confirm="onConfirm1" />
      </el-form-item>
      <el-form-item label="工单细节" prop="deviceDetails">
        <el-input v-model="form.deviceDetails" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="设备位置" prop="devicePosition">
        <el-input v-model="form.devicePosition" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="材料" prop="material">
        <el-input v-model="form.material" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input v-model="form.describe" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="维护时间" prop=" maintenance">
        <van-cell title="选择日期区间" :value="form.maintenance" @click="show2 = true" />
        <van-calendar v-model="show2" type="range" @confirm="onConfirm2" />
      </el-form-item>
      <el-form-item>
        <el-button @click="click('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 总结：
          基础知识点：
          1、v-bind: <div v-bind:id="dynamicId"></div>
            v-bind 指令指示 Vue 将元素的 id attribute 与组件的 dynamicId 属性保持一致。
            如果绑定的值是 null 或者 undefined，那么该 attribute 将会从渲染的元素上移除。
            因为 v-bind 非常常用，我们提供了特定的简写语法：<div :id="dynamicId"></div>
          2、h3：<h1> - <h6> 标签被用来定义 HTML 标题。<h1> 定义重要等级最高的标题。<h6> 定义重要等级最低的标题。
          3、el-form标签：el-form是调用了element-ui这一三方库的form组件
            model	-- 表单数据对象
            label	-- 标签文本
            prop --	表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
            rules --	表单验证规则
            label-position --	表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
          4、el-button标签：el-button是调用了element-ui这一三方库的button组件
          5、this：this指向vue实例（即vue下的所有东西）

  -->
</template>

<script>
export default {
  // 数据区域
  data() {
    return {
      user: {
        name:""
      },
      show1: false,
      show2: false,
      form: {
        deviceDetails: "",
        devicePosition: "",
        formTime: "",
        deviceName: "",
        submitPeople: "",
        workNumber: "",
        material: "",
        describe: "",
        maintenance:"",
      },
      rules:{
        param1: [
          { required: true, message: '请输入内容一', trigger: 'blur' }
        ],
        // 添加规则
      }
    };
  },
  // 组件初始化前的准备操作，在此处执行
    created() {
    // 事件监听，bus.$on事件一般在此处定义
    // 初始数据载入
    
    
  },
  // 组件初始化后需要进行的操作，在此处执行
  mounted() {
    if (sessionStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.user = JSON.parse(sessionStorage.getItem('userInfo'));
      this.form.submitPeople = this.user.name
    }
    // 组件渲染，传递参数，bus.$emit  

  },
  beforeDestroy() {
  },
  // JS方法
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm1(date) {
      this.show1 = false;
      this.form.formTime = this.formatDate(date);
    },
    onConfirm2(date) {
      const [start, end] = date;
      this.show2 = false;
      this.form.maintenance = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    click(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var formParam = JSON.stringify(this.form)
          // 业务逻辑
          this.submit(formParam)
          this.$message({
            message:'submit!'
          })
        } else {
          this.$message({
            message:'error submit!'
          })
          return false;
        }
      });
    },
    //添加方法
    submit(submitForm){
      var httpRequest = new XMLHttpRequest();
      const url = "http://10.112.16.136:8018/cloudForm/save";
      // 请求方法
      httpRequest.open("POST", url);
      // 请求头
      httpRequest.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
      );
      // 请求参数
      httpRequest.send(`form=${submitForm}&uid=6`);
      //在API中的this指代的是返回值的对象，如果想在API返回值中对data内的值进行赋值，可以_this来指向vue的component
      var _this = this
      httpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          _this.$message({
            message:"提交成功！"
          })
          // 表单提交成功后的步骤
        } else if (this.readyState === 4 && this.status !== 200) {
          _this.$message({
            message:"提交失败！"
          })
        }
      }
    }

  }
}

</script>

<style scoped>
.formBox {
  width: 100%;
  text-align: center;
}
.formItem{
  width: 100%;
  /* padding-left: 5%;
  padding-right: 5%; */
  margin-bottom: 5%;
  text-align: center;
}
</style>
