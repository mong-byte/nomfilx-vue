<template>
  <div :class="$style.loader_container">
    <span role="image" aria-label="Loading">⏰</span>
  </div>
</template>

<style lang="less" module>
.loader_container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
}
</style>
