"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentForm from "./components/StudentForm";

export default function Home() {
  // ── static data — replace with your fetch logic later ──

  // ── form modal state ──
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  // ── open edit form ──
  const handleUpdate = (student) => {
    setEditingStudent(student);
    setFormMode("edit");
    setShowForm(true);
  };

  // ── open add form ──
  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormMode("add");
    setShowForm(true);
  };

  // ── form submit handler — add your fetch logic here ──
  const handleFormSubmit = async(formData, id) => {
    if (formMode === "edit") {
      console.log("Update student:", id, formData);
      // TODO: your update fetch logic
    } else {
      console.log("Add student:", formData);
      // TODO: your add fetch logic
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/students',{
        method : 'POST',
        headers : {
          'Authorization' : `Bearer ${token}`
        },
        body : formData
      })
      const data = await response.json()

      if(!response.ok){
        console.log('error adding student', data.message)
      }
      console.log('student added', data)
      
      handleFetchData()
    }
    setShowForm(false);
  };

  const handleDelete = async(id) => {
    // TODO: your delete fetch logic
    console.log("Delete student:", id);
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:5000/api/students/${id}`,{
      method : 'DELETE',
      headers : {
        'Authorization' : `Bearer ${token}`
      }
    })
    const dataRes = await res.json()
    if(!res.ok){
      console.log('could not delete the student', dataRes.message)
    }
    console.log('student deleted', dataRes)
    handleFetchData()
    
  };
  


  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();


  // handle data fetch for students
  const handleFetchData = async (page=currentPage) => {
    const token = localStorage.getItem('token')
    if(!token){
      router.push('/login')
    }
    try{
      const response = await fetch(`http://localhost:5000/api/students?page=${page}&limit=3`,{
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
      const convertData = await response.json();

      if(!response.ok){
        router.push('/login')
      }
      setData(convertData);
      console.log('student data', convertData)

    }catch(err){
      console.log('error fetching student data', err.message)
    }
  }; 
  useEffect(() => {
    handleFetchData();
  }, []);


  const handleNextPage = ()=>{
    setCurrentPage((prev)=>prev + 1)
    handleFetchData(currentPage + 1)

  }

  const handlePreviousPage = ()=>{
    setCurrentPage((prev)=>prev - 1)
    handleFetchData(currentPage - 1)
  }

  return (
    <div
      style={{
        flex: 1,
        padding: "2.5rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.12), transparent 70%)",
          top: "-150px",
          right: "-150px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)",
          bottom: "-120px",
          left: "-100px",
          pointerEvents: "none",
        }}
      />

      {/* Page header */}
      <div
        className="animate-fade-in"
        style={{
          maxWidth: "1100px",
          margin: "0 auto 2rem",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: 700,
                margin: "0 0 0.4rem",
                background: "linear-gradient(135deg, #fff, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Students
            </h1>
            <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.95rem" }}>
              students enrolled : {data.total}
            </p>
          </div>
          <button
            onClick={handleAddStudent}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md shadow-indigo-500/25 cursor-pointer"
          >
            + Add Student
          </button>
        </div>
      </div>

      {/* Student cards grid */}
      <div
        className="animate-fade-in"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {data.students?.map((student, index) => (
          <div
            key={index}
            className="glass-card"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(108,99,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Top row: Avatar + Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  border: "2px solid var(--accent)",
                  boxShadow: "0 0 18px var(--accent-glow)",
                }}
              >
                <img
                  src={student.profile_pic}
                  alt={student.username}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ minWidth: 0, flex: 1 }}>
                <h2
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    margin: "0 0 0.35rem",
                    color: "var(--foreground)",
                  }}
                >
                  {student.first_name + ' ' + student.last_name}
                </h2>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    margin: "0 0 0.2rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✉️ {student.email}
                </p>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                  📞 {student.phone}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <button
                onClick={() => setViewingStudent(student)}
                className="flex-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-green-500/40 text-green-400 hover:bg-green-500/15 transition-colors cursor-pointer"
              >
                View
              </button>
              <button
                onClick={() => handleUpdate(student)}
                className="flex-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-blue-500/40 text-blue-400 hover:bg-blue-500/15 transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student._id)}
                className="flex-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/15 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
{/* pagination buttons */}
      </div>
        <div className="h-20 w-full flex items-center justify-center gap-4">
          <button disabled={currentPage === 1} onClick={handlePreviousPage} className="bg-gray-800/30 border-blue-600/40 border text-blue-400 px-3 py-1 rounded cursor-pointer hover:bg-blue-600/40">Previous</button>
          <button disabled={currentPage === data.totalPage} onClick={handleNextPage} className="bg-gray-800/30 border-blue-600/40 border text-blue-400 px-3 py-1 rounded  cursor-pointer hover:bg-blue-600/40">Next</button>
        </div>
      {/* Student Form Modal */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          mode={formMode}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Student View Modal */}
      {viewingStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          onClick={() => setViewingStudent(null)}
        >
          {/* Modal card */}
          <div
            className="glass-card w-full max-w-sm mx-4 animate-fade-in"
            style={{
              background: "var(--card-bg, #1a1a2e)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner top strip */}
            <div
              style={{
                height: "100px",
                background:
                  "linear-gradient(135deg, rgba(108,99,255,0.4), rgba(139,92,246,0.35))",
                position: "relative",
              }}
            >
              <button
                onClick={() => setViewingStudent(null)}
                className="cursor-pointer"
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "14px",
                  background: "rgba(0,0,0,0.35)",
                  border: "none",
                  color: "#fff",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(0,0,0,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(0,0,0,0.35)")
                }
              >
                &times;
              </button>
            </div>
            
            {/* Avatar */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-48px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid var(--accent)",
                  boxShadow: "0 0 24px var(--accent-glow)",
                  background: "var(--background)",
                }}
              >
                <img
                  src={viewingStudent.profile_pic}
                  alt={viewingStudent.first_name || viewingStudent.username}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
              </div>
            </div>

            {/* Body content */}
            <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  margin: "0.6rem 0 0.15rem",
                  background: "linear-gradient(135deg, #fff, #c4b5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {[viewingStudent.first_name, viewingStudent.last_name].filter(Boolean).join(" ") || viewingStudent.username || "Unknown"}
              </h2>

              {viewingStudent.username && (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    margin: "0 0 1.2rem",
                  }}
                >
                  {viewingStudent.username}
                </p>
              )}

              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                  margin: "0 0 1rem",
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: "👤", label: "Name", value: viewingStudent.first_name + ' ' + viewingStudent.last_na },
                  { icon: "✉️", label: "Email", value: viewingStudent.email },
                  { icon: "📞", label: "Phone", value: viewingStudent.phone },
                  {
                    icon: viewingStudent.gender === "female" ? "♀" : "♂",
                    label: "Gender",
                    value: viewingStudent.gender
                      ? viewingStudent.gender.charAt(0).toUpperCase() + viewingStudent.gender.slice(1)
                      : "—",
                    color: viewingStudent.gender === "female" ? "#f472b6" : "#60a5fa",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "0.75rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.15rem",
                        width: "28px",
                        textAlign: "center",
                        flexShrink: 0,
                        ...(row.color ? { color: row.color } : {}),
                      }}
                    >
                      {row.icon}
                    </span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--text-muted)",
                          margin: 0,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          fontWeight: 600,
                        }}
                      >
                        {row.label}
                      </p>
                      <p
                        style={{
                          fontSize: "0.92rem",
                          color: row.color || "var(--foreground)",
                          margin: "0.1rem 0 0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.value || "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={() => setViewingStudent(null)}
                className="cursor-pointer"
                style={{
                  width: "100%",
                  marginTop: "1.25rem",
                  padding: "0.6rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "var(--text-muted)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--foreground)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
