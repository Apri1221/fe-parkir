

<h1>Nuxt JS + Tailwind CSS + ESLint Boilerplate 
  <a
    href="https://nestjs.com/"
    target="blank"
  >
<br/>
    <img
      src="https://github.com/nuxt/nuxt.js/raw/dev/.github/nuxt.png"
      width="50"
      alt="Nest Logo"
    />
<img
      src="https://camo.githubusercontent.com/53b9876cd8e38928387c6824043b0e2772b15b1bfdb7f42d0864216abbf3dfe8/68747470733a2f2f7265666163746f72696e6775692e6e7963332e63646e2e6469676974616c6f6365616e7370616365732e636f6d2f7461696c77696e642d6c6f676f2e737667"
      width="200"
      alt="Nest Logo"
    />
<img
      src="https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg"
      width="50"
      alt="Nest Logo"
    />
  </a>
</h1>

## Features

This is a Nuxt JS + Tailwind CSS boilerplate code with preconfigured libraries and packages with the following features:

- Preconfigured [VueTailwind](https://www.vue-tailwind.com/) with highly customizable tailwind module
- Integrated [nuxt/axios](https://axios.nuxtjs.org/) for promise based HTTP client
- Integrated [nuxt/auth](https://auth.nuxtjs.org/) for authentication
- Integrated [nuxt-img](https://image.nuxtjs.org/components/nuxt-img/) to replace vanilla  ``<img>`` HTML tag for better image optimization
- Integrated [@nuxtjs/moment](https://www.npmjs.com/package/@nuxtjs/moment) for time formatting
- Smooth configurable page, layout transition at ``@/assets/css/main``
- Built-in awesome content loader using [vue-content-loader](https://www.npmjs.com/package/vue-content-loader)  
- Integrated [@babel/eslint-parser, prettier](https://www.npmjs.com/package/@babel/eslint-parser) for codes' rules & styles checking and formatting
- Integrated [vuex-map-fields](https://www.npmjs.com/package/vuex-map-fields) for form data binding 

## Setup Guide

**Be aware that** you might have to add **BASE_URL** to your environment variable in case you build for production.

### API Installation
This boilerplate fetch data from [tfd-nest-boilerplate](https://github.com/tfd-ed/tfd-nest-boilerplate). Make sure you install the server and run it. Here is the easy step to install the server ( Make sure you have [docker](https://www.docker.com/get-started) installed) :

``` bash
$ git clone https://github.com/tfd-ed/tfd-nest-boilerplate.git
cd tfd-nest-boilerplate
cp .env.example .env # or copy .env.example .env on Windows
docker-compose up -d
```

### Client Installation
```bash
$ git clone https://github.com/tfd-ed/tfd-nuxt-tailwind-boilerplate
$ cd tfd-nuxt-tailwind-boilerplate
$ yarn install
$ yarn dev
````
Visit http://localhost:3000/ 

### Production Guide
```bash
# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
