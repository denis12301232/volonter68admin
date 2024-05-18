<script setup lang="ts">
import type { INews } from '@/types';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import { VEditor } from '@/components';
import { useQuery } from '@/composables';
import { Api } from '@/services';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const toast = useToast();
const { data, query: show } = useQuery(Api.news.show.bind(Api.news));
const { query: update } = useQuery(Api.news.update.bind(Api.news));
const news = ref<INews>();

onMounted(() => show({ id: String(route.params.id) }));
watch(data, (n) => {
  console.log(n);
  n && (news.value = { ...n.news, date: new Date(n.news.date) });
});

function onSubmit() {
  update(
    { id: String(route.params.id) },
    {
      title: news.value?.title,
      content: news.value?.content,
      reporter: news.value?.reporter,
      date: news.value?.date && new Date(news.value.date).toISOString(),
    }
  ).then(() => toast.add({ severity: 'success', detail: 'Updated', life: 1000 }));
}
</script>

<template>
  <div>
    <figure class="mt-5 flex flex-col items-center">
      <figcaption class="text-3xl">Edit news</figcaption>
      <form v-if="news" class="mt-10" @submit.prevent="onSubmit">
        <div class="flex max-w-screen-lg flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="date">Date</label>
            <Calendar v-model="news.date" id="date" dateFormat="yy-mm-dd" showIcon showTime />
          </div>
          <div class="flex flex-col gap-2">
            <label for="title">Title</label>
            <InputText v-model="news.title" id="title" placeholder="Title" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="reporter">Reporter</label>
            <InputText v-model="news.title" id="reporter" placeholder="Reporter" />
          </div>
          <div>
            <VEditor v-model="news.content"></VEditor>
          </div>
          <Button type="submit"> Update</Button>
        </div>
      </form>
    </figure>
  </div>
</template>
