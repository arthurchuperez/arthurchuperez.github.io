
# Introduction

Ce site [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) utilise le générateur de site [Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll) qui permet de générer un site statique HTML grâce au langage de template [Liquid](https://shopify.github.io/liquid/).

[Liquid API and references](https://shopify.dev/docs/api/liquid).

# Syntaxe Liquid utilisée

## Les modèles

Le dossier `_layouts`  contient les modèles (ou templates) utilisés pour structurer les pages du site.

Exemple de modèle :

```html
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>...</title>
        <link rel="stylesheet" href="static/style.css">
        <script src="static/script.js"></script>
    </head>

    <body>
        ...

        {{ content }}
        
        ...
    </body>
</html>
```

La balise `{{ content }}` indique à Jekyll l'endroit où insérer le contenu spécifique de chaque page lors de la génération du site.

Pour qu'une page utilise un modèle, il faut le spécifier tout en haut de la page de cette façon :

```
---
layout: default
---
```

Cela indique à Jekyll qu'il doit utiliser le fichier `_layouts/default.html` comme modèle pour cette page.


## Les variables

Le fichier `_config.yml` peut contenir des variables utilisables dans les pages du site.

```yaml
# Welcome to Jekyll!

cv_url: /assets/docs/CV_Arthur_PEREZ.pdf
```

Ici, nous avons défini une variable nommée `cv_url`. Pour l'utiliser dans une page, il suffit d'écrire `{{ site.cv_url }}`.

```html
<a href="{{ site.cv_url }}">Curriculum Vitae</a>
```

# Compilation d'une page

Lors de la compilation d'une page, Jekyll suit ces étapes :
- Il lit le modèle défini dans `_layouts/default.html`
- Il écrit tout le contenu du modèle jusqu'à la balise `{{ content }}`
- Il insère ensuite le contenu de la page
- Enfin, il complète avec le reste du modèle après la balise `{{ content }}`

## Exemple de compilation

Reprenons l'exemple de modèle ci-dessus pour l'utiliser avec une page qui exploite également la variable `cv_url` que nous avons définie précédemment.

```html
---
layout: default
---
<section id="contact">
    <h2>Contactez-moi</h2>
    <p class="intro">Je suis ouvert à toute opportunité de stage, question ou collaboration.<br/>N'hésitez pas à me contacter !</p>
    <a href="{{ site.cv_url }}">Curriculum Vitae</a>
</section>
```

Le résultat de la compilation donnera le rendu suivant.

```html
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>...</title>
        <link rel="stylesheet" href="static/style.css">
        <script src="static/script.js"></script>
    </head>

    <body>
        ...

        <section id="contact">
            <h2>Contactez-moi</h2>
            <p class="intro">Je suis ouvert à toute opportunité de stage, question ou collaboration.<br/>N'hésitez pas à me contacter !</p>
            <a href="/assets/docs/CV_Arthur_PEREZ.pdf">Curriculum Vitae</a>
        </section>
        
        ...
    </body>
</html>
```


# Setup local

## Installer WSL

Ouvrez le `Terminal` sous Windows et installez WSL, qui permet d'exécuter un environnement Linux directement sur Windows.

Par défaut, cela installera Ubuntu. Pensez à redémarrer votre PC si cela est demandé.

```cmd
wsl --install
```

## Installer Ruby dans Ubuntu

Lancez Ubuntu depuis le `Terminal` Windows.

![ubuntu](_docs/terminal_ubuntu.png)

Ensuite, installez les composants Ruby nécessaires pour pouvoir exécuter Jekyll.

```bash
sudo apt update
sudo apt install -y ruby-full build-essential zlib1g-dev
```

Ouvrez le fichier `~/.bashrc` à l'aide de l'éditeur de texte `nano` pour y apporter des modifications :

```bash
nano ~/.bashrc
```

Collez les lignes suivantes à la fin du fichier `~/.bashrc` :

```
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
```

Sauvegardez et quittez en appuyant sur `CTRL+X`, puis validez avec O (ou Y) et Entrée.

Ensuite, rechargez le fichier avec la commande suivante :

```bash
source ~/.bashrc
```

## Installer et lancer Jekyll dans Ubuntu

```bash
gem install jekyll bundler
```

Sous Ubuntu, le lecteur `C:\` est accessible via le chemin `/mnt/c`.

Pour vous rendre dans le dossier de votre projet, utilisez une commande comme celle-ci :

```bash
cd /mnt/c/Projects/arthurchuperez.github.io
```

Pour lancer Jekyll dans le dossier de votre projet, utilisez la commande suivante :

```bash
bundle exec jekyll serve --livereload --force-polling
```

![jekyll](_docs/jekyll.png)

Le site est alors accessible à l'adresse [http://127.0.0.1:4000](http://127.0.0.1:4000) et devrait se recompiler automatiquement à chaque modification de fichier.

Si les changements ne s'affichent pas immédiatement, il peut être nécessaire de forcer le rafraîchissement du navigateur avec la touche `F5`.


# Lexique

| Terme / Concept             | Définition
|-|-
| GitHub Pages                | Service gratuit de GitHub pour héberger un site web statique (HTML, CSS, JS).
| Jekyll                      | Générateur de site statique : transforme des fichiers Markdown/HTML en site web complet.
| Liquid                      | Langage de template utilisé par Jekyll pour insérer du contenu dynamique (ex. `{{ variable }}`).
| `_layouts`                  | Dossier contenant les modèles de pages (templates HTML) utilisés par le site.
| `_config.yml`               | Fichier de configuration de Jekyll : permet de définir des options et des variables globales.
| `{{ content }}`             | Balise spéciale de Liquid : insère ici le contenu propre à chaque page lors de la compilation.
| `{{ site.nom_variable }}`   | Syntaxe Liquid pour accéder à une variable définie dans `_config.yml`.
| `layout: default`           | Instruction dans l'en-tête d'une page Jekyll pour indiquer quel modèle (template) utiliser.
| WSL (Windows Subsystem for Linux) | Outil qui permet de faire tourner un système Linux (ex. Ubuntu) dans Windows.
| `sudo`                      | Commande utilisée pour exécuter une action en tant qu’administrateur (super utilisateur).
| `apt`                       | Outil de gestion de paquets sous Ubuntu/Debian pour installer, mettre à jour ou supprimer des logiciels.
| `nano`                      | Éditeur de texte dans le terminal Linux utilisé pour modifier des fichiers texte.
| `.bashrc`                   | Fichier de configuration du terminal Bash : permet de définir des variables d'environnement.
| `export`                    | Commande qui permet de définir une variable d’environnement accessible dans le terminal et ses sous-processus.
| `GEM_HOME`, `PATH`          | Variables d'environnement utilisées pour gérer les paquets Ruby localement.
| `source [FICHIER]`          | Commande qui recharge un fichier de configuration dans le terminal actuel sans redémarrer le shell.
| `/mnt/c/...`                | Emplacement des fichiers Windows dans l'environnement Linux (via WSL).
