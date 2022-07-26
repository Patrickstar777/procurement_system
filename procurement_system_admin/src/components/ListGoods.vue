
<template>
  <div>
    <el-table :data="goods" :row-class-name="tableRowClassName">
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
        width="140"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="details(scope.row._id)" type="primary" size="large"
            >详情</el-button
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
    };
  },
  methods: {
    //获取数据
    fetch() {
      this.$http.get("goods").then((res) => {
        this.goods = res.data.filter((item) => {
          return item.apply == "已提交";
        });
      });
    },
    tableRowClassName({ row }) {
      if (row.examine === "未审批") {
        return "fail-row";
      } else {
        return "success-row";
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
};
</script>
<style>
.cell {
  font-size: 18px;
}
.el-table .fail-row {
  background: rgb(247, 204, 204);
}

.el-table .success-row {
  background: #caf7dd;
}
</style>