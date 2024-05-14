### Wykres Gantta
![WykresGantta](https://github.com/SzymonMielecki/2faGen/assets/58358829/c23e18c2-5806-430f-87d7-c4046ad3177f)



# Opis aplikacji
Aplikacja jest pokazem autorskiej implementacji systemu implementacji weryfikacji i logowania dwuskładnikowego

# Dokumentacja techniczna
## Wymagany software
- [npm](https://www.npmjs.com/)
- [Go](https://go.dev/)
- [GNU make](https://www.gnu.org/software/make/)
## Startup
```sh
make -j 2
```
- instaluje wszystkie paczki
- builduje i odpala aplikację
## Frontend
Działający na [CRA](https://create-react-app.dev/)- [Tailwind](https://tailwindcss.com/) frontend służy jako proof of concept. Ma minimalistyczny design i prostą funkcjonalność

#### Env
- **REACT_APP_BACKEND** - adres ip backendu

## Backend
Działający na Stacku [Echo](https://echo.labstack.com/)- [Turso](https://turso.tech/)- [Gorm](https://gorm.io/) backend jest sercem całej aplikacji. Stosuje wstrzykiwanie zależności i jest mocno skomponentyzowany.
#### Moduły
- Db
    - zawiera funkcje i połączenie z bazą danych
- Handlers
    - zawiera wszystkie endpointy
- Mailer
    - zawiera funkcję do wysyłania maili
- State
    - zawiera modele danych i state do wstrzykiwania
#### Endpointy
- `GET /` 
    - zwraca `Hello, World!`
- `POST /register`
    - przyjmuje formularz z polami: name, email, password
    - wysyła maila do weryfikacji
    - zwraca token do którego w bazie jest przypisany kod
- `POST /login`
    - przyjmuje formularz z polami: email, password
    - wysyła maila do weryfikacji
    - zwraca token do którego w bazie jest przypisany kod
- `POST /verify`
    - przyjmuje formularz z polami: token, code
    - sprawdza czy token jest połączony z tym kodem
    - zwraca jsona `{Token: string, Email: string}`

#### Env
- **TURSO_DATABASE_URL** - url bazy danych
- **TURSO_AUTH_TOKEN** - token do autentykacji bazy danych
- **PORT** - port na którym aplikacja jest wystawiona
- **SENDGRID_API_KEY** - klucz do api biblioteki do wysylania maili
- **SENDGRID_EMAIL** - email z którego są wysyłane maile
