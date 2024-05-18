<script setup lang="ts">
import VEditor from '@/components/VEditor.vue';
import { ref, watchEffect } from 'vue';

const content = ref('');

watchEffect(() => console.log(content.value))
</script>

<template>
  <VEditor v-model="content"></VEditor>
</template>

<!-- <script setup lang="ts">
import { onMounted } from 'vue';

let startX = 0;
let startY = 0;

function onDragStart(event: DragEvent) {
  const target = event.target as HTMLElement;
  const el = target.cloneNode(true) as HTMLElement;
  el.classList.add('hide');

  startX = event.x;
  startY = event.y;
  event.dataTransfer?.setDragImage(el, 0, 0);
}

function onDrag(event: DragEvent) {
  const el = event.target as HTMLElement;

  if (event.clientX > 0 && event.clientY > 0) {
    el.style.width = el.clientWidth + (event.clientX - startX) + 'px';
    startX = event.clientX;

    el.style.height = el.clientHeight + (event.clientY - startY) + 'px';
    startY = event.clientY;
  }
}
</script>

<template>
  <div class="q-pa-lg">
    <div @drag="onDrag" @dragstart="onDragStart" class="drag" draggable="true">
      <img
        draggable="false"
        style="width: 100%; height: 100%"
        src="https://www.tobook.com/photos/7057_108284_just-a-test_Graz.jpg"
      />
    </div>
  </div>
</template> -->

<style>
#container {
  display: inline-block;
  cursor: nwse-resize;
}

.hide {
  opacity: 0;
}

.drag {
  width: 500px;
}
</style>
