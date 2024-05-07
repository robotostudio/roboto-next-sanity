# Roboto Next Sanity

Welcome to the "Roboto Next Sanity" repository! This template monorepo is designed to streamline the development of projects using a combination of Roboto, Next.js, and Sanity.io. It provides a structured yet flexible foundation for building scalable and maintainable applications.

## Description

This monorepo includes templates and configurations that integrate the robust text rendering capabilities of Roboto, the server-side rendering features of Next.js, and the real-time data management of Sanity.io. It's ideal for developers looking to jumpstart their projects with a solid architecture that covers frontend, backend, and content management.

### Features

- **Next.js Setup**: Pre-configured with the latest version of Next.js for server-side rendering and static site generation.
- **Sanity Studio**: Integrated Sanity Studio for seamless content management.
- **Roboto Typography**: Roboto font setup for beautiful, readable text across all components.
- **Scalable Architecture**: Designed for scalability, making it suitable for projects of any size.
- **Pre-configured Themes**: Includes themes that can be customized to fit your brand identity.

## Installation

To get started with this template monorepo, follow these steps:

1. **Run the following command**:

```bash
npx create-roboto-next-app@latest 
```

this will ask for the project name and information about the sanity project that you want to connect to.

2. **After initialization**
  run the following command to install the dependencies

```bash
npm install
```
3. **Start the development server**

```bash
npm run dev
```

## To deploy this project

### There are two parts 

1. **Next js deployment on vercel**

    - connect repo with vercel 
    - add environment variables

2. **Sanity deployment on sanity.io**

    - first deploy will be manual, because we need to add the domain to the sanity project
    - after the first deploy, this can be automated, just by adding deploy token to your github action
