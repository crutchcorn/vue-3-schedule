<template>
  <div class="container">
    <div class="beegContain">
      <div class="topContain">
      <h1 class="monthName">{{ displayMonth }}</h1>
      <div class="monthControllers">
        <button @click="setToToday()" class="btnBase todayBtn">Today</button>
        <div class="prevNextButtons btnBase">
          <button @click="subMonth()" class="prevButton noButton">
            <Arrow></Arrow>
            <span class="screen-reader-text">Previous Month</span>
          </button>
          <div class="btnDivider"></div>
          <button @click="addMonth()" class="noButton">
            <Arrow></Arrow>
            <span class="screen-reader-text">Next Month</span>
          </button>
        </div>
        </div>
      </div>
      <Month
        :currentMonth="currentMonth"
        @upmonth="addMonth()"
        @downmonth="subMonth()"
        @upyear="addYear()"
        @downyear="subYear()"
      />
    </div>
    <div class="scheduleView">
      <router-view />
    </div>
  </div>
</template>

<script>
import Month from "../components/Month.vue";
import Arrow from "../components/Arrow.vue";
import dayjs from "dayjs";

export default {
  name: "MonthView",
  components: {
    Month,
    Arrow,
  },
  data() {
    return {
      initialMonth: dayjs().date(1),
      currentMonth: dayjs().date(1),
    };
  },
  computed: {
    displayMonth() {
      return this.currentMonth.format("MMMM, YYYY");
    },
  },
  methods: {
    setToToday() {
      this.currentMonth = this.initialMonth.clone();
    },
    subMonth() {
      this.currentMonth = this.currentMonth.subtract(1, "month");
    },
    addMonth() {
      this.currentMonth = this.currentMonth.add(1, "month");
    },
    subYear() {
      this.currentMonth = this.currentMonth.subtract(1, "year");
    },
    addYear() {
      this.currentMonth = this.currentMonth.add(1, "year");
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  overflow: hidden;
  min-height: 100%;
  flex-grow: 1;
  flex-shrink: 0;
}

.beegContain {
  flex-shrink: 1;
  width: 600px;
  flex-grow: 1;
  /* To hide the box shadow when flex wrap */
  margin-left: -2px;
  margin-right: -2px;
  box-shadow: 1px 0px 0px rgba(0, 128, 106, 0.32),
    0px 1px 0px rgba(0, 128, 106, 0.32);
}

.topContain {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 16px;
  max-width: 600px;
  margin: 72px auto 0;
  padding-left: 16px;
  padding-right: 16px;
}

.monthName {
  font-weight: 800;
  font-size: 2.5rem;
  margin: 0;
}

.monthControllers {
  margin-left: auto;
  display: flex;
  height: fit-content;
  justify-content: flex-end;
}

.scheduleView {
  flex-grow: 1;
  min-width: 300px;
}

.todayBtn {
  font-weight: 600;
  color: #008A73;
  padding-left: 16px;
  padding-right: 16px;
}

.noButton {
  background: none;
  border: none;
}

.prevNextButtons {
  margin-left: 4px;
  display: inline-flex;
  align-items: center;
}

.prevButton svg {
  transform: rotate(180deg);
}

.btnDivider {
  width: 1px;
  height: calc(100% - 24px);
  margin-top: 16px;
  margin-bottom: 16px;
  background: rgba(0, 128, 106, 0.32);
  display: inline-block;
}

.prevNextButtons button {
  cursor: pointer;
  padding: 8px;
}

.prevNextButtons button svg {
  color: #008A73
}
</style>
