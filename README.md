# MedGuide AI

A comprehensive medical guidance and prescription management application with AI-powered features for healthcare management.

## Project Overview

MedGuide AI is a full-stack application designed to help users manage their medications, prescriptions, and medical information efficiently. It features a modern React frontend, a Node.js backend, and MongoDB database integration.

## 📁 Project Structure

```
medguide-ai/
├── backend/                 # Node.js Express backend server
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── tests/              # Test files
├── medguide-ai-main/       # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── SETUP_GUIDE.md          # Initial setup instructions
├── MONGODB_SETUP.md        # MongoDB configuration guide
└── install.bat             # Installation script
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnushkaApurva/medguide.git
   cd medguide
   ```

2. **Run the installation script**
   ```bash
   ./install.bat
   ```

Or manually:

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm start
   ```

4. **Frontend Setup**
   ```bash
   cd medguide-ai-main
   npm install
   npm run dev
   ```

## 📋 Features

- 💊 **Prescription Management** - Upload, view, and manage digital prescriptions
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔔 **Medication Reminders** - Set reminders for medication schedules
- 📊 **Dashboard** - Personal health overview and statistics
- 🔐 **Secure Authentication** - User login and profile management
- 🏥 **Medical Records** - Store and organize medical documents
- 🆘 **Emergency Contacts** - Quick access to emergency information

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Shadcn UI Components

### Backend
- Node.js
- Express.js
- MongoDB
- RESTful API

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- [MongoDB Setup](./MONGODB_SETUP.md) - Database configuration
- [Backend README](./backend/README.md) - Backend documentation
- [Frontend README](./medguide-ai-main/README.md) - Frontend documentation

## 🔧 Configuration

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/medguide
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

## 📖 Usage

### Running the Application

**Development Mode:**
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd medguide-ai-main
npm run dev
```

**Production Mode:**
```bash
cd medguide-ai-main
npm run build
npm run preview
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd medguide-ai-main
npm test
```

## 🐛 Troubleshooting

For common issues and solutions, refer to:
- [Connection Status](./CONNECTION_STATUS.md)
- [Complete Setup Guide](./COMPLETE_SETUP.md)

## 📝 Available Scripts

### Backend
- `npm start` - Start the server
- `npm test` - Run tests
- `npm run dev` - Run in development mode with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Create a new branch (`git checkout -b feature/your-feature`)
2. Make your changes
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

**Anushka Apurva**
- GitHub: [@AnushkaApurva](https://github.com/AnushkaApurva)

## 📞 Support

For issues, questions, or suggestions, please:
- Open an [Issue](https://github.com/AnushkaApurva/medguide/issues)
- Check existing documentation files
- Review the [Connection Status](./CONNECTION_STATUS.md)

## 🔗 Links

- [GitHub Repository](https://github.com/AnushkaApurva/medguide)
- [Setup Guide](./SETUP_GUIDE.md)
- [MongoDB Documentation](./MONGODB_SETUP.md)

---

**Last Updated:** June 2026
