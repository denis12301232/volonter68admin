<script setup lang="ts">
import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog, { type DialogState, type DialogEmits } from 'primevue/dialog';
import { useQuery } from '@/composables';
import { Api } from '@/services';
import { onMounted, reactive, ref } from 'vue';
import { Table } from '@/utils';

const { query: index, data, isLoading } = useQuery(Api.project.index.bind(Api.project));
const dialog = ref<DialogEmits & DialogState>();
const modal = ref(false);
const selected = ref<string | null>(null);
const query = reactive({ page: 1, limit: 10 });

onMounted(() => index(query));

function onEdit(id: string) {
  modal.value = true;
  selected.value = id;
}

function onPage(event: DataTablePageEvent) {
  query.page = event.page + 1;
  index(query);
}

function maximize(event: unknown) {
  if (dialog.value?.maximized) return;
  dialog.value?.maximize(event as Event);
}
</script>

<template>
  <div class="p-5">
    <DataTable
      lazy
      paginator
      :value="data?.projects"
      :loading="isLoading"
      :first="0"
      :rows="query.limit"
      :total-records="data?.total"
      @page="onPage"
    >
      <Column
        :field="Table.PROJECTS_COLUMNS[0].field"
        :header="Table.NEWS_COLUMNS[0].header"
      ></Column>
      <Column :field="Table.PROJECTS_COLUMNS[1].field" :header="Table.PROJECTS_COLUMNS[1].header">
        <template #body="scope">
          <Button icon="pi pi-file-edit" rounded @click="onEdit(scope.data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog ref="dialog" v-model:visible="modal" @show="maximize"></Dialog>
</template>
