import component from './components/Link.vue';
import store from './store';

export function install(Vue, options) {
  if (install.installed) {
    return;
  }

  if (!options || !options.store) {
    throw new Error('Please initialise plugin with a Vuex store.');
  }

  options.store.registerModule(component.name, store);
  Vue.component(component.name, component);

  install.installed = true;
}

const plugin = {
  install,
  component
};

let Vue = null;
if (typeof window !== 'undefined') {
  Vue = window.Vue;
} else if (typeof global !== 'undefined') {
  Vue = global.Vue;
}

console.log(Vue);

if (Vue) {
  Vue.use(plugin);
}

export default plugin;
