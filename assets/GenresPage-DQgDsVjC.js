import{d,r as l,a as o,b as e,F as c,e as m,s as g,g as p,h as a,t as i,i as _,j as u,k as f}from"./index-gdxI5n-t.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";const h={class:"min-h-screen pb-8"},b={class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"},v={class:"h-40 bg-gray-100 flex items-center justify-center"},j=["src","alt"],w={class:"p-4 flex flex-col flex-grow"},k={class:"text-lg font-bold truncate"},y={class:"text-gray-600 text-sm mt-2 flex-grow"},B=d({__name:"GenresPage",setup(C){g();const r=l([{id:0,name:"Екшн",description:"Напружені сцени, вибухи та екшн у кожному кадрі.",image:"/images/action.jpg"},{id:1,name:"Пригоди",description:"Відкрийте для себе нові світи та незабутні подорожі.",image:"/images/adventure.jpg"},{id:2,name:"Комедія",description:"Сміх, радість та гумор у кожній історії.",image:"/images/comedy.jpg"},{id:3,name:"Драма",description:"Глибокі емоції та незабутні моменти.",image:"/images/drama.jpg"},{id:4,name:"Хорор",description:"Страх і напруження, що залишають вас у захваті.",image:"/images/horror.jpg"},{id:5,name:"Вестерн",description:"Розповіді про ковбоїв, пустелі та Дикий Захід.",image:"/images/western.jpg"}]);return(N,t)=>{const n=p("router-link");return a(),o("div",h,[t[1]||(t[1]=e("h1",{class:"text-3xl font-bold text-center mt-6 mb-8"},"Жанри",-1)),e("div",b,[(a(!0),o(c,null,m(r.value,s=>(a(),o("div",{key:s.id,class:"border rounded overflow-hidden shadow-md hover:shadow-lg transition flex flex-col"},[e("div",v,[e("img",{src:s.image,alt:s.name,class:"h-full w-full object-cover"},null,8,j)]),e("div",w,[e("h2",k,i(s.name),1),e("p",y,i(s.description),1),_(n,{to:{name:"Home",params:{id:s.id}},class:"bg-blue-500 text-white px-3 py-1 rounded mt-4 hover:bg-blue-600 self-start inline-block text-center"},{default:u(()=>t[0]||(t[0]=[f(" Переглянути ")])),_:2},1032,["to"])])]))),128))])])}}}),G=x(B,[["__scopeId","data-v-d34a3510"]]);export{G as default};
