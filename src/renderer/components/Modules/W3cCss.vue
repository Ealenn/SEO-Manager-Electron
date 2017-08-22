<template>
  <div class="column" v-if="typeof this.$store.state.Website.$ === 'function'">
    <h4 class="ui top attached inverted header">{{ $t('w3c.panel.title') }}</h4>
    <div class="ui bottom attached segment">
      <div class="ui active inverted dimmer" v-if="showLoading && !this.$store.state.Loading.show">
        <div class="ui loader"></div>
      </div>

      <table class="ui very basic compact fixed striped table">
        <thead>
          <tr>
            <th>{{ $t('w3c.array.context') }}</th>
            <th>{{ $t('w3c.array.errortype') }}</th>
            <th>{{ $t('w3c.array.message') }}</th>
            <th>{{ $t('w3c.array.skippedstring') }}</th>
            <th>{{ $t('w3c.array.type') }}</th>
            <th>{{ $t('w3c.array.uri') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in errors">
            <td>{{ item.context }}</td>
            <td>{{ item.errorSubtype ? item.errorType + ' / ' + item.errorSubtype : item.errorType }}</td>
            <td>{{ item.message }}</td>
            <td>{{ item.skippedString }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.uri }} :{{ item.line }}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
  // const _ = require('lodash')
  const validator = require('w3c-css')

  export default {
    data () {
      return {
        errors: [],
        warning: [],
        showLoading: true
      }
    },
    watch: {
      url: function (newUrl) {
        validator.validate(newUrl, (err, data) => {
          this.showLoading = false
          if (err) {
            console.error(err)
          } else {
            // validation errors
            this.errors = data.errors
            // validation warnings
            this.warning = data.warnings
          }
        })
      }
    },
    computed: {
      url: function () {
        return this.$store.state.Website.url
      }
    }
  }
</script>

<style scoped>
.column {
  padding-top: 15px
}
</style>
