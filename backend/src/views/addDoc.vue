<template>
  <el-main style="padding:0;" v-if="showEdit">
    <slot></slot>
    <el-row class="doc-edit">
      <el-col :span="12" class="doc-edit-col">
        <textarea
          class="doc-edit-text doc-edit-text__edit"
          name="markdown"
          id="markdown"
          cols="30"
          rows="10"
          v-model="markdown"
        ></textarea>
      </el-col>
      <el-col :span="11" class="doc-edit-col">
        <div
          class="doc-edit-text doc-edit-text__show"
          name="showMarkdown"
          id="showMarkdown"
          cols="30"
          rows="10"
          v-html="docHtml"
        ></div>
      </el-col>
    </el-row>
    <el-row class="doc-title">
      <el-col class="doc-title__list">
        <el-input placeholder="请输入文章名称" v-model="fileName" clearable></el-input>
      </el-col>
      <el-col class="doc-title__list">
        <el-input type="textarea" :rows="2" placeholder="请输入文章说明" v-model="fileIntro"></el-input>
      </el-col>
    </el-row>
    <el-row class="submit-btn">
      <el-button type="primary" plain @click="handleClickSubmit">提交</el-button>
      <slot name="back"></slot>
    </el-row>
  </el-main>
</template>
<script>
import showdown from "showdown";
import "../assets/style/markdown.scss";
import axios from "../assets/js/axios";
import { checkDataType } from "../assets/js/common";
showdown.setOption("tables", true);
const converter = new showdown.Converter();
export default {
  props: {
    docData: {
      type: Object,
      defualt: null
    },
    showEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      markdown: "",
      fileName: "",
      fileIntro: "",
      hashName: ""
    };
  },
  watch: {
    docData({ markdown = "", fileName = "", intro = "", hashName = "" }) {
      this.markdown = markdown;
      this.fileName = fileName;
      this.fileIntro = intro;
      this.hashName = hashName;
    }
  },
  computed: {
    docHtml() {
      return converter.makeHtml(this.markdown);
    }
  },
  methods: {
    async handleClickSubmit() {
      const { status, msg } = checkDataType(this, {
        fileName: "string",
        fileIntro: "string",
        docHtml: "string"
      });
      if (!status) return this.$message(msg);
      const requestData = {
        fileName: this.fileName,
        fileIntro: this.fileIntro,
        html: this.docHtml,
        markdown: this.markdown
      };
      if (this.hashName) requestData.hashName = this.hashName;
      const { code, message, data } = await axios.post(
        "/backend/api/uploaddoc",
        requestData
      );
      this.$message(code === 200 ? "提交成功" : message);
      this.hashName = data.hashName;
    }
  }
};
</script>

<style lang="scss">
.doc-edit {
  height: 60%;
  &-col {
    height: 100%;
  }
  &-text {
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    overflow: auto;
    &__edit {
      background-color: black;
      color: #fff;
      font-size: 20px;
    }
    &__show {
      margin: 0 20px;
    }
  }
}
.submit-btn {
  text-align: center;
  margin-top: 30px;
}
.doc-title {
  margin: 20px;
  &__list {
    margin: 10px;
  }
}
</style>
