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
                <el-button type="success" @click="addContractType">新增</el-button>
                <el-button type="danger" @click="deleteContractType"
                    :disabled="!contractTypeSelectedData.length">刪除</el-button>
                <RouterLink to="/search" class="backButton"><el-button type="warning">返回前一頁</el-button></RouterLink>
            </div>
        </div>
        <div class="editTableArea">
            <div class="editTable">
                <el-table style="width: 100%;" :data="contractTypeFilterTableData" :stripe="true" height="300px"
                    :highlight-current-row="true" @selection-change="contractTypeHandleSelectionChange">
                    <el-table-column prop="date" type="index" />
                    <el-table-column width="50px" type="selection" />
                    <el-table-column label="合約參數名稱" prop="contractTypeName" width="200px" />
                    <el-table-column align="right" width="200px">
                        <template #header>
                            <el-input size="small" placeholder="請輸入查詢文字" v-model="contractTypeSearch" />
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

        <div class="editArea">
            <div class="edit">
                <p class="editTitle">機關參數編輯</p>
            </div>
            <div class="buttonGroup">
                <el-button type="success" @click="addOrgan">新增</el-button>
                <el-button type="danger" @click="deleteOrgan" :disabled="!organSelectedData.length">刪除</el-button>
            </div>
        </div>
        <div class="editTableArea">
            <div class="editTable">
                <el-table style="width: 100%;" :data="organFilterTableData" :stripe="true" height="300px"
                    :highlight-current-row="true" @selection-change="organHandleSelectionChange">
                    <el-table-column prop="date" type="index" />
                    <el-table-column width="50px" type="selection" />
                    <el-table-column label="機關參數名稱" prop="organName" width="200px" />
                    <el-table-column align="right" width="200px">
                        <template #header>
                            <el-input size="small" placeholder="請輸入查詢文字" v-model="organSearch" />
                        </template>
                        <template #default="scope">
                            <el-button size="small" type="info" @click="editOrgan(scope.row)">
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
import { ref, computed, onMounted, reactive } from 'vue';
import { ContractType } from '@/interface/common';
import sysEditService from '@/views/systemEdit/sysEditService';
import { ca } from 'element-plus/es/locale';
import { Organ } from './systemEdit.model';

const contractTypeSearch = ref('');
const contractTypeSelectedData = ref([]);
let contractTypeDataArray = reactive<ContractType[]>([]);
let contractTypeTableData = ref<ContractType[]>([]);

const organSearch = ref('');
const organSelectedData = ref([]);
let organDataArray = reactive<Organ[]>([]);
let organTableData = ref<Organ[]>([]);

const contractTypeFilterTableData = computed(() =>
    contractTypeTableData.value.filter(
        (data) =>
            !contractTypeSearch.value ||
            data.contractTypeName.toLowerCase().includes(contractTypeSearch.value.toLowerCase())
    )
);

const organFilterTableData = computed(() =>
    organTableData.value.filter(
        (data) =>
            !organSearch.value ||
            data.organName.toLowerCase().includes(organSearch.value.toLowerCase())
    )
);

//取得合約類型參數
const getContractType = async () => {
    try {
        const response = await sysEditService.getContractType();
        contractTypeDataArray = response.data;
        if (Array.isArray(response.data)) {
            contractTypeTableData.value = response.data;
        } else {
            console.error('Unexpected data format received from API');
        }
    } catch (error) {
        console.error('Failed to fetch contract types:', error);
    }
};

const contractTypeHandleSelectionChange = (rows: any[]) => {
    contractTypeSelectedData.value = rows;
}

const organHandleSelectionChange = (rows: any[]) => {
    organSelectedData.value = rows;
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
                await sysEditService.deleteContractType(contractTypeSelectedData.value);

                contractTypeTableData.value = contractTypeTableData.value.filter(
                    (item) => !contractTypeSelectedData.value.includes(item)
                );

                contractTypeSelectedData.value = [];

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

        const repeat = contractTypeDataArray.some(e => e.contractTypeName === value);
        if (repeat) {
            ElMessage.warning('合約類型名稱已重複');
            return;
        }

        await sysEditService.addContractType(value);
        await getContractType();

        ElMessage.success('新增成功');
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error('新增失敗，請聯絡系統管理人員');
        }
    }
}

const addOrgan = async () => {
    try {
        const { value } = await ElMessageBox.prompt(
            '請輸入新增的機關參數',
            '新增機關',
            {
                confirmButtonText: '新增',
                cancelButtonText: '取消',
            }
        );

        if (!value.trim()) {
            ElMessage.error('機關參數不得為空');
            return;
        }

        const repeat = contractTypeDataArray.some(e => e.contractTypeName === value);
        if (repeat) {
            ElMessage.warning('機關名稱已重複');
            return;
        }

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

const getOrgan = async () => {
    try {
        const response = await sysEditService.getOrgan();
        organDataArray = response.data;
        if (Array.isArray(response.data)) {
            organTableData.value = response.data;
        } else {
            console.error('Unexpected data format received from API');
        }
    } catch (error) {
        console.error('Failed to fetch contract types:', error);
    }
}

const editOrgan = (row: any) => {
    ElMessageBox.prompt(
        '請輸入新的機關參數名稱',
        '編輯機關名稱',
        {
            inputValue: row.organName,
            confirmButtonText: '更新',
            cancelButtonText: '取消',
        }

    ).then(async ({ value }) => {
        if (!value.trim()) {
            ElMessage({
                type: 'error',
                message: '機關參數名稱不得為空'
            })
        }
        try {
            const updatedRow: Organ = { ...row, organName: value };
            await sysEditService.editOrgan(updatedRow);

            getOrgan();
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

const deleteOrgan = () => {
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
                await sysEditService.deleteOrgan(organSelectedData.value);

                organTableData.value = organTableData.value.filter(
                    (item) => !organSelectedData.value.includes(item)
                );

                contractTypeSelectedData.value = [];

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

onMounted(() => {
    getContractType();
    getOrgan();
})

</script>