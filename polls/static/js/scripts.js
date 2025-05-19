document.addEventListener("DOMContentLoaded", function () {
    const headwords = document.querySelectorAll(".headword");

    function preencherCampos(info) {
        const campos = {
            '.id': info.ID,
            '.headword': info.Headword,
            '.first-attestation-date': info.FirstAttestationDate,
            '.first-example-md': info.FirstAttestationExampleMD,
            '.etymology': info.Etymology,
            '.wclass': info.WClass,
            '.variant-spellings': info.VariantSpellings,
            '.credits': info.Credits,
            '.date-of-creation': info.DateOfCreation,
            '.date-of-update': info.DateOfUpdate
        };

        let peloMenosUmEncontrado = false;

        for (const seletor in campos) {
            const el = document.querySelector(seletor);
            if (el) {
                el.textContent = campos[seletor];
                peloMenosUmEncontrado = true;
            }
        }

        return peloMenosUmEncontrado;
    }

    function buscarEPreencher(verbete) {
        fetch('/consulta/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ verbete: verbete })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                const info = data.dados;
                preencherCampos(info);
            } else {
                console.warn("Verbete não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o verbete:", error);
        });
    }

    // Redireciona ao clicar
    headwords.forEach(function (headwordEl) {
        headwordEl.addEventListener("click", function () {
            const verbete = this.textContent.trim();
            window.location.href = `/consulta/${encodeURIComponent(verbete)}/`;
        });
    });

    // Busca automático se estamos em uma URL com o verbete
    const divsDeConteudo = [
        '.id', '.headword', '.first-attestation-date', '.first-example-md',
        '.etymology', '.wclass', '.variant-spellings', '.credits',
        '.date-of-creation', '.date-of-update'
    ];

    const existeAlgumaDiv = divsDeConteudo.some(seletor => document.querySelector(seletor));
    if (!existeAlgumaDiv) {
        const urlPath = window.location.pathname;
        const match = urlPath.match(/^\/consulta\/(.+)\/$/);
        if (match) {
            const verbeteURL = decodeURIComponent(match[1]);
            buscarEPreencher(verbeteURL);
        } else if (headwords.length > 0) {
            const primeiroVerbete = headwords[0].textContent.trim();
            buscarEPreencher(primeiroVerbete);
        }
    }
});
