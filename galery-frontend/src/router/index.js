import { createRouter, createWebHistory } from "vue-router";
import ProjectPage from "@/pages/project/ProjectPage.vue";
import ErrorPage from "@/pages/other/ErrorPage.vue";
import NewProjectPage from "@/pages/project/NewProjectPage.vue";
import ProjectsPage from "@/pages/project/ProjectsPage.vue";

const routes = [
  {
    path: '/projects',
    name: 'home',
    component: ProjectsPage
  },
  {
    path: '/project',
    name: 'newProject',
    component: NewProjectPage
  },
  {
    path: '/project/:id',
    name: 'project',
    component: ProjectPage
  },
  {
    path: '/error/404',
    component: ErrorPage
  },
  {
    path: "/",
    redirect: "/projects"
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/error/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
