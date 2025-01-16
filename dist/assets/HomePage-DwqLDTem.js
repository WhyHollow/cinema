import{d as j,r as c,c as x,o as S,a as o,b as s,w as _,v as k,F as f,e as b,f as w,g as N,h as a,t as g,i as y,j as T,k as z,n as D}from"./index-CtqZGGt3.js";import{u as O,O as $,S as F}from"./optimized-image-C4RLPalC.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const G={class:"flex justify-between items-center mb-6"},U={class:"flex items-center gap-4"},E=["value"],H={key:0,class:"text-center text-gray-500 mt-10"},I={key:1,class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"},L={class:"h-64 bg-gray-100 flex items-center justify-center"},q={class:"p-4 flex flex-col flex-grow"},A={class:"text-lg font-bold truncate"},J={key:0},K={class:"flex-grow"},Q={key:2,class:"flex justify-center mt-8 items-center space-x-2"},R=["disabled"],W=["onClick"],X=["disabled"],se=j({__name:"HomePage",setup(Y){const n=O(),P=c([{id:0,name:"Екшн"},{id:1,name:"Пригоди"},{id:2,name:"Комедія"},{id:3,name:"Драма"},{id:4,name:"Хорор"},{id:5,name:"Вестерн"}]),i=c(null),v=c("name"),l=c(1),h=x(()=>n.totalPages),m=x(()=>i.value!==null?n.getMoviesByPage.filter(t=>t.genre===i.value):n.getMoviesByPage),M=async()=>{await n.fetchMovies()},p=r=>{l.value=r,n.currentPage=r},C=()=>{l.value=1,n.currentPage=1},V=()=>{n.sortMovies(v.value)};S(()=>{M()});const B=x(()=>{const r=[],d=Math.max(l.value-Math.floor(2.5),1),e=Math.min(d+5-1,h.value);for(let u=d;u<=e;u++)r.push(u);return r});return(r,t)=>{const d=N("router-link");return a(),o("div",null,[s("div",G,[t[6]||(t[6]=s("h2",{class:"text-2xl font-bold"},"Фільми",-1)),s("div",U,[_(s("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>i.value=e),onChange:C,class:"border rounded px-2 py-1"},[t[4]||(t[4]=s("option",{value:null},"Всі жанри",-1)),(a(!0),o(f,null,b(P.value,e=>(a(),o("option",{key:e.id,value:e.id},g(e.name),9,E))),128))],544),[[k,i.value]]),_(s("select",{"onUpdate:modelValue":t[1]||(t[1]=e=>v.value=e),onChange:V,class:"border rounded px-2 py-1"},t[5]||(t[5]=[s("option",{value:"name"},"А-Я",-1),s("option",{value:"rating"},"По рейтингу",-1)]),544),[[k,v.value]])])]),m.value.length===0?(a(),o("div",H,t[7]||(t[7]=[s("p",{class:"text-lg"},"Фільми відсутні за заданими критеріями.",-1)]))):(a(),o("div",I,[(a(!0),o(f,null,b(m.value,e=>(a(),o("div",{key:e.id,class:"border rounded overflow-hidden shadow-md hover:shadow-lg transition flex flex-col"},[s("div",L,[y($,{url:e.image,alt:e.name,class:"h-full w-full object-contain"},null,8,["url","alt"])]),s("div",q,[s("h3",A,g(e.name),1),e.rating!==0?(a(),o("p",J,"Рейтинг: "+g(e.rating),1)):w("",!0),s("div",K,[y(F,{rawText:e.description,class:"line-clamp-3"},null,8,["rawText"])]),y(d,{to:{name:"MovieDetails",params:{id:e.id}},class:"bg-blue-500 text-white px-3 py-1 rounded mt-4 hover:bg-blue-600 self-start"},{default:T(()=>t[8]||(t[8]=[z(" Детальніше ")])),_:2},1032,["to"])])]))),128))])),m.value.length!==0?(a(),o("div",Q,[s("button",{disabled:l.value===1,class:"px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200",onClick:t[2]||(t[2]=e=>p(l.value-1))}," Назад ",8,R),(a(!0),o(f,null,b(B.value,e=>(a(),o("button",{key:e,class:D(["px-4 py-2 border rounded hover:bg-gray-200",l.value===e?"bg-blue-500 text-white":""]),onClick:u=>p(e)},g(e),11,W))),128)),s("button",{disabled:l.value===h.value,class:"px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200",onClick:t[3]||(t[3]=e=>p(l.value+1))}," Далі ",8,X)])):w("",!0)])}}});export{se as default};
