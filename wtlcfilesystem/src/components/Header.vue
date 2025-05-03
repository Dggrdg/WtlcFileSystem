<template>
    <div class="header">
        <div class="functionGroup">
            <router-link style="text-decoration: none !important;" :to="'/searchContract'">合約查詢</router-link>
            <router-link style="text-decoration: none !important;" :to="'/systemEdit'">系統設定</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: rgb(0, 132, 255);
    width: 100%;
    height: 60px;
}

.header .functionGroup {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-left: auto;
}

.header .functionGroup a {
    margin: 0px;
    font-size: 24px;
    font-weight: 700;
    color: white;
}
</style>