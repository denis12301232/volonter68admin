<script setup lang="ts">
import type { INews } from '@/types';
import { VEditor } from '@/components';
import { useQuasar, type QForm } from 'quasar';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { required } from '@/utils';
import { useQuery } from '@/composables';
import { Api } from '@/services';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const { notify } = useQuasar();
const { data, query } = useQuery(Api.news.show.bind(Api.news));
const { query: update } = useQuery(Api.news.update.bind(Api.news));
const form = ref<QForm>();
const news = ref<INews>();
const isValid = ref(false);

watch(data, (n) => n && (news.value = { ...n.news, date: formatDate(n.news.date) }));
watchEffect(() => form.value?.validate().then((v) => (isValid.value = v)));
onMounted(() => query({ id: props.id }));

function onSubmit() {
  update(
    { id: props.id },
    {
      title: news.value?.title,
      content: news.value?.content,
      reporter: news.value?.reporter,
      date: news.value?.date && new Date(news.value.date).toISOString(),
    }
  ).then(() => notify({ message: 'Updated', color: 'positive' }));
}

function formatDate(datestring: string) {
  return new Date(datestring).toLocaleString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<template>
  <div class="bg-white column">
    <div class="flex justify-end q-pa-sm">
      <QBtn v-close-popup icon="eva-close" color="negative" flat />
    </div>
    <div style="flex: 1 1 auto">
      <QScrollArea
        class="full-height"
        :content-style="{ position: 'relative' }"
        :content-active-style="{ position: 'relative' }"
      >
        <figure class="column items-center q-pa-md">
          <figcaption class="text-h6">Edit news</figcaption>
          <QForm
            v-if="news"
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
              <QInput v-model="news.date" class="q-mt-md" label="Date" filled :rules="[required]">
                <template #prepend>
                  <QIcon class="cursor-pointer" name="eva-calendar-outline">
                    <QPopupProxy cover transition-show="scale" transition-hide="scale">
                      <QDate v-model="news.date" mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <QBtn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </QDate>
                    </QPopupProxy>
                  </QIcon>
                </template>
                <template #append>
                  <QIcon name="eva-clock-outline" class="cursor-pointer">
                    <QPopupProxy cover transition-show="scale" transition-hide="scale">
                      <QTime v-model="news.date" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <QBtn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </QTime>
                    </QPopupProxy>
                  </QIcon>
                </template>
              </QInput>
              <QInput
                v-model="news.title"
                class="q-mt-md"
                label="Sutitle"
                filled
                :rules="[required]"
              />
              <QInput
                v-model="news.reporter"
                class="q-mt-md"
                label="Reporter name"
                filled
                :rules="[required]"
              />
            </div>
            <VEditor v-model="news.content" class="q-mt-md" min-height="20rem" />
            <QBtn class="q-mt-sm" type="submit" color="primary" :disable="!isValid">Save</QBtn>
          </QForm>
        </figure>
      </QScrollArea>
    </div>
  </div>
</template>
