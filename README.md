# Zilin Ma's Academic Website

This repository contains the source code for Zilin Ma's personal academic and UX research website. The website is built with HTML, CSS, and JavaScript and is designed to be hosted on GitHub Pages.

## Site map

- `/`: research profile, current projects, and selected publications
- `/eng/`: engineering-oriented profile and system case studies
- `/portfolio.html`: research project index
- `/publications.html`: complete publication list and citations
- `/cv.html`: appointments, education, research, and service

## Structure

- `index.html`: Main landing page with bio and featured content
- `cv.html`: CV/Resume page with downloadable PDF option
- `publications.html`: Academic publications listing
- `portfolio.html`: Project portfolio displayed as editorial rows
- `contact.html`: Contact information
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

## Updating content

- Update the profile and selected work in `index.html`
- Keep publication entries synchronized between `publications.html` and `eng/publications.html`
- Add research pages under `projects/` and engineering case studies under `eng/projects/`
- Replace `files/ZilinMa_CV.pdf` when the CV changes

### Styling

- The main styling is controlled in `css/style.css`
- Color scheme can be adjusted by modifying the CSS variables at the top of the stylesheet
- Fonts can be changed by updating the Google Fonts link in the HTML `<head>` and the font-family properties in the CSS
- The visual system uses warm neutral surfaces, solid accents, square corners, editorial rows, and restrained motion. Keep headings in Archivo and body copy in IBM Plex Sans unless the full type system is updated together.
- Public copy should state the work, evidence, and constraints directly. Avoid tutorial framing, generic principles, fabricated personas, and unsupported impact claims.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Font Awesome for icons
- Google Fonts for typography
- Design inspiration from other academic websites
