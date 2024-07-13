// omit imports
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// omit other imports
import { selectAllPosts, fetchPosts } from './postsSlice'
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from '../../components/misc/Loading';

const PostExcerpt = ({ post }) => {
    return (
      <article className="post-excerpt">
        <h3>{post.title}</h3>
        <div>
          {post.user}
          {post.date}
        </div>
        <p className="post-content">{post.mediaLink.substring(0, 100)}</p>
      </article>
    )
  }

export const PostsLists = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    // omit component contents
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)
    
    useEffect(() => {
      const getToken = async () => {
        try {
          if (postStatus === 'idle') {
            dispatch(fetchPosts())
          }
        } catch (e) {
          console.log(e.message);
        }
      };
      getToken();
    }, [postStatus, dispatch])
    let content

    if (postStatus === 'loading') {
      content = <Loading></Loading>
    } else if (postStatus === 'succeeded') {
      // Sort posts in reverse chronological order by datetime string
      const orderedPosts = posts
        .slice()
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  
      content = orderedPosts.map(post => (
        <PostExcerpt key={post.id} post={post} />
      ))
    } else if (postStatus === 'failed') {
      content = <div>{error}</div>
    }
    return (
        <section className="posts-list">
          <h2>Posts</h2>
          {content}
        </section>
      )
}