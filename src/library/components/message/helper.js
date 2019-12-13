import Vue from 'vue';
import Hepler from './helper.vue';

const IMessage = Vue.extend(Hepler);

export default function(options = {}) {
  if (typeof options === 'string') {
    options = { message: options };
  }
  const imessage = new IMessage({ data: options }).$mount();
  document.body.appendChild(imessage.$el);
  imessage.show = true;
  return imessage;
}
