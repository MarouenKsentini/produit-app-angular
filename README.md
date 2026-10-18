# TP2 — MVVM Angular (`produit-app`)

Client **Angular** pour l'API REST Spring Boot (`/api/produits`, `http://localhost:8080`), illustrant l'architecture **MVVM** (_Model – View – ViewModel_).

Fonctionnalités : lister, ajouter, modifier, supprimer, **rechercher par libellé**, **filtrer par prix max**, **filtrer par état du stock**.

## Prérequis

- Node.js + npm, Angular CLI
- Le back-end **Spring Boot** qui tourne sur `http://localhost:8080`
  (projet de l'atelier MVC : branche `main` ; lancer via `runapp.bat` ou `mvn spring-boot:run`)

## Correspondance MVVM

| Couche | Fichier | Rôle |
|---|---|---|
| **Model** | `src/app/models/produit.model.ts` | L'entité `Produit` |
| **Model** | `src/app/services/produit.service.ts` | Seul endroit qui utilise `HttpClient` et connaît l'URL `"/api/produits"` |
| **ViewModel** | `src/app/viewmodels/produit.viewmodel.ts` | État (`signal`), état dérivé (`computed` : `produitsFiltres`, `nombreAffiches`…), actions (`charger`, `enregistrer`, `supprimer`, filtres) |
| **View** | `src/app/views/produit-list/produit-list.component.{ts,html,css}` | Template : `@if` / `@for`, `[(ngModel)]="vm.xxx"`, délègue au ViewModel |

Le composant (View) ne contient ni HTML logique ni appels HTTP : la `confirm()` reste dans le composant, tout le reste passe par le ViewModel → le service.

## Lancer

```bash
npm install
npm start        # ng serve --proxy-config proxy.conf.json  -> http://localhost:4200
```

### Pourquoi un proxy ?

L'application appelle l'URL **relative** `/api/produits`. Le fichier `proxy.conf.json` fait suivre les requêtes `/api/*` du serveur de dev (4200) vers Spring (8080), ce qui évite le CORS. Sans le proxy, l'appel partirait vers 4200 (404) ou serait bloqué par le navigateur.

## Tester

```bash
npm test         # tests unitaires (Vitest + jsdom) : ProduitService (GET/POST/DELETE)
npm run build    # build de production
```

## Comportement réseau attendu

| Action dans l'interface | Méthode et URL | Code attendu |
|---|---|---|
| Chargement | `GET /api/produits` | 200 |
| Ajouter | `POST /api/produits` (puis GET) | 200 / 201 |
| Modifier | `PUT /api/produits/{id}` (puis GET) | 200 |
| Supprimer | `DELETE /api/produits/{id}` | 204 |
| Recherche / filtres | aucune requête (calculé dans le navigateur) | — |

## Stack

- Angular 22 — composants **standalone**, **signals**, `computed`, syntaxe `@if` / `@for`
- `HttpClient`, `FormsModule`, `DecimalPipe`
- Bootstrap 5.3.3 (CDN)
- Tests : **Vitest** + jsdom
