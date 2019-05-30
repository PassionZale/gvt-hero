<template>
  <hero-login @login="submit" :locale.sync="lang"></hero-login>
</template>

<script>
export default {
  data() {
    return {
      lang: "zh-CN"
    }
  },

  methods: {
    submit() {
      this.$router.push("/")
    }
  }
}
</script>

