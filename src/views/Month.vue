<template>
  <div class="container">
    <div class="month">
      <div class="dayBox" v-for="(day, i) in daysToDisplay" :key="i">
        <div v-if="day" class="day" :class="{currentDay: currentDay === day}">{{day}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { daysInMonth } from "../utils/date";

export default {
  name: "Month",
  data() {
    return {
      days: 6 * 7, // 6 weeks, 7 days
      date: new Date(),
    };
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
}
.month {
  border: 4px solid red;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  max-width: 600px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
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

.currentDay {
  border: 4px solid blue;
}

.day:hover {
  background: lightblue;
}
</style>
