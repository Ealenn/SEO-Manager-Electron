<template>
  <div class="translate">
    <a href="#" v-on:click="updateLocal('fr')"><i class="france flag"></i> Français</a> -  
    <a href="#" v-on:click="updateLocal('en')"><i class="united kingdom flag"></i> English</a>
  </div>
</template>

<script>
export default {
  name: 'translate',
  data () {
    return {
    }
  },
  methods: {
    updateLocal (local) {
      this.$store.commit('EDIT_LOCAL', local)
    }
  }
}
</script>

<style scoped>
.translate {
  padding-top: 10px;
  padding-bottom: 10px
}
</style>
