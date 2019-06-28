<template>
  <div>
    <el-form :inline="true" :model="formData" class="toolbar">
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addClick">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model.number="formData.searchText" placeholder="请输入配置编号" clearable size="mini" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-row> -->
    <!-- <el-col :span="24"> -->
    <el-table
      v-loading="loading"
      :data="tableData"
      :height="tableHeight"
      border
      stripe
      style="width: 100%;"
      :size="TABLE_SIZE"
      @header-dragend="headerDraend"
    >
      <!-- position: absolute; width: 100%; max-width: none; -->
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="config_no" label="配置编号" :width="columnWidth.widthConfigNo" />
      <el-table-column prop="config_name" label="配置名称" :width="columnWidth.widthConfigName" />
      <el-table-column prop="config_type" label="配置类型" :width="columnWidth.widthConfigType" />
      <el-table-column prop="data_type" label="数据类型" :width="columnWidth.widthDataType" />
      <el-table-column prop="data_value" label="数据值" :width="columnWidth.widthDataValue" />
      <el-table-column prop="remark" label="说明" />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateButtonClick(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- </el-col> -->
    <!-- </el-row> -->
    <el-dialog title="参数配置" :visible.sync="dialogFormVisible">
      <el-form
        v-if="dialogFormVisible"
        ref="configForm"
        :rules="rules"
        :model="currentConfigObj"
        label-width="80px"
      >
        <el-form-item label="配置名称" prop="config_name" required>
          <el-input v-model="currentConfigObj.config_name" placeholder="请输入配置名称" />
        </el-form-item>
        <el-form-item label="配置类型" prop="config_type" required>
          <el-select v-model="currentConfigObj.config_type" placeholder="请选择配置类型">
            <el-option label="系统级开关" value="0" />
            <el-option label="功能配置开关" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型" prop="data_type" required>
          <el-select v-model="currentConfigObj.data_type" placeholder="请选择数据类型" @change="dataTypeChange">
            <el-option label="单字符型" value="0" />
            <el-option label="整数型" value="1" />
            <el-option label="字符串型" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="label" prop="data_type_value" required>
          <el-input v-model="currentConfigObj.data_type_value" placeholder="请输入数据值" />
        </el-form-item>
        <el-form-item label="说明" prop="remark" required>
          <el-input v-model="currentConfigObj.remark" type="textarea" placeholder="请输入说明" />
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
import {
  addSysconfig,
  deleteSysconfigByConfigNo,
  getSysConfigList,
  getSysconfigByConfigNo,
  updateSysconfigByConfigNo
} from "@/service/api.js";
import { mapMutations } from 'vuex';
import { list_mixins } from '@/mixins'
export default {
  name: "systemParameter",
  mixins: [list_mixins],
  data () {
    var config_name = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("配置名称不能为空"));
      } else {
        callback();
      }
    };
    var config_type = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("配置类型不能为空"));
      } else {
        callback();
      }
    };
    var data_type = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("数据类型不能为空"));
      } else {
        callback();
      }
    };
    var data_type_value = (rule, value, callback) => {
      // debugger;
      if (value === "" || value === null) {
        // console.log(this.currentConfigObj, "klz");
        let label;
        switch (this.currentConfigObj.data_type) {
          case "0":
            label = "单字符值";
            break;
          case "1":
            label = "整数型值";
            break;
          case "2":
            label = "字符串值";
            break;
          default:
            break;
        }
        callback(new Error(`${label}不能为空`));
      } else {
        const reg1 = /^[a-zA-Z0-9]{1,1}$/g;
        const reg2 = /^\d{1,}$/g;

        switch (this.currentConfigObj.data_type) {
          case "0":
            if (!reg1.test(value)) {
              callback(new Error("只能输入一位数字或字母"));
            }
            break;
          case "1":
            if (!reg2.test(value)) {
              callback(new Error("只能输入数字"));
            }
            break;
          case "2":
            callback();
            break;
          default:
            break;
        }
        callback();
      }
    };
    var remark = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("说明不能为空"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      tHeight: 0, // 自适应tableheight
      isUpdate: false, // 是否是修改
      label: "数据值",
      currentConfigObj: {
        // 当前
        config_no: "", // id
        config_name: "", // 配置名称
        config_type: "", // 配置类型
        data_type: "", // 数据类型
        char_config: "0", // 字符值
        int_config: "0", // 整数值
        str_config: "0", // 字符串值
        remark: "", // 备注
        data_type_value: null // 数据类型值
      },
      dialogFormVisible: false,
      formData: {
        searchText: ""
      },
      tableData: [],
      rules: {
        config_name: [{ validator: config_name, trigger: "blur" }],
        config_type: [{ validator: config_type, trigger: "blur" }],
        data_type: [{ validator: data_type, trigger: "blur" }],
        data_type_value: [{ validator: data_type_value, trigger: "blur" }],
        remark: [{ validator: remark, trigger: "blur" }]
      }
    };
  },
  computed: {
    columnWidth () {
      return this.$store.state.tableColumnWidth.sysParamsConfigColumnWidth;
    }
  },
  watch: {
    currentConfigObj: {
      handler: function (cur, old) {
        switch (cur.data_type) {
          case "0":
            this.label = "字符值";
            break;
          case "1":
            this.label = "整数型";
            break;
          case "2":
            this.label = "字符串值";
            break;
          default:
            break;
        }
      },
      deep: true
    }
  },
  created () {
    this.init();
  },
  methods: {
    ...mapMutations(['SET_COLUMN_WIDTH', 'GET_COLUMN_WIDTH']),
    init () {
      this.GET_COLUMN_WIDTH({ key: 'sysParamsConfigColumnWidth' });
      this.getList();
    },
    // 列表数据
    async getList () {
      this.loading = true;
      this.tableData = [];
      const res = await getSysConfigList({});
      if (res.data.state === 200) {
        this.loading = false;
        this.tableData = res.data.data;
      }
    },
    // 新增按钮
    addClick () {
      this.currentConfigObj.config_no = "";
      this.currentConfigObj.config_name = "";
      this.currentConfigObj.config_type = "";
      this.currentConfigObj.char_config = "0";
      this.currentConfigObj.int_config = "0";
      this.currentConfigObj.str_config = "0";
      this.currentConfigObj.remark = "";
      this.currentConfigObj.data_type_value = null;
      this.currentConfigObj.data_type = "";

      this.dialogFormVisible = true;
      this.isUpdate = false;
    },
    // 修改按钮
    updateButtonClick (item) {
      // console.log(item, "item");
      this.dialogFormVisible = true;
      this.isUpdate = true;
      this.currentConfigObj.config_no = item.config_no;
      this.currentConfigObj.config_name = item.config_name;
      this.currentConfigObj.config_type = item.config_type;
      this.currentConfigObj.data_type = item.data_type;
      this.currentConfigObj.data_type_value = item.data_value;
      this.currentConfigObj.remark = item.remark;
    },
    // 修改
    async update () {
      let config_type, data_type;
      if (this.currentConfigObj.config_type === "系统级开关") {
        config_type = "0";
      } else {
        config_type = "1";
      }
      if (this.currentConfigObj.data_type === "单字符型") {
        data_type = "0";
      } else if (this.currentConfigObj.data_type === "整数型") {
        data_type = "1";
      } else {
        data_type = "2";
      }
      const params = {
        config_no: this.currentConfigObj.config_no,
        config_name: this.currentConfigObj.config_name,
        config_type: config_type,
        data_type: data_type,
        char_config: this.currentConfigObj.char_config,
        int_config: this.currentConfigObj.int_config,
        str_config: this.currentConfigObj.str_config,
        remark: this.currentConfigObj.remark
      };
      switch (data_type) {
        case "0":
          params.char_config = this.currentConfigObj.data_type_value;
          break;
        case "1":
          params.int_config = this.currentConfigObj.data_type_value;
          break;
        case "2":
          params.str_config = this.currentConfigObj.data_type_value;
          break;
        default:
          break;
      }
      // console.log(params, "params");
      const res = await updateSysconfigByConfigNo(params);
      // debugger;
      if (res.data.state === 200) {
        await this.getList();
        this.$refs.configForm.resetFields();
        this.dialogFormVisible = false;

        this.$message({
          type: "success",
          message: "修改成功"
        });
      }
    },
    // 新增
    async addObj () {
      const params = {
        config_name: this.currentConfigObj.config_name,
        config_type: this.currentConfigObj.config_type,
        data_type: this.currentConfigObj.data_type,
        char_config: "0",
        int_config: "0",
        str_config: "0",
        remark: this.currentConfigObj.remark
      };
      switch (this.currentConfigObj.data_type) {
        case "0":
          params.char_config = this.currentConfigObj.data_type_value;
          break;
        case "1":
          params.int_config = this.currentConfigObj.data_type_value;
          break;
        case "2":
          params.str_config = this.currentConfigObj.data_type_value;
          break;
        default:
          break;
      }
      for (const key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }
      const res = await addSysconfig(params);
      if (res.data.state === 200) {
        await this.getList();
        this.$refs.configForm.resetFields();
        this.dialogFormVisible = false;
        this.$message({
          type: "success",
          message: "新增成功"
        });
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
            config_no: item.config_no
          };
          const res = await deleteSysconfigByConfigNo(params);
          if (res.data.state === 200) {
            await this.getList();
            this.$message({
              type: "warning",
              message: "删除成功"
            });
          }
        })
        .catch(() => {});
    },
    // 查询by config_no（配置编号）
    async search () {
      if (this.formData.searchText) {
        const params = {
          config_no: this.formData.searchText
        };
        const res = await getSysconfigByConfigNo(params);
        if (res.data.state === 200) {
          this.tableData = [];
          if (res.data.data !== null) {
            this.tableData.push(res.data.data);
          }
        } else {
          this.$message({
            type: "warning",
            message: res.data.message
          });
        }
      } else {
        this.getList();
      }
    },
    // 表单提交
    async addOrUpdateSubmit (isUpdate) {
      this.$refs.configForm.validate(async valid => {
        if (valid) {
          if (isUpdate) {
            // 修改
            await this.update();
          } else {
            // 新增
            await this.addObj();
          }
        }
      });
    },
    dataTypeChange () {
      this.currentConfigObj.data_type_value = null;
    },
    // 表头拖拽改变列宽度
    headerDraend (newWidth, oldWidth, column, event) {
      switch (column.label) {
        case '配置编号':
          this.widthConfigNo = newWidth;
          this.SET_COLUMN_WIDTH({ key: 'sysParamsConfigColumnWidth', value: { widthConfigNo: newWidth }})
          break;
        case '配置名称':
          this.widthConfigName = newWidth;
          this.SET_COLUMN_WIDTH({ key: 'sysParamsConfigColumnWidth', value: { widthConfigName: newWidth }})
          break;
        case '配置类型':
          this.widthConfigType = newWidth;
          this.SET_COLUMN_WIDTH({ key: 'sysParamsConfigColumnWidth', value: { widthConfigType: newWidth }})
          break;
        case '数据类型':
          this.widthDataType = newWidth;
          this.SET_COLUMN_WIDTH({ key: 'sysParamsConfigColumnWidth', value: { widthDataType: newWidth }})
          break;
        case '数据值':
          this.widthDataValue = newWidth;
          this.SET_COLUMN_WIDTH({ key: 'sysParamsConfigColumnWidth', value: { widthDataValue: newWidth }})
          break;
        default:
          break;
      }
      console.log(newWidth, oldWidth, column, event)
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" >
.sys_set {
	margin-top: 30px;
	.el-select {
		width: 100%;
	}
}
</style>
