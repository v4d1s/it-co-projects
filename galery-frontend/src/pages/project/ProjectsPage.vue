<template>
  <div>
    <div v-if="projects.length !== 0 && checkedProjects.size !== 0">
      <button class="btn-delete" @click="deleteProjects">Удалить выбранные проекты</button>
    </div>
    <project-list/>
  </div>
</template>

<script>
import ProjectList from "@/components/project/ProjectList.vue";
import {mapActions, mapState} from "vuex";

export default {
  components: {ProjectList},
  computed: {
    ...mapState({
      checkedProjects: state => state.projectList.checkedProjects,
      projects: state => state.projectList.projects,
    }),
  },
  methods: {
    ...mapActions({
      deleteProjects: "projectList/deleteProjects",
    }),
  },
}
</script>

<style scoped>
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