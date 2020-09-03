<template>
  <div class="container">
    <Month :currentMonth="currentMonth"/>
    <router-view />
  </div>
</template>

<script>
import Month from '../components/Month.vue'
import dayjs from "dayjs";

export default {
  name: "MonthView",
  components: {
    Month
  },
  data() {
    return {
      currentMonth: dayjs().date(1),
    };
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
.month {
  border: 4px solid red;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  max-width: 600px;
  width: 100%;
}

.dayBox {
  border: 2px solid black;
  position: relative;
}

.dayBox:before {
  display: block;
  content: "";
  width: 100%;
  padding-top: 100%;
}
.dayBox > .day {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.day {
  background: none;
  width: 100%;
  height: 100%;
  border: none;
}

.currentDay {
  border: 4px solid blue;
}

.day:hover {
  background: lightblue;
}

.selectedDay {
  background: lightgreen;
}
</style>
