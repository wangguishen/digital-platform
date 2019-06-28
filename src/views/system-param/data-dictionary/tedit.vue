<template>
  <el-form ref="form" :model="model" :rules="rules" class="c-form" label-width="80px">
    <el-form-item label="字典条目" prop="dict_entry">
      <el-input v-model="model.dict_entry" placeholder="请输入字典条目" disabled />
    </el-form-item>
    <el-form-item label="字典名称" prop="entry_name">
      <el-input v-model="model.entry_name" placeholder="请输入字典名称" disabled />
    </el-form-item>
    <el-form-item label="字典子项" prop="subentry">
      <el-input v-model="model.subentry" placeholder="请输入字典子项" :disabled="model.type === '1'" />
    </el-form-item>
    <el-form-item label="子项名称" prop="dict_prompt">
      <el-input v-model="model.dict_prompt" placeholder="请输入子项名称" clearable filterable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">确定</el-button>
      <el-button @click="confirm()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { F500105, F500108 } from '@/service/api'
export default {
  props: {
    model: {
      type: Object,
      default () {
        return {
          branch_no: ' ', // 分支机构
          dict_entry: '', // 字典条目
          entry_name: '', // 字典名称
          dict_type: '1', // 字典类型
          subentry: '', // 字典子项
          access_level: '1', // 存取级别
          dict_prompt: '', // 子项名称
          type: '0' // 0新增 1修改
        }
      }
    }
  },

  data () {
    return {
      rules: {
        dict_entry: [
          { required: true, message: '请输入字典条目', trigger: 'blur' }
        ],
        entry_name: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        subentry: [
          { required: true, message: '请输入字典子项', trigger: 'blur' }
        ],
        dict_prompt: [
          { required: true, message: '请输入子项名称', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 数据字典添加
    async F500105 () {
      await F500105(this.model)
      this.$message.success('新增字典成功')
      this.$emit("success")
    },
    // 数据字典修改
    async F500108 () {
      await F500108(this.model)
      this.$message.success('修改字典成功')
      this.$emit("success")
    },
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.model.type === '0') { // 新增
            this.F500105()
          } else { // 修改
            this.F500108()
          }
        }
      })
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

