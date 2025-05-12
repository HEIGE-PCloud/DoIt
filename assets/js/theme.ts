export {};

// TODO: add more global states to the window object
declare global {
  interface Window {
    isDark: boolean;
    config?: {
      table?: {
        sort?: boolean;
      };
    };
  }
}

const Tablesort = require("tablesort");

function getScrollTop() {
  return (
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop
  );
}

/**
 * Initialize the mobile menu bar.
 */
function initMenuMobile() {
  const menuToggleMobile = document.getElementById("menu-toggle-mobile");
  const menuMobile = document.getElementById("menu-mobile");
  // If no event listener has been registered yet, add one.
  if (!window.menuToggleMobileEventListener) {
    menuToggleMobile.addEventListener("click", () => {
      document.body.classList.toggle("blur");
      menuToggleMobile.classList.toggle("active");
      menuMobile.classList.toggle("active");
    });
    window.menuToggleMobileEventListener = true;
  }
  // Remove the mask when click on it.
  window._menuMobileOnClickMask = () => {
    menuToggleMobile.classList.remove("active");
    menuMobile.classList.remove("active");
  };
  window.clickMaskEventSet.add(window._menuMobileOnClickMask);
}

/**
 * Set the color theme
 * @param {string} theme
 */
function setColorTheme(theme) {
  window.setTheme(theme);
  window.saveTheme(theme);
}

/**
 * Initialize the switch theme button.
 */
function initSwitchTheme() {
  Array.from(document.getElementsByClassName("theme-switch")).forEach(
    (themeSwitch) => {
      themeSwitch.addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("theme");
        if (currentTheme === "dark") {
          setColorTheme("light");
        } else {
          setColorTheme("dark");
        }
        for (const event of window.switchThemeEventSet) event();
      });
    },
  );
}

/**
 * Initialize the select theme button.
 */
function initSelectTheme() {
  Array.from(document.getElementsByClassName("color-theme-select")).forEach(
    (themeSelect) => {
      // Get the current theme
      const currentTheme = document.body.getAttribute("theme");
      // Set the selected Index
      for (let j = 0; j < themeSelect.options.length; j++) {
        const i = themeSelect.options[j];
        if (i.value === currentTheme) {
          themeSelect.selectedIndex = j;
          break;
        }
      }

      themeSelect.addEventListener("change", () => {
        const theme = themeSelect.value;
        window.localStorage && localStorage.setItem("theme", theme);
        if (theme !== "auto") {
          setColorTheme(theme);
        } else {
          if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ) {
            setColorTheme("dark");
          } else {
            setColorTheme("light");
          }
        }
        for (const event of window.switchThemeEventSet) event();
      });
    },
  );
}

/**
 * Initialize the search box.
 * @returns {null}
 */
function initSearch() {
  const searchConfig = window.config.search;
  const isMobile =
    window.matchMedia &&
    window.matchMedia("only screen and (max-width: 680px)").matches;
  // If there is no search config
  // Or the search has been initialized already
  // Return directly
  if (
    !searchConfig ||
    (isMobile && window._searchMobileOnce) ||
    (!isMobile && window._searchDesktopOnce)
  )
    return;

  // Initialize default search config
  const maxResultLength = searchConfig.maxResultLength
    ? searchConfig.maxResultLength
    : 10;
  const snippetLength = searchConfig.snippetLength
    ? searchConfig.snippetLength
    : 50;
  const highlightTag = searchConfig.highlightTag
    ? searchConfig.highlightTag
    : "em";
  const isCaseSensitive = searchConfig.isCaseSensitive
    ? searchConfig.isCaseSensitive
    : false;
  const minMatchCharLength = searchConfig.minMatchCharLength
    ? searchConfig.minMatchCharLength
    : 1;
  const findAllMatches = searchConfig.findAllMatches
    ? searchConfig.findAllMatches
    : false;
  const location = searchConfig.location ? searchConfig.location : 0;
  const threshold = searchConfig.threshold ? searchConfig.threshold : 0.3;
  const distance = searchConfig.distance ? searchConfig.distance : 100;
  const ignoreLocation = searchConfig.ignoreLocation
    ? searchConfig.ignoreLocation
    : false;
  const useExtendedSearch = searchConfig.useExtendedSearch
    ? searchConfig.useExtendedSearch
    : false;
  const ignoreFieldNorm = searchConfig.ignoreFieldNorm
    ? searchConfig.ignoreFieldNorm
    : false;
  const termFrequency = searchConfig.termFrequency
    ? searchConfig.termFrequency
    : 1.0;
  const pageLength = searchConfig.pageLength ? searchConfig.pageLength : 0.75;
  const termSimilarity = searchConfig.termSimilarity
    ? searchConfig.termSimilarity
    : 1.0;
  const termSaturation = searchConfig.termSaturation
    ? searchConfig.termSaturation
    : 1.4;
  const suffix = isMobile ? "mobile" : "desktop";
  const header = document.getElementById(`header-${suffix}`);
  const searchInput = document.getElementById(`search-input-${suffix}`);
  const searchToggle = document.getElementById(`search-toggle-${suffix}`);
  const searchLoading = document.getElementById(`search-loading-${suffix}`);
  const searchClear = document.getElementById(`search-clear-${suffix}`);
  const autocompleteJs = window.config["autocomplete.min.js"];
  const algoliaJs = window.config["algoliasearch.min.js"];
  const pagefindJs = window.config["pagefind.js"];
  const fuseJs = window.config["fuse.min.js"];
  if (isMobile) {
    window._searchMobileOnce = true;
    // Turn on the mask when clicking on the search button
    searchInput.addEventListener("focus", () => {
      loadScript("autocomplete-script", autocompleteJs, () => {
        initAutosearch();
        searchInput.focus();
      });
      if (window.config?.search?.type === "algolia") {
        loadScript("algolia-script", algoliaJs, null);
      } else if (window.config?.search?.type === "fuse") {
        loadScript("fuse-script", fuseJs, null);
      } else {
        loadPagefind();
      }
      document.body.classList.add("blur");
      header.classList.add("open");
      searchInput.focus();
    });
    // Turn off the everything when clicking on the cancel button
    document
      .getElementById("search-cancel-mobile")
      .addEventListener("click", () => {
        header.classList.remove("open");
        document.body.classList.remove("blur");
        document
          .getElementById("menu-toggle-mobile")
          .classList.remove("active");
        document.getElementById("menu-mobile").classList.remove("active");
        searchLoading.style.display = "none";
        searchClear.style.display = "none";
        window._searchMobile && window._searchMobile.autocomplete.setVal("");
      });
    // Clear the search box when clicking on the clear button
    searchClear.addEventListener(
      "click",
      () => {
        searchClear.style.display = "none";
        window._searchMobile && window._searchMobile.autocomplete.setVal("");
      },
      false,
    );
    // Remove the mask when click on it
    window._searchMobileOnClickMask = () => {
      header.classList.remove("open");
      searchLoading.style.display = "none";
      searchClear.style.display = "none";
      window._searchMobile && window._searchMobile.autocomplete.setVal("");
    };
    window.clickMaskEventSet.add(window._searchMobileOnClickMask);
  } else {
    window._searchDesktopOnce = true;
    // Turn on the mask when clicking on the search button
    function loadSearchScript() {
      loadScript("autocomplete-script", autocompleteJs, () => {
        initAutosearch();
      });
      if (window.config?.search?.type === "algolia") {
        loadScript("algolia-script", algoliaJs, null);
      } else if (window.config?.search?.type === "fuse") {
        loadScript("fuse-script", fuseJs, null);
      } else {
        loadPagefind();
      }
    }
    searchToggle.addEventListener("mouseover", loadSearchScript, { once: true }); 
    searchToggle.addEventListener("click", () => {
      loadSearchScript();
      document.body.classList.add("blur");
      header.classList.add("open");
      searchInput.focus();
    });
    // Clear the search box when clicking on the clear button
    searchClear.addEventListener("click", () => {
      searchClear.style.display = "none";
      window._searchDesktop && window._searchDesktop.autocomplete.setVal("");
    });
    // Toggle search when Ctrl + K is pressed
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.code === "KeyK") {
        e.preventDefault();
        searchToggle.click();
      }
    });
    // Remove the mask when click on it
    window._searchDesktopOnClickMask = () => {
      header.classList.remove("open");
      searchLoading.style.display = "none";
      searchClear.style.display = "none";
      window._searchDesktop && window._searchDesktop.autocomplete.setVal("");
    };
    window.clickMaskEventSet.add(window._searchDesktopOnClickMask);
  }
  // Display the clear button only when the search box is not empty
  searchInput.addEventListener("input", () => {
    if (searchInput.value === "") searchClear.style.display = "none";
    else searchClear.style.display = "inline";
  });

  const initAutosearch = () => {
    const autosearch = autocomplete(
      `#search-input-${suffix}`,
      {
        hint: false,
        autoselect: true,
        dropdownMenuContainer: `#search-dropdown-${suffix}`,
        clearOnSelected: false,
        cssClasses: { noPrefix: true },
        debug: true,
      },
      {
        name: "search",
        source: (query, callback) => {
          searchLoading.style.display = "inline";
          searchClear.style.display = "none";
          const finish = (results) => {
            searchLoading.style.display = "none";
            searchClear.style.display = "inline";
            callback(results);
          };
          if (searchConfig.type === "algolia") {
            window._algoliaIndex =
              window._algoliaIndex ||
              algoliasearch(
                searchConfig.algoliaAppID,
                searchConfig.algoliaSearchKey,
              ).initIndex(searchConfig.algoliaIndex);
            window._algoliaIndex
              .search(query, {
                offset: 0,
                length: maxResultLength * 8,
                attributesToHighlight: ["title"],
                attributesToRetrieve: ["*"],
                attributesToSnippet: [`content:${snippetLength}`],
                highlightPreTag: `<${highlightTag}>`,
                highlightPostTag: `</${highlightTag}>`,
              })
              .then(({ hits }) => {
                const results = {};
                hits.forEach(
                  ({
                    uri,
                    date,
                    _highlightResult: { title },
                    _snippetResult: { content },
                  }) => {
                    if (
                      results[uri] &&
                      results[uri].context.length > content.value
                    )
                      return;
                    results[uri] = {
                      uri,
                      title: title.value,
                      date,
                      context: content.value,
                    };
                  },
                );
                finish(Object.values(results).slice(0, maxResultLength));
              })
              .catch((err) => {
                console.error(err);
                finish([]);
              });
          } else if (searchConfig.type === "fuse") {
            const search = () => {
              const results = {};
              window._fuseIndex
                .search(query)
                .forEach(({ item, refIndex, matches }) => {
                  let title = item.title;
                  let content = item.content;
                  matches.forEach(({ indices, value, key }) => {
                    if (key === "content") {
                      let offset = 0;
                      for (let i = 0; i < indices.length; i++) {
                        const substr = content.substring(
                          indices[i][0] + offset,
                          indices[i][1] + 1 + offset,
                        );
                        const tag =
                          `<${highlightTag}>` + substr + `</${highlightTag}>`;
                        content =
                          content.substring(0, indices[i][0] + offset) +
                          tag +
                          content.substring(
                            indices[i][1] + 1 + offset,
                            content.length,
                          );
                        offset += highlightTag.length * 2 + 5;
                      }
                    } else if (key === "title") {
                      let offset = 0;
                      for (let i = 0; i < indices.length; i++) {
                        const substr = title.substring(
                          indices[i][0] + offset,
                          indices[i][1] + 1 + offset,
                        );
                        const tag =
                          `<${highlightTag}>` + substr + `</${highlightTag}>`;
                        title =
                          title.substring(0, indices[i][0] + offset) +
                          tag +
                          title.substring(
                            indices[i][1] + 1 + offset,
                            content.length,
                          );
                        offset += highlightTag.length * 2 + 5;
                      }
                    }
                  });
                  results[item.uri] = {
                    uri: item.uri,
                    title,
                    date: item.date,
                    context: content,
                  };
                });
              console.log(results);
              return Object.values(results).slice(0, maxResultLength);
            };
            if (!window._fuseIndex) {
              fetch(searchConfig.fuseIndexURL)
                .then((response) => response.json())
                .then((data) => {
                  const options = {
                    isCaseSensitive,
                    findAllMatches,
                    minMatchCharLength,
                    location,
                    threshold,
                    distance,
                    ignoreLocation,
                    useExtendedSearch,
                    ignoreFieldNorm,
                    includeScore: false,
                    shouldSort: true,
                    includeMatches: true,
                    keys: ["content", "title"],
                  };
                  window._fuseIndex = new Fuse(data, options);
                  finish(search());
                })
                .catch((err) => {
                  console.error(err);
                  finish([]);
                });
            } else finish(search());
          } else {
            if (window._pgfIndex === undefined) {
              loadPagefind();
            }
            window._pgfIndex.debouncedSearch(query, 300).then((resp) => {
              if (resp === null || !("results" in resp)) {
                finish([]);
                return;
              }
              Promise.all(
                resp.results.slice(0, maxResultLength).map((r) => r.data()),
              ).then((res) => {
                const results = {};
                for (const r of res) {
                  for (const _r of r.sub_results) {
                    if (
                      _r.url === undefined ||
                      !("anchor" in _r) ||
                      _r.anchor.element != "h2"
                    )
                      continue;
                    results[_r.url] = {
                      uri: _r.url,
                      title: r.meta.title,
                      date: r.meta.date,
                      context:
                        highlightTag === "mark"
                          ? _r.excerpt
                          : _r.excerpt.replace(
                              /<mark>(.*?)<\/mark>/gi,
                              `<${highlightTag}>$1</${highlightTag}>`,
                            ),
                    };
                  }
                }
                finish(Object.values(results));
              });
            });
          }
        },
        templates: {
          suggestion: ({ title, uri, date, context }) =>
            `<div><a href=${uri}><span class="suggestion-title">${title}</span></a><span class="suggestion-date">${date}</span></div><div class="suggestion-context">${context}</div>`,
          empty: ({ query }) =>
            `<div class="search-empty">${searchConfig.noResultsFound}: <span class="search-query">"${query}"</span></div>`,
          footer: () => {
            const { searchType, icon, href } =
              searchConfig.type === "algolia"
                ? {
                    searchType: "algolia",
                    icon: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M229.3 182.6c-49.3 0-89.2 39.9-89.2 89.2 0 49.3 39.9 89.2 89.2 89.2s89.2-39.9 89.2-89.2c0-49.3-40-89.2-89.2-89.2zm62.7 56.6l-58.9 30.6c-1.8.9-3.8-.4-3.8-2.3V201c0-1.5 1.3-2.7 2.7-2.6 26.2 1 48.9 15.7 61.1 37.1.7 1.3.2 3-1.1 3.7zM389.1 32H58.9C26.4 32 0 58.4 0 90.9V421c0 32.6 26.4 59 58.9 59H389c32.6 0 58.9-26.4 58.9-58.9V90.9C448 58.4 421.6 32 389.1 32zm-202.6 84.7c0-10.8 8.7-19.5 19.5-19.5h45.3c10.8 0 19.5 8.7 19.5 19.5v15.4c0 1.8-1.7 3-3.3 2.5-12.3-3.4-25.1-5.1-38.1-5.1-13.5 0-26.7 1.8-39.4 5.5-1.7.5-3.4-.8-3.4-2.5v-15.8zm-84.4 37l9.2-9.2c7.6-7.6 19.9-7.6 27.5 0l7.7 7.7c1.1 1.1 1 3-.3 4-6.2 4.5-12.1 9.4-17.6 14.9-5.4 5.4-10.4 11.3-14.8 17.4-1 1.3-2.9 1.5-4 .3l-7.7-7.7c-7.6-7.5-7.6-19.8 0-27.4zm127.2 244.8c-70 0-126.6-56.7-126.6-126.6s56.7-126.6 126.6-126.6c70 0 126.6 56.6 126.6 126.6 0 69.8-56.7 126.6-126.6 126.6z"/></svg>',
                    href: "https://www.algolia.com/",
                  }
                : searchConfig.type === "fuse"
                  ? {
                      searchType: "Fuse.js",
                      icon: "",
                      href: "https://fusejs.io/",
                    }
                  : {
                      searchType: "pagefind",
                      icon: "",
                      href: "https://pagefind.app",
                    };
            return `<div class="search-footer">Search by <a href="${href}" rel="noopener noreferrer" target="_blank">${icon} ${searchType}</a></div>`;
          },
        },
      },
    );
    autosearch.on(
      "autocomplete:selected",
      (event, _suggestion, _dataset, _context) => {
        event.preventDefault();
      },
    );
    if (isMobile) window._searchMobile = autosearch;
    else window._searchDesktop = autosearch;
  };
  function loadScript(id, url, onload) {
    if (document.querySelector(`#${id}`) === null) {
      const head = document.querySelector("head");
      const script = document.createElement("script");
      script.setAttribute("src", url);
      script.setAttribute("id", id);
      script.onload = onload;
      head.appendChild(script);
    }
  }
  function loadPagefind() {
    import(pagefindJs).then((p) => {
      window._pgfIndex = p;
      window._pgfIndex
        .options({
          excerptLength: snippetLength,
          termFrequency: termFrequency,
          pageLength: pageLength,
          termSimilarity: termSimilarity,
          termSaturation: termSaturation,
        })
        .then(() => {
          window._pgfIndex.init();
        });
    });
  }
}

function initDetails() {
  document.querySelectorAll(".details").forEach(($details) => {
    const $summary = $details.getElementsByClassName(
      "details-summary",
    )[0] as HTMLDivElement;
    const content = $summary.nextElementSibling as HTMLDivElement;
    if ($details.classList.contains("open")) {
      content.style.maxHeight = "fit-content";
    }
    $summary.addEventListener(
      "click",
      () => {
        if ($details.classList.contains("open")) {
          content.style.maxHeight = "0px";
        } else {
          content.style.maxHeight = "fit-content";
        }
        $details.classList.toggle("open");
      },
      false,
    );
    addEventListener("beforeprint", () => {
      if ($details.classList.contains("open")) {
        return;
      }
      $summary.click();
    });
  });
}

function initLightGallery() {
  if (window.config.lightGallery) {
    lightGallery(
      document.getElementById("content"),
      window.config.lightGallery,
    );
  }
}

function initTablesort() {
  if (window.config?.table?.sort) {
    document
      .querySelectorAll(".content table")
      .forEach((table) => new Tablesort(table));
  }
}

function initToc() {
  const tocCore = document.getElementById("TableOfContents");
  // Return directly if no toc
  if (tocCore === null) return;
  const isTocStatic =
    window.matchMedia &&
    window.matchMedia("only screen and (max-width: 1000px)").matches;

  if (
    document.getElementById("toc-static").getAttribute("kept") ||
    isTocStatic
  ) {
    if (window._tocOnScroll) window.scrollEventSet.delete(window._tocOnScroll);
  } else {
    const toc = document.getElementById("toc-auto");
    const tocLinkElements = tocCore.querySelectorAll("a:first-child");
    const tocLiElements = tocCore.getElementsByTagName("li");
    const headerLinkElements = document.getElementsByClassName(
      "headerLink",
    ) as HTMLCollectionOf<HTMLHeadingElement>;
    const headerIsFixed =
      document.body.getAttribute("header-desktop") !== "normal";
    const headerHeight = document.getElementById("header-desktop").offsetHeight;
    const TOP_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
    const minTocTop = toc.offsetTop;
    const minScrollTop =
      minTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
    window._tocOnScroll =
      window._tocOnScroll ||
      (() => {
        const footerTop = document.getElementById("post-footer").offsetTop;
        const maxTocTop = footerTop - toc.getBoundingClientRect().height;
        const maxScrollTop =
          maxTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
        if (window.newScrollTop < minScrollTop) {
          // If scroll to the top of the page
          // Set toc to absolute
          toc.style.position = "absolute";
          toc.style.top = `${minTocTop}px`;
        } else if (window.newScrollTop > maxScrollTop) {
          // If scroll to the bottom of the page
          // Set toc to absolute
          toc.style.position = "absolute";
          toc.style.top = `${maxTocTop}px`;
        } else {
          // If in the middle
          // Set toc to fixed with TOP_SPACING
          toc.style.position = "fixed";
          toc.style.top = `${TOP_SPACING}px`;
        }
        // Update the active toc link
        // Return directly if no toc link
        if (tocLinkElements.length === 0) return;

        let activeTocIndex = -1;
        const INDEX_SPACING = TOP_SPACING + window.newScrollTop;
        // If the INDEX_SPACING is below the last header link
        // activate the last element
        if (headerLinkElements.length > 0) {
          if (
            headerLinkElements[headerLinkElements.length - 1].offsetTop <
            INDEX_SPACING
          ) {
            activeTocIndex = headerLinkElements.length - 1;
          } else {
            // Otherwise activate the element that is in between
            // Use offsetTop instead of getBoundingClientRect().top for better performance
            for (let i = 0; i < headerLinkElements.length - 1; i++) {
              const thisTop = headerLinkElements[i].offsetTop;
              const nextTop = headerLinkElements[i + 1].offsetTop;
              if (thisTop <= INDEX_SPACING && nextTop > INDEX_SPACING) {
                activeTocIndex = i;
                break;
              }
            }
          }
        }
        // Remove all legacy states
        Array.from(tocLinkElements).forEach((tocLink) =>
          tocLink.classList.remove("active"),
        );
        Array.from(tocLiElements).forEach((tocLi) =>
          tocLi.classList.remove("has-active"),
        );

        // Set the tocLinkElement to active
        // and all its parent to has-active
        if (activeTocIndex >= 0 && activeTocIndex < tocLinkElements.length) {
          tocLinkElements[activeTocIndex].classList.add("active");
          // tocLinkElements[activeTocIndex].scrollIntoView({
          //   behavior: 'smooth',
          //   block: 'center'
          // })
          let parent = tocLinkElements[activeTocIndex].parentElement;
          while (parent !== tocCore) {
            parent.classList.add("has-active");
            parent = parent.parentElement.parentElement;
          }
        }
      });
    window._tocOnScroll();
    window.scrollEventSet.add(window._tocOnScroll);
  }
}

function initTocDialog() {
  const dialog: HTMLDialogElement | null =
    document.querySelector("#toc-dialog");
  const openButton = document.querySelector("#toc-drawer-button");
  if (!dialog || !openButton) {
    return;
  }
  openButton.addEventListener("click", () => {
    dialog.showModal();
    document.activeElement?.blur();
  });
  dialog.addEventListener("click", (e) => {
    dialog.close();
  });
}
function initMapbox() {
  if (window.config.mapbox) {
    mapboxgl.accessToken = window.config.mapbox.accessToken;
    mapboxgl.setRTLTextPlugin(window.config.mapbox.RTLTextPlugin);
    window._mapboxArr = window._mapboxArr || [];
    Array.from(document.getElementsByClassName("mapbox")).forEach(($mapbox) => {
      const {
        lng,
        lat,
        zoom,
        lightStyle,
        darkStyle,
        marked,
        navigation,
        geolocate,
        scale,
        fullscreen,
      } = window.config.data[$mapbox.id];
      const mapbox = new mapboxgl.Map({
        container: $mapbox,
        center: [lng, lat],
        zoom,
        minZoom: 0.2,
        style: window.isDark ? darkStyle : lightStyle,
        attributionControl: false,
      });
      if (marked) {
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapbox);
      }
      if (navigation) {
        mapbox.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      }
      if (geolocate) {
        mapbox.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            showUserLocation: true,
            trackUserLocation: true,
          }),
          "bottom-right",
        );
      }
      if (scale) {
        mapbox.addControl(new mapboxgl.ScaleControl());
      }
      if (fullscreen) {
        mapbox.addControl(new mapboxgl.FullscreenControl());
      }
      mapbox.addControl(new MapboxLanguage());
      window._mapboxArr.push(mapbox);
    });
    window._mapboxOnSwitchTheme = () => {
      window._mapboxArr.forEach((mapbox) => {
        const $mapbox = mapbox.getContainer();
        const { lightStyle, darkStyle } = window.config.data[$mapbox.id];
        mapbox.setStyle(window.isDark ? darkStyle : lightStyle);
        mapbox.addControl(new MapboxLanguage());
      });
    };
    window.switchThemeEventSet.add(window._mapboxOnSwitchTheme);
  }
}

function initTypeit() {
  if (window.config.typeit) {
    const typeitConfig = window.config.typeit;
    const speed = typeitConfig.speed ? typeitConfig.speed : 100;
    const cursorSpeed = typeitConfig.cursorSpeed
      ? typeitConfig.cursorSpeed
      : 1000;
    const cursorChar = typeitConfig.cursorChar ? typeitConfig.cursorChar : "|";
    Object.values(typeitConfig.data).forEach((group) => {
      const typeone = (i) => {
        const id = group[i];
        if (!document.getElementById(id).hasAttribute("data-typeit-id")) {
          const instance = new TypeIt(`#${id}`, {
            strings: window.config.data[id],
            speed,
            lifeLike: true,
            cursorSpeed,
            cursorChar,
            waitUntilVisible: true,
            afterComplete: () => {
              if (i === group.length - 1) {
                if (typeitConfig.duration >= 0) {
                  window.setTimeout(() => {
                    instance.destroy();
                  }, typeitConfig.duration);
                }
                return;
              }
              instance.destroy();
              typeone(i + 1);
            },
          }).go();
        }
      };
      typeone(0);
    });
  }
}

function initMeta() {
  function getMeta(metaName) {
    const metas = document.getElementsByTagName("meta");
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === metaName) {
        return metas[i];
      }
    }
  }
  const themeColorMeta = getMeta("theme-color");
  const metaColors = {
    light: "#f8f8f8",
    dark: "#161b22",
  };
  window._metaThemeColorOnSwitchTheme = () => {
    themeColorMeta.content = metaColors[document.body.getAttribute("theme")];
  };
  window.switchThemeEventSet.add(window._metaThemeColorOnSwitchTheme);
  window._metaThemeColorOnSwitchTheme();
}

function onScroll() {
  const backToTop = document.getElementById("back-to-top-button");
  function handleScrollEvent() {
    window.newScrollTop = getScrollTop();
    if (window.newScrollTop > 20) {
      backToTop.style.opacity = "1";
    } else {
      backToTop.style.opacity = "0";
    }
    for (const event of window.scrollEventSet) event();
    window.oldScrollTop = window.newScrollTop;
  }
  window.addEventListener("scroll", handleScrollEvent, false);
}

function onResize() {
  window.addEventListener(
    "resize",
    () => {
      if (!window._resizeTimeout) {
        window._resizeTimeout = window.setTimeout(() => {
          window._resizeTimeout = null;
          for (const event of window.resizeEventSet) event();
          initSearch();
        }, 100);
      }
    },
    false,
  );
}

function onClickMask() {
  document.getElementById("mask").addEventListener(
    "click",
    () => {
      for (const event of window.clickMaskEventSet) event();
      document.body.classList.remove("blur");
    },
    false,
  );
}

function initCodeblocks() {
  document.querySelectorAll(".code-block").forEach((codeBlock) => {
    // the queries are guaranteed to be successful
    const titleButton = codeBlock.querySelector(
      "button.code-block-button",
    ) as HTMLDivElement;
    const chroma = codeBlock.querySelector("code.chroma") as HTMLElement;
    const copyCodeButton = codeBlock.querySelector(
      "button.copy-code-button",
    ) as HTMLButtonElement;
    const copyIcon = copyCodeButton.querySelector(
      "span.copy-icon",
    ) as SVGElement;
    const checkIcon = copyCodeButton.querySelector(
      "span.check-icon",
    ) as SVGElement;
    const wrapCodeButton = codeBlock.querySelector(
      "button.wrap-code-button",
    ) as HTMLButtonElement;
    const toggleLineNumbersButton = codeBlock.querySelector(
      "button.line-number-button",
    ) as HTMLButtonElement;

    chroma.style.maxHeight = "fit-content";

    // handle expanding and collapsing code blocks
    titleButton.addEventListener("click", () => {
      codeBlock.classList.toggle("is-open");
      codeBlock.classList.toggle("is-closed");
    });

    // handle copying code to clipboard
    copyCodeButton?.addEventListener("click", () => {
      navigator.clipboard.writeText(chroma.textContent);
      // toggle icons
      copyIcon.style.display = "none";
      checkIcon.style.display = "block";
      setTimeout(() => {
        copyIcon.style.display = "block";
        checkIcon.style.display = "none";
      }, 3000);
    });

    // handle wrapping lines in code blocks
    wrapCodeButton?.addEventListener("click", () => {
      chroma.style.maxHeight = "fit-content";
      codeBlock.classList.toggle("is-wrap");
    });

    toggleLineNumbersButton.addEventListener("click", () => {
      codeBlock.classList.toggle("show-line-numbers");
    });

    addEventListener("beforeprint", (_) => {
      if (codeBlock.classList.contains("is-closed")) {
        titleButton.click();
      }
      if (!codeBlock.classList.contains("is-wrap")) {
        wrapCodeButton.click();
      }
    });
  });
}

function init() {
  window.isDark = document.body.getAttribute("theme") !== "light";
  window.newScrollTop = getScrollTop();
  window.oldScrollTop = window.newScrollTop;
  window.scrollEventSet = new Set();
  window.resizeEventSet = new Set();
  window.clickMaskEventSet = new Set();
  initMenuMobile();
  initSwitchTheme();
  initSelectTheme();
  initMeta();
  initSearch();
  initCodeblocks();
  initDetails();
  initLightGallery();
  initTablesort();
  initTypeit();
  initMapbox();
  initToc();
  initTocDialog();
  onScroll();
  onResize();
  onClickMask();
}

init();
