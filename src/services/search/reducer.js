import { createReducer } from "redux-starter-kit";
import searchActions from "./actions";

const initialState = {    
};

const searchReducer = createReducer(initialState, {
  [searchActions.searchSnippetsRequest]: (state) => {
    const snippets = state;    
    snippets.searchResult.busy = true;    
  },
  [searchActions.searchSnippetsSuccess]: (state, action) => {
    const snippets = state; 
    snippets.searchResult.data = action.payload.result;
    snippets.searchResult.busy = false;
  }
});

export default searchReducer;
