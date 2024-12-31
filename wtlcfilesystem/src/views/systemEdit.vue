<template>
    <div class="systemEdit">

        <div class="titleArea">
            <div class="title">
                <p>系統參數設定功能</p>
            </div>
        </div>

        <div class="edit">
            <div class="editTitle">
                合約類型參數編輯
            </div>
            <div class="buttonGroup">
                <el-button type="success" @click="addContractType">新增</el-button>
                <el-button type="danger" @click="deleteContractType">刪除</el-button>
            </div>
            <div class="editTable">
                <el-table style="width: 100%" :data="filterTableData" :stripe="true" height="300px"
                    :highlight-current-row="true">
                    <el-table-column prop="date" type="index" />
                    <el-table-column width="50px">
                        <template #default>
                            <el-checkbox size="large" />
                        </template>
                    </el-table-column>
                    <el-table-column label="合約參數名稱" prop="contractTypeName" width="200px" />
                    <el-table-column align="right" width="200px">
                        <template #header>
                            <el-input size="small" placeholder="請輸入查詢文字" v-model="search" />
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

        <div class="edit">
            <div class="editTitle">
                機關參數編輯
            </div>
            <div class="editTable">
                <el-table style="width: 100%">
                    <el-table-column label="Date" prop="contractTypeId" />
                    <el-table-column label="Name" prop="name" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input size="small" placeholder="Type to search" />
                        </template>
                        <template #default="scope">
                            <el-button size="small">
                                Edit
                            </el-button>
                            <el-button size="small" type="danger">
                                Delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ElTable, ElTableColumn, ElButton, ElCheckbox, ElInput, ElMessageBox, ElMessage } from 'element-plus';
import { ref, computed, onMounted, reactive } from 'vue';
import { ContractType } from '@/interface/common';
import sysEditService from '@/service/sysEditService';

const search = ref('');
let tableData = ref<ContractType[]>([]);

const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.contractTypeName.toLowerCase().includes(search.value.toLowerCase())
    )
);

const handleEdit = (index: number, row: ContractType) => {

}

const getContractType = async () => {
    try {
        const response = await sysEditService.getContractType();
        if (Array.isArray(response.data)) {
            tableData.value = response.data;
        } else {
            console.error('Unexpected data format received from API');
        }
    } catch (error) {
        console.error('Failed to fetch contract types:', error);
    }
};

const deleteContractType = () => {
    ElMessageBox.confirm(
        '確認要刪除?',
        '',
        {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '刪除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'warning',
                message: '已取消刪除',
            })
        })
}

const addContractType = () => {
    ElMessageBox.prompt(
        '請輸入新增的合約類型參數',
        '新增合約類型',
        {
            confirmButtonText: '新增',
            cancelButtonText: '取消',
        }
    ).then(({ value }) => {
        try {
            if (value) {
                try {
                    sysEditService.addContractType(value);
                    ElMessage({
                        type: 'success',
                        message: '新增成功'
                    })
                    getContractType();
                } catch (error) {
                    ElMessage({
                        type: 'error',
                        message: '新增失敗，請聯絡系統管理人員'
                    })
                }
            } else {
                ElMessage({
                    type: 'error',
                    message: '合約類型參數不得為空'
                })
            }

        } catch (error) {
            console.log(error);
        }
    })
}

onMounted(() => {
    getContractType();
})

</script>