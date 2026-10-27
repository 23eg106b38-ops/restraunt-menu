# Spice Garden — Restaurant Menu Website

A responsive restaurant menu website built with HTML, CSS and vanilla JavaScript. Designed to publish on GitHub Pages.

## Features
- Responsive desktop and mobile layout
- Menu cards with food photos, descriptions and INR prices
- Category filters and dish search
- Working cart with quantity controls and total calculation
- Accessible labels and keyboard Escape-to-close cart
- No build tools or installation required

## Run locally
1. Download or extract this folder.
2. Open `index.html` in a browser.

## Publish using GitHub Pages
1. Sign in at [GitHub](https://github.com/) and create a new **public** repository, for example `restaurant-menu`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository's root folder.
3. Open the repository's **Settings** tab.
4. Select **Pages** from the sidebar.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/(root)`, then click **Save**.
7. Wait a minute or two. The Pages section will show your live website URL, usually:
   `https://YOUR-USERNAME.github.io/restaurant-menu/`

## Customize
- Edit the dishes array in `script.js` to change names, descriptions, prices, categories and image URLs.
- Edit colours and layout in `style.css`.
- Change restaurant name and text in `index.html`.

## Note
This is a front-end demo. The cart calculates totals in the browser, but placing an order does not send it to a restaurant or process payments. Menu photos are loaded from Unsplash, and Google Fonts are loaded online.
