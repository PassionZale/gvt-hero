import zhCN from "./zh-CN"
import enUS from "./en-US"

const lang = {
  "zh-CN": zhCN,
  "en-US": enUS
}

const prefixLang = "GVT_I18N_LANG";

class Lang {

  constructor() {}

  static setLang(lang = "zh-CN") {
    return localStorage.setItem(prefixLang, lang);
  }

  static getLang() {
    return localStorage.getItem(prefixLang);
  }

  static removeLang() {
    return localStorage.removeItem(prefixLang);
  }

}

export { Lang, lang }

export default lang