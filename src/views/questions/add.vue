<template>
  <div class="app-container">
    <el-form ref="questionForm" :model="questionForm" :rules="rules" label-width="100px" class="demo-questionForm">
      <el-form-item label="题目类型" prop="type" required>
        <el-select v-model="questionForm.type" placeholder="请选择类型">
          <el-option label="单选题" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="题目内容" prop="content" required>
        <el-input v-model="questionForm.content" />
      </el-form-item>
      <el-form-item label="选项" prop="options">
        <el-row v-for="(option, index) in questionOptions" :key="index">
          <el-col :span="1">
            {{ String.fromCharCode(65 + index) }}.</el-col>
          <el-col :span="20">
            <el-input v-model="option.value" placeholder="选项" />
          </el-col>
          <el-col v-if="index >= 2" :span="2">
            <el-button type="danger" icon="el-icon-minus" @click="removeOption(index)" />
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" style="text-align: right">
            <el-button type="primary" icon="el-icon-plus" @click="addOption">添加选项</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="答案" prop="answer">
        <el-radio-group v-model="questionForm.answer">
          <el-radio v-for="(option, index) in questionOptions" :key="index" :label="String.fromCharCode(65 + index)" :disabled="index >= questionForm.answerCount">
            {{ String.fromCharCode(65 + index) }}
          </el-radio>
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
      <el-form-item label="答案解析" prop="desc">
        <el-input v-model="questionForm.description" type="textarea" />
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
      questionOptions: [],
      inputStyle: { 'flex': 1 },
      questionForm: {
        'type': '',
        'content': '',
        'answer': [],
        'options': [],
        'score': 0,
        'difficulty': ''
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
      this.questionOptions.push({ 'name': '', 'value': '' })
    },
    removeOption(index) {
      this.questionOptions.splice(index, 1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = { ...this.questionForm }

          params.options = this.questionOptions.map(obj => ({ ...obj, value: JSON.stringify(obj.value) }))

          // 将选项数据转换为一个带有字母标识的字符串数组
          const optionStrings = params.options.map((option, index) => {
            const value = JSON.parse(option.value)
            const name = String.fromCharCode(65 + index)
            console.log(`name ${name} value:`, value)
            return `${name}. ${value}`
          })
          const optionsString = JSON.stringify(optionStrings)

          const answerStrings = JSON.parse(`["${this.questionForm.answer}"]`)
          const answerString = JSON.stringify(answerStrings)

          // 构建表单数据对象
          const formData = {
            type: this.questionForm.type,
            content: this.questionForm.content,
            options: optionsString,
            answer: answerString,
            score: this.questionForm.score,
            difficulty: this.questionForm.difficulty
          }
          console.log(formData)
          api.save(formData).then(response => {
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
