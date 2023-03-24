<template>
  <div class="app-container">
    <el-form ref="questionForm" :model="questionForm" :rules="rules" label-width="100px" class="demo-questionForm">
      <el-form-item label="题目类型" prop="type" required>
        <el-select v-model="questionForm.type" placeholder="请选择类型">
          <el-option label="简答题" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="题目内容" prop="content" required>
        <el-input v-model="questionForm.content" />
      </el-form-item>
      <!-- <el-form-item label="填空" prop="options">
        <el-input v-model="questionForm.options" type="textarea" />
      </el-form-item> -->
      <el-form-item label="答案" prop="answer">
        <el-input v-model="questionForm.answer" type="textarea" />
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
        type: '4',
        content: '',
        options: [],
        answer: [],
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
        options: [
          { message: '请输入选项', trigger: 'blue' }
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const answerStrings = JSON.parse(`["${this.questionForm.answer}"]`)
          const answerString = JSON.stringify(answerStrings)
          // 构建表单数据对象
          const formData = {
            type: this.questionForm.type,
            content: this.questionForm.content,
            options: '[""]',
            answer: answerString,
            score: this.questionForm.score,
            difficulty: this.questionForm.difficulty
          }
          console.log(formData)
          api.save(this.questionForm).then(response => {
            // 提示
            this.$message.success(response.msg || '操作成功')
            // 关闭弹框
            this.$router.push('./list')
          })
        } else {
          this.$message.error('出现错误')
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
