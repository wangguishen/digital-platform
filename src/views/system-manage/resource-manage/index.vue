<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="search" :inline="true" class="toolbar">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">创建资源</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-table
        :data="tableData"
        style="width: 100%;"
        row-key="id"
        border
        stripe
        :height="tableHeight"
        :size="TABLE_SIZE"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column fixed type="index" label="序号" width="50" />
        <el-table-column
          prop="serviceName"
          label="资源名称"
          width="200"
        />
        <el-table-column
          prop="serviceKey"
          label="资源标识"
          width="160"
        />
        <el-table-column
          prop="serviceType"
          label="资源类型"
          width="120"
        />
        <el-table-column
          prop="menuUrl"
          label="菜单URL"
          width="240"
        />
        <el-table-column
          prop="funUrls"
          label="功能URLS"
          width="600"
        />
        <el-table-column
          prop="weight"
          label="权重"
          width="50"
        />
        <el-table-column
          prop="statusText"
          label="状态"
        />
        <el-table-column fixed="right" label="操作" width="150">
          <template scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog :visible.sync="addVisible" title="创建资源">
      <edit v-if="addVisible" :options="tableData" @success="handleSaveSuccess" @confirm="addVisible = false" />
    </el-dialog>
    <el-dialog :visible.sync="editVisible" title="编辑资源">
      <edit v-if="editVisible" :model="editModel" :options="tableData" :parents="parents" @success="handleSaveSuccess" @confirm="editVisible = false" />
    </el-dialog>
  </el-row>
</template>

<script>
import { resourceList, resourceDelete } from '@/service/systemManage'
import { treeData, recursionDelete } from '@/utils/publicUtil'
import edit from "./edit"
import { list_mixins } from '@/mixins'
export default {
  name: "resourceManage",

  components: { edit },

  mixins: [list_mixins],

  data () {
    return {
      tableData: [],
      parents: [],
      addVisible: false,
      editVisible: false,
      editModel: null
    }
  },

  computed: {
    isChange () {
      return this.$store.state.slidebar.isChange
    }
  },

  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.resourceList()
    },
    async resourceList () {
      const resData = await resourceList({})
      this.tableData = resData.data.rows
      this.tableData = this.tableData.map(item => {
        const obj = item;
        item.serviceName = item.text;
        obj.statusText = item.status === 'Y' ? '可用' : '禁用';
        return obj
      })
      this.tableData = JSON.parse(treeData(this.tableData))
      this.tableData = recursionDelete(this.tableData)
    },
    async resourceDelete (row) {
      const params = {
        id: row.id
      }
      await resourceDelete(params)
      this.$message.success('删除成功')
      this.$store.dispatch('slidebar/setIsChange', !this.isChange)
      this.initData()
    },
    handleAdd () {
      this.addVisible = true
    },
    handleEdit (row) {
      row.parent = row._parentId
      row.parents = []
      row.parents.push(row.id)
      this.editModel = row
      delete this.editModel._parentId
      this.editVisible = true
    },
    handleDel (row) {
      this.$confirm('你确定要删除这条资源吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resourceDelete(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSaveSuccess () {
      this.addVisible = false;
      this.editVisible = false;
      this.initData();
    }
  }
}
</script>

