# StarWars API Test

- **Live Demo:** [frontend-code-test-main.vercel.app](https://frontend-code-test-main.vercel.app)

## Assignment

This repository contains a technical assignment with the goal of creating two pages using React Router based on provided mockups. The data is fetched from the Star Wars API using the pre-configured urql client.

**Pages:**

- **Home page (`/`)**: Lists all Star Wars characters, linking each to its own detail page.
- **Person page (`/person/:personId`)**: Displays details about the selected character, including:
  - List of producers they have worked with and the count.
  - Birth year.
  - Species' average height.
  - Paginated list of films with title, release date, and count of planets without water.

## Setup

1. **Use project node version:**

    ```bash
    nvm use
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Download GraphQL Schema:**

    ```bash
    npm run download-schema
    ```

4. **Generate GraphQL Types (output in `src/generated/graphql.ts`):**

    ```bash
    npm run codegen
    ```

5. **Start development mode:**

    ```bash
    npm run dev
    ```

## Testing

- **Run tests:**

    ```bash
    npm test
    ```

- **Watch tests:**

    ```bash
    npm run test:watch
    ```

- **Generate coverage:**

    ```bash
    npm run test:coverage
    ```

## Additional Notes

- The project includes comprehensive tests.
- Configured with scripts for testing and code coverage.
- Check the [repository](https://github.com/javihertz/frontend-code-test-main) for further details.

## Resources

- **Technologies:** TypeScript, CSS, JavaScript, HTML
