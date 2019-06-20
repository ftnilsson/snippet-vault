import { configureStore } from 'redux-starter-kit';
import reductor from 'reduce-reducers';
// reducers
import snippetsReducer from './services/snippets/reducer';
import searchReducer from './services/search/reducer';
import commandReducer from './services/commands/reducer';

const store = configureStore({
  reducer: {
    commands: commandReducer,
    snippets: reductor(snippetsReducer,searchReducer)
  },  
  devTools: process.env.NODE_ENV !== 'production'
});

export { store };
