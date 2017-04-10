import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
    
    static contextTypes = {
        router: PropTypes.object
    };
    
    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }


    //on a successful delete of a blog post - navigate user back to index
    //navigate by calling this.context.router.push with
    //the new path to navigate to.        
            
    onDeleteClick() {
        this.props.deletePost(this.props.params.id)
            .then(() => { this.context.router.push('/'); });
    }
    
    //loading text is needed only if the post is null or takes some time to retrieve (can be subsituted with a spinner, etc)
    render() {
        const { post } = this.props;
        
        if (!post){
            return <div>Your post is loading...</div>
        }
        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button 
                    onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger pull-xs-right">
            
                    Delete Post
                </button>
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

export default connect(mapStateToProps,{ fetchPost, deletePost })(PostsShow);

