"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  // ── static data — replace with your fetch logic later ──
  
  const students = [
    {
      id: 1,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=john",
      username: "johndoe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=jane",
      username: "janedoe",
      email: "jane.doe@example.com",
      phone: "+1 (555) 234-5678",
    },
    {
      id: 3,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=alex",
      username: "alexsmith",
      email: "alex.smith@example.com",
      phone: "+1 (555) 345-6789",
    },
    {
      id: 4,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=sara",
      username: "sarawilson",
      email: "sara.wilson@example.com",
      phone: "+1 (555) 456-7890",
    },
    {
      id: 5,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=mike",
      username: "mikebrown",
      email: "mike.brown@example.com",
      phone: "+1 (555) 567-8901",
    },
    {
      id: 6,
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=emma",
      username: "emmaclark",
      email: "emma.clark@example.com",
      phone: "+1 (555) 678-9012",
    },
  ];


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
              alignItems: "center",
              gap: "1.1rem",
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
                {student.username}
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
        ))}
{/* pagination buttons */}
      </div>
        <div className="h-20 w-full flex items-center justify-center gap-4">
          <button disabled={currentPage === 1} onClick={handlePreviousPage} className="bg-gray-800 text-gray-100 px-3 py-1 rounded-xl cursor-pointer hover:bg-gray-700">Previous</button>
          <button disabled={currentPage === data.totalPage} onClick={handleNextPage} className="bg-gray-800 text-gray-100 px-3 py-1 rounded-xl cursor-pointer hover:bg-gray-700">Next</button>
        </div>
    </div>
  );
}
