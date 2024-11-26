"use strict";(self.webpackChunkwibe_test=self.webpackChunkwibe_test||[]).push([[566],{5566:(e,t,i)=>{i.r(t),i.d(t,{default:()=>p});var n=i(3229),o=i(9950),l=i(9139),r=i(5616),a=i(1678),s=i(4414);const c=(0,a.Ay)(n.P.div)`
  position: absolute;
  /* left: 50%; */
  top: ${e=>e.click?"0":`-${e.theme.navHeight}`};
  transition: all 0.3s ease;
  /* transform: translateX(-50%); */
  z-index: 6;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  
  @media (max-width: 40em) {
    top: ${e=>e.click?"0":"calc(-50vh - 4rem)"};

  }
`,d=a.Ay.li`
  background-color: ${e=>`rgba(${e.theme.textRgba},0.7)`};
  color: ${e=>e.theme.body};
  width: 15rem;
  height: 2.5rem;

  border: none;
  outline: none;

  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  font-size: ${e=>e.theme.fontmd};
  font-weight: 600;

  /* border-end-start-radius: 50%; */

  /* border-end-end-radius: 50%; */

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease;

  @media (max-width: 40em) {
    width: 10rem;
    height: 2rem;

  }
`,h=(0,a.Ay)(n.P.ul)`
  position: relative;
  height: ${e=>e.theme.navHeight};
  background-color: ${e=>e.theme.body};
  color: ${e=>e.theme.text};
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;

  width: 100%;
  padding: 0 10rem;

  @media (max-width: 40em) {
    flex-direction:column;
    padding:2rem 0;
    height: 50vh;
  }
`,m=(0,a.Ay)(n.P.li)`
  text-transform: uppercase;
  color: ${e=>e.theme.text};

  @media (max-width: 40em) {
    flex-direction:column;
    padding:0.5rem 0;

  }
`,p=()=>{const[e,t]=(0,o.useState)(!1),{scroll:i}=(0,l.g7)(),n=n=>{let o=document.querySelector(n);t(!e),i.scrollTo(o,{offset:"-100",duration:"500",easing:[.25,0,.35,1]})};return(0,s.jsx)(c,{click:+e,initial:{y:"-100%"},animate:{y:0},transition:{duration:.5,delay:0},children:(0,s.jsxs)(h,{drag:"y",dragConstraints:{top:0,bottom:70},dragElastic:.05,dragSnapToOrigin:!0,children:[(0,s.jsx)(d,{onClick:()=>t(!e),children:(0,s.jsx)("span",{children:"MENU"})}),(0,s.jsxs)(m,{whileHover:{scale:1.1,y:-5},whileTap:{scale:.9,y:0},onClick:()=>n("#home"),children:[" ",(0,s.jsx)(r.N_,{to:"/",children:"Home"})]}),(0,s.jsx)(m,{whileHover:{scale:1.1,y:-5},whileTap:{scale:.9,y:0},onClick:()=>n(".about"),children:(0,s.jsx)(r.N_,{to:"/",children:"about"})}),(0,s.jsx)(m,{whileHover:{scale:1.1,y:-5},whileTap:{scale:.9,y:0},onClick:()=>n("#shop"),children:(0,s.jsx)(r.N_,{to:"/",children:"shop"})}),(0,s.jsx)(m,{whileHover:{scale:1.1,y:-5},whileTap:{scale:.9,y:0},onClick:()=>window.location.href="/register&login.html",children:(0,s.jsx)(r.N_,{to:"#",children:"Register&Login"})}),(0,s.jsx)(m,{whileHover:{scale:1.1,y:-5},whileTap:{scale:.9,y:0},onClick:()=>window.location.href="/bongjini.html",children:(0,s.jsx)(r.N_,{to:"#",children:"Bongjini"})})]})})}}}]);