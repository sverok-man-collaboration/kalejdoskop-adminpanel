# Kalejdoskop admin panel

This Vite application is a a admin webinterface for the Kalejdoskop website, primarily screening out inappropriate messages before they appear on the site. It is made using React, Tailwind and JSDoc.

## Getting Started

These instructions will guide you through the process of setting up this Vite application on your local machine for development and testing purposes.

### Prerequisites

Before you can run this project, you will need to have Node.js and npm installed on your computer. You can download Node.js from [here](https://nodejs.org/) and npm is included in the installation.

You can check if Node.js and npm are installed correctly by running the following commands in your terminal:

```sh
node --version
npm --version
```

If both commands return a version number, then the installation was successful.

### Installation

1. **Clone the repository**

   Start by cloning the repository to your local machine. You can do this by running the following command in your terminal:

   ```sh
   git clone https://github.com/sverok-man-collaboration/kalejdoskop-adminpanel.git
   ```

2. **Install dependencies**

   Navigate into the cloned repository directory and run the following command to install all necessary dependencies:

   ```sh
   npm install
   ```

3. **Configure environment variables**

   You will need to create a `.env` file in the root of the project. You can use the provided `.env.example` file as a template. Simply copy the `.env.example` file and rename the copy to `.env`. Then fill in the required information.

### Running the project

Once you have completed the installation, you can now run the application in a development environment:

```sh
npm run dev
```

## Building the project

To compile the application for a production environment, you can run:

```sh
npm run build
```

This command will create a `dist` directory containing the compiled application.
