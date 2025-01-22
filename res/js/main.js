//Win + . protože jsem ?????? a zapomínám na zkratku pro ikonky :) 
// Hlavní soubor pro hru Clicker Heroes

// 🧱 Základní objekty hrdiny a nepřítele
class Hero {
  constructor(name, damage) {
    this.name = name;
    this.damage = damage;
    this.gold = 0;
    this.dps = 0; // Damage per second
  }

  // Útok na nepřítele
  attack(enemy) {
    enemy.hp -= this.damage;
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      this.gold += enemy.goldReward;
      console.log(`${enemy.name} poražen! Získáno zlato: ${this.gold}`);
      enemy.respawn();
    }
  }

  // Automatický DPS útok
  applyDPS(enemy) {
    if (enemy.hp > 0) {
      enemy.hp -= this.dps;
      if (enemy.hp <= 0) {
        enemy.hp = 0;
        this.gold += enemy.goldReward;
        console.log(`${enemy.name} poražen! Získáno zlato: ${this.gold}`);
        enemy.respawn();
      }
    }
  }
}

class Enemy {
  constructor(name, hp, goldReward) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.goldReward = goldReward;
    this.level = 1;
  }

  // Znovuzrození nepřítele s vyšší úrovní
  respawn() {
    this.level++;
    this.maxHp = Math.floor(this.maxHp * 1.5);
    this.hp = this.maxHp;
    this.goldReward = Math.floor(this.goldReward * 1.5);
    console.log(`${this.name} je zpět na úrovni ${this.level} s ${this.hp} HP!`);
  }
}

// 🎮 Vytvoření hrdiny a nepřítele
const hero = new Hero('Warrior', 10);
const enemy = new Enemy('Goblin', 50, 20);

// 🖼️ Načtení obrázku slizu
const slimeImage = new Image();
slimeImage.src = './res/img/sorcerer.png'; // Cesta k obrázku

// 🖱️ Zpracování kliknutí na canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Zabránění označování textu na canvasu 
canvas.style.userSelect = 'none';
canvas.style.webkitUserSelect = 'none';
canvas.style.msUserSelect = 'none';
canvas.style.mozUserSelect = 'none';



canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Kontrola kliknutí na červený čtverec (nepřítel)
  if (x >= 350 && x <= 550 && y >= 150 && y <= 350) {
    if (enemy.hp > 0) {
      hero.attack(enemy);
      updateGameInfo();
    }
  }

  
});

// 🔄 Funkce pro aktualizaci herních informací
function updateGameInfo() {
  document.getElementById('heroInfo').innerText = `Hrdina: ${hero.name}, Zlato: ${hero.gold}, DPS: ${hero.dps}, Damage: ${hero.damage}`;
  document.getElementById('enemyInfo').innerText = `Nepřítel: ${enemy.name}, Úroveň: ${enemy.level}, HP: ${enemy.hp}/${enemy.maxHp}`;
}

// 🎨 Hlavní smyčka pro vykreslování hry
function gameLoop() {
  draw();
  hero.applyDPS(enemy); // DPS útok
  updateGameInfo();
  requestAnimationFrame(gameLoop);
}

// 🖌️ Kreslení na canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Kreslení nepřítele (vpravo)
  if (slimeImage.complete) {
    ctx.drawImage(slimeImage, 350, 150, 200, 200); // Obrázek slizu
  } else {
    ctx.fillStyle = 'red';
    ctx.fillRect(350, 150, 200, 200); // Rezervní čtverec, dokud se obrázek nenačte
  }

  // Kreslení health baru pod nepřítelem
  const healthBarWidth = 300 * (enemy.hp / enemy.maxHp);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'gray';
  ctx.beginPath();
  ctx.roundRect(300, 360, 300, 30, 10); // Rámeček
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = 'green';
  ctx.beginPath();
  ctx.roundRect(300, 360, healthBarWidth, 30, 10); // Zdraví
  ctx.fill();

  
}

// 🏋️ Kreslení hrdinů na levém panelu
const heroPanel = document.getElementById('heroPanel');

const heroImage = new Image();
heroImage.src = './res/img/smrt.png';


// Seznam hrdinů/upgradů
const upgrades = [
  { name: "Slime", cost: 100, dps:35,  image: "./res/img/slime.png", isClickMultiplier: true },
  { name: "Smrtka", cost: 500, dps: 15, image: "./res/img/smrt.png" },
  { name: "Kouzelník", cost: 1000, dps: 100, image: "./res/img/sorcerer.png" },
  { name: "Zeus", cost: 10000, dps: 1000, image: "./res/img/zeus.png" },
  { name: "Poseidon", cost: 100000, dps: 10000, image: "./res/img/poseidon.png" },
  { name: "Hades", cost: 1000000, dps: 100000, image: "./res/img/hades.png" },
  
];

// Generování řádků
heroPanel.innerHTML = ""; // Vymažeme obsah panelu, pokud je potřeba

upgrades.forEach((upgrade, index) => {
  const heroRow = document.createElement("div");
  heroRow.className = "hero-row";

  const heroImage = document.createElement("img");
  heroImage.src = upgrade.image;
  heroImage.style.width = "120px";
  heroImage.style.height = "120px";
  heroImage.style.marginRight = "10px";

  const heroButton = document.createElement("button");
  heroButton.textContent = `Najmout (-${upgrade.cost} zlata)`;
  heroButton.style.marginRight = "10px";

  // Logika nákupu
  heroButton.addEventListener("click", () => {
    if (hero.gold >= upgrade.cost) {
      hero.gold -= upgrade.cost;
      if (upgrade.isClickMultiplier) {
        hero.damage += 35; // Zvýšení damage za kliknutí
      } else {
        hero.dps += upgrade.dps;
      }
      upgrade.cost = Math.floor(upgrade.cost * 1.5); // Zvýšení ceny
      heroButton.textContent = `Najmout (-${upgrade.cost} zlata)`; // Aktualizace tlačítka
      updateGameInfo();
      console.log(`${upgrade.name} najat! `);
    } else {
      console.log("Nedostatek zlata!");
    }
  });

  heroRow.appendChild(heroImage);
  heroRow.appendChild(heroButton);
  heroRow.appendChild(document.createTextNode(`${upgrade.name} (Damage: ${upgrade.dps || "Boost Kliknutí"})`));
  heroPanel.appendChild(heroRow);
});

// Spuštění hry
updateGameInfo();
gameLoop();


  
 
  