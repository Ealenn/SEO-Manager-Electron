<template>
  <div class="column" v-if="meta.length > 0">
    <h4 class="ui top attached inverted header">{{ $t('metadata.array.title') }}</h4>
    <div class="ui bottom attached segment">
      <table class="ui very basic table">
        <thead>
          <tr>
            <th>{{ $t('metadata.array.property') }}</th>
            <th>{{ $t('metadata.array.name') }}</th>
            <th>{{ $t('metadata.array.content') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in meta">
            <td>{{ item.property }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      meta: function () {
        let metaTags = []
        if (typeof this.$store.state.Website.$ === 'function') {
          this.$store.state.Website.$('meta').each((index, elem) => {
            metaTags.push({
              property: elem.attribs.property,
              name: elem.attribs.name,
              content: elem.attribs.content
            })
          })
        }
        return metaTags
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
.column {
  padding-top: 15px
}
</style>
