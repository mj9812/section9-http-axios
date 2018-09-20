import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component
{
    selected = null;
    oldSelected = null;

    componentDidUpdate()
    {
        if ((!this.oldSelected && this.selected.id) || 
        (this.oldSelected && this.selected.id !== this.oldSelected.id)) {
            this.getDataFromServer();
        }
    }

    getDataFromServer()
    {
        this.oldSelected = this.selected;
        axios.get('https://jsonplaceholder.typicode.com/posts/' + this.selected.id)
            .then(response =>
            {
                this.selected = response.data;
                this.setState({});
            });
    }

    render()
    {
        if (!this.props.selectedPost) {
            this.selected = { title: 'Please Choose a Post!',
                body: 'Please Select a Post from above list and Click on it!' };
        }
        else {
            if (!this.selected.id || (this.selected.id !== this.props.selectedPost.id)) {
                this.selected = this.props.selectedPost;
            }
        }
        return (
            <div className="FullPost" >
                <h1>{this.selected.title}</h1>
                <p>{this.selected.body}</p>
                <div className="Edit">
                    <button className="Delete">Delete</button>
                </div>
            </div>
        );
    }
}

export default FullPost;