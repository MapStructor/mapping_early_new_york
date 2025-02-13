## An important note for development

- The key is set to only work on one domain. Whenever you work locally or on another domain, the map will not show, along with features like attributions.
- You will need to swap the token to see the map. Make sure you only use the swapped token temporarily, and do not push any token changes, or leave it online anywhere.

# How to run

## Run with NodeJS

- You need to have node installed, if you haven't, follow the steps [here](https://nodejs.org/en/download)
- You also need to have [`http-server`](https://www.npmjs.com/package/http-server) installed. If you haven't, follow the following steps below.
- - If you're in vsCode, open the terminal (`CTRL` + `)
- - type in the command and press enter
```
npm install -g http-server
```
- Start the app any time by opening the terminal(CTRL+`) and enter the command:
```
http-server
```
Then visit http://localhost:8080 to view the site

## Run without NodeJS

- Make sure to have live server vscode extension installed. Click the extensions marketplace icon and search "live server". Click install when you find the right extension in the preview image below

<img src="https://res.cloudinary.com/djaqusrpx/image/upload/v1712839723/Screenshot_from_2024-04-11_13-47-13_yzcdke.png">

- Once installed, left click either index.html or login.html in the vscode file explorer and select open with live server

<img src="https://res.cloudinary.com/djaqusrpx/image/upload/v1712839883/Screenshot_from_2024-04-11_13-50-59_ueiqhq.png">


PS: read the preview version of this `README` file so it all makes sense. Right click :)