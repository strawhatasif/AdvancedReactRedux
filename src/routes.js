import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';


//IndexRoute only shows for the index (which is the root or slash)
export default (
    <Route path="/" component={App}>
        <IndexRoute component={PostsIndex} />
        <Route path="posts/new" component={PostsNew} />
        <Route path="posts/:id" component={PostsShow} />
    </Route>
);

//A note for the path "posts/:id" - :id is basically this.props.params.id to find the URL parameter named ID. ReactRouter does this for this automagically

//A note for nested routes 
//the component for a nested route is a child component
//therefore in App (app.js) we need to specify { this.props.children } 
//in the render method to show the content of the component
