// enemies.js

// Pole nepřátel
const enemyImages = [
    "./res/img/enemies/evilslime.png",
    "./res/img/enemies/firetree.png",
    "./res/img/enemies/mushroomhead.png",
    "./res/img/enemies/ghost.png",
    "./res/img/enemies/skeleton.png",
    "./res/img/enemies/pumpkin.png"
  ];
  
  // Pole názvů nepřátel
  const enemyNames = [
    "Sliz",
    "Ohnivý strom",
    "Houbová hlava",
    "Duch",
    "Lebka",
    "Pumpkin"
  ];
  
  export class Enemy {
    constructor(name, hp, goldReward) {
      this.name = name;
      this.hp = hp;
      this.maxHp = hp;
      this.goldReward = goldReward;
      this.level = 1;
      this.image = new Image();
      this.updateImage();
    }
  
    updateImage() {
      // Určujeme index podle levelu
      const index = Math.floor(this.level / 10);
      
      // Nastavujeme obrázek a název podle indexu
      this.image.src = enemyImages[index] || enemyImages[enemyImages.length - 1];
      this.name = enemyNames[index] || enemyNames[enemyNames.length - 1];
    }
  
    respawn() {
      this.level++;
      this.maxHp = Math.floor(this.maxHp * 1.5);
      this.hp = this.maxHp;
      this.goldReward = Math.floor(this.goldReward * 1.5);
  
      // Po každých 10 levelech aktualizujeme obrázek a název
      if (this.level % 10 === 0) {
        this.updateImage();
      }
    }
  }