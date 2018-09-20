import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component
{

    dummy_posts = [];
    selectedPost = null;

    render()
    {
        const posts = this.dummy_posts.map( post =>
        {
            return <Post key={post.id} title={post.title} author={post.userId}
                clicked={() => this.postClicked(post)} />;
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPost={this.selectedPost} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }

    componentDidMount()
    {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(rspnc =>
        {
            this.dummy_posts = rspnc.data.slice(0, 6).map(post =>
            {
                let author = post.id;
                if (!Number.isNaN(author)) 
                    author = (author % 2) === 0 ? 'Johnson' : 'Sanooj';
                post.userId = author;
                post.title = (post.title.length > 13) ? 
                    post.title.slice(0, 13) + '...' : post.title;
                return post;
            });
            this.setState({});
        });
    }

    postClicked = (post) =>
    {
        this.selectedPost = post;
        this.setState({});
    }
}

export default Blog;