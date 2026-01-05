import { useEffect, useState } from "react";
import API from "../../utils/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [friends, setFriends] = useState([]);
  const [form, setForm] = useState({
    name: "",
    profession: "",
    message: "",
  });
  const [image, setImage] = useState(null);

  // Load all friends
  const loadFriends = async () => {
    const res = await API.get("/friends");
    setFriends(res.data);
  };

  useEffect(() => {
    loadFriends();
  }, []);

  // Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle friend add (WITH IMAGE)
  const addFriend = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("profession", form.profession);
    formData.append("message", form.message);
    formData.append("image", image); // 🔥 VERY IMPORTANT

    await API.post("/friends", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setForm({ name: "", profession: "", message: "" });
    setImage(null);
    loadFriends();
  };

  // Delete friend
  const deleteFriend = async (id) => {
    await API.delete(`/friends/${id}`);
    loadFriends();
  };

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      {/* Add Friend Form */}
      <form className="friend-form" onSubmit={addFriend}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="profession"
          placeholder="Profession"
          value={form.profession}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        {/* 📸 Image Input */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">Add Friend</button>
      </form>

      {/* Manage Friends */}
      <h2>Manage Friends</h2>

      <ul className="admin-friend-list">
        {friends.map((f) => (
          <li key={f._id}>
            {f.name} – {f.profession}
            <button onClick={() => deleteFriend(f._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
