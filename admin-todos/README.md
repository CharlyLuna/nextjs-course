# Development

1. Lift the data base

```
docker compose up -d
```

2. Rename the .env.template to .env
3. Replace the env variables
4. Execute the seed to [create the local database](localhost:3000/api/seed)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
