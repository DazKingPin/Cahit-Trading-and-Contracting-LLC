const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

const THEME_DIR = path.join(__dirname, 'wp-theme', 'cahit-theme');
const BASE_URL = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/';

function readThemeFile(filename) {
  const filePath = path.join(THEME_DIR, filename);
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

function executePhpTemplate(phpContent, currentPage) {
  let base_url = BASE_URL;

  let logos = [
    { name: 'Doosan Heavy Industries & Construction', file: 'cxoRXpdmBqwcLedo.png' },
    { name: 'Al Jazeera International Group', file: 'qFCAQxxNiSjFqwyq.png' },
    { name: 'Al-Hashemi & Al-Rawas Trading & Contracting', file: 'KXeFROoDmbydRpuQ.png' },
    { name: 'Fisia Italimpianti', file: 'NhkgkgOdoRAutEDK.png' },
    { name: 'GPS In The New Millennium', file: 'ssANHVRFYXALYoKI.png' },
    { name: 'Makyol', file: 'IqZMAjrvgmDdBJaW.png' },
    { name: 'Omran', file: 'cCzhlyOLGOdtqfjD.jpg' },
    { name: 'Salalah Sanitary Drainage Services', file: 'eGXMGushzTuSHdCj.png' },
    { name: 'SNC-Lavalin', file: 'dIjoxYdtJmpPvEZG.png' },
    { name: 'STFA', file: 'MrphYkzHpiuuKwNm.png' },
    { name: 'TAV Construction', file: 'fOxkXRAGOOnYlnkI.png' },
  ];

  let rolling_images = [
    { src: 'gvWLawWCNocSINuR.jpeg', alt: 'Road construction with heavy rollers' },
    { src: 'GjfldJYeoGyqGIMR.jpeg', alt: 'Asphalt paving with Vogele machine' },
    { src: 'mejIiORMfOESXWxO.jpeg', alt: 'Road line marking operations' },
    { src: 'jdGZtMFCClzefYrV.png', alt: 'Underground pipe installation' },
  ];

  let services = [
    { id: 'marine', name: 'Marine & Coastal Construction', image: 'EGRSgZmJXJSrWKJY.png', desc: 'Design and construction of marine infrastructure including breakwaters, quay walls, revetments, dredging, and coastal protection systems.' },
    { id: 'infrastructure', name: 'Infrastructure Development', image: 'gvWLawWCNocSINuR.jpeg', desc: 'Civil infrastructure development including utilities, industrial facilities, and integrated project delivery solutions.' },
    { id: 'earthworks', name: 'Earthworks', image: 'hMZPCXiHvRhErvHk.gif', desc: 'Bulk excavation, grading, compaction, and large-scale site preparation using modern heavy equipment.' },
    { id: 'dewatering', name: 'Dewatering & Shoring', image: 'NHQbvhqluSlDGrrN.png', desc: 'Advanced groundwater control systems and structural support solutions ensuring safe and stable construction environments.' },
    { id: 'mep', name: 'MEP Works', image: 'qZRtUjMizSFySgTf.png', desc: 'Mechanical, electrical and plumbing systems supporting industrial facilities, infrastructure and utility projects.' },
  ];

  let capabilities = [
    'Sea Harbors', 'Breakwaters and Groynes', 'Coastal Protection Systems', 'Rock Armour Installation',
    'Geotextile Protection', 'Beach Reclamation', 'Dredging', 'Underwater Excavation',
    'Boat Ramps and Pontoons', 'Quay Wall Construction',
  ];

  let html = phpContent;

  html = html.replace(/<\?php\s+get_header\(\);\s*\?>/g, () => {
    return processPhpSimple(readThemeFile('header.php'), currentPage);
  });

  html = html.replace(/<\?php\s+get_footer\(\);\s*\?>/g, () => {
    return processPhpSimple(readThemeFile('footer.php'), currentPage);
  });

  // Remove $base_url definition line
  html = html.replace(/<\?php\s+\$base_url\s*=\s*'[^']*';\s*\?>/g, '');

  html = processPhpSimple(html, currentPage);

  // Execute PHP loops for front-page logos marquee
  html = html.replace(/<\?php\s+\$logos\s*=\s*array[\s\S]*?endfor;[\s\S]*?\?>/g, () => {
    let result = '';
    for (let repeat = 0; repeat < 2; repeat++) {
      logos.forEach((logo, idx) => {
        result += `<div class="marquee-logo-card" data-testid="img-logo-${(repeat * logos.length) + idx}">
          <img src="${base_url}${logo.file}" alt="${logo.name}" class="marquee-logo-img" />
        </div>\n`;
      });
    }
    return result;
  });

  // Execute PHP loops for rolling images
  html = html.replace(/<\?php\s+\$rolling_images[\s\S]*?endforeach;\s*\?>/g, () => {
    let result = '';
    rolling_images.forEach((img, idx) => {
      result += `<div class="rolling-image-item ${idx === 0 ? 'active' : ''}" data-rolling-index="${idx}">
        <img src="${base_url}${img.src}" alt="${img.alt}" />
      </div>\n`;
    });
    return result;
  });

  // Execute PHP loops for services
  html = html.replace(/<\?php\s+\$services\s*=\s*array[\s\S]*?endforeach;\s*\?>/g, () => {
    let result = '';
    services.forEach(service => {
      result += `<div class="service-card" data-testid="card-service-${service.id}">
        <div class="service-card-image">
          <img src="${base_url}${service.image}" alt="${service.name}" />
        </div>
        <div class="service-card-body">
          <h3 class="service-card-title">${service.name}</h3>
          <p class="service-card-desc">${service.desc}</p>
          <a href="/services" class="service-card-link">
            Learn More
            <svg class="icon-arrow-sm" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>\n`;
    });
    return result;
  });

  // Execute PHP loops for marine capabilities
  html = html.replace(/<\?php\s+\$capabilities\s*=\s*array[\s\S]*?endforeach;\s*\?>/g, () => {
    let result = '';
    capabilities.forEach(cap => {
      result += `<div class="marine-pill">
        <svg class="marine-pill-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
        <p class="marine-pill-text">${cap}</p>
      </div>\n`;
    });
    return result;
  });

  // Clean up remaining PHP blocks  
  html = html.replace(/<\?php[\s\S]*?\?>/g, '');

  return html;
}

function processPhpSimple(content, currentPage) {
  let html = content;

  html = html.replace(/<\?php\s+language_attributes\(\);\s*\?>/g, 'lang="en"');
  html = html.replace(/<\?php\s+bloginfo\('charset'\);\s*\?>/g, 'UTF-8');
  html = html.replace(/<\?php\s+wp_head\(\);\s*\?>/g, `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/theme.css">
  `);
  html = html.replace(/<\?php\s+wp_footer\(\);\s*\?>/g, `
    <script>var cahitData = { ajaxUrl: '/api/ajax', themeUrl: '', nonce: 'preview' };</script>
    <script src="/assets/js/theme.js"></script>
    <script src="/assets/js/chatbot.js"></script>
  `);
  html = html.replace(/<\?php\s+body_class\(\);\s*\?>/g, `class="page-${currentPage}"`);

  // URL replacements
  html = html.replace(/<\?php\s+echo\s+esc_url\(home_url\('\/'\)\);\s*\?>/g, '/');
  html = html.replace(/<\?php\s+echo\s+esc_url\(home_url\('\/about'\)\);\s*\?>/g, '/about');
  html = html.replace(/<\?php\s+echo\s+esc_url\(home_url\('\/services'\)\);\s*\?>/g, '/services');
  html = html.replace(/<\?php\s+echo\s+esc_url\(home_url\('\/projects'\)\);\s*\?>/g, '/projects');
  html = html.replace(/<\?php\s+echo\s+home_url\('\/services'\);\s*\?>/g, '/services');
  html = html.replace(/<\?php\s+echo\s+home_url\('\/about'\);\s*\?>/g, '/about');
  html = html.replace(/<\?php\s+echo\s+home_url\('\/projects'\);\s*\?>/g, '/projects');
  html = html.replace(/<\?php\s+echo\s+home_url\('\/'\);\s*\?>/g, '/');

  // Template directory URI -> serve from /assets
  html = html.replace(/<\?php\s+echo\s+esc_url\(get_template_directory_uri\(\)\);\s*\?>/g, '');
  html = html.replace(/<\?php\s+echo\s+get_template_directory_uri\(\);\s*\?>/g, '');

  // Base URL variable
  html = html.replace(/<\?php\s+echo\s+\$base_url;\s*\?>/g, BASE_URL);

  // Active nav links
  const activeChecks = {
    home: 'is_front_page\\(\\)',
    about: "is_page\\('about'\\)",
    services: "is_page\\('services'\\)",
    projects: "is_page\\('projects'\\)",
  };

  for (const [page, regex] of Object.entries(activeChecks)) {
    const isActive = currentPage === page;
    const pattern = new RegExp(`<\\?php\\s+if\\s*\\(${regex}\\)\\s+echo\\s+'\\s*active';\\s*\\?>`, 'g');
    html = html.replace(pattern, isActive ? ' active' : '');
  }

  return html;
}

// Serve theme assets
app.use('/assets', express.static(path.join(THEME_DIR, 'assets'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function parseMultipart(req) {
  return new Promise((resolve) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        const fields = {};
        const boundary = req.headers['content-type'].split('boundary=')[1];
        if (boundary) {
          const parts = body.split('--' + boundary);
          parts.forEach(part => {
            const match = part.match(/name="([^"]+)"\r?\n\r?\n([\s\S]*?)(?:\r?\n--|\r?\n$)/);
            if (match) fields[match[1]] = match[2].trim();
          });
        }
        resolve(fields);
      });
    } else {
      resolve(req.body || {});
    }
  });
}

app.post('/api/ajax', async (req, res) => {
  const fields = await parseMultipart(req);
  const action = fields.action || (req.body && req.body.action) || '';
  if (action === 'cahit_chat') {
    res.json({ success: true, data: { reply: 'Thank you for your message. Our team will get back to you soon. You can also reach us at ctc@cahitcontracting.com or call +968 2411 2406.' } });
  } else {
    res.json({ success: true, data: { id: 1 } });
  }
});

app.post('/api/chat', (req, res) => {
  res.json({ reply: 'Thank you for your message. Our team will get back to you soon. You can also reach us at ctc@cahitcontracting.com or call +968 2411 2406.' });
});

// Page routes
app.get('/', (req, res) => {
  const content = readThemeFile('front-page.php');
  res.send(executePhpTemplate(content, 'home'));
});

app.get('/about', (req, res) => {
  const content = readThemeFile('page-about.php');
  res.send(executePhpTemplate(content, 'about'));
});

app.get('/services', (req, res) => {
  const content = readThemeFile('page-services.php');
  res.send(executePhpTemplate(content, 'services'));
});

app.get('/projects', (req, res) => {
  const content = readThemeFile('page-projects.php');
  res.send(executePhpTemplate(content, 'projects'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`WordPress theme preview server running on http://0.0.0.0:${PORT}`);
  console.log(`Theme dir: ${THEME_DIR}`);
});
