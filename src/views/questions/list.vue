<template>
  <el-scrollbar style="height: 100%">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.testName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column type="index" :index="1" />
      <el-table-column label="考试编号" prop="testSerial" />
      <el-table-column label="考试日期" prop="testDate" sortable />
      <el-table-column label="考试科目" prop="testName" sortable />
      <el-table-column label="考试时间" prop="startTime" />
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="输入考试科目搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.status"
            type="danger"
            @click="takeTest(scope.$index, scope.row)"
          >参加考试</el-button>
          <el-tag
            v-show="scope.row.status"
            type="success"
            :disable-transitions="true"
          >已完成</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="考试提示" :visible.sync="dialogVisible" width="30%">
      <el-descriptions class="margin-top" title="开始考试" :column="1" border>
        <el-descriptions-item>
          <template slot="label"> 考试编号 </template>
          {{ testInfo.testSerial }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 考试科目 </template>
          {{ testInfo.testName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 题目数目 </template>
          {{ testInfo.topicNum }} 道
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 总分 </template>
          {{ testInfo.topicScore * testInfo.topicNum }} 分
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"> 考试时间 </template>
          {{ testInfo.testTime }} 分钟
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="startTest()"
        >开 始</el-button>
      </span>
    </el-dialog>
  </el-scrollbar>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      tableData: [],
      dialogVisible: false,
      testInfo: {
        testName: '',
        testSerial: '',
        testTime: '',
        number: '',
        testDate: ''
      },
      loading: false
    }
  },
  async mounted() {
    const res = await this.$api.test.getArrange({ class: this.$store.getters.info.class, name: this.$store.getters.info.name, studentID: this.$store.getters.info.studentID })
    this.tableData = res.data.sort((a, b) => {
      return parseInt(a.testDate.split('-')[2]) - parseInt(b.testDate.split('-')[2])
    })
  },
  methods: {
    takeTest(index, row) {
      const xtDate = new Date()
      const getDate = (year = xtDate.getFullYear(), month = xtDate.getMonth() + 1, day = xtDate.getDate(), hour = xtDate.getHours(), minute = xtDate.getMinutes()) => {
        const time = new Date(year, month, day, hour, minute).getTime()
        return time
      }
      const date = row.testDate.split('-')
      const time = row.startTime.split(':')
      const times = row.startTime.split(':')
      if (parseInt(time[1]) + 15 >= 60) {
        time[1] = parseInt(time[1]) - 45
        if (parseInt(time[0]) + 1 >= 24) {
          time[0] = 0
        } else {
          time[0] = parseInt(time[0]) + 1
        }
      } else {
        time[1] = parseInt(time[1]) + 15
      }
      const nowDate = getDate()
      const testDate = getDate(date[0], date[1], date[2], time[0], time[1])
      const startTime = getDate(date[0], date[1], date[2], times[0], times[1])
      if (nowDate > testDate) {
        this.$message({ message: '你已超过考试规定开始时间，系统已帮你自动交卷', type: 'error' })
        setTimeout(() => {
          this.$api.score.setScore({ score: 0, testSerial: row.testSerial, testName: row.testName, studentID: this.$store.getters.info.studentID, name: this.$store.getters.info.name, testDate: row.testDate, completeTime: 0, class: this.$store.getters.info.class }).then(res => {
            this.$router.go(0)
          })
        }, 2000)
      } else if (nowDate < startTime) {
        this.$message({ message: '请等待考试规定时间开始考试！', type: 'warning' })
      } else {
        this.dialogVisible = true
        this.testInfo.testName = row.testName
        this.testInfo.topicNum = row.topicNum
        this.testInfo.testSerial = row.testSerial
        this.testInfo.testTime = row.testTime
        this.testInfo.testDate = row.testDate
        this.testInfo.topicScore = row.topicScore
      }
    },
    async startTest() {
      // this.dialogVisible = false
      this.loading = true
      this.$store.dispatch('test/setTestInfo', this.testInfo).then(() => {
        this.$router.replace('/test')
      })
    }
  }
}
</script>
