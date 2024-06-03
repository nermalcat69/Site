<template>
  <NuxtLoadingIndicator />
  <div class="z-50 relative">
    <div class="py-10">
      <AppNavbar />
    </div>
    <UContainer>
      <NuxtPage />
    </UContainer>
    <div class="h-32"></div>
    <AppFooter />
  </div>
</template>

<style>

body {
    font-family: Inter, sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* Ensures the background is behind other content */
  pointer-events: none;
  /* Makes the background non-interactive */
}
</style>

<script>
</script>
