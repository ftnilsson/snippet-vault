import snippetsActions from "./actions";
import { store } from "../../store";
const ipcRenderer = window.require("electron").ipcRenderer;

const loadSnippets = () => {
  store.dispatch(snippetsActions.getSnippetsRequest());

  new Promise(resolve => {
    ipcRenderer.send("load-snippets");
    ipcRenderer.on("load-reply", (event, result) => {
      store.dispatch(
        snippetsActions.getSnippetsSuccess({
          snippets: result
        })
      );
      resolve(result);

      return result;
    });
  });
};

const saveSnippets = (favourites, snippets) => { 
  store.dispatch(snippetsActions.saveSnippetsRequest());
  const newSnippets = [...favourites, ...snippets];
  new Promise(resolve => {
    ipcRenderer.send("save-snippets", newSnippets);
    ipcRenderer.on("save-reply", (event, result) => {
      store.dispatch(
        snippetsActions.saveSnippetsSuccess({
          snippets: newSnippets
        })
      );
      resolve(result);
    });
  });
};

const saveSnippetsData = (snippets) => {
  store.dispatch(snippetsActions.saveSnippetsRequest());
  const newSnippets = [...snippets];
  new Promise(resolve => {
    ipcRenderer.send("save-snippets", newSnippets);
    ipcRenderer.on("save-reply", (event, result) => {
      store.dispatch(
        snippetsActions.saveSnippetsSuccess({
          snippets: newSnippets
        })
      );
      resolve(result);
    });
  });
};

const updateSnippet = snippet => {
  console.log('update func', snippet);
  store.dispatch(snippetsActions.updateSnippetRequest());

  store.dispatch(
    snippetsActions.updateSnippetSuccess({
      snippet: snippet
    })
  );
  console.log('state',store.getState().snippets.data);
  saveSnippetsData(store.getState().snippets.data);
  return snippet;
};

const deleteSnippet = snippet => {  
  store.dispatch(snippetsActions.deleteSnippetRequest());

  store.dispatch(
    snippetsActions.deleteSnippetSuccess({
      snippet: snippet
    })
  );  
  saveSnippetsData(store.getState().snippets.data);
  return snippet;
};

export {
  loadSnippets,
  saveSnippets,
  updateSnippet,
  deleteSnippet
};
