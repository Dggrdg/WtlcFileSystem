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
                <el-table :data="organData" stripe style="width: 100%">
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="date" label="機關名稱" width="180" />
                    <el-table-column>
                        <template #header>
                            <el-button type="success" @click="openDialog('organ')">新增</el-button>
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
            <div class="example-pagination-block">
                <el-pagination layout="prev, pager, next" :total="1000" />
            </div>
        </div>
        <div class="settingArea">
            <div class="settingTitle">
                合約類型設定
            </div>
            <div class="settingTable">
                <el-table :data="contractTypeData" stripe style="width: 100%">
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="date" label="機關名稱" width="180" />
                    <el-table-column>
                        <template #header>
                            <el-button type="success" @click="openDialog('contractType')">新增</el-button>
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
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
            <el-form label-position="top" v-show="organInputShow">
                <el-form-item label="機關名稱">
                    <el-input placeholder="請輸入機關名稱" v-model="organName" />
                </el-form-item>
            </el-form>
            <el-form label-position="top" v-show="contractTypeInputShow">
                <el-form-item label="合約類型">
                    <el-input placeholder="請輸入合約類型" v-model="contractTypeName" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="closeDialog">取消</el-button>
                <el-button @click="save" type="primary">儲存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { contractType, organ } from '@/model/model';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, computed, onMounted, vShow } from 'vue';

const organList = ref<Array<organ>>([]);
const dialogTitle = ref("");
const dialogVisible = ref(false);
const organInputShow = ref(false);
const contractTypeInputShow = ref(false);
const organName = ref("");
const contractTypeName = ref("");

const organData = [
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
    }
]

const contractTypeData = [
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
    }
]

function openDialog(createType: string) {
    if (createType == "organ") {
        dialogTitle.value = "新增機關名稱";
        contractTypeInputShow.value = false;
        organInputShow.value = true;
    } else if (createType == "contractType") {
        dialogTitle.value = "新增合約類型"
        contractTypeInputShow.value = true;
        organInputShow.value = false;
    }
    dialogVisible.value = true;
}

function save() {
    if (organInputShow.value) {
        if (!organName.value) {
            ElMessage.error('機關名稱不得為空');
            return;
        }
        organData.push({
            name: organName.value,
            date: new Date().toISOString().split('T')[0], // 自動今天日期
            address: '-'
        });
        ElMessage.success('新增機關成功');
    }

    if (contractTypeInputShow.value) {
        if (!contractTypeName.value) {
            ElMessage.error('合約類型不得為空');
            return;
        }
        contractTypeData.push({
            name: contractTypeName.value,
            date: new Date().toISOString().split('T')[0],
            address: '-'
        });
        ElMessage.success('新增合約類型成功');
    }

    // 清空
    organName.value = '';
    contractTypeName.value = '';
    dialogVisible.value = false;
}

function closeDialog() {
    dialogVisible.value = false;
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