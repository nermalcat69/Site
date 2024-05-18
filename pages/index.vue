<template>
  <main>
    <div class="space-y-24">
      <HomeIntro />
      <HomeSocialLinks />
      <HomeFeaturedProjects />
      <HomeFeaturedArticles />
      <HomeNewsletter />
      <HomeDiscordServer />
    </div>
  </main>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue'

export default {
  setup() {
    const frontmatter = { art: 'dots' } // Assume this is imported or passed as a prop
    const ArtComponent = computed(() => {
      if (typeof window !== 'undefined' && frontmatter.art === 'dots') {
        return defineAsyncComponent(() => import('./ArtDots.vue'))
      }
      return null
    })

    return {
      ArtComponent
    }
  }
}
</script>
