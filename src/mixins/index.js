import lang from "../lang"

const parsePathKey = (attrs, locale) => {
  const langs = lang[locale]
  let msg = null
  attrs.map(item => {
    if (msg === null) {
      msg = langs[item]
    } else {
      msg = msg[item]
    }
  })
  return msg
}

const warn = (pathKey, locale) => {
  console.warn(`[GVT-HERO] translate failed: "${pathKey}" is not in "${locale}" !`)
}

const mixin = {
  props: {
    locale: {
      type: String,
      required: true,
      default: "zh-CN",
      validator(val) {
        return ["zh-CN", "en-US"].indexOf(val) !== -1 ? true : false
      }
    },
  },

  methods: {
    $heroT(pathKey) {
      const attrs = pathKey.split(".")
      let message = ""
      try {
        message = parsePathKey(attrs, this.locale)
        message === undefined && warn(pathKey, this.locale)
      } catch (e) {
        message = pathKey
        warn(pathKey, this.locale)
      }
      return message
    }
  }
}

export default mixin
