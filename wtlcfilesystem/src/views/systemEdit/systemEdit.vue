<template>
    <div class="systemEdit">
        <div class="titleArea">
            <div class="title">
                <p>系統參數設定功能</p>
            </div>
        </div>

        <div class="editArea">
            <div class="edit">
                <p class="editTitle">合約類型參數編輯</p>
            </div>
            <div class="buttonGroup">
                <el-button type="success">新增</el-button>
                <el-button type="danger">刪除</el-button>
                <RouterLink to="/search" class="backButton"><el-button type="warning">返回前一頁</el-button></RouterLink>
            </div>
        </div>
        <div class="editTableArea">
            <div class="editTable">
                <el-table style="width: 100%;" :stripe="true" height="300px" :highlight-current-row="true">
                    <el-table-column prop="date" type="index" />
                    <el-table-column width="50px" type="selection" />
                    <el-table-column label="合約參數名稱" prop="contractTypeName" width="200px" />
                    <el-table-column align="right" width="200px">
                        <template #header>
                            <el-input size="small" placeholder="請輸入查詢文字" />
                        </template>
                        <template #default="scope">
                            <el-button size="small" type="info">
                                編輯
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="editArea">
            <div class="edit">
                <p class="editTitle">機關參數編輯</p>
            </div>
            <div class="buttonGroup">
                <el-button type="success">新增</el-button>
                <el-button type="danger">刪除</el-button>
            </div>
        </div>
        <div class="editTableArea">
            <div class="editTable">
                <el-table ref="organTable" style="width: 100%;" :stripe="true" height="300px"
                    :highlight-current-row="true">
                    <el-table-column prop="date" type="index" />
                    <el-table-column width="50px" type="selection" />
                    <el-table-column label="機關參數名稱" prop="organName" width="200px" />
                    <el-table-column align="right" width="200px">
                        <template #header>
                            <el-input size="small" placeholder="請輸入查詢文字" />
                        </template>
                        <template #default="scope">
                            <el-button size="small" type="info">
                                編輯
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>


</template>

<script setup lang="ts">
import { ElTable, ElTableColumn, ElButton, ElCheckbox, ElInput, ElMessageBox, ElMessage, FormInstance } from 'element-plus';
import { onMounted, ref } from 'vue';

onMounted(() => {
    
})

</script>