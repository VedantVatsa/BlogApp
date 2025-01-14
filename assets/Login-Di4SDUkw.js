import{j as e}from"./index-DpffgWme.js";import{u as g,b as m,L as w}from"./vendor-CGTneAp3.js";const y=({setIsAuthenticated:u,setUserRole:i,setUserEmail:p})=>{const x=g(),[r,o]=m.useState({}),[s,h]=m.useState({email:"",password:""}),n=a=>{const{name:t,value:d}=a.target;h(l=>({...l,[t]:d}))},b=()=>{const a={};return s.email||(a.email="Email is required"),s.password||(a.password="Password is required"),s.password.length<6&&(a.password="Password must be at least 6 characters"),a},f=a=>{a.preventDefault();const t=b();if(Object.keys(t).length===0){const l=JSON.parse(localStorage.getItem("users")||"[]").find(c=>c.email===s.email&&c.password===s.password);l?(s.email==="admin@gmail.com"?i("admin"):i(l.role),p(s.email),u(!0),x("/")):o({auth:"Invalid email or password"})}else o(t)};return e.jsxs("div",{className:"min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900",children:[e.jsxs("div",{className:"absolute inset-0 w-full h-full",children:[e.jsx("div",{className:"absolute animate-blob mix-blend-multiply filter blur-xl opacity-70 bg-purple-300 top-0 -left-4 w-72 h-72 rounded-full"}),e.jsx("div",{className:"absolute animate-blob animation-delay-2000 mix-blend-multiply filter blur-xl opacity-70 bg-yellow-300 -bottom-8 left-20 w-72 h-72 rounded-full"}),e.jsx("div",{className:"absolute animate-blob animation-delay-4000 mix-blend-multiply filter blur-xl opacity-70 bg-pink-300 top-0 right-20 w-72 h-72 rounded-full"})]}),e.jsx("div",{className:"w-full max-w-md relative",children:e.jsxs("div",{className:"backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20",children:[e.jsxs("div",{className:"mb-8 text-center",children:[e.jsx("h2",{className:"text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent",children:"Welcome Back"}),e.jsx("p",{className:"text-gray-300 mt-2",children:"Sign in to continue"})]}),e.jsxs("form",{onSubmit:f,className:"space-y-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"email",name:"email",value:s.email,onChange:n,className:"w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400",placeholder:"Email address",required:!0}),r.email&&e.jsx("p",{className:"text-red-400 text-sm mt-1",children:r.email})]}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"password",name:"password",value:s.password,onChange:n,className:"w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400",placeholder:"Password",required:!0}),r.password&&e.jsx("p",{className:"text-red-400 text-sm mt-1",children:r.password})]})]}),r.auth&&e.jsx("div",{className:"p-3 bg-red-500/10 border border-red-500/20 rounded-lg",children:e.jsx("p",{className:"text-red-400 text-sm text-center",children:r.auth})}),e.jsx("button",{className:"w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transform transition-all hover:-translate-y-0.5 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900",children:"Sign In"})]}),e.jsx("div",{className:"mt-6 text-center",children:e.jsxs(w,{to:"/signup",className:"text-gray-300 hover:text-white transition-colors",children:["Don't have an account? ",e.jsx("span",{className:"underline",children:"Sign up"})]})})]})})]})};export{y as default};
