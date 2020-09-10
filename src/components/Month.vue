<template>
  <table class="month">
    <thead>
      <tr>
        <th class="dayName">
          <span class="screen-reader-text">Sunday</span>
          <span aria-hidden="true">Sun</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Monday</span>
          <span aria-hidden="true">Mon</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Tuesday</span>
          <span aria-hidden="true">Tue</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Wednesday</span>
          <span aria-hidden="true">Wed</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Thursday</span>
          <span aria-hidden="true">Thurs</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Friday</span>
          <span aria-hidden="true">Fri</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Saturday</span>
          <span aria-hidden="true">Sat</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week, weekI) in weekArr" :key="weekI" @keydown="arrowKeyHandler($event)">
        <td
          v-for="(day, dayI) in week"
          :key="dayI"
          class="dayBox"
          :class="{currMonth: day.currMonth}"
          :isToday="isCurrDay = day.currMonth && sameMonthAsToday && currentDay === day.number"
          :isSelected="isSelected = day.currMonth && sameMonthAsSelected && day.number === selectedDay"
          :aria-hidden="!day.currMonth"
          :aria-selected="isSelected"
          v-bind="isCurrDay ? {'aria-current': 'date'} : {}"
        >
          <button
            @click="openDay(day.number)"
            class="day"
            :tabindex="day.currMonth ? 1 : -1"
            :data-daynum="day.currMonth ? day.number : -1"
            :data-dayofweek="day.currMonth ? dayI : -1"
            :data-week="day.currMonth ? weekI : -1"
            :class="{currentDay: isCurrDay, selectedDay: isSelected}"
          >
            <span class="screen-reader-text">{{ day.label }}</span>
            <span aria-hidden="true">{{ day.number }}</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getRouteDate } from "@/compositions/routeDate";

export default {
  name: "Month",
  props: ["currentMonth"],
  emits: ["upmonth", "downmonth", "upyear", "downyear"],
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
    arrowKeyHandler(event) {
      const currEl = document.activeElement;
      const dayNum = currEl.dataset.daynum;
      if (!dayNum) return;
      let offset = 0;
      switch (event.code) {
        case "ArrowUp": {
          offset = -7;
          break;
        }
        case "ArrowDown": {
          offset = 7;
          break;
        }
        case "ArrowLeft": {
          offset = -1;
          break;
        }
        case "ArrowRight": {
          offset = 1;
          break;
        }
        case "PageUp": {
          if (event.shiftKey) {
            this.$emit("upyear");
            break;
          }
          this.$emit("upmonth");
          break;
        }
        case "PageDown": {
          if (event.shiftKey) {
            this.$emit("downyear");
            break;
          }
          this.$emit("downmonth");
          break;
        }
        case "Home": {
          const weekNum = currEl.dataset.week;
          const newEl = document.querySelector(
            `[data-week="${weekNum}"][data-dayofweek="0"]`
          );
          if (!newEl) return;
          newEl.focus();
          return;
        }
        case "End": {
          const weekNum = currEl.dataset.week;
          const newEl = document.querySelector(
            `[data-week="${weekNum}"][data-dayofweek="6"]`
          );
          if (!newEl) return;
          newEl.focus();
          return;
        }
        default:
          return;
      }
      // Allow time for new month or new year to render
      this.$nextTick(() => {
        const newEl = document.querySelector(
          `[data-daynum="${Number(dayNum) + offset}"]`
        );
        if (!newEl) return;
        newEl.focus();
      });
    },
  },
  computed: {
    previousMonth() {
      return this.currentMonth.clone().subtract(1, "month");
    },
    nextMonth() {
      return this.currentMonth.clone().add(1, "month");
    },
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
      const lastDateNum = this.currentMonth.daysInMonth();
      const [monthName, year] = this.currentMonth
        .format("MMMM YYYY")
        .split(" ");
      const getDayStr = (day) => `${monthName} ${day}, ${year}`;

      const lastMonthLastDateNum = this.previousMonth.daysInMonth();
      const [lastMonthName, lastMonthYear] = this.previousMonth
        .format("MMMM YYYY")
        .split(" ");
      const getPrevStr = (day) => `${lastMonthName} ${day}, ${lastMonthYear}`;


      const [nextMonthName, nextMonthYear] = this.nextMonth
        .format("MMMM YYYY")
        .split(" ");
      const getNextStr = (day) => `${nextMonthName} ${day}, ${nextMonthYear}`;

      const daysArr = Array.from({ length: this.weeksToRender }, (_, weekI) => {
        return Array.from({ length: 7 }, (_, dayI) => {
          const dayIndex = weekI * 7 + dayI;
          const dateNum = dayIndex - this.startDayOfWeek;
          if (dateNum <= 0) {
            const newDateNum = dateNum + lastMonthLastDateNum;
            return {
              currMonth: false,
              label: getPrevStr(newDateNum),
              number: newDateNum,
            };
          }
          if (dateNum > lastDateNum) {
            const newDateNum = dateNum - lastDateNum;
            return {
              currMonth: false,
              label: getNextStr(newDateNum),
              number: newDateNum,
            };
          }
          return {
            currMonth: true,
            label: getDayStr(dateNum),
            number: dateNum,
          };
        });
      });
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

.currMonth {
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
