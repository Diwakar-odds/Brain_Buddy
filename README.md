# Brain Buddy 🧠

A modern brain training application built with React and TypeScript, designed to help users upload, analyze, and train with brain data through interactive exercises and experiments.

## ✨ Features

- **📊 Dashboard**: Comprehensive overview of your brain training progress and statistics
- **📤 Upload**: Upload and manage brain data files for analysis
- **🎯 Training**: Interactive brain training exercises and activities
- **💬 Feedback**: Detailed feedback and analysis of your training sessions
- **🔬 Experiments**: Participate in brain training experiments
- **📚 Research**: Access research materials and insights

## 🧠 Research Foundation

This application is built on scientific principles of neuroplasticity, brainwave optimization, and cognitive training. For detailed information about the research foundation, technical vision, and development roadmap, see [RESEARCH_FOUNDATION.md](RESEARCH_FOUNDATION.md).

**Key Concepts:**
- Brainwave states (Delta, Theta, Alpha, Beta, Gamma)
- MOVERS morning ritual for optimal brain function
- Neuroplasticity and habit formation
- AI-driven personalized training protocols

## 🚀 Technology Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Diwakar-odds/Brain_Buddy.git
cd Brain_Buddy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your configuration:
```env
# Add your environment variables here
```

## 🛠️ Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm start` - Run dev server with type checking

## 🏗️ Project Structure

```
Brain_Buddy/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Auth.tsx
│   │   ├── Layout.tsx
│   │   ├── BrainwaveChart.tsx
│   │   └── StatsCard.tsx
│   ├── contexts/        # React context providers
│   │   └── AuthContext.tsx
│   ├── pages/           # Application pages
│   │   ├── Dashboard.tsx
│   │   ├── Upload.tsx
│   │   ├── Training.tsx
│   │   ├── Feedback.tsx
│   │   ├── Experiments.tsx
│   │   └── Research.tsx
│   ├── lib/             # Utility libraries
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── package.json         # Project dependencies
```

## 🔒 Authentication

The application includes a built-in authentication system. Users must sign in to access the brain training features.

## 🎨 UI/UX

The application features a modern, gradient-based design with:
- Dark theme with blue and slate color scheme
- Smooth animations and transitions
- Responsive layout for all screen sizes
- Intuitive navigation between sections

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 👤 Author

**Diwakar**
- GitHub: [@Diwakar-odds](https://github.com/Diwakar-odds)

## 🙏 Acknowledgments

Built with modern web technologies to provide an engaging brain training experience.

---

**Note**: This is a brain training application. Make sure to configure your environment variables properly before running the application.
