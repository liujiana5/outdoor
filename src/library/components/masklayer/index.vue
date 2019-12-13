<template>
  <div class="bt-widget-layer" @click.self="$emit('click', $event)">
    <slot />
  </div>
</template>
