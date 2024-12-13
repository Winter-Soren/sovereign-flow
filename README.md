Getting Started

### 1. Initialize Prisma

To initialize Prisma, use:

```bash
bunx prisma init
```

### 2. Push the Database Schema

To push the database schema, use:

```bash
bunx prisma db push
```

### 3. Start the Development Server

To start the development server, run:

```bash
bun dev
```

### 4. Start Ngrok

To start Ngrok and expose your local server, use:

```bash
ngrok http https://localhost:3000 --host-header=rewrite
```

### 5. Start Prisma Studio

To start Prisma Studio, use:

```bash
bunx prisma studio
```

This order ensures that Prisma is set up and the database schema is in place before starting the development server and exposing it via Ngrok.
