# Trees

A hierarchical tree based note-taking / planner app

**What is it?**


**How to get it running**

1. Using npm

- Clone this repositry and `cd` into it. \
`cd Trees` 

- Build the app with npm \
`npm run react-build` \
`npm run server-build` 

- Run the app \
`npm start`

2. Using a Downloadable executable (Only supported on Windows and Ubuntu right now )
- Download the executable corresponding to your operating system from here : (add link here) and run

   Ubuntu Users:
   - Download trees-v0.AppImage :(link)
   - make the file executable with: \
      `chmod u+x trees-v0.AppImage`
   - Run with ./trees-v0.AppImage

   Windows Users:
   - Download trees-v0.exe : (link)
   - Run the file (double click)

**How to use** 

*Insert screenshot here*


**Dev Details**

The package.json contains following commands:

```bash
# starts electron with React and Node in development mode
npm start

# builds the react application, the output will be in /build
npm run react-build

# starts the react application on localhost:3000
npm run react-start

# builds the node application, the output will be in /build-server
npm run server-build

# runs the node application in development mode
npm run server-start

# starts the electron process and enables live reload
npm run electron-dev

# Starts the packaging process for Electron, output will be in /dist
npm run electron-pack

# Will be automatically started by electron-pack, builds the react and node applications
npm run preelectron-pack
```

**Folder structure**

An overview of the folder structure can be found below:

```
|
|-- /build (output of the built react application)
|
|-- /build-server (output of the built node application)
|
|-- /dist (output of the completely built Electron app)
|
|-- /public (contains the index.html, which will be picked up by react-app-rewired)
|
|-- /scripts (scripts to enable live reload)
|
|-- /server (node source files)
|
|-- /src (react source files)
```


[CC0 1.0 (Public Domain)](LICENSE.md)
