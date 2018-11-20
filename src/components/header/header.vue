<style lang="less">
.gvt-header {
  margin-left: 220px;
  height: 70px;
  padding: 20px 5px;
  background-color: #ffffff;
  position: relative;

  .gvt-bread-crumbs {
    display: inline-block;
    font-size: 14px;
    color: #313b4a;
    margin-left: 20px;

    a {
      color: #313b4a;
      text-decoration: none;
    }

    .crumb-split {
      color: #a7a7a7;
      margin: 0 5px;
    }
  }

  .gvt-tool {
    display: inline-block;
    font-size: 14px;
    line-height: 30px;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    color: #333333;

    div[class^="tool-"] {
      display: inline-block;
    }

    .tool-timezone {
      color: #a7a7a7;
      margin-right: 20px;
    }

    .tool-groups {
      svg {
        cursor: pointer;
        margin-right: 20px;
      }
    }

    .tool-user {
      padding: 20px;
      min-width: 110px;
      text-align: center;
      border-left: 1px solid #e9effa;
      cursor: pointer;

      &:after {
        border: solid #333333;
        border-width: 0 2px 2px 0;
        display: inline-block;
        margin-left: 5px;
        padding: 3px;
        transform: rotate(45deg);
        line-height: 30px;
        position: relative;
        top: -3px;
        content: " ";
      }
    }
  }
}
</style>

<template>
  <div class="gvt-header">
    <div class="gvt-bread-crumbs">
      <template v-for="(item, index) in breads">
        <template v-if="item.uri">
          <a :href="item.uri">
            <span class="crumb-item">{{ item.name }}</span>
          </a>
          <span class="crumb-split" v-if="index < (breads.length -1)">></span>
        </template>
        <template v-else>
          <span class="crumb-item">{{ item.name }}</span>
          <span class="crumb-split" v-if="index < (breads.length -1)">></span>
        </template>
      </template>
    </div>
    <div class="gvt-tool">
      <div class="tool-timezone">
        当前时区：UTC + 08:00
      </div>
      <div class="tool-user">
        abc
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hero-header",

  props: {
    data: { type: Array, default: () => [] },
    routers: { type: Array, default: () => [] }
  },

  computed: {
    breads() {
      let breads = [];
      const length = this.data.length;
      if (length === 1) {
        breads = this.data;
        this.routers.map((item, index) => {
          if (index >= 1) {
            breads.push({ name: item.meta.title, uri: item.path });
          }
        });
      } else if (length >= 2) {
        breads = this.data;
        this.routers.map((item, index) => {
          if (index >= 2) {
            breads.push({ name: item.meta.title, uri: item.path });
          }
        });
      }

      return breads;
    }
  }
};
</script>
