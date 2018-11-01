<template>

  <div>

    <gvt-header>
      <slot name="header"></slot>
    </gvt-header>

    <gvt-sidebar :data="data" :logo="logo"></gvt-sidebar>

    <gvt-content>
      <slot name="content"></slot>
    </gvt-content>

  </div>

</template>

<script>
import GvtHeader from "../header";
import GvtSidebar from "../sidebar";
import GvtContent from "../content";
export default {
  name: "hero-layout",

  components: { GvtHeader, GvtSidebar, GvtContent },

  props: {
    logo: {
      type: String
    },

    menuData: {
      type: Array,
      required: true
    }
  },

  computed: {
    data() {
      return this.menuData.map(item => item);
    }
  }
};
</script>

