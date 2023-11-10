import axios from "axios";
import router from "@/router";

export const projectFormModule = {
    state: () => ({
        projectData: {
            name: '',
            text: '',
            image: null,
        },
    }),
    mutations: {
        setProjectData(state, projectData) {
            state.projectData.name = projectData.name
            state.projectData.text = projectData.text
            state.projectData.image = projectData.image
        }
    },
    actions: {
        async createProject({state, commit}, file) {
            if (state.projectData.name.trim() === '') {
                return
            }
            await axios({
                url: 'http://localhost:3000/project',
                method: 'post',
                data: {
                    name: state.projectData.name,
                    text: state.projectData.text,
                    image: file,
                },
                headers: {'Content-Type': 'multipart/form-data'}
            })
            commit('setProjectData', {name: '', text: '', image: null})
            router.go('/projects')
        },
    },
    namespaced: true
}