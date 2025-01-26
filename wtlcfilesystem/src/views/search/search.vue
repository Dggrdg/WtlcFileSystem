<template>
    <div class="search">
        <div class="titleArea">
            <p class="title">合約查詢功能</p>
            <div class="functionGroup">
                <font-awesome-icon :icon="['fas', 'plus']" class="functionIcon" />
                <RouterLink to="/contractParamEdit"><font-awesome-icon :icon="['fas', 'gear']" class="functionIcon" />
                </RouterLink>
                <font-awesome-icon :icon="['fas', 'user']" class="functionIcon" />
            </div>
        </div>
        <el-form>
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="合約起日:" label-position="left" label-width="80px">
                        <el-date-picker v-model="data.searchForm.startTime" type="date" placeholder="請選擇起日"
                            style="width: 80%" />
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="合約迄日:" label-position="left" label-width="80px">
                        <el-date-picker v-model="data.searchForm.endTime" type="date" placeholder="請選擇迄日"
                            style="width: 80%" />
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="合約類型:" label-position="left" label-width="80px">
                        <el-select v-model="data.searchForm.contractType" placeholder="請選擇合約類型" style="width: 80%">
                            <el-option label="Zone one" value="shanghai" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="機關:" label-position="left" label-width="50px">
                        <el-select v-model="data.searchForm.organ" placeholder="請選擇機關" style="width: 80%">
                            <el-option label="Zone one" value="shanghai" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-button type="primary" @click="search">查詢</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="tableArea">
            <el-table :data="tableData" style="width: 100%" :stripe="true">
                <el-table-column type="expand" />
                <el-table-column type="index" :index="indexCount" />
                <el-table-column prop="contractDate" label="合約日期" width="120" sortable />
                <el-table-column prop="contractName" label="合約案名" width="450" />
                <el-table-column prop="organ" label="機關" width="300" />
                <el-table-column prop="contractAmount" label="合約金額" width="200" sortable />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small">
                            編輯
                        </el-button>
                        <el-button size="small" type="danger">
                            刪除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ElForm, ElFormItem, ElSelect, ElCol, ElRow, ElOption, ElDatePicker, ElButton, ElTable, ElTableColumn } from 'element-plus';

const data = reactive({
    searchForm: {
        startTime: '',
        endTime: '',
        contractType: '',
        organ: ''
    },
});

const indexCount = (index: number) => {
    return index + 1;
}

const tableData = [
    {
        contractDate: '2016-05-03',
        contractName: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        organ: 'No. 189, Grove St, Los Angeles',
        contractAmount: '10000000',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        contractDate: '2016-05-02',
        contractName: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        organ: 'No. 189, Grove St, Los Angeles',
        contractAmount: '20000000',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        contractDate: '2016-05-04',
        contractName: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        organ: 'No. 189, Grove St, Los Angeles',
        contractAmount: '30000000',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        contractDate: '2016-05-01',
        contractName: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        organ: 'No. 189, Grove St, Los Angeles',
        contractAmount: '40000000',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        contractDate: '2016-05-01',
        contractName: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        organ: 'No. 189, Grove St, Los Angeles',
        contractAmount: '50000000',
        zip: 'CA 90036',
        tag: 'Office',
    }
]

const search = () => {
    console.log(data.searchForm);
}

</script>
