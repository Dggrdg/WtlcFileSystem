<template>
    <div class="systemEdit">
        <div class="title">
            系統設定
        </div>
        <div class="settingArea">
            <div class="settingTitle">
                機關設定
            </div>
            <div class="settingTable">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="date" label="機關名稱" width="180" />
                    <el-table-column>
                        <template #header>
                            <el-button type="success" @click="openDialog">新增</el-button>
                        </template>
                        <template #default>
                            <div style="display: flex;">
                                <el-button type="info">編輯</el-button>
                                <el-button type="danger">刪除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="settingArea">
            <div class="settingTitle">
                合約類型設定
            </div>
            <div class="settingTable">
                <el-table :data="contractTypeList" style="width: 100%">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" title="新增機關" width="30%">
            <el-form label-position="top" v-model="formData" ref="formRef" :rules="baseRules">
                <el-form-item label="機關名稱">
                    <el-input v-model="newOrganName" placeholder="請輸入機關名稱" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="saveNewOrgan">儲存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { contractType, organ } from '@/model/model';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { el } from 'element-plus/es/locale';
import { ref, computed, onMounted } from 'vue';

const organList = ref<Array<organ>>([]);
const contractTypeList = ref<Array<contractType>>([]);
const formData = ref<{
    organName: string,
    contractType: string
}>();
const formRef = ref();

//表單驗證
const baseRules = {
    organName: [
        { require, message: "機關名稱不得為空", trigger: "blur" }
    ],
    contractTypeName: [
        { require, message: "機關名稱不得為空", trigger: "blur" }
    ]
}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const dialogVisible = ref(false)  // 控制對話框顯示

const newOrganName = ref('')      // 用來綁定輸入的機關名稱

function openDialog() {
    dialogVisible.value = true
}

function closeDialog() {
    dialogVisible.value = false
}

function saveNewOrgan() {
    formRef.value.validate((valid: boolean) => {
        if (valid) {
            ElMessage({
                type: 'success',
                message: "儲存成功"
            })
        } else {
            ElMessage({
                type: 'warning',
                message: "儲存失敗"
            })
        }
    })
}


//取得機關清單
function getOrganList() {
    axios.get('http://localhost:8080/ContractParamEdit/getOrgan').then(res => {
        organList.value = res.data;
    }).catch(error => {
        console.log('error = ' + error);
    })
}

onMounted(() => {
    getOrganList();
})

</script>

<style scoped>
.systemEdit {
    padding: 20px;
    display: grid;
    gap: 30px;
}

.systemEdit .title {
    display: grid;
    font-size: 36px;
    font-weight: 700;
}

.systemEdit .settingArea {
    display: grid;
    font-size: 24px;
    font-weight: 700;
}

.systemEdit .settingArea .settingTable {
    margin-top: 20px;
    height: 330px;
}
</style>