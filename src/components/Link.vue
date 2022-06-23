<template>
  <b-link
    :href="href"
    :disabled="disabled"
    @click.stop.prevent="click">
    <slot></slot>
  </b-link>
</template>

<script>
  export default {
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
        default: () => true
      },
      afterRequest: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      click() {
        const { href, method, confirm, headers, createRequest, beforeRequest, afterRequest } = this.$props;

        if (confirm && !window.confirm(confirm)) {
          return false;
        }

        const request = !!createRequest
          ? createRequest()
          : new Request(
            href,
            {
              method: method.toUpperCase()
            }
          );

        Object.entries(headers).forEach(entry => request.headers.append(entry[0], entry[1]));

        if (beforeRequest(request)) {
          window
            .fetch(request)
            .then(response => afterRequest(response))
        }
      }
    }
  }
</script>
