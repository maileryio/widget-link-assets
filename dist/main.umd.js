(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.widget = global.widget || {}, global.widget.link = {})));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'ui-link',
    props: {
      href: String,
      method: {
        type: String,
        default: 'GET'
      },
      confirm: String,
      headers: {
        type: Object,
        default: {}
      },
      disabled: {
      	type: Boolean,
      	default: false
      },
      createRequest: {
        type: Function
      },
      beforeRequest: {
        type: Function,
        default: function () { return true; }
      },
      afterRequest: {
        type: Function,
        default: function () {}
      }
    },
    methods: {
      click: function click() {
        var ref = this.$props;
        var href = ref.href;
        var method = ref.method;
        var confirm = ref.confirm;
        var headers = ref.headers;
        var createRequest = ref.createRequest;
        var beforeRequest = ref.beforeRequest;
        var afterRequest = ref.afterRequest;

        if (confirm && !window.confirm(confirm)) {
          return false;
        }

        var request = !!createRequest
          ? createRequest()
          : new Request(
            href,
            {
              method: method.toUpperCase()
            }
          );

        Object.entries(headers).forEach(function (entry) { return request.headers.append(entry[0], entry[1]); });

        if (beforeRequest(request)) {
          window
            .fetch(request)
            .then(function (response) { return afterRequest(response); });
        }
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "b-link",
      {
        attrs: { href: _vm.href, disabled: _vm.disabled },
        on: {
          click: function($event) {
            $event.stopPropagation();
            $event.preventDefault();
            return _vm.click($event)
          }
        }
      },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  var plugin = {
    install: install,
    component: __vue_component__
  };

  (function (plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue.use(plugin);
    }
  })(plugin);

  function install(Vue, options) {
    Vue.component(__vue_component__.name, __vue_component__);
  }

  exports.default = plugin;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=main.umd.js.map
