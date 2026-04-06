"use client";
import { useState, useEffect } from "react";

export default function StudentForm({ student, onClose, onSubmit, mode }) {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (isEdit && student) {
      setFormData({
        first_name: student.first_name || "",
        last_name: student.last_name || "",
        email: student.email || "",
        phone: student.phone || "",
        gender: student.gender || "",
      });
      if (student.profile_pic) {
        setPreviewUrl(student.profile_pic);
      }
    }
  }, [student, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("first_name", formData.first_name);
    payload.append("last_name", formData.last_name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("gender", formData.gender);
    if (profilePic) {
      payload.append("profile_pic", profilePic);
    }
    onSubmit(payload, student?._id);
  };

  return (
    /* Backdrop overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        className="glass-card w-full max-w-md mx-4 p-6 animate-fade-in"
        style={{ background: "var(--card-bg, #1a1a2e)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-bold"
            style={{
              background: "linear-gradient(135deg, #fff, #c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {isEdit ? "Edit Student" : "Add Student"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-gray-300">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 outline-none focus:border-indigo-500 transition-colors"
                placeholder="First name"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 outline-none focus:border-indigo-500 transition-colors"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 outline-none focus:border-indigo-500 transition-colors"
              placeholder="Enter email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 outline-none focus:border-indigo-500 transition-colors"
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-gray-900 text-gray-500">
                Select gender
              </option>
              <option value="male" className="bg-gray-900 text-white">
                Male
              </option>
              <option value="female" className="bg-gray-900 text-white">
                Female
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">
              Profile Picture
            </label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/40"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-500/20 file:text-indigo-300 hover:file:bg-indigo-500/30 file:cursor-pointer cursor-pointer"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all cursor-pointer"
            >
              {isEdit ? "Update" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
