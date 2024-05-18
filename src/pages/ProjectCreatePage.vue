<script setup lang="ts">
import type { QForm } from 'quasar';
import { VEditor } from '@/components';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@/composables';
import { Api } from '@/services';
import { required } from '@/utils';

const router = useRouter();
const form = ref<QForm>();
const isValid = ref(false);
const project = reactive({ title: '', content: '' });
const { query: create } = useQuery(Api.project.create.bind(Api.project));

function onSubmit() {
  create({ title: project.title, content: project.content }).then(() =>
    router.push({ name: 'projects' })
  );
}

watch(project, () => form.value?.validate().then((v) => (isValid.value = v)));
</script>

<template>
  <figure class="column items-center q-pa-md">
    <figcaption class="text-h6">Create news</figcaption>
    <QForm
      ref="form"
      class="full-width q-mt-lg"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      no-error-focus
      @submit.prevent="onSubmit"
    >
      <div style="max-width: 1024px; margin: 0 auto">
        <QInput v-model="project.title" class="q-mt-md" label="Title" filled :rules="[required]" />
      </div>
      <VEditor v-model="project.content" class="q-mt-md" min-height="20rem" />
      <QBtn class="q-mt-sm" type="submit" color="primary" :disable="!isValid">Save</QBtn>
    </QForm>
  </figure>
</template>
