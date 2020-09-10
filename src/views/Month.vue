<template>
  <h1>{{ displayMonth }}</h1>
  <div class="container">
    <div class="beegContain">
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
  max-width: 960px;
  margin: 0 auto;
}

.monthControllers {
  display: flex;
  justify-content: flex-end;
}

.beegContain {
  flex-shrink: 1;
  width: 600px;
  flex-grow: 1;
}

.scheduleView {
  flex-grow: 1;
  min-width: 300px;
}
</style>
