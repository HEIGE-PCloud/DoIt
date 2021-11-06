function forEach(elements, handler) {
    elements = elements || [];
    for (let i = 0; i < elements.length; i++) handler(elements[i]);
}

function getScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

function isMobileWindow() {
    return window.matchMedia('only screen and (max-width: 680px)').matches;
}

function isTocStatic() {
    return window.matchMedia('only screen and (max-width: 1000px)').matches;
}

function animateCSS(element, animation, reserved, callback) {
    if (!Array.isArray(animation)) animation = [animation];
    element.classList.add('animate__animated', ...animation);
    const handler = () => {
        element.classList.remove('animate__animated', ...animation);
        element.removeEventListener('animationend', handler);
        if (typeof callback === 'function') callback();
    };
    if (!reserved) element.addEventListener('animationend', handler, false);
}


function initSVGIcon() {
    forEach(document.querySelectorAll('[data-svg-src]'), $icon => {
        fetch($icon.getAttribute('data-svg-src'))
            .then(response => response.text())
            .then(svg => {
                const $temp = document.createElement('div');
                $temp.insertAdjacentHTML('afterbegin', svg);
                const $svg = $temp.firstChild;
                $svg.setAttribute('data-svg-src', $icon.getAttribute('data-svg-src'));
                $svg.classList.add('icon');
                const $titleElements = $svg.getElementsByTagName('title');
                if ($titleElements.length) $svg.removeChild($titleElements[0]);
                $icon.parentElement.replaceChild($svg, $icon);
            })
            .catch(err => { console.error(err); });
    });
}

function initTwemoji() {
    if (window.config.twemoji) twemoji.parse(document.body);
}

function initMenuMobile() {
    const $menuToggleMobile = document.getElementById('menu-toggle-mobile');
    const $menuMobile = document.getElementById('menu-mobile');
    if (!window.menuToggleMobileEventListener) {
        $menuToggleMobile.addEventListener('click', () => {
            document.body.classList.toggle('blur');
            $menuToggleMobile.classList.toggle('active');
            $menuMobile.classList.toggle('active');
        }, false);
        window.menuToggleMobileEventListener = true;
    }
    window._menuMobileOnClickMask = (() => {
        $menuToggleMobile.classList.remove('active');
        $menuMobile.classList.remove('active');
    });
    window.clickMaskEventSet.add(window._menuMobileOnClickMask);
}

function initSwitchTheme() {
    forEach(document.getElementsByClassName('theme-switch'), $themeSwitch => {
        $themeSwitch.addEventListener('click', () => {
            let currentTheme = document.body.getAttribute('theme');
            if (currentTheme === 'dark') {
                document.body.setAttribute('theme', 'black');
                window.localStorage && localStorage.setItem('theme', 'black');
                window.isDark = true;
            } else if (currentTheme === 'black') {
                document.body.setAttribute('theme', 'light');
                window.localStorage && localStorage.setItem('theme', 'light');
                window.isDark = false;
            } else {
                document.body.setAttribute('theme', 'dark');
                window.localStorage && localStorage.setItem('theme', 'dark');
                window.isDark = true;
            }
            for (let event of window.switchThemeEventSet) event();
        }, false);
    });
}

function initSelectTheme() {
    forEach(document.getElementsByClassName('color-theme-select'), $themeSelect => {
        let currentTheme = document.body.getAttribute('theme');
        for (let i, j = 0; i = $themeSelect.options[j]; j++) {
            if (i.value == currentTheme) {
                $themeSelect.selectedIndex = j;
                break;
            }
        }
        $themeSelect.addEventListener('change', () => {
            let theme = $themeSelect.value;
            window.localStorage && localStorage.setItem('theme', theme);
            if (theme != 'auto') {
                document.body.setAttribute('theme', theme);
                if (theme == 'light') {
                    window.isDark = false;
                } else {
                    window.isDark = true;
                }
            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.body.setAttribute('theme', 'dark');
                    window.isDark = true;
                } else {
                    document.body.setAttribute('theme', 'white');
                    window.isDark = false;
                }
            }
            for (let event of window.switchThemeEventSet) event();
        }, false);
    });
}

function initSearch() {
    const searchConfig = window.config.search;
    const isMobile = isMobileWindow();
    if (!searchConfig || isMobile && window._searchMobileOnce || !isMobile && window._searchDesktopOnce) return;

    const maxResultLength = searchConfig.maxResultLength ? searchConfig.maxResultLength : 10;
    const snippetLength = searchConfig.snippetLength ? searchConfig.snippetLength : 50;
    const highlightTag = searchConfig.highlightTag ? searchConfig.highlightTag : 'em';
    const isCaseSensitive = searchConfig.isCaseSensitive ? searchConfig.isCaseSensitive : false;
    const minMatchCharLength = searchConfig.minMatchCharLength ? searchConfig.minMatchCharLength : 1;
    const findAllMatches = searchConfig.findAllMatches ? searchConfig.findAllMatches : false;
    const location = searchConfig.location ? searchConfig.location : 0;
    const threshold = searchConfig.threshold ? searchConfig.threshold : 0.3;
    const distance = searchConfig.distance ? searchConfig.distance : 100;
    const ignoreLocation = searchConfig.ignoreLocation ? searchConfig.ignoreLocation : false;
    const useExtendedSearch = searchConfig.useExtendedSearch ? searchConfig.useExtendedSearch : false;
    const ignoreFieldNorm = searchConfig.ignoreFieldNorm ? searchConfig.ignoreFieldNorm : false;
    const suffix = isMobile ? 'mobile' : 'desktop';
    const $header = document.getElementById(`header-${suffix}`);
    const $searchInput = document.getElementById(`search-input-${suffix}`);
    const $searchToggle = document.getElementById(`search-toggle-${suffix}`);
    const $searchLoading = document.getElementById(`search-loading-${suffix}`);
    const $searchClear = document.getElementById(`search-clear-${suffix}`);
    if (isMobile) {
        window._searchMobileOnce = true;
        $searchInput.addEventListener('focus', () => {
            document.body.classList.add('blur');
            $header.classList.add('open');
        }, false);
        document.getElementById('search-cancel-mobile').addEventListener('click', () => {
            $header.classList.remove('open');
            document.body.classList.remove('blur');
            document.getElementById('menu-toggle-mobile').classList.remove('active');
            document.getElementById('menu-mobile').classList.remove('active');
            $searchLoading.style.display = 'none';
            $searchClear.style.display = 'none';
            window._searchMobile && window._searchMobile.autocomplete.setVal('');
        }, false);
        $searchClear.addEventListener('click', () => {
            $searchClear.style.display = 'none';
            window._searchMobile && window._searchMobile.autocomplete.setVal('');
        }, false);
        window._searchMobileOnClickMask = (() => {
            $header.classList.remove('open');
            $searchLoading.style.display = 'none';
            $searchClear.style.display = 'none';
            window._searchMobile && window._searchMobile.autocomplete.setVal('');
        });
        window.clickMaskEventSet.add(window._searchMobileOnClickMask);
        window.pjaxSendEventSet.add(window._searchMobileOnClickMask);
    } else {
        window._searchDesktopOnce = true;

        $searchToggle.addEventListener('click', () => {
            document.body.classList.add('blur');
            $header.classList.add('open');
            $searchInput.focus();
        }, false);
        $searchClear.addEventListener('click', () => {
            $searchClear.style.display = 'none';
            window._searchDesktop && window._searchDesktop.autocomplete.setVal('');
        }, false);
        // Toggle search when Ctrl + K is pressed
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.code == 'KeyK') {
                e.preventDefault();
                $searchToggle.click();
            }
        }, false);
        window._searchDesktopOnClickMask = (() => {
            $header.classList.remove('open');
            $searchLoading.style.display = 'none';
            $searchClear.style.display = 'none';
            window._searchDesktop && window._searchDesktop.autocomplete.setVal('');
        });
        window.clickMaskEventSet.add(window._searchDesktopOnClickMask);
        window.pjaxSendEventSet.add(window._searchDesktopOnClickMask);
        window.pjaxSendEventSet.add(() => {window._searchDesktopOnce = false; window._searchMobileOnce = false;});
    }
    $searchInput.addEventListener('input', () => {
        if ($searchInput.value === '') $searchClear.style.display = 'none';
        else $searchClear.style.display = 'inline';
    }, false);

    const initAutosearch = () => {
        const autosearch = autocomplete(`#search-input-${suffix}`, {
            hint: false,
            autoselect: true,
            dropdownMenuContainer: `#search-dropdown-${suffix}`,
            clearOnSelected: true,
            cssClasses: { noPrefix: true },
            debug: true,
        }, {
            name: 'search',
            source: (query, callback) => {
                $searchLoading.style.display = 'inline';
                $searchClear.style.display = 'none';
                const finish = (results) => {
                    $searchLoading.style.display = 'none';
                    $searchClear.style.display = 'inline';
                    callback(results);
                };
                if (searchConfig.type === 'lunr') {
                    const search = () => {
                        if (lunr.queryHandler) query = lunr.queryHandler(query);
                        const results = {};
                        window._index.search(query).forEach(({ ref, matchData: { metadata } }) => {
                            const matchData = window._indexData[ref];
                            let { uri, title, content: context } = matchData;
                            if (results[uri]) return;
                            let position = 0;
                            Object.values(metadata).forEach(({ content }) => {
                                if (content) {
                                    const matchPosition = content.position[0][0];
                                    if (matchPosition < position || position === 0) position = matchPosition;
                                }
                            });
                            position -= snippetLength / 5;
                            if (position > 0) {
                                position += context.substr(position, 20).lastIndexOf(' ') + 1;
                                context = '...' + context.substr(position, snippetLength);
                            } else {
                                context = context.substr(0, snippetLength);
                            }
                            Object.keys(metadata).forEach(key => {
                                title = title.replace(new RegExp(`(${key})`, 'gi'), `<${highlightTag}>$1</${highlightTag}>`);
                                context = context.replace(new RegExp(`(${key})`, 'gi'), `<${highlightTag}>$1</${highlightTag}>`);
                            });
                            results[uri] = {
                                'uri': uri,
                                'title': title,
                                'date': matchData.date,
                                'context': context,
                            };
                        });
                        return Object.values(results).slice(0, maxResultLength);
                    }
                    if (!window._index) {
                        fetch(searchConfig.lunrIndexURL)
                            .then(response => response.json())
                            .then(data => {
                                const indexData = {};
                                window._index = lunr(function () {
                                    if (searchConfig.lunrLanguageCode) this.use(lunr[searchConfig.lunrLanguageCode]);
                                    this.ref('objectID');
                                    this.field('title', { boost: 50 });
                                    this.field('tags', { boost: 20 });
                                    this.field('categories', { boost: 20 });
                                    this.field('content', { boost: 10 });
                                    this.metadataWhitelist = ['position'];
                                    data.forEach((record) => {
                                        indexData[record.objectID] = record;
                                        this.add(record);
                                    });
                                });
                                window._indexData = indexData;
                                finish(search());
                            }).catch(err => {
                                console.error(err);
                                finish([]);
                            });
                    } else finish(search());
                } else if (searchConfig.type === 'algolia') {
                    window._algoliaIndex = window._algoliaIndex || algoliasearch(searchConfig.algoliaAppID, searchConfig.algoliaSearchKey).initIndex(searchConfig.algoliaIndex);
                    window._algoliaIndex
                        .search(query, {
                            offset: 0,
                            length: maxResultLength * 8,
                            attributesToHighlight: ['title'],
                            attributesToSnippet: [`content:${snippetLength}`],
                            highlightPreTag: `<${highlightTag}>`,
                            highlightPostTag: `</${highlightTag}>`,
                        })
                        .then(({ hits }) => {
                            const results = {};
                            hits.forEach(({ uri, date, _highlightResult: { title }, _snippetResult: { content } }) => {
                                if (results[uri] && results[uri].context.length > content.value) return;
                                results[uri] = {
                                    uri: uri,
                                    title: title.value,
                                    date: date,
                                    context: content.value,
                                };
                            });
                            finish(Object.values(results).slice(0, maxResultLength));
                        })
                        .catch(err => {
                            console.error(err);
                            finish([]);
                        });
                } else if (searchConfig.type === 'fuse') {
                    const search = () => {
                        const results = {};
                        window._index.search(query).forEach(({ item, refIndex, matches }) => {
                            let title = item.title;
                            let content = item.content;
                            matches.forEach(({ indices, value, key }) => {
                                if (key === 'content') {
                                    let offset = 0;
                                    for (let i = 0; i < indices.length; i++) {
                                        let substr = content.substring(indices[i][0] + offset, indices[i][1] + 1 + offset);
                                        let tag = `<${highlightTag}>` + substr + `</${highlightTag}>`;
                                        content = content.substring(0, indices[i][0] + offset) + tag + content.substring(indices[i][1] + 1 + offset, content.length);
                                        offset += highlightTag.length * 2 + 5;
                                    }
                                } else if (key === 'title') {
                                    let offset = 0;
                                    for (let i = 0; i < indices.length; i++) {
                                        let substr = title.substring(indices[i][0] + offset, indices[i][1] + 1 + offset);
                                        let tag = `<${highlightTag}>` + substr + `</${highlightTag}>`;
                                        title = title.substring(0, indices[i][0] + offset) + tag + title.substring(indices[i][1] + 1 + offset, content.length);
                                        offset += highlightTag.length * 2 + 5;

                                    }
                                }
                            });
                            results[item.uri] = {
                                'uri': item.uri,
                                'title': title,
                                'date': item.date,
                                'context': content
                            };
                        });
                        return Object.values(results).slice(0, maxResultLength);
                    }
                    if (!window._index) {
                        fetch(searchConfig.fuseIndexURL)
                            .then(response => response.json())
                            .then(data => {
                                const options = {
                                    isCaseSensitive: isCaseSensitive,
                                    findAllMatches: findAllMatches,
                                    minMatchCharLength: minMatchCharLength,
                                    location: location,
                                    threshold: threshold,
                                    distance: distance,
                                    ignoreLocation: ignoreLocation,
                                    useExtendedSearch: useExtendedSearch,
                                    ignoreFieldNorm: ignoreFieldNorm,
                                    includeScore: false,
                                    shouldSort: true,
                                    includeMatches: true,
                                    keys: [
                                        "content",
                                        "title"
                                    ]
                                };
                                window._index = new Fuse(data, options);
                                finish(search());
                            }).catch(err => {
                                console.error(err);
                                finish([]);
                            })
                    } else finish(search());
                }
            },
            templates: {
                suggestion: ({ title, date, context }) => `<div><span class="suggestion-title">${title}</span><span class="suggestion-date">${date}</span></div><div class="suggestion-context">${context}</div>`,
                empty: ({ query }) => `<div class="search-empty">${searchConfig.noResultsFound}: <span class="search-query">"${query}"</span></div>`,
                footer: ({ }) => {
                    const { searchType, icon, href } = searchConfig.type === 'algolia' ? {
                        searchType: 'algolia',
                        icon: '<i class="fab fa-algolia fa-fw"></i>',
                        href: 'https://www.algolia.com/',
                    } : (searchConfig.type === 'lunr' ? {
                        searchType: 'Lunr.js',
                        icon: '',
                        href: 'https://lunrjs.com/',
                    } : {
                        searchType: 'Fuse.js',
                        icon: '',
                        href: 'https://fusejs.io/',
                    });
                    return `<div class="search-footer">Search by <a href="${href}" rel="noopener noreffer" target="_blank">${icon} ${searchType}</a></div>`;
                },
            },
        });
        autosearch.on('autocomplete:selected', (_event, suggestion, _dataset, _context) => {
            window.location.assign(suggestion.uri);
        });
        if (isMobile) window._searchMobile = autosearch;
        else window._searchDesktop = autosearch;
    };
    if (searchConfig.lunrSegmentitURL && !document.getElementById('lunr-segmentit')) {
        const script = document.createElement('script');
        script.id = 'lunr-segmentit';
        script.type = 'text/javascript';
        script.src = searchConfig.lunrSegmentitURL;
        script.async = true;
        if (script.readyState) {
            script.onreadystatechange = () => {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    initAutosearch();
                }
            };
        } else {
            script.onload = () => {
                initAutosearch();
            };
        }
        document.body.appendChild(script);
    } else initAutosearch();
}

function initDetails() {
    forEach(document.getElementsByClassName('details'), $details => {
        const $summary = $details.getElementsByClassName('details-summary')[0];
        $summary.addEventListener('click', () => {
            $details.classList.toggle('open');
        }, false);
    });
}

function initLightGallery() {
    if (window.config.lightGallery) {
        const instance = lightGallery(document.getElementById('content'), window.config.lightGallery);
    }
}

function initHighlight() {
    forEach(document.querySelectorAll('.highlight > pre.chroma'), $preChroma => {
        const $chroma = document.createElement('div');
        $chroma.className = $preChroma.className;
        const $table = document.createElement('table');
        $chroma.appendChild($table);
        const $tbody = document.createElement('tbody');
        $table.appendChild($tbody);
        const $tr = document.createElement('tr');
        $tbody.appendChild($tr);
        const $td = document.createElement('td');
        $tr.appendChild($td);
        $preChroma.parentElement.replaceChild($chroma, $preChroma);
        $td.appendChild($preChroma);
    });
    forEach(document.querySelectorAll('.highlight > .chroma'), $chroma => {
        const $codeElements = $chroma.querySelectorAll('pre.chroma > code');
        if ($codeElements.length) {
            const $code = $codeElements[$codeElements.length - 1];
            const $header = document.createElement('div');
            $header.className = 'code-header ' + $code.className.toLowerCase();
            const $title = document.createElement('span');
            $title.classList.add('code-title');
            $title.insertAdjacentHTML('afterbegin', '<i class="arrow fas fa-chevron-right fa-fw"></i>');
            $title.addEventListener('click', () => {
                $chroma.classList.toggle('open');
            }, false);
            $header.appendChild($title);
            const $ellipses = document.createElement('span');
            $ellipses.insertAdjacentHTML('afterbegin', '<i class="fas fa-ellipsis-h fa-fw"></i>');
            $ellipses.classList.add('ellipses');
            $ellipses.addEventListener('click', () => {
                $chroma.classList.add('open');
            }, false);
            $header.appendChild($ellipses);
            const $copy = document.createElement('span');
            $copy.insertAdjacentHTML('afterbegin', '<i class="far fa-copy fa-fw"></i>');
            $copy.classList.add('copy');
            const code = $code.innerText;
            if (window.config.code.maxShownLines < 0 || code.split('\n').length < window.config.code.maxShownLines + 2) $chroma.classList.add('open');
            if (window.config.code.copyTitle) {
                $copy.setAttribute('data-clipboard-text', code);
                $copy.title = window.config.code.copyTitle;
                const clipboard = new ClipboardJS($copy);
                clipboard.on('success', _e => {
                    animateCSS($code, 'animate__flash');
                    $copy.firstElementChild.className = "fas fa-check fa-fw";
                    setTimeout(() => {
                        $copy.firstElementChild.className = "far fa-copy fa-fw";
                    }, 3000);
                });
                $header.appendChild($copy);
            }
            $chroma.insertBefore($header, $chroma.firstChild);
        }
    });
}

function initTable() {
    forEach(document.querySelectorAll('.content table'), $table => {
        const $wrapper = document.createElement('div');
        $wrapper.className = 'table-wrapper';
        $table.parentElement.replaceChild($wrapper, $table);
        $wrapper.appendChild($table);
    });
}

function initHeaderLink() {
    for (let num = 1; num <= 6; num++) {
        forEach(document.querySelectorAll('.single .content > h' + num), $header => {
            $header.classList.add('headerLink');
            $header.insertAdjacentHTML('afterbegin', `<a href="#${$header.id}" class="header-mark"></a>`);
        });
    }
}

function initToc() {
    const $tocCore = document.getElementById('TableOfContents');
    if ($tocCore === null) return;
    if (document.getElementById('toc-static').getAttribute('kept') || isTocStatic()) {
        const $tocContentStatic = document.getElementById('toc-content-static');
        if ($tocCore.parentElement !== $tocContentStatic) {
            $tocCore.parentElement.removeChild($tocCore);
            $tocContentStatic.appendChild($tocCore);
        }
        if (window._tocOnScroll) window.scrollEventSet.delete(window._tocOnScroll);
    } else {
        const $tocContentAuto = document.getElementById('toc-content-auto');
        if ($tocCore.parentElement !== $tocContentAuto) {
            $tocCore.parentElement.removeChild($tocCore);
            $tocContentAuto.appendChild($tocCore);
        }
        const $toc = document.getElementById('toc-auto');
        const $page = document.getElementsByClassName('page')[0];
        const rect = $page.getBoundingClientRect();
        $toc.style.left = `${rect.left + rect.width + 20}px`;
        $toc.style.maxWidth = `${window.innerWidth - $page.getBoundingClientRect().right - 20}px`;
        $toc.style.visibility = 'visible';
        const $tocLinkElements = $tocCore.querySelectorAll('a:first-child');
        const $tocLiElements = $tocCore.getElementsByTagName('li');
        const $headerLinkElements = document.getElementsByClassName('headerLink');
        const headerIsFixed = document.body.getAttribute('header-desktop') !== 'normal';
        const headerHeight = document.getElementById('header-desktop').offsetHeight;
        const TOP_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
        const minTocTop = $toc.offsetTop;
        const minScrollTop = minTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight)
        window._tocOnScroll = window._tocOnScroll || (() => {
            const footerTop = document.getElementById('post-footer').offsetTop;
            const maxTocTop = footerTop - $toc.getBoundingClientRect().height;
            const maxScrollTop = maxTocTop - TOP_SPACING + (headerIsFixed ? 0 : headerHeight);
            if (window.newScrollTop < minScrollTop) {
                $toc.style.position = 'absolute';
                $toc.style.top = `${minTocTop}px`;
            } else if (window.newScrollTop > maxScrollTop) {
                $toc.style.position = 'absolute';
                $toc.style.top = `${maxTocTop}px`;
            } else {
                $toc.style.position = 'fixed';
                $toc.style.top = `${TOP_SPACING}px`;
            }

            forEach($tocLinkElements, $tocLink => { $tocLink.classList.remove('active'); });
            forEach($tocLiElements, $tocLi => { $tocLi.classList.remove('has-active'); });
            const INDEX_SPACING = 20 + (headerIsFixed ? headerHeight : 0);
            let activeTocIndex = $headerLinkElements.length - 1;
            for (let i = 0; i < $headerLinkElements.length - 1; i++) {
                const thisTop = $headerLinkElements[i].getBoundingClientRect().top;
                const nextTop = $headerLinkElements[i + 1].getBoundingClientRect().top;
                if ((i == 0 && thisTop > INDEX_SPACING)
                    || (thisTop <= INDEX_SPACING && nextTop > INDEX_SPACING)) {
                    activeTocIndex = i;
                    break;
                }
            }
            if (activeTocIndex >= 0 && activeTocIndex < $tocLinkElements.length) {
                $tocLinkElements[activeTocIndex].classList.add('active');
                let $parent = $tocLinkElements[activeTocIndex].parentElement;
                while ($parent !== $tocCore) {
                    $parent.classList.add('has-active');
                    $parent = $parent.parentElement.parentElement;
                }
            }
        });
        window._tocOnScroll();
        window.scrollEventSet.add(window._tocOnScroll);
        // window._tocOnResize = (() => {
        //     if ($toc.style.position === 'fixed') {
        //         if ($tocCore.offsetHeight > window.innerHeight - TOP_SPACING) {
        //             $tocCore.style.height = `${window.innerHeight - $tocCore.getBoundingClientRect().top}px`;
        //         } else {
        //             $tocCore.style.removeProperty('height');
        //         }
        //     }
        // });
        // window.resizeEventSet.add(window._tocOnResize);        
        // window._tocOnResize();
    }
}

function initMath() {
    if (window.config.math) renderMathInElement(document.body, window.config.math);
}

function initMermaid() {
    const $mermaidElements = document.getElementsByClassName('mermaid');
    if ($mermaidElements.length) {
        mermaid.initialize({ startOnLoad: false, theme: 'default' });
        forEach($mermaidElements, $mermaid => {
            mermaid.mermaidAPI.render('svg-' + $mermaid.id, window.data[$mermaid.id], svgCode => {
                $mermaid.insertAdjacentHTML('afterbegin', svgCode);
                document.getElementById('svg-' + $mermaid.id).children[0].remove();
            }, $mermaid);
        });
    }
}

function initEcharts() {
    window._echartsOnSwitchTheme = (() => {
        window._echartsArr = window._echartsArr || [];
        for (let i = 0; i < window._echartsArr.length; i++) {
            window._echartsArr[i].dispose();
        }
        window._echartsArr = [];
        forEach(document.getElementsByClassName('echarts'), $echarts => {
            const chart = echarts.init($echarts, window.isDark ? 'dark' : 'macarons', { renderer: 'svg' });
            chart.setOption(JSON.parse(window.data[$echarts.id]));
            window._echartsArr.push(chart);
        });
    });
    window.switchThemeEventSet.add(window._echartsOnSwitchTheme);
    window._echartsOnSwitchTheme();
    window._echartsOnResize = (() => {
        for (let i = 0; i < window._echartsArr.length; i++) {
            window._echartsArr[i].resize();
        }
    });
    window.resizeEventSet.add(window._echartsOnResize);
}

function initMapbox() {
    if (window.config.mapbox) {
        mapboxgl.accessToken = window.config.mapbox.accessToken;
        mapboxgl.setRTLTextPlugin(window.config.mapbox.RTLTextPlugin);
        window._mapboxArr = window._mapboxArr || [];
        forEach(document.getElementsByClassName('mapbox'), $mapbox => {
            const { lng, lat, zoom, lightStyle, darkStyle, marked, navigation, geolocate, scale, fullscreen } = window.data[$mapbox.id];
            const mapbox = new mapboxgl.Map({
                container: $mapbox,
                center: [lng, lat],
                zoom: zoom,
                minZoom: .2,
                style: window.isDark ? darkStyle : lightStyle,
                attributionControl: false,
            });
            if (marked) {
                new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapbox);
            }
            if (navigation) {
                mapbox.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
            }
            if (geolocate) {
                mapbox.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    showUserLocation: true,
                    trackUserLocation: true,
                }), 'bottom-right');
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
        window._mapboxOnSwitchTheme = (() => {
            forEach(window._mapboxArr, mapbox => {
                const $mapbox = mapbox.getContainer();
                const { lightStyle, darkStyle } = window.data[$mapbox.id];
                mapbox.setStyle(window.isDark ? darkStyle : lightStyle);
                mapbox.addControl(new MapboxLanguage());
            });
        });
        window.switchThemeEventSet.add(window._mapboxOnSwitchTheme);
    }
}

function initTypeit() {
    if (window.config.typeit) {
        const typeitConfig = window.config.typeit;
        const speed = typeitConfig.speed ? typeitConfig.speed : 100;
        const cursorSpeed = typeitConfig.cursorSpeed ? typeitConfig.cursorSpeed : 1000;
        const cursorChar = typeitConfig.cursorChar ? typeitConfig.cursorChar : '|';
        Object.values(typeitConfig.data).forEach(group => {
            const typeone = (i) => {
                const id = group[i];
                if (!document.getElementById(id).hasAttribute("data-typeit-id")) {
                    const instance = new TypeIt(`#${id}`, {
                        strings: window.data[id],
                        speed: speed,
                        lifeLike: true,
                        cursorSpeed: cursorSpeed,
                        cursorChar: cursorChar,
                        waitUntilVisible: true,
                        afterComplete: () => {
                            if (i === group.length - 1) {
                                if (typeitConfig.duration >= 0) window.setTimeout(() => {
                                    instance.destroy();
                                }, typeitConfig.duration);
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

function initComment() {
    if (window.config.comment) {
        if (window.config.comment.gitalk) {
            window.config.comment.gitalk.body = decodeURI(window.location.href);
            const gitalk = new Gitalk(window.config.comment.gitalk);
            gitalk.render('gitalk');
        }
        if (window.config.comment.valine) new Valine(window.config.comment.valine);
        if (window.config.comment.waline) new Waline(window.config.comment.waline);
        if (window.config.comment.twikoo) {
            twikoo.init(window.config.comment.twikoo);
            if (window.config.comment.twikoo.commentCount) {
                twikoo.getCommentsCount({
                    envId: window.config.comment.twikoo.envId,
                    region: window.config.comment.twikoo.region,
                    urls: [
                        window.location.pathname
                    ],
                    includeReply: false
                  }).then(function (res) {
                    // example: [
                    //   { url: '/2020/10/post-1.html', count: 10 },
                    //   { url: '/2020/11/post-2.html', count: 0 },
                    //   { url: '/2020/12/post-3.html', count: 20 }
                    // ]
                    // If there is an element with id="twikoo-comment-count", set its innerHTML to the count of comments
                    const $twikooCommentCount = document.getElementById('twikoo-comment-count');
                    if ($twikooCommentCount) $twikooCommentCount.innerHTML = res[0].count;
                  }).catch(function (err) {
                    console.error(err);
                  });
            }
        } 
        if (window.config.comment.utterances) {
            const utterancesConfig = window.config.comment.utterances;
            const script = document.createElement('script');
            script.src = 'https://utteranc.es/client.js';
            script.type = 'text/javascript';
            script.setAttribute('repo', utterancesConfig.repo);
            script.setAttribute('issue-term', utterancesConfig.issueTerm);
            if (utterancesConfig.label) script.setAttribute('label', utterancesConfig.label);
            script.setAttribute('theme', window.isDark ? utterancesConfig.darkTheme : utterancesConfig.lightTheme);
            script.crossOrigin = 'anonymous';
            script.async = true;
            document.getElementById('utterances').appendChild(script);
            window._utterancesOnSwitchTheme = (() => {
                const message = {
                    type: 'set-theme',
                    theme: window.isDark ? utterancesConfig.darkTheme : utterancesConfig.lightTheme,
                };
                const iframe = document.querySelector('.utterances-frame');
                iframe.contentWindow.postMessage(message, 'https://utteranc.es');
            });
            window.switchThemeEventSet.add(window._utterancesOnSwitchTheme);
        }
        if (window.config.comment.vssue) {
            let vssue = window.config.comment.vssue;
            new Vue({
                el: vssue.el,
                render: h => h('Vssue', {
                    props: {
                        title: vssue.title,
                        options: {
                            owner: vssue.owner,
                            repo: vssue.repo,
                            clientId: vssue.clientId,
                            clientSecret: vssue.clientSecret,
                        },
                    }
                })
            })
        }
        if (window.config.comment.remark42) {
            let remark42 = window.config.comment.remark42;
            var remark_config = {
                host: remark42.host,
                site_id: remark42.site_id,
                components: ['embed'],
                max_shown_comments: remark42.max_shown_comments,
                theme: window.isDark ? 'dark' : 'light',
                locale: remark42.locale,
                show_email_subscription: remark42.show_email_subscription,
                simple_view: remark42.simple_view
            };
            window.remark_config = remark_config;
            !function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);
            window._remark42OnSwitchTheme = (() => {
                if (window.isDark) {
                    window.REMARK42.changeTheme('dark');
                } else {
                    window.REMARK42.changeTheme('light');
                }
            });
            window.switchThemeEventSet.add(window._remark42OnSwitchTheme);
        }
        if (window.config.comment.giscus) {
            const giscusConfig = window.config.comment.giscus;
            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js';
            script.type = 'text/javascript';
            script.setAttribute('data-repo', giscusConfig.dataRepo);
            script.setAttribute('data-repo-id', giscusConfig.dataRepoId);
            if (giscusConfig.dataCategory) script.setAttribute('data-category', giscusConfig.dataCategory);
            script.setAttribute('data-category-id', giscusConfig.dataCategoryId);
            script.setAttribute('data-mapping', giscusConfig.dataMapping);
            script.setAttribute('data-reactions-enabled', giscusConfig.dataReactionsEnabled);
            script.setAttribute('data-emit-metadata', giscusConfig.dataEmitMetadata);
            script.setAttribute('data-theme', window.isDark ? giscusConfig.darkTheme : giscusConfig.lightTheme);
            script.crossOrigin = 'anonymous';
            script.async = true;
            document.getElementById('giscus').appendChild(script);
            window._giscusOnSwitchTheme = (() => {
                const message = {
                    giscus: {
                        setConfig: {
                            theme: window.isDark ? giscusConfig.darkTheme : giscusConfig.lightTheme,
                        }
                    }
                };
                const iframe = document.querySelector('.giscus-frame');
                iframe.contentWindow.postMessage(message, 'https://giscus.app');
            });
            window.switchThemeEventSet.add(window._giscusOnSwitchTheme);
        }
    }
}

function initMeta() {
    function getMeta(metaName) {
        const metas = document.getElementsByTagName('meta');
        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === metaName) {
                return metas[i];
            }
        }
    }
    let themeColorMeta = getMeta('theme-color');
    let metaColors = {
        'light': '#f8f8f8',
        'dark': '#252627',
        'black': '#000000'
    }
    window._metaThemeColorOnSwitchTheme = (() => {
        themeColorMeta.content = metaColors[document.body.getAttribute('theme')];
    });
    window.switchThemeEventSet.add(window._metaThemeColorOnSwitchTheme);
    window._metaThemeColorOnSwitchTheme();
}

function initCookieconsent() {
    if (window.config.cookieconsent) {
        let container = document.getElementById('cookieconsent-container');
        // if there is nothing in the container, then init the cookieconsent
        if (container.innerHTML === '') {
            window.config.cookieconsent.container = container;
            cookieconsent.initialise(window.config.cookieconsent);
        }
    };
}

function onScroll() {
    const $headers = [];
    const $viewComments = document.getElementById('view-comments');
    if (document.body.getAttribute('header-desktop') === 'auto') $headers.push(document.getElementById('header-desktop'));
    if (document.body.getAttribute('header-mobile') === 'auto') $headers.push(document.getElementById('header-mobile'));
    if (document.getElementById('comments')) {
        $viewComments.href = `#comments`;
        $viewComments.style.display = 'block';
    } else {
        $viewComments.style.display = 'null';
    }
    const $fixedButtons = document.getElementById('fixed-buttons');
    const ACCURACY = 20, MINIMUM = 100;
    function handleScrollEvent() {
        window.newScrollTop = getScrollTop();
        const scroll = window.newScrollTop - window.oldScrollTop;
        const isMobile = isMobileWindow();
        forEach($headers, $header => {
            if (scroll > ACCURACY) {
                $header.classList.remove('animate__fadeInDown');
                animateCSS($header, ['animate__fadeOutUp', 'animate__faster'], true);
            } else if (scroll < - ACCURACY || window.newScrollTop <= 20) {
                $header.classList.remove('animate__fadeOutUp');
                animateCSS($header, ['animate__fadeInDown', 'animate__faster'], true);
            }
        });
        if (window.newScrollTop > MINIMUM) {
            if (isMobile && scroll > ACCURACY) {
                $fixedButtons.classList.remove('animate__fadeIn');
                animateCSS($fixedButtons, ['animate__fadeOut', 'animate__faster'], true);
            } else if (!isMobile || scroll < - ACCURACY) {
                $fixedButtons.style.display = 'block';
                $fixedButtons.classList.remove('animate__fadeOut');
                animateCSS($fixedButtons, ['animate__fadeIn', 'animate__faster'], true);
            }
        } else {
            if (!isMobile) {
                $fixedButtons.classList.remove('animate__fadeIn');
                animateCSS($fixedButtons, ['animate__fadeOut', 'animate__faster'], true);
            }
            $fixedButtons.style.display = 'none';
        }
        for (let event of window.scrollEventSet) event();
        window.oldScrollTop = window.newScrollTop;
    }
    window.addEventListener('scroll', handleScrollEvent, false);
    document.addEventListener('pjax:send', function () {
        window.removeEventListener('scroll', handleScrollEvent);
    });
}

function onResize() {
    window.addEventListener('resize', () => {
        if (!window._resizeTimeout) {
            window._resizeTimeout = window.setTimeout(() => {
                window._resizeTimeout = null;
                for (let event of window.resizeEventSet) event();
                initToc();
                initMermaid();
                initSearch();
            }, 100);
        }
    }, false);
}

function onClickMask() {
    document.getElementById('mask').addEventListener('click', () => {
        for (let event of window.clickMaskEventSet) event();
        document.body.classList.remove('blur');
    }, false);
}

function init() {
    window.data = window.config.data;
    window.isDark = document.body.getAttribute('theme') !== 'light';
    window.newScrollTop = getScrollTop();
    window.oldScrollTop = window.newScrollTop;
    window.scrollEventSet = new Set();
    window.resizeEventSet = new Set();
    window.switchThemeEventSet = new Set();
    window.clickMaskEventSet = new Set();
    window.pjaxSendEventSet = new Set();
    if (window.objectFitImages) objectFitImages();
    initSVGIcon();
    initTwemoji();
    initMenuMobile();
    initSwitchTheme();
    initSelectTheme();
    initMeta();
    initSearch();
    initDetails();
    initLightGallery();
    initHighlight();
    initTable();
    initHeaderLink();
    initMath();
    initMermaid();
    initEcharts();
    initTypeit();
    initMapbox();
    initCookieconsent();
    initToc();
    initComment();
    onScroll();
    onResize();
    onClickMask();
}

const themeInit = () => {
    init();
};

if (document.readyState !== 'loading') {
    themeInit();
} else {
    document.addEventListener('DOMContentLoaded', themeInit, false);
}

let pjax = new Pjax({
    selectors: [
        ".pjax-title",
        "main",
        ".menu-item",
        ".pjax-assets",
        "#fixed-buttons",
        ".search-dropdown",
    ]
})

document.addEventListener('pjax:success', function () {
    themeInit();
});

document.addEventListener('pjax:send', function () {
    for (let event of window.pjaxSendEventSet) event();
    for (let event of window.clickMaskEventSet) event();
    document.body.classList.remove('blur');
    delete window._tocOnScroll;
});

topbar.config({
    autoRun: true,
    barThickness: 3,
    barColors: {
        '0': '#55bde2'
    },
    shadowBlur: 0,
    shadowColor: 'rgba(0, 0, 0, .5)',
    className: 'topbar',
})
document.addEventListener('pjax:send', topbar.show);
document.addEventListener('pjax:complete', topbar.hide);
document.addEventListener('pjax:error', topbar.hide);