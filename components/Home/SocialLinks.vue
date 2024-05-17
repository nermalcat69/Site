<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-4">FIND ME ON</h2>
    <div class="flex gap-5">
      <NuxtLink v-for="link in links" :key="link.icon" :to="link.url" target="_blank" external
        class="text-black hover:bg-gray-100 hover:-translate-y-0.5 active:bg-gray-200 dark:text-white  dark:hover:bg-gray-900 dark:active:bg-gray-800 duration-150 rounded-lg p-2">
        <Icon :name="link.icon" class="w-8 h-8 hover:rotate-12 duration-150"></Icon>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const links = [
  {
    name: "Twitter",
    url: "https://twitter.com/nermalcat69",
    icon: "mdi:twitter",
  },
  {
    name: "GitHub",
    url: "https://github.com/nermalcat69",
    icon: "mdi:github",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/fayaz-aralikatti/",
    icon: "mdi:linkedin",
  },
  {
    name: "Telegram",
    url: "https://t.me/nermalcat69",
    icon: "mdi:telegram",
  },
];
</script>
