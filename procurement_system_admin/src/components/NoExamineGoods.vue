
<template>
  <div>
    <el-table :data="goods">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="company"
        label="订购公司"
        width="200"
      ></el-table-column>

      <el-table-column
        prop="quantity"
        label="商品数量"
        width="140"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="商品报价"
        width="140"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="收货地址"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="examine"
        label="状态"
        width="100"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="details(scope.row._id)" type="primary" size="large"
            >详情</el-button
          >
          <el-button @click="pass(scope.row._id)" type="success" size="large"
            >通过</el-button
          >
          <el-button @click="refuse(scope.row._id)" type="danger" size="large"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goods: [],
      passGoods: {},
    };
  },
  methods: {
    //获取数据
    fetch() {
      this.$http.get("goods").then((res) => {
        this.goods = res.data.filter((item) => {
          return item.examine == "未审批" && item.apply == "已提交";
        });
      });
    },
    details(id) {
      this.$router.push("/home/details?id=" + id);
    },
    pass(id) {
      for (let item of this.goods) {
        if (item._id == id) {
          this.passGoods = item;
          this.passGoods.pass = "已通过";
          this.passGoods.examine = "已审批";
          this.$http.post(`goods/${id}`, this.passGoods).then(() => {
            this.$message({
              message: "商品已通过",
              type: "success",
            });
          });
        }
      }
    },
    refuse(id) {
      this.$prompt("请输入商品审批不通过理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (value.trim() == "") {
            this.$message({
              message: "理由不得为空",
              type: "warning",
            });
            return;
          }

          for (let item of this.goods) {
            if (item._id == id) {
              this.passGoods = item;
              this.passGoods.pass = "未通过";
              this.passGoods.examine = "已审批";
              this.passGoods.reason = value;
              this.$http.post(`goods/${id}`, this.passGoods).then(() => {
                this.$message({
                  message: "商品已拒绝",
                  type: "success",
                });
              });
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  //进入页面需要获取数据
  created() {
    this.fetch();
  },
};
</script>
<style>
.cell {
  font-size: 18px;
}
.el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.el-checkbox__inner::after {
  content: "";
  height: 10px;
  left: 7px;
}
.el-table__fixed::before {
  bottom: -5px;
}
</style>