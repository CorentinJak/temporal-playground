# Temporal Test

Une application React + TypeScript + Vite pour explorer et tester les capacités de l'API Temporal avec différents cas d'usage.

## Objectif

Ce projet permet de démontrer et tester les fonctionnalités de l'[API Temporal](https://tc39.es/proposal-temporal/) pour la manipulation moderne des dates et heures en JavaScript, ainsi que les capacités d'internationalisation (i18n).

## Fonctionnalités

### 📅 Générateur ICS

Créez des fichiers `.ics` (iCalendar) pour générer des événements calendrier. Entrez les détails d'un événement (titre, description, date, heure, lieu, fuseau horaire) et générez un fichier compatible avec les applications calendrier.

### 🕐 Manipulation de Dates

Explorez les différentes opérations sur les dates et heures avec Temporal :

- **Modification de ZonedDateTime** : Ajoutez ou soustrayez des années, mois, jours, heures, minutes et secondes
- **Dates personnalisées** : Créez et manipulez des dates spécifiques
- **Calcul de différences** : Mesurez l'écart entre deux dates/heures
- **Arrondi temporel** : Arrondissez les dates à des unités spécifiques
- **Comparaison et tri** : Comparez et triez des dates

### 🌍 Gestion Internationale

Testez l'internationalisation avec Temporal et Intl :

- Sélectionnez différentes locales et fuseaux horaires
- Explorez les formats de date/heure customisables
- Testez différents systèmes de calendrier

## Démarrage

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera accessible à `http://localhost:5173`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Stack Technologique

- **React 19** : Framework UI
- **TypeScript** : Typage statique
- **Vite** : Build tool moderne et rapide
- **Temporal Polyfill** : Polyfill pour l'API Temporal
- **Intl API** : Internationalisation native JavaScript

## Structure du Projet

```
src/
├── pages/
│   ├── icsGenerator/       # Générateur de fichiers ICS
│   ├── manipulation/       # Manipulation de dates avec Temporal
│   └── internationalHandle/ # Gestion i18n avec Temporal et Intl
└── App.tsx               # Application principale
```
