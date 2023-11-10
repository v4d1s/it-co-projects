import axios from "axios";
import router from "@/router";

export const projectListModule = {
    state: () => ({
        projects: [],
        checkedProjects: new Set
    }),
    mutations: {
        setProjects(state, projects) {
            state.projects = projects
        },
        setCheckedProjects(state, checkedProject) {
            state.checkedProjects.add(checkedProject)
        },
        deleteCheckedProject(state, checkedProject) {
            state.checkedProjects.delete(checkedProject)
        }
    },
    actions: {
        newCheckedProject({state, commit}, checkedProject) {
            if (state.checkedProjects.has(checkedProject)) {
                commit('deleteCheckedProject', checkedProject)
            } else {
                commit('setCheckedProjects', checkedProject)
            }
        },
        async getProjects({commit}) {
            const projects = await axios({
                url: 'http://localhost:3000/projects/',
                method: 'get',
            })
            if (projects.data.length > 0) {
                commit('setProjects', projects)
            }
        },
        async deleteProjects({state}) {
            if(confirm("Действительно удалить выбранные проекты?")) {
                for (let id of state.checkedProjects) {
                    await axios({
                        url: 'http://localhost:3000/project/' + id,
                        method: 'delete',
                    })
                }
                router.go('/')
            }
        }
    },
    namespaced: true
}