import mailery from '@maileryio/mailery-assets';
import component from './components/Link.vue';
import store from './store';

const plugin = {
  install,
  component
};

(function (plugin) {
  let Vue = null;
  if (typeof window !== 'undefined') {
    Vue = window.Vue;
  } else if (typeof global !== 'undefined') {
    Vue = global.Vue;
  }

  if (Vue) {
    Vue.use(plugin);
  }
})(plugin);

export function install(Vue, options) {
  if (install.installed) {
    return;
  }

  mailery.$store.registerModule(component.name, store);
  Vue.component(component.name, component);

  install.installed = true;
}

export default plugin;
