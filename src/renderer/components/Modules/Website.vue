<template>
  <div class="ui">

    <div class="ui form">
      <div class="field">
        <label>{{ $t('website.form.input.label') }} :</label>
        <input v-model="url" class="prompt" type="url" :placeholder="$t('website.form.input')" autocomplete="off">
      </div>
      <div class="field centered">
        <button v-on:click="update()" class="ui right labeled icon button"><i class="right arrow icon"></i> {{ $t('website.form.button') }} </button>
      </div>
    </div>
    
    <div class="ui error message" v-if="error">
      <i v-on:click="error = false" class="close icon"></i>
      <div class="header">{{ $t('website.form.error.content') }}</div>
    </div>
  </div>
</template>

<script>
  import isUrl from 'validator/lib/isUrl'
  const aimer = require('aimer')

  export default {
    data () {
      return {
        url: '',
        error: false
      }
    },
    computed: {
      isLoading: function () {
        return this.$store.state.Website.isLoading
      }
    },
    methods: {
      update () {
        let isValide = isUrl(this.url, {
          protocols: ['http', 'https'],
          require_host: true,
          require_valid_protocol: true
        })

        if (isValide) {
          this.error = false
          this.$store.commit('UPDATE_LOADING', {
            show: true
          })

          this.$store.commit('UPDATE_WEBSITE', this.url)
          aimer(this.url).then($ => {
            this.$store.commit('UPDATE_QUERY', $)
            this.$store.commit('UPDATE_LOADING', {
              show: false
            })
          })
        } else {
          this.error = true
        }
      }
    }
  }
</script>

<style scoped>
.centered {
  text-align: center!important
}
</style>
