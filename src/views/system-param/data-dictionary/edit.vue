<template>
  <el-form ref="form" :model="model" :rules="rules" class="c-form" label-width="80px">
    <el-form-item label="字典名称" prop="entry_name">
      <el-input v-model="model.entry_name" placeholder="请输入字典名称" clearable filterable maxlength="50" />
    </el-form-item>
    <el-form-item label="存取级别" prop="access_level">
      <el-select v-model="model.access_level" placeholder="请选择存取级别" clearable filterable>
        <el-option v-for="(l, i) in levelData" :key="i" :label="l.label" :value="l.value" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">确定</el-button>
      <el-button @click="confirm()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { F500101, F500103 } from '@/service/api'
export default {
  props: {
    model: {
      type: Object,
      default () {
        return {
          manage_level: ' ', // 管理级别
          entry_name: '', // 条目名称
          access_level: '', // 存取级别
          dict_type: '1', // 字典类型
          dict_kind: '1', // 字典分类
          type: '0' // 0新增 1修改
        }
      }
    }
  },

  data () {
    return {
      levelData: [{
        label: '不可更改',
        value: '0'
      }, {
        label: '可更改',
        value: '1'
      }],
      rules: {
        entry_name: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        access_level: [
          { required: true, message: '请选择存取级别', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.model.type === '0') { // 新增
            this.F500101()
          } else { // 修改
            this.F500103()
          }
        }
      })
    },
    confirm () {
      this.$emit('confirm')
    },
    // 新增字典条目
    async F500101 () {
      await F500101(this.model)
      this.$message.success('新增字典成功')
      this.$emit("success")
    },
    // 修改字典条目
    async F500103 () {
      await F500103(this.model)
      this.$message.success('修改字典成功')
      this.$emit("success")
    }
  }
}
</script>

