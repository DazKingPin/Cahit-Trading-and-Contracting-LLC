<?php get_header(); ?>

<section class="hero-banner" data-testid="section-about-hero">
  <video class="hero-banner-video" autoplay muted loop playsinline data-keep-playing="true">
    <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/FtuVECRYiIRERWQB.mp4" type="video/mp4" />
  </video>
  <div class="hero-banner-overlay"></div>
  <div class="hero-banner-content">
    <div class="container">
      <h1 class="hero-banner-title" data-testid="text-about-heading">About Us</h1>
      <p class="hero-banner-subtitle">Cahit Trading &amp; Contracting LLC partners with government authorities, developers, and industrial organizations to deliver complex infrastructure and marine construction projects across Oman.</p>
    </div>
  </div>
</section>

<section class="section bg-white" data-testid="section-company-overview">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title" data-testid="text-overview-title">Company Overview</h2>
      <p class="section-subtitle">Building critical infrastructure across Oman since 2009</p>
    </div>
    <div class="grid grid-2 gap-12 items-start">
      <div>
        <video class="overview-video rounded-2xl shadow-xl" loop muted data-hover-video="overview">
          <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/AtcBFtPQatxcgPuw.mp4" type="video/mp4" />
        </video>
        <div class="rolling-images-container mt-4" data-testid="about-rolling-images" data-rolling-images>
          <div class="rolling-image active">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/gvWLawWCNocSINuR.jpeg" alt="Road construction" />
          </div>
          <div class="rolling-image">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/GjfldJYeoGyqGIMR.jpeg" alt="Asphalt paving" />
          </div>
          <div class="rolling-image">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/jdGZtMFCClzefYrV.png" alt="Pipe installation" />
          </div>
          <div class="rolling-image">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/KwvgeYAlpTuNmOVB.png" alt="Concrete formwork" />
          </div>
        </div>
      </div>
      <div>
        <p class="text-slate-600 leading-relaxed mb-4">
          Cahit Trading &amp; Contracting LLC has been operating in Oman since 2009, delivering a wide range of construction and infrastructure services.
        </p>
        <p class="text-slate-600 leading-relaxed mb-4">
          The company has successfully participated in major projects across marine construction, infrastructure development and industrial services.
        </p>
        <p class="text-slate-600 leading-relaxed mb-8">
          Through experienced leadership and skilled engineering teams, Cahit continues to contribute to the development of critical infrastructure throughout the region.
        </p>
        <a href="<?php echo esc_url(home_url('/services')); ?>" class="btn btn-primary" data-testid="button-view-services">
          View Our Services
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white" data-testid="section-stats">
  <div class="container">
    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-number" data-counter="15" data-suffix="+" data-testid="stat-years">15+</div>
        <p class="stat-label">Years Experience</p>
      </div>
      <div class="stat-item">
        <div class="stat-number" data-counter="50" data-suffix="+" data-testid="stat-projects">50+</div>
        <p class="stat-label">Projects Completed</p>
      </div>
      <div class="stat-item">
        <div class="stat-number" data-counter="100" data-suffix="%" data-testid="stat-satisfaction">100%</div>
        <p class="stat-label">Client Satisfaction</p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white" data-testid="section-mission-vision">
  <div class="container">
    <div class="grid grid-2 gap-12">
      <div class="mission-vision-card">
        <h3 class="card-title">Our Mission</h3>
        <p class="text-slate-600 leading-relaxed">
          To apply our knowledge and experience in the construction industry to deliver high-quality infrastructure projects while contributing to the development of Oman.
        </p>
      </div>
      <div class="mission-vision-card">
        <h3 class="card-title">Our Vision</h3>
        <p class="text-slate-600 leading-relaxed">
          To become a leading regional contractor recognized for excellence in marine construction, infrastructure development and industrial services.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-slate-50" data-testid="section-leadership">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title" data-testid="text-leadership-title">Leadership</h2>
      <p class="section-subtitle">Meet the professionals behind Cahit Trading &amp; Contracting.</p>
    </div>
    <div class="grid grid-2 gap-8 max-w-5xl mx-auto">
      <div class="leader-card" data-testid="card-leader-tahir">
        <div class="leader-video-container" data-hover-video="tahir">
          <video class="leader-video" loop muted>
            <source src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/videos/tahir.mp4" type="video/mp4" />
          </video>
          <div class="leader-video-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="play-icon"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            <span class="hover-label">Hover to Watch</span>
          </div>
        </div>
        <div class="leader-info">
          <h3 class="leader-name">Tahir Şenyurt</h3>
          <p class="leader-role">Managing Director</p>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">
            Tahir Şenyurt is a Civil Engineer with over 25 years of experience in the construction and contracting industry. He has successfully led numerous projects including marine infrastructure, road construction, industrial facilities and residential developments across Turkey and the GCC.
          </p>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">
            As Managing Director of Cahit Trading &amp; Contracting LLC, he leads the company's operations and strategic growth within Oman's construction sector.
          </p>
          <div class="leader-details">
            <div>
              <p class="detail-label">Education</p>
              <p class="detail-value">Bachelor of Civil Engineering &mdash; University of Middle East Technical</p>
            </div>
            <div>
              <p class="detail-label">License</p>
              <p class="detail-value">Registered Civil Engineer</p>
            </div>
          </div>
        </div>
      </div>

      <div class="leader-card" data-testid="card-leader-pasha">
        <div class="leader-video-container" data-hover-video="pasha">
          <video class="leader-video" loop muted>
            <source src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/videos/pasha.mp4" type="video/mp4" />
          </video>
          <div class="leader-video-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="play-icon"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            <span class="hover-label">Hover to Watch</span>
          </div>
        </div>
        <div class="leader-info">
          <h3 class="leader-name">Pasha H&uuml;seyin Ari</h3>
          <p class="leader-role">General Coordinator</p>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">
            Pasha H&uuml;seyin Ari holds a Master's degree in Environmental Engineering from Istanbul Technical University and brings over 15 years of experience in environmental and infrastructure-related sectors.
          </p>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">
            His expertise includes water treatment systems, desalination plants, soil improvement projects, marine construction and Oil &amp; Gas infrastructure works.
          </p>
          <div class="leader-details">
            <div>
              <p class="detail-label">Education</p>
              <p class="detail-value">MSc of Environmental Engineering &mdash; Istanbul Technical University</p>
            </div>
            <div>
              <p class="detail-label">License</p>
              <p class="detail-value">Registered Environmental Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white" data-testid="section-commitment">
  <div class="container">
    <h2 class="section-title text-center mb-12">Our Commitment</h2>
    <div class="grid grid-3 gap-8">
      <div class="commitment-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="commitment-icon"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
        <h3 class="commitment-title">Best Quality</h3>
        <p class="commitment-desc">We maintain the highest engineering and construction standards in every project.</p>
      </div>
      <div class="commitment-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="commitment-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <h3 class="commitment-title">On-Time Delivery</h3>
        <p class="commitment-desc">We respect project timelines and deliver reliable execution without compromising quality.</p>
      </div>
      <div class="commitment-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="commitment-icon"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
        <h3 class="commitment-title">Experience</h3>
        <p class="commitment-desc">Our experienced professionals ensure efficient project delivery and operational excellence.</p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-slate-50" data-testid="section-clients">
  <div class="container">
    <h2 class="section-title text-center mb-12">Trusted by Leading Organizations</h2>
    <div class="client-logos-grid">
      <div class="client-logo-card" data-testid="img-about-logo-0">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/cxoRXpdmBqwcLedo.png" alt="Doosan Heavy Industries &amp; Construction" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-1">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/qFCAQxxNiSjFqwyq.png" alt="Al Jazeera International Group" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-2">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/KXeFROoDmbydRpuQ.png" alt="Al-Hashemi &amp; Al-Rawas Trading &amp; Contracting" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-3">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/NhkgkgOdoRAutEDK.png" alt="Fisia Italimpianti" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-4">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/ssANHVRFYXALYoKI.png" alt="GPS In The New Millennium" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-5">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/IqZMAjrvgmDdBJaW.png" alt="Makyol" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-6">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/cCzhlyOLGOdtqfjD.jpg" alt="Omran" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-7">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/eGXMGushzTuSHdCj.png" alt="Salalah Sanitary Drainage Services" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-8">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/dIjoxYdtJmpPvEZG.png" alt="SNC-Lavalin" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-9">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/MrphYkzHpiuuKwNm.png" alt="STFA" />
      </div>
      <div class="client-logo-card" data-testid="img-about-logo-10">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/fOxkXRAGOOnYlnkI.png" alt="TAV Construction" />
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
