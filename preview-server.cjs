const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

const DATA_DIR = process.env.VERCEL ? '/tmp' : __dirname;
const CREDENTIALS_FILE = path.join(DATA_DIR, 'admin-credentials.json');
function loadCredentials() {
  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      return JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf8'));
    }
  } catch (e) {}
  return { username: 'admin', password: 'cahit2024' };
}
function saveCredentials(creds) {
  try { fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(creds, null, 2)); } catch (e) {}
}
const TOKEN_SECRET = process.env.SESSION_SECRET || 'cahit-admin-secret-2024';
function createAdminToken(username) {
  const payload = username + ':' + Date.now();
  const sig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
  return Buffer.from(payload + ':' + sig).toString('base64');
}
function verifyAdminToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length < 3) return false;
    const sig = parts.pop();
    const payload = parts.join(':');
    const expectedSig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
    return sig === expectedSig;
  } catch (e) { return false; }
}
const adminTokens = new Set();

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

  // Handle WP_Query blog loop: keep only the else (fallback) block for preview
  html = html.replace(/<\?php\s+\$blog_query[\s\S]*?if\s*\(\$blog_query->have_posts\(\)\)[\s\S]*?\?>\s*([\s\S]*?)<\?php\s+wp_reset_postdata[\s\S]*?\?>\s*<\?php\s+else\s*:\s*\?>\s*([\s\S]*?)<\?php\s+endif;\s*\?>/g, '$2');

  // Handle generic WordPress conditionals: have_posts/the_post loops
  html = html.replace(/<\?php\s+if\s*\(have_posts\(\)\)\s*:\s*\?>([\s\S]*?)<\?php\s+else\s*:\s*\?>([\s\S]*?)<\?php\s+endif;\s*\?>/g, '$2');
  html = html.replace(/<\?php\s+while\s*\(have_posts\(\)\)\s*:\s*the_post\(\);\s*\?>([\s\S]*?)<\?php\s+endwhile;\s*\?>/g, '$1');

  // Handle comments_open blocks
  html = html.replace(/<\?php\s+if\s*\(comments_open\(\)[\s\S]*?\)[\s\S]*?\?>([\s\S]*?)<\?php\s+endif;\s*\?>/g, '');

  // Handle has_post_thumbnail conditionals
  html = html.replace(/<\?php\s+if\s*\(has_post_thumbnail\(\)\)\s*:\s*\?>([\s\S]*?)<\?php\s+else\s*:\s*\?>([\s\S]*?)<\?php\s+endif;\s*\?>/g, '$2');
  html = html.replace(/<\?php\s+if\s*\(has_post_thumbnail\(\)\)\s*:\s*\?>([\s\S]*?)<\?php\s+endif;\s*\?>/g, '');

  // Handle prev/next post nav
  html = html.replace(/<\?php\s+\$prev_post[\s\S]*?endif;\s*\?>/g, '');
  html = html.replace(/<\?php\s+\$next_post[\s\S]*?endif;\s*\?>/g, '');

  // Handle post_password_required
  html = html.replace(/<\?php\s+if\s*\(post_password_required\(\)\)\s*return;\s*\?>/g, '');

  // Handle have_comments conditionals
  html = html.replace(/<\?php\s+if\s*\(have_comments\(\)\)\s*:\s*\?>([\s\S]*?)<\?php\s+endif;\s*\?>/g, '');

  // Handle comment_form
  html = html.replace(/<\?php\s+comment_form\([\s\S]*?\);\s*\?>/g, '');

  // Handle the_archive_title / the_archive_description
  html = html.replace(/<\?php\s+the_archive_title\(\);\s*\?>/g, 'Archive');
  html = html.replace(/<\?php\s+the_archive_description\('[^']*',\s*'[^']*'\);\s*\?>/g, '');

  // Handle wp_list_comments
  html = html.replace(/<\?php\s+wp_list_comments[\s\S]*?\?>/g, '');
  html = html.replace(/<\?php\s+the_comments_navigation\(\);\s*\?>/g, '');

  // Handle paginate_links / the_posts_pagination
  html = html.replace(/<\?php[\s\S]*?paginate_links[\s\S]*?\?>/g, '');
  html = html.replace(/<\?php[\s\S]*?the_posts_pagination[\s\S]*?\?>/g, '');

  // Handle the_title, the_content, the_date, the_author etc
  html = html.replace(/<\?php\s+the_title\(\);\s*\?>/g, 'Page Title');
  html = html.replace(/<\?php\s+the_title_attribute\(\);\s*\?>/g, 'Page Title');
  html = html.replace(/<\?php\s+the_content\(\);\s*\?>/g, '<p>Page content goes here.</p>');
  html = html.replace(/<\?php\s+the_permalink\(\);\s*\?>/g, '#');
  html = html.replace(/<\?php\s+the_ID\(\);\s*\?>/g, '0');
  html = html.replace(/<\?php\s+echo\s+esc_html\(get_the_date\(\)\);\s*\?>/g, new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  html = html.replace(/<\?php\s+echo\s+esc_html\(get_the_excerpt\(\)\);\s*\?>/g, 'Excerpt text here.');
  html = html.replace(/<\?php\s+the_author\(\);\s*\?>/g, 'Admin');
  html = html.replace(/<\?php\s+the_post_thumbnail\([^)]*\);\s*\?>/g, '');

  // Handle is_active_sidebar
  html = html.replace(/<\?php\s+if\s*\(is_active_sidebar[\s\S]*?\)[\s\S]*?\?>([\s\S]*?)<\?php\s+endif;\s*\?>/g, '');
  html = html.replace(/<\?php\s+dynamic_sidebar[\s\S]*?\?>/g, '');

  // Handle wp_body_open
  html = html.replace(/<\?php\s+if\s*\(function_exists\('wp_body_open'\)\)\s*\{\s*wp_body_open\(\);\s*\}\s*\?>/g, '');

  // Handle _n, _e, __ translation functions
  html = html.replace(/<\?php\s+_e\('([^']*)',\s*'cahit-theme'\);\s*\?>/g, '$1');
  html = html.replace(/<\?php\s+echo\s+__\('([^']*)',\s*'cahit-theme'\);\s*\?>/g, '$1');

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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sora:wght@300;400;500;600;700;800&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
  html = html.replace(/<\?php\s+echo\s+esc_url\(home_url\('\/clients'\)\);\s*\?>/g, '/clients');
  html = html.replace(/<\?php\s+echo\s+esc_url\(home_url\('\/blog'\)\);\s*\?>/g, '/blog');
  html = html.replace(/<\?php\s+echo\s+esc_url\(home_url\('\/careers'\)\);\s*\?>/g, '/careers');
  html = html.replace(/<\?php\s+echo\s+home_url\('\/services'\);\s*\?>/g, '/services');
  html = html.replace(/<\?php\s+echo\s+home_url\('\/about'\);\s*\?>/g, '/about');
  html = html.replace(/<\?php\s+echo\s+home_url\('\/projects'\);\s*\?>/g, '/projects');
  html = html.replace(/<\?php\s+echo\s+home_url\('\/'\);\s*\?>/g, '/');

  // Template directory URI -> serve from /assets
  html = html.replace(/<\?php\s+echo\s+esc_url\(get_template_directory_uri\(\)\);\s*\?>/g, '');
  html = html.replace(/<\?php\s+echo\s+get_template_directory_uri\(\);\s*\?>/g, '');

  // Base URL variable
  html = html.replace(/<\?php\s+echo\s+\$base_url;\s*\?>/g, BASE_URL);

  // WordPress function calls used in footer/header
  html = html.replace(/<\?php\s+echo\s+date\('Y'\);\s*\?>/g, new Date().getFullYear().toString());
  html = html.replace(/<\?php\s+echo\s+defined\('ABSPATH'\)\s*\?\s*esc_html\(get_theme_mod\('cahit_company_name',\s*'([^']*)'\)\)\s*:\s*'[^']*';\s*\?>/g, '$1');
  html = html.replace(/<\?php\s+echo\s+defined\('ABSPATH'\)\s*\?\s*esc_html__\('([^']*)',\s*'cahit-theme'\)\s*:\s*'[^']*';\s*\?>/g, '$1');
  html = html.replace(/<\?php\s+echo\s+defined\('ABSPATH'\)\s*\?\s*esc_html\(get_theme_mod\('cahit_tagline',\s*'([^']*)'\)\)\s*:\s*'[^']*';\s*\?>/g, '$1');
  html = html.replace(/<\?php\s+echo\s+defined\('ABSPATH'\)\s*\?\s*esc_url\(wp_login_url\(home_url\('\/admin'\)\)\)\s*:\s*'([^']*)';\s*\?>/g, '$1');
  html = html.replace(/<\?php\s+echo\s+defined\('ABSPATH'\)\s*\?\s*esc_url\(home_url\('\/'\)\)\s*:\s*'[^']*';\s*\?>/g, '/');
  html = html.replace(/<\?php\s+esc_html_e\('([^']*)',\s*'cahit-theme'\);\s*\?>/g, '$1');
  html = html.replace(/<\?php\s+esc_attr_e\('([^']*)',\s*'cahit-theme'\);\s*\?>/g, '$1');
  html = html.replace(/<\?php\s+echo\s+esc_html\(date_i18n\('[^']*'\)\);\s*\?>/g, () => {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });
  html = html.replace(/<\?php\s+echo\s+esc_html\(date_i18n\('[^']*',\s*strtotime\('([^']*)'\)\)\);\s*\?>/g, (match, offset) => {
    const d = new Date();
    const months = parseInt(offset.replace(/[^-\d]/g, '')) || 0;
    d.setMonth(d.getMonth() + months);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });
  html = html.replace(/<\?php\s+printf\(esc_html__\('([^']*)',\s*'cahit-theme'\),\s*'<span>'\s*\.\s*get_search_query\(\)\s*\.\s*'<\/span>'\);\s*\?>/g, '$1');

  // Active nav links
  const activeChecks = {
    home: 'is_front_page\\(\\)',
    about: "is_page\\('about'\\)",
    services: "is_page\\('services'\\)",
    projects: "is_page\\('projects'\\)",
    clients: "is_page\\('clients'\\)",
    blog: "is_page\\('blog'\\)\\s*\\|\\|\\s*is_home\\(\\)",
    careers: "is_page\\('careers'\\)",
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

const leadsStore = [];

app.post('/api/ajax', async (req, res) => {
  const fields = await parseMultipart(req);
  const action = fields.action || (req.body && req.body.action) || '';
  if (action === 'cahit_chat') {
    res.json({ success: true, data: { reply: 'Thank you for your message. Our team will get back to you soon. You can also reach us at ctc@cahitcontracting.com or call +968 2411 2406.' } });
  } else {
    if (fields.name || fields.email) {
      leadsStore.push({
        id: leadsStore.length + 1,
        name: fields.name || '',
        email: fields.email || '',
        phone: fields.phone || '',
        service_type: fields.service_type || '',
        details: fields.details || '',
        status: 'new',
        created_at: new Date().toISOString().split('T')[0]
      });
    }
    res.json({ success: true, data: { id: leadsStore.length } });
  }
});

const OPENAI_KEY_FILE = path.join(DATA_DIR, 'openai-key.json');
function loadOpenAIKey() {
  const envKey = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || process.env.OPEN_AI_KEY || '';
  if (envKey) return envKey;
  try {
    if (fs.existsSync(OPENAI_KEY_FILE)) {
      return JSON.parse(fs.readFileSync(OPENAI_KEY_FILE, 'utf8')).key || '';
    }
  } catch (e) {}
  return '';
}

app.get('/api/chat-status', (req, res) => {
  const key = loadOpenAIKey();
  res.json({ hasKey: !!key, keySource: process.env.OPENAI_API_KEY ? 'env' : (key ? 'file' : 'none'), keyPreview: key ? key.substring(0, 7) + '...' : '' });
});
function saveOpenAIKey(key) {
  try { fs.writeFileSync(OPENAI_KEY_FILE, JSON.stringify({ key }, null, 2)); } catch (e) {}
}

app.post('/admin/api/save-openai-key', express.json(), (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || (!adminTokens.has(token) && !verifyAdminToken(token))) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  const { key } = req.body || {};
  saveOpenAIKey(key || '');
  res.json({ success: true });
});

app.get('/admin/api/openai-key-status', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || ((!adminTokens.has(token) && !verifyAdminToken(token)) && !verifyAdminToken(token))) {
    return res.status(401).json({ success: false });
  }
  const key = loadOpenAIKey();
  res.json({ success: true, hasKey: !!key, maskedKey: key ? 'sk-...' + key.slice(-4) : '' });
});

const CAHIT_BASE_PROMPT = `You are the Cahit Assistant, a helpful AI assistant for Cahit Trading & Contracting LLC, a marine and coastal construction company based in Oman.

Company Information:
- Full name: Cahit Trading & Contracting LLC
- Location: Khaleej Tower, 6th floor, No 603, Ghala, Muscat, Sultanate of Oman
- Phone: +968 2411 2406 Ext: 101, +968 9096 6562 (Oman)
- Email: ctc@cahitcontracting.com

Services:
1. Marine & Coastal Construction (sea harbors, breakwaters, groynes, revetments)
2. Infrastructure Development (utilities, roads, industrial facilities)
3. Earthworks (excavation, grading, leveling, compaction)
4. Dewatering & Shoring (wellpoint systems, deep wells, sheet piling, soldier walls)
5. MEP Works (water & wastewater treatment, pumping stations, industrial piping, irrigation)
6. General Construction (residential, commercial, industrial building solutions)

Be professional, helpful, and concise. If asked about pricing or specific project details, encourage the visitor to contact the team directly. Respond in the same language the user writes in (English or Arabic).`;

const KNOWLEDGE_FILE_PROJECT = path.join(__dirname, 'chatbot-knowledge.json');
const KNOWLEDGE_FILE_TMP = path.join('/tmp', 'chatbot-knowledge.json');
function loadKnowledge() {
  if (process.env.CHATBOT_KNOWLEDGE) {
    try { return JSON.parse(Buffer.from(process.env.CHATBOT_KNOWLEDGE, 'base64').toString('utf8')); } catch (e) {}
  }
  try {
    if (fs.existsSync(KNOWLEDGE_FILE_PROJECT)) {
      return JSON.parse(fs.readFileSync(KNOWLEDGE_FILE_PROJECT, 'utf8'));
    }
  } catch (e) {}
  try {
    if (fs.existsSync(KNOWLEDGE_FILE_TMP)) {
      return JSON.parse(fs.readFileSync(KNOWLEDGE_FILE_TMP, 'utf8'));
    }
  } catch (e) {}
  return { entries: [], personality: '', language: 'en', position: 'right' };
}
function saveKnowledge(data) {
  try { fs.writeFileSync(KNOWLEDGE_FILE_PROJECT, JSON.stringify(data, null, 2)); } catch (e) {}
  try { fs.writeFileSync(KNOWLEDGE_FILE_TMP, JSON.stringify(data, null, 2)); } catch (e) {}
}
function buildSystemPrompt() {
  let prompt = CAHIT_BASE_PROMPT;
  const knowledge = loadKnowledge();
  if (knowledge.entries && knowledge.entries.length > 0) {
    prompt += '\n\nAdditional Company Knowledge:';
    knowledge.entries.forEach(function(e) {
      if (e.title || e.content) {
        prompt += '\n\n' + (e.title ? '## ' + e.title + '\n' : '') + (e.content || '');
      }
    });
  }
  if (knowledge.personality) {
    prompt += '\n\nBehavior Instructions: ' + knowledge.personality;
  }
  if (knowledge.language === 'ar') {
    prompt += '\n\nIMPORTANT: Default to responding in Arabic unless the user writes in English.';
  } else {
    prompt += '\n\nIMPORTANT: Default to responding in English unless the user writes in Arabic.';
  }
  return prompt;
}

app.get('/admin/api/chatbot-knowledge', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || (!adminTokens.has(token) && !verifyAdminToken(token))) {
    return res.status(401).json({ success: false });
  }
  res.json({ success: true, data: loadKnowledge() });
});

app.post('/admin/api/chatbot-knowledge', express.json(), (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || (!adminTokens.has(token) && !verifyAdminToken(token))) {
    return res.status(401).json({ success: false });
  }
  const { entries, personality, language, position } = req.body || {};
  saveKnowledge({ entries: entries || [], personality: personality || '', language: language || 'en', position: position || 'right' });
  res.json({ success: true });
});

app.get('/admin/api/chatbot-knowledge-export', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || (!adminTokens.has(token) && !verifyAdminToken(token))) {
    return res.status(401).json({ success: false });
  }
  const knowledge = loadKnowledge();
  const encoded = Buffer.from(JSON.stringify(knowledge)).toString('base64');
  res.json({ success: true, envValue: encoded });
});

app.get('/api/chatbot-settings', (req, res) => {
  const knowledge = loadKnowledge();
  res.json({ language: knowledge.language || 'en', position: knowledge.position || 'right' });
});

const chatSessions = {};

app.post('/api/chat', express.json(), async (req, res) => {
  const { message, sessionId } = req.body || {};
  if (!message) return res.json({ reply: 'Please type a message.' });

  const apiKey = loadOpenAIKey();
  if (!apiKey) {
    return res.json({ reply: 'Thank you for your message. Our team will get back to you soon. You can reach us at ctc@cahitcontracting.com or call +968 2411 2406 Ext: 101.' });
  }

  try {
    if (!chatSessions[sessionId]) {
      chatSessions[sessionId] = [{ role: 'system', content: buildSystemPrompt() }];
    }
    chatSessions[sessionId].push({ role: 'user', content: message });
    if (chatSessions[sessionId].length > 20) {
      chatSessions[sessionId] = [chatSessions[sessionId][0], ...chatSessions[sessionId].slice(-10)];
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: chatSessions[sessionId], max_tokens: 500, temperature: 0.7 })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    const reply = data.choices[0].message.content;
    chatSessions[sessionId].push({ role: 'assistant', content: reply });
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message || err);
    res.json({ reply: 'Sorry, I\'m having trouble right now. Please contact us at ctc@cahitcontracting.com or call +968 2411 2406 Ext: 101.', error: err.message || 'Unknown error' });
  }
});

// Admin dashboard
const ADMIN_DIR = path.join(THEME_DIR, 'admin');

app.post('/admin/api/login', express.json(), (req, res) => {
  const { username, password } = req.body || {};
  const creds = loadCredentials();
  if ((username === creds.username || username === 'admin@cahitcontracting.com') && password === creds.password) {
    const token = createAdminToken(username);
    adminTokens.add(token);
    res.json({ success: true, token, user: { name: 'Admin', role: 'administrator' } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

app.post('/admin/api/change-credentials', express.json(), (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || (!adminTokens.has(token) && !verifyAdminToken(token))) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  const { currentPassword, newUsername, newPassword } = req.body || {};
  const creds = loadCredentials();
  if (currentPassword !== creds.password) {
    return res.status(400).json({ success: false, message: 'Current password is incorrect' });
  }
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
  }
  creds.username = newUsername && newUsername.trim() ? newUsername.trim() : creds.username;
  creds.password = newPassword;
  saveCredentials(creds);
  adminTokens.clear();
  const newToken = createAdminToken(creds.username);
  adminTokens.add(newToken);
  res.json({ success: true, token: newToken, message: 'Credentials updated successfully' });
});

app.get('/admin/api/verify', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (token && (adminTokens.has(token) || verifyAdminToken(token))) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

const UPLOADS_DIR = process.env.VERCEL ? '/tmp/uploads' : path.join(THEME_DIR, 'uploads');
try { if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true }); } catch (e) {}

app.use('/uploads', express.static(UPLOADS_DIR));

app.post('/admin/api/upload', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || (!adminTokens.has(token) && !verifyAdminToken(token))) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    return res.status(400).json({ success: false, message: 'Expected multipart/form-data' });
  }

  const boundary = contentType.split('boundary=')[1];
  if (!boundary) {
    return res.status(400).json({ success: false, message: 'No boundary found' });
  }

  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    const buffer = Buffer.concat(chunks);
    const boundaryBuf = Buffer.from('--' + boundary);
    const parts = [];
    let start = 0;
    while (true) {
      const idx = buffer.indexOf(boundaryBuf, start);
      if (idx === -1) break;
      if (start > 0) parts.push(buffer.slice(start, idx));
      start = idx + boundaryBuf.length;
    }

    let fileBuffer = null;
    let originalName = 'upload';
    let mimeType = 'application/octet-stream';

    for (const part of parts) {
      const headerEnd = part.indexOf('\r\n\r\n');
      if (headerEnd === -1) continue;
      const headers = part.slice(0, headerEnd).toString();
      if (!headers.includes('filename=')) continue;
      const nameMatch = headers.match(/filename="([^"]+)"/);
      if (nameMatch) originalName = nameMatch[1];
      const typeMatch = headers.match(/Content-Type:\s*(.+)/i);
      if (typeMatch) mimeType = typeMatch[1].trim();
      let body = part.slice(headerEnd + 4);
      if (body[body.length - 2] === 13 && body[body.length - 1] === 10) {
        body = body.slice(0, body.length - 2);
      }
      fileBuffer = body;
      break;
    }

    if (!fileBuffer) {
      return res.status(400).json({ success: false, message: 'No file found in upload' });
    }

    const ext = path.extname(originalName) || '.bin';
    const safeName = Date.now() + '-' + crypto.randomBytes(4).toString('hex') + ext;
    const filePath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(filePath, fileBuffer);

    const fileUrl = '/uploads/' + safeName;
    res.json({
      success: true,
      url: fileUrl,
      name: originalName,
      size: fileBuffer.length,
      type: mimeType
    });
  });
});

app.get('/admin/api/uploads', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token || (!adminTokens.has(token) && !verifyAdminToken(token))) {
    return res.status(401).json({ success: false });
  }
  const files = fs.readdirSync(UPLOADS_DIR).map(name => {
    const stat = fs.statSync(path.join(UPLOADS_DIR, name));
    return { name, url: '/uploads/' + name, size: stat.size, date: stat.mtime.toISOString().split('T')[0] };
  });
  res.json({ success: true, files });
});

app.post('/admin/api/logout', express.json(), (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  adminTokens.delete(token);
  res.json({ success: true });
});

app.get('/admin/login', (req, res) => {
  const loginFile = fs.existsSync(path.join(ADMIN_DIR, 'login.php'))
    ? path.join(ADMIN_DIR, 'login.php')
    : path.join(ADMIN_DIR, 'login.html');
  let content = fs.readFileSync(loginFile, 'utf8');
  content = content.replace(/<\?php[\s\S]*?\?>/g, '');
  res.send(content);
});

app.use('/admin', express.static(ADMIN_DIR));

app.get('/admin', (req, res) => {
  const indexFile = fs.existsSync(path.join(ADMIN_DIR, 'index.php'))
    ? path.join(ADMIN_DIR, 'index.php')
    : path.join(ADMIN_DIR, 'index.html');
  let content = fs.readFileSync(indexFile, 'utf8');
  content = content.replace(/<\?php[\s\S]*?\?>/g, '');
  res.send(content);
});

app.get('/admin/api/leads', (req, res) => {
  res.json({ success: true, data: leadsStore });
});

app.post('/admin/api/leads', express.json(), (req, res) => {
  const lead = {
    id: leadsStore.length + 1,
    name: req.body.name || '',
    email: req.body.email || '',
    phone: req.body.phone || '',
    service_type: req.body.service_type || '',
    details: req.body.details || '',
    status: 'new',
    created_at: new Date().toISOString().split('T')[0]
  };
  leadsStore.push(lead);
  res.json({ success: true, data: lead });
});

app.get('/admin/api/pages', (req, res) => {
  const pages = [
    { name: 'Home', path: '/', template: 'front-page.php', status: 'published' },
    { name: 'About Us', path: '/about', template: 'page-about.php', status: 'published' },
    { name: 'Services', path: '/services', template: 'page-services.php', status: 'published' },
    { name: 'Projects', path: '/projects', template: 'page-projects.php', status: 'published' },
    { name: 'Clients', path: '/clients', template: 'page-clients.php', status: 'published' },
    { name: 'Blog', path: '/blog', template: 'page-blog.php', status: 'published' },
    { name: 'Careers', path: '/careers', template: 'page-careers.php', status: 'published' }
  ];
  res.json({ success: true, data: pages });
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

app.get('/clients', (req, res) => {
  const content = readThemeFile('page-clients.php');
  res.send(executePhpTemplate(content, 'clients'));
});

app.get('/blog', (req, res) => {
  const content = readThemeFile('page-blog.php');
  res.send(executePhpTemplate(content, 'blog'));
});

app.get('/careers', (req, res) => {
  const content = readThemeFile('page-careers.php');
  res.send(executePhpTemplate(content, 'careers'));
});

app.get('/404', (req, res) => {
  const content = readThemeFile('404.php');
  res.send(executePhpTemplate(content, '404'));
});

app.use((req, res) => {
  const content = readThemeFile('404.php');
  res.status(404).send(executePhpTemplate(content, '404'));
});

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WordPress theme preview server running on http://0.0.0.0:${PORT}`);
    console.log(`Theme dir: ${THEME_DIR}`);
  });
}

module.exports = app;
