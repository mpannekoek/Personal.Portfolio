---
slug: "mssql2025-vector-search"
title: "SQL Server 2025 - AI Vector search"
date: "2026-03-26"
description: "Reflections on a Microsoft Netherlands event about Vector Search in SQL Server 2025"
author: "Martijn Pannekoek"
tags: ["Microsoft", "SQL Server 2025", "Data", "AI"]
published: true
image: "/api/blogs/assets/002-mssql2025-vector-search.svg"
---

# SQL Server 2025 and Vector Search

Yesterday I attended an event at Microsoft Netherlands where one of the main topics was the new Vector Search capability in SQL Server 2025. It was one of those sessions that immediately makes you think less about hype and more about practical implementation: how do we bring AI-style search closer to the systems companies already rely on every day?

Once I got home, I wanted to try this feature for myself. In this blog post, I want to walk through the steps I took to explore Vector Search in SQL Server 2025 and explain them a bit further for anyone who wants to follow a similar path.

## Starting SQL Server 2025 in Docker

To get started, I first spun up a Docker container running SQL Server 2025 so I had a local environment to experiment with. I did that as follows:

Create a docker-compose.yml:
```
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2025-latest
    container_name: sqlserver2025
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=<your_password>
    ports:
      - "1433:1433"
    volumes:
      - sqlserver2025:/var/opt/mssql

volumes:
  sqlserver2025:
```

Create the container:
```
docker compose up -d
```

Now it's possible to connector to your server `localhost` with user `sa` and your choosen `password`. I used VS Code to do that.