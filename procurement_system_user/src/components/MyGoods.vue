
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
      <el-table-column prop="apply" label="状态" width="100"></el-table-column>
      <el-table-column
        prop="pass"
        label="审批结果"
        width="100"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="apply(scope.row._id)"
            type="primary"
            size="large"
            v-if="editShow == true"
            >提交</el-button
          >
          <el-button @click="details(scope.row._id)" type="primary" size="large"
            >详情</el-button
          >
          <el-button
            @click="edit(scope.row._id)"
            size="large"
            v-if="editShow == true"
            >编辑</el-button
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
      editShow: true,
    };
  },
  methods: {
    //获取数据
    fetch() {
      this.$http.get("goods").then((res) => {
        if (this.$route.query.apply == "true") {
          this.editShow = false;
          this.goods = res.data.filter((item) => {
            return item.apply == "已提交";
          });
        } else {
          this.editShow = true;
          this.goods = res.data.filter((item) => {
            return item.apply == "未提交";
          });
        }
      });
    },
    apply(id) {
      for (let item of this.goods) {
        if (item._id == id) {
          if (item.apply == "已提交") {
            this.$message({
              message: "该商品已提交",
              type: "warning",
            });
            return;
          }
          this.applyGoods = item;
        }
      }
      this.$confirm("是否提交当前商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.applyGoods.apply = "已提交";
          this.$http.post(`goods/apply/${id}`, this.applyGoods).then(() => {
            this.applyGoods = {};
            this.$message({
              message: "商品提交成功",
              type: "success",
            });
          });
        })
        .catch(() => {
          this.applyGoods = {};
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    edit(id) {
      for (let item of this.goods) {
        if (item._id == id) {
          if (item.apply == "已提交") {
            this.$message({
              message: "该商品已提交,不可修改",
              type: "warning",
            });
            return;
          }
        }
      }
      this.$router.push("/home/edit?id=" + id);
    },
    remove(id) {
      for (let item of this.goods) {
        if (item._id == id) {
          if (item.apply == "已提交") {
            this.$message({
              message: "该商品已提交,不可删除",
              type: "warning",
            });
            return;
          }
        }
      }
      this.$http.delete(`goods/${id}`).then(() => {
        this.$message({
          message: "商品删除成功",
          type: "success",
        });
        this.fetch();
      });
    },
    tableRowClassName({ row }) {
      if (row.pass === "已通过") {
        return "success-row";
      } else if (row.pass === "未通过") {
        return "fail-row";
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

.el-table .apply-row {
  background: rgb(235, 235, 236);
}

.el-table .fail-row {
  background: rgb(247, 204, 204);
}

.el-table .success-row {
  background: #caf7dd;
}
</style>