<template>
    <div class="searchContract">
        <div class="title">
            <p>合約查詢</p>
        </div>
        <div class="queryConditionsArea">
            <div class="selectArea">
                <div class="selectTitle">
                    <p>合約年份</p>
                </div>
                <select class="form-select">
                    <option v-for="contractYear in contractYears" :value="contractYear.value">{{ contractYear.year }}
                    </option>
                </select>
            </div>
            <div class="selectArea">
                <div class="selectTitle">
                    <p>機關</p>
                </div>
                <select class="form-select">
                    <option v-for="organList in organLists" :value="organList.organId">{{ organList.organName }}
                    </option>
                </select>
            </div>
            <div class="selectArea">
                <div class="selectTitle">
                    <p>案件類型</p>
                </div>
                <select class="form-select">
                    <option v-for="contractTypeList in contractTypeLists" :value="contractTypeList.contractTypeId">{{
                        contractTypeList.contractTypeName }}
                    </option>
                </select>
            </div>
            <el-button type="primary">查詢</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%" height="250" stripe>
                <el-table-column type="index" width="50" />
                <el-table-column prop="date" label="合約年份" width="150" />
                <el-table-column prop="name" label="機關" width="250" />
                <el-table-column prop="state" label="合約類型" width="200" />
                <el-table-column prop="city" label="案件名稱" width="450" />
                <el-table-column prop="city" label="圖片" width="150">
                    <template #default>
                        <el-button type="warning">查看圖片</el-button>
                    </template>
                </el-table-column>
                <el-table-column width="150">
                    <template #header>
                        <el-button type="success">新增</el-button>
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { el } from 'element-plus/es/locale';
import { organ, contractYear, contractType } from '@/model/model';


const contractYears = ref<Array<contractYear>>([]);
const organLists = ref<Array<organ>>([]);
const contractTypeLists = ref<Array<contractType>>([]);

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },]

//計算下拉式選單近7年合約年份清單
function computeContractYear() {
    let year = new Date().getFullYear();

    for (let i = 0; i <= 7; i++) {
        contractYears.value.push({ value: year - i, year: year - i });
    }
}

//取得機關清單
function getOrganList() {
    axios.get('http://localhost:8080/ContractParamEdit/getOrgan')
        .then(res => {
            organLists.value = res.data;
        })
        .catch(error => {
            console.log("error = " + error);
        });
}

//取得合約類型清單
function getContractType() {
    axios.get('http://localhost:8080/ContractParamEdit/getContractType').then(res => {
        contractTypeLists.value = res.data;
    }).catch(error => {
        console.log("error = " + error);
    })
}


onMounted(() => {
    computeContractYear();
    getOrganList();
    getContractType();
})

</script>

<style scoped>
.searchContract {
    padding: 20px;
    display: grid;
    gap: 30px;
}

.searchContract .title {
    display: grid;
    font-size: 36px;
    font-weight: 700;
}

.searchContract .queryConditionsArea {
    display: flex;
    gap: 30px;
}

.searchContract .queryConditionsArea button {
    align-self: flex-end;
}

.searchContract .queryConditionsArea select {
    display: flex;
    gap: 10px;
    width: 200px;
}

.searchContract .queryConditionsArea .selectArea {
    display: grid;
}

.searchContract .queryConditionsArea .selectArea .selectTitle p {
    font-weight: 700;
    margin: 5px 0px;
}
</style>