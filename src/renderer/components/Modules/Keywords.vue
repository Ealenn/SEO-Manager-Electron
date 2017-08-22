<template>
  <div class="column" v-if="keywords.length > 0">
    <h4 class="ui top attached inverted header">{{ $t('keywords.panel.title') }}</h4>
    <div class="ui bottom attached segment">
      <table class="ui very basic table">
        <thead>
          <tr>
            <th>{{ $t('keywords.array.word') }}</th>
            <th>{{ $t('keywords.array.count') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in keywords" v-bind:sort="item.count" v-bind:key="item.word">
            <td>{{ item.word }}</td>
            <td>{{ item.count + 1 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Topick from '../../libs/topick/index'
  var _ = require('lodash')
  
  export default {
    data () {
      return {
      }
    },
    computed: {
      keywords: function () {
        if (typeof this.$store.state.Website.$ === 'function') {
          // Get keyword Topick
          let keyword = Topick.getLocalKeywords(this.$store.state.Website.$('html'), {
            method: 'combined',
            maxNumberOfKeywords: 20,
            minKeywordLength: 4
          })

          // Count keywords
          let KeywordWithCount = []
          for (var i = 0; i < keyword.length; i++) {
            let word = keyword[i]
            KeywordWithCount.push({
              word: word,
              count: this.count(word)
            })
          }
          return _.orderBy(KeywordWithCount, ['count'], ['desc'])
        }
        return []
      }
    },
    methods: {
      count: function (word) {
        if (typeof this.$store.state.Website.$ === 'function') {
          var regex = new RegExp(word, 'g')
          return (this.$store.state.Website.$('html').html().match(regex) || []).length
        }

        return 0
      }
    }
  }
</script>

<style scoped>
.column {
  padding-top: 15px
}
</style>
