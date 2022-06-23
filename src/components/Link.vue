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
      href: 'String',
      method: 'String',
      confirm: 'String',
      csrfValue: 'String',
      csrfHeaderName: 'String',
      disabled: {
      	type: Boolean,
      	default: false
      }
    },
    methods: {
      click() {
        const { href, method, confirm } = this.$props;

        if (['POST', 'PUT', 'DELETE'].indexOf(method.toUpperCase()) === -1) {
          return;
        }

        if (confirm && !window.confirm(confirm)) {
          return false;
        }

        this.$emit('before-request');

        window.fetch(
          href,
          {
            method,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              [this.csrfHeaderName]: this.csrfValue
            }
          }
        )
        .then(res => this.$emit('after-request', res))
      }
    }
  }
</script>
