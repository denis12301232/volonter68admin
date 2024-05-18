<script setup lang="ts">
import 'quill/dist/quill.snow.css';
import OverlayPanel from 'primevue/overlaypanel';
import InputText from 'primevue/inputtext';
import Quill from 'quill';
import BlotFormatter, { ResizeAction, ImageSpec } from 'quill-blot-formatter';
import { onMounted, ref, shallowRef } from 'vue';


Quill.register('modules/blotFormatter', BlotFormatter as any);

const model = defineModel<string>({ required: true });
const quill = shallowRef<Quill>();
const imagePanel = ref<OverlayPanel>();
const imageLink = ref('');
class CustomImageSpec extends ImageSpec {
  getActions() {
    return [ResizeAction];
  }
}

onMounted(() => {
  quill.value = new Quill('#editor', {
    modules: {
      toolbar: {
        container: '#toolbar',
        handlers: {
          image() {},
        },
      },
      blotFormatter: {
        specs: [CustomImageSpec],
      },
    },
    theme: 'snow',
    formats: [
      'bold',
      'underline',
      'header',
      'italic',
      'strike',
      'link',
      'image',
      'video',
      'align',
      'size',
      'script',
      'font',
      'list',
      'indent',
    ],
    placeholder: 'Type something in here!',
  });
  quill.value.root.innerHTML = model.value;
  quill.value.on('text-change', () => quill.value && (model.value = quill.value.root.innerHTML));
});

function imageHandler() {
  quill.value?.focus();
  const range = quill.value?.getSelection();

  if (imageLink.value && range) {
    quill.value?.insertEmbed(range.index, 'image', imageLink.value, Quill.sources.USER);
    imageLink.value = '';
    imagePanel.value?.hide();
  }
}
</script>

<template>
  <div>
    <div id="toolbar">
      <span class="ql-formats">
        <select class="ql-font"></select>
        <select class="ql-size"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-header"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-direction" value="rtl"></button>
        <select class="ql-align"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-link"></button>
        <button class="ql-image" @click="imagePanel?.toggle"></button>
        <OverlayPanel ref="imagePanel">
          <span class="relative">
            <InputText v-model="imageLink" class="pr-10" placeholder="Paste image link " />
            <button
              class="absolute right-3 top-2/4 -mt-2 text-surface-400 dark:text-surface-600"
              @click="imageHandler"
            >
              <i class="pi pi-check" />
            </button>
          </span>
        </OverlayPanel>
        <button class="ql-video"></button>
      </span>
    </div>
    <div class="min-h-96" id="editor"></div>
  </div>
</template>
