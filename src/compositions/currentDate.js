import router from "@/router";

import { computed } from "vue";

export function getCurrentDate() {
  const params = computed(() => router.currentRoute.value.params);

  const selectedDate = computed(() => {
    const [m, d, y] = params.value.mmddyy.split("-") || [];
    return new Date(y, m, d);
  });

  const dateToString = computed(() => selectedDate.value.toDateString());

  const m = computed(() => selectedDate.value.getMonth());
  const yy = computed(() => selectedDate.value.getFullYear());
  const d = computed(() => selectedDate.value.getDate());

  return {
    dateToString,
    selectedDate,
    m,
    yy,
    d
  };
}
