<template>
    <div class="login">
        <div class="loginArea">
            <el-form>
                <el-form-item label="帳號" prop="account" ref="account">
                    <el-input placeholder="請輸入帳號" clearable v-model="userData.userName" />
                </el-form-item>
                <el-form-item label="密碼" prop="password">
                    <el-input type="password" placeholder="請輸入密碼" clearable v-model="userData.password" />
                </el-form-item>
                <el-button type="primary" @click="login" :disabled="loginDisable">登入</el-button>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import axios from 'axios';
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElNotification } from 'element-plus';
import { onMounted, reactive, ref, watch } from 'vue';
import { User } from "./login.model"

const loginDisable = ref(false);
const userData = reactive({
    userName: "",
    password: ""
})
let loginFailCount = 0;

const login = async () => {

    try {

        const response = await axios.post('http://localhost:8080/login', {
            userName: userData.userName,
            password: userData.password
        });

        if (response.data) {
            router.push({ name: "search" })
        } else {
            ElMessage({
                message: '帳號或密碼錯誤',
                type: 'error',
            })
            loginFailCount++;
        }

    } catch {
        ElNotification({ title: '系統錯誤', message: `發生錯誤，請聯絡系統管理員`, type: 'error' })
    }
}

watch(
    () => [userData.userName, userData.password],
    ([account, password]) => {
        loginDisable.value = !(account && password);
    },
    { immediate: true },
);

</script>