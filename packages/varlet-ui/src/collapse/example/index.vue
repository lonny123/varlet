<template>
  <div class="collapse-demo">
    <div>
      <app-type>{{ pack.basicUsage }}</app-type>
      <var-collapse v-model="value" @change="changeHandle">
        <var-collapse-item :title="pack.title" name="1">{{ pack.text }}</var-collapse-item>
        <var-collapse-item :title="pack.title" name="2">{{ pack.text }}</var-collapse-item>
      </var-collapse>
    </div>

    <div>
      <app-type>{{ pack.hideMargin }}</app-type>
      <var-collapse v-model="value4" :offset="false">
        <var-collapse-item :title="pack.title" name="1">{{ pack.text }}</var-collapse-item>
        <var-collapse-item :title="pack.title" name="2">{{ pack.text }}</var-collapse-item>
      </var-collapse>
    </div>

    <div>
      <app-type>{{ pack.accordionMode }}</app-type>
      <var-collapse v-model="value1" accordion :offset="false">
        <var-collapse-item :title="pack.title" name="1">{{ pack.text }}</var-collapse-item>
        <var-collapse-item :title="pack.title" name="2">{{ pack.text }}</var-collapse-item>
      </var-collapse>
    </div>

    <div>
      <app-type>{{ pack.disabled }}</app-type>
      <var-button @click="disabled = !disabled" style="margin-bottom: 8px">
        {{ disabled ? pack.enable : pack.disabled }}
      </var-button>
      <var-collapse v-model="value2">
        <var-collapse-item :title="pack.title" :name="1" :disabled="disabled">{{ pack.text }}</var-collapse-item>
        <var-collapse-item :title="pack.title" :name="2" :disabled="disabled">{{ pack.text }}</var-collapse-item>
      </var-collapse>
    </div>

    <div>
      <app-type>{{ pack.customContent }}</app-type>
      <var-collapse v-model="value3">
        <var-collapse-item :title="pack.slotTitle" name="1" icon="account-circle">{{ pack.text }}</var-collapse-item>
        <var-collapse-item name="2">
          <template #title>{{ pack.slotTitle }}</template>
          <template #icon>^_^</template>
          {{ pack.slotContent }}
        </var-collapse-item>
      </var-collapse>
    </div>
  </div>
</template>

<script>
import AppType from '@varlet/cli/site/mobile/components/AppType'
import Collapse from '..'
import CollapseItem from '../../collapse-item'
import Button from '../../button'
import { reactive, toRefs } from 'vue'
import { pack, use } from './locale'
import { watchLang } from '@varlet/cli/site/utils'

export default {
  name: 'CollapseExample',
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Button.name]: Button,
    AppType,
  },
  setup() {
    const values = reactive({
      disabled: false,
      value: ['1'],
      value1: '',
      value2: [1],
      value3: ['1'],
      value4: ['2'],
    })

    const changeHandle = (val) => {
      console.log(val)
    }

    watchLang(use)

    return {
      ...toRefs(values),
      pack,
      changeHandle,
    }
  },
}
</script>
