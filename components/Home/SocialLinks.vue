<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-4">
      FIND ME ON
    </h2>
    <div class="flex gap-5">
      <NuxtLink
        v-for="link in links"
        :key="link.icon"
        :to="link.url"
        target="_blank"
        external
        class="text-black hover:bg-gray-100 active:bg-gray-200 dark:text-white dark:hover:bg-gray-900 dark:active:bg-gray-800 rounded-lg p-2 duration-50 hover:duration-300"
      >
        <Icon
          :name="link.icon"
          class="w-8 h-8 hover:rotate-12 duration-75 hover:duration-300"
        ></Icon>
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
    url: "https://www.linkedin.com/in/nermalcat69/",
    icon: "mdi:linkedin",
  },
  {
    name: "Telegram",
    url: "https://t.me/nermalcat69",
    icon: "mdi:telegram",
  },
];
</script>
