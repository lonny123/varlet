<template>
  <div class="varlet-site">
    <app-header :language="language" />

    <div class="varlet-site-content">
      <app-sidebar
        :language="language"
        :menu="menu"
        :menu-name="menuName"
        @change="handleSidebarChange"
      />

      <div
        class="varlet-site-doc-container"
        ref="doc"
        :class="[!useMobile && 'varlet-site-doc-container--pc-only']"
      >
        <router-view />
      </div>

      <app-mobile
        :component-name="componentName"
        :language="language"
        :replace="menuName"
        v-show="useMobile"
      />
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import config from '@config'
import AppMobile from './components/AppMobile'
import AppHeader from './components/AppHeader'
import AppSidebar from './components/AppSidebar'
import { defineComponent, nextTick, onMounted, ref, Ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { get } from 'lodash'
import { getPCLocationInfo, isPhone, MenuTypes, setThemes } from '../utils'

type Language = Record<string, string>

export interface Menu {
  doc: string
  text: Record<string, string>
  type: MenuTypes
}

export default defineComponent({
  components: {
    AppMobile,
    AppHeader,
    AppSidebar
  },
  setup() {
    // config
    const defaultLanguage = get(config, 'defaultLanguage')
    const menu: Ref<Menu[]> = ref(get(config, 'pc.menu', []))
    const useMobile = ref(get(config, 'useMobile'))
    const mobileRedirect = get(config, 'mobile.redirect')

    const language: Ref<string> = ref('')
    const componentName: Ref<null | string> = ref(null)
    const menuName: Ref<string> = ref('')
    const doc: Ref<HTMLElement | null> = ref(null)
    const route = useRoute()

    const getComponentNameByMenuName = (menuName: string) => {
      const currentMenu = menu.value.find(menu => menu.doc === menuName)
      return currentMenu?.type === MenuTypes.COMPONENT ? menuName : mobileRedirect.slice(1)
    }

    const init = () => {
      const { language, menuName } = getPCLocationInfo()

      if (isPhone() && useMobile.value) {
        window.location.href = `./mobile.html#/${menuName}?language=${language || defaultLanguage}&platform=mobile`
        return
      }

      nextTick(() => {
        const children = document
          .querySelector('.varlet-site-sidebar')
          .getElementsByClassName('var-cell')
        const index = menu.value.findIndex((item) => item.doc === menuName)

        if (index !== -1) {
          children[index].scrollIntoView({
            block: 'center',
            inline: 'start',
          })
        }
      })
    }

    const handleSidebarChange = (menu: Menu) => {
      doc.value.scrollTop = 0
      componentName.value = getComponentNameByMenuName(menu.doc)
      menuName.value = menu.doc
    }

    onMounted(() => init())

    watch(
      () => route.path,
      () => {
        const { language: lang, menuName: _menuName } = getPCLocationInfo()
        if (!lang || !_menuName) {
          return
        }

        componentName.value = getComponentNameByMenuName(_menuName)
        menuName.value = _menuName
        language.value = lang
        document.title = get(config, 'pc.title')[lang]
      },
      { immediate: true }
    )

    setThemes(config)

    return {
      menu,
      language,
      componentName,
      menuName,
      doc,
      useMobile,
      handleSidebarChange,
    }
  },
})
</script>

<style>
.hljs {
  background: #202020 !important;
  padding: 0 !important;
  border-radius: 4px;
}
</style>

<style lang="less">
@import '~@varlet/ui/es/progress/progress';

@doc-active: {
  display: inline;
  font-family: inherit;
  padding: 0 4px;
  white-space: nowrap;
}

body {
  min-width: 1200px;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}

iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}

.varlet {
  &-introduce {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 4px 20px;
    padding: 40px;
    border-top: 7px solid var(--site-color-primary);
    border-radius: 4px;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);

    &__image {
      width: 180px;
    }

    &__name {
      font-size: 32px;
      margin-top: 22px;
    }

    &__des {
      color: #555;
      font-size: 14px;
      margin-top: 10px;
      -webkit-font-smoothing: antialiased;
    }
  }

  &-component-preview {
    margin-top: 20px;
  }

  &-site {
    &-content {
      height: calc(100vh - 60px);
      display: flex;
      background: #fff;
    }

    &-doc-container {
      flex: 1 0 0;
      overflow-y: auto;
      min-width: 500px;
      padding: 0 30px;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        display: none;
      }

      &--pc-only {
        padding: 0 90px 0 30px;
      }
    }

    &-doc {
      a {
        color: var(--site-color-link);
        -webkit-font-smoothing: antialiased;
        word-break: keep-all;
        font-size: 15px;
        @doc-active();

        &:hover {
          opacity: 0.8;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        position: relative;
        color: #333;
        font-weight: normal;
        line-height: 1.5;
      }

      h1 {
        line-height: 40px;
        font-size: 30px;
        cursor: default;
      }

      h2 {
        margin: 30px 0 20px;
        font-size: 25px;
      }

      h3 {
        margin-bottom: 16px;
        font-size: 18px;
      }

      p,
      ul {
        -webkit-font-smoothing: antialiased;
        color: #555;
        font-size: 15px;
        line-height: 26px;
        padding: 16px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
        list-style: none;
      }

      pre {
        margin: 20px 0 0;
      }

      code {
        position: relative;
        display: block;
        padding: 16px;
        overflow-x: auto;
        font-size: 13px;
        font-family: Consolas, Monaco, monospace;
        line-height: 26px;
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      p code,
      li code,
      table code {
        -webkit-font-smoothing: antialiased;
        word-break: keep-all;
        color: var(--site-color-primary);
        font-size: 15px;
        @doc-active();
      }

      table {
        -webkit-font-smoothing: antialiased;
        width: 100%;
        margin-top: 12px;
        color: #333;
        font-size: 14px;
        line-height: 28px;
        border-collapse: collapse;
        border-radius: 4px;
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);

        th {
          padding: 8px 16px;
          font-weight: 500;
          text-align: left;
          color: #555;
          font-size: 13px;
          -webkit-font-smoothing: antialiased;
        }

        td {
          padding: 8px 16px;
          border-top: 1px solid #eee;
          color: #555;
          font-family: Consolas, Monaco, monospace;

          code {
            white-space: nowrap;
            padding: 0;
            font-size: 13px;
          }
        }

        em {
          color: var(--site-color-type);
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          font-size: 13px;
          @doc-active();
        }
      }

      .card {
        margin-bottom: 24px;
        padding: 0 4px;
      }
    }
  }
}
</style>
