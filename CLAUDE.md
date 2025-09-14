# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Friends-themed café adventure game built with Next.js 15, React 19, and the Google Gemini AI SDK. The player is Noily, owner of "Blossom" café in Costa Rica, where a famous Friends character visits. The game generates narrative story content and cartoon-style images based on player interactions in a conversational format.

## Key Architecture

### Core Game Flow
- **Hook**: `useZombieGame()` in `src/app/hooks/use-zombie-game.ts` manages game state and API calls
- **Story Generation**: `/api/generate-story` endpoint uses Gemini 2.5 Flash Lite to create narratives
- **Image Generation**: `/api/generate-image` endpoint creates 70s cartoon style images  
- **Types**: All interfaces defined in `src/lib/types.ts`
- **Game Logic**: Prompts in `src/lib/prompts.ts`, constants in `src/lib/consts.ts`

### Game Components Structure
- Game-specific components in `src/app/componentes/` (Spanish naming)
- Reusable UI components in `src/components/` and `src/components/ui/`
- Uses conversation pattern with scroll-to-bottom functionality

### API Integration
- Uses Google Gemini AI via `@ai-sdk/google` and `ai` packages
- Requires `GOOGLE_GENERATIVE_AI_API_KEY` environment variable
- Story and image generation are separate API calls for better UX

## Development Commands

```bash
# Development with Turbopack
npm run dev

# Build with Turbopack  
npm run build

# Production server
npm start

# Lint and format with Biome
npm run lint
npm run format
```

## Key Dependencies

- **AI**: `@ai-sdk/google`, `ai` for Gemini integration
- **UI**: Radix UI components, Tailwind CSS v4, Lucide icons
- **Code Quality**: Biome for linting/formatting (configured in `biome.json`)
- **Framework**: Next.js 15 with App Router, React 19

## Game Mechanics

The game focuses on a cozy café setting with Friends characters in Costa Rica. Players can choose from 8 different characters: Noily (café owner), Kenneth, Katherine, Joshua, Stephen, Ericka, Jason, and Laura. Each character has unique prompts and descriptions. Game expects Spanish prompts and generates Spanish narratives with English image descriptions. Story continuation requires conversation history. Images use 70s cartoon style with 9:16 aspect ratio. The narrative aims for light, friendly interactions leading to happy endings where everyone feels welcome.

### Character System
- **Character Selection**: Players choose from 8 characters at game start with 32x32 SVG profile images
- **Character Data**: Defined in `src/lib/characters.ts` with descriptions and profile images
- **Character-Specific Prompts**: Each character has unique story prompts in `src/lib/prompts/[character].ts`
- **Prompt Handler**: `src/lib/prompts/index.ts` manages character-specific prompt selection