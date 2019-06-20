import { createReducer } from "redux-starter-kit";
import snippetsActions from "./actions";

const initialState = {
  busy: false,
  data: [],
  searchResult: { busy: false, data: [] }
};

const snippetsReducer = createReducer(initialState, {
  [snippetsActions.getSnippetsRequest]: state => {
    const snippets = state;
    snippets.busy = true;
  },
  [snippetsActions.getSnippetsSuccess]: (state, action) => {
    const snippets = state;
    snippets.data = action.payload.snippets.snippet;
    snippets.busy = false;
  },
  [snippetsActions.saveSnippetsRequest]: state => {
    const snippets = state;
    snippets.busy = true;
  },
  [snippetsActions.saveSnippetsSuccess]: (state, action) => {
    const snippets = state;
    console.log("reducer save", action.payload.snippets);
    snippets.data = action.payload.snippets;
    snippets.busy = false;
  },
  [snippetsActions.updateSnippetRequest]: state => {
    const snippets = state;
    snippets.busy = true;
  },
  [snippetsActions.updateSnippetSuccess]: (state, action) => {
    const snippets = state;
    const snippetToUpdate = snippets.data.find(
      item => item.id === action.payload.snippet.id
    );
    console.log("snippetToUpdate", snippetToUpdate);
    console.log("payload", action.payload.snippet);
    snippetToUpdate.isFav = action.payload.snippet.isFav;
    snippetToUpdate.name = action.payload.snippet.name;
    snippetToUpdate.data = action.payload.snippet.data;
    snippets.busy = false;

    return snippets;
  },
  [snippetsActions.deleteSnippetRequest]: state => {
    const snippets = state;
    snippets.busy = true;
  },
  [snippetsActions.deleteSnippetSuccess]: (state, action) => {
    const snippets = state;

    const snippetToDelete = snippets.data.find(
      item => item.id === action.payload.snippet.id
    );    
    
    const index =  snippets.data.indexOf(snippetToDelete);

    if(index >= 0){
      console.log("before", snippets);
      snippets.data.splice(index, 1);    
      console.log("after", snippets) ;
    }
    
    snippets.busy = false;
    return snippets;
  }
});

export default snippetsReducer;
