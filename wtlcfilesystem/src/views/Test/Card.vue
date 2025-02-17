<template>
    <div class="card">
        <div class="cardTitle">
            及時資訊
        </div>
        <div class="cardContent">
            依照Axios官方網站的說明，它一個以Promise為基礎（promise-based）的 HTTP 請求工具，可以被應用在瀏覽器與Node.js環境中。在伺服器端可以使用Node.js
            http模組，而在使用者用戶端則使用XMLHttpRequests  ......
            <button type="button" class="btn"
                style="background: rgb(255, 234, 0); padding: 3px 10px; font-weight: 600;">更多</button>
        </div>
    </div>
</template>

<scripts lang="ts" setup>

</scripts>

<style scoped>
.card {
    display: inline-block;
    text-align: left;
}

.cardTitle {
    background-color: rgb(255, 234, 0);
    padding: 10px 20px;
    font-weight: 600;
    font-size: 20px;
    border-radius: 7px;
    display: inline-block;
    position: relative;
    top: -20px;
    left: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.cardContent {
    background-color: white;
    width: 300px;
    height: auto;
    font-weight: 600;
    font-size: 16px;
    padding: 0px 20px 10px 20px;
    border-radius: 7px;
}
</style>