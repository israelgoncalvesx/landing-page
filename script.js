document.addEventListener('DOMContentLoaded', () => {
    const carrosselConteudo = document.querySelector('.carrossel-conteudo');
    const itensCarrossel = document.querySelectorAll('.carrossel-item');
    const botaoAnterior = document.getElementById('botaoAnterior');
    const botaoProximo = document.getElementById('botaoProximo');
    const containerPontos = document.querySelector('.carrossel-pontos');

    let indiceAtual = 0;
    const totalDeItens = itensCarrossel.length;
    let pontos = [];
    
    function criarPontos() {
        if (!containerPontos) return;
        itensCarrossel.forEach((_, indice) => {
            const botaoPonto = document.createElement('button');
            botaoPonto.classList.add('ponto');
            botaoPonto.addEventListener('click', () => {
                irParaItem(indice);
                reiniciarIntervalo();
            });
            containerPontos.appendChild(botaoPonto);
            pontos.push(botaoPonto);
        });
    }

    function atualizarPontos() {
        pontos.forEach((ponto, indice) => {
            if (indice === indiceAtual) {
                ponto.classList.add('ativo');
            } else {
                ponto.classList.remove('ativo');
            }
        });
    }
    
    function irParaItem(indice) {
        if (!carrosselConteudo || itensCarrossel.length === 0) return;
        const larguraItem = itensCarrossel[0].clientWidth;
        if (indice < 0) {
            indice = totalDeItens - 1;
        } else if (indice >= totalDeItens) {
            indice = 0;
        }
        
        carrosselConteudo.style.transform = `translateX(-${indice * larguraItem}px)`;
        indiceAtual = indice;
        if (pontos.length > 0) {
            atualizarPontos();
        }
    }

    function proximoItem() {
        irParaItem(indiceAtual + 1);
    }

    let intervaloCarrossel = totalDeItens > 1 ? setInterval(proximoItem, 4000) : null;

    function reiniciarIntervalo() {
        if (intervaloCarrossel) clearInterval(intervaloCarrossel);
        if (totalDeItens > 1) {
            intervaloCarrossel = setInterval(proximoItem, 4000);
        }
    }

    if (botaoProximo) {
        botaoProximo.addEventListener('click', () => {
            proximoItem();
            reiniciarIntervalo();
        });
    }

    if (botaoAnterior) {
        botaoAnterior.addEventListener('click', () => {
            irParaItem(indiceAtual - 1);
            reiniciarIntervalo();
        });
    }

    window.addEventListener('resize', () => {
        if (carrosselConteudo && itensCarrossel.length > 0) {
            irParaItem(indiceAtual);
        }
    });

    if (totalDeItens > 0) {
        criarPontos();
        irParaItem(0);
    }

    const linksMenu = document.querySelectorAll('.link-menu');

    if (linksMenu.length > 0) {
        if (!document.querySelector('.link-menu.ativo')) {
             linksMenu[0].classList.add('ativo');
        }
    }

    linksMenu.forEach(link => {
        link.addEventListener('click', function(event) {
            linksMenu.forEach(l => l.classList.remove('ativo'));
            this.classList.add('ativo');
        });
    });

    const modal = document.getElementById('modalProduto');
    const botaoFecharModal = document.querySelector('.modal-fechar');
    const botoesAbrirModal = document.querySelectorAll('.botao-abrir-modal');
    
    const imagemModal = document.getElementById('imagemModalProduto');
    const tituloModal = document.getElementById('tituloModalProduto');
    const textoModal = document.getElementById('textoModalProduto');

    function abrirModal(img, titulo, texto) {
        if (modal) {
            imagemModal.src = img;
            tituloModal.textContent = titulo;
            textoModal.textContent = texto;
            modal.style.display = 'flex';
        }
    }

    function fecharModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    botoesAbrirModal.forEach(botao => {
        botao.addEventListener('click', () => {
            const imgSrc = botao.dataset.modalImg;
            const titulo = botao.dataset.modalTitulo;
            const texto = botao.dataset.modalTexto;
            abrirModal(imgSrc, titulo, texto);
        });
    });

    if (botaoFecharModal) {
        botaoFecharModal.addEventListener('click', fecharModal);
    }

    if (modal) {
        window.addEventListener('click', (evento) => {
            if (evento.target === modal) {
                fecharModal();
            }
        });
    }

    const botaoMenu = document.querySelector('.botao-menu-mobile');
    const botaoFecharMenu = document.querySelector('.botao-fechar-menu');
    const navegacaoMobile = document.querySelector('.navegacao-mobile');
    const linksNavegacaoMobile = document.querySelectorAll('.link-menu-mobile');

    if (botaoMenu && navegacaoMobile) {
        botaoMenu.addEventListener('click', () => {
            navegacaoMobile.classList.add('ativo');
        });
    }

    if (botaoFecharMenu && navegacaoMobile) {
        botaoFecharMenu.addEventListener('click', () => {
            navegacaoMobile.classList.remove('ativo');
        });
    }

    linksNavegacaoMobile.forEach(link => {
        link.addEventListener('click', () => {
            if (navegacaoMobile) {
                navegacaoMobile.classList.remove('ativo');
            }
        });
    });

    const elementosAnimados = document.querySelectorAll('.elemento-animado');

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
            } else {
                entrada.target.classList.remove('visivel');
            }
        });
    }, {
        threshold: 0.1
    });

    elementosAnimados.forEach(elemento => {
        observador.observe(elemento);
    });
});