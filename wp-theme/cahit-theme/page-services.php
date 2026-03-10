<?php get_header(); ?>

<section class="hero-banner" data-testid="section-services-hero">
  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/Services__1773095450245.gif" alt="Services" class="hero-banner-bg" />
  <div class="hero-banner-overlay"></div>
  <div class="hero-banner-content">
    <div class="container">
      <h1 class="hero-banner-title" data-testid="text-services-heading">Our Services</h1>
      <p class="hero-banner-subtitle">Our diverse expertise allows us to support complex infrastructure projects across multiple sectors.</p>
    </div>
  </div>
</section>

<section class="section bg-white" data-testid="section-services-list">
  <div class="container">
    <div class="services-grid">
      <div class="service-card" data-testid="service-marine">
        <div class="service-card-image">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/eErINryfjAMBHdEq.png" alt="Marine &amp; Coastal Construction" />
        </div>
        <div class="service-card-content">
          <h3 class="service-card-title">Marine &amp; Coastal Construction</h3>
          <p class="service-card-desc">Cahit Trading &amp; Contracting LLC provides specialized marine construction services including:</p>
          <ul class="service-details-list">
            <li><span class="bullet"></span> Sea Harbors</li>
            <li><span class="bullet"></span> Breakwaters</li>
            <li><span class="bullet"></span> Groynes</li>
            <li><span class="bullet"></span> Revetments</li>
          </ul>
        </div>
      </div>

      <div class="service-card" data-testid="service-infrastructure">
        <div class="service-card-image">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/gvWLawWCNocSINuR.jpeg" alt="Infrastructure Development" />
        </div>
        <div class="service-card-content">
          <h3 class="service-card-title">Infrastructure Development</h3>
          <p class="service-card-desc">Infrastructure projects today require innovative engineering solutions and advanced construction techniques. Cahit delivers infrastructure solutions including utilities, roads and industrial facilities.</p>
        </div>
      </div>

      <div class="service-card" data-testid="service-earthworks">
        <div class="service-card-image">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/hMZPCXiHvRhErvHk.gif" alt="Earthworks" />
        </div>
        <div class="service-card-content">
          <h3 class="service-card-title">Earthworks</h3>
          <p class="service-card-desc">We provide comprehensive earthworks services including excavation, grading, leveling and compaction for infrastructure projects and construction sites.</p>
        </div>
      </div>

      <div class="service-card" data-testid="service-dewatering">
        <div class="service-card-image">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/eErINryfjAMBHdEq.png" alt="Dewatering &amp; Shoring" />
        </div>
        <div class="service-card-content">
          <h3 class="service-card-title">Dewatering &amp; Shoring</h3>
          <p class="service-card-desc">We design and implement advanced groundwater control systems including:</p>
          <ul class="service-details-list">
            <li><span class="bullet"></span> Wellpoint systems</li>
            <li><span class="bullet"></span> Deep wells</li>
            <li><span class="bullet"></span> Sheet piling</li>
            <li><span class="bullet"></span> Soldier walls</li>
          </ul>
        </div>
      </div>

      <div class="service-card" data-testid="service-mep">
        <div class="service-card-image">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663029149863/qZRtUjMizSFySgTf.png" alt="MEP Works" />
        </div>
        <div class="service-card-content">
          <h3 class="service-card-title">MEP Works</h3>
          <p class="service-card-desc">Our MEP services include:</p>
          <ul class="service-details-list">
            <li><span class="bullet"></span> Water &amp; Wastewater Treatment</li>
            <li><span class="bullet"></span> Pumping Stations</li>
            <li><span class="bullet"></span> Industrial Piping</li>
            <li><span class="bullet"></span> Irrigation Systems</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="cta-section" data-testid="section-cta">
  <div class="container text-center">
    <h2 class="cta-title">Let's Build Your Next Project</h2>
    <p class="cta-subtitle">Whether planning marine infrastructure, coastal protection, or large-scale civil works, our team is ready to support your project with reliable expertise and professional execution.</p>
    <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-white" data-testid="button-cta-contact">
      Contact Our Team
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </a>
  </div>
</section>

<?php get_footer(); ?>
