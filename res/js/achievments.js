//  Achievementy
import { hero,enemy,updateGoldBar } from "./main.js"; // Pokud je hero v main.js, musí se importovat

export const achievements = [
    { id: "gold_100", text: "Nasbírej 100 zlata!", condition: () => hero.gold >= 100, reward: 50 },
    { id: "gold_1000", text: "Nasbírej 1000 zlata!", condition: () => hero.gold >= 1000, reward: 200 },
    { id: "gold_10000", text: "Nasbírej 1000 zlata!", condition: () => hero.gold >= 10000, reward: 2000 },
    { id: "first_enemy", text: "Poraz prvního nepřítele!", condition: () => enemy.level > 1, reward: 20 }
    
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

    // 📜 Přidání do seznamu achievementů
    const achievementList = document.getElementById("achievementList");
    if (achievementList) {
        const listItem = document.createElement("li");
        listItem.innerText = text;
        achievementList.appendChild(listItem);
    }
}
  
  
  
  