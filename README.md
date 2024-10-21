# Marvel Dream Team Selector

Marvel Dream Team Selector is a Next.js application that allows users to create their ultimate Marvel superhero soccer team. This interactive web app integrates with the Marvel API to fetch character data and provides a drag-and-drop interface for team creation.

## Tech Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS, Flowbite
- **API**: Custom Next.js API routes
- **Containerization**: Docker, Docker Compose
- **Node.js**: v18

## Features

1. **Marvel Character Integration**: Fetch Marvel characters using a custom API endpoint, providing detailed information about each character.
2. **Interactive Team Creation**: Create a six-aside soccer team using a draggable interface. Position characters dynamically on the field.
3. **Dynamic Layout for Team Arrangement**: Place characters in different positions, providing a flexible way to organize the team on the field.
4. **Persistent Team Data**: Save created teams and view them later using dedicated API routes.
5. **Search & Filter**: Search through characters using a filtering feature.

## File Structure

```
.
├── Dockerfile
├── README.md
├── docker-compose.yml
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── public
│   ├── characters.json
│   ├── img
│   └── teams.json
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── characters
│   │   │   └── saveTeam
│   │   ├── characters
│   │   ├── create
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   └── teams
│   └── components
│       ├── CharacterCard.jsx
│       ├── CharacterSearch.jsx
│       ├── FetchButton.jsx
│       ├── Field.jsx
│       ├── Navbar.jsx
│       ├── Sideline.jsx
│       └── TeamCard.jsx
└── tailwind.config.js
```

## Setup and Installation

### Prerequisites

- Docker
- Docker Compose

### Steps to Run the Application

1. Clone the repository:
   ```
   git clone <repository-url>
   cd dream-team-selector
   ```

2. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

3. Access the application at `http://localhost:3000`

### Development

For development purposes, the Docker setup mounts the local directory to the container, enabling hot-reloading. Any changes made to the code will be reflected in the running application.

## API Limitation Note

When fetching characters, there may be a long wait time. This is due to the Marvel API limitation of 100 characters per request. Additionally, we filter out characters without thumbnails for aesthetic purposes, which may further reduce the number of characters displayed.
