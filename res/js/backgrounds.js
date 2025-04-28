export function renderBackgroundPanel(hero) {
  const backgroundOptions = document.getElementById('backgroundOptions');
  const toggleButton = document.getElementById('toggleBackgroundPanel');

   
  if (!backgroundOptions || !toggleButton) {
    console.error('backgroundOptions nebo toggleButton nebyl nalezen!');
    return;
  }

  // otevření a zavření panelu
  toggleButton.addEventListener('click', () => {
    backgroundOptions.style.display = backgroundOptions.style.display === 'none' ? 'block' : 'none';
  });
  //pole s backgrounds
  const backgrounds = [
    { name: "Pozadí Louka", image: "./res/img/backgrounds/louka.avif", cost: 0 },
    { name: "Pozadí Vesmír", image: "./res/img/backgrounds/city.png", cost: 50 },
    { name: "Pozadí Měsíček", image: "./res/img/backgrounds/night.jpg", cost: 300 },
    { name: "Pozadí Vesmír", image: "./res/img/backgrounds/vesmir.png", cost: 1000 },
    { name: "Pozadí Les", image: "./res/img/backgrounds/les.jpg", cost: 10000 },
    { name: "Pozadí The Further", image: "./res/img/backgrounds/theFurther.jpg", cost: 10500 },
    { name: "Pozadí Village", image: "./res/img/backgrounds/village.jpg", cost: 100000 },
    { name: "Pozadí Creation", image: "./res/img/backgrounds/creation.jpg", cost: 105000 },
    { name: "Pozadí Sky City", image: "./res/img/backgrounds/skyCity.png", cost: 110000 }
  ];


  
  backgroundOptions.innerHTML = backgrounds.map(background => 
    `<button data-cost="${background.cost}">${background.name} (${background.cost} zlata)</button>`
  ).join('');

  
  backgroundOptions.querySelectorAll('button').forEach((button, index) => {
    button.addEventListener('click', () => {
      const background = backgrounds[index];
      buyBackground(hero, background.image, background.cost);
    });
  });
}






