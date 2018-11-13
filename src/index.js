import HeroHeader from "./components/header"
import HeroSidebar from "./components/sidebar"
import HeroContent from "./components/content"
import HeroLayout from "./components/layout"
import VueSvgIcon from "vue-svgicon"
import "./components/icons"

const install = (Vue) => {
  Vue.use(VueSvgIcon, {
    tagName: "hero-icon"
  })
  Vue.component("HeroHeader", HeroHeader)
  Vue.component("HeroSidebar", HeroSidebar)
  Vue.component("HeroContent", HeroContent)
  Vue.component("HeroLayout", HeroLayout)
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  HeroHeader,
  HeroSidebar,
  HeroContent
}