import { Phase } from '@/types/curriculum';

export const phase7: Phase = {
  phase: 7,
  title: 'Databases & Data Modeling',
  subtitle: 'Relational data modeling, PostgreSQL, SQL queries, Drizzle ORM, and migrations.',
  description:
    'Master persistent storage: relational database architecture, SQL syntax, foreign keys, constraints, indexes, Drizzle ORM schema design, and safe zero-downtime migrations.',
  modules: [
    {
      id: 'mod-11-databases-relational',
      slug: 'databases-relational-modeling',
      title: 'Relational Databases, SQL & Drizzle ORM',
      phase: 7,
      phaseTitle: 'Phase 7 — Databases & Data Modeling',
      description: 'Design robust database schemas in PostgreSQL, write safe SQL queries, and manage migrations with Drizzle ORM.',
      estimatedHours: 14,
      outcomes: [
        'Understand relational database tables, primary keys, foreign keys, and indexes',
        'Write SQL queries for filtering, sorting, joining, and aggregating data',
        'Declare typed schemas and relations using Drizzle ORM in TypeScript',
        'Execute versioned database migrations safely',
      ],
      prerequisites: ['Phase 6: Backend & API Engineering'],
      lessonCount: 2,
      quiz: {
        id: 'quiz-mod-11',
        moduleId: 'mod-11-databases-relational',
        title: 'Database & SQL Checkpoint',
        description: 'Verify your understanding of relational database keys, indexes, and ORMs.',
        passingScore: 75,
        questions: [
          {
            id: 'q7-1',
            question: 'What is the primary role of a Foreign Key constraint in a relational database?',
            options: [
              'To enforce referential integrity between tables, ensuring child rows reference an existing parent row',
              'To translate column names into foreign languages',
              'To encrypt column data on disk',
              'To prevent users outside your country from connecting to the database',
            ],
            correctIndex: 0,
            explanations: {
              0: 'Correct! A foreign key guarantees that child records (e.g. order_items) cannot point to non-existent parent records (e.g. orders).',
              1: 'Incorrect. Foreign keys have nothing to do with spoken languages.',
              2: 'Incorrect. Encryption at rest is handled by storage configuration.',
              3: 'Incorrect. Foreign keys do not restrict geographic IP addresses.',
            },
          },
        ],
      },
      lessons: [
        {
          id: 'les-21-sql-relational-foundations',
          slug: 'sql-and-relational-modeling-basics',
          title: 'Relational Database Foundations & SQL Queries',
          moduleSlug: 'databases-relational-modeling',
          moduleTitle: 'Relational Databases, SQL & Drizzle ORM',
          phase: 7,
          phaseTitle: 'Phase 7 — Databases & Data Modeling',
          readingTimeMinutes: 14,
          objective: 'Design relational tables with primary/foreign keys and write fundamental SQL SELECT, INSERT, UPDATE, and JOIN queries.',
          whyItMatters:
            'Data is the core asset of every software business. Applications come and go, but clean relational data structures endure for decades.',
          prerequisites: ['Phase 6: Backend & API Engineering'],
          sections: [
            {
              id: 'sec-1',
              title: 'Tables, Primary Keys, and Foreign Keys',
              content:
                'A relational database (like PostgreSQL) organizes data into **tables** of rows and columns:\n\n- **Primary Key (PK)**: A unique identifier for every row (e.g. UUID or auto-incrementing integer `id`). No two rows can share the same PK.\n- **Foreign Key (FK)**: A column that references the Primary Key of another table. For example, in an `issues` table, `project_id` references `projects.id`.\n\nForeign keys allow you to model real-world relationships: One-to-Many (One project has many issues) or Many-to-Many (Users belong to many workspaces).',
            },
            {
              id: 'sec-2',
              title: 'The Essential SQL Query Syntax',
              content:
                'SQL is a declarative language where you describe WHAT data you want, not how the computer iterates over it:\n\n```sql\n-- 1. Create\nINSERT INTO projects (name, status) VALUES (\'StackPath v2\', \'active\');\n\n-- 2. Read with Filtering & Sorting\nSELECT id, name, created_at \nFROM projects \nWHERE status = \'active\' \nORDER BY created_at DESC \nLIMIT 10;\n\n-- 3. Relational JOIN\nSELECT issues.title, projects.name AS project_name\nFROM issues\nJOIN projects ON issues.project_id = projects.id\nWHERE issues.status = \'open\';\n```',
            },
          ],
          recap: [
            'Relational databases store structured data in typed tables.',
            'Primary keys uniquely identify rows; foreign keys link related records.',
            'JOIN statements combine data across multiple tables efficiently in a single query.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-7-1',
              question: 'Which SQL clause is used to filter records based on specific conditions?',
              options: ['WHERE', 'ORDER BY', 'GROUP BY', 'LIMIT'],
              correctIndex: 0,
              explanation: 'The WHERE clause specifies search conditions to filter rows.',
            },
          ],
          practicalTask: {
            title: 'Draft a Relational Schema for an E-Commerce Store',
            instruction: 'Draw an entity relationship model for Users, Orders, and OrderItems. Identify which tables hold Primary Keys and which hold Foreign Keys.',
            hints: ['OrderItems needs two foreign keys: order_id and product_id.'],
            expectedOutcome: 'A normalized relational schema with zero redundant customer data.',
          },
          glossaryTerms: ['sql', 'orm'],
        },
        {
          id: 'les-22-drizzle-orm-schema',
          slug: 'drizzle-orm-and-database-migrations',
          title: 'Modern TypeScript ORM with Drizzle & Neon Postgres',
          moduleSlug: 'databases-relational-modeling',
          moduleTitle: 'Relational Databases, SQL & Drizzle ORM',
          phase: 7,
          phaseTitle: 'Phase 7 — Databases & Data Modeling',
          readingTimeMinutes: 14,
          objective: 'Define type-safe database schemas with Drizzle ORM and run automated migrations against Neon serverless Postgres.',
          whyItMatters:
            'Old ORMs (like Hibernate or heavy traditional tools) were slow and abstract. Drizzle ORM gives you pure TypeScript type safety with zero runtime overhead and SQL-like clarity.',
          prerequisites: ['Relational Database Foundations & SQL Queries'],
          sections: [
            {
              id: 'sec-1',
              title: 'Declaring Schemas in Pure TypeScript',
              content:
                'With Drizzle ORM, your database schema is declared in TypeScript files using clean, composable functions:\n\n```typescript\nimport { pgTable, varchar, text, timestamp, integer } from \'drizzle-orm/pg-core\';\n\nexport const issues = pgTable(\'issues\', {\n  id: varchar(\'id\', { length: 36 }).primaryKey(),\n  title: varchar(\'title\', { length: 120 }).notNull(),\n  description: text(\'description\'),\n  status: varchar(\'status\', { length: 20 }).default(\'backlog\').notNull(),\n  createdAt: timestamp(\'created_at\', { withTimezone: true }).defaultNow().notNull(),\n});\n```\n\nTypeScript automatically infers the exact row types: `typeof issues.$inferSelect` and `typeof issues.$inferInsert`!',
            },
            {
              id: 'sec-2',
              title: 'Querying and Migrating with Drizzle Kit',
              content:
                'Queries look almost identical to SQL, but provide full autocomplete and type safety:\n\n```typescript\nimport { eq, desc } from \'drizzle-orm\';\nimport { db } from \'@/lib/db\';\nimport { issues } from \'@/lib/db/schema\';\n\n// Type-safe query with IDE autocomplete on every column!\nconst activeIssues = await db\n  .select()\n  .from(issues)\n  .where(eq(issues.status, \'open\'))\n  .orderBy(desc(issues.createdAt));\n```\n\nTo apply changes to your live PostgreSQL database, run `npx drizzle-kit push` or `npx drizzle-kit generate` to produce audited SQL migration files.',
              callout: {
                type: 'tip',
                title: 'StackPath\'s Production Architecture',
                text: 'StackPath Academy uses Drizzle ORM paired with Neon Serverless Postgres. Check out `src/lib/db/schema.ts` to see how our encrypted snapshots are defined!',
              },
            },
          ],
          recap: [
            'Drizzle ORM provides end-to-end type safety directly mapped to SQL columns.',
            'Schema changes in code generate audited SQL migration files via Drizzle Kit.',
            'Serverless PostgreSQL (Neon) scales seamlessly with Vercel edge and serverless functions.',
          ],
          selfCheckQuestions: [
            {
              id: 'sc-7-2',
              question: 'Why is Drizzle ORM preferred over traditional heavy ORMs in modern serverless applications?',
              options: [
                'It has zero connection bloat, minimal bundle size, and compiles down to direct SQL without heavy runtime overhead',
                'It is the only tool that supports CSS styles',
                'It automatically deletes duplicate rows without asking',
                'It runs inside the browser without a database',
              ],
              correctIndex: 0,
              explanation: 'Drizzle is lightweight and serverless-friendly, providing type safety without the massive memory footprint of traditional ORMs.',
            },
          ],
          practicalTask: {
            title: 'Examine StackPath\'s Drizzle Schema',
            instruction: 'Open `src/lib/db/schema.ts` in this project. Notice how `progressSnapshots` is defined with `syncId`, `ciphertext`, `iv`, `version`, and `updatedAt`.',
            hints: ['Observe how primaryKey() is assigned to syncId.'],
            expectedOutcome: 'Understanding how production Drizzle schemas are structured.',
          },
          glossaryTerms: ['orm', 'sql'],
        },
      ],
    },
  ],
};
