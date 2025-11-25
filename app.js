// ===========================
// BACKEND API URL
// ===========================
const API = "https://smart-library-backend-1.onrender.com/api/seats";

// ===========================
// SEAT DEFINITIONS (IDs + floors)
// ESP32 sends seat.id as 1..8
// We map them to A1 A2 A3 etc.
// ===========================
const seats = [
  { idNum: 1, id: "A1", floor: 1 },
  { idNum: 2, id: "A2", floor: 1 },
  { idNum: 3, id: "A3", floor: 1 },
  { idNum: 4, id: "A4", floor: 1 },
  { idNum: 5, id: "B1", floor: 2 },
  { idNum: 6, id: "B2", floor: 2 },
  { idNum: 7, id: "B3", floor: 2 },
  { idNum: 8, id: "B4", floor: 2 }
];

// ===========================
// RENDER UI
// ===========================
function renderSeats() {
  document.getElementById("floor1").innerHTML = "";
  document.getElementById("floor2").innerHTML = "";

  seats.forEach(s => {
    const div = document.createElement("div");
    div.className = "seat " + (s.status || "free");
    div.innerHTML = s.id;

    const target = (s.floor === 1) ? "floor1" : "floor2";
    document.getElementById(target).appendChild(div);
  });

  // seat statistics
  document.getElementById("total").innerText = seats.length;
  document.getElementById("free").innerText = seats.filter(x => x.status === "free").length;
  document.getElementById("occ").innerText = seats.filter(x => x.status === "occupied").length;
  document.getElementById("res").innerText = seats.filter(x => x.status === "reserved").length;
}

// ===========================
// FETCH SEAT STATUS FROM BACKEND
// ===========================
async function updateSeats() {
  try {
    const r = await fetch(API);
    const data = await r.json();

    // Data format: { seats: [ {id, status, chair, table}, ... ] }
    const liveSeats = data.seats;

    // update seat objects using ID mapping
    seats.forEach(s => {
      const found = liveSeats.find(x => x.id === s.idNum);
      s.status = found ? found.status : "free";
    });

    renderSeats();
    
  } catch (e) {
    console.log("Backend offline or network error");
  }
}

setInterval(updateSeats, 1000);
updateSeats(); // first load

// ===========================
// BOOK SEARCH FUNCTION
// ===========================
const books = [
  { title:"Digital Electronics", author:"Mano", floor:"1", section:"A", shelf:"1" },
  { title:"Signals", author:"Oppenheim", floor:"1", section:"A", shelf:"2" },
];

function searchBooks(){
  const k = document.getElementById("searchBook").value.toLowerCase();
  const tb = document.getElementById("bookTable");
  tb.innerHTML = "";

  books
    .filter(b => b.title.toLowerCase().includes(k) || b.author.toLowerCase().includes(k))
    .forEach(b => {
      tb.innerHTML += `
        <tr>
          <td>${b.title}</td>
          <td>${b.author}</td>
          <td>${b.floor}</td>
          <td>${b.section}</td>
          <td>${b.shelf}</td>
        </tr>`;
    });
}

// ===========================
// PAGE SWITCHING
// ===========================
function showPage(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
}
