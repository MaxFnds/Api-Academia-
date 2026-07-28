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
const listaTreinos = document.getElementById("lista-treinos");

if (listaTreinos) {
  const mensagemCarregando = document.getElementById("mensagem-carregando");
  const mensagemVazio = document.getElementById("mensagem-vazio");
  const campoBusca = document.getElementById("busca-treino");

  let todosOsTreinos = []; // guarda a lista completa, pra filtrar localmente na busca

  // Monta o HTML de um treino na lista
function criarItemTreino(treino) {
  const item = document.createElement("li");
  item.className = "item-treino";

  item.innerHTML = `
    <a href="/treinos/${treino.id}" class="link-treino">
      <h3>${treino.nome}</h3>
      <p>${treino.exercicios.length} exercício(s)</p>
    </a>
  `;

  return item;
}

  // Renderiza a lista na tela a partir de um array de treinos
  function renderizarTreinos(treinos) {
    listaTreinos.innerHTML = "";

    if (treinos.length === 0) {
      mensagemVazio.hidden = false;
      return;
    }

    mensagemVazio.hidden = true;
    treinos.forEach((treino) => {
      listaTreinos.appendChild(criarItemTreino(treino));
    });
  }

  // Busca os treinos na API
  async function carregarTreinos() {
    try {
      const resposta = await fetch("/api/treinos");
      const treinos = await resposta.json();

      todosOsTreinos = treinos;
      mensagemCarregando.hidden = true;
      renderizarTreinos(treinos);

    } catch (erro) {
      mensagemCarregando.textContent = "Erro ao carregar treinos.";
    }
  }

  carregarTreinos();

  // Busca com debounce: espera 400ms depois que a pessoa parou de digitar,
  // pra não filtrar a cada tecla (evita processamento desnecessário)
  let temporizadorBusca;
  campoBusca.addEventListener("input", () => {
    clearTimeout(temporizadorBusca);

    temporizadorBusca = setTimeout(() => {
      const termo = campoBusca.value.trim().toLowerCase();
      const filtrados = todosOsTreinos.filter((treino) =>
        treino.nome.toLowerCase().includes(termo)
      );
      renderizarTreinos(filtrados);
    }, 400);
  });
}

// ===== Logout (funciona em qualquer página que tenha o botão) =====

const botaoLogout = document.getElementById("botao-logout");

if (botaoLogout) {
  botaoLogout.addEventListener("click", async () => {
    try {
      await fetch("/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (erro) {
      alert("Não foi possível sair. Tente novamente.");
    }
  });
}
