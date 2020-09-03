<template>
  <div class="container">
    <div class="beegContain">
      <div class="monthControllers">
        <button @click="subMonth()">Up</button>
        <button @click="addMonth()">Down</button>
      </div>
      <Month :currentMonth="currentMonth" />
    </div>
    <router-view />
  </div>
</template>

<script>
import Month from "../components/Month.vue";
import dayjs from "dayjs";

export default {
  name: "MonthView",
  components: {
    Month,
  },
  data() {
    return {
      currentMonth: dayjs().date(1),
    };
  },
  methods: {
    subMonth() {
      this.currentMonth = this.currentMonth.subtract(1, 'month');
    },
    addMonth() {
      this.currentMonth = this.currentMonth.add(1, 'month');
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.monthControllers {
  display: flex;
  justify-content: flex-end;
}

.beegContain {
  flex-basis: 100%;
}
</style>
