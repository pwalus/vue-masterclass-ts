import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import type { App } from "vue";
library.add(faPencilAlt);

export default (app: App) => {
  app.component("FontAwesome", FontAwesomeIcon);
};
