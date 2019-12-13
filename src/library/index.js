import './less/index.less';
import Button from './components/button';
import ButtonGroup from './components/button/group';
import Space from './components/space';
import Page from './components/page';
import Masklayer from './components/masklayer';
import Modal from './components/modal';
import Message from './components/message';
import Stepper from './components/stepper';
import $message from './components/message/helper';
import Radio from './components/radio';
import RadioGroup from './components/radio/radio-group.vue';
import Checkbox from './components/checkbox';
import CheckboxGroup from './components/checkbox/checkbox-group.vue';
import Switch from './components/switch';
import Marquee from './components/marquee';
import Swipe from './components/swipe';
import Image from './components/image';

import ImgLazyload from './components/imgLazyload';

const library = {
  Button,
  ButtonGroup,
  Space,
  Page,
  Masklayer,
  Modal,
  Message,
  Stepper,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Marquee,
  ImgLazyload,
  Swipe,
  Image,
};

// AbCdEf => ab-cd-ef
const kebabCase = str => str.replace(/([A-Z])/g, s => '-' + s.toLowerCase()).replace(/^-/, '');

function install(Vue, options) {
  // 注册组件
  Object.keys(library).forEach(name => {
    Vue.component(`bt-${kebabCase(name)}`, library[name]);
  });

  // 注册方法
  Vue.prototype.$message = $message;
}

export default { install };
