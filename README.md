# Premier League Fantasy

A full-stack Premier League fantasy application built with **Spring Boot** for the backend and **React + Vite** for the frontend.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Project Overview

This project allows users to browse Premier League players, manage teams, and view stats. It consists of:

- **Backend**: Spring Boot + PostgreSQL
- **Frontend**: React + TypeScript + Vite + ShadCN UI
- **Features**:
  - CRUD operations for players
  - Filtering by team, position, nation
  - Responsive UI
 

---

## Technologies

- Java 21, Spring Boot 3
- PostgreSQL
- React, TypeScript, Vite
- Maven, npm

---

## Setup

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Backend

```bash
cd frontend
npm install
npm run dev
```


##API Endpoints

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api/v1/player`           | Get all players            |
| GET    | `/api/v1/player?team=`     | Filter players by team     |
| GET    | `/api/v1/player?name=`     | Filter players by name     |
| GET    | `/api/v1/player?position=` | Filter players by position |
| GET    | `/api/v1/player?nation=`   | Filter players by nation   |
| POST   | `/api/v1/player`           | Add a new player           |
| PUT    | `/api/v1/player`           | Update a player            |
| DELETE | `/api/v1/player/{id}`      | Delete a player            |
