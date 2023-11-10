import axios from "axios";
import router from "@/router";

export const projectItemModule = {
    state: () => ({
        project: {
            id: '',
            name: '',
            text: '',
            image: '',
        },
    }),
    mutations: {
        setProject(state, project) {
            state.project.id = project.id
            state.project.name = project.name
            state.project.text = project.text
            state.project.image = project.image
        }
    },
    actions: {
        async getProject({commit}, id) {
            const project = await axios({
                url: 'http://localhost:3000/project/' + id,
                method: 'get',
            })
            if (project.data != null) {
                commit('setProject', project.data)
            }
        },
        async deleteProject({commit}, id) {
            await axios({
                url: 'http://localhost:3000/project/' + id,
                method: 'delete',
            })
            commit('setProject', {id: '', name: '', text: '', image: ''})
            await router.push('/')
        },
        async editProject({state, commit}, {id, deleteImage, image}) {
            if (state.project.name.trim() === '') {
                return
            }
            await axios({
                url: 'http://localhost:3000/project/' + id,
                method: 'patch',
                data: {
                    name: state.project.name,
                    text: state.project.text,
                    image: image,
                    deleteImage: deleteImage
                },
                headers: {'Content-Type': 'multipart/form-data'}
            })
            commit('setProjectData', {name: '', text: '', image: ''})
            router.go('/project/' + id)
        },
    },
    namespaced: true
}