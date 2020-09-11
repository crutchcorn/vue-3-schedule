<template>
  <div class="container">
    <div class="beegContain">
      <h1>{{ displayMonth }}</h1>
      <div class="monthControllers">
        <button @click="setToToday()">Today</button>
        <button @click="subMonth()">Up</button>
        <button @click="addMonth()">Down</button>
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
    <router-view/>
    </div>
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
      initialMonth: dayjs().date(1),
      currentMonth: dayjs().date(1),
    };
  },
  computed: {
    displayMonth() {
      return this.currentMonth.format('MMMM, YYYY');
    }
  },
  methods: {
    setToToday() {
      this.currentMonth = this.initialMonth.clone();
    },
    subMonth() {
      this.currentMonth = this.currentMonth.subtract(1, 'month');
    },
    addMonth() {
      this.currentMonth = this.currentMonth.add(1, 'month');
    },
    subYear() {
      this.currentMonth = this.currentMonth.subtract(1, 'year');
    },
    addYear() {
      this.currentMonth = this.currentMonth.add(1, 'year');
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 960px;
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
  box-shadow: 1px 0px 0px rgba(0, 128, 106, 0.32), 0px 1px 0px rgba(0, 128, 106, 0.32);
}

.monthControllers {
  display: flex;
  justify-content: flex-end;
}

.scheduleView {
  flex-grow: 1;
  min-width: 300px;
}
</style>
