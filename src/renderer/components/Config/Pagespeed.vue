<template>
  <div class="column">
    <h4 class="ui top attached inverted header">{{ $t('config.pagespeed.title') }}</h4>
    <div class="ui bottom attached segment">
      <div class="ui form">
        <div class="field">
          <label>{{ $t('config.pagespeed.label') }}</label>
          <input class="prompt" type="text" autocomplete="off" v-model="Localkey" v-on:keyup="updateKey(Localkey)">
        </div>
      </div>
      <p>
        <a href="#" v-on:click="open('https://console.developers.google.com/apis/api/pagespeedonline.googleapis.com/overview')">
          {{ $t('config.pagespeed.desc') }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        Localkey: this.$store.state.Pagespeed.key
      }
    },
    computed: {
    },
    methods: {
      updateKey: function (newKey) {
        this.$store.commit('UPDATE_PAGESPEED_KEY', newKey)
        this.$store.state.electronStore.set('pagespeed.key', newKey)
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
.centered {
  text-align: center!important
}
.segment p {
  padding-top: 10px
}
</style>
