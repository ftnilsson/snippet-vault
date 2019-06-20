import { createAction } from 'redux-starter-kit';

export default {
  getSnippetsRequest: createAction('getsnippets/request'),
  getSnippetsSuccess: createAction('getsnippets/success'), 
  saveSnippetsRequest: createAction('savesnippets/request'),
  saveSnippetsSuccess: createAction('savesnippets/success'), 
  updateSnippetRequest: createAction('updatesnippet/request'),
  updateSnippetSuccess: createAction('updatesnippet/success'),
  deleteSnippetRequest: createAction('deletesnippet/request'),
  deleteSnippetSuccess: createAction('deletesnippet/success') 
};