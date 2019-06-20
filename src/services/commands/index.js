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

}

const maximize = () => {

}
export {copyToClipboard, minimize, maximize};
