
<template>
  <el-form
    class="form_create"
    @submit.native.prevent="savegoods"
    ref="form"
    :model="goods"
    label-width="100px"
  >
    <el-form-item label="商品名称">
      <el-input v-model="goods.name"></el-input>
    </el-form-item>
    <el-form-item label="订购公司">
      <el-input v-model="goods.company"></el-input>
    </el-form-item>
    <el-form-item label="商品规格">
      <el-input type="textarea" v-model="goods.standards"></el-input>
    </el-form-item>
    <el-form-item label="商品数量">
      <el-input v-model="goods.quantity"></el-input>
    </el-form-item>
    <el-form-item label="商品报价">
      <el-input v-model="goods.price"></el-input>
    </el-form-item>
    <el-form-item label="收货地址">
      <el-input v-model="goods.address"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="goods.remarks"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <router-link to="/home/my"> <el-button>取消</el-button></router-link>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      goods: {},
    };
  },
  methods: {
    savegoods() {
      this.$http.post(`goods/${this.$route.query.id}`, this.goods).then(() => {
        this.$message({
          message: "商品修改成功",
          type: "success",
        });
        this.$router.push("/home/my");
      });
    },
  },
  mounted() {
    this.$http.get(`goods/${this.$route.query.id}`).then((res) => {
      this.goods = res.data;
    });
  },
};
</script>
<style>
.form_create {
  width: 700px;
  margin-left: 200px;
}
.el-form-item__label {
  font-size: 18px;
}
.el-input__inner {
  height: 50px;
  font: 18px "Microsoft YaHei";
}
.el-textarea__inner {
  font: 18px "Microsoft YaHei";
}
</style>
