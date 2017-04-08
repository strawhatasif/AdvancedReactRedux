import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';


//IndexRoute only shows for the index (which is the root or slash)
export default (
    <Route path="/" component={App}>
        <IndexRoute component={PostsIndex} />
        <Route path="posts/new" component={PostsNew} />
    </Route>
);

//A note for nested routes 
//the component for a nested route is a child component
//therefore in App (app.js) we need to specify { this.props.children } 
//in the render method to show the content of the component
