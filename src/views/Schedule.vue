<template>
  <div>
    <div class="topLevel">
      <h2 class="dayStr">{{dateToString}}</h2>
      <button class="btnBase eventBtn" @click="modalOpen = true">Add Event</button>
    </div>
    <ul class="eventList">
      <li v-for="(event, i) in eventsArr" :key="i">{{event}}</li>
    </ul>
  </div>

  <ScheduleCreateDialog :modalOpen="modalOpen" :selectedDate="selectedDate" @close="closeDialog()" />
</template>

<script>
import { getRouteDate } from "@/compositions/routeDate";
import ScheduleCreateDialog from "@/components/ScheduleCreateDialog";
import { watchEffect, ref } from "vue";

const getDateInfo = (d) => {
  const dayKey = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  const oldJSON = localStorage.getItem(dayKey);
  if (!oldJSON) {
    return [];
  }
  return JSON.parse(oldJSON);
};

export default {
  name: "Schedule",
  components: {
    ScheduleCreateDialog,
  },
  setup() {
    const { dateToString, selectedDate } = getRouteDate();

    const eventsArr = ref([]);

    watchEffect(() => {
      if (!selectedDate.value) {
        eventsArr.value = [];
        return;
      }
      const d = selectedDate.value;
      eventsArr.value = getDateInfo(d);
    });

    return {
      dateToString,
      selectedDate,
      eventsArr,
    };
  },
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    closeDialog() {
      this.modalOpen = false;
      const newArr = getDateInfo(this.selectedDate);
      this.eventsArr = newArr;
    },
  },
};
</script>

<style scoped>
.topLevel {
  margin-top: 72px;
  margin-left: 48px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dayStr {
  font-size: 1.75rem;
  color: #1f4741;
  margin: 0;
  font-weight: bold;
  white-space: break-spaces;
  width: 1px;
  flex-grow: 1;
}

.eventBtn {
  padding: 16px 20px;
  height: fit-content;
  color: #008A73;
  font-weight: 600;
}

.eventList {
  margin-top: 24px;
  list-style: none;
  position: relative;
}

.eventList:empty::after {
  padding-left: 16px;
  content: 'No items in the list';
  position: absolute;
}

.eventList li {
  position: relative;
  padding-left: 14px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #1f4741;
  font-weight: 600;
}

.eventList li::before {
  width: 2px;
  height: 1rem;
  background: #008a73;
  border-radius: 2px;
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
