<template>
  <div class="user_manage">
    <div class="toolbar">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="roleAdd">新增角色</el-button>
      <el-button type="primary" icon="el-icon-refresh-right" size="mini" @click="refresh">刷新</el-button>
    </div>
    <el-row :style="{height:tableHeight + 'px'}">
      <el-col :span="18">
        <el-table
          :data="list"
          :height="tableHeight"
          :size="TABLE_SIZE"
          stripe
          border
          :highlight-current-row="true"
          style="width: 100%;"
          @current-change="handleCurrentChange"
        >
          <el-table-column fixed type="index" label="序号" width="50" />
          <el-table-column prop="roleName" label="角色名称" width="160" />
          <el-table-column prop="description" label="描述" :width="160" />
          <el-table-column prop="statusText" label="状态" />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateButtonClick(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6" class="user_manage_tree">
        <div class="user_manage_tree_header cf">
          <div v-if="isChoosedRow" class="fl user_manage_tree_header_left">
            为[{{ currentRow.roleName }}]分配权限
          </div>
          <div v-else class="fl user_manage_tree_header_left">
            请选择角色
          </div>
          <div class="fr user_manage_tree_header_right" @click="roleRightsSave">
            <!-- <el-button size="mini">保存</el-button> -->
            <el-icon class="el-icon-document" />
          </div>
        </div>
        <!-- <el-scrollbar></el-scrollbar> -->
        <el-tree
          ref="tree"
          class="user_manage_tree_content"
          :style="{height:TABLE_HEIGHT - 37 + 'px'}"
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="currentTreeIds"
          :props="defaultProps"
        />
      </el-col>
    </el-row>
    <my-pagination
      v-if="false"
      :all-total="total"
      :current-page="page"
      :page-size="rows"
      :page-sizes="[30,60,90,120]"
      @pageChange="pageChange"
      @currentChange="currentChange"
    />
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form
        v-if="dialogFormVisible"
        ref="configForm"
        :model="currentForm"
        label-width="80px"
      >
        <!-- :rules="rules" -->
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="currentForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="currentForm.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="状态" prop="statusText">
          <el-select v-model="currentForm.status" clearable filterable placeholder="请选择角色状态">
            <el-option label="可用" value="Y" />
            <el-option label="禁用" value="N" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateSubmit(isUpdate)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, getResourceTree, roleAdd, roleUpdate, roleDel, roleResourceSave } from '@/service/systemManage.js'
import myPagination from "@/components/pagination/my-pagination";
import { list_mixins } from '@/mixins'
export default {
  name: 'roleManage',
  components: { myPagination },
  mixins: [list_mixins],
  data () {
    return {
      isRefresh: false,
      currentTreeIds: [],
      isChoosedRow: false,
      currentRow: {
        roleName: ''
      },
      isUpdate: false,
      title: '',
      currentForm: {
        roleName: '',
        description: '',
        statusText: '',
        status: '',
        id: ''
      },
      roleList: [], // 角色列表
      dialogFormVisible: false,
      list: [],
      formData: {
        loginName: '',
        userName: ''
      },
      page: 1,
      rows: 30,
      total: 0,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    }
  },
  created () {
    this.init();
  },
  methods: {
    init () {
      this.getList();
      this.getResourceTree();
    },
    async getList () {
      const res = await getRoleList({});
      if (this.isRefresh) {
        this.isRefresh = false;
        this.$message({
          type: 'success',
          message: '刷新成功'
        })
      }
      this.list = res.data.rows.map(item => {
        const obj = item;
        obj.ciscRightListIds = item.ciscRightList.map(jItem => { return jItem.id });
        if (item.status === 'Y') {
          obj.statusText = '可用';
        } else {
          obj.statusText = '禁用';
        }
        return obj;
      })
      // debugger;
    },
    // 获取tree Data
    async getResourceTree () {
      const res = await getResourceTree({});
      this.treeData = res.data;
    },
    // 新增
    async roleAdd () {
      this.currentForm.roleName = '';
      this.currentForm.description = '';
      this.currentForm.statusText = '';
      this.currentForm.status = '';
      this.dialogFormVisible = true;
      this.title = '新增角色';
      this.isUpdate = true;
    },
    // 刷新
    async refresh () {
      this.list = [];
      this.isChoosedRow = false;
      this.currentTreeIds = [];
      this.$refs.tree.setCheckedKeys(this.currentTreeIds);
      this.isRefresh = true;
      this.getList();
    },
    // 编辑
    updateButtonClick (item) {
      this.dialogFormVisible = true;
      this.isUpdate = false;
      this.title = '编辑角色';
      this.$nextTick(() => {
        this.currentForm.roleName = item.roleName;
        this.currentForm.description = item.description;
        this.currentForm.statusText = item.statusText;
        this.currentForm.status = item.status;
        this.currentForm.id = item.id;
      })
    },
    // 改变每页页码
    pageChange (pageSize) {
      this.rows = pageSize;
    },
    // 当前页
    currentChange (currentPage) {
      this.page = currentPage;
      this.getList();
    },
    async addOrUpdateSubmit (isUpdate) {
      if (this.isUpdate) {
        const params = {
          isNewRecord: true,
          roleName: this.currentForm.roleName,
          description: this.currentForm.description,
          status: this.currentForm.status
        }
        const res = await roleAdd(params);
        if (res.data.success) {
          this.dialogFormVisible = false;
          this.getList();
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      } else {
        const params = {
          id: this.currentForm.id,
          roleName: this.currentForm.roleName,
          description: this.currentForm.description,
          status: this.currentForm.status
        }
        const res = await roleUpdate(params);
        if (res.data.success) {
          this.dialogFormVisible = false;
          this.getList();
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
        }
      }
    },
    // 删除
    del (item) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const params = {
            id: item.id
          };
          const res = await roleDel(params);
          if (res.data.success) {
            await this.getList();
            this.$message({
              type: "success",
              message: "删除成功"
            });
          } else {
            this.$message({
              type: "warning",
              message: res.data.message
            });
          }
        })
        .catch(() => {});
    },
    // 点击行
    handleCurrentChange (item) {
      this.currentRow = item;
      this.currentTreeIds = item.ciscRightListIds;
      this.$refs.tree.setCheckedKeys(this.currentTreeIds);
      this.isChoosedRow = true;
    },
    // 保存权限
    async roleRightsSave () {
      if (this.isChoosedRow) {
        const formData = new FormData();
        formData.append('id', this.currentRow.id);
        const treeIds = this.getCheckedKeys();
        treeIds.forEach(item => {
          formData.append('rightIds', item);
        })
        // console.log(formData, 'formData');
        const res = await roleResourceSave(formData);
        if (res.data.success) {
          // 将选中的权限节点赋值给对应的this.list
          const nowRowIndex = this.list.findIndex(item => {
            return item.id === this.currentRow.id;
          });
          this.list[nowRowIndex].ciscRightListIds = treeIds;
          this.$message({
            type: 'success',
            message: '权限分配成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: res.data.message
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请点击选择需要为其分配权限的角色'
        })
      }
    },
    // 获取tree 选中的节点id
    getCheckedKeys () {
      const treeIds = this.$refs.tree.getCheckedKeys();
      return treeIds;
    }
  }
}
</script>
<style lang="scss">
.user_manage{
  margin-top: 5px;
  .el-table tr{
    cursor:pointer;
  }
  &_tree{
    border-right:1px solid #ebeef5;
    border-bottom:1px solid #ebeef5;
    &_header{
      height: 37px;
      background-color: #e6edf8;
      line-height: 37px;
      padding:0 10px;
      color: #000;
      font-size: 14px;
      font-weight: 700;
      top: 0;
      left: 0;
      &_right{
        cursor: pointer;
      }
    }
    &_content{
      overflow: auto;
    }
  }

}
</style>

