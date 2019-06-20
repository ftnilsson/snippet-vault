import { createReducer } from "redux-starter-kit";
import { informationToast } from "../../components/Toaster";
import commandActions from "./actions";

const initialState = {
  copyCommand: false
};

const copyReducer = createReducer(initialState, {
  [commandActions.copySnippetsSuccess]: (state) => {
    const nextState = state;    
    informationToast(10,"COPIED");
  }
});

export default copyReducer;
