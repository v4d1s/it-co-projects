import { createStore } from "vuex";
import { projectItemModule } from "@/store/project/projectItemModule";
import { projectListModule } from "@/store/project/projectListModule";
import { projectFormModule } from "@/store/project/projectFormModule";

export default createStore({
  modules: {
    projectItem: projectItemModule,
    projectList: projectListModule,
    projectForm: projectFormModule,
  }
});
