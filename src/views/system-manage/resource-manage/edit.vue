<template>
  <el-form ref="form" :model="model" :rules="rules" class="c-form" label-width="80px">
    <el-form-item label="父资源">
      <el-cascader
        v-model="model.parents"
        :options="options"
        clearable
        filterable
        :props="setProps"
        @change="change"
      />
    </el-form-item>
    <el-form-item label="资源名称" prop="serviceName">
      <el-input v-model="model.serviceName" placeholder="请输入资源名称" clearable />
    </el-form-item>
    <el-form-item label="资源标识" prop="serviceKey">
      <el-input v-model="model.serviceKey" placeholder="请输入资源标识" clearable />
    </el-form-item>
    <el-form-item label="资源类型" prop="access_level">
      <el-select v-model="model.serviceType" placeholder="请选择资源类型" filterable clearable>
        <el-option v-for="(l, i) in serviceTypeData" :key="i" :label="l.label" :value="l.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="菜单URL">
      <el-input v-model="model.menuUrl" placeholder="请输入资源标识" clearable />
    </el-form-item>
    <el-form-item label="功能URLS" prop="funUrls">
      <el-input v-model="model.funUrls" type="textarea" />
    </el-form-item>
    <el-form-item label="权重">
      <el-input v-model="model.weight" placeholder="请输入权重" clearable @blur="blurText($event)" />
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="model.status" placeholder="请选择状态" filterable clearable>
        <el-option v-for="(l, i) in statusData" :key="i" :label="l.label" :value="l.value" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">确定</el-button>
      <el-button @click="confirm()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { resourceSave } from '@/service/systemManage'
export default {
  props: {
    model: {
      type: Object,
      default () {
        return {
          parents: [],
          parent: '',
          id: '',
          serviceName: '', // 资源名称
          serviceKey: '', // 资源标识
          serviceType: '', // 资源类型
          menuUrl: '', // 菜单URL
          funUrls: '', // 功能URLS
          weight: '', // 权重
          status: 'Y'
        }
      }
    },
    options: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      serviceTypeData: [{
        label: '菜单',
        value: 'MENU'
      }, {
        label: '功能',
        value: 'FUNCTION'
      }, {
        label: '区块',
        value: 'BLOCK'
      }],
      statusData: [{
        label: '可用',
        value: 'Y'
      }, {
        label: '禁用',
        value: 'N'
      }],
      rules: {
        serviceName: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        serviceKey: [
          { required: true, message: '请输入资源标识', trigger: 'blur' }
        ]
      },
      setProps: {
        label: 'text',
        value: 'id',
        checkStrictly: true
      }
    }
  },

  computed: {
    isChange () {
      return this.$store.state.slidebar.isChange
    }
  },

  methods: {
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.resourceSave()
        }
      })
    },
    confirm () {
      this.$emit('confirm')
    },
    // 创建,修改资源
    async resourceSave () {
      delete this.model.parents
      delete this.model.children
      if (!this.model.parent) {
        delete this.model.parent
      }
      for (const key in this.model) {
        this.model[key] = this.model[key] === null ? '' : this.model[key]
      }
      const resData = await resourceSave(this.model)
      if (resData.data.success) {
        this.$message.success("成功")
        this.$store.dispatch('slidebar/setIsChange', !this.isChange)
        this.$emit("success")
      } else {
        this.$message.error(resData.data.message)
      }
    },
    change () {
      this.model.parent = this.model.parents[this.model.parents.length - 1]
    },
    blurText (e) {
      const boolean = new RegExp("^[1-9][0-9]*$").test(e.target.value)
      if (!boolean) {
        this.$message.warning('请输入正整数')
        e.target.value = ''
      }
    }
  }
}
</script>

