# BŌL NUTRITION — Site e-commerce MASS & BOWL

Site statique (HTML/CSS/JS) de la boutique BŌL NUTRITION, déployé sur Netlify.

## Structure
- `index.html` : structure de la page
- `style.css` : styles
- `script.js` : panier, checkout, navigation
- `netlify.toml` : configuration du déploiement (cache, en-têtes de sécurité)
- `.github/workflows/ci.yml` : contrôles automatiques à chaque push / pull request

## Workflow de travail
1. Créer une branche : `git checkout -b ma-modification`
2. Modifier les fichiers, puis `git add . && git commit -m "description"`
3. `git push` puis ouvrir une Pull Request sur GitHub
4. Les contrôles CI se lancent ; Netlify génère un aperçu temporaire
5. Une fois validé, fusionner dans `main` : le site est mis à jour automatiquement

## Tester en local
Ouvrir `index.html` dans un navigateur, ou lancer `python3 -m http.server 8000`.
