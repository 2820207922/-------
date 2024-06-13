<template>
    <div>
        <div>
        <h3>根据ID查询工单</h3>
        <p>在此页面，您可以输入工单ID进行查询。</p>
    </div>
    <el-input v-model="formId" placeholder="请输入表单ID">
        <template slot="append">
            <el-button type="primary" @click="getForm">查询</el-button>
        </template>
    </el-input>
    <div v-if="format_data">
        <h3>表单内容：</h3>
        <ul v-for="(item, index) in format_data" :key="index">
            <p>表单 {{ index }}</p>
            <li v-for="(value, key, i) in item" :key="i">
                <div class="ta-ul">
                    <div class="ta-key">{{ key }}</div>
                    <div class="ta-value">{{ value }}</div>
                </div>
            </li>
        </ul>
    </div>

    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            formId: '',
            api_data: [],
            format_data: [],
            counter:0
        };
    },
    mounted() {

    },
    methods: {
        getForm() {
            if (this.counter === 0) { // 当计数器为0时刷新页面
                this.getAllFormByUid();
                this.counter++; // 计数器加1
            } else{
                // 当计数器为1时执行查询操作
                location.reload();
                this.getAllFormByUid();
                this.counter++; // 计数器加1
            }
        },

        async getAllFormByUid() {
            let _this = this
            let ApiParam = {
                method: 'GET',
                url: 'http://10.112.16.136:8018/cloudForm/getAllFormByUid/' + _this.formId,
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
                // 初步处理-获取核心数据
                for (let i = 0; i < res.data.data.length; i++)
                    _this.format_data.push(res.data.data[i].form)
                // 具体处理逻辑------>

                //<-------具体处理逻辑
            })
            console.log(_this.format_data)
        },
    },
};
</script>

<style scoped>
.ta-ul {
    margin: 2px auto;
    width: 50%;
    display: flex;
    background-color: rgb(237, 237, 237);
    /* border: solid; */
    justify-content: space-around;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ta-key {
    text-align: center;
    font-weight: bold;
    width: 50%;
}

.ta-value {
    text-align: center;
    width: 50%;
}
</style>
