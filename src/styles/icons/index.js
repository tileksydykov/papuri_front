import {
    faBars, faColumns, faEnvelopeOpenText,
    faEye,
    faFile,
    faFileAlt, faFileAudio,
    faFileCode,
    faFolder, faImage, faTextHeight,
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
    faEnvelopeOpenText
)

export default function (app) {
    app.component("FontAwesomeIcon", FontAwesomeIcon)
}
