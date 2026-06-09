import{n as e,r as t,t as n}from"./nav-Gk-iqoRD.js";import{t as r}from"./projects-CsecO6BL.js";var i=`/`;e(),n(),t();function a(){let e=new URLSearchParams(window.location.search).get(`id`);return r.find(t=>t.id===e)??null}function o(){let e=a();if(!e){document.getElementById(`project-title`).textContent=`404 nie istnieje`;return}document.getElementById(`project-title`).textContent=e.title,document.getElementById(`project-description`).textContent=e.body,document.getElementById(`crumb`).innerHTML=`
    <ol>
      <li><a href="${i}index.html">Home</a></li>
      <li><a href="#">${e.category.toUpperCase()}</a></li>
      <li>${e.title}</li>
    </ol>
  `;let t=document.getElementById(`project-highlight`);if(e.images.length>0){let n=document.createElement(`img`);n.src=e.images[0],n.alt=e.description,t.appendChild(n)}let n=document.getElementById(`project-images`);e.images.forEach(t=>{let r=document.createElement(`img`);r.src=t,r.alt=e.title,n.appendChild(r)}),document.getElementById(`project-info`).innerHTML+=`
    <p>${e.year}</p>
  `}o();