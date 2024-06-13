<template class="tabBarBox">
  <div class="tabBarItem">
    <div class="tabBarClass">
      <div v-for="(item, index) in barConfigData" :key="index"   class="tab-bar-item" @click="navigateTo(item)">
        <!-- v-show指令是根据条件显示DOM元素的指令，可以用来动态控制DOM元素的显示和隐藏。 -->
        <div v-show="!item.isActive">
          <svg t="1673868145483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2495" xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36"><path d="M512.1 896.4c-102.6 0-199-39.9-271.5-112.5-72.5-72.5-112.5-169-112.5-271.5 0-102.6 39.9-199 112.5-271.5 72.5-72.5 169-112.5 271.5-112.5s199 39.9 271.5 112.5c72.5 72.5 112.5 169 112.5 271.5 0 102.6-39.9 199-112.5 271.5-72.5 72.5-168.9 112.5-271.5 112.5z" fill="#FFFFFF" p-id="2496"></path><path d="M512.1 192.4c43.3 0 85.2 8.4 124.5 25.1 38.1 16.1 72.3 39.2 101.8 68.6 29.4 29.4 52.5 63.7 68.6 101.8 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.2-25.1 124.5c-16.1 38.1-39.2 72.3-68.6 101.8-29.4 29.4-63.7 52.5-101.8 68.6-39.4 16.7-81.3 25.1-124.5 25.1-43.3 0-85.2-8.4-124.5-25.1-38.1-16.1-72.3-39.2-101.8-68.6-29.4-29.4-52.5-63.7-68.6-101.8-16.7-39.4-25.1-81.3-25.1-124.5 0-43.3 8.4-85.2 25.1-124.5 16.1-38.1 39.2-72.3 68.6-101.8 29.4-29.4 63.7-52.5 101.8-68.6 39.4-16.7 81.3-25.1 124.5-25.1m0-128c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448c0-247.5-200.6-448-448-448z" fill="#333333" p-id="2497"></path><path d="M512 512.2m-192.3 0a192.3 192.3 0 1 0 384.6 0 192.3 192.3 0 1 0-384.6 0Z" fill="#333333" p-id="2498"></path></svg>
        </div>
        <div v-show="item.isActive">
          <svg t="1673868789134" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2748" xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36"><path d="M512.1 896.4c-102.6 0-199-39.9-271.5-112.5-72.5-72.5-112.5-169-112.5-271.5 0-102.6 39.9-199 112.5-271.5 72.5-72.5 169-112.5 271.5-112.5s199 39.9 271.5 112.5c72.5 72.5 112.5 169 112.5 271.5 0 102.6-39.9 199-112.5 271.5-72.5 72.5-168.9 112.5-271.5 112.5z" fill="#FFFFFF" p-id="2749"></path><path d="M512.1 192.4c43.3 0 85.2 8.4 124.5 25.1 38.1 16.1 72.3 39.2 101.8 68.6 29.4 29.4 52.5 63.7 68.6 101.8 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.2-25.1 124.5c-16.1 38.1-39.2 72.3-68.6 101.8-29.4 29.4-63.7 52.5-101.8 68.6-39.4 16.7-81.3 25.1-124.5 25.1-43.3 0-85.2-8.4-124.5-25.1-38.1-16.1-72.3-39.2-101.8-68.6-29.4-29.4-52.5-63.7-68.6-101.8-16.7-39.4-25.1-81.3-25.1-124.5 0-43.3 8.4-85.2 25.1-124.5 16.1-38.1 39.2-72.3 68.6-101.8 29.4-29.4 63.7-52.5 101.8-68.6 39.4-16.7 81.3-25.1 124.5-25.1m0-128c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448c0-247.5-200.6-448-448-448z" fill="#1AAD19" p-id="2750" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path><path d="M512 512.2m-192.3 0a192.3 192.3 0 1 0 384.6 0 192.3 192.3 0 1 0-384.6 0Z" fill="#1AAD19" p-id="2751" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path></svg>
        </div>
        <div style="font-size: xx-small">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabBar',
  // 数据区域
  data () {
    return {
      barConfigData: [
        {
          text: '首页',
          value: 'firstTag',
          router: '/home',
          isActive: false
        },
        {
          text: '任务',
          value: 'secondTag',
          router: '/formsystem',
          isActive: false
        },
        {
          text: '操作',
          value: 'thirdTag',
          router: '/operateform',
          isActive: false
        },
        {
          text: '我的',
          value: 'forthTag',
          router: '/chartShow',
          isActive: false
        },
      ]
    }
  },
  // 组件初始化前的准备操作，在此处执行
  created () {
    // 事件监听，this.$bus.$on事件一般在此处定义

    // 初始数据载入

  },
  // 组件初始化后需要进行的操作，在此处执行
  mounted () {
    // 组件渲染，传递参数，this.$bus.$emit

  },
  // JS方法
  methods: {
    navigateTo(e) {
      this.barConfigData.forEach(item => {
        item.isActive = false;
      });

      // 然后将当前点击的项的 isActive 设置为 true
      e.isActive = true;

      if (e && e.router !== this.$route.path) {
        this.$router.push(e.router);
      }
      console.log(e)
    }
  }
}
</script>

<style scoped>
.tabBox{
  width: 100%;
  text-align: center;
}
.tabItem{
  width: 100%;
  text-align: center;
}
.tabBarClass{
  display: flex;
  background-color: #f6f6f6;
  z-index: 100;

  position: fixed; /* 放到最底下 */
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
}
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  margin-bottom: 2%;
  margin-top: 3px;

  /*display: flex;*/
}
</style>
