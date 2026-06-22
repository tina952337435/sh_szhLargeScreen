<template>
  <div class="progress">
    <div
      class="progress-bar"
      :style="{ width: progress + '%' }"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {{ progress }}%
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    progress() {
      return Math.min(this.value, 100);
    },
  },
};
</script>

<style scoped>
.progress {
  width: 100%;
  /* background-color: #e5e5e5; */
  border-radius: 4px;
  overflow: hidden;
  height: 70%;
  border: solid 2px var(--titled1);
}

.progress-bar {
  background-color: var(--titled1);
  /* color: white; */
  text-align: center;
  border-radius: 4px;
  transition: width 0.5s ease-in-out;
  line-height: 170%;
}
</style>
