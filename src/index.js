import DualListbox from './components/DualListbox.vue';
import store from './store';

export function install(Vue, options) {
  if (install.installed) {
    return;
  }

  if (!options || !options.store) {
    throw new Error('Please initialise plugin with a Vuex store.');
  }

  options.store.registerModule(DualListbox.name, store);
  Vue.component(DualListbox.name, DualListbox);

  install.installed = true;
}

const plugin = {
  install,
  DualListbox
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
