# Prompt Studio

A professional AI prompt generator for image and video generation with precision control.

## Features

- **5-Step Wizard**: Basic Info → Instructions → Model Lock → Additional Details → Export
- **Professional UI**: Ant Design components with custom purple theme
- **Dark/Light Theme**: Full theme support with proper contrast
- **Custom Inputs**: Add your own values to any field
- **Auto-Save**: Form data persists across sessions
- **JSON Export**: Copy to clipboard or download as file

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Ant Design** for UI components
- **Zustand** for state management
- **IBM Plex Sans** typography

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Basic Info**: Define task type, input image, and background description
2. **Instructions**: Configure preservation settings and integration style
3. **Model Lock**: Set precise controls for body parts and identity
4. **Additional Details**: Fine-tune visual style and lighting
5. **Export**: Copy or download your JSON prompt

## JSON Output

The app generates structured JSON prompts compatible with:
- Flux
- Kling
- Midjourney
- DALL-E
- Stable Diffusion

## License

MIT
