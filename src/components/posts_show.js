import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';

class PostsShow extends Component {
    
    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }
    
    //loading text is needed only if the post is null or takes some time to retrieve
    render() {
        const { post } = this.props;
        
        if (!post){
            return <div>Your post is loading...</div>
        }
        return (
            <div>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps,{ fetchPost })(PostsShow);

