import './Pasar.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

function Pasar() {
  const suggestions = [
    { img: "/assets/banner.png", name: "Kim_Taehyung" },
    { img: "/assets/banner.png", name: "Nabila" },
    { img: "/assets/banner.png", name: "Sarah_fitryani" },
    { img: "/assets/banner.png", name: "Ardiansyah" },
    { img: "/assets/banner.png", name: "Siti_nurlela" },
  ];

  const posts = [
    {
      profileImage: "/assets/banner.png",
      username: "Siti_nurlela",
      content: "panen buah tomat dan sayur......",
      postImage: "/assets/banner.png",
      likes: "99+",
      comments: "99+",
    },
    {
      profileImage: "/assets/banner.png",
      username: "Nabila",
      content: "Hasil dari lahan yang tidak terlalu luas",
      postImages: ["/assets/banner.png", "/assets/banner.png", "/assets/banner.png", "/assets/banner.png"],
      likes: "99+",
      comments: "99+",
    },
  ];

  return (
    <div className="App">
      <div className="container">
        <main className="main-content">
          <button className="add-button">Tambah +</button>
          {posts.map((post, index) => (
            <div key={index} className="post">
              <div className="post-header">
                <img src={post.profileImage} alt={post.username} />
                <span className="post-username">{post.username}</span>
              </div>
              <p>{post.content}</p>
              {post.postImage && <img src={post.postImage} alt="Post" className="post-image" />}
              {post.postImages && (
                <div className="post-images">
                  {post.postImages.map((image, idx) => (
                    <img key={idx} src={image} alt={`Image ${idx + 1}`} />
                  ))}
                </div>
              )}
              <div className="post-footer">
                <span>👍 {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </main>

        <div className="right-section">
          <div className="user-profile">
            <img src="/assets/banner.png" alt="User Profile" className="profile-picture" />
            <span className="profile-name">Kim_Taehyung</span>
          </div>


          <aside className="side">
            <div className="user-suggestions">
              <h2>Saran</h2>
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <img src={suggestion.img} alt={`Profile ${index + 1}`} />
                  <span>{suggestion.name}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Pasar;
