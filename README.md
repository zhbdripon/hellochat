# HelloChat

HelloChat is a web-based chatting platform where users can create their own servers, set up channels, and invite friends to join their conversations.

## Features

- **Server Creation**: Users can create their own chat servers.
- **Channel Management**: Create multiple channels within a server for organized discussions.
- **Invite Friends**: Send invites to friends to join your server and chat.
- **Real-time Messaging**: Chat with friends in real-time with an intuitive UI.
- **Secure & Scalable**: Built with modern technologies to ensure security and scalability.

## Technologies Used

- **Frontend**: React, Metarial-UI, Tailwind CSS
- **Backend**: Django Rest Framework
- **Database**: PostgreSQL
- **Real-time Communication**: WebSockets (Django Channels)
- **Deployment**: TBD

## Installation

### Prerequisites

- Node.js v20.18.x (for frontend)
- Python 3.9.x & Pipenv (for backend)
- PostgreSQL (database)
- Docker (optional, for containerized deployment)


### Setup Database

```sh
# Setup Database
CREATE USER your_user_name WITH PASSWORD your_password;
CREATE DATABASE hellochat OWNER your_user_name;
GRANT ALL PRIVILEGES ON DATABASE hellochat TO your_user_name;
```

### Setup Backend
```sh
# Clone the repository
git clone https://github.com/zhbdripon/hellochat.git
cd hellochat

# Install pipenv from https://pipenv.pypa.io/en/latest/ & create environment
pipenv shell

#Install dependencies
pipenv install -r requirements.txt

# Set up environment variables. Run the command and update necessary config in .env
cp .env.example .env

# Load fixtures
python manage.py loaddata server_categories.json
mkdir -p media && cp server/fixtures/assets/server_icons/*.png media/

# Apply migrations
python manage.py migrate

# Start the backend server
python manage.py runserver
```

### Setup Websocket Server
```sh
# Activate environment on separate termainal
pipenv shell

# Run the command 
uvicorn hellochat.asgi:application --port 8080 --workers 4 --log-level debug --reload
```

### Run Redis server

```sh
# Run locally
sudo apt update
sudo apt install redis-server
sudo systemctl start redis

# Or Run redis on docker
docker run -d --name redis -p 6379:6379 redis:7
```

### Setup Frontend
```sh
cd frontend

# Set up environment variables
cp .env.frontend.example .env

# Install dependencies
npm install

# Start the frontend server
npm run dev
```

## Running with Docker
(TBD)

## License
(TBD)

## Contact

For inquiries, reach out at [zhbdripon@gmail.com](mailto\:zhbdripon@gmail.com).

