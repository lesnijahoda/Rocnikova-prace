//Win + . protože jsem ?????? a zapomínám na zkratku pro ikonky :)

import { heroPanel, upgrades } from "./heroes.js";
import {checkAchievements,} from "./achievments.js";
import { abilities } from "./abilities.js";
import { renderBackgroundPanel } from "./backgrounds.js";

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
      enemy.respawn();
      updateGoldBar();
    }
  }

  // Automatický DPS útok
  applyDPS(enemy) {
    if (enemy.hp > 0) {
      enemy.hp -= this.dps;
      if (enemy.hp <= 0) {
        enemy.hp = 0;
        this.gold += enemy.goldReward;
        enemy.respawn();
        updateGoldBar();
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
    
  }
}

// 🎮 Vytvoření hrdiny a nepřítele
export const hero = new Hero("Warrior", 10);
export const enemy = new Enemy("Strom", 50, 20);

// 🖼️ Načtení obrázku nepřítele
const slimeImage = new Image();
slimeImage.src = "./res/img/enemies/firetree.png";

// 🖱️ Zpracování kliknutí na canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.style.userSelect = "none";
canvas.style.webkitUserSelect = "none";
canvas.style.msUserSelect = "none";
canvas.style.mozUserSelect = "none";

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  //console.log(x + "X");
  //console.log(y + "Y");

  if (x >= 120 && x <= 280 && y >= 10 && y <= 170) {
    if (enemy.hp > 0) {
      console.log("aaa");
      hero.attack(enemy);
      updateGameInfo();
    }
  }
});

// 🔄 Funkce pro aktualizaci herních informací
export function updateGameInfo() {
  document.getElementById(
    "heroInfo"
  ).innerText = `DPS: ${hero.dps}, Damage: ${hero.damage}`;
  document.getElementById(
    "enemyInfo"
  ).innerText = `Nepřítel: ${enemy.name}, Úroveň: ${enemy.level}, HP: ${enemy.hp}/${enemy.maxHp}`;
  updateGoldBar();
  checkAchievements();
}

// 🎨 Hlavní smyčka pro vykreslování hry
function gameLoop() {
  draw();
  hero.applyDPS(enemy);
  updateGameInfo();
  requestAnimationFrame(gameLoop);
  checkAchievements();
}

// 🖌️ Kreslení na canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Umístění nepřítele na pravou polovinu obrazovky
  const enemyPositionX = 100; // Posunout na pravou polovinu obrazovky
  const enemyPositionY = 0; // Vertikálně ve středu obrazovky

  // Pokud je obrázek nepřítele načtený, zobrazím ho
  if (slimeImage.complete) {
    ctx.drawImage(slimeImage, enemyPositionX, enemyPositionY, 200, 200); // Umístíme nepřítele na pravou polovinu obrazovky
  } else {
    ctx.fillStyle = "red";
    ctx.fillRect(enemyPositionX, enemyPositionY, 200, 200); // Placeholder, pokud obrázek není načten
  }

  // Zobrazení životy nepřítele
  const healthBarWidth = 300 * (enemy.hp / enemy.maxHp);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "gray";
  ctx.beginPath();
  ctx.roundRect(enemyPositionX - 50, enemyPositionY + 220, 300, 30, 10); // Pozice pro health bar pod nepřítelem
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.roundRect(
    enemyPositionX - 50,
    enemyPositionY + 220,
    healthBarWidth,
    30,
    10
  ); // Zdraví bude vyplněné podle aktuální hodnoty HP
  ctx.fill();

  // Zobrazení dalších informací (např. level, zlato)
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(
    `HP: ${enemy.hp}/${enemy.maxHp}`,
    enemyPositionX - 50,
    enemyPositionY + 270
  );
  ctx.fillText(
    `Level: ${enemy.level}`,
    enemyPositionX - 50,
    enemyPositionY + 300
  );
  ctx.fillText(
    `Nepřítel: ${enemy.name}`,
    enemyPositionX - 50,
    enemyPositionY + 330
  );
}

// 💥 Vykreslení panelu pro nákup hrdinů
heroPanel.innerHTML = "";
upgrades.forEach((upgrade) => {
  upgrade.level = upgrade.level || 0; // Inicializace levelu, pokud neexistuje

  const heroRow = document.createElement("div");
  heroRow.className = "hero-row";

  const heroImage = document.createElement("img");
  heroImage.src = upgrade.image;
  heroImage.style.width = "120px";
  heroImage.style.height = "120px";
  heroImage.style.marginRight = "50px";

  const heroInfo = document.createElement("div");
  heroInfo.innerHTML = `<strong>${upgrade.name}</strong><br>Level: <span id="level-${upgrade.name}">${upgrade.level}</span>`;
  heroInfo.style.color = "white";
  heroInfo.style.marginRight = "20px";

  const heroButton = document.createElement("button");
  heroButton.className = "hero-button";
  heroButton.innerHTML = `<span>Najmout</span><br><span>- ${upgrade.cost} zlata</span>`;

  heroButton.addEventListener("click", () => {
    if (hero.gold >= upgrade.cost) {
      hero.gold -= upgrade.cost;
      upgrade.level++;
      upgrade.isClickMultiplier
        ? (hero.damage += 35)
        : (hero.dps += upgrade.dps);
      upgrade.cost = Math.floor(upgrade.cost * 1.5);
      document.getElementById(`level-${upgrade.name}`).textContent = upgrade.level;
      heroButton.innerHTML = `<span>Najmout</span><br><span>- ${upgrade.cost} zlata</span>`;
      updateGameInfo();
    }
  });

  heroRow.appendChild(heroImage);
  heroRow.appendChild(heroInfo);
  heroRow.appendChild(heroButton);
  heroPanel.appendChild(heroRow);
});

const goldBar = document.createElement("div");
goldBar.id = "goldBar";
document.body.appendChild(goldBar);

//  Funkce pro aktualizaci gold baru
export function updateGoldBar() {
  goldBar.innerText = `💰 Zlato: ${hero.gold}`;
}

const backgroundPanel = document.getElementById('backgroundPanel');
const toggleBackgroundButton = document.getElementById('toggleBackgroundPanel');

toggleBackgroundButton.addEventListener('click', () => {
  backgroundPanel.classList.toggle('open');
});

renderBackgroundPanel(hero);
updateGameInfo();
gameLoop();

  
 
  