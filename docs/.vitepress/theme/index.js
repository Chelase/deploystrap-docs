import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import HomeJourney from './HomeJourney.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'home-hero-image': () => h(HomeJourney)
  })
}
