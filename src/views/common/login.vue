<template>
  <hero-login @login="submit"></hero-login>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$router.push("/")
    }
  }
}
</script>

