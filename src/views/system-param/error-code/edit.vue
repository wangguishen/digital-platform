<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="错误编号" prop="error_no">
        <el-input v-model="form.error_no" />
      </el-form-item>
      <el-form-item label="错误描述" prop="error_info">
        <el-input v-model="form.error_info" type="textarea" />
      </el-form-item>
      <el-form-item label="错误原因" prop="error_reason">
        <el-input v-model="form.error_reason" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">取 消</el-button>
      <el-button type="primary" @click="sureClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
const validateErrorNo = (rule, value, callback) => {
  const reg = /^[0-9]+.?[0-9]*$/;
  console.log('value', value)
  if (!value) {
    return callback(new Error('请输入错误编码'));
  }
  if (!reg.test(value)) {
    callback(new Error('错误编码必须为数字'));
  } else {
    if (value.length !== 4) {
      callback(new Error('错误编码长度必须为4位'));
    } else {
      callback();
    }
  }
};
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default () {
        return {
          error_no: '',
          error_info: '',
          error_reason: ''
        }
      }
    }
  },
  data () {
    return {
      rules: {
        error_no: [
          { required: true, validator: validateErrorNo, trigger: 'blur' }
        ],
        error_info: [
          { required: true, message: '请输入错误描述', trigger: 'blur' }
        ],
        error_reason: [
          { required: true, message: '请输入错误原因', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$refs['form'].resetFields();
      this.$emit('cancelClick')
    },
    sureClick () {
      const self = this;
      self.$refs['form'].validate((valid) => {
        if (valid) {
          self.$emit('sureClick', self.form)
        } else {
          return false;
        }
      });
    },
    cancelClick () {
      this.$refs['form'].resetFields();
      this.$emit('cancelClick')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
