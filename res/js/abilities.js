import { hero, updateGameInfo, updateGoldBar } from "./main.js";

export const abilities = {
  berserk: {
    name: "Berserk",
    duration: 10,
    cooldown: 30,
    isActive: false,
    lastUsed: 0,
    button: document.getElementById("berserkButton"),
    activate() {
      const now = Date.now();
      if (now - this.lastUsed < this.cooldown * 1000) return;

      this.isActive = true;
      this.lastUsed = now;
      hero.damage *= 2;
      updateGameInfo();

      this.startCooldown();
      
      setTimeout(() => {
        this.isActive = false;
        hero.damage /= 2;
        updateGameInfo();
      }, this.duration * 1000);
    },
    startCooldown() {
      const button = this.button;
      button.disabled = true;
      button.style.opacity = "0.5";

      let remainingTime = this.cooldown;
      button.innerText = `Berserk (${remainingTime}s)`;

      const interval = setInterval(() => {
        remainingTime--;
        if (remainingTime > 0) {
          button.innerText = `Berserk (${remainingTime}s)`;
        } else {
          clearInterval(interval);
          button.innerText = "Berserk";
          button.disabled = false;
          button.style.opacity = "1";
        }
      }, 1000);
    }
  },

  goldRush: {
    name: "Gold Rush",
    duration: 10,
    cooldown: 60,
    isActive: false,
    lastUsed: 0,
    button: document.getElementById("goldRushButton"),
    activate() {
      const now = Date.now();
      if (now - this.lastUsed < this.cooldown * 1000) return;

      this.isActive = true;
      this.lastUsed = now;
      hero.goldMultiplier = 2;
      updateGoldBar();

      this.startCooldown();

      setTimeout(() => {
        this.isActive = false;
        hero.goldMultiplier = 1;
        updateGoldBar();
      }, this.duration * 1000);
    },
    startCooldown() {
      const button = this.button;
      button.disabled = true;
      button.style.opacity = "0.5";

      let remainingTime = this.cooldown;
      button.innerText = `Gold Rush (${remainingTime}s)`;

      const interval = setInterval(() => {
        remainingTime--;
        if (remainingTime > 0) {
          button.innerText = `Gold Rush (${remainingTime}s)`;
        } else {
          clearInterval(interval);
          button.innerText = "Gold Rush";
          button.disabled = false;
          button.style.opacity = "1";
        }
      }, 1000);
    }
  }
};

// Přidání event listenerů na tlačítka
document.getElementById("berserkButton").addEventListener("click", () => abilities.berserk.activate());
document.getElementById("goldRushButton").addEventListener("click", () => abilities.goldRush.activate());