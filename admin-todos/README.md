# Development

**To start the project**

1. Lift the data base

```
docker compose up -d
```

2. Rename the .env.template to .env
3. Replace the env variables
4. Execute the command `npm install`
5. Execute the command `npm run dev`
6. Execute these prisma commands

```
npx prisma migrate dev
npx prisma generate
```

7. Execute the seed to [create the local database](localhost:3000/api/seed)

## Note: Default user

**Default user:** test@gmail.com
**Default pass:** Test#44

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
