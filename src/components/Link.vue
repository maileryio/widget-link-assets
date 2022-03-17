<template>
  <a v-bind:href="href" v-bind:method="method" v-on:click.stop.prevent="handleClick">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'ui-widget-link',
    props: {
      href: 'String',
      method: 'String',
      confirm: 'String',
      csrfValue: 'String',
      csrfHeaderName: 'String',
    },
    methods: {
      handleClick() {
        const { href, method, confirm } = this.$props;

        if (['POST', 'PUT', 'DELETE'].indexOf(method.toUpperCase()) === -1) {
          return;
        }

        if (confirm && !window.confirm(confirm)) {
          return false;
        }

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
        .then(res => {
          if (res.redirected && res.url) {
            window.location.href = res.url
          }
        })
      }
    }
  }
</script>
