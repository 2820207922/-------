<template>
  <div>
    <div style="margin-bottom: 5%">
      <el-row>
        <div align="center">
          <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="4rem" color="#1989fa"></van-icon>
        </div>
      </el-row>
      <el-row>
        <div style="text-align: center;font-weight: bold">{{ user.uname }}</div>
        <div style="text-align: center;font-size: 15px">班组：{{user.zubie }}</div>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div style="border-right: 1px solid black">
            <div style="text-align: center;font-size: 15px">部门</div>
            <div style="text-align: center;font-weight: bold;margin-top: 1px">{{ user.department }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="border-left: 1px solid black">
            <div style="text-align: center;font-size: 15px">职位</div>
            <div style="text-align: center;font-weight: bold;margin-top: 1px">{{ user.position }}</div>
          </div>
        </el-col>
      </el-row>


      <div style="margin-top: 1%" v-for="(item, index) in functionalList" :key="item" @click="item.singleClick">
        <van-cell :key=index :title=item.title :is-link=item.isLink :value=item.value :icon=item.icon></van-cell>
      </div>
    </div>
    <div>
      <el-dialog :visible.sync="dialogVisible" title="用户列表">
        <el-table :data="filteredUserList">
          <el-table-column prop="uid" label="ID"></el-table-column>
          <el-table-column prop="uname" label="姓名"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="position" label="职位"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="zubie" label="组别"></el-table-column>
          <!-- 其他需要显示的用户信息 -->
        </el-table>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false,
      user: {
        uid: null,
        uname: "",
        password:"",
        position: "",
        phone: "",
        department: "",
        gender: "",      //0为男性, 1为女性
        age: "",
        zubie: "",   //-1表示还未绑定班组
      },
      userList: [{
        uid: null,
        uname: "",
        password: "",
        position: "",
        phone: "",
        department: "",
        gender: "",      //0为男性, 1为女性
        age: "",
        zubie: "",  
      }],
      functionalList: [{
        title: '电话信息',
        isLink: true,
        icon: 'phone-o',
        singleClick: this.phoneClick
      }, {
        title: '个人信息',
        isLink: true,
        icon: 'user-o',
        singleClick: this.userInfoClick
      }, {
        title: '人员管理',
        isLink: true,
        icon: 'friends-o',
        singleClick: this.userManage
      }, {
        title: '退出登陆',
        isLink: true,
        icon: 'revoke',
        singleClick: this.logout
      },]
    };
  },
  computed: {
    filteredUserList() {
      // 根据条件过滤userList数组，只返回与自己同一组的成员
      return this.userList.filter(user => user.zubie === this.user.zubie);
    }
  },
  mounted() {
    if (sessionStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    }
  },
  methods: {
    async getAllUser() {
      let _this = this
      let ApiParam = {
        method: 'POST',
        url: 'http://localhost:8081/user/findAll',
        params: {
        },
        headers: {
          "Content-Type": "application/json",
        }
      }
      // 实际请求
      await axios({
        method: ApiParam.method,
        url: ApiParam.url,
        data: ApiParam.params,
        headers: ApiParam.headers
      }).then(res => {
        // 初步处理-获取核心数据
        console.log(res.data)
        // 具体处理逻辑------>
        for (let i = 0; i < res.data.length; i++) {
          _this.userList.push(res.data[i])
        }
        //<-------具体处理逻辑
        
      })
  },
    logout() {
      // 移除本地用户登录信息
      sessionStorage.removeItem('userInfo');
      // 跳转页面到登录页
      this.$router.push('/login');
    },
    phoneClick() {
      this.$dialog({
        message: this.user.phone
      })

    },
    userInfoClick() {
      //! 事件接口-个人信息;
      var message = "年龄：" + this.user.age + "，性别：" + this.user.gender;
      this.$dialog({
        message: message
      })
    },
    userManage() {
      if (this.user.position == "管理员" || this.user.position == "主管") {
        this.getAllUser();
        this.dialogVisible = !this.dialogVisible;
        this.$message('欢迎'+this.user.position)
      }
      else {
        this.$message('你没有此权限')
      }
    },
    backToLogin() {
      //! 事件接口-退出登录;
      sessionStorage.removeItem('singleUserInfo')
      this.$dialog.confirm({
        message: '确认清除对应的singleUserInfo数据?'
      }).then(() => {
        //刷新当前页面
        window.location.reload();
      }).catch(() => {
        //取消的操作
      })

    },

    //! 其他方法接口;


  }
};

</script>

<style scoped>
.templateBox {
  width: 100%;
  text-align: center;
}

.templateItem {
  width: 100%;
  text-align: center;
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 5%;
}
</style>
