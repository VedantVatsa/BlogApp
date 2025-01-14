import{j as e}from"./index-DpffgWme.js";import{b as s,L as t}from"./vendor-CGTneAp3.js";const p=({isAuthenticated:a,setIsAuthenticated:n})=>{const[o,c]=s.useState(!1),[r,d]=s.useState(!1);s.useEffect(()=>{const i=()=>{c(window.scrollY>20)};return window.addEventListener("scroll",i),()=>window.removeEventListener("scroll",i)},[]);const l=()=>{typeof n=="function"?(n(!1),localStorage.removeItem("isAuthenticated"),localStorage.removeItem("userRole"),localStorage.removeItem("userEmail")):console.warn("setIsAuthenticated is not provided to Navbar component")};return e.jsxs("nav",{className:`fixed w-full z-50 transition-all duration-300 ${o?"bg-white/80 backdrop-blur-lg shadow-lg":"bg-white/60 backdrop-blur-sm"}`,children:[e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex items-center justify-between h-16",children:[e.jsxs(t,{to:"/",className:"flex items-center space-x-3",children:[e.jsx("div",{className:"w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300",children:e.jsx("span",{className:"text-white font-bold text-xl",children:"P"})}),e.jsx("span",{className:`font-display text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent ${o?"opacity-100":"opacity-90"}`,children:"Pensieve"})]}),e.jsxs("div",{className:"hidden md:flex items-center space-x-4",children:[e.jsx(t,{to:"/",className:"nav-link group",children:e.jsxs("span",{className:"relative px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors",children:["Home",e.jsx("span",{className:"absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"})]})}),e.jsx(t,{to:"/blogs",className:"nav-link group",children:e.jsxs("span",{className:"relative px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors",children:["Explore",e.jsx("span",{className:"absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"})]})}),a?e.jsxs("button",{onClick:l,className:"relative inline-flex items-center justify-center group px-6 py-2",children:[e.jsx("span",{className:"absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-accent-500 group-hover:-translate-x-0 group-hover:-translate-y-0"}),e.jsx("span",{className:"absolute inset-0 w-full h-full bg-white border-2 border-accent-500 group-hover:bg-accent-500"}),e.jsx("span",{className:"relative text-accent-500 group-hover:text-white",children:"Logout"})]}):e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(t,{to:"/login",className:"text-gray-700 hover:text-primary-600 transition-colors px-3 py-2",children:"Login"}),e.jsxs(t,{to:"/signup",className:"relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition duration-300 ease-out border-2 border-primary-500 rounded-full group",children:[e.jsx("span",{className:"absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary-500 group-hover:translate-x-0 ease",children:e.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})})}),e.jsx("span",{className:"absolute flex items-center justify-center w-full h-full text-primary-500 transition-all duration-300 transform group-hover:translate-x-full ease",children:"Sign Up"}),e.jsx("span",{className:"relative invisible",children:"Sign Up"})]})]})]}),e.jsx("div",{className:"md:hidden",children:e.jsxs("button",{onClick:()=>d(!r),className:"inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500",children:[e.jsx("span",{className:"sr-only",children:"Open main menu"}),e.jsx("svg",{className:`${r?"hidden":"block"} h-6 w-6`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})}),e.jsx("svg",{className:`${r?"block":"hidden"} h-6 w-6`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})]})})]})}),e.jsx("div",{className:`${r?"block":"hidden"} md:hidden bg-white/90 backdrop-blur-lg`,children:e.jsxs("div",{className:"px-2 pt-2 pb-3 space-y-1 sm:px-3",children:[e.jsx(t,{to:"/",className:"block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50",children:"Home"}),a?e.jsx("button",{onClick:l,className:"w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50",children:"Logout"}):e.jsxs(e.Fragment,{children:[e.jsx(t,{to:"/login",className:"block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50",children:"Login"}),e.jsx(t,{to:"/signup",className:"block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50",children:"Sign Up"})]})]})})]})};export{p as N};
