//  Achievementy
import { hero,enemy,updateGoldBar } from "./main.js"; // Pokud je hero v main.js, musí se importovat

export const achievements = [
    { id: "gold_100", text: "Nasbírej 100 zlata!", condition: () => hero.gold >= 100, reward: 50 },
    { id: "gold_1000", text: "Nasbírej 1 000 zlata!", condition: () => hero.gold >= 1000, reward: 200 },
    { id: "gold_5000", text: "Nasbírej 5 000 zlata!", condition: () => hero.gold >= 5000, reward: 200 },
    { id: "gold_10000", text: "Nasbírej 10 000 zlata!", condition: () => hero.gold >= 10000, reward: 2000 },
    { id: "gold_15000", text: "Nasbírej 15 000 zlata!", condition: () => hero.gold >= 15000, reward: 2000 },
    { id: "gold_15000", text: "Nasbírej 50 000 zlata!", condition: () => hero.gold >= 50000, reward: 2000 },
    { id: "gold_100000", text: "Nasbírej 100 000 zlata!", condition: () => hero.gold >= 100000, reward: 20000 },
    { id: "gold_100000", text: "Nasbírej 300 000 zlata!", condition: () => hero.gold >= 300000, reward: 20000 },
    { id: "gold_100000", text: "Nasbírej 500 000 zlata!", condition: () => hero.gold >= 500000, reward: 20000 },
    { id: "gold_1000000", text: "Nasbírej 1 000 000 zlata!", condition: () => hero.gold >= 1000000, reward: 100000 },

    { id: "first_enemy", text: "Poraz prvního nepřítele!", condition: () => enemy.level > 1, reward: 20 },
    { id: "ten_enemy", text: "Poraz desátého nepřítele!", condition: () => enemy.level > 10, reward: 200 },
    { id: "twenty_enemy", text: "Poraz dvacátého nepřítele!", condition: () => enemy.level > 20, reward: 200 },
    { id: "thirty_enemy", text: "Poraz třicátého nepřítele!", condition: () => enemy.level > 30, reward: 200 },
    { id: "foty_enemy", text: "Poraz čtyřicátého nepřítele!", condition: () => enemy.level > 40, reward: 200 },
    { id: "fifty_enemy", text: "Poraz padesátého nepřítele!", condition: () => enemy.level > 50, reward: 200 },
    { id: "sixty_enemy", text: "Poraz šedesátého nepřítele!", condition: () => enemy.level > 60, reward: 200 },
    { id: "seventy_enemy", text: "Poraz sedumdesátého nepřítele!", condition: () => enemy.level > 70, reward: 200 },
    { id: "eighty_enemy", text: "Poraz osumdesátého nepřítele!", condition: () => enemy.level > 80, reward: 200 },
    { id: "ninty_enemy", text: "Poraz devadesátého nepřítele!", condition: () => enemy.level > 90, reward: 200 },
    { id: "hundred_enemy", text: "Poraz stého nepřítele!", condition: () => enemy.level > 100, reward: 200 },

    { id: "damage_50", text: "Dosáhni damage 50!", condition: () => hero.damage > 50, reward: 200 },
    { id: "damage_100", text: "Dosáhni damage 100!", condition: () => hero.damage > 100, reward: 200 },
    { id: "damage_250", text: "Dosáhni damage 250!", condition: () => hero.damage > 250, reward: 200 },
    { id: "damage_500", text: "Dosáhni damage 500!", condition: () => hero.damage > 500, reward: 200 },
    { id: "damage_1000", text: "Dosáhni damage 1 000!", condition: () => hero.damage > 1000, reward: 200 },
    { id: "damage_1500", text: "Dosáhni damage 1 500!", condition: () => hero.damage > 1500, reward: 200 },
    { id: "damage_5000", text: "Dosáhni damage 5 000!", condition: () => hero.damage > 5000, reward: 200 },
    { id: "damage_10000", text: "Dosáhni damage 10 000!", condition: () => hero.damage > 10000, reward: 200 },
    { id: "damage_20000", text: "Dosáhni damage 20 000!", condition: () => hero.damage > 20000, reward: 200 },

    { id: "damage_15", text: "Dosáhni dps 15!", condition: () => hero.dps >= 15, reward: 200 },
    { id: "damage_50", text: "Dosáhni dps 50!", condition: () => hero.dps > 50, reward: 200 },
    { id: "damage_100", text: "Dosáhni dps 100!", condition: () => hero.dps > 100, reward: 200 },
    { id: "damage_1000", text: "Dosáhni dps 1 000!", condition: () => hero.dps > 1000, reward: 200 },
    { id: "damage_10000", text: "Dosáhni dps 10 000!", condition: () => hero.dps > 10000, reward: 200 },
    { id: "damage_50000", text: "Dosáhni dps 50 000!", condition: () => hero.dps > 50000, reward: 200 },
    { id: "damage_100000", text: "Dosáhni dps 100 000!", condition: () => hero.dps > 100000, reward: 200 },

    { id: "clicks_50", text: "Kliknul si 50 krát!", condition: () => hero.clicks >=50 , reward: 200 },
    { id: "clicks_200", text: "Kliknul si 200 krát!", condition: () => hero.clicks > 200, reward: 200 },
    { id: "clicks_500", text: "Kliknul si 500 krát!", condition: () => hero.clicks > 500, reward: 200 },
    { id: "clicks_1000", text: "Kliknul si 1 000 krát!", condition: () => hero.clicks > 1000, reward: 200 },

];

export const unlockedAchievements = new Set(); // Uchovává odemčené achievementy

export function checkAchievements() {
    achievements.forEach(ach => {
        if (!unlockedAchievements.has(ach.id) && ach.condition()) {
            unlockedAchievements.add(ach.id);
            hero.gold += ach.reward;
            updateGoldBar();
            displayAchievement(ach.text);
        }
    });
}

export function displayAchievement(text) {
    // Vytvoření notifikace o achievementu
    const achievementDiv = document.createElement("div");
    achievementDiv.className = "achievement";
    achievementDiv.innerText = `🏆 Achievement: ${text}`;
    document.body.appendChild(achievementDiv);

    // Po 3 sekundách achievement zmizí
    setTimeout(() => {
        achievementDiv.style.opacity = "0";
        setTimeout(() => achievementDiv.remove(), 1000);
    }, 3000);

    //  Přidání do seznamu achievementů
    const achievementList = document.getElementById("achievementList");
    if (achievementList) {
        const listItem = document.createElement("li");
        listItem.innerText = text;
        achievementList.appendChild(listItem);
    }
}
  
  
  
  