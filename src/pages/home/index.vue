<template>
  <div class="homePage">
    <!-- <div class="loading-masker" v-show="isRequesting">
      <van-loading class="loading" size="30px" type="spinner" color="#1989fa" vertical>识别中...</van-loading>
    </div>-->
    <div :class="{'pc-wrap':!isMobile}">
      <img class="nri-logo" src="../../../static/img/nri_logo.png" />
      <div class="form-title">
        <van-icon name="friends-o" />智能识别API
      </div>

      <div class="btn-list">
        <van-row type="flex" justify="end">
          <van-col :span="isMobile?5:3">
            <van-button
              icon="star-o"
              @click="smokeDetection"
              :type="btnActive=='smoke'?'info':'default'"
            >烟雾识别</van-button>
          </van-col>
          <van-col :span="isMobile?6:4">
            <van-button
              icon="manager-o"
              @click="ageGenderDetection"
              :type="btnActive=='ageGender'?'info':'default'"
            >性别年龄识别</van-button>
          </van-col>
          <van-col :span="isMobile?5:3">
            <van-button
              icon="tv-o"
              @click="nozzleDetection"
              :type="btnActive=='nozzle'?'info':'default'"
            >喷嘴识别</van-button>
          </van-col>
        </van-row>
      </div>

      <van-uploader
        class="van-upload"
        v-model="fileList"
        name="file"
        preview-size="220"
        :after-read="afterRead"
        :before-read="beforeRead"
        @delete="deletePreview"
        multiple
        :max-count="1"
      />

      <div class="upload-result">
        <van-cell-group>
          <van-field
            class="result-label"
            v-model="result"
            size="large"
            label-class="result-label"
            :label-width="isMobile?70:100"
            label-align="left"
            :readonly="true"
            label="识别结果:"
            type="textarea"
            rows="1"
            autosize
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import makeTrashable from "trashable";

const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
  navigator.userAgent
);

// import Transaction from 'promise-transaction'
export default {
  data() {
    // 选项 数据
    return {
      isRequesting: false, //控制请求次数和加载状态
      btnActive: "smoke",
      fileList: [], //图片上传数据
      isMobile: isMobile, //判断是否是移动端访问，还是pc端
      result: "" //图片识别结果
    };
  },
  components: {
    // 定义组件
  },
  methods: {
    deletePreview() {
      this.result = "";
    },
    smokeDetection() {
      this.btnActive = "smoke";
      this.result = "";
    },
    ageGenderDetection() {
      this.btnActive = "ageGender";
      this.result = "";
    },

    nozzleDetection() {
      this.btnActive = "nozzle";
      this.result = "";
    },
    // 图片上传前校验
    beforeRead(file) {
      // if (file.type !== "image/jpeg") {
      //   Toast("请上传 jpg 格式图片");
      //   return false;
      // }
      this.result = "";
      return true;
    },

    afterRead(file, detail) {
      // 此时可以自行将文件上传至服务器
      let params = new FormData(); //创建form对象
      //通过append向form对象添加数据
      params.append("file", file.file);
      if (this.isRequesting) {
        return;
      }

      // let dectionApiPromise = api.smokeIdentificationApi.smokeDetection;
      // if (this.btnActive == "ageGender") {
      //   dectionApiPromise = api.smokeIdentificationApi.ageGenderDetection;
      // }

      let detectionName = this.btnActive + "Detection";
      let dectionApiPromise = api.smokeIdentificationApi[detectionName];

      this.isRequesting = true;
      const toast = this.$toast.loading({
        mask: true,
        duration: 0,
        message: "加载中..."
      });
      //为异步操作添加可取消的功能
      // const detectionPromise = dectionApiPromise(params);
      // this.cancelablePromise = makeTrashable(detectionPromise);
      dectionApiPromise(params)
        .then(res => {
          this.isRequesting = false;
          toast.clear();
          if (res.status == 200) {
            this.result = res.data;
          } else {
            this.result = res.statusText;
          }
        })
        .catch(error => {
          toast.clear();
          this.isRequesting = false;
          this.result = "识别失败，请检查网络是否正常~";
        });
    }
    // cancelPromise() {
    //   if (this.isRequesting) {
    //     this.isRequesting = false;
    //     this.cancelablePromise.trash();
    //   }
    // }
  },
  mounted() {
    //用来初始化可以取消的promise
    // this.cancelablePromise = null;
  }
};
</script>
<style lang="less">
@import url("./indexH5.less");
</style>
