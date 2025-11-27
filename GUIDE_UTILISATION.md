# Système Complet de Gestion de Médicaments - Guide d'Utilisation

## 🎯 Vue d'ensemble

Cette application Next.js offre une plateforme complète de recherche et de gestion de médicaments avec deux flux utilisateur distincts :

1. **Utilisateur Client** : Recherche et consultation de médicaments
2. **Pharmacien** : Gestion complète de l'inventaire des médicaments

---

## 🚀 Démarrage Rapide

### Installation et lancement

```bash
cd C:\Users\ibrau\Documents\PROJECTS\AI_Africa_Camp\ai_africa_camp_medicine_app-NEXTJS\medicine_search
npm install
npm run dev
```

L'application sera disponible à `http://localhost:3000`

---

## 📖 Guide Utilisateur

### 1️⃣ **Pour les Clients - Recherche de Médicaments**

#### Accès
- URL : `http://localhost:3000/home`

#### Fonctionnalités
- **Recherche en temps réel** : Tapez dans la barre de recherche pour filtrer les médicaments par :
  - Nom du médicament
  - Dosage
  - Forme (comprimé, gélule, etc.)
  - Fabricant

- **Grille d'affichage** : 4 colonnes avec :
  - Nom du médicament
  - Prix en FCFA
  - Dosage et forme
  - Statut de disponibilité (couleur codé)

- **Accès aux détails** : Cliquez sur une carte pour voir les détails complets

#### Page de Détails
- Image du produit
- Description complète
- Indications médicales
- Contre-indications
- Effets secondaires
- Prix et disponibilité

---

### 2️⃣ **Pour les Pharmaciens - Gestion de l'Inventaire**

#### Point d'Accès
- URL : `http://localhost:3000/pharma`

#### 🔐 Connexion

**Compte de Démo**
```
Email: pharma@test.com
Mot de passe: password123
```

**Créer un Nouveau Compte**
- Cliquez sur "Créer un compte"
- Remplissez :
  - Nom complet
  - Nom de la pharmacie
  - Email unique
  - Mot de passe (min. 6 caractères)

#### 📊 Tableau de Bord (Dashboard)
- URL après connexion : `/pharma/dashboard`
- Affiche les informations de la pharmacie
- Accès rapide aux fonctionnalités
- Bouton de déconnexion

#### 💊 Gestion des Médicaments
- URL : `/pharma/medicines`

**Fonctionnalités**
- **Liste complète** : Tableau avec tous les médicaments
- **Recherche** : Filtrer par nom ou fabricant
- **Statut de disponibilité** : Code couleur (vert, orange, rouge)
- **Actions par ligne** :
  - **Détails** : Voir les informations complètes
  - **Éditer** : Modifier le médicament

#### ✏️ Édition de Médicament
- URL : `/pharma/medicines/[id]/edit`
- Modifier les champs :
  - Nom
  - Dosage
  - Forme
  - Fabricant
  - Prix
  - Disponibilité (dropdown)
  - Description

#### 📋 Détails du Médicament (Pharmacien)
- URL : `/pharma/medicines/[id]/details`
- Affichage complet avec toutes les informations
- Accès direct à l'édition
- Retour à la liste

#### ⚙️ Paramètres du Compte
- URL : `/pharma/parameters`
- Modifier le profil
- Changer les paramètres de la pharmacie
- Gérer la sécurité
- Déconnexion

---

## 📦 Architecture

### Structure des Dossiers

```
app/
├── (home)/                    # Routes publiques
│   └── home/
│       ├── page.tsx          # Page de recherche
│       └── details/[id]/     # Détails du médicament
├── (pharmacie)/              # Routes pharmacien (protégées)
│   └── pharma/
│       ├── page.tsx          # Page d'accueil pharmacien
│       ├── signin/           # Connexion
│       ├── signup/           # Inscription
│       ├── dashboard/        # Tableau de bord
│       ├── medicines/        # Gestion des médicaments
│       │   ├── page.tsx      # Liste des médicaments
│       │   └── [id]/
│       │       ├── edit.tsx  # Édition
│       │       └── page.tsx  # Détails
│       └── parameters.tsx    # Paramètres du compte
└── layout.tsx               # Layout principal avec AuthProvider
components/
├── search.tsx               # Composant de recherche (filtrage en temps réel)
└── ...autres composants
lib/
├── mocks/
│   └── medicines.ts        # Données mock des médicaments
├── context/
│   └── AuthContext.tsx     # Contexte d'authentification
└── utils.ts
```

### Données Mock

**Fichier** : `lib/mocks/medicines.ts`

Exporte :
- `Medicine` : Interface TypeScript
- `medicines[]` : Array de 21 médicaments avec :
  - name, dosage, form, description
  - indications[], contraindications[], sideEffects[]
  - manufacturer, availability, price

---

## 🔐 Système d'Authentification

### AuthContext (`lib/context/AuthContext.tsx`)

**État**
- `user` : Utilisateur connecté (null si non connecté)
- `isLoggedIn` : Boolean
- `login()` : Fonction de connexion
- `signup()` : Fonction d'inscription
- `logout()` : Fonction de déconnexion

**Stockage**
- localStorage clé `pharmacist_users` : Liste des comptes
- localStorage clé `pharmacist_user` : Utilisateur actuellement connecté

**Sécurité (Démo)**
- Mots de passe stockés en localStorage (DÉMO SEULEMENT)
- En production, utiliser une API sécurisée avec hachage

---

## 🎨 Fonctionnalités de Recherche

### Recherche Client

**Fichier** : `components/search.tsx`

- **Temps réel** : Mise à jour instantanée avec useMemo
- **Champs recherchés** :
  - Name (insensible à la casse)
  - Dosage
  - Form
  - Manufacturer

- **Affichage dynamique** : Le nombre de résultats s'actualise
- **Navigation** : Clic pour accéder aux détails

### Filtrage Pharmacien

**Fichier** : `app/(pharmacie)/pharma/medicines/page.tsx`

- Recherche dans le tableau
- Filtre par nom et fabricant
- Affichage du total des résultats

---

## 📱 Pages Principales

| URL | Type | Description |
|-----|------|-------------|
| `/home` | Public | Recherche client |
| `/home/details/[id]` | Public | Détails médicament |
| `/pharma` | Public | Hub pharmacien |
| `/pharma/signin` | Public | Connexion |
| `/pharma/signup` | Public | Inscription |
| `/pharma/dashboard` | Protégé | Tableau de bord |
| `/pharma/medicines` | Protégé | Gestion médicaments |
| `/pharma/medicines/[id]/details` | Protégé | Détails (pharmacien) |
| `/pharma/medicines/[id]/edit` | Protégé | Édition |
| `/pharma/parameters` | Protégé | Paramètres compte |

---

## 🔒 Protection des Routes

Les pages pharmacien vérifient via `useEffect` :
```typescript
React.useEffect(() => {
  if (!isLoggedIn) {
    router.push("/pharma/signin");
  }
}, [isLoggedIn, router]);
```

Si non connecté → Redirection vers la connexion

---

## 🧪 Données de Test

### 21 Médicaments Disponibles

```
1. Paracétamol (500mg) - En stock
2. Ibuprofène (400mg) - Stock limité
3. Amoxicilline (1g) - Rupture
4. Doliprane (1000mg) - En stock
5. Metformine (850mg) - En stock
... et 16 autres
```

---

## 💡 Cas d'Usage

### Scénario 1 : Recherche de Médicament
1. Aller sur `/home`
2. Taper "paracétamol" dans la barre
3. Voir les résultats filtrés en temps réel
4. Cliquer sur une carte pour voir les détails

### Scénario 2 : Pharmacien Gère l'Inventaire
1. Aller sur `/pharma`
2. Cliquer "Se connecter"
3. Utiliser : `pharma@test.com` / `password123`
4. Aller sur "Gérer les médicaments"
5. Chercher un médicament
6. Cliquer "Éditer"
7. Modifier les informations
8. Enregistrer

### Scénario 3 : Créer un Nouveau Compte Pharmacien
1. Aller sur `/pharma/signup`
2. Remplir le formulaire
3. Cliquer "Créer un compte"
4. Être redirigé vers le dashboard
5. Accéder à la gestion des médicaments

---

## 📝 Notes Importantes

- **Données persistantes** : localStorage (démo) - Se réinitialise au vidage du cache
- **21 médicaments** : Dataset fixe pour la démo
- **Sans Backend** : Simulation complète côté client
- **Responsive** : Interface adaptée mobile et desktop
- **TypeScript** : Typage complet pour la sécurité

---

## 🛠️ Développement Futur

Suggestions pour amélioration :
- [ ] Intégration API backend (Node.js, Django, etc.)
- [ ] Base de données (PostgreSQL, MongoDB)
- [ ] Authentification JWT
- [ ] Pagination des médicaments
- [ ] Export/Import CSV
- [ ] Analytics et statistiques
- [ ] Gestion des commandes
- [ ] Notifications en temps réel

---

**Bonne exploration de l'application ! 🚀**
