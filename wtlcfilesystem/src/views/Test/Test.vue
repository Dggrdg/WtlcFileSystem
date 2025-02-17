<template>
    <div class="background">
        <Card></Card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Card from '@/views/Test/Card.vue';

const data = ref(
    {
        title: '即時資訊'
    }
)

</script>

<style scoped>
.background {
    background-color: gray;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>