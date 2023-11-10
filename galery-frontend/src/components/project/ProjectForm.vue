<template>
  <form class="form">
    <input v-model="projectData.name" class="input" placeholder="Название">
    <textarea
        v-model="projectData.text"
        class="input"
        placeholder="Описание проекта"
    ></textarea>
    <div style="display: inline-flex;">
      <label style="padding-top: 15px" for="image">Изображение: </label>
      <input id="image" style="margin-top: 15px" type="file" accept="image/*" @change=uploadImage($event)>
    </div>
    <button
        class="btn"
        @click="createProject(this.projectData.image)"
    >Готово</button>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions({
      createProject: "projectForm/createProject",
    }),
    uploadImage($event) {
      this.projectData.image = $event.target.files[0]
    }
  },
  computed: {
    ...mapState({
      projectData: state => state.projectForm.projectData
    })
  },
};
</script>

<style scoped>
.input {
  resize: vertical;
  height: 30px;
  max-height: 300px;
  width: 95%;
  border-color: darkgreen;
  border-width: 5px;
  padding: 10px 15px;
  margin-top: 15px;
}
.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 15px 10px;
  background: none;
  color: darkgreen;
  border-color: darkgreen;
  border-radius: 20px;
}
.form {
  display: flex;
  flex-direction: column;
}
</style>