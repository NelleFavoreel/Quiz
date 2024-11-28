# Quiz App  

### Inhoud  
1. [Projectbeschrijving](#projectbeschrijving)
2. [Installatie](#installatie)  
3. [Functies](#functies)  
4. [Gebruikte Technologieën](#gebruikte-technologieën)  
6. [Bronnen](#bronnen)

---

## Projectbeschrijving  

De Quiz App is een interactieve webapplicatie gebouwd met React, Express.js en MongoDB. Het biedt een leuke en leerzame ervaring voor spelers door quizvragen te beantwoorden binnen een tijdslimiet. Spelers kunnen kiezen uit verschillende categorieën, zoals dieren, wetenschap, en geschiedenis. Quizmasters kunnen nieuwe vragen toevoegen, die direct in de database worden opgeslagen voor toekomstig gebruik.  

Dit project heeft als doel om een dynamische en schaalbare applicatie te creëren met een duidelijke scheiding tussen frontend en backend, en biedt tegelijkertijd de mogelijkheid om real-time communicatie te implementeren met behulp van WebSockets.

---
## Installatie  

### Vereisten:  
- Node.js en npm geïnstalleerd  
- MongoDB instance (lokaal of cloud, zoals MongoDB Atlas)  

### Stappen:  
**Kloon de repository**  
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```
**Instaleer dependencies**
   ```bash
   npm install
   ```
### Backend:

   ```bash
   cd backend
   ```
   ```bash
   node index.js
   ```
### Frontend:
```bash
cd frontend
```
```bash
npm run dev
```
---
## Functies  

### Voor Spelers:  
- **Categoriekeuze:** Selecteer je favoriete categorie (dieren, wetenschap, geschiedenis).  
- **Random vragen:** De vragen worden in willekeurige volgorde gepresenteerd.  
- **Timer:** 15 seconden per vraag, met visuele aanduiding als er minder dan 5 seconden over zijn.  
- **Feedback:** Foute antwoorden tonen het juiste antwoord (groen gemarkeerd).  
- **Top 5 scores:** Bekijk de hoogste scores na afloop van de quiz.  

### Voor Quizmasters:  
- **Vraagbeheer:** Voeg nieuwe vragen toe, inclusief antwoorden en categorie.  
- **Direct gebruik:** Toegevoegde vragen zijn direct beschikbaar voor spelers.
---
## Gebruikte Technologieën  

1. **React.js**  
   - Voor het bouwen van een dynamische gebruikersinterface.  
   - [React Learn Documentation](https://react.dev/learn)  

2. **Express.js**  
   - Backend framework voor het verwerken van API-aanvragen en communicatie met de database.  
   - [Express.js Website](https://expressjs.com/)  

3. **MongoDB**  
   - Database voor het opslaan van quizvragen en scores.  
   - [MongoDB Website](https://www.mongodb.com/)  

4. **WebSockets**  
   - Onderzocht voor het implementeren van real-time updates, zoals scores en nieuwe vragen.  
   - [WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

---

## Bronnen
- [Websockets API](https://react.dev/learn)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/)
- [React documentation](https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial)
- [Tutorial mongoDB + express](https://kinsta.com/nl/blog/mongodb-database-aanmaken/)
- [Quiz vragen dieren](https://kwis.app/quiz-vragen-dieren-natuur-makkelijk)
- [Quiz vragen geschiedenis](https://pubquiznederland.nl/pubquiz-vragen/geschiedenis/ )
- [Gids voor monogDB](https://www.npmjs.com/package/websocket-express)
- [Node.js + websockets](https://www.blackslate.io/articles/real-time-communication-with-nodejs-express-websockets)
- [React verbinden MongoDB](https://www.geeksforgeeks.org/how-to-connect-mongodb-with-reactjs/ )
---
## Auteur
Nelle Favoreel




