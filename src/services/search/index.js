import searchActions from "./actions";
import { store } from "../../store";
import Fuse from "fuse.js";

const searchSnippets = (snippets, searchterm) => {
  store.dispatch(searchActions.searchSnippetsRequest());

  var result = [];
  var options = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      {
        name: "name",
        weight: 0.3
      },
      {
        name: "data.__cdata",
        weight: 0.7
      }
    ]
  };
  
  var fuse = new Fuse(snippets, options);
  result = fuse.search(searchterm); 

  store.dispatch(
    searchActions.searchSnippetsSuccess({
      result: result
    })
  );

  return result;
};

export { searchSnippets };
