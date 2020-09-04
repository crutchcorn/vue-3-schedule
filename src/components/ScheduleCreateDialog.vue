<template>
  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        <input placeholder="Description of thing do that day" v-model="thingDid"/>
        <div class="buttons">
          <button @click="close()">Cancel</button>
          <button @click="create()">Create</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>

export default {
  name: "ScheduleCreateDialog",
  props: ['modalOpen', 'selectedDate'],
  data() {
    return {
      thingDid: '',
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    create() {
      const d = this.selectedDate;
      const dayKey = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
      const oldJSON = localStorage.getItem(dayKey);
      if (oldJSON) {
        const stuffArr = JSON.parse(oldJSON);
        stuffArr.push(this.thingDid);
        localStorage.setItem(dayKey, JSON.stringify(stuffArr));
      } else {
        localStorage.setItem(dayKey, JSON.stringify([this.thingDid]));
      }
      this.thingDid = '';
      this.$emit('close')
    }
  }
};
</script>

<style scoped>
.buttons {
  margin-top: 2rem;
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  grid-gap: 10px;
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

.modal > div {
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
