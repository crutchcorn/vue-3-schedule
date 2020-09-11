<template>
  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        <h3 class="dialogTitle">Add event</h3>
        <label class="textLabel">
          <span>Item to add to the day's to-do list</span>
          <input class="textInp" placeholder v-model="thingDid" />
        </label>
        <div class="buttons">
          <button class="cancelBtn noButton btnBaseHover" @click="close()">Cancel</button>
          <button class="createBtn btnBase" @click="create()">Create</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "ScheduleCreateDialog",
  props: ["modalOpen", "selectedDate"],
  emits: ["close"],
  data() {
    return {
      thingDid: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
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
      this.thingDid = "";
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.dialogTitle {
  color: #1f4741;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: 24px;
}

.textLabel span {
  opacity: 0.8;
  margin-bottom: 8px;
  display: block;
}

.textInp {
  border: 1px solid #008a73;
  padding: 16px;
  width: calc(100% - 32px);
}

.buttons {
  margin-top: 2rem;
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  grid-gap: 10px;
}

.cancelBtn {
  border-radius: 8px;
}

.cancelBtn,
.createBtn {
  font-weight: 600;
  color: #008A73;
  padding: 16px;
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
  background-color: white;
  width: 80%;
  border-radius: 8px;
  border: 1px solid rgba(0, 128, 106, 0.32);
  max-width: 300px;
  padding: 24px;
}
</style>
