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
                <el-button type="danger" @click="deleteContractType" :disabled="!selectedData.length">刪除</el-button>
            </div>
            <div class="editTable">
                <el-table style="width: 100%;" :data="filterTableData" :stripe="true" height="300px"
                    :highlight-current-row="true" @selection-change="handleSelectionChange">
                    <el-table-column prop="date" type="index" />
                    <el-table-column width="50px" type="selection" />
                    <el-table-column label="合約參數名稱" prop="contractTypeName" width="200px" />
                    <el-table-column align="right" width="200px">
                        <template #header>
                            <el-input size="small" placeholder="請輸入查詢文字" v-model="search" />
                        </template>
                        <template #default="scope">
                            <el-button size="small" type="info" @click="editContractType(scope.row)">
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
import { ElTable, ElTableColumn, ElButton, ElCheckbox, ElInput, ElMessageBox, ElMessage, FormInstance } from 'element-plus';
import { ref, computed, onMounted, reactive } from 'vue';
import { ContractType } from '@/interface/common';
import sysEditService from '@/views/systemEdit/sysEditService';
import { ca } from 'element-plus/es/locale';

const search = ref('');
const selectedData = ref([]);
let dataArray = reactive<ContractType[]>([]);
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

//取得合約類型參數
const getContractType = async () => {
    try {
        const response = await sysEditService.getContractType();
        dataArray = response.data;
        if (Array.isArray(response.data)) {
            tableData.value = response.data;
        } else {
            console.error('Unexpected data format received from API');
        }
    } catch (error) {
        console.error('Failed to fetch contract types:', error);
    }
};

const handleSelectionChange = (rows: any[]) => {
    selectedData.value = rows;
}

//刪除合約類型參數
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
        .then(async () => {

            try {
                await sysEditService.deleteContractType(selectedData.value);

                tableData.value = tableData.value.filter(
                    (item) => !selectedData.value.includes(item)
                );

                selectedData.value = [];

                ElMessage({
                    type: 'success',
                    message: '刪除成功',
                });
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: '刪除失敗，請聯絡系統管理員',
                });
                console.error(error);
            }
        })
        .catch(() => {
            ElMessage({
                type: 'warning',
                message: '已取消刪除',
            })
        })
}

const addContractType = async () => {
    try {
        const { value } = await ElMessageBox.prompt(
            '請輸入新增的合約類型參數',
            '新增合約類型',
            {
                confirmButtonText: '新增',
                cancelButtonText: '取消',
            }
        );

        if (!value.trim()) {
            ElMessage.error('合約參數不得為空');
            return;
        }

        const repeat = dataArray.some(e => e.contractTypeName === value);
        if (repeat) {
            ElMessage.warning('合約類型名稱已重複');
            return;
        }

        // 確保 API 返回成功並刷新數據
        await sysEditService.addContractType(value);
        await getContractType();

        ElMessage.success('新增成功');
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error('新增失敗，請聯絡系統管理人員');
        }
    }
}

const editContractType = (row: any) => {
    ElMessageBox.prompt(
        '請輸入新的合約類型參數名稱',
        '編輯合約類型名稱',
        {
            inputValue: row.contractTypeName,
            confirmButtonText: '更新',
            cancelButtonText: '取消',
        }

    ).then(async ({ value }) => {
        if (!value.trim()) {
            ElMessage({
                type: 'error',
                message: '合約參數名稱不得為空'
            })
        }
        try {
            const updatedRow: ContractType = { ...row, contractTypeName: value };
            await sysEditService.editContractType(updatedRow);

            getContractType();
            ElMessage({
                type: 'success',
                message: '更新成功'
            })
        } catch (error) {
            ElMessage({
                type: 'error',
                message: '系統發生錯誤請與系統管理員聯繫'
            })
        }


    }).catch(() => {
        //取消操作
    })
}

const promiseSettimeout = (status: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status) {
                resolve('setTimeout 成功');
            } else {
                reject('setTimeout 失敗');
            }
        }, 1000);
    })
}

onMounted(() => {
    getContractType();
})

</script>