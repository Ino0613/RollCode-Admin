<template>
  <div class="app-container">
    <el-form ref="questionForm" :model="questionForm" :rules="rules" label-width="100px" class="demo-questionForm">
      <el-form-item label="题目类型" prop="type" required>
        <el-select v-model="questionForm.type" placeholder="请选择类型">
          <el-option label="判断题" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="题目内容" prop="content" required>
        <el-input v-model="questionForm.content" />
      </el-form-item>
      <el-form-item label="选项" prop="options">
        <el-row>
          <el-col :span="2">✔</el-col>
          <el-col :span="18">
            <el-input v-model="questionForm.options.T" placeholder="选项" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="2">✖</el-col>
          <el-col :span="20">
            <el-input v-model="questionForm.options.F" placeholder="选项" /></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="答案" prop="answer">
        <el-radio-group v-model="questionForm.answer">
          <el-radio value="true" :label="'T'">✔</el-radio>
          <el-radio value="false" :label="'F'">✖</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分数" prop="score" required>
        <el-input-number v-model="questionForm.score" :precision="1" :step="1" :max="10" />
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" required>
        <el-select v-model="questionForm.difficulty">
          <el-option label="简单" value="1" />
          <el-option label="正常" value="2" />
          <el-option label="困难" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input v-model="questionForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('questionForm')">立即创建</el-button>
        <el-button @click="resetForm('questionForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>

import api from '@/api/question/question'
export default {
  data() {
    return {
      domainsSum: 0,
      removeList: [],
      questionForm: {
        type: '',
        content: '',
        options: [],
        answer: ['T', 'F'],
        score: 0,
        difficulty: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择题目类型', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入题目内容', trigger: 'change', pattern: /^[\u0391-\uFFE5A-Za-z]+$/ }
        ],
        answer: [
          { required: true, message: '请输入答案', trigger: 'blue' }
        ],
        score: [
          { required: true, message: '请输入分数', trigger: 'change' }
        ],
        difficulty: [
          { required: true, message: '请选择难度', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    addOption() {
      this.questionForm.options.push('')
    },
    removeOption(index) {
      this.questionForm.options.splice(index, 1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将选项数据转换为一个带有字母标识的字符串数组
          console.log(this.questionForm)
          const T = this.questionForm.options.T
          const F = this.questionForm.options.F
          // 将选项数据转换为一个带有字母标识的字符串数组
          const optionsString = Object.entries({ T, F }).map(([key, value]) => {
            return `${key}. ${value}`
          })

          this.questionForm.options = JSON.stringify(optionsString)
          console.log(this.questionForm.options)
          api.save(this.questionForm).then(response => {
            console.log(response)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
