# Croquet Microverse Builder
## Quick Start Guide

**Copyright (c) 2022 Croquet Corporation**

<https://croquet.io>

<info@croquet.io>

## Introduction

This guide will enable you to quickly set up the Croquet Microverse Builder. Refer to tutorials in the docs directory for its key concepts and features that let you build new shared worlds.

## TL;DR Quick Start
1. Clone or Fork the Github repository from <https://github.com/croquet/microverse-builder>.
    <br>`git clone https://github.com/croquet/microverse-builder.git`
2. Obtain your Croquet API Key from <https://croquet.io/keys/>.
3. Change the working directory to your new `microverse-builder` folder.
    <br>`cd microverse-builder`
4. Create the apiKey.js file using the API Key above, and a dot separated name for the appId.
    <br>`CROQUET_APIKEY=ENTER_YOUR_APIKEY_HERE CROQUET_APPID=ENTER_YOUR_APPID_HERE scripts/make_apiKey.js`
5. Install the packages `npm install` then start the server `npm start`
6. Enter the Croquet Microverse by opening a browser at `localhost:9684`.
7. Copy the URL shown in the browser tab and copy it into a new tab. Also, replace `localhost` in the URL with the IP address of the computer (e.g. 192.168.0.123) and open it from another device on the local network.

## Detailed Instructions
---

### Prerequisite
1. Npm. Please refer to the installation page on [npmjs.com](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Git. Please refer to the installation page on [git-scm.com](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

Npm and git are large software packages and explaining them is not in the scope of this document. We only use their most basic features. So if you don't have those packages on your computer yet, look for the simplest installation method for your platform.

### Clone or Fork the Github Repository

You can find the most up to date Croquet Microverse Builder along with this document and tutorials in the `microverse-builder` Github repository. Cloning this repository will give you almost everything you will need to get started creating your own Croquet Microverse.

`git clone https://github.com/croquet/microverse-builder.git`

or fork the repository on Github and clone your repository.

---
### Obtain your API Key

Developing any Croquet application requires an API key that you can obtain from Croquet. You can sign up as a Croquet developer and obtrain an API key at the [Croquet Developers Portal](https://croquet.io/keys).

Create a Croquet account by following the the "Create one here" link on the sign in page. Once you sign up, your first key is automatically generated. Additional application specific API keys with URL restrictions can be created as well.  (See the deployment section of this document for further details).

### Create the apiKey.js File
Create a file called `apiKey.js` by running the script `scripts/make_apiKey.js` with parameters passed into it.  The two parameters that are required to build a proper apiKey.js file are the API key from above and an Application ID.  
```
CROQUET_APIKEY=ENTER_YOUR_APIKEY_HERE CROQUET_APPID=ENTER_YOUR_APPID_HERE scripts/make_apiKey.js
```

Alternatively, create a file called `apiKey.js` by copying `apiKey.js-example` to `apiKey.js`. Then edit the two properties in the file named `apiKey` and `appId`. The appId needs to be [dot-separated words](https://developer.android.com/studio/build/application-id), such as "com.example.myapp". Refer to [join](https://croquet.io/docs/croquet/Session.html#.join) for other parameters you can specify.

#### apiKey.js-example

```
const apiKey = "<insert your apiKey from croquet.io/keys>";
const appId = "<specify your own appId such as com.foo.mymicroverse>";
export default {apiKey, appId};

// you may export other Croquet session parameters to override default values.
```

Enter your Croquet API key and an application ID of your choice in the `apiKey.js` file and save it.

#### apiKey.js
```
const apiKey = "1_a2b3c4e5f6g7h8i9j0kxyzzyqwerty142nsj6fasdsadad";
const appId = "com.foo.mymicroverse";
export default {apiKey, appId};
```

### Install Packages and Start the Croquet Microverse

Set up the the local servers. In a terminal window, change to the microverse-builder folder then run the `npm install` command to install packages:
    <br>`cd microverse-builder`
    <br>`npm install`

Start the local servers.  In the same terminal window, run `npm start` to start the servers.
    <br>`npm start`

This will start two servers. The first is the file server on localhost:9684. The second is the watch-server that enables you to inject code changes into a running session. 

The servers can be run independently as well. 
* `npm run file-server` starts the file server.  
* `npm run watch-server` starts the watch-server.

You should see something similar to this:

![Croquet Console](./assets/console.png)

### Open the Croquet Microverse in a browser

To enter the demo world for the Croquet Microverse, open `localhost:9684` in your web browser.

![Croquet Microverse](./assets/CroquetMicroverseBrowser.png)

The URL will change - both a new session ID and a password are autogenerated and added to the URL. This full URL allows you to enter the same world from other tabs and devices.

If you have another device on the local network and the computer is visible from the device by an IP address, you can join in the same session from the device. Replace localhost with the IP address of the computer (such as 192.168.0.123) in the full URL and open it from other device. You can deploy the system to your server, as described in the deployment section, and make it publicly available.

### Deployment

You can copy all files in `behaviors`, `assets`, `lib`, `meta`, and `worlds` along with `index.html` and `apiKey.js`, to your publicly accessible HTTP server to have your own deployment. You can also use a hosting services such as Netlify and Vercel, which let you connect your Github repository to automate deployment. Note that the auto generated default apiKey for your Croquet account allows anybody to use it from any site.  In order to protect your API key from unauthorized use, you should create a new apiKey with URL restriction limited to your site.

Many of files in the `assets` directory are used for the default demo worlds and may not be necessary for your own world.  You can safely remove them from your deployment if you are not using them.

### Updates

Croquet will continuously update this repository with new features and bug fixes. Most of files affected will be under the `lib` and `assets` directory but occasionally some files in the worlds, including `default.js`, will be modified. If you edit `default.js` in your clone, fetching upstream updates may cause conflicts. Making your world file under a different name and launching it with the URL option `?world=` can avoid conflicts.  However, the recommended approach is to merge our changes into your version of `default.js`.

## Resources
---

### Croquet.io
<https://croquet.io/> is the best place to get started with what the Croquet Microverse is and what it can do.

The Croquet Microverse uses the [Croquet Library](https://croquet.io/docs/croquet) and the [Worldcore framework](https://croquet.io/docs/worldcore). Additionaly it depends on [Three.js](https://threejs.org/) for 3D rendering. To develop your own behaviors with new visual appearances, you will need to be familiar with those libraries.

### Discord

The best resource for help in developing Croquet Microverse worlds is on our Discord server. The Croquet Discord server is where you can ask questions, view examples, and see the Metaverse being constructed while you watch. Join the [Croquet Discord server](https://discord.gg/9U9MKSbJXS).

