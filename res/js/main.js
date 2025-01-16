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

// 🖱️ Zpracování kliknutí na canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Kontrola kliknutí na červený čtverec (nepřítel)
  if (x >= 150 && x <= 350 && y >= 100 && y <= 300) {
    if (enemy.hp > 0) {
      hero.attack(enemy);
      updateGameInfo();
    }
  }

  // Kontrola kliknutí na modrý čtverec (zvýšení DPS)
  if (x >= 50 && x <= 100 && y >= 350 && y <= 400) {
    if (hero.gold >= 50) {
      hero.gold -= 50;
      hero.dps += 5;
      console.log('DPS zvýšeno! Aktuální DPS:', hero.dps);
      updateGameInfo();
    }
  }

  // Kontrola kliknutí na žlutý čtverec (zvýšení damage na klik)
  if (x >= 400 && x <= 450 && y >= 350 && y <= 400) {
    if (hero.gold >= 100) {
      hero.gold -= 100;
      hero.damage += 10;
      console.log('Poškození na klik zvýšeno! Aktuální damage:', hero.damage);
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

  // Kreslení nepřítele
  ctx.fillStyle = 'red';
  ctx.fillRect(150, 100, 200, 200);

  // Kreslení modrého čtverce (zvýšení DPS)
  ctx.fillStyle = 'blue';
  ctx.fillRect(50, 350, 50, 50);
  ctx.fillStyle = 'white';
  ctx.font = '12px Arial';
  ctx.fillText('DPS +5', 55, 380);
  ctx.fillText('-50 zlata', 55, 395);

  // Kreslení žlutého čtverce (zvýšení damage na klik)
  ctx.fillStyle = 'yellow';
  ctx.fillRect(400, 350, 50, 50);
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.fillText('DMG +10', 405, 380);
  ctx.fillText('-100 zlata', 405, 395);
}

// Spuštění hry
updateGameInfo();
gameLoop();
  
 
  