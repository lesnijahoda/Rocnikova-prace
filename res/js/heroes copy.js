export const heroPanel = document.getElementById('heroPanel');
heroPanel.innerHTML = "";
export const upgrades = [
  { name: "Rozteklý slime", cost: 100, dps: 25, image: "./res/img/slime.png", isClickMultiplier: true },
  { name: "FireSlime", cost: 2000, dps: 50, image: "./res/img/fireslime.png" },
  { name: "Ruzovka", cost: 10000, dps: 100, image: "./res/img/ruzovkaslime.png" },
  { name: "ForestSlime", cost: 30000, dps: 400, image: "./res/img/forestslime.png" }, 
  { name: "RabbitSlime", cost: 60000, dps: 700, image: "./res/img/rabbitslime.png" }, 
  { name: "Smrtící death", cost: 150000, dps: 1080, image: "./res/img/smrt.png" },
  { name: "Blázniví sorcerer", cost: 300000, dps: 2060, image: "./res/img/sorcerer.png" },
  { name: "Mocný zeus", cost: 600000, dps: 3020, image: "./res/img/zeus.png" },
  { name: "Vážný poseidon", cost: 1200000, dps: 5040, image: "./res/img/poseidon.png" },
  { name: "Chytrý hades", cost: 2400000, dps: 7880, image: "./res/img/hades.png" },
  { name: "Soldier", cost: 4800000, dps: 17360, image: "./res/img/soldier.png" },
  { name: "SuperBoy", cost: 9600000, dps: 35720, image: "./res/img/superboy.png" },
  { name: "FireMage", cost: 19200000, dps: 70440, image: "./res/img/firemage.png" },
  { name: "BlackKnight", cost: 38400000, dps: 152880, image: "./res/img/blackknight.png" },
  { name: "Knight", cost: 76800000, dps: 285760, image: "./res/img/blackknight2.png" },
  { name: "LightKnight", cost: 153600000, dps: 581520, image: "./res/img/lightknight.png" },
  { name: "TheKing", cost: 307200000, dps: 1783040, image: "./res/img/theking.png" },
];


// Funkce pro snížení DPS
function reduceDPS(upgrades, factor) {
  upgrades.forEach(hero => {
    hero.dps = Math.round(hero.dps * factor); 
  });
}

reduceDPS(upgrades, 0.85); // Snížení DPS o 85 %
  
  