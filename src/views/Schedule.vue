<template>
  <p>Hello, world! {{currentRouteName}}</p>
</template>

<script>
export default {
  name: "Schedule",
  computed: {
    currentRouteName() {
      const mmddyy = this.$router.currentRoute.value.params.mmddyy;
      const [m, d, y] = mmddyy.split("-") || [];
      return new Date(y, m, d);
    },
    dateToString() {
      return this.currentRouteName.toDateString();
    }
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
