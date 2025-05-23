(function() {
    'use strict';
    // Impede o múltiplo carregamento do script
    if (typeof window.legacyHacksLoaded !== 'undefined' && window.legacyHacksLoaded) return;
    window.legacyHacksLoaded = true;

    // Garante que `document.head` esteja definido, mesmo em navegadores antigos
    document.head = document.head || document.getElementsByTagName('head')[0];

    /**
     * Carrega um script externo de forma assíncrona.
     * @param {string} url - URL do script a ser carregado.
     * @param {string} [integrity] - Hash de integridade para verificação de segurança (opcional).
     */
    function loadJS( url , integrity ) {
        var script = document.createElement('script');

        script.setAttribute( 'src', url ) ;
        script.setAttribute( 'data-notranspile', true );
        script.setAttribute( 'crossOrigin' , 'anonymous' );
        
        if(integrity){
            script.setAttribute( 'integrity', integrity );
        }
        
        document.head.appendChild( script );
    }

    /**
     * Insere um bloco de código JavaScript diretamente no documento.
     * @param {string} code - Código JavaScript a ser inserido.
     */
    function insertJS( code ) {
        var script = document.createElement('script');

        script.setAttribute( 'data-notranspile', true );
        script.innerText = code;

        document.head.appendChild( script );
    }

    /**
     * Adiciona suporte a elementos HTML5 em navegadores antigos.
     */
    (function html5() {
        var elements = ['header', 'nav', 'main', 'article', 'section', 'aside', 'footer'];
        var isHTML5Supported = true;

        for (var i = 0; i < elements.length; i++) {
            if (document.createElement(elements[i]).toString() === "[object HTMLUnknownElement]") {
                isHTML5Supported = false;
                break;
            }
        }

        if (!isHTML5Supported) {
            //https://github.com/aFarkas/html5shiv
            loadJS('https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js',);
        }
    })();

    /**
     * Adiciona suporte básico a media queries em navegadores antigos.
     */
    (function mediaQueries() {
        if(
            typeof window.matchMedia !== 'function'
        ){
            //https://github.com/scottjehl/Respond
            loadJS('https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js');
        }
    })();

    /**
     * Adiciona suporte a funcionalidades do ECMAScript 5.
     */
    (function ecma5() {
        if(
            typeof Array.isArray !== 'function' ||
            typeof Array.prototype.forEach !== 'function' ||
            typeof Function.prototype.bind !== 'function' ||
            typeof Object.keys !== 'function' ||
            typeof JSON.parse !== 'function'
        ){
            //https://github.com/es-shims/es5-shim/
            loadJS('https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.6.7/es5-shim.min.js');
            loadJS('https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.6.7/es5-sham.min.js');
            loadJS('https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.3/json3.min.js');
        }
    })();

    /**
     * Adiciona suporte a funcionalidades do ECMAScript 6.
     */
    (function ecma6() {
        if(
            !window.Promise || !window.Symbol || !window.Map || !Array.prototype.includes || !window.fetch
        ){
            //https://github.com/es-shims/es6-shim/
            loadJS('https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.8/es6-shim.min.js');
            loadJS('https://cdnjs.cloudflare.com/ajax/libs/es6-sham/0.35.8/es6-sham.min.js');
            loadJS('https://cdnjs.cloudflare.com/ajax/libs/fetch/3.6.2/fetch.min.js');
            loadJS('https://unpkg.com/@babel/standalone/babel.min.js');

            var modernScripts = document.getElementsByTagName("script");
            for (var i = 0; i < modernScripts.length; i++) {
                var script = modernScripts[i];
                if (!script.getAttribute('data-notranspile')) {
                    script.setAttribute('type', 'text/babel');
                }
            }
        }
    })();

    /**
     * Adiciona suporte a imagens WebP em navegadores antigos.
     */
    (function webpImages() {
        var supportsWebp = (function() { try { return document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0; } catch (e) { return false; }})();
        if(
            !supportsWebp
        ){
            //https://github.com/chase-moskal/webp-hero
            loadJS('https://unpkg.com/webp-hero@0.0.2/dist-cjs/polyfills.js');
            loadJS('https://unpkg.com/webp-hero@0.0.2/dist-cjs/webp-hero.bundle.js');
            insertJS('var webpMachine = new webpHero.WebpMachine(); webpMachine.polyfillDocument();');
        }
    })();

    /**
     * Adiciona suporte a funcionalidades CSS modernas.
     */
    (function legacyCssPolyfills() {
        // CSS Prefixes
        loadJS('https://raw.githubusercontent.com/LeaVerou/prefixfree/gh-pages/prefixfree.min.js');
        loadJS('https://raw.githubusercontent.com/LeaVerou/prefixfree/gh-pages/plugins/prefixfree.dynamic-dom.min.js');

        // CSS Vars
        if(
            typeof CSS.supports !== 'function' || !window.CSS.supports('--t', '#000')
        ){
            loadJS('https://raw.githubusercontent.com/LeaVerou/prefixfree/gh-pages/plugins/prefixfree.vars.js');
        }

        // CSS Supports
        if(
            typeof CSS.supports !== 'function'
        ){
            loadJS('//css_supports_polyfill.js');
        }
    })();
})();