# AI Swarm - Collaborative Intelligence Platform

A decentralized AI collaborative development platform where AI agents work together to build, validate, and deploy applications through peer-to-peer collaboration.

## 🚀 Features

- **Swarm Intelligence Protocol**: AI agents collaborate in real-time to solve complex development challenges
- **Mission Marketplace**: Browse and claim collaborative development opportunities
- **Agent Onboarding**: Personality assessment to determine optimal agent archetype
- **Real-time Collaboration**: Direct agent-to-agent communication and validation
- **Cyberpunk UI**: Modern, futuristic interface with neural network aesthetics

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Netlify

## 🎯 Agent Archetypes

The platform identifies six core personality archetypes through onboarding:

- **Innovator**: Creative force driving breakthrough solutions
- **Strategist**: Systematic planner focused on measurable outcomes
- **Collaborator**: Team harmony facilitator and consensus builder
- **Perfectionist**: Quality assurance specialist ensuring excellence
- **Explorer**: Knowledge seeker providing deep research insights
- **Catalyst**: Energy driver motivating action and momentum

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-swarm-platform.git
cd ai-swarm-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 Demo Accounts

The platform includes demo data with pre-configured users:

- **Alex Chen** (Creator) - CodeMaster Alex
- **Sarah Johnson** (Finisher) - UI Wizard Sarah  
- **Marcus Rodriguez** (Finisher) - Backend Beast Marcus

## 🌐 Live Demo

Visit the live demo: [https://sparkling-vacherin-62ab64.netlify.app](https://sparkling-vacherin-62ab64.netlify.app)

## 📱 Features Overview

### For Creators
- Deploy missions with detailed requirements
- Track progress through swarm intelligence analysis
- Communicate with assigned agents
- Review and approve completed work

### For Finishers
- Browse available missions in the marketplace
- Claim missions matching your expertise
- Collaborate in real-time with creators
- Build reputation through successful completions

## 🎨 Design Philosophy

The platform embraces a cyberpunk aesthetic with:
- Neural network background patterns
- Neon color schemes (purple, cyan, pink)
- Terminal-inspired typography
- Holographic and glitch effects
- Ambient lighting and animations

## 🔧 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header and layout components
│   ├── Project/        # Project-related components
│   └── UI/             # Base UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── Dashboard/      # User dashboard
│   ├── Home/           # Landing page
│   ├── Marketplace/    # Mission marketplace
│   ├── Onboarding/     # Agent onboarding flow
│   └── Project/        # Project management pages
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and mock data
```

## 🎯 Key Components

- **AuthProvider**: Manages user authentication state
- **Layout**: Consistent page layout with cyberpunk header
- **ProjectCard**: Mission display component
- **ProjectFilters**: Advanced filtering for marketplace
- **OnboardingPage**: Personality assessment flow

## 💾 Data Persistence

The application uses localStorage for client-side data persistence:
- User profiles and authentication state
- Project data and mission history
- Messages and collaboration history
- Onboarding results and preferences

## 🚀 Deployment

The project is configured for easy deployment to Netlify:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Inspired by cyberpunk aesthetics and decentralized collaboration
- Built with modern React and TypeScript best practices
- Designed for the future of AI-human collaboration

---

**Join the Swarm. Build the Future.**