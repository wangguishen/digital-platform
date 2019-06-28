<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="search" :inline="true" :model="search" class="toolbar" @submit.prevent="initData">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
          <el-button v-show="dict_entry !== ''" type="primary" icon="el-icon-edit" size="mini" @click="handleEdit">修改</el-button>
          <el-button v-show="dict_entry !== ''" type="primary" icon="el-icon-delete" size="mini" @click="handleDel">删除</el-button>
        </el-form-item>
        <el-form-item label="子项名称" prop="name">
          <el-input v-model="search.name" placeholder="请输入子项名称" clearable size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="F500106">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4" class="data_dictionary_tree" :style="{ height: tableHeight + 'px'}">
      <!-- <el-scrollbar class="scrollbar-page" wrap-class="scrollbar-wrapper"> -->
      <el-input
        v-model="filterText"
        size="mini"
        placeholder="输入关键字进行过滤"
      />
      <el-tree
        ref="tree"
        v-loading="treeLoading"
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        :indent="0"
        @node-click="handleNodeClick"
      />
      <!-- </el-scrollbar> -->
    </el-col>
    <el-col :span="20">
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        stripe
        border
        :height="tableHeight"
        :size="TABLE_SIZE"
        @selection-change="selsChange"
      >
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="dict_entry" label="字典编号" width="100" />
        <el-table-column prop="entry_name" label="字典名称" width="120" />
        <el-table-column prop="subentry" label="字典子项" width="120" />
        <el-table-column prop="dict_prompt" label="子项名称" />
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button type="text" size="small" @click="tHandleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="tHandleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!-- <el-col :span="24" class="toolbar" /> -->

    <el-dialog :visible.sync="addVisible" title="新增字典">
      <edit v-if="addVisible" @success="handleSaveSuccess" @confirm="addVisible = false" />
    </el-dialog>
    <el-dialog :visible.sync="editVisible" title="修改字典">
      <edit v-if="editVisible" :model="editModel" @success="handleSaveSuccess" @confirm="editVisible = false" />
    </el-dialog>
    <el-dialog :visible.sync="tAddVisible" title="新增字典">
      <tedit v-if="tAddVisible" :model="tEditModel" @success="tHandleSaveSuccess" @confirm="tAddVisible = false" />
    </el-dialog>
    <el-dialog :visible.sync="tEditVisible" title="修改字典">
      <tedit v-if="tEditVisible" :model="tEditModel" @success="tHandleSaveSuccess" @confirm="tEditVisible = false" />
    </el-dialog>
  </el-row>
</template>

<script>
import edit from "./edit";
import tedit from "./tedit"
import { F500102, F500106, F500104, F500107 } from '@/service/api'
import { list_mixins } from '@/mixins'

export default {
  name: 'dataDictionary',

  components: { edit, tedit },

  mixins: [list_mixins],

  data () {
    return {
      loading: false, // 列表load
      tableData: [], // 表格数据
      sels: [],
      addVisible: false,
      editVisible: false,
      tAddVisible: false,
      tEditVisible: false,
      editModel: null, // 编辑数据
      tEditModel: null,
      search: {
        name: "",
        addr: []
      },
      filterText: '',
      treeLoading: true,
      data: [{
        label: '数据字典',
        children: []
      }],
      defaultProps: {
        children: "children",
        label: "label"
      },
      dict_entry: '' // 字典条目
    };
  },

  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },

  created () {
    this.initData();
  },

  methods: {
    // 查询字典条目
    async F500102 () {
      const params = {}
      const resData = await F500102(params)
      this.data[0].children = resData.data.data || []
      this.data[0].children.forEach((item, index) => {
        item.label = item.dict_entry + " " + item.entry_name
      })
      this.treeLoading = false
    },
    // 查询数据字典
    async F500106 () {
      const params = {
        dict_entry: this.dict_entry,
        condition: this.search.name
      }
      try {
        const resData = await F500106(params)
        if (resData.status === 200 && resData.data.code === 0) {
          this.tableData = resData.data.data
        } else {
          this.$message.error(resData.data.message)
        }
      } catch (e) {
        this.$message.error('服务器异常')
      } finally {
        this.treeLoading = false
      }
    },
    initData () {
      this.F500102()
      this.F500106()
    },
    // 字典条目删除
    async F500104 () {
      const params = {
        dict_entry: this.dict_entry
      }
      await F500104(params)
      this.$message.success('删除字典成功')
      this.initData()
    },
    // 数据字典删除
    async F500107 (row) {
      const params = {
        subentry: row.subentry,
        dict_entry: this.dict_entry
      }
      await F500107(params)
      this.$message.success('删除成功')
      this.F500106()
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
    handleAdd () {
      if (this.dict_entry === '') {
        this.addVisible = true
      } else {
        this.tEditModel.type = '0'
        this.tAddVisible = true
      }
    },
    tAdd (data) {
      this.tEditModel.type = '0'
      this.tAddVisible = true
    },
    handleEdit () {
      this.editModel.type = '1'
      this.editVisible = true;
    },
    tHandleEdit (row) {
      row.type = '1'
      this.tEditModel = row
      this.tEditVisible = true
    },
    handleSaveSuccess () {
      this.addVisible = false;
      this.editVisible = false;
      this.initData();
    },
    tHandleSaveSuccess () {
      this.tAddVisible = false
      this.tEditVisible = false
      this.F500106()
    },
    handleDel (row) {
      this.$confirm('删除字典将连字典条目一同删除! 你确定要删除字典数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.F500104()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    tHandleDel (row) {
      this.$confirm('你确定要删除字典条目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.F500107(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleNodeClick (data) {
      if (data.label === this.data[0].label) {
        this.editModel = null
        this.tEditModel = null
        this.dict_entry = ''
      } else {
        this.tEditModel = data
        this.editModel = data
        this.dict_entry = data.dict_entry
      }
      this.F500106()
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>

<style lang="scss" scoped>
  .data_dictionary_tree {
    overflow: scroll;
    .el-tree {
      width: 220%;
    }
  }
</style>
