export function renderBackgroundPanel(hero) {
  const backgroundOptions = document.getElementById('backgroundOptions');
  const toggleButton = document.getElementById('toggleBackgroundPanel');

  // Ošetření pro případ, že se něco nenačte 
  if (!backgroundOptions || !toggleButton) {
    console.error('backgroundOptions nebo toggleButton nebyl nalezen!');
    return;
  }

  // Otevření a zavření panelu
  toggleButton.addEventListener('click', () => {
    backgroundOptions.style.display = backgroundOptions.style.display === 'none' ? 'block' : 'none';
  });

  // Naplnění tlačítek s backgrounds 
  backgroundOptions.innerHTML = `
    <button data-image="./res/img/backgrounds/louka.avif" data-cost="0">Pozadí Louka (0 zlata)</button>
    <button data-image="./res/img/backgrounds/city.png" data-cost="100">Pozadí Vesmír (10000 zlata)</button>
    <button data-image="./res/img/backgrounds/night.jpg" data-cost="50">Pozadí Měsíček (50 zlata)</button>
    <button data-image="./res/img/backgrounds/vesmir.png" data-cost="100">Pozadí Vesmír (100 zlata)</button>
    <button data-image="./res/img/backgrounds/les.jpg" data-cost="100">Pozadí Vesmír (10000 zlata)</button>
    <button data-image="./res/img/backgrounds/theFurther.jpg" data-cost="100">Pozadí Vesmír (10000 zlata)</button>
    <button data-image="./res/img/backgrounds/village.jpg" data-cost="100">Pozadí Vesmír (10000 zlata)</button>
    <button data-image="./res/img/backgrounds/creation.jpg" data-cost="100">Pozadí Vesmír (10000 zlata)</button>
   
    <button data-image="./res/img/backgrounds/skyCity.png" data-cost="100">Pozadí Vesmír (10000 zlata)</button>
    
    
  `;

  // Přiřazení funkčnosti ke každému tlačítku
  backgroundOptions.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const imagePath = button.getAttribute('data-image');
      const cost = parseInt(button.getAttribute('data-cost'), 10);
      buyBackground(hero, imagePath, cost);
    });
  });
}

export function buyBackground(hero, imagePath, cost) {
  if (hero.gold >= cost) {
    hero.gold -= cost;
    document.body.style.backgroundImage = `url('${imagePath}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    console.log('Pozadí změněno!');
  } else {
    console.log('Nedostatek zlata!');
  }
}






