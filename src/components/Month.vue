<template>
  <div class="month">
    <div class="dayName">Sun</div>
    <div class="dayName">Mon</div>
    <div class="dayName">Tue</div>
    <div class="dayName">Wed</div>
    <div class="dayName">Thurs</div>
    <div class="dayName">Fri</div>
    <div class="dayName">Sat</div>
    <div class="dayBox" v-for="(day, i) in daysToDisplay" :key="i">
      <button
        @click="openDay(day)"
        v-if="day"
        class="day"
        :class="{currentDay: sameMonthAsToday && currentDay === day, selectedDay: sameMonthAsSelected && day === selectedDay}"
      >{{day}}</button>
    </div>
  </div>
</template>

<script>
import { getRouteDate } from "@/compositions/routeDate";

import { daysInMonth } from "../utils/date";

export default {
  name: "Month",
  props: ["currentMonth"],
  setup() {
    const { d, selectedDate } = getRouteDate();
    return { selectedDay: d, selectedDate };
  },
  data() {
    return {
      daysToShow: 6 * 7, // 6 weeks, 7 days
      todaysDate: new Date(),
    };
  },
  methods: {
    openDay(date) {
      const mm = this.currentMonth.month();
      const yy = this.currentMonth.year();
      const dd = date;
      this.$router.push(`${mm}-${dd}-${yy}`);
    },
  },
  computed: {
    sameMonthAsToday() {
      return (
        this.currentMonth.year() === this.todaysDate.getFullYear() &&
        this.currentMonth.month() === this.todaysDate.getMonth()
      );
    },
    sameMonthAsSelected() {
      if (!this.selectedDate) return false;
      return (
        this.currentMonth.year() === this.selectedDate.getFullYear() &&
        this.currentMonth.month() === this.selectedDate.getMonth()
      );
    },
    currentDay() {
      return this.todaysDate.getDate();
    },
    startDayOfWeek() {
      return this.currentMonth.get("day") - 1; // Indexes at 1
    },
    daysToDisplay() {
      const lastDateNum = daysInMonth(
        this.todaysDate.getMonth(),
        this.todaysDate.getFullYear()
      );
      const daysArr = Array.from({ length: this.daysToShow }, (_, n) => {
        const dateNum = n - this.startDayOfWeek;
        if (dateNum <= 0 || dateNum > lastDateNum) return false;
        return dateNum;
      });
      return daysArr;
    },
  },
};
</script>

<style scoped>
.month {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(6, 1fr);
  max-width: 600px;
  width: 100%;
}

.dayName {
  margin-bottom: 1rem;
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
