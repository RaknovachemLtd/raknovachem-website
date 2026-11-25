# RAK NovaChem website

A four-page static website (plain HTML, CSS and JavaScript). There is no build step, no database and no server, so it can be hosted free.

| Page | File | What it has |
|---|---|---|
| Home | `index.html` | Hero, who we are, key strengths, 7 product categories, industries served, leadership, vision/mission |
| Products | `products.html` | 23 product lines in 7 categories (agrochemicals follows the client catalogue: pesticide intermediates, soil & plant nutrition, formulation helpers) with function and applications; search, filters, WhatsApp "Enquire", application matrix, technical support |
| About Us | `about.html` | Who we are, directors with bios, operating principles, supply process, QA gates, Pune base |
| Contact | `contact.html` | WhatsApp, phone, email, address, enquiry form, map, catalogue PDF download |

Also included: `404.html`, `sitemap.xml`, `robots.txt`, `_headers` (Cloudflare security/caching headers), favicon and social-share image.

## Things you may want to change

- **WhatsApp number / enquiry email**: top of `assets/js/main.js` (`WHATSAPP_NUMBER`, `ENQUIRY_EMAIL`). The same number also appears as a plain fallback link `https://wa.me/917758826537` in the HTML files; use find-and-replace across the folder if it changes.
- **Colours and fonts**: the `:root` block at the top of `assets/css/style.css`.
- **Products**: each product is one `<article class="product">` block in `products.html`, with its photo in `assets/img/products/`. Copy a block to add one, delete a block to remove one.
- **Directors**: `about.html` (full bios) and `index.html` (photo cards). Photos are in `assets/img/team/`.
- **Catalogue PDF**: `assets/docs/RAK-NovaChem-Product-Catalogue.pdf`. Replace the file with the same name to update the download everywhere.
- **Images**: `assets/img/`. `hero-water.jpg` (home hero) and the product photos were cropped from the Industrial Chemical Portfolio PDF, and `fleet.jpg` (About page) from the corporate profile; replace them with higher-resolution photos using the same file names. `logo.png` was also taken from the PDF; swap in the original logo file if you have it.
- **Domain**: the site assumes `https://raknovachem.com`. If the domain is different, find-and-replace `raknovachem.com` in the HTML files, `sitemap.xml` and `robots.txt`.

## Free hosting: GitHub + Cloudflare Pages

Cost: zero. Cloudflare's free plan covers unlimited bandwidth, 500 deployments a month and free SSL. You only keep paying your normal yearly domain renewal.

### 1. Put the code on GitHub

1. Create a free account at github.com and create a new repository, for example `raknovachem-website`. It can be private.
2. Upload the contents of this folder so that `index.html` sits at the top level of the repository (on the repository page: **Add file → Upload files**, drag everything in, **Commit changes**). Or with git:

   ```bash
   cd raknovachem-website
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/raknovachem-website.git
   git push -u origin main
   ```

### 2. Connect the repository to Cloudflare Pages

1. Create a free account at dash.cloudflare.com.
2. Go to **Workers & Pages → Create → Pages → Connect to Git** (Cloudflare sometimes relabels this as "Import a repository"; if you only see a Workers flow, look for the "Looking to deploy Pages?" link).
3. Authorise GitHub and pick the repository.
4. Build settings: **Framework preset: None**, **Build command: leave empty**, **Build output directory: `/`**.
5. **Save and Deploy**. In under a minute the site is live at `something.pages.dev`. Check it there first.

### 3. Attach your domain

In the Pages project open **Custom domains → Set up a domain** and enter `raknovachem.com`, then repeat for `www.raknovachem.com`.

- For the root domain (`raknovachem.com`) Cloudflare needs to manage the domain's DNS. It will ask you to add the domain to Cloudflare (free plan) and then give you two nameservers. Log in to wherever the domain was bought (GoDaddy, Namecheap, BigRock, etc.), and replace the existing nameservers with Cloudflare's two. This usually takes effect within an hour, occasionally up to a day.
- **Important if you already use email on this domain** (`info@` / `sales@raknovachem.com`): when you add the domain, Cloudflare scans and copies your existing DNS records. Before switching nameservers, check that the **MX** and **TXT** (SPF/DKIM) records from your email provider are in Cloudflare's list, otherwise email will stop arriving.
- SSL (https) is issued automatically.

### 4. Updating the site later

Edit a file on GitHub (pencil icon) or push a commit. Cloudflare redeploys automatically in about a minute.

### Alternative: GitHub Pages only

If you prefer not to use Cloudflare: repository **Settings → Pages → Deploy from a branch → main / root**, then enter the custom domain there and add the DNS records GitHub shows at your registrar. It is also free, but the repository must be public on a free GitHub account, and the `_headers` file is ignored.

## After going live

- Add the site to Google Search Console and submit `https://raknovachem.com/sitemap.xml`.
- Create or update the Google Business Profile with the website link so the office shows up in Maps.
- Optional: turn on Cloudflare Web Analytics (free, no cookie banner needed) in the Cloudflare dashboard.
