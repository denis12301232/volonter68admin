<script setup lang="ts">
import type { INews } from '@/types';
import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import { Api } from '@/services';
import { Table } from '@/utils';
import { onMounted, reactive } from 'vue';
import { useQuery } from '@/composables';

const { data, query: index, isLoading } = useQuery(Api.news.index.bind(Api.news));
const { query: update, isLoading: isUpdating } = useQuery(Api.news.update.bind(Api.news));
const query = reactive({ page: 1, limit: 2 });

onMounted(() => index(query));

function onPinned(row: INews) {
  update({ id: row.id }, { pinned: row.pinned });
}

function onPage(event: DataTablePageEvent) {
  query.page = event.page + 1;
  index(query);
}
</script>

<template>
  <div class="p-5">
    <DataTable
      lazy
      paginator
      :value="data?.news"
      :loading="isLoading || isUpdating"
      :first="0"
      :rows="query.limit"
      :total-records="data?.total"
      @page="onPage"
    >
      <Column :field="Table.NEWS_COLUMNS[0].field" :header="Table.NEWS_COLUMNS[0].header"></Column>
      <Column :field="Table.NEWS_COLUMNS[1].field" :header="Table.NEWS_COLUMNS[1].header"></Column>
      <Column :field="Table.NEWS_COLUMNS[2].field" :header="Table.NEWS_COLUMNS[2].header">
        <template #body="{ data }: { data: INews }">{{ data.date }}</template>
      </Column>
      <Column :field="Table.NEWS_COLUMNS[3].field" :header="Table.NEWS_COLUMNS[3].header">
        <template #body="scope">
          <Checkbox v-model="scope.data.pinned" binary @update:model-value="onPinned(scope.data)" />
        </template>
      </Column>
      <Column :field="Table.NEWS_COLUMNS[4].field" :header="Table.NEWS_COLUMNS[4].header">
        <template #body="scope">
          <RouterLink :to="{ name: 'news-edit', params: { id: scope.data.id } }">
            <i class="pi pi-file-edit hover:scale-125" />
          </RouterLink>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
