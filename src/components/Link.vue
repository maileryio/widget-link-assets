<template>
  <b-link
    :href="href"
    :method="method"
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
      }
    },
    events: ['before-request', 'after-request'],
    methods: {
      click() {
        const { href, method, confirm, headers, createRequest } = this.$props;

        if (confirm && !window.confirm(confirm)) {
          return false;
        }

        if (!createRequest) {

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

        this.$emit('before-request', request);

        window
          .fetch(request)
          .then(response => this.$emit('after-request', response))
      }
    }
  }
</script>
