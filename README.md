# Zilin Ma's Academic Website

This repository contains the source code for Zilin Ma's personal academic and UX research website. The website is built with HTML, CSS, and JavaScript and is designed to be hosted on GitHub Pages.

## Features

- Responsive design that works well on desktop, tablet, and mobile devices
- Clean, professional aesthetic suitable for academic purposes
- Sections for bio, publications, portfolio, CV, and contact information
- Interactive project portfolio with detailed project pages
- Easy to update and maintain

## Structure

- `index.html`: Main landing page with bio and featured content
- `cv.html`: CV/Resume page with downloadable PDF option
- `publications.html`: Academic publications listing
- `portfolio.html`: Project portfolio displayed as interactive tiles
- `contact.html`: Contact information and form
- `projects/`: Directory containing individual project detail pages
- `css/`: Contains all styling information
- `js/`: Contains JavaScript functionality
- `images/`: Contains all images used throughout the site
- `files/`: Contains downloadable files like CV/Resume in PDF format

## Setup for GitHub Pages

1. Fork or clone this repository to your GitHub account
2. Go to the repository settings on GitHub
3. Navigate to the "Pages" section
4. Select the main branch as the source
5. The site will be published at `https://zilinma.github.io`

## Customization

### Adding Content

- Replace placeholder text in all HTML files with your actual content
- Replace placeholder images in the `images/` directory with your actual images
- Update the CV section and add your CV PDF to the `files/` directory
- Add your actual publications to the publications page
- Create additional project pages based on the template in `projects/project1.html`

### Styling

- The main styling is controlled in `css/style.css`
- Color scheme can be adjusted by modifying the CSS variables at the top of the stylesheet
- Fonts can be changed by updating the Google Fonts link in the HTML `<head>` and the font-family properties in the CSS

## Contact Form

The contact form is set up to use [Formspree](https://formspree.io/). To make it functional:

1. Create a Formspree account
2. Set up a new form
3. Replace the placeholder endpoint in the form action attribute with your actual Formspree endpoint

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Font Awesome for icons
- Google Fonts for typography
- Design inspiration from other academic websites 