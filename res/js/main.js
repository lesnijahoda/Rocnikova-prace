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
  if (x >= 350 && x <= 550 && y >= 150 && y <= 350) {
    if (enemy.hp > 0) {
      hero.attack(enemy);
      updateGameInfo();
    }
  }

  // Kontrola kliknutí na žlutý čtverec (zvýšení damage na klik)
  if (x >= 50 && x <= 150 && y >= 100 && y <= 150) {
    if (hero.gold >= 100) {
      hero.gold -= 100;
      hero.damage += 10;
      console.log('Poškození na klik zvýšeno! Aktuální damage:', hero.damage);
      updateGameInfo();
    }
  }

  // Kontrola kliknutí na modrý čtverec (zvýšení DPS)
  if (x >= 50 && x <= 150 && y >= 200 && y <= 250) {
    if (hero.gold >= 50) {
      hero.gold -= 50;
      hero.dps += 5;
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
  ctx.fillStyle = 'red';
  ctx.fillRect(350, 150, 200, 200);

  // Kreslení žlutého čtverce (zvýšení damage na klik, vlevo nahoře)
  ctx.fillStyle = 'yellow';
  ctx.fillRect(50, 100, 100, 50);
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.fillText('DMG +10', 70, 125);
  ctx.fillText('-100 zlata', 65, 140);

  // Kreslení modrého čtverce (zvýšení DPS, vlevo pod žlutým)
  ctx.fillStyle = 'blue';
  ctx.fillRect(50, 200, 100, 50);
  ctx.fillStyle = 'white';
  ctx.font = '12px Arial';
  ctx.fillText('DPS +5', 70, 225);
  ctx.fillText('-50 zlata', 65, 240);
}

// Spuštění hry
updateGameInfo();
gameLoop();
  
 
  