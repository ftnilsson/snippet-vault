import copy from 'copy-to-clipboard';
import commandActions from "./actions";
import { store } from "../../store";
const ipcRenderer = window.require("electron").ipcRenderer;

window.onload = () => {
    ipcRenderer.on("copy-reply", (event, args) => {
        store.dispatch(commandActions.copySnippetsSuccess());
    });
};
const copyToClipboard = (data) => {
    copy(data);
    store.dispatch(commandActions.copySnippetsSuccess());
}

const minimize = () => {
    ipcRenderer.send("minimize-app");
}

const maximize = () => {
    ipcRenderer.send("maximize-app");
}
const close = () => {
    ipcRenderer.send("close-app");
}
export { copyToClipboard, minimize, maximize, close };
