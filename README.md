# Salmon Hammer Score Screens

## About

Web pages utilzed as score screens for an OBS overlay.

The designs are all made in figma and have so far had their styles hand copied into a sass file and used. Learning to format the html to be more readable is still in progress.

The pages themselves will utilize jQuery to update the information live. The current scheme is a csv text file but will transition over time into other formats.

There is a single page right now, but more pages will be added to support both AoS and 40k scoring formats for matched play. Crusade and other formats are desirable.

Started with a boilerplate and have started modifying heavily. Main aspects still used are gulp and sass. Bootstrap is not used at all anymore.

## Running the site

### Prerequisites

Install gulp globally on your system

```
npm install gulp -g
```

### Installing

Then Install the packages included in *package.json*

```
$ npm install
```

### Build

Build for generating pure css/js/fonts/html files in public folder, which is the one to deploy

```
$ npm run build
```

### Run the project - Live on browser

For live development and run the project in browser

```
$ npm run start
```

## Built With

* [Gulp 4](https://gulpjs.com/)
* [Sass](https://sass-lang.com/)

## Salmon Hammer Authors

* **Dru Staltman** - [Github](https://github.com/dstaltman)

## Original Boilerplate Author

* **Jagath Jayakumar** - [Github](https://github.com/jagathgj) - [Official](https://www.hellojagath.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
