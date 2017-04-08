import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    
    static contextTypes= {
        router: PropTypes.object
    }
    
    onSubmit(props){
        this.props.createPost(props)
        .then(() => {  
            //blog post has been created - navigate user back to index
            //navigate by calling this.context.router.push with
            //the new path to navigate to.
            
            this.context.router.push('/');
        });
    }
    
    render() {
        //non ES6 way would be const title = this.props.field.title for example
        const { fields: { title, categories, content }, handleSubmit } = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post!</h3>
                
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title}/>
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                
                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories}/>
                     <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>
            
                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content}/>
                     <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>
            
                <button type="submit" className="btn btn-primary">Submit</button>

                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.title) {
        errors.title = 'Enter a title';
    }
    
    if (!values.categories) {
        errors.categories = 'Enter the categories';
    }
    
    if (!values.content) {
        errors.content = 'Enter some content';
    }
    
    return errors;
}

// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first argument is form configuration, second is mapStateToProps,
// third is mapDispatchToProps

export default reduxForm({ 
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);



//Some notes: 

//when a user types something in...record it on application state
//THIS HAPPENS BEHINDS THE SCENES in redux-form!
// state === {
// form: {
//     PostsNewForm: {
//         title:'...',!
//         categories: '...',
//         content:'...'
//     }
// }
//}