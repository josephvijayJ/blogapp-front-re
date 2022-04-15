import './Post.css';
import { Link } from 'react-router-dom';

function Post({ post }) {
  return (

    <>

      

      <section class="text-center">
        <div className="col-lg-4 col-md-12 mb-6 card post">
          {post.photo &&
            <Link to={`/post/${post._id}`}
              className="link">
              <img className="postImg"
                src={post.photo}
                alt="" />
            </Link>}

          <div className="postInfo">
            <div className="postCats">
              {post.categories.map((c) => (
                <span className="postCat">{c.name}</span>
              ))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
              <span className="postTitle">{post.title}</span>
            </Link>

            <span className="postDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          <p className="postDesc">{post.desc}</p>
        </div>
      </section>

    </>
  )
}

export default Post