import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Start, NotFound, Snippets} from '../pages';

function Routes(props) {
  return (
    <Switch>     
        <Route exact path="/" component={Start} />      
        <Route exact path="/snippets" component={Snippets} />   
        <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;