const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
    try {
        const api = await fetch("http://localhost:3000/videos")
        const videos = await api.json()

        videos.forEach((video) => {
            if (video.categoria == "") {
                throw new Error('categoria fazia')
            }
            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `
        })
    } catch (error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os videos ${error}</p>`
    }

}

buscarEMostrarVideos()

const barraDePesquisa = document.querySelector('.pesquisar__input');

barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
}

const botaoCategoria = document.querySelectorAll('.superior__item');
botaoCategoria.forEach(botao => {
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => filtrarCategoria(nomeCategoria));
})

function filtrarCategoria (filtro) {
    const videos = document.querySelectorAll('.videos__item');
    for(let video of videos) {
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = 'none';
        }else {
            video.style.display = 'block';
        }
    }
}


const inputMudarFundo = document.querySelector('.cabecalho__switch-input');
const containerCabecalho = document.querySelector('.cabecalho__container');
const menuLateral = document.querySelector('.menu__container');
const barraDeFiltragem = document.querySelector('.superior__secao__container');
const labelBtPagination = document.querySelector('.superior__slider');
const inputPesquisa = document.querySelector('.pesquisar__input');
const linksCategiria = document.querySelectorAll('.superior__secao__container-wrapper a');
const itensListaMenuLateral = document.querySelectorAll('.menu__lista li');
const imagemLogo = document.querySelector('.logo-item img');
const tituloVideos = document.querySelectorAll('.titulo-video');

function  adicionarAClasseDarkMode(elemento) {
    elemento.classList.add('dark-mode');
}

function  removerAClasseDarkMode(elemento) {
    elemento.classList.remove('dark-mode');
}

function adicionarACLasseAMultiplosElementos(elemento) {
    elemento.forEach( link => {
        link.classList.add('dark-mode');
    })
}

function removerAClasseDeMultiplosElementos(elemento) {
    elemento.forEach( link => {
        link.classList.remove('dark-mode');
    })
}


function darkMode () {
    const body = document.body

    adicionarAClasseDarkMode(body);
    adicionarAClasseDarkMode(containerCabecalho);
    adicionarAClasseDarkMode(menuLateral);
    adicionarAClasseDarkMode(barraDeFiltragem);
    adicionarAClasseDarkMode(labelBtPagination);
    adicionarAClasseDarkMode(inputPesquisa);

    adicionarACLasseAMultiplosElementos(linksCategiria);
    adicionarACLasseAMultiplosElementos(itensListaMenuLateral);

}

function lightMode () {
    const body = document.body
    
    removerAClasseDarkMode(body);
    removerAClasseDarkMode(containerCabecalho);
    removerAClasseDarkMode(menuLateral);
    removerAClasseDarkMode(barraDeFiltragem);
    removerAClasseDarkMode(labelBtPagination);
    removerAClasseDarkMode(inputPesquisa);

    removerAClasseDeMultiplosElementos(linksCategiria);
    removerAClasseDeMultiplosElementos(itensListaMenuLateral);

}

inputMudarFundo.addEventListener('click', () => {
    if(!inputMudarFundo.checked === false) {
        darkMode()
        imagemLogo.setAttribute('src', './img/VidFlow--Logo-dark-mode.png');
        const videos = document.querySelectorAll('.videos__item');
        for(let video of videos) {
            const tituloDoVideo = video.querySelectorAll('.titulo-video');
            const descricaoDoVideo = video.querySelectorAll('.titulo-canal');

            tituloDoVideo.forEach(titulo => {
                titulo.style.color = 'white';
            })

            descricaoDoVideo.forEach( descricao => {
                descricao.style.color = 'white';
            })

        }
    }else {
        lightMode()
        imagemLogo.setAttribute('src', './img/VidFlow--Logo-light-mode.png');
        for(let video of videos) {
            const tituloDoVideo = video.querySelectorAll('.titulo-video');
            const descricaoDoVideo = video.querySelectorAll('.titulo-canal');

            tituloDoVideo.forEach(titulo => {
                titulo.style.color = 'black';
            })

            descricaoDoVideo.forEach( descricao => {
                descricao.style.color = 'black';
            })
        }
    }
})

