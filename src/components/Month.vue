<template>
  <table class="month">
    <thead>
      <tr>
        <th class="dayName">
          <span class="screen-reader-text">Sunday</span>
          <span aria-hidden="true">S</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Monday</span>
          <span aria-hidden="true">M</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Tuesday</span>
          <span aria-hidden="true">T</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Wednesday</span>
          <span aria-hidden="true">W</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Thursday</span>
          <span aria-hidden="true">T</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Friday</span>
          <span aria-hidden="true">F</span>
        </th>
        <th class="dayName">
          <span class="screen-reader-text">Saturday</span>
          <span aria-hidden="true">S</span>
        </th>
      </tr>
    </thead>
    <tbody @keydown="arrowKeyHandler($event)">
      <tr v-for="(week, weekI) in weekArr" :key="weekI">
        <td
          v-for="(day, dayI) in week"
          :key="dayI"
          class="dayBox"
          :class="{diffMonth: day.diffMonth}"
          :isToday="isCurrDay = !day.diffMonth && sameMonthAsToday && currentDay === day.number"
          :isSelected="isSelected = !day.diffMonth && sameMonthAsSelected && day.number === selectedDay"
          :aria-hidden="day.diffMonth"
          :aria-selected="isSelected"
          v-bind="isCurrDay ? {'aria-current': 'date'} : {}"
        >
          <button
            @click="openDay(day.number, day.diffMonth)"
            class="day"
            :tabindex="!day.diffMonth ? 1 : -1"
            :data-daynum="!day.diffMonth ? day.number : -1"
            :data-dayofweek="!day.diffMonth ? dayI : -1"
            :data-week="!day.diffMonth ? weekI : -1"
            :data-diffmonth="day.diffMonth || 'current'"
            :class="{currentDay: isCurrDay, selectedDay: isSelected}"
          >
          <span class="dayContain">
            <span class="screen-reader-text">{{ day.label }}</span>
            <span aria-hidden="true">{{ day.number }}</span>
            </span>
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
    openDay(date, diffMonth) {
      let thisMonth = this.currentMonth.clone();
      switch (diffMonth) {
        case "prev": {
          thisMonth = thisMonth.subtract(1, "month");
          this.$emit("downmonth");
          break;
        }
        case "next": {
          thisMonth = thisMonth.add(1, "month");
          this.$emit("upmonth");
          break;
        }
        default:
          break;
      }
      const mm = thisMonth.month();
      const yy = thisMonth.year();
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
        const dayToFocus = Number(dayNum) + offset;
        if (dayToFocus < 0) return;
        const newEl = document.querySelector(
          `[data-daynum="${dayToFocus}"]`
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
              diffMonth: "prev",
              label: getPrevStr(newDateNum),
              number: newDateNum,
            };
          }
          if (dateNum > lastDateNum) {
            const newDateNum = dateNum - lastDateNum;
            return {
              diffMonth: "next",
              label: getNextStr(newDateNum),
              number: newDateNum,
            };
          }
          return {
            diffMonth: false,
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
  margin: 0 auto;
}

.dayName {
  border-bottom: 1px solid rgba(0, 128, 106, 0.32);
  color: #1f4741;
  padding-top: 24px;
  padding-bottom: 24px;
  margin-bottom: 1rem;
  font-weight: bold;
}

.dayBox {
  position: relative;
}

.diffMonth {
  color: #1F4741;
  opacity: 0.4;
}

.dayBox:before {
  display: block;
  content: "";
  width: 100%;
  padding-top: 100%;
}

.dayBox:not(.diffMonth) .dayContain {
  color: #008a73;
}

.day {
  position: absolute;
  left: 0;
  top: 0;
  background: none;
  border: none;
  margin: 0 auto;
  font-weight: 600;
  height: 100%;
  width: 100%;
}

.dayContain {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  height: 100%;
  width: 100%;

  border-radius: 50%;

  max-width: 3.5rem;
  max-height: 3.5rem;
  transition: 100ms background ease-in-out, 100ms color ease-in-out;
}

.dayContain > span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.currentDay .dayContain {
  border: 4px solid #008a73;
}

.dayBox:hover .dayContain {
  background: rgba(0, 128, 106, 0.12);
}

.dayBox:not(.diffMonth) .selectedDay .dayContain {
  background: #008a73;
  color: white;
}
</style>
