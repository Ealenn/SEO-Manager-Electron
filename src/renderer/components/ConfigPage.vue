<template>
  <div id="app" class="ui main container">

    <div class="ui grid">
      <div class="ui content">
        <router-link to="/">
          <button class="ui right labeled icon button"><i class="left arrow icon"></i> {{ $t('config.panel.back') }}</button>
        </router-link>
      </div>
      <div class="ui content">
        <h2 class="ui header">
          <i class="settings icon"></i>
          <div class="content">
            {{ $t('config.panel.title') }}
          </div>
        </h2>
      </div>
    </div>

    <div class="ui section divider"></div>

    <pagespeed></pagespeed>
  </div>
</template>

<script>
  import Pagespeed from './Config/Pagespeed'

  export default {
    name: 'home-page',
    components: {
      Pagespeed
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
#app {
  padding-top: 20px
}
</style>
