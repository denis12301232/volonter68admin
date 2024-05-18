import type { ColumnProps } from 'primevue/column';

export namespace Table {
  export const NEWS_COLUMNS: ColumnProps[] = [
    { field: 'title', header: 'Title', columnKey: 'title' },
    { field: 'reporter', header: 'Reporter', columnKey: 'reporter' },
    { field: 'date', header: 'Date', columnKey: 'date' },
    { field: 'pinned', header: 'Pinned', columnKey: 'pinned' },
    { field: 'edit', header: 'Edit', columnKey: 'edit' },
  ];

  export const PROJECTS_COLUMNS: ColumnProps[] = [
    { field: 'title', header: 'Title', columnKey: 'title' },
    { field: 'edit', header: 'Edit', columnKey: 'edit' },
  ];
}
