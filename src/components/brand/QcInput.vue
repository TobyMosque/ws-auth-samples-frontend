<template>
  <q-input v-bind="$props" :filled="cFilled" :outlined="cOutlined">
    <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useQuasar, QInput } from 'quasar';

const BooleanUndefined = {
  type: Boolean,
  default() {
    return undefined;
  },
};

export default defineComponent({
  name: 'QcInput',
  emits: [QInput.emits],
  props: {
    standard: BooleanUndefined,
    filled: BooleanUndefined,
    outlined: BooleanUndefined,
  },
  setup(props) {
    const $q = useQuasar();
    const dark = computed(() => $q.dark.isActive);

    const hasProps = computed(
      () =>
        props.standard !== undefined ||
        props.filled !== undefined ||
        props.outlined !== undefined
    );
    const cFilled = computed(() =>
      hasProps.value ? props.filled ?? false : dark.value
    );
    const cOutlined = computed(() =>
      hasProps.value ? props.outlined ?? false : !dark.value
    );
    return { cFilled, cOutlined };
  },
});
</script>
