<template>
  <div class="container">
    <div class="month">
      <div class="dayBox" v-for="(day, i) in daysToDisplay" :key="i">
        <button
          @click="openDay(day)"
          v-if="day"
          class="day"
          :class="{currentDay: currentDay === day, selectedDay: day === selectedDay}"
        >{{day}}</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getCurrentDate } from "@/compositions/currentDate";

import { daysInMonth } from "../utils/date";

export default {
  name: "Month",
  setup() {
    const { d } = getCurrentDate();
    return { selectedDay: d };
  },
  data() {
    return {
      days: 6 * 7, // 6 weeks, 7 days
      date: new Date(),
    };
  },
  methods: {
    openDay(date) {
      const mm = this.date.getMonth();
      const yy = this.date.getFullYear();
      const dd = date;
      this.$router.push(`${mm}-${dd}-${yy}`);
    },
  },
  computed: {
    currentDay() {
      return this.date.getDate();
    },
    startDay() {
      return this.date.getDay() + 1; // `in` starts at index of 1
    },
    daysToDisplay() {
      const lastDateNum = daysInMonth(
        this.date.getMonth(),
        this.date.getFullYear()
      );
      const daysArr = Array.from({ length: this.days }, (_, n) => {
        const dateNum = n - this.startDay;
        if (dateNum <= 0 || dateNum > lastDateNum) return false;
        return dateNum;
      });
      return daysArr;
    },
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
