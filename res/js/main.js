// Hlavní soubor pro hru Clicker Heroes

// 🧱 Základní objekty hrdiny a nepřítele
class Hero {
    constructor(name, damage) {
      this.name = name;
      this.damage = damage;
      this.gold = 0;
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
  }
  
  class Enemy {
    constructor(name, hp, goldReward) {
      this.name = name;
      this.hp = hp;
      this.maxHp = hp;
      this.goldReward = goldReward;
    }
  
    // Znovuzrození nepřítele
    respawn() {
      this.hp = this.maxHp;
      console.log(`${this.name} je zpět s ${this.hp} HP!`);
    }
  }
  
  // 🎮 Vytvoření vlastností hrdiny a nepřítele
  const hero = new Hero('Warrior', 10);
  const enemy = new Enemy('Goblin', 50, 20);
  
  // 🖱️ Zpracování kliknutí na canvas
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.addEventListener('click', () => {
    if (enemy.hp > 0) {
      hero.attack(enemy);
      updateGameInfo();
    }
  });
  
  // 🔄 Funkce pro aktualizaci herních informací
  function updateGameInfo() {
    document.getElementById('heroInfo').innerText = `Hrdina: ${hero.name}, Zlato: ${hero.gold}`;
    document.getElementById('enemyInfo').innerText = `Nepřítel: ${enemy.name}, HP: ${enemy.hp}/${enemy.maxHp}`;
  }
  
  // 🎨 Hlavní smyčka pro vykreslování hry
  function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
  }
  
  // 🖌️ Kreslení na canvas
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Kreslení nepřítele
    ctx.fillStyle = 'red';
    ctx.fillRect(150, 100, 200, 200);
  
    // HP text
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`${enemy.name} HP: ${enemy.hp}`, 170, 220);
  }
  
  // Spuštění hry
  updateGameInfo();
  gameLoop();
  
 
  