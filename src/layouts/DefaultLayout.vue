<script setup lang="ts">
import Menubar, { type MenubarProps } from 'primevue/menubar';
import Menu, { type MenuProps } from 'primevue/menu';
import Avatar from 'primevue/avatar';
import { ref } from 'vue';
import { Api } from '@/services';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores';

const store = useStore();
const router = useRouter();
const menubar = ref<MenubarProps['model']>([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/',
  },
]);
const menu = ref<Menu>();
const menuItems = ref<MenuProps['model']>([
  {
    separator: true,
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        shortcut: '⌘+Q',
        command: logout,
      },
    ],
  },
  {
    separator: true,
  },
]);

function logout() {
  Api.auth.logout().then(() => router.push({ name: 'login' }));
}
</script>

<template>
  <div class="flex h-full flex-col">
    <Menubar :model="menubar">
      <template #item="{ item }">
        <RouterLink v-if="item.route" v-ripple class="flex items-center" :to="item.route">
          <span :class="item.icon"></span>
          <span class="ml-2">{{ item.label }}</span>
        </RouterLink>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Button class="uppercase" @click="menu?.toggle">
            <Avatar :label="store.user?.login.charAt(0)" shape="circle" />
          </Button>
          <Menu ref="menu" :model="menuItems" popup />
        </div>
      </template>
    </Menubar>
    <div class="flex-auto">
      <RouterView />
    </div>
    <div class="text-center text-sm">2024</div>
  </div>
</template>
