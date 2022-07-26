<template>
  <div class="details">
    <el-descriptions class="margin-top" title="商品详细信息" :column="1" border>
      <template slot="extra">
        <el-button type="success" size="large" v-if="btnShow == true"
          >通过</el-button
        >
        <el-button type="danger" size="large" v-if="btnShow == true"
          >拒绝</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-goods"></i>
          商品名称
        </template>
        {{ goods.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-shop"></i>
          订购公司
        </template>
        {{ goods.company }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-release"></i>
          商品规格
        </template>
        {{ goods.standards }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-grid"></i>
          商品数量
        </template>
        {{ goods.quantity }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-marketing"></i>
          商品报价
        </template>
        {{ goods.price }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location"></i>
          收获地址
        </template>
        {{ goods.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-phone"></i>
          手机号
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-flag"></i>
          备注
        </template>
        {{ goods.remarks }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-platform"></i>
          状态
        </template>
        {{ goods.examine }}
        <span v-if="btnShow == false"> ==>{{ goods.pass }}</span>
        <span v-if="orderShow == true">==>订单{{ goods.order }}</span>
      </el-descriptions-item>
      <el-descriptions-item v-if="showReason == true">
        <template slot="label">
          <i class="el-icon-error"></i>
          拒绝原因
        </template>
        {{ goods.reason }}
      </el-descriptions-item>
    </el-descriptions>
    <el-button size="large" type="info" class="back" @click="back"
      >返回</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: {},
      showReason: true,
      orderShow: true,
      btnShow: true,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
  mounted() {
    this.$http.get(`goods/${this.$route.query.id}`).then((res) => {
      this.goods = res.data;
      if (this.goods.examine == "已审批") {
        this.btnShow = false;
      } else {
        this.orderShow = false;
      }
      if (this.goods.pass == "未通过") {
        this.orderShow = false;
      } else {
        this.showReason = false;
      }
    });
  },
};
</script>

<style>
.margin-top {
  font-size: 20px;
  width: 1100px;
  margin-left: 50px;
}
.el-descriptions__title {
  font-size: 25px;
}
.back {
  margin-top: 50px;
  margin-left: 500px;
}
</style>