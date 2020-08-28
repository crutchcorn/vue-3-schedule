<template>
  <p>Hello, world! {{dateToString}}</p>
</template>

<script>
import { getCurrentDate } from "@/compositions/currentDate";

export default {
  name: "Schedule",
  setup() {
    const { dateToString } = getCurrentDate();
    return {
      dateToString,
    };
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
