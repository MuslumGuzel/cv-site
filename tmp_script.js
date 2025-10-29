const SUPPORTED_LANGS = ['tr', 'en'];
      const viewContainer = document.getElementById('view-container');
      const renderedViews = { tr: viewContainer.querySelector('[data-view=\"tr\"]') };
      const DEFAULT_LANG = document.body.dataset.activeLang || 'tr';

      function getTemplate(lang) {
        const template = document.getElementById(`view-${lang}`);
        return template ? template.content.cloneNode(true) : null;
      }

      function getStoredPreference() {
        const stored = localStorage.getItem('preferredLang');
        if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) {
          return stored;
        }
        return null;
      }

      function detectBrowserLanguage() {
        const languages = navigator.languages;
        let candidate = null;
        if (Array.isArray(languages) && languages.length > 0) {
          candidate = languages[0];
        }
        if (!candidate && navigator.language) {
          candidate = navigator.language;
        }
        if (!candidate) {
          return DEFAULT_LANG;
        }
        return candidate.toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
      }

      let activeLang = DEFAULT_LANG;

      function updateToggleState(view, lang) {
        if (!view) return;
        const toggles = view.querySelectorAll('[data-language-option]');
        for (let i = 0; i < toggles.length; i += 1) {
          const toggle = toggles[i];
          const value = toggle.getAttribute('data-language-option');
          const isActive = value === lang;
          toggle.setAttribute('aria-pressed', isActive ? 'true' : 'false');
          toggle.classList.toggle('is-active', isActive);
        }
      }

      function updateAllToggleStates() {
        for (const key in renderedViews) {
          if (Object.prototype.hasOwnProperty.call(renderedViews, key)) {
            updateToggleState(renderedViews[key], activeLang);
          }
        }
      }

      function bindLanguageControls(view) {
        if (!view) return;
        const toggles = view.querySelectorAll('[data-language-option]');
        for (let i = 0; i < toggles.length; i += 1) {
          const toggle = toggles[i];
          if (toggle.getAttribute('data-bound') === 'true') continue;
          toggle.addEventListener('click', function (event) {
            const target = event.currentTarget.getAttribute('data-language-option');
            if (SUPPORTED_LANGS.indexOf(target) !== -1 && target !== activeLang) {
              setLanguage(target);
            }
          });
          toggle.setAttribute('data-bound', 'true');
        }
        updateToggleState(view, activeLang);
      }

      function setLanguage(lang) {
        if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
        let view = renderedViews[lang];

        if (!view) {
          const fragment = getTemplate(lang);
          if (!fragment) return;
          view = fragment.querySelector('[data-view]');
          renderedViews[lang] = view;
        }

        if (!view) return;

        viewContainer.replaceChildren(view);
        document.body.dataset.activeLang = lang;
        document.documentElement.lang = lang;
        activeLang = lang;
        localStorage.setItem('preferredLang', lang);
        bindLanguageControls(view);
        updateAllToggleStates();
      }

      function initialise() {
        bindLanguageControls(renderedViews.tr);
        const stored = getStoredPreference();
        const preferred = stored || detectBrowserLanguage();
        if (preferred !== activeLang) {
          setLanguage(preferred);
        } else {
          updateAllToggleStates();
        }
      }

      initialise();