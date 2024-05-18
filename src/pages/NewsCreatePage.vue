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
const news = reactive({ title: '', reporter: '', content: '', date: '' });
const { query: create } = useQuery(Api.news.create.bind(Api.news));

function onSubmit() {
  create({
    title: news.title,
    content: news.content,
    reporter: news.reporter,
    date: new Date(news.date).toISOString(),
  }).then(() => router.push({ name: 'news' }));
}

watch(news, () => form.value?.validate().then((v) => (isValid.value = v)));
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
        <QInput v-model="news.title" class="q-mt-md" label="Sutitle" filled :rules="[required]" />
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
</template>

<style lang="scss" scoped></style>
