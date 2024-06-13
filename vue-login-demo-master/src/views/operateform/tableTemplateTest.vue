<template class="tableBox">
  <div class="tableItem">
    <!--<h3 style="text-align: center">标题</h3>-->
    <!-- el-table是调用了element-ui这一三方库的table组件 -->
    <!--将表格数据绑定在data中；style中控制表格的样式；有无border决定带不带表格-->
    <!--定义height属性，height="100",即可实现固定表头-->
    <el-input size="smallmedium" v-model="formId" placeholder="请输入表单id"></el-input>
    <el-button type="success" icon="el-icon-search" @click="getFormById">查找表单</el-button>
    <el-button type="danger" icon="el-icon-delete" @click="deleteFormById">删除表单</el-button>
    <el-button type="primary" icon="el-icon-edit" @click="updateForm">更新表单</el-button>
    <el-table v-if="format_data && getisActive" :data="format_data" style="width: 100%">
      <el-table-column prop="key" label="属性"></el-table-column>
      <el-table-column prop="value" label="参数值"></el-table-column>
    </el-table>
    <h3 style="text-align: center;font-size: 25px">创建表单</h3>
    <!-- el-form是调用了element-ui这一三方库的form组件 -->
    <!-- ref是某一元素的别名，:model为双向数据绑定，:rules是绑定表单规则，prop用来绑定数据键值对中的键名 -->
    <el-form v-if="form && updateisActive" ref="form" :model="form" :rules="rules" label-position="left"
      style="text-align: center">
      <el-form-item>
        <el-button @click="click('form')">提交</el-button>
      </el-form-item>
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
      <el-form-item label="提交人员" prop="submitPeople">
        <el-input v-model="form.submitPeople" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="维护时间" prop=" maintenance">
        <van-cell title="选择日期区间" :value="form.maintenance" @click="show2 = true" />
        <van-calendar v-model="show2" type="range" @confirm="onConfirm2" />
      </el-form-item>

    </el-form>
  </div>
  <!-- 添加其他元素 -->

  <!-- 总结：
          基础知识点：
          el-table标签：el-table是调用了element-ui这一三方库的table组件
            data -- 显示的数据
            prop -- 对应列内容的字段名，也可以使用 property 属性
            label	-- 显示的标题
  -->
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      getisActive: false,
      updateisActive: false,
      api_data: [],
      format_data: [],
      formId: '',
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
        maintenance: "",
      },
    }
  },
  // 组件初始化前的准备操作，在此处执行
  created() {
    // 事件监听，bus.$on事件一般在此处定义
    
    // 初始数据载入
    
    
  },
  // 组件初始化后需要进行的操作，在此处执行
  mounted() {

  },
  // JS方法
  methods: {
    updateForm() {
      this.getisActive = false,
      this.updateisActive = !this.updateisActive
    },
    click() {
      console.log(this.form)
      this.updateFormById(this.form)
    },


    // 定义函数
    async deleteFormById() {
      let _this = this
      let innerData = []
      let ApiParam = {
        method: 'DELETE',
        url: 'http://10.112.16.136:8018/cloudForm/deleteFormById',
        params: {
          id: _this.formId
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      console.log(ApiParam)
      // 实际请求
      await axios({
        method: ApiParam.method,
        url: ApiParam.url,
        data: ApiParam.params,
        headers: ApiParam.headers
      }).then(res => {
        console.log(res)
        // 初步处理-获取核心数据
        if (res.data.code == 200) {
          this.$dialog({
            message: "已删除成功"
          })
        } else {
          this.$dialog({
            message: "删除失败"
          })
        }
        //<-------具体处理逻辑
      }).catch(err => {
        console.log(err)
      })
      // 根据组件需求处理数据
      return innerData
    },

    async updateFormById(data) {
      let _this = this
      let innerData = []
      let ApiParam = {
        method: 'PUT',
        url: 'http://10.112.16.136:8018/cloudForm/updateFormById',
        params: {
          id: _this.formId,
          form: JSON.stringify(data)
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      console.log(ApiParam)
      // 实际请求
      await axios({
        method: ApiParam.method,
        url: ApiParam.url,
        data: ApiParam.params,
        headers: ApiParam.headers
      }).then(res => {
        console.log(res)
        // 初步处理-获取核心数据
        if (res.data.code == 200) {
          this.$dialog({
            message: "已修改成功"
          })
        } else {
          this.$dialog({
            message: "修改失败"
          })
        }
        // 具体处理逻辑------>

        //<-------具体处理逻辑
      })
      // 根据组件需求处理数据
      return innerData
    },

    async getFormById() {
      this.getisActive = !this.getisActive,
      this.updateisActive = false
      let _this = this
      let innerData = []
      let ApiParam = {
        method: 'GET',
        url: 'http://10.112.16.136:8018/cloudForm/getFormById/' + _this.formId,
        params: {
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      // 实际请求
      await axios({
        method: ApiParam.method,
        url: ApiParam.url,
        data: ApiParam.params,
        headers: ApiParam.headers
      }).then(res => {
        console.log(res)
        // 初步处理-获取核心数据
        this.format_data = Object.entries(res.data.data.form).map(([key, value]) => ({ key, value }));
        // 具体处理逻辑------>

        //<-------具体处理逻辑
      })
      // 根据组件需求处理数据
      return innerData
    },
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
  }

}
</script>

<style scoped>
.tableBox {
  width: 100%;
  text-align: center;
}
.tableItem {
  width: 100%;
  margin-top: 3%;
}
</style>