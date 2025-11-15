// interface ILoginData {
//   email: string;
//   password: string;
// }

// interface ISignUpData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
// }

// // Sign up api
// export async function signup(data: ISignUpData) {
//   const res = await fetch(
//     "https://todo-app.pioneeralpha.com/api/users/signup/",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );

//   const text = await res.text();

//   if (!res.ok) {
//     let error;
//     try {
//       error = JSON.parse(text);
//     } catch {
//       throw new Error("Something went wrong");
//     }
//     throw error;
//   }

//   return JSON.parse(text);
// }

// // Login api
// export async function login(data: ILoginData) {
//   const res = await fetch("https://todo-app.pioneeralpha.com/api/auth/login/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const text = await res.text(); // read raw content

//   if (!res.ok) {
//     // Try to parse JSON, fallback to raw text
//     let error;
//     try {
//       error = JSON.parse(text);
//     } catch (e) {
//       throw new Error("Server error");
//     }
//     throw new Error(error.detail || "Request failed");
//   }

//   return JSON.parse(text);
// }
