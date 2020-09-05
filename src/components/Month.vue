<template>
  <table class="month">
    <thead>
    <tr>
    <th class="dayName">Sun</th>
    <th class="dayName">Mon</th>
    <th class="dayName">Tue</th>
    <th class="dayName">Wed</th>
    <th class="dayName">Thurs</th>
    <th class="dayName">Fri</th>
    <th class="dayName">Sat</th>
    </tr>
    </thead>
    <tr v-for="(week, weekI) in weekArr" :key="weekI">
      <td v-for="(day, dayI) in week" :key="dayI" class="dayBox" :class="{hasBorder: !!day}">
      <button
        @click="openDay(day)"
        v-if="day"
        class="day"
        :class="{currentDay: sameMonthAsToday && currentDay === day, selectedDay: sameMonthAsSelected && day === selectedDay}"
      >{{day}}</button>
      </td>
    </tr>
  </table>
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
      weeksToRender: 6, // 6 weeks, 7 days
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
    weekArr() {
      const lastDateNum = daysInMonth(
        this.todaysDate.getMonth(),
        this.todaysDate.getFullYear()
      );

      const daysArr = Array.from({length: this.weeksToRender}, (_, weekI) => {
        return Array.from({length: 7}, (_, dayI) => {
          const dayIndex = (weekI * 7) + dayI;
          const dateNum = dayIndex - this.startDayOfWeek;
          console.log(dayIndex);
          if (dateNum <= 0 || dateNum > lastDateNum) return false;
          return dateNum;
        })
      })
      return daysArr;
    },
  },
};
</script>

<style scoped>
.month {
  table-layout: fixed;
  border-spacing: 0;
  border-collapse: collapse;
  max-width: 600px;
  width: 100%;
}

.dayName {
  margin-bottom: 1rem;
}

.dayBox {
  position: relative;
}

.hasBorder {
  border: 2px solid black;
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
