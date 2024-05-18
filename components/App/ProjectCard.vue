<template>
  <NuxtLink
    class="flex items-end gap-4 group  -m-2 rounded-lg space-x-5 hover:bg-gray-100 hover:-translate-y-0.5 active:bg-gray-200 duration-75  hover:duration-300 dark:hover:bg-gray-900 p-5"
    :to="project.url" target="_blank" external>
    <UAvatar :src="project.thumbnail" draggable="false" :ui="{ rounded: 'rounded z-10 relative' }" size="md" :alt="project.name"
      class="hover:rotate-6 duration-300 hover:-translate-y-0.5" />
    <div class="max-w-sm">
      <h3 class="text-sm font-medium ">
        {{ project.name }}
      </h3>
      <p class="text-gray-400 text-sm">{{ project.description }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>
