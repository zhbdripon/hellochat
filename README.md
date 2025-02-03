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

### Setup Backend

```sh
# Clone the repository
git clone https://github.com/zhbdripon/hellochat.git
cd hellochat

# Install dependencies
pipenv shell

# Set up environment variables
cp .env.example .env

# Apply migrations
python manage.py migrate

# Start the backend server
python manage.py runserver
```

### Setup Frontend

```sh
cd ../frontend

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

