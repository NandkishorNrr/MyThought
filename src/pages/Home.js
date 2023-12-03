import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getPosts();
  // }, [deletePost]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
    getPosts();
  }, [postsCollectionRef]); // Include 'postsCollectionRef' in the dependency array
  

  // ... (previous code)

  return (
    <div className="homePage">
      {postLists.map((post) => {
        // Add a check to ensure 'post' is defined
        if (!post || !post.author || !post.author.id) {
          return null; // Skip rendering if 'post' or 'post.author.id' is undefined
        }

        return (
          <div className="post" key={post.id}>
            <h4>@{post.author.name}</h4>
            <hr />
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <div className="reactions">
              <i class="fa-regular fa-heart">like</i>
              <i class="fa-light fa-share">share</i>
              <i class="fa-regular fa-comment">comment</i>
            </div>
          </div>
        );
      })}
    </div>
  );

  // ... (remaining code)
}

export default Home;
