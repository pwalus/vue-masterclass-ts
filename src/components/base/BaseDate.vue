<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const props = defineProps<{ timestamp: number }>();

const diffForHumans = (): string => dayjs.unix(props.timestamp).fromNow();
</script>

<template>
  <span>{{ diffForHumans() }}</span>
</template>

<style scoped></style>
