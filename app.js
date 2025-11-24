const API = "https://YOUR_BACKEND_URL_HERE/seats";

const seats = [
  {id:'A1',floor:1},{id:'A2',floor:1},{id:'A3',floor:1},{id:'A4',floor:1},
  {id:'B1',floor:2},{id:'B2',floor:2},{id:'B3',floor:2},{id:'B4',floor:2},
];

function renderSeats() {
  document.getElementById('floor1').innerHTML = '';
  document.getElementById('floor2').innerHTML = '';

  seats.forEach(s=>{
    const div=document.createElement('div');
    div.className = "seat " + s.status;
    div.innerHTML = s.id;
    document.getElementById(s.floor===1?'floor1':'floor2').appendChild(div);
  });

  document.getElementById('total').innerText = seats.length;
  document.getElementById('free').innerText = seats.filter(x=>x.status==="free").length;
  document.getElementById('occ').innerText = seats.filter(x=>x.status==="occupied").length;
  document.getElementById('res').innerText = seats.filter(x=>x.status==="reserved").length;
}

async function updateSeats(){
  try{
    const r = await fetch(API);
    const d = await r.json();
    seats.forEach(s => s.status = d[s.id] || "free");
    renderSeats();
  }catch(e){ console.log("Offline") }
}

setInterval(updateSeats, 1000);
renderSeats();

const books = [
  {title:"Digital Electronics",author:"Mano",floor:"1",section:"A",shelf:"1"},
  {title:"Signals",author:"Oppenheim",floor:"1",section:"A",shelf:"2"},
];

function searchBooks(){
  const k = document.getElementById("searchBook").value.toLowerCase();
  const tb = document.getElementById("bookTable");
  tb.innerHTML = "";
  books.filter(b=>b.title.toLowerCase().includes(k) || b.author.toLowerCase().includes(k))
  .forEach(b=>{
    tb.innerHTML += `<tr><td>${b.title}</td><td>${b.author}</td><td>${b.floor}</td><td>${b.section}</td><td>${b.shelf}</td></tr>`;
  });
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
}
