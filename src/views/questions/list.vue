<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="相关内容">
              <el-input v-model="searchObj.content" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-button type="primary" icon="el-icon-search" size="mini" :loading="loading" @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>
    <el-scrollbar style="height: 100%">
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        border
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @selection-change="handleSelectionChange"
      >

        <el-table-column type="selection" fixed />
        <el-table-column label="序号" width="49">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          prop="type"
          width="66"
          :filters="[{text: '单选题', value: 1}, {text: '多选题', value: 2}, {text: '判断题', value: 3}]"
          :filter-method="filterHandler"
        >
          <template slot-scope="{ row }">
            <span v-if="row.type === 1">单选题</span>
            <span v-else-if="row.type === 2">多选题</span>
            <span v-else-if="row.type === 3">判断题</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="内容" prop="content" sortable />
        <el-table-column
          label="选项"
          prop="options"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.options !== null">
              {{ scope.row.options }}
            </div>
            <div v-else>
              无选项
            </div>
          </template>
        </el-table-column>
        <el-table-column label="答案" prop="answer" />
        <el-table-column
          label="难度"
          prop="difficulty"
          width="66"
          :filters="[{text: '简单', value: 1}, {text: '正常', value: 2}, {text: '困难', value: 3}]"
          :filter-method="filterHandler"
        >
          <template slot-scope="{ row }">
            <span v-if="row.difficulty === 1">简单</span>
            <span v-else-if="row.difficulty === 2">正常</span>
            <span v-else-if="row.difficulty === 3">困难</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="分数" width="50" prop="score" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column
          fixed="right"
          label="操作"
          width="136"
        >
          <template slot-scope="scope">

            <el-button
              icon="el-icon-search"
              circle
              size="small"
              @click="handleClick(scope.row)"
            />
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="small"
              circle
            />
            <el-button size="small" type="danger" icon="el-icon-delete" circle @click="removeDataById(scope.row.id)" />
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        :current-page="page"
        :total="total"
        :page-size="limit"
        style="padding:30px 0; text-align:center"
        layout="total,prev,pager,next,jumper"
        @current-change="fetchData"
      />
    </el-scrollbar>
  </div>
</template>
<script>
import api from '@/api/question/question'

export default {
  // 定义数据模型
  data() {
    return {
      list: [], // 角色列表
      page: 1, // 当前页
      limit: 10, // 每页显示记录书
      total: 0, // 总记录数
      listLoading: false,
      loading: false,
      searchObj: {} // 条件对象
    }
  },
  // 页面渲染成功后获取数据
  created() {
    this.fetchData()
  },

  // 定义方法
  methods: {
    fetchData(current = 1) {
      this.page = current
      api.getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
          // 如果当前页的数据为空并且当前页不是第一页，则将当前页码减1，重新获取上一页的数据
          if (this.list.length === 0 && this.page > 1) {
            this.page--
            this.fetchData()
          }
        })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleSelectionChange(selection) {
      console.log(selection)
      this.multipleSelection = selection
    },
    resetData() {
    // your method logic here
    },
    // 单个删除
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录，是否继续？', '提示', {
        confirmButonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        return api.removeById(id)
      }).then((response) => {
        // 点击确定，调用删除方法
        // 刷新页面
        this.fetchData(this.page)
        // 提示信息
        this.$message.success(response.msg || '删除成功')
      })
    }
  }
}
</script>
