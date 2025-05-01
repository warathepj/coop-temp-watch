# ซอร์สโค้ดนี้ ใช้สำหรับเป็นตัวอย่างเท่านั้น ถ้านำไปใช้งานจริง ผู้ใช้ต้องจัดการเรื่องความปลอดภัย และ ประสิทธิภาพด้วยตัวเอง

# HenHouse Manager

A comprehensive IoT system for monitoring and managing temperatures in hen house operations.

## Overview

HenHouse Manager provides real-time temperature monitoring for different areas of a poultry facility, including multiple coops, ventilation systems, and processing areas. The system helps maintain optimal temperature conditions for hen health and egg production.

## System Components

The HenHouse Manager consists of four main components:

1. **coop-temp-watch**: React frontend application for temperature monitoring dashboard
2. **coop-vision-architect**: (Simulator) Enhanced visualization frontend with additional features
3. **main-control-backend**: Core backend service for data processing and management
4. **simulator-backend**: Testing utility that generates simulated temperature data

## Features

- Real-time temperature monitoring for multiple coops (A, B, C)
- Ventilation system temperature tracking
- Processing area temperature monitoring
- Egg storage temperature monitoring
- Customizable temperature thresholds for different areas
- Visual alerts for out-of-range temperatures
- WebSocket-based real-time updates

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**:

```bash
# Simulator
git clone https://github.com/warathepj/coop-vision-architect.git
# Simulator Backend
git clone https://github.com/warathepj/henhouse-sim-backend.git
# Main Control
git clone https://github.com/warathepj/coop-temp-watch.git
# Main Control Backend
git clone https://github.com/warathepj/henhouse-main-control-backend.git

```

2. **Install dependencies for all components**:

```bash
# Install frontend dependencies
cd coop-temp-watch
npm install
cd coop-vision-architect
npm install

# Install backend dependencies
cd henhouse-main-control-backend
npm install
cd henhouse-sim-backend
npm install
```

3. **Configure environment variables**:

- Copy `.env.example` to `.env` in each component directory
- Update the variables with your specific configuration

## Running the Application

1. **Start the backend services**:

```bash
# Start main backend
cd henhouse-main-control-backend
npm run dev

# Start simulator in a new terminal
cd henhouse-sim-backend
npm run dev
```

2. **Start the frontend applications**:

```bash
# Start monitoring dashboard
cd coop-temp-watch
npm run dev

# Start enhanced visualization
cd coop-vision-architect
npm run dev
```

## Technology Stack

- **Frontend**:

  - React
  - TypeScript
  - Vite
  - shadcn-ui
  - Tailwind CSS

- **Backend**:
  - Node.js
  - WebSocket
  - MQTT

## Development

### Project Structure

```
HenHouse-Manager/
├── coop-temp-watch/        # Main monitoring dashboard
├── coop-vision-architect/  # Enhanced visualization frontend (Simulator)
├── main-control-backend/   # Core backend service
└── simulator-backend/      # Temperature simulation service
```

## License

MIT
