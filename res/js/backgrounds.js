export function renderBackgroundPanel(hero) {
  const backgroundOptions = document.getElementById('backgroundOptions');
  const toggleButton = document.getElementById('toggleBackgroundPanel');

  if (!backgroundOptions || !toggleButton) {
    console.error('backgroundOptions nebo toggleButton nebyl nalezen!');
    return;
  }

  toggleButton.addEventListener('click', () => {
    backgroundOptions.style.display = backgroundOptions.style.display === 'none' ? 'block' : 'none';
  });

  // Data přímo v poli
  const backgrounds = [
    { name: "Louka", image: "res/img/backgrounds/louka.avif", cost: 0 },
    { name: "Město", image: "res/img/backgrounds/city.png", cost: 50 },
    { name: "Noc", image: "res/img/backgrounds/night.jpg", cost: 300 },
    { name: "Vesmír", image: "res/img/backgrounds/vesmir.png", cost: 4000 },
    { name: "Les", image: "res/img/backgrounds/les.jpg", cost: 8000 },
    { name: "Jiný svět", image: "res/img/backgrounds/theFurther.jpg", cost: 15000 },
    { name: "Vesnice", image: "res/img/backgrounds/village.jpg", cost: 30000 },
    { name: "Stvoření", image: "res/img/backgrounds/creation.jpg", cost: 50000 },
    { name: "Nebeské město", image: "res/img/backgrounds/skyCity.png", cost: 100000 }
  ];

  backgroundOptions.innerHTML = '';

  backgrounds.forEach(bg => {
    const button = document.createElement('button');
    button.textContent = `${bg.name} (${bg.cost} zlata)`;
    button.addEventListener('click', () => {
      buyBackground(hero, bg.image, bg.cost);
    });
    backgroundOptions.appendChild(button);
  });

  function buyBackground(hero, imagePath, cost) {
    if (hero.gold >= cost) {
      hero.gold -= cost;
      document.body.style.backgroundImage = `url('${imagePath}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      console.log('✅ Pozadí změněno!');
    } else {
      console.log('❌ Nedostatek zlata!');
    }
  }
}






