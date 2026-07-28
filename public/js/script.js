// Script principal do FitWeb — roda em todas as páginas.
// Cada bloco verifica se o elemento existe antes de mexer nele,
// assim o mesmo arquivo serve pra login, registro e outras páginas sem dar erro.

// ===== Funções utilitárias reaproveitáveis =====

// Mostra o estado de "carregando" no botão: esconde o texto, mostra o spinner, desabilita o clique
function mostrarCarregando(botao) {
  botao.disabled = true;
  botao.querySelector(".texto-botao").hidden = true;
  botao.querySelector(".spinner").hidden = false;
}

// Volta o botão ao estado normal
function esconderCarregando(botao) {
  botao.disabled = false;
  botao.querySelector(".texto-botao").hidden = false;
  botao.querySelector(".spinner").hidden = true;
}

// Mostra uma mensagem de erro num elemento <p> específico da tela
function mostrarErro(elementoErro, mensagem) {
  elementoErro.textContent = mensagem;
  elementoErro.hidden = false;
}

// Esconde a mensagem de erro (usado antes de tentar enviar de novo)
function esconderErro(elementoErro) {
  elementoErro.hidden = true;
  elementoErro.textContent = "";
}

// ===== Formulário de LOGIN =====

const formLogin = document.getElementById("form-login");

if (formLogin) {
  formLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // impede o recarregamento padrão da página

    const botao = formLogin.querySelector("button[type='submit']");
    const mensagemErro = document.getElementById("mensagem-erro");
    esconderErro(mensagemErro);
    mostrarCarregando(botao);

    const dados = {
      email: formLogin.email.value,
      senha: formLogin.senha.value,
    };

    try {
      const resposta = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        mostrarErro(mensagemErro, resultado.erro || "Não foi possível entrar.");
        esconderCarregando(botao);
        return;
      }

      // Login deu certo — redireciona pro dashboard
      window.location.href = "/dashboard";

    } catch (erro) {
      mostrarErro(mensagemErro, "Erro de conexão. Tente novamente.");
      esconderCarregando(botao);
    }
  });
}

// ===== Formulário de REGISTRO =====

const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  const selectTipo = document.getElementById("tipo");
  const campoIdade = document.getElementById("campo-idade");
  const campoEspecialidade = document.getElementById("campo-especialidade");

  // Mostra/esconde os campos condicionais conforme o tipo escolhido
  selectTipo.addEventListener("change", () => {
    if (selectTipo.value === "aluno") {
      campoIdade.hidden = false;
      campoEspecialidade.hidden = true;
    } else if (selectTipo.value === "instrutor") {
      campoIdade.hidden = true;
      campoEspecialidade.hidden = false;
    } else {
      campoIdade.hidden = true;
      campoEspecialidade.hidden = true;
    }
  });

  formRegistro.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const botao = formRegistro.querySelector("button[type='submit']");
    const mensagemErro = document.getElementById("mensagem-erro");
    esconderErro(mensagemErro);
    mostrarCarregando(botao);

    const dados = {
      nome: formRegistro.nome.value,
      email: formRegistro.email.value,
      senha: formRegistro.senha.value,
      tipo: formRegistro.tipo.value,
      idade: formRegistro.idade.value ? Number(formRegistro.idade.value) : undefined,
      especialidade: formRegistro.especialidade.value || undefined,
    };

    try {
      const resposta = await fetch("/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        mostrarErro(mensagemErro, resultado.erro || "Não foi possível criar a conta.");
        esconderCarregando(botao);
        return;
      }

      // Registro deu certo — redireciona pro login
      window.location.href = "/login";

    } catch (erro) {
      mostrarErro(mensagemErro, "Erro de conexão. Tente novamente.");
      esconderCarregando(botao);
    }
  });
}
