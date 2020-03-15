<template>
  <div class="user-list-table">
    <!-- 顶部搜索功能开始 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入用户id" v-model="query" @clear="__getUserList" clearable size="mini">
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="mini" @click="isAddUser = true">添加用户</el-button>
      </el-col>
      <el-col :span="2" :offset="10" v-loading="loading">
        <div style="visibility:hidden">加载</div>
      </el-col>
    </el-row>
    <!-- 顶部搜索功能结束 -->
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column align="center" type="index" label="#" width="50"></el-table-column>
      <el-table-column align="center" prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column align="center" prop="role_name" label="角色" width="180"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="toggleState(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label='编辑'>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button size="mini" type="primary" @click="handleUser(scope.$index, scope.row)">
            <i class="el-icon-user"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页列表 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 20, 30, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户模态框 -->
    <el-dialog title="添加用户" :visible.sync="isAddUser">
      <el-form ref="addUserForm" :model="addUserForm" label-width="80px" :rules="addRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 编辑表格模态框 -->
    <el-dialog title="编辑信息" :visible.sync="editTable.isEditTable">
      <el-form ref="editTable" :model="editTable" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editTable.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editTable.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editTable.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTable.isEditTable = false">取 消</el-button>
        <el-button type="primary" @click="editTableTrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { getUserList, addUser, toggleState, searchUser, editUser } from 'network/users'
export default {
  data() {
    return {
      tableData: [],
      //添加用户相关
      isAddUser: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号码必须为11位', trigger: 'blur' }
        ]
      },
      loading: false,
      // 分页列表
      query: '',
      currentPage: 1,
      pagesize: 5, //每条页数
      total: 0, //所有
      editTable:{
        id: Number,
        isEditTable: false,
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  components: {},

  created() {
    //获取用户列表数据
    this.__getUserList()
  },
  filters: {
    test(val){
      return val
    }
  },
  methods: {
    
    //确定编辑表格
    editTableTrue(){
      console.log(this.editTable)
      this.editTable.isEditTable  = false
      editUser(this.editTable).then(res => {
        // this.__getUserList()
        console.log(res)
      })
      this.__getUserList()
      // this.editTable = {}
      // this.editTable.isEditTable = false
      // this.editTable.username = this.tableData.username
      // this.editTable.email = this.tableData.email
    },

    //编辑表格
    handleEdit(scope){
      console.log(scope.row)
      this.editTable.username = scope.row.username
      this.editTable.email = scope.row.email
      this.editTable.mobile = scope.row.mobile

      console.log(scope.row.id)
      this.editTable.id = scope.row.id


      this.editTable.isEditTable = true
    },
    //分页列表
    handleSizeChange(pagesize) {
      console.log(`每页 ${pagesize} 条`)
      getUserList({ pagenum: this.currentPage, pagesize: pagesize }).then(
        res => {
          let data = res.data.data
          this.tableData = data.users
        }
      )
        this.pagesize = pagesize
    },
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`)
      getUserList({ pagenum: currentPage, pagesize: this.pagesize }).then(
        res => {
          let data = res.data.data
          this.tableData = data.users
        }
      )
      this.currentPage = currentPage
    },

    //搜索功能
    searchUser() {
      searchUser({
        query:this.query,
        pagenum: this.currentPage,
        pagesize: this.pagesize
      })
        .then(res => {
          console.log(res)
          let data = res.data.data
          this.tableData = data.users
          this.total = data.total
        })
        .catch(res => {
          console.log(res)
        })
    },
    hidden() {
      this.loading = false
    },
    show() {
      this.loading = true
    },
    //修改用户状态
    toggleState(scope) {
      console.log(scope.mg_state)

      this.show()
      toggleState(scope).then(res => {
        this.hidden()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    //添加用户
    addUser() {
      addUser(this.addUserForm).then(res => {
        this.isAddUser = false
        this.addUserForm = {}
        this.__getUserList()
      })
    },
    __getUserList() {
      getUserList({ pagenum: this.currentPage, pagesize: this.pagesize }).then(
        res => {
          let data = res.data.data
          this.tableData = data.users
          this.total = data.total
        }
      )
    }
  }
}
</script>

<style scoped>
body {
  visibility: hidden;
}
</style>
