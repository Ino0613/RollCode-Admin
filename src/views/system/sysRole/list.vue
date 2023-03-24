<template>
  <div class="app-container">

    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input v-model="searchObj.username" style="width: 100%" placeholder="角色名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" :loading="loading" @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" />

      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * pageSize + scope.$index + 1 }}
        </template>

      </el-table-column>

      <el-table-column prop="username" label="用户名" />
      <el-table-column
        prop="gender"
        label="用户性别"
      >
        <template slot-scope="scope">
          {{ scope.row.gender == '0' ? '男': '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="level" label="用户等级" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column prop="updateTime" label="更新时间时间" width="160" />
      <el-table-column
        prop="isDeleted"
        label="账号状态"
        width="160"
      >
        <template slot-scope="scope">
          {{ String(scope.row.status) === '1' ? '已禁用' : '正常' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">

        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="edit(scope.row.id)" />
          <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" @click="removeDataById(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 工具条 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add" @close="resetForm">添 加</el-button>
      <el-button class="btn-add" size="mini" @click="batchRemove()">批量删除</el-button>
    </div>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="pageSize"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%" @visible-change="resetForm">
      <el-form ref="dataForm" :model="sysRole" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="用户名">
          <el-input v-model="sysRole.username" />
        </el-form-item>
        <el-form-item label="用户性别">
          <el-input v-model="sysRole.gender" />
        </el-form-item>
        <el-form-item label="用户状态">
          <template>
            <el-switch
              v-model="sysRole.status"
              inactive-color="#13ce66"
              active-color="#ff4949"
              inactive-text="开启"
              active-text="禁用"
              active-value="1"
              inactive-value="0"
            />
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-refresh-right" @click="dialogVisible = false" @close="resetForm()">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" size="small" @click="saveOrUpdate()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// 引入定义接口js文件
import api from '@/api/system/sysRole'

export default {
  // 初始值
  data() {
    return {
      list: [], // 角色列表
      total: 0, // 总记录数
      page: 1, // 当前页
      pageSize: 10, // 每页显示记录数
      searchObj: {}, // 查询
      multipleSelection: [], // 批量删除选中的记录列表

      listLoading: false, // 添加listLoading属性
      dialogVisible: false,
      loading: false, // 用来标识是否正在保存请求中的标识, 防止重复提交
      sysRole: {
        username: '',
        gender: '',
        status: 0
      },
      saveBtnDisabled: false
    }
  },
  created() { // 渲染之前执行
    this.fetchData()
  },
  methods: { // 操作方法
    resetForm() {
      this.$refs.dataForm.resetFields()
    },
    // 状态修改
    statusHandle(row) {
      this.id = row.id
      this.status = row.status
      this.$confirm('确认调整该账号的状态?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        api.enableOrDisableUser({ 'id': this.id, 'status': !this.status ? 1 : 0 }).then(res => {
          console.log('enableOrDisableUser', res)
          if (String(res.code) === '1') {
            this.$message.success('账号状态更改成功！')
            this.handleQuery()
          }
        }).catch(err => {
          this.$message.error('请求出错了：' + err)
        })
      })
    },
    // 当多选选项发生变化的时候调用
    handleSelectionChange(selection) {
      console.log(selection)
      this.multipleSelection = selection
    },
    // 条件分页查询
    fetchData(current = 1) {
      this.page = current
      api.getPageList(this.page, this.pageSize, this.searchObj)
        .then(response => {
          // console.log(this.page, this.limit, this.total, this.searchObj)
          this.list = response.data.records
          this.total = response.data.total
        })
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    // 点击修改，弹出框，根据id查询数据显示
    edit(id) {
      // 弹出框
      this.dialogVisible = true
      // 根据id查询
      this.fetchDataById(id)
    },

    fetchDataById(id) {
      api.getById(id).then(response => {
        this.sysRole = response.data
      })
    },

    // 点击添加弹框
    add() {
      this.resetForm()
      this.dialogVisible = true
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true // 防止表单重复提交
      // 根据id判断
      if (!this.sysRole.id) { // 添加
        this.sysRole.status = parseInt(this.sysRole.status) // 将状态值转换为数字类型
        this.saveData()
      } else { // 修改
        this.sysRole.status = parseInt(this.sysRole.status) // 将状态值转换为数字类型
        this.updateData()
      }
    },
    // 重置查询表单
    resetData() {
      // console.log('重置查询表单')
      this.searchObj = {}
      this.createTimes = []
      this.fetchData()
    },

    // 新增
    saveData() {
      api.save(this.sysRole).then(response => {
        // 提示
        this.$message.success(response.msg || '操作成功')
        // 关闭弹框
        this.dialogVisible = false
        // 刷新页面
        this.fetchData(this.page)
      })
    },

    // 修改
    updateData() {
      api.updateById(this.sysRole).then(response => {
        // 提示
        this.$message.success(response.msg || '操作成功')
        // 关闭弹框
        this.dialogVisible = false
        // 刷新页面
        this.fetchData(this.page)
      })
    },
    // 删除选中的记录
    // 批量删除选中的记录列表
    batchRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要删除的记录！')
        return
      }
      this.$confirm('此操作将永久删除该记录，是否继续？', '提示', {
        confirmButonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      }).then(() => {
        // 点击确定，调用删除方法
        const idList = this.multipleSelection.map(item => item.id)
        return api.batchRemove(idList)
      })
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

<style scoped>
.line {
  text-align: center;
}
</style>

