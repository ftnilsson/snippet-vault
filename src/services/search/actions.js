import { createAction } from 'redux-starter-kit';

export default {  
  searchSnippetsRequest: createAction('searchsnippets/request'),
  searchSnippetsSuccess: createAction('searchsnippets/success')
};