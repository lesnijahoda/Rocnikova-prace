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

// 🎮 Vytvoření instancí hrdiny a nepřítele
const hero = new Hero('Warrior', 10);
const enemy = new Enemy('Goblin', 50, 20);

// 🖼️ Načtení obrázku slizu
const slimeImage = new Image();
slimeImage.src = './res/img/sorcerer.png'; // Cesta k obrázku

// 🖱️ Zpracování kliknutí na canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Zabránění označování textu na canvasu pomocí CSS
canvas.style.userSelect = 'none';
canvas.style.webkitUserSelect = 'none';
canvas.style.msUserSelect = 'none';
canvas.style.mozUserSelect = 'none';

let clickUpgradeCost = 100;
let dpsUpgradeCost = 500;

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

  // Kontrola kliknutí na žlutý čtverec (zvýšení damage na klik)
  if (x >= 50 && x <= 150 && y >= 100 && y <= 150) {
    if (hero.gold >= clickUpgradeCost) {
      hero.gold -= clickUpgradeCost;
      hero.damage += 10;
      clickUpgradeCost = Math.floor(clickUpgradeCost * 1.2); // Zdražení upgradu
      console.log('Poškození na klik zvýšeno! Aktuální damage:', hero.damage);
      updateGameInfo();
    }
  }

  // Kontrola kliknutí na modrý čtverec (zvýšení DPS)
  if (x >= 50 && x <= 150 && y >= 200 && y <= 250) {
    if (hero.gold >= dpsUpgradeCost) {
      hero.gold -= dpsUpgradeCost;
      hero.dps += 5;
      dpsUpgradeCost = Math.floor(dpsUpgradeCost * 1.5); // Zdražení upgradu
      console.log('DPS zvýšeno! Aktuální DPS:', hero.dps);
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

  // Kreslení žlutého čtverce (zvýšení damage na klik, vlevo nahoře)
  ctx.fillStyle = 'yellow';
  ctx.fillRect(50, 100, 100, 50);
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.fillText('DMG +10', 70, 125);
  ctx.fillText(`-${clickUpgradeCost} zlata`, 60, 140);

  // Kreslení modrého čtverce (zvýšení DPS, vlevo pod žlutým)
  ctx.fillStyle = 'blue';
  ctx.fillRect(50, 200, 100, 50);
  ctx.fillStyle = 'white';
  ctx.font = '12px Arial';
  ctx.fillText('DPS +5', 70, 225);
  ctx.fillText(`-${dpsUpgradeCost} zlata`, 60, 240);
}

// 🏋️ Kreslení hrdinů na levém panelu
const heroPanel = document.getElementById('heroPanel');

const heroImage = new Image();
heroImage.src = './res/img/smrt.png';

// Generování 20 hrdinů
for (let i = 1; i <= 20; i++) {
  const heroRow = document.createElement('div');
  heroRow.className = 'hero-row';
  const heroButton = document.createElement('button');
  heroButton.textContent = 'Najmout';
  heroButton.style.marginRight = '10px';

  const heroImg = document.createElement('img');
  heroImg.src = heroImage.src;
  heroImg.alt = `Hrdina ${i}`;
  heroImg.style.width = '80px';
  heroImg.style.height = '80px';
  heroImg.style.marginRight = '10px';

  heroRow.appendChild(heroButton);
  heroRow.appendChild(heroImg);
  heroRow.appendChild(document.createTextNode(`Hrdina ${i}`));
  heroPanel.appendChild(heroRow);
}

// Spuštění hry
updateGameInfo();
gameLoop();


  
 
  