/**
 * ==========================================================================
 * DYNAMIC CONTENT RENDERER & INTERACTIVE FILTERING
 * ==========================================================================
 * Decoupled content renderer that reads JSON data files and dynamically
 * populates the landing page with repository filtering and search capabilities.
 */

(function () {
  'use strict';

  let allProjects = [];
  let activeTag = 'all';
  let searchQuery = '';

  const SVG_ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
    scholar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
    orcid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    fork: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path><path d="M12 12v3"></path></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
    activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
    cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
    coffee: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`
  };

  async function loadData() {
    try {
      const [profileRes, projectsRes, hobbiesRes] = await Promise.all([
        fetch('content/profile.json').then((r) => (r.ok ? r.json() : null)),
        fetch('content/projects.json').then((r) => (r.ok ? r.json() : null)),
        fetch('content/hobbies.json').then((r) => (r.ok ? r.json() : null))
      ]);

      if (profileRes) renderProfile(profileRes);
      if (projectsRes) {
        allProjects = projectsRes;
        setupProjectFilters(projectsRes);
        renderProjects(projectsRes);
      }
      if (hobbiesRes) renderHobbies(hobbiesRes);
    } catch (err) {
      console.warn('Dynamic fetch fallback: Static HTML is active.', err);
    }
  }

  function renderProfile(data) {
    const nameEl = document.getElementById('profile-name');
    const titleEl = document.getElementById('profile-title');
    const bioEl = document.getElementById('profile-bio');
    const avatarEl = document.getElementById('profile-avatar-img');
    const statusEl = document.getElementById('status-text');

    if (nameEl && data.name) nameEl.textContent = data.name;
    if (titleEl && data.title) {
      titleEl.innerHTML = `${escapeHtml(data.title)} <span class="hero-affiliation">@ ${escapeHtml(data.affiliation)}</span>`;
    }
    if (bioEl && data.bio) bioEl.textContent = data.bio;
    if (avatarEl && data.avatar) avatarEl.src = data.avatar;
    if (statusEl && data.status) statusEl.textContent = data.status.text;

    // Render Socials
    const socialsContainer = document.getElementById('socials-list');
    if (socialsContainer && data.socials) {
      socialsContainer.innerHTML = data.socials
        .map(
          (s) => `
          <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="social-item" title="${escapeHtml(s.platform)}">
            ${SVG_ICONS[s.icon] || SVG_ICONS.external}
            <span>${escapeHtml(s.platform)}</span>
          </a>
        `
        )
        .join('');
    }
  }

  function setupProjectFilters(projects) {
    const filterContainer = document.getElementById('filter-bar');
    const searchInput = document.getElementById('project-search');

    if (filterContainer) {
      const tagsSet = new Set(['all']);
      projects.forEach((p) => {
        if (p.tags) p.tags.forEach((t) => tagsSet.add(t));
      });

      const tags = Array.from(tagsSet);
      filterContainer.innerHTML = tags
        .map(
          (t) => `
        <button class="tag-pill ${t === activeTag ? 'active' : ''}" data-tag="${escapeHtml(t)}">
          ${t === 'all' ? 'All Projects' : escapeHtml(t)}
        </button>
      `
        )
        .join('');

      filterContainer.querySelectorAll('.tag-pill').forEach((btn) => {
        btn.addEventListener('click', () => {
          filterContainer.querySelectorAll('.tag-pill').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          activeTag = btn.getAttribute('data-tag') || 'all';
          applyFilters();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyFilters();
      });
    }
  }

  function applyFilters() {
    let filtered = allProjects;

    if (activeTag !== 'all') {
      filtered = filtered.filter((p) => p.tags && p.tags.includes(activeTag));
    }

    if (searchQuery) {
      filtered = filtered.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(searchQuery);
        const descMatch = p.description.toLowerCase().includes(searchQuery);
        const tagMatch = p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery));
        const langMatch = p.language && p.language.toLowerCase().includes(searchQuery);
        return titleMatch || descMatch || tagMatch || langMatch;
      });
    }

    renderProjects(filtered);
  }

  function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    if (projects.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--text-secondary); background: var(--bg-surface); border: 1px dashed var(--border-muted); border-radius: var(--radius-md);">
          No matching repositories or projects found.
        </div>
      `;
      return;
    }

    grid.innerHTML = projects
      .map(
        (p) => `
      <article class="project-card">
        <div>
          <div class="project-top">
            <div class="project-title-area">
              <span class="project-icon">${SVG_ICONS.code}</span>
              <h3 class="project-title">${escapeHtml(p.title)}</h3>
            </div>
            <div class="project-links">
              ${
                p.githubUrl
                  ? `<a href="${escapeHtml(p.githubUrl)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="View Source on GitHub">
                      ${SVG_ICONS.github}
                    </a>`
                  : ''
              }
              ${
                p.demoUrl
                  ? `<a href="${escapeHtml(p.demoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="Open Demo / Paper">
                      ${SVG_ICONS.external}
                    </a>`
                  : ''
              }
            </div>
          </div>
          <p class="project-desc">${escapeHtml(p.description)}</p>
        </div>

        <div class="project-meta">
          <div class="project-tags">
            ${(p.tags || []).slice(0, 3).map((t) => `<span class="card-tag">${escapeHtml(t)}</span>`).join('')}
          </div>
          <div class="project-stats">
            ${
              p.language
                ? `<span class="lang-indicator">
                    <span class="lang-dot" style="background-color: ${p.languageColor || 'var(--accent-primary)'};"></span>
                    ${escapeHtml(p.language)}
                  </span>`
                : ''
            }
            ${
              p.stars
                ? `<span class="stat-item" title="${p.stars} stars">
                    ${SVG_ICONS.star} ${p.stars}
                  </span>`
                : ''
            }
          </div>
        </div>
      </article>
    `
      )
      .join('');
  }

  function renderHobbies(hobbies) {
    const grid = document.getElementById('hobbies-grid');
    if (!grid) return;

    grid.innerHTML = hobbies
      .map(
        (h) => `
      <div class="hobby-card">
        <div class="hobby-header">
          <div class="hobby-icon-wrap">
            ${SVG_ICONS[h.icon] || SVG_ICONS.camera}
          </div>
          <h3 class="hobby-title">${escapeHtml(h.title)}</h3>
        </div>
        <p class="hobby-desc">${escapeHtml(h.description)}</p>
        <div class="hobby-highlights">
          ${(h.highlights || []).map((hl) => `<span class="hobby-highlight-pill">${escapeHtml(hl)}</span>`).join('')}
        </div>
      </div>
    `
      )
      .join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  document.addEventListener('DOMContentLoaded', loadData);
})();
