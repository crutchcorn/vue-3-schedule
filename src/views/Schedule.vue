<template>
  <p>Hello, world! {{dateToString}}</p>
</template>

<script>
import { getRouteDate } from "@/compositions/routeDate";

export default {
  name: "Schedule",
  setup() {
    const { dateToString } = getRouteDate();
    return {
      dateToString,
    };
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
