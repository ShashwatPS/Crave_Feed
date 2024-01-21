CraveFeed
CraveFeed is a delectable social media app for food enthusiasts. Powered by NEXT.js for a sleek frontend, tRPC for a dynamic backend, and PostgreSQL with Prisma for robust data management. Users can share, discover, and engage with food-related content through posts, comments, and likes. CraveFeed is the go-to platform for building a community around the shared love for all things food. Join us, where cravings meet creativity!

Getting Started
Prerequisites
Node.js (version x.x.x)
PostgreSQL (version x.x.x)
Installation
Clone the repository:

git clone https://github.com/your-username/foodiegram.git

Install dependencies:

cd foodiegram
npm install
Set up the .env file: Create a .env file in the project root and add the following:

DATABASE_URL=postgresql://{username}:{password}@localhost:5432/{db_name}?schema=public
Setting Up Backend Server: Exclude client from tsconfig , then run :-

tsc -b
Contributing
We welcome contributions! Please follow our Contribution Guidelines for details on how to contribute to this project.

License
This project is licensed under the MIT License - see the LICENSE file for details.