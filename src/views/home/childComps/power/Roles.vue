<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRoleDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightsById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环 嵌套渲染二级权限 -->
                <el-row
                  :class="[index2 === 0 ? '': 'bdtop', 'vcenter']"
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightsById(scope.row, item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3, index3) in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRightsById(scope.row, item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditRoleDialog(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRoleById(scope.row.id)">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色的对话框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" width="50%" @close="addRoleDialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="addForm.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roledesc">
          <el-input v-model="addForm.roledesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色的对话框 -->
    <el-dialog title="修改角色" :visible.sync="editRoleDialogVisible" width="50%" @close="editRoleDialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="角色名">
          <el-input v-model="editForm.roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roledesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
      <!-- 树形控件 -->
      <el-tree :data="rightsList" :props="treeProps" :default-expand-all="true" show-checkbox node-key="id" :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, getDeleteRoles, getAllRoles, getGiveRoles, getAddRoles, getFindRole, getEditRole, getDelRole } from 'network/roles'
export default {
  name: 'Roles',
  data() {
    return {
      // 控制添加角色对话框的显示和隐藏
      addRoleDialogVisible: false,
      // 添加角色的表单数据
      addForm: {
        rolename: '',
        roledesc: ''
      },
      // 添加角色表单的验证规则对象
      addFormRules: {
        rolename: [
          {
            required: true,
            message: '请输入角色名',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 10,
            message: '角色名的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        roledesc: [
          {
            required: true,
            message: '请输入角色描述',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 20,
            message: '角色描述的长度在3~20个字符之间',
            trigger: 'blur',
          },
        ],
      },
      // 控制修改角色对话框的显示与隐藏
      editRoleDialogVisible: false,
      // 查询到的角色信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        roledesc: [
          {
            required: false,
            message: '请输入角色描述',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 20,
            message: '角色描述的长度在3~20个字符之间',
            trigger: 'blur',
          },
        ],
      },
      // 所有角色列表数据
      rolesList: [],
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点id值
      defKeys: [],
      // 当前即将分配权限的id
      roleId: ''
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 监听添加角色对话框的关闭事件
    addRoleDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addRole() {
      this.$refs.addFormRef.validate((valid) => {
        // console.log(valid);
        if (!valid) {
          return
        }
        // 发起添加角色的网络请求
        getAddRoles(
          this.addForm.rolename,
          this.addForm.roledesc
        ).then((res) => {
          console.log(res)
          if (res.meta.status !== 201) {
            this.$message.error('添加角色失败')
          }
          this.$message.success('添加角色成功')
          // 隐藏添加角色的对话框
          this.addRoleDialogVisible = false
          // 重新获取角色列表数据
          this.getRolesList()
        })
      })
    },
    // 展示编辑角色的对话框
    showEditRoleDialog(id) {
      // console.log(id);
      getFindRole(id).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error('查询角色信息失败')
        }
        this.editForm = res.data
      })
      this.editRoleDialogVisible = true
    },
    // 监听修改角色对话框的关闭事件
    editRoleDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改角色信息并提交
    editRole() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) {
          return
        }
        // 发起修改角色信息的数据请求
        getEditRole(
          this.editForm.roleId,
          this.editForm.roleName,
          this.editForm.roleDesc
        ).then((res) => {
          console.log(res)
          if (res.meta.status !== 200) {
            return this.$message.error('更新角色信息失败')
          }
          // 关闭对话框
          this.editRoleDialogVisible = false
          // 刷新数据列表
          this.getRolesList()
          // 提示修改成功
          this.$message.success('更新角色信息成功')
        })
      })
    },

    removeRoleById(id) {
      // 弹框询问角色是否删除
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!',
          // })
          getDelRole(id).then((res) => {
            console.log(res)
            if (res.meta.status !== 200) {
              return this.$message.error('删除角色失败')
            }
            this.$message.success('删除角色成功')
            this.getRolesList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 获取所有角色的列表
    getRolesList() {
      getRoles().then((res) => {
        // console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error('获取列表失败')
        }
        this.rolesList = res.data
        // console.log(this.rolesList)
      })
    },
    // 根据id删除对应的权限
    removeRightsById(role, rightId) {
      // 弹框提示用户是否要删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          getDeleteRoles(role.id, rightId).then((res) => {
            // console.log(res);
            if (res.meta.status !== 200) {
              return this.$message.error('删除权限失败')
            }
            role.children = res.data
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 展示分配权限的对话框
    showSetRightDialog(role) {
      this.roleId = role.id
      // 获取所有权限列表的数据
      getAllRoles().then(res => {
        // console.log(res);
        if(res.meta.status !== 200) {
          return this.$message.error('获取权限数据失败')
        }
        this.rightsList = res.data
        // console.log(this.rightsList);
        // 递归获取三级节点的id
        this.getLeafKeys(role, this.defKeys)
      })
      this.setRightDialogVisible = true
    },
    // 通过递归的形式获取角色下所有三级权限的id,并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前node节点不包含children属性, 则是三级节点
      if(!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    setRightDialogClosed() {
      this.defKeys = []
    },
    // 点击为角色分配权限
    allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]

      const idStr = keys.join(',')
      getGiveRoles(this.roleId ,idStr).then(res => {
        console.log(res);
        if(res.meta.status !== 200) {
          return this.$message.error('分配权限失败')
        }
        this.$message.success('分配权限成功')
        this.getRolesList()
      })
      
      this.setRightDialogVisible = false
    }
  },
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>