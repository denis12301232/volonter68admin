<script setup lang="ts">
import { VEditor } from '@/components';
import { useQuasar, type QForm } from 'quasar';
import { onMounted, ref, watchEffect } from 'vue';
import { required } from '@/utils';
import { useQuery } from '@/composables';
import { Api } from '@/services';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const { notify } = useQuasar();
const { data, query } = useQuery(Api.project.show.bind(Api.project));
const { query: update } = useQuery(Api.project.update.bind(Api.project));
const form = ref<QForm>();
const isValid = ref(false);

watchEffect(() => form.value?.validate().then((v) => (isValid.value = v)));
onMounted(() => query({ id: props.id }));

function onSubmit() {
  update(
    { id: props.id },
    { title: data.value?.project.title, content: data.value?.project.content }
  ).then(() => notify({ message: 'Updated', color: 'positive' }));
}
</script>

<template>
  <div class="bg-white column">
    <div class="flex justify-end q-pa-sm">
      <QBtn v-close-popup icon="eva-close" color="negative" flat />
    </div>
    <div style="flex: 1 1 auto">
      <QScrollArea class="full-height" :content-style="{ position: 'relative' }"  :content-active-style="{ position: 'relative' }">
        <figure class="column items-center q-pa-md">
          <figcaption class="text-h6">Edit news</figcaption>
          <QForm
            v-if="data"
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
              <QInput
                v-model="data.project.title"
                class="q-mt-md"
                label="Sutitle"
                filled
                :rules="[required]"
              />
            </div>
            <VEditor v-model="data.project.content" class="q-mt-md" min-height="20rem" />
            <QBtn class="q-mt-sm" type="submit" color="primary" :disable="!isValid">Save</QBtn>
          </QForm>
        </figure>
      </QScrollArea>
    </div>
  </div>
</template>
