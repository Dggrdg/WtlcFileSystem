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
                <el-button type="danger" :disabled="selectedContract.length === 0"
                    @click="deleteContractType">刪除</el-button>
                <el-button type="success" @click="deleteContractType">儲存</el-button>
                <RouterLink to="/search" class="backButton">
                    <el-button type="warning">返回前一頁</el-button>
                </RouterLink>
            </div>
        </div>

        <div class="editTableArea">
            <div class="editTable">
                <el-table style="width: 100%;" :data="contractTypeTable" :stripe="true" height="300px"
                    :highlight-current-row="true" @selection-change="handleSelectionChange">
                    <el-table-column prop="date" type="index" />
                    <el-table-column width="50px" type="selection" />
                    <el-table-column label="合約參數名稱" prop="contractTypeName" width="200px">
                        <template #default="scope">
                            <el-input v-if="scope.row.isNew" v-model="scope.row.contractTypeName"
                                placeholder="請輸入合約類型"></el-input>
                            <span v-else>{{ scope.row.contractTypeName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="right" width="200px">
                        <template #header>
                            <el-button type="success" size="small" @click="addContractType">新增</el-button>
                        </template>
                        <template #default="scope">
                            <el-button v-if="scope.row.isNew" size="small" type="danger"
                                @click="removeNewContractType(scope.row)">移除</el-button>
                            <el-button v-else size="small" type="info">編輯</el-button>
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
                <el-button type="danger" :disabled="selectedOrgan.length === 0"
                    @click="deleteContractOrganType">刪除</el-button>
            </div>
        </div>

        <div class="editTableArea">
            <div class="editTable">
                <el-table ref="organTable" :data="contractOrganTypeTable" style="width: 100%;" :stripe="true"
                    height="300px" :highlight-current-row="true" @selection-change="handleOrganSelectionChange">
                    <el-table-column prop="date" type="index" />
                    <el-table-column width="50px" type="selection" />
                    <el-table-column label="機關參數名稱" prop="contractOrganTypeName" width="200px" />
                    <el-table-column align="right" width="200px">
                        <template #header>
                            <el-button size="small" type="success">新增</el-button>
                        </template>
                        <template #default="scope">
                            <el-button size="small" type="info">編輯</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import ContractParamEditService from "@/views/systemEdit/contractParamEditService";
import axios from 'axios';
import Test from "@/views/Test/Test.vue";

const contractParamEditService = new ContractParamEditService();
const contractTypeTable = ref<any[]>([]);
const contractOrganTypeTable = ref<any[]>([]);
const selectedContract = ref<any[]>([]);
const selectedOrgan = ref<any[]>([]);

const name = "你好";

// 獲取合約類型參數
const getContractType = async () => {
    try {
        const response = await contractParamEditService.getContractType();
        contractTypeTable.value = response.data;
    } catch (error) {
        ElMessage.error("获取合约类型失败，请检查网络连接");
        console.error("获取合约类型失败:", error);
    }
};

// 獲取機關類型參數
const getContractOrganType = async () => {
    try {
        const response = await contractParamEditService.getContractOrganType();
        contractOrganTypeTable.value = response.data;
    } catch (error) {
        ElMessage.error("获取机關类型失败，请检查网络连接");
        console.error("获取机關类型失败:", error);
    }
};

// 監聽合約類型選擇變化
const handleSelectionChange = (selection: any[]) => {
    selectedContract.value = selection;
};

// 監聽機關參數選擇變化
const handleOrganSelectionChange = (selection: any[]) => {
    selectedOrgan.value = selection;
};

// 新增合約類型
const addContractType = () => {
    contractTypeTable.value.push({ contractTypeName: '', isNew: true });
};

// 刪除合約類型
const deleteContractType = async () => {
    if (selectedContract.value.length === 0) return;
    console.log(selectedContract.value);

    ElMessageBox.confirm("確定要刪除選中的合約類型嗎？", "警告", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(async () => {
        try {
            const pureData = selectedContract.value.map(item => ({
                contractTypeId: item.contractTypeId,
                contractTypeName: item.contractTypeName
            }));

            console.log(pureData);

            await contractParamEditService.deleteContractType(pureData);
            ElMessage.success("刪除成功");

            getContractType();
        } catch (error) {
            console.error("刪除失敗:", error);
            ElMessage.error("刪除失敗");
        }
    }).catch(() => {
        ElMessage.info("已取消刪除");
    });
};


// 刪除機關參數
const deleteContractOrganType = () => {
    if (selectedOrgan.value.length === 0) return;

    ElMessageBox.confirm("確定要刪除選中的機關參數嗎？", "警告", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(() => {
        contractOrganTypeTable.value = contractOrganTypeTable.value.filter(
            item => !selectedOrgan.value.includes(item)
        );
        selectedOrgan.value = [];
        ElMessage.success("刪除成功");
    }).catch(() => {
        ElMessage.info("已取消刪除");
    });
};

const removeNewContractType = (row: any) => {
    contractTypeTable.value = contractTypeTable.value.filter(item => item !== row);
};

onMounted(() => {
    getContractType();
    getContractOrganType();
});
</script>
