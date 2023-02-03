import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams(); //This is used to get id from req,params
  useEffect(() => {
    getPost(id);
  }, [getPost]);
  return (
    <div className="container">
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
        </Fragment>
      )}
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
