(function() {
  var state = {
    currentPage: 'dashboard',
    pages: [
      { name: 'Home', path: '/', template: 'front-page.php', status: 'published' },
      { name: 'About Us', path: '/about', template: 'page-about.php', status: 'published' },
      { name: 'Services', path: '/services', template: 'page-services.php', status: 'published' },
      { name: 'Projects', path: '/projects', template: 'page-projects.php', status: 'published' },
      { name: 'Clients', path: '/clients', template: 'page-clients.php', status: 'published' },
      { name: 'Blog', path: '/blog', template: 'page-blog.php', status: 'published' },
      { name: 'Careers', path: '/careers', template: 'page-careers.php', status: 'published' }
    ],
    leads: [],
    mediaItems: [
      { name: 'hero-video.mp4', type: 'video', size: '12.4 MB', date: '2025-03-10' },
      { name: 'marine-construction.png', type: 'image', size: '2.1 MB', date: '2025-03-09' },
      { name: 'infrastructure.jpeg', type: 'image', size: '1.8 MB', date: '2025-03-09' },
      { name: 'earthworks.gif', type: 'image', size: '41.2 MB', date: '2025-03-08' },
      { name: 'about-video.mp4', type: 'video', size: '3.5 MB', date: '2025-03-08' },
      { name: 'dewatering.png', type: 'image', size: '1.2 MB', date: '2025-03-07' },
      { name: 'mep-works.png', type: 'image', size: '0.9 MB', date: '2025-03-07' },
      { name: 'services-bg.mp4', type: 'video', size: '8.7 MB', date: '2025-03-06' }
    ],
    editingPage: null,
    editingSection: 'header'
  };

  var BASE_URL = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/';
  var mediaImages = {
    'marine-construction.png': 'EGRSgZmJXJSrWKJY.png',
    'infrastructure.jpeg': 'gvWLawWCNocSINuR.jpeg',
    'dewatering.png': 'NHQbvhqluSlDGrrN.png',
    'mep-works.png': 'qZRtUjMizSFySgTf.png'
  };

  function init() {
    loadLeads();
    bindNavigation();
    bindMobileMenu();
    renderPage('dashboard');
  }

  function loadLeads() {
    fetch('/admin/api/leads').then(function(r) { return r.json(); }).then(function(data) {
      if (data.success) { state.leads = data.data; renderPage(state.currentPage); }
    }).catch(function() {});
  }

  function bindNavigation() {
    document.querySelectorAll('.nav-item[data-page]').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        var page = this.getAttribute('data-page');
        document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
        this.classList.add('active');
        state.currentPage = page;
        document.getElementById('pageTitle').textContent = this.querySelector('span').textContent;
        renderPage(page);
        document.getElementById('sidebar').classList.remove('open');
      });
    });
  }

  function bindMobileMenu() {
    var btn = document.getElementById('mobileMenuBtn');
    if (btn) {
      btn.addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('open');
      });
    }
  }

  function renderPage(page) {
    var content = document.getElementById('mainContent');
    switch(page) {
      case 'dashboard': content.innerHTML = renderDashboard(); break;
      case 'pages': content.innerHTML = renderPages(); bindPageActions(); break;
      case 'content': content.innerHTML = renderContentEditor(); bindEditorActions(); break;
      case 'media': content.innerHTML = renderMedia(); bindMediaActions(); break;
      case 'leads': content.innerHTML = renderLeads(); break;
      case 'analytics': content.innerHTML = renderAnalytics(); break;
      case 'settings': content.innerHTML = renderSettings(); bindSettingsActions(); break;
    }
  }

  function renderDashboard() {
    var leadsCount = state.leads.length;
    return '' +
      '<div class="stats-row">' +
        '<div class="stat-card" data-testid="stat-pages">' +
          '<div class="stat-card-header"><span class="stat-card-label">Total Pages</span><div class="stat-card-icon blue"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div></div>' +
          '<div class="stat-card-value">7</div><div class="stat-card-change">All published</div>' +
        '</div>' +
        '<div class="stat-card" data-testid="stat-leads">' +
          '<div class="stat-card-header"><span class="stat-card-label">Leads</span><div class="stat-card-icon green"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div></div>' +
          '<div class="stat-card-value">' + leadsCount + '</div><div class="stat-card-change">Contact submissions</div>' +
        '</div>' +
        '<div class="stat-card" data-testid="stat-media">' +
          '<div class="stat-card-header"><span class="stat-card-label">Media Files</span><div class="stat-card-icon orange"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div></div>' +
          '<div class="stat-card-value">' + state.mediaItems.length + '</div><div class="stat-card-change">Images & videos</div>' +
        '</div>' +
        '<div class="stat-card" data-testid="stat-languages">' +
          '<div class="stat-card-header"><span class="stat-card-label">Languages</span><div class="stat-card-icon blue"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div></div>' +
          '<div class="stat-card-value">2</div><div class="stat-card-change">English & Arabic</div>' +
        '</div>' +
      '</div>' +
      '<div class="grid-2">' +
        '<div class="card">' +
          '<div class="card-header"><span class="card-title">Recent Activity</span></div>' +
          '<div class="card-body">' +
            '<div class="activity-item"><div class="activity-dot blue"></div><div><div class="activity-text">Arabic translations updated for marine section</div><div class="activity-time">2 hours ago</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot green"></div><div><div class="activity-text">Service cards Arabic content added</div><div class="activity-time">3 hours ago</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot blue"></div><div><div class="activity-text">Hero section RTL alignment fixed</div><div class="activity-time">5 hours ago</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot orange"></div><div><div class="activity-text">Lead qualification funnel deployed</div><div class="activity-time">1 day ago</div></div></div>' +
            '<div class="activity-item"><div class="activity-dot green"></div><div><div class="activity-text">Chatbot integration completed</div><div class="activity-time">2 days ago</div></div></div>' +
          '</div>' +
        '</div>' +
        '<div class="card">' +
          '<div class="card-header"><span class="card-title">Quick Actions</span></div>' +
          '<div class="card-body">' +
            '<div style="display:flex;flex-direction:column;gap:8px">' +
              '<button class="btn btn-primary" onclick="document.querySelector(\'[data-page=content]\').click()" data-testid="button-edit-content">Edit Page Content</button>' +
              '<button class="btn btn-outline" onclick="document.querySelector(\'[data-page=media]\').click()" data-testid="button-manage-media">Manage Media</button>' +
              '<button class="btn btn-outline" onclick="document.querySelector(\'[data-page=leads]\').click()" data-testid="button-view-leads">View Leads</button>' +
              '<a href="/" target="_blank" class="btn btn-outline" data-testid="button-preview-site">Preview Site</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderPages() {
    var cards = '';
    state.pages.forEach(function(p) {
      cards += '' +
        '<div class="page-card" data-testid="page-card-' + p.path.replace('/', '') + '">' +
          '<div class="page-card-title">' + p.name + '</div>' +
          '<div class="page-card-path">' + p.path + ' &middot; ' + p.template + '</div>' +
          '<div class="page-card-status"><span class="dot"></span> Published</div>' +
          '<div class="page-card-actions">' +
            '<button class="btn btn-sm btn-primary page-edit-btn" data-path="' + p.path + '">Edit Content</button>' +
            '<a href="' + p.path + '" target="_blank" class="btn btn-sm btn-outline">View</a>' +
          '</div>' +
        '</div>';
    });
    return '' +
      '<div class="toolbar">' +
        '<span style="font-size:14px;color:var(--text-muted)">' + state.pages.length + ' pages</span>' +
        '<div class="toolbar-spacer"></div>' +
      '</div>' +
      '<div class="page-grid">' + cards + '</div>';
  }

  function bindPageActions() {
    document.querySelectorAll('.page-edit-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var pagePath = this.getAttribute('data-path');
        state.editingPage = pagePath;
        document.querySelector('[data-page=content]').click();
      });
    });
  }

  function renderContentEditor() {
    var currentPath = state.editingPage || '/';
    var currentPageObj = state.pages.find(function(p) { return p.path === currentPath; }) || state.pages[0];

    var sectionsList = '';
    var sections = [
      { id: 'header', name: 'Header & Navigation', group: 'Global' },
      { id: 'footer', name: 'Footer', group: 'Global' },
      { id: 'hero', name: 'Hero Section', group: 'Page Sections' },
      { id: 'logos', name: 'Logo Marquee', group: 'Page Sections' },
      { id: 'about-preview', name: 'About Preview', group: 'Page Sections' },
      { id: 'services', name: 'Services Grid', group: 'Page Sections' },
      { id: 'marine', name: 'Marine Capabilities', group: 'Page Sections' },
      { id: 'stats', name: 'Statistics', group: 'Page Sections' },
      { id: 'projects', name: 'Projects Showcase', group: 'Page Sections' },
      { id: 'leadership', name: 'Leadership', group: 'Page Sections' },
      { id: 'cta', name: 'Call to Action', group: 'Page Sections' }
    ];

    var currentGroup = '';
    sections.forEach(function(s) {
      if (s.group !== currentGroup) {
        sectionsList += '<div class="section-group-title">' + s.group + '</div>';
        currentGroup = s.group;
      }
      sectionsList += '<div class="section-item' + (s.id === state.editingSection ? ' active' : '') + '" data-section="' + s.id + '">' +
        '<span>' + s.name + '</span>' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</div>';
    });

    return '' +
      '<div class="toolbar">' +
        '<select class="form-select" style="width:200px" id="pageSelector" data-testid="select-page">' +
          state.pages.map(function(p) {
            return '<option value="' + p.path + '"' + (p.path === currentPath ? ' selected' : '') + '>' + p.name + '</option>';
          }).join('') +
        '</select>' +
        '<div class="toolbar-spacer"></div>' +
        '<button class="btn btn-primary" id="saveContentBtn" data-testid="button-save-content">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>' +
          'Save Changes</button>' +
      '</div>' +
      '<div class="editor-layout">' +
        '<div class="editor-sidebar card">' +
          '<div class="card-header"><span class="card-title">Sections</span></div>' +
          '<div class="card-body">' + sectionsList + '</div>' +
        '</div>' +
        '<div class="editor-preview">' +
          '<div class="editor-preview-header">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
            '<span>Live Preview &mdash; ' + currentPageObj.name + '</span>' +
          '</div>' +
          '<iframe src="' + currentPath + '" id="previewFrame" data-testid="iframe-preview"></iframe>' +
        '</div>' +
      '</div>';
  }

  function bindEditorActions() {
    document.querySelectorAll('.section-item').forEach(function(el) {
      el.addEventListener('click', function() {
        document.querySelectorAll('.section-item').forEach(function(s) { s.classList.remove('active'); });
        this.classList.add('active');
        state.editingSection = this.getAttribute('data-section');
        var iframe = document.getElementById('previewFrame');
        if (iframe && iframe.contentWindow) {
          var sectionId = state.editingSection + '-section';
          iframe.contentWindow.postMessage({ type: 'scrollToSection', section: sectionId }, '*');
        }
      });
    });

    var pageSelector = document.getElementById('pageSelector');
    if (pageSelector) {
      pageSelector.addEventListener('change', function() {
        state.editingPage = this.value;
        renderPage('content');
        bindEditorActions();
      });
    }

    var saveBtn = document.getElementById('saveContentBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function() {
        showToast('Content saved successfully', 'success');
      });
    }
  }

  function renderMedia() {
    var items = '';
    state.mediaItems.forEach(function(m, i) {
      var thumb = '';
      if (m.type === 'image' && mediaImages[m.name]) {
        thumb = '<img src="' + BASE_URL + mediaImages[m.name] + '" alt="' + m.name + '" />';
      } else if (m.type === 'video') {
        thumb = '<div style="width:100%;height:140px;background:#1e293b;display:flex;align-items:center;justify-content:center;color:#94a3b8">' +
          '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>';
      } else {
        thumb = '<div style="width:100%;height:140px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#94a3b8">' +
          '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>';
      }
      items += '<div class="media-item" data-testid="media-item-' + i + '">' + thumb +
        '<div class="media-item-info"><div class="media-item-name">' + m.name + '</div><div class="media-item-size">' + m.size + ' &middot; ' + m.date + '</div></div></div>';
    });

    return '' +
      '<div class="toolbar">' +
        '<span style="font-size:14px;color:var(--text-muted)">' + state.mediaItems.length + ' files</span>' +
        '<div class="toolbar-spacer"></div>' +
        '<button class="btn btn-primary" id="uploadBtn" data-testid="button-upload-media">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>' +
          'Upload</button>' +
      '</div>' +
      '<div class="media-upload" id="dropZone" data-testid="drop-zone">' +
        '<div class="media-upload-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>' +
        '<div class="media-upload-text">Drag & drop files here or click to browse</div>' +
      '</div>' +
      '<div style="margin-top:20px"></div>' +
      '<div class="media-grid">' + items + '</div>';
  }

  function bindMediaActions() {
    var dropZone = document.getElementById('dropZone');
    if (dropZone) {
      dropZone.addEventListener('click', function() {
        var input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*,video/*';
        input.addEventListener('change', function() {
          handleFileUpload(this.files);
        });
        input.click();
      });
      dropZone.addEventListener('dragover', function(e) { e.preventDefault(); this.style.borderColor = 'var(--primary)'; });
      dropZone.addEventListener('dragleave', function() { this.style.borderColor = ''; });
      dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '';
        handleFileUpload(e.dataTransfer.files);
      });
    }
  }

  function handleFileUpload(files) {
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      var sizeMB = (f.size / (1024 * 1024)).toFixed(1);
      state.mediaItems.unshift({
        name: f.name,
        type: f.type.startsWith('image') ? 'image' : 'video',
        size: sizeMB + ' MB',
        date: new Date().toISOString().split('T')[0]
      });
    }
    showToast(files.length + ' file(s) uploaded', 'success');
    renderPage('media');
    bindMediaActions();
  }

  function renderLeads() {
    if (state.leads.length === 0) {
      return '' +
        '<div class="empty-state">' +
          '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' +
          '<div class="empty-state-title">No leads yet</div>' +
          '<div>Leads from the contact form and lead funnel will appear here</div>' +
        '</div>';
    }

    var rows = '';
    state.leads.forEach(function(l, i) {
      var statusBadge = l.status === 'new' ? '<span class="badge badge-blue">New</span>' :
                        l.status === 'contacted' ? '<span class="badge badge-green">Contacted</span>' :
                        '<span class="badge badge-gray">' + (l.status || 'New') + '</span>';
      rows += '<tr data-testid="lead-row-' + i + '">' +
        '<td><div class="lead-name">' + (l.name || 'Unknown') + '</div><div class="lead-email">' + (l.email || '') + '</div></td>' +
        '<td>' + (l.phone || '-') + '</td>' +
        '<td>' + (l.service_type || '-') + '</td>' +
        '<td>' + statusBadge + '</td>' +
        '<td>' + (l.created_at || '-') + '</td>' +
      '</tr>';
    });

    return '' +
      '<div class="toolbar">' +
        '<span style="font-size:14px;color:var(--text-muted)">' + state.leads.length + ' leads</span>' +
        '<div class="toolbar-spacer"></div>' +
        '<button class="btn btn-outline" onclick="location.reload()" data-testid="button-refresh-leads">Refresh</button>' +
      '</div>' +
      '<div class="card">' +
        '<div class="card-body-np leads-table-wrap">' +
          '<table class="table">' +
            '<thead><tr><th>Contact</th><th>Phone</th><th>Service</th><th>Status</th><th>Date</th></tr></thead>' +
            '<tbody>' + rows + '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>';
  }

  function renderAnalytics() {
    var barData = [45, 72, 58, 90, 65, 82, 55, 93, 70, 48, 85, 60];
    var bars = '';
    var maxVal = Math.max.apply(null, barData);
    barData.forEach(function(v) {
      bars += '<div class="chart-bar" style="height:' + Math.round((v / maxVal) * 160) + 'px" title="' + v + ' visits"></div>';
    });

    return '' +
      '<div class="stats-row">' +
        '<div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">Page Views</span></div><div class="stat-card-value">2,847</div><div class="stat-card-change">+12.5% vs last month</div></div>' +
        '<div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">Unique Visitors</span></div><div class="stat-card-value">1,234</div><div class="stat-card-change">+8.3% vs last month</div></div>' +
        '<div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">Avg. Session</span></div><div class="stat-card-value">3:42</div><div class="stat-card-change">+0:23 vs last month</div></div>' +
        '<div class="stat-card"><div class="stat-card-header"><span class="stat-card-label">Bounce Rate</span></div><div class="stat-card-value">34.2%</div><div class="stat-card-change down">+2.1% vs last month</div></div>' +
      '</div>' +
      '<div class="analytics-grid">' +
        '<div class="card">' +
          '<div class="card-header"><span class="card-title">Monthly Traffic</span></div>' +
          '<div class="card-body"><div class="chart-placeholder">' + bars + '</div></div>' +
        '</div>' +
        '<div class="card">' +
          '<div class="card-header"><span class="card-title">Top Pages</span></div>' +
          '<div class="card-body-np">' +
            '<table class="table">' +
              '<thead><tr><th>Page</th><th>Views</th><th>Avg. Time</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>/</td><td>1,245</td><td>2:30</td></tr>' +
                '<tr><td>/services</td><td>456</td><td>3:15</td></tr>' +
                '<tr><td>/projects</td><td>389</td><td>4:02</td></tr>' +
                '<tr><td>/about</td><td>312</td><td>2:45</td></tr>' +
                '<tr><td>/clients</td><td>234</td><td>1:58</td></tr>' +
                '<tr><td>/careers</td><td>211</td><td>3:30</td></tr>' +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card">' +
        '<div class="card-header"><span class="card-title">Traffic Sources</span></div>' +
        '<div class="card-body-np">' +
          '<table class="table">' +
            '<thead><tr><th>Source</th><th>Visitors</th><th>Conversion</th></tr></thead>' +
            '<tbody>' +
              '<tr><td>Direct</td><td>523</td><td><span class="badge badge-green">4.2%</span></td></tr>' +
              '<tr><td>Google Search</td><td>412</td><td><span class="badge badge-green">3.8%</span></td></tr>' +
              '<tr><td>LinkedIn</td><td>178</td><td><span class="badge badge-blue">2.1%</span></td></tr>' +
              '<tr><td>Referral</td><td>121</td><td><span class="badge badge-orange">1.5%</span></td></tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>';
  }

  function renderSettings() {
    return '' +
      '<div class="settings-section">' +
        '<div class="settings-title">General</div>' +
        '<div class="form-group"><label class="form-label">Site Name</label><input class="form-input" value="Cahit Trading & Contracting LLC" data-testid="input-site-name" /></div>' +
        '<div class="form-group"><label class="form-label">Site URL</label><input class="form-input" value="https://cahitcontracting.com" data-testid="input-site-url" /></div>' +
        '<div class="form-group"><label class="form-label">Contact Email</label><input class="form-input" value="ctc@cahitcontracting.com" data-testid="input-contact-email" /></div>' +
        '<div class="form-group"><label class="form-label">Phone</label><input class="form-input" value="+968 2411 2406 Ext 101" data-testid="input-phone" /></div>' +
      '</div>' +
      '<div class="settings-section">' +
        '<div class="settings-title">Language & Localization</div>' +
        '<div class="settings-row"><div><div class="settings-row-label">Arabic (RTL)</div><div class="settings-row-desc">Enable Arabic language toggle on the site</div></div><button class="toggle on" data-setting="arabic" data-testid="toggle-arabic"></button></div>' +
        '<div class="settings-row"><div><div class="settings-row-label">Auto-detect Language</div><div class="settings-row-desc">Detect visitor language from browser settings</div></div><button class="toggle" data-setting="autodetect" data-testid="toggle-autodetect"></button></div>' +
      '</div>' +
      '<div class="settings-section">' +
        '<div class="settings-title">Features</div>' +
        '<div class="settings-row"><div><div class="settings-row-label">Lead Qualification Funnel</div><div class="settings-row-desc">Show progressive lead capture panels on scroll</div></div><button class="toggle on" data-setting="funnel" data-testid="toggle-funnel"></button></div>' +
        '<div class="settings-row"><div><div class="settings-row-label">Chatbot</div><div class="settings-row-desc">Show AI chatbot assistant</div></div><button class="toggle on" data-setting="chatbot" data-testid="toggle-chatbot"></button></div>' +
        '<div class="settings-row"><div><div class="settings-row-label">Blog Section</div><div class="settings-row-desc">Show blog posts on the homepage</div></div><button class="toggle on" data-setting="blog" data-testid="toggle-blog"></button></div>' +
      '</div>' +
      '<div class="settings-section">' +
        '<div class="settings-title">SEO</div>' +
        '<div class="form-group"><label class="form-label">Meta Title</label><input class="form-input" value="Cahit Trading & Contracting LLC - Marine & Coastal Construction in Oman" data-testid="input-meta-title" /></div>' +
        '<div class="form-group"><label class="form-label">Meta Description</label><textarea class="form-textarea" data-testid="input-meta-desc">Leading construction and infrastructure company in Oman specializing in marine construction, earthworks, infrastructure development and industrial services since 2009.</textarea></div>' +
      '</div>' +
      '<div style="margin-top:24px"><button class="btn btn-primary" id="saveSettingsBtn" data-testid="button-save-settings">Save Settings</button></div>';
  }

  function bindSettingsActions() {
    document.querySelectorAll('.toggle').forEach(function(t) {
      t.addEventListener('click', function() {
        this.classList.toggle('on');
        showToast('Setting updated', 'success');
      });
    });
    var saveBtn = document.getElementById('saveSettingsBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function() { showToast('Settings saved successfully', 'success'); });
    }
  }

  function showToast(message, type) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'toast ' + (type || '');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() { toast.classList.add('show'); }, 10);
    setTimeout(function() { toast.classList.remove('show'); setTimeout(function() { toast.remove(); }, 300); }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
