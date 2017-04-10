//refactored with lodash

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
    title: { 
        type: 'input',
        label: 'Title for Post'
    },
    categories: { 
        type: 'input',
        label: 'Enter some categories for this post'
    },
    content: { 
        type: 'textarea',
        label: 'Post contents'
    }
};
         

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

  renderField(fieldConfig, field) {
       const fieldHelper = this.props.fields[field];
        
        return (
              <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
                    <label>{fieldConfig.label}</label>
                    <fieldConfig.type type="text" className="form-control" {...fieldHelper}/>
                    <div className="text-help">
                        {fieldHelper.touched ? fieldHelper.error : ''}
                    </div>
                </div>

        );
    }
    
    render() {
       //non ES6 way would be const title = this.props.field.title for example
        const { handleSubmit } = this.props;
        
        return (
             <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post!</h3>
                
                 {_.map(FIELDS, this.renderField.bind(this))}
            
                <button type="submit" className="btn btn-primary">Submit</button>

                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    
    _.each(FIELDS, (type, field) => {
        if (!values[field]) {
            errors[field] = `Enter a ${field}`;
        }
    });
    
    return errors;
}

// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first argument is form configuration, second is mapStateToProps,
// third is mapDispatchToProps

//lodash helper '.keys' to retrieve FIELDS constant/object

export default reduxForm({ 
    form: 'PostsNewForm',
    fields: _.keys(FIELDS),
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