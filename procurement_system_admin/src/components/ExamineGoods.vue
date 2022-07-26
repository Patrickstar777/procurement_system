
<template>
  <div>
    <el-table :data="goods" :row-class-name="tableRowClassName">
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
        prop="order"
        label="订单"
        width="100"
        v-if="isShow == true"
      ></el-table-column>
      <el-table-column
        prop="reason"
        label="原因"
        width="100"
        v-else
      ></el-table-column>

      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="details(scope.row._id)" type="primary" size="large"
            >详情</el-button
          >
          <el-button
            @click="edit(scope.row._id)"
            size="large"
            type="success"
            v-if="isShow == true"
            >生成订单</el-button
          >
          <el-button @click="remove(scope.row._id)" type="danger" size="large"
            >删除</el-button
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
      applyGoods: {},
      isShow: "",
    };
  },
  methods: {
    //获取数据
    fetch() {
      if (this.$route.query.pass == "true") {
        this.isShow = true;
        this.$http.get("goods").then((res) => {
          this.goods = res.data.filter((item) => {
            return (
              item.examine == "已审批" &&
              item.apply == "已提交" &&
              item.pass == "已通过"
            );
          });
        });
      } else {
        this.$http.get("goods").then((res) => {
          this.isShow = false;
          this.goods = res.data.filter((item) => {
            return (
              item.examine == "已审批" &&
              item.apply == "已提交" &&
              item.pass == "未通过"
            );
          });
        });
      }
    },
    tableRowClassName({ row }) {
      if (row.order === "已生成") {
        return "success-row";
      } else {
        return "";
      }
    },
    details(id) {
      this.$router.push("/home/details?id=" + id);
    },
  },
  //进入页面需要获取数据
  created() {
    this.fetch();
  },
  watch: {
    $route: "fetch",
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
.el-table .fail-row {
  background: rgb(247, 204, 204);
}

.el-table .success-row {
  background: #caf7dd;
}
</style>