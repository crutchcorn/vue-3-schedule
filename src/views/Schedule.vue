<template>
  <div>
    <p>{{dateToString}}</p>
    <ul>
      <li v-for="(event, i) in eventsArr" :key="i">
        {{event}}
      </li>
    </ul>
    <button @click="modalOpen = true">Add Event</button>
  </div>

  <ScheduleCreateDialog :modalOpen="modalOpen" :selectedDate="selectedDate" @close="closeDialog()" />
</template>

<script>
import { getRouteDate } from "@/compositions/routeDate";
import ScheduleCreateDialog from '@/components/ScheduleCreateDialog';
import { watchEffect, ref } from "vue";

const getDateInfo = d => {
  const dayKey = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  const oldJSON = localStorage.getItem(dayKey)
  if (!oldJSON) {
    return []
  }
  return JSON.parse(oldJSON);
}

export default {
  name: "Schedule",
  components: {
    ScheduleCreateDialog
  },
  setup() {
    const { dateToString, selectedDate } = getRouteDate();

    const eventsArr = ref([])

    watchEffect(() => {
      if (!selectedDate.value) {
        eventsArr.value = [];
        return;
      }
      const d = selectedDate.value;
      eventsArr.value = getDateInfo(d);
    })

    return {
      dateToString,
      selectedDate,
      eventsArr
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
    }
  }
};
</script>

<style scoped>
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
