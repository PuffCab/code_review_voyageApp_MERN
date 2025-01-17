import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { CommentsType } from "../types/customTypes";
import { AuthContext } from "../context/AuthContext";
import { formatDate } from "./Functions";
import { ExperiencesContext } from "../context/ExperiencesContext";
import "../styles/Comments.css";
import { IoIosSend } from "react-icons/io";
import Modal from "./Modal";

type CommentsProps = {
  comments: CommentsType[];
  _id: string;
};

function Comments({ comments, _id }: CommentsProps) {
  const { user } = useContext(AuthContext);
  const { experiences, fetchExperiences } = useContext(ExperiencesContext);
  const experienceID = _id;

  const [newComment, setNewComment] = useState({
    _id: "",
    author: {
      _id: "",
      email: "",
      username: "",
      user_image: "",
    },
    date: new Date(),
    message: "",
    experienceID: experienceID,
  });
  const [commments, setUpdatedComments] = useState<CommentsType[] | null>(null);
  const [textInput, setTextInput] = useState("");

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleNewComments = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/comments/experience/${_id}`
      );
      if (response.ok) {
        const data = await response.json();

        setUpdatedComments(data.comments);
        fetchExperiences();
        console.log("updatedComments :>> ", data.comments);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
    }

    if (token) {
      console.log("newComment :>> ", newComment);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const urlencoded = new URLSearchParams();
      urlencoded.append("_id", user!._id);
      urlencoded.append("email", user!.email);
      urlencoded.append("username", user!.username);
      urlencoded.append("user_image", user!.user_image);
      urlencoded.append("message", newComment.message);
      urlencoded.append("experience", experienceID);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };
      try {
        const response = await fetch(
          `http://localhost:5005/api/experiences/experiences/${_id}/comments`,
          requestOptions
        );

        console.log("results for posting comments :>> ", response);

        if (response.ok) {
          const data = await response.json();
          console.log("data for my new comment :>> ", data);
          const newComment: CommentsType = data.comment;
          fetchExperiences();
        } else {
          const data = await response.json();
          console.error("Error posting comment:", data.message);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
    setTextInput("");
  };

  const handleDeleteComment = async (commentId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found");
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      if (window.confirm("Are you SURE you want to delete your comment?")) {
        const response = await fetch(
          `http://localhost:5005/api/experiences/deletecomment/${commentId}`,
          requestOptions
        );

        console.log("Response status:", response.status);

        if (response.ok) {
          console.log("comment deleted successfully!");
          fetchExperiences();
        } else {
          console.log("error with response when deleting comment");
        }
      }
    } catch (error) {
      console.log("error when deleting comment:>> ", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [user, experienceID, comments]);

  return (
    <div className="commentsSection">
      <br />
      <h2>comments:</h2>
      <div className="inputContainer">
        <form onSubmit={handleSubmitComment}>
          <div className="newComment">
            <input
              name="message"
              type="text"
              className="commentInput"
              placeholder="Leave a comment..."
              onChange={handleNewComments}
              value={textInput}
            />
            <button
              style={{ backgroundColor: "white" }}
              className="nakdButton "
              type="submit"
            >
              <IoIosSend />
              submit{" "}
            </button>
          </div>
        </form>
      </div>
      <br />

      {experiences && experiences.length > 0 ? (
        experiences.map((experience) => {
          return (
            <div key={experience._id}>
              {experience._id === experienceID &&
                experience.comments
                  ?.slice()
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((comment) => {
                    return (
                      <div className="singleComment" key={comment._id}>
                        <div className="singleCommentHeader">
                          {comment.author && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                height: "3rem",
                              }}
                            >
                              <img
                                style={{
                                  height: "100%",
                                  borderRadius: "50%",
                                  marginRight: "1rem",
                                }}
                                src={comment.author.user_image}
                                alt={comment.author.username}
                              />
                              <p>{comment.author.username}</p>
                            </div>
                          )}
                          <p>{formatDate(comment.date)}</p>
                        </div>
                        <div className="commentBody">
                          <p className="commentMsg">{comment.message}</p>
                          {user && user.email === comment.author?.email && (
                            <button
                              className="deleteIcon"
                              onClick={() => {
                                handleDeleteComment(comment._id);
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
            </div>
          );
        })
      ) : (
        <p>Be the first one to leave a comment</p>
      )}
      <hr />

      {showLoginModal && (
        <Modal message="You need to log in first!" onClose={handleLoginModal} />
      )}
    </div>
  );
}

export default Comments;
