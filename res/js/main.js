//Win + . protože jsem ?????? a zapomínám na zkratku pro ikonky :)

import { heroPanel, upgrades } from "./heroes.js";
import {checkAchievements,} from "./achievments.js";
import { abilities } from "./abilities.js";
import { renderBackgroundPanel } from "./backgrounds.js";
import { Enemy } from "./enemies.js";
import { setupMultiplierButtons } from "./buy.js";
import { purchaseMultiplier } from "./buy.js";
import * as storage from "./storage.js";   
import { updateAchievementProgress } from "./achievments.js";

async function saveGame() {
  const gameData = {
    gold: hero.gold,
    damage: hero.damage,
    dps: hero.dps,
    clicks: hero.clicks,
    level: hero.level,
    upgrades: upgrades.map(u => ({
      name: u.name,
      level: u.level,
      cost: u.cost
    })),
    enemy: {
      level: enemy.level,
      name: enemy.name,
      hp: enemy.hp,
      maxHp: enemy.maxHp,
      imageSrc: enemy.image.src  // ⬅️ Ukládáme string
    }
  };

  try {
    await storage.save("hra1", gameData);
    console.log("✅ Hra uložena (vč. nepřítele)");
  } catch (e) {
    console.error("❌ Chyba při ukládání:", e);
  }
}

// 📥 Načíst hru z IndexedDB
async function loadGame() {
  try {
    const data = await storage.load("hra1");
    if (!data) return console.log("⚠️ Žádná uložená hra");

    hero.gold = data.gold;
    hero.damage = data.damage;
    hero.dps = data.dps;
    hero.clicks = data.clicks;
    hero.level = data.level;

    enemy.level = data.enemy.level;
    enemy.name = data.enemy.name;
    enemy.hp = data.enemy.hp;
    enemy.maxHp = data.enemy.maxHp;

    enemy.image = new Image();  // ⬅️ Vytvoříme nový obrázek
    enemy.image.src = data.enemy.imageSrc;

    data.upgrades.forEach(saved => {
      const up = upgrades.find(u => u.name === saved.name);
      if (up) {
        up.level = saved.level;
        up.cost = saved.cost;
      }
    });

    updateGoldBar();
    updateGameInfo();
    console.log("📥 Hra načtena (IndexedDB)");
  } catch (e) {
    console.error("❌ Chyba při načítání:", e);
  }
}

window.saveGame = saveGame;
window.loadGame = loadGame;
// Hlavní soubor pro hru Clicker Heroes

//  Základní objekty hrdiny a nepřítele

class Hero {
  constructor(name, damage) {
    this.name = name;
    this.damage = damage;
    this.gold = 0;
    this.dps = 0; // Damage per second
    this.clicks =0; //pocitani pro achievment
  }

  // Útok na nepřítele
  attack(enemy) {
    enemy.hp -= this.damage;
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      this.gold += enemy.goldReward * (hero.goldMultiplier || 1);
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
        hero.gold += enemy.goldReward * (hero.goldMultiplier || 1);
        enemy.respawn();
        updateGoldBar();
      }
    }
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
      hero.clicks++;
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
  updateAchievementProgress();
}

// 🖌️ Kreslení na canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Umístění nepřítele na pravou polovinu obrazovky
  const enemyPositionX = 100; // Posunout na pravou polovinu obrazovky
  const enemyPositionY = 0; // Vertikálně ve středu obrazovky

  // Pokud je obrázek nepřítele načtený, zobrazím ho
  if (enemy.image.complete) {
    ctx.drawImage(enemy.image, enemyPositionX, enemyPositionY, 200, 200); // Umístíme nepřítele na pravou polovinu obrazovky
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
    const totalCost = calculateTotalCost(upgrade.cost, purchaseMultiplier);
  
    if (hero.gold >= totalCost) {
      hero.gold -= totalCost;
  
      // Zvětšení úrovně hrdiny podle násobku
      upgrade.level += purchaseMultiplier;
  
      // Přidání damage nebo DPS podle typu
      if (upgrade.isClickMultiplier) {
        hero.damage += 35 * purchaseMultiplier;
      } else {
        hero.dps += upgrade.dps * purchaseMultiplier;
      }
  
      // Zvýšení ceny po každém nákupu
      for (let i = 0; i < purchaseMultiplier; i++) {
        upgrade.cost = Math.floor(upgrade.cost * 1.15);
      }
  
      document.getElementById(`level-${upgrade.name}`).textContent = upgrade.level;
      heroButton.innerHTML = `<span>Najmout</span><br><span>- ${upgrade.cost} zlata</span>`;
      updateGameInfo();
    }
  });
  setupMultiplierButtons();
  
  function calculateTotalCost(baseCost, multiplier) {
    let cost = 0;
    let currentCost = baseCost;
    for (let i = 0; i < multiplier; i++) {
      cost += currentCost;
      currentCost = Math.floor(currentCost * 1.5);
    }
    return cost;
  }

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

  
 
  