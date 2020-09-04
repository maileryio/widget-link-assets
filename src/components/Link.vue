<template>
  <a v-bind:href="href" v-bind:method="method" v-on:click.stop.prevent="handleClick">
    <slot></slot>
  </a>
</template>

<script>
  const getCsrfToken = () => {
    const meta = window.document.querySelector('meta[name="csrf"]');
    if (!!meta) {
        return meta.getAttribute('content');
    }
    return null;
  };

  export default {
    name: 'ui-widget-link',
    props: {
      href: {
        type: String
      },
      method: {
        type: String,
        default: 'get'
      },
      confirm: {
        type: String,
        default: null
      },
    },
    methods: {
      handleClick() {
        const { href, method, confirm } = this.$props;

        if (['PUT', 'DELETE'].indexOf(method.toUpperCase()) === -1) {
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
                'X-CSRF-Token': getCsrfToken()
            },
            mode: 'cors',
            credentials: 'include'
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
