export default function resizable(el: HTMLElement) {
  let startX = 0;
  let startY = 0;

  function onDragStart(event: DragEvent) {
    const target = event.target as HTMLElement;
    const el = target.cloneNode(true) as HTMLElement;
    el.classList.add('.resizable-hide');

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

  el.draggable = true;
  el.classList.add('resizable-img');
  (el.firstElementChild as HTMLElement).draggable = false;
  el.addEventListener('drag', onDrag);
  el.addEventListener('dragstart', onDragStart);
}
