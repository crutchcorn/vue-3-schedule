import router from "@/router";
import dayjs from "dayjs";

import { computed } from "vue";

export function getRouteDate() {
  const params = computed(() => router.currentRoute.value.params);

  const selectedDate = computed(() => {
    if (params.value.mmddyy) {
      const [m, d, y] = params.value.mmddyy.split("-") || [];
      return new Date(y, m, d);
    }
    return null;
  });

  const dateToString = computed(
    () => selectedDate.value && dayjs(selectedDate.value).format("dddd, MMM D")
  );

  const m = computed(() => selectedDate.value && selectedDate.value.getMonth());
  const yy = computed(() => selectedDate.value && selectedDate.value.getFullYear());
  const d = computed(() => selectedDate.value && selectedDate.value.getDate());

  return {
    dateToString,
    selectedDate,
    m,
    yy,
    d,
  };
}
