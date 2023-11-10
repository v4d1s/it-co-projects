<template>
  <div v-if="projects.length !== 0">
    <div v-for="project in projects.data" v-bind:key="project.id">
      <div class="project" style="overflow-wrap: break-word">
        <div style="display: flex; justify-content: space-between;">
          <div><a :href="'/project/' + project.id">#{{ project.id }}</a></div>
        </div>
        <div><strong>{{ project.name }}</strong></div>
        <input type="checkbox" @change="newCheckedProject(project.id)">
        <label>Удалить</label>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Проекты отсутствуют!</h2>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {
  methods: {
    ...mapActions({
      getProjects: 'projectList/getProjects',
      newCheckedProject: 'projectList/newCheckedProject'
    }),
  },
  computed: {
    ...mapState({
      projects: state => state.projectList.projects,
      checkedProjects: state => state.projectList.checkedProjects,
    }),
  },
  mounted() {
    this.getProjects()
  },
};
</script>

<style scoped>
.project {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: inline-block;
  width: 100%;
}
</style>