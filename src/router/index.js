import { createRouter, createWebHashHistory } from 'vue-router'
import Month from "../views/Month.vue";
import Schedule from "../views/Schedule.vue";

const routes = [
  {
    path: "/",
    name: "Month",
    component: Month,
      children: [
        {
          path: ':mmddyy',
          component: Schedule
        },
      ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
