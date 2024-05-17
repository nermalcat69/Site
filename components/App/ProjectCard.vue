<template>
  <NuxtLink class="flex items-end gap-4 group  -m-2 rounded-lg space-x-5 hover:bg-gray-900 p-5" :to="project.url" target="_blank" external>
    <UAvatar :src="project.thumbnail" :ui="{ rounded: 'rounded z-10 relative' }" size="md" :alt="project.name" />
    <div class="max-w-sm">
      <h3 class="text-sm font-medium group-hover:text-primary-600">
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
