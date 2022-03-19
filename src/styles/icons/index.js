import {
    faBars, faBook, faBookmark, faColumns, faEnvelopeOpenText,
    faEye,
    faFile,
    faFileAlt, faFileAudio,
    faFileCode,
    faFolder, faHome, faImage, faImages, faLightbulb, faPlus, faSearch, faTextHeight,
    faTimes,
    faUserSecret, faVideo
} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(
    faUserSecret,
    faTimes,
    faBars,
    faEye,
    faFolder,
    faFile,
    faFileAlt,
    faFileCode,
    faImage,
    faVideo,
    faColumns,
    faFileAudio,
    faTextHeight,
    faEnvelopeOpenText,
    faLightbulb,
    faHome,
    faSearch,
    faBook,
    faBookmark,
    faImages,
    faPlus
)

export default function (app) {
    app.component("FontAwesomeIcon", FontAwesomeIcon)
}
