// import { useState } from "react";

// // Types
// interface User {
//   id: string;
//   username: string;
//   password: string;
//   role: "teacher" | "student" | "parent";
//   firstName?: string;
//   roll?: string;
// }

// const initialUsers: User[] = [
//   { id: "T-1001", username: "teacher1", password: "teach123", role: "teacher" },
// ];

// export default function SchoolAuth() {
//   const [users, setUsers] = useState<User[]>(initialUsers);
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [studentForm, setStudentForm] = useState({ firstName: "", roll: "" });
//   const [parentForm, setParentForm] = useState({ childName: "", roll: "" });
//   const [message, setMessage] = useState("");

//   // Handle Login
//   const handleLogin = () => {
//     const found = users.find(
//       (u) => u.username === form.username && u.password === form.password
//     );
//     if (found) {
//       setLoggedInUser(found);
//       setMessage(`✅ Welcome ${found.role.toUpperCase()}!`);
//     } else {
//       setMessage("❌ Invalid credentials");
//     }
//   };

//   // Teacher registers student
//   const handleRegisterStudent = () => {
//     if (loggedInUser?.role !== "teacher") {
//       setMessage("⚠️ Only teachers can register students.");
//       return;
//     }
//     const { firstName, roll } = studentForm;
//     if (!firstName || !roll) {
//       setMessage("⚠️ Please enter student first name and roll number.");
//       return;
//     }

//     const username = `${firstName.toLowerCase()}${roll}`;
//     const password = `${firstName.toLowerCase()}@${roll}`;

//     const newUser: User = {
//       id: `S-${roll}`,
//       username,
//       password,
//       role: "student",
//       firstName,
//       roll,
//     };

//     setUsers([...users, newUser]);
//     setMessage(
//       `✅ Student Registered! Username: ${username}, Password: ${password}`
//     );
//     setStudentForm({ firstName: "", roll: "" });
//   };

//   // Teacher registers parent
//   const handleRegisterParent = () => {
//     if (loggedInUser?.role !== "teacher") {
//       setMessage("⚠️ Only teachers can register parents.");
//       return;
//     }
//     const { childName, roll } = parentForm;
//     if (!childName || !roll) {
//       setMessage("⚠️ Please enter child name and roll number.");
//       return;
//     }

//     const username = `${childName.toLowerCase()}Parent${roll}`;
//     const password = `${childName.toLowerCase()}#${roll}`;

//     const newUser: User = {
//       id: `P-${roll}`,
//       username,
//       password,
//       role: "parent",
//     };

//     setUsers([...users, newUser]);
//     setMessage(
//       `✅ Parent Registered! Username: ${username}, Password: ${password}`
//     );
//     setParentForm({ childName: "", roll: "" });
//   };

//   // Logout
//   const handleLogout = () => {
//     setLoggedInUser(null);
//     setForm({ username: "", password: "" });
//     setMessage("");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
//         <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
//           🎓 School Portal
//         </h2>

//         {/* If not logged in → Show login */}
//         {!loggedInUser && (
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Username"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//               className="w-full p-3 border rounded-lg"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full p-3 border rounded-lg"
//             />
//             <button
//               onClick={handleLogin}
//               className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//             >
//               Login
//             </button>
//           </div>
//         )}

//         {/* If teacher logged in → Show register forms */}
//         {loggedInUser?.role === "teacher" && (
//           <div className="space-y-6 mt-6">
//             <h3 className="text-xl font-semibold text-gray-700">
//               👩‍🏫 Teacher Dashboard
//             </h3>

//             {/* Student Registration */}
//             <div className="p-4 border rounded-lg">
//               <h4 className="font-medium mb-2">Register Student</h4>
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={studentForm.firstName}
//                 onChange={(e) =>
//                   setStudentForm({ ...studentForm, firstName: e.target.value })
//                 }
//                 className="w-full p-2 border rounded mb-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Roll Number"
//                 value={studentForm.roll}
//                 onChange={(e) =>
//                   setStudentForm({ ...studentForm, roll: e.target.value })
//                 }
//                 className="w-full p-2 border rounded mb-2"
//               />
//               <button
//                 onClick={handleRegisterStudent}
//                 className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//               >
//                 Register Student
//               </button>
//             </div>

//             {/* Parent Registration */}
//             <div className="p-4 border rounded-lg">
//               <h4 className="font-medium mb-2">Register Parent</h4>
//               <input
//                 type="text"
//                 placeholder="Child First Name"
//                 value={parentForm.childName}
//                 onChange={(e) =>
//                   setParentForm({ ...parentForm, childName: e.target.value })
//                 }
//                 className="w-full p-2 border rounded mb-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Child Roll Number"
//                 value={parentForm.roll}
//                 onChange={(e) =>
//                   setParentForm({ ...parentForm, roll: e.target.value })
//                 }
//                 className="w-full p-2 border rounded mb-2"
//               />
//               <button
//                 onClick={handleRegisterParent}
//                 className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Register Parent
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Logout for any logged in user */}
//         {loggedInUser && (
//           <button
//             onClick={handleLogout}
//             className="mt-6 w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
//           >
//             Logout
//           </button>
//         )}

//         {/* Message */}
//         {message && (
//           <div className="mt-4 p-3 bg-gray-100 text-gray-700 rounded-lg text-sm">
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useForm } from "react-hook-form";

// type RegisterForm = {
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   password: string;
// };

// export default function StudentAuthForm() {
//   const [isLogin, setIsLogin] = useState(true);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<RegisterForm>();

//   const onSubmit = (data: RegisterForm) => {
//     if (isLogin) {
//       console.log("🔑 Student Login", data);
//       alert(`✅ Login successful for ${data.email}`);
//     } else {
//       console.log("📝 Student Registration", data);
//       alert(`✅ Registration successful for ${data.firstName} ${data.lastName}`);
//     }
//     reset();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           {isLogin ? "🔑 Student Login" : "📝 Student Registration"}
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Show firstname/lastname only in Register mode */}
//           {!isLogin && (
//             <>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   {...register("firstName", { required: !isLogin })}
//                   className="w-full p-3 border rounded-lg"
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm mt-1">First name is required</p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   {...register("lastName", { required: !isLogin })}
//                   className="w-full p-3 border rounded-lg"
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm mt-1">Last name is required</p>
//                 )}
//               </div>
//             </>
//           )}

//           {/* Email */}
//           <div>
//             <input
//               type="email"
//               placeholder="Email"
//               {...register("email", { required: true })}
//               className="w-full p-3 border rounded-lg"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">Email is required</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               {...register("password", { required: true, minLength: 6 })}
//               className="w-full p-3 border rounded-lg"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 Password must be at least 6 characters
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//           >
//             {isLogin ? "Login" : "Register"}
//           </button>
//         </form>

//         {/* Toggle */}
//         <p className="mt-4 text-center text-sm text-gray-600">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             {isLogin ? "Register here" : "Login here"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";

type AuthForm = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export default function AuthFormComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"student" | "teacher">("student");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthForm>();

  const onSubmit = (data: AuthForm) => {
    if (isLogin) {
      console.log(`🔑 ${role.toUpperCase()} Login`, data);
      alert(`✅ ${role} login successful for ${data.email}`);
    } else {
      console.log(`📝 ${role.toUpperCase()} Registration`, data);
      alert(
        `✅ ${role} registered: ${
          role === "student"
            ? `${data.firstName} ${data.lastName}`
            : data.email
        }`
      );
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          {isLogin ? "🔑 Login" : "📝 Register"} ({role})
        </h2>

        {/* Role Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-lg border ${
              role === "student"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`px-4 py-2 rounded-lg border ${
              role === "teacher"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Teacher
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Show firstname/lastname only in Register mode & for Student */}
          {!isLogin && role === "student" && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                  className="w-full p-3 border rounded-lg"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    First name is required
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                  className="w-full p-3 border rounded-lg"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    Last name is required
                  </p>
                )}
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
