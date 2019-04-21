<template>
  <el-main>
    <div v-if="!showEdit">
      <el-table :data="docList" stripe style="width: 100%">
        <el-table-column prop="fileName" label="文章名称"></el-table-column>
        <el-table-column prop="time" label="时间" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" placeholder="输入关键字搜索" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </template>
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        class="pageNav"
      ></el-pagination>
    </div>

    <AddDoc :docData="docData" :showEdit="showEdit" style="height:100%;">
      <template v-slot:back>
        <el-button type="info" plain @click="handleClickBack">返回</el-button>
      </template>
    </AddDoc>
  </el-main>
</template>
<script>
import axios from "../assets/js/axios";
import AddDoc from "./addDoc.vue";
import { timeForm, shakeFn } from "../assets/js/common";
export default {
  components: { AddDoc },
  data() {
    return {
      docList: [],
      search: "",
      docData: {},
      showEdit: false,
      total: 0,
      currentPage: 1
    };
  },
  watch: {
    search(fileName) {
      if (!shakeFn.search) {
        shakeFn.search = shakeFn(async fileName => {
          const { code, data, message } = await axios.get(
            "/backend/api/findDocListUseName",
            {
              params: { fileName }
            }
          );
          if (code !== 200) this.$message(message);
          this.docList = data;
        }, 500);
      }
      shakeFn.search.call(this, fileName);
    }
  },
  mounted() {
    this.getDocList(this.currentPage);
  },
  methods: {
    async getDocList(page = 1, size = 10) {
      const { code, data, message } = await axios.get(
        "/backend/api/getDocList",
        {
          params: {
            page,
            size
          }
        }
      );
      if (code !== 200) return this.$message(message);
      const { docList, count } = data;
      this.docList = docList.map(v => {
        v.time = timeForm(v.time);
        return v;
      });
      this.total = count;
    },
    async handleEdit({ hashName }) {
      const { code, data, message } = await axios.get(
        "/backend/api/getDocDetail",
        {
          params: {
            hashName
          }
        }
      );
      if (code !== 200) return this.$message(message);
      this.docData = data;
      this.showEdit = true;
    },
    async handleDelete({ hashName }) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { code, message } = await axios.post("/backend/api/deleteDoc", {
            hashName
          });
          if (code !== 200) return this.$message(message);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getDocList(this.currentPage);
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    handleClickBack() {
      this.showEdit = false;
      this.getDocList(this.currentPage);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getDocList(currentPage);
    }
  }
};
</script>
<style>
.pageNav {
  text-align: center;
  margin-top: 30px;
}
</style>

