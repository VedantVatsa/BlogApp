import{j as e}from"./index-DpffgWme.js";import{e as S,u as j,b as i}from"./vendor-CGTneAp3.js";import{B}from"./BlogPost-DHPnxQNY.js";import{N as u}from"./Navbar-HHhRbH_r.js";const O=({isAuthenticated:n,userRole:f,userEmail:p,setIsAuthenticated:d})=>{const{id:a}=S(),m=j(),[c,g]=i.useState(null),[x,b]=i.useState(!0);i.useEffect(()=>{(async()=>{try{b(!0);const t=JSON.parse(localStorage.getItem("blogs")||"[]").find(o=>o.id===a);t&&g(t)}catch(r){console.error("Error loading blog:",r)}finally{b(!1)}})()},[a]);const y=s=>{if(window.confirm("Are you sure you want to delete this blog post?"))try{const t=JSON.parse(localStorage.getItem("blogs")||"[]").filter(o=>o.id!==s);localStorage.setItem("blogs",JSON.stringify(t)),m("/blogs")}catch(r){console.error("Error deleting blog:",r)}},h=(s,r)=>{try{const o=JSON.parse(localStorage.getItem("blogs")||"[]").map(l=>l.id===a?{...l,...r}:l);localStorage.setItem("blogs",JSON.stringify(o)),g(l=>({...l,...r}))}catch(t){console.error("Error updating blog:",t)}},N=s=>{try{const t=JSON.parse(localStorage.getItem("blogs")||"[]").map(o=>o.id===a?{...o,comments:[...o.comments||[],s]}:o);localStorage.setItem("blogs",JSON.stringify(t)),g(o=>({...o,comments:[...o.comments||[],s]}))}catch(r){console.error("Error adding comment:",r)}};return x?e.jsx("div",{className:"min-h-screen flex items-center justify-center",children:e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"})}):c?e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",children:[e.jsx(u,{isAuthenticated:n,setIsAuthenticated:d}),e.jsx("div",{className:"container mx-auto px-4 pt-24",children:e.jsx(B,{...c,isAuthenticated:n,userRole:f,currentUser:p,onDelete:()=>y(c.id),onEdit:h,onAddComment:N})})]}):e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",children:[e.jsx(u,{isAuthenticated:n,setIsAuthenticated:d}),e.jsx("div",{className:"container mx-auto px-4 pt-24",children:e.jsxs("div",{className:"glass-effect rounded-xl p-8 text-center",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-700 mb-4",children:"Blog post not found"}),e.jsx("button",{onClick:()=>m("/blogs"),className:"px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors",children:"Return to Blogs"})]})})]})};export{O as default};
//# sourceMappingURL=SingleBlogPost-EtrFkQz-.js.map
