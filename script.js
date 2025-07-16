
let saldo = parseInt(localStorage.getItem("saldo")) || 0;
let historico = JSON.parse(localStorage.getItem("historico")) || {};

document.getElementById("saldo").textContent = saldo;

function girar() {
  if (saldo <= 0) return alert("Sem giros!");
  saldo--;
  document.getElementById("saldo").textContent = saldo;
  localStorage.setItem("saldo", saldo);

  const emojis = ['🐘','🦒','🦈','🐩','🐱','🪐','🦈🦈🦈','🪼','🕷','🧪','🧂'];
  const roletas = document.querySelectorAll('.roleta');
  let resultado = [];
  roletas.forEach((r) => {
    let e = emojis[Math.floor(Math.random() * emojis.length)];
    r.textContent = e;
    resultado.push(e);
  });

  if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
    alert("🎉 Você ganhou: " + resultado[0]);
    historico[resultado[0]] = (historico[resultado[0]] || 0) + 1;
    localStorage.setItem("historico", JSON.stringify(historico));
  }
}

function abrirDeposito() {
  document.getElementById("deposito").style.display = "block";
}

async function depositar(valor) {
  const res = await fetch('/api/create-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: valor, userId: 'abc123xyz789' })
  });
  const data = await res.json();
  if (data.init_point) {
    window.location.href = data.init_point;
  } else {
    alert("Erro ao gerar pagamento.");
  }
}

function sacarTudo() {
  const roblox = prompt("Nome no Roblox:");
  const celular = prompt("Número de celular:");
  const premios = Object.entries(historico).map(([k,v])=> `${k} x${v}`).join(', ');
  const link = `https://wa.me/5591985627121?text=Usuário: Jogador001%0AID: abc123xyz789%0ARoblox: ${roblox}%0ACelular: ${celular}%0APrêmios: ${premios}`;
  window.open(link, "_blank");
  localStorage.removeItem("historico");
  historico = {};
}

function verHistorico() {
  const hist = Object.entries(historico).map(([k,v])=>`${k} x${v}`).join("<br>") || "Nenhum";
  document.getElementById("historico").innerHTML = "<h3>📜 Histórico</h3>" + hist;
}
