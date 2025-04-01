export const textFollowLine = (): void => {
  // On supprime l'animation CSS qui ne fonctionne pas correctement
  // et on utilise uniquement l'animation JS

  // Attendez que la page soit complètement chargée
  window.addEventListener('load', () => {
    const textLineContainers = document.querySelectorAll<HTMLElement>('.services_line');

    if (!textLineContainers.length) return;

    textLineContainers.forEach((container) => {
      // Récupérer ou créer le SVG
      const svg = container.querySelector('svg');

      if (!svg) {
        console.error('SVG non trouvé dans le conteneur .services_line');
        return;
      }

      // Vérifier que le SVG est visible
      svg.style.display = 'block';

      // Récupérer le path existant
      const path = svg.querySelector('path');
      if (!path) {
        console.error('Path non trouvé dans le SVG');
        return;
      }

      // Créer un identifiant unique pour le path
      const pathId = `textPath-${Math.floor(Math.random() * 10000)}`;

      // Ajouter un ID au path pour le textPath
      path.setAttribute('id', pathId);

      // Créer le texte qui suivra le path
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('class', 'heading-style-h2');
      text.setAttribute('dy', '10');
      text.setAttribute('fill', 'var(--_brand---text--brand)'); // Utiliser la couleur courante du texte

      // Créer le textPath
      const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
      textPath.setAttribute('href', `#${pathId}`);
      textPath.setAttribute('startOffset', '0%');
      textPath.setAttribute('text-anchor', 'middle');

      // Créer les deux parties du texte, une avec la classe alternate
      const spanPart1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      spanPart1.setAttribute('class', 'font-family-alternate');
      spanPart1.textContent = 'Découvrez ce que nous pouvons faire';

      const spanPart2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      spanPart2.textContent = ' pour vous';

      // Ajouter les spans au textPath
      textPath.appendChild(spanPart1);
      textPath.appendChild(spanPart2);

      // Ajouter textPath au texte
      text.appendChild(textPath);

      // Ajouter le texte au SVG
      svg.appendChild(text);

      // Créer un second texte pour un mouvement continu
      const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text2.setAttribute('class', 'heading-style-h2');
      text2.setAttribute('dy', '10');
      text2.setAttribute('fill', 'var(--_brand---text--brand)'); // Utiliser la couleur courante du texte

      const textPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
      textPath2.setAttribute('href', `#${pathId}`);
      textPath2.setAttribute('startOffset', '100%'); // Démarrer bien plus loin pour augmenter l'espacement
      textPath2.setAttribute('text-anchor', 'middle');

      // Créer les deux parties du texte pour le second textPath
      const spanPart1_2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      spanPart1_2.setAttribute('class', 'font-family-alternate');
      spanPart1_2.textContent = 'Découvrez ce que nous pouvons faire';

      const spanPart2_2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      spanPart2_2.textContent = ' pour vous';

      // Ajouter les spans au textPath2
      textPath2.appendChild(spanPart1_2);
      textPath2.appendChild(spanPart2_2);

      text2.appendChild(textPath2);
      svg.appendChild(text2);

      // Animation immédiate, sans setTimeout
      // Animer manuellement en modifiant la position
      let offset1 = 0;
      let offset2 = 100; // Position de départ plus éloignée
      const speed = 0.1;

      function animateText() {
        offset1 -= speed;
        offset2 -= speed;

        // Réinitialisation avec un grand écart pour maintenir la distance
        if (offset1 < -130) offset1 = 100;
        if (offset2 < -130) offset2 = 100;

        textPath.setAttribute('startOffset', `${offset1}%`);
        textPath2.setAttribute('startOffset', `${offset2}%`);

        requestAnimationFrame(animateText);
      }

      // Démarrer l'animation
      animateText();
    });
  });
};
