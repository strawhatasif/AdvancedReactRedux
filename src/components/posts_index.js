import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    
    render () {
      return (
          <div>
            <div className="text-xs-right">
                <Link to="/posts/new" className="btn btn-primary">
                    Add a Post
                </Link>
            </div>
            A list of blog posts!
          </div>
      );
    }
}

//ES6 reminder! { fetchPosts } equivalent to { fetchPosts: fetchPosts }
export default connect(null, { fetchPosts })(PostsIndex);