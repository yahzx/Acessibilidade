document.addEventListener('DOMContentLoaded', () => {
  const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');
  const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');

  botaoDeAcessibilidade.addEventListener('click', (e) => {
    e.preventDefault();
    opcoesDeAcessibilidade.classList.toggle('apresenta-lista');
  });

  const aumentaFonteBotao = document.getElementById('aumentar-fonte');
  const diminuiFonteBotao = document.getElementById('diminuir-fonte');

  let tamanhoAtualFonte = 1;

  aumentaFonteBotao.addEventListener('click', () => {
    if (tamanhoAtualFonte < 1.8) {
      tamanhoAtualFonte += 0.1;
      document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    }
  });

  diminuiFonteBotao.addEventListener('click', () => {
    if (tamanhoAtualFonte > 0.7) {
      tamanhoAtualFonte -= 0.1;
      document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
    }
  });
});
