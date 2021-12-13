import {faBars, faEye, faTimes, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faUserSecret, faTimes, faBars, faEye)

export default function (app) {
    app.component("FontAwesomeIcon", FontAwesomeIcon)
}
