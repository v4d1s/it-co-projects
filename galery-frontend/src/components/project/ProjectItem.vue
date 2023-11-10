<template>
  <div v-if="project.id !== undefined">
    <h1>Редактирование проекта</h1>
    <div style="display: inline-flex">
      <h3 style="padding-top: 12px">Название: </h3>
      <input v-model="project.name" class="input" style="height: 30px; width: 500px" placeholder="Название">
    </div>
    <div>
      <h3>Фото</h3>
      <img class="image" :src="'http://localhost:3000/' + project.image" alt="">
    </div>
    <div>
      <label for="newImage">Новое изображение: </label>
      <input id="newImage" style="margin-top: 15px" type="file" accept="image/*" @change=uploadImage($event)>
      <label for="deleteImage">Удалить текущее изображение</label>
      <input id="deleteImage" type="checkbox" v-model="deleteImage">
    </div>
    <h3>Описание</h3>
    <textarea
        v-model="project.text"
        class="input"
        placeholder="Описание проекта"
    ></textarea>
    <div>
      <a href="/projects">
        <button class="btn">Отменить</button>
      </a>
      <button class="btn-edit" @click="editProject(
          {id: project.id, deleteImage: deleteImage, image: this.newImage})">Готово</button>
      <button class="btn-delete" @click="deleteProject(project.id)">Удалить</button>
    </div>
  </div>
  <div v-else>
    <h2 class="errorMessage">Проект с ID: '{{ $route.params.id }}' отсутствует!</h2>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      deleteImage: false,
      newImage: null
    }
  },
  methods: {
    ...mapActions({
      getProject: 'projectItem/getProject',
      editProject: 'projectItem/editProject',
      deleteProject: "projectItem/deleteProject"
    }),
    uploadImage($event) {
      this.newImage = $event.target.files[0]
    }
  },
  computed: {
    ...mapState({
      project: state => state.projectItem.project,
    }),
  },
  mounted() {
    this.getProject(this.$route.params.id)
  },
};
</script>

<style scoped>
.errorMessage {
  color: red;
}
.image {
  max-width: 800px;
}
.input {
  resize: none;
  height: 500px;
  width: 100%;
  border-color: darkgreen;
  border-width: 5px;
  padding: 10px 15px;
  margin-top: 15px;
}
.btn {
  margin: 15px;
  align-self: flex-end;
  padding: 15px 10px;
  background: none;
  color: darkgreen;
  border-color: rgb(128, 128, 128);
  border-radius: 20px;
}
.btn-edit {
  margin: 15px;
  align-self: flex-end;
  padding: 15px 10px;
  background: none;
  color: darkgreen;
  border-color: yellow;
  border-radius: 20px;
}
.btn-delete {
  margin: 15px;
  align-self: flex-end;
  padding: 15px 10px;
  background: none;
  color: darkgreen;
  border-color: red;
  border-radius: 20px;
}
</style>