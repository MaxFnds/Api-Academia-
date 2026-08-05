// ===== Funções auxiliares =====
 
function mostrarCarregando(botao) {
  botao.disabled = true;
  botao.querySelector(".texto-botao").hidden = true;
  botao.querySelector(".spinner").hidden = false;
}
 
function esconderCarregando(botao) {
  botao.disabled = false;
  botao.querySelector(".texto-botao").hidden = false;
  botao.querySelector(".spinner").hidden = true;
}
 
function mostrarErro(elementoErro, mensagem) {
  elementoErro.textContent = mensagem;
  elementoErro.hidden = false;
}
 
function esconderErro(elementoErro) {
  if (!elementoErro) return;
 
  elementoErro.hidden = true;
  elementoErro.textContent = "";
}
 
 
// ===== Formulário de LOGIN =====
 
const formLogin = document.getElementById("form-login");
 
if (formLogin) {
 
  formLogin.addEventListener("submit", async (evento) => {
 
    evento.preventDefault();
 
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });
 
 
      const resultado = await resposta.json();
 
 
      if (!resposta.ok) {
 
        mostrarErro(
          mensagemErro,
          resultado.erro || "Não foi possível entrar."
        );
 
        esconderCarregando(botao);
        return;
      }
 
 
      window.location.href = "/dashboard";
 
 
    } catch (erro) {
 
      mostrarErro(
        mensagemErro,
        "Erro de conexão. Tente novamente."
      );
 
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
 
      idade: formRegistro.idade.value
        ? Number(formRegistro.idade.value)
        : undefined,
 
      especialidade:
        formRegistro.especialidade.value || undefined
 
    };
 
 
 
    try {
 
      const resposta = await fetch("/auth/registro", {
 
        method: "POST",
 
        headers: {
          "Content-Type": "application/json"
        },
 
        body: JSON.stringify(dados)
 
      });
 
 
 
      const resultado = await resposta.json();
 
 
 
      if (!resposta.ok) {
 
        mostrarErro(
          mensagemErro,
          resultado.erro || "Não foi possível criar a conta."
        );
 
        esconderCarregando(botao);
        return;
 
      }
 
 
 
      window.location.href = "/login";
 
 
 
    } catch (erro) {
 
      mostrarErro(
        mensagemErro,
        "Erro de conexão. Tente novamente."
      );
 
      esconderCarregando(botao);
 
    }
 
 
  });
 
}// ===== Dashboard - Lista de treinos =====
 
const listaTreinos = document.getElementById("lista-treinos");
 
 
if (listaTreinos) {
 
  const mensagemCarregando =
    document.getElementById("mensagem-carregando");
 
  const mensagemVazio =
    document.getElementById("mensagem-vazio");
 
  const campoBusca =
    document.getElementById("busca-treino");
 
 
  let todosOsTreinos = [];
 
 
 
  function criarItemTreino(treino) {
 
    const item = document.createElement("li");
 
    item.className = "item-treino";
    item.dataset.id = treino.id;
 
    const ehInstrutor = listaTreinos.dataset.tipo === "instrutor";
 
    const linhaAluno = ehInstrutor
      ? `<p class="aluno-item-treino">Aluno: ${treino.alunoNome || "não identificado"}</p>`
      : "";
 
    const botaoExcluir = ehInstrutor
      ? `
        <div class="acoes-item-treino">
          <button type="button" class="botao botao--perigo botao-excluir-treino">
            Excluir treino
          </button>
        </div>
      `
      : "";
 
 
  item.innerHTML = `
 
    <a href="/treinos/${treino.id}" class="link-treino">
 
      <h3>${treino.nome}</h3>
 
${linhaAluno}
 
<p>
  ${treino.exercicios.length} exercício(s)
</p>
 
    </a>
 
    ${botaoExcluir}
 
  `;
 
 
  return item;
 
}
 
 
 
  function renderizarTreinos(treinos) {
 
    listaTreinos.innerHTML = "";
 
 
    if (treinos.length === 0) {
 
      mensagemVazio.hidden = false;
      return;
 
    }
 
 
    mensagemVazio.hidden = true;
 
 
    treinos.forEach((treino) => {
 
      listaTreinos.appendChild(
        criarItemTreino(treino)
      );
 
    });
 
  }
 
 
 
  async function carregarTreinos() {
 
    try {
 
      const resposta = await fetch("/api/treinos");
 
      const treinos = await resposta.json();
 
 
      todosOsTreinos = treinos;
 
 
      if (mensagemCarregando) {
 
        mensagemCarregando.hidden = true;
 
      }
 
 
      renderizarTreinos(treinos);
 
 
 
    } catch (erro) {
 
      if (mensagemCarregando) {
 
        mensagemCarregando.textContent =
          "Erro ao carregar treinos.";
 
      }
 
    }
 
  }
 
 
 
  carregarTreinos();
 
 listaTreinos.addEventListener("click", async (evento) => {
 
    if (!evento.target.classList.contains("botao-excluir-treino")) {
      return;
    }
 
    const item = evento.target.closest(".item-treino");
    const id = item.dataset.id;
 
    const confirmar = confirm(
      "Tem certeza que deseja excluir este treino?"
    );
 
    if (!confirmar) return;
 
 
    try {
 
      const resposta = await fetch(`/api/treinos/${id}`, {
        method: "DELETE",
      });
 
 
      if (!resposta.ok) {
        throw new Error();
      }
 
 
      item.remove();
 
 
      todosOsTreinos =
        todosOsTreinos.filter(
          (treino) => treino.id !== id
        );
 
 
      if (listaTreinos.children.length === 0) {
        mensagemVazio.hidden = false;
      }
 
 
    } catch (erro) {
 
      alert(
        "Não foi possível excluir o treino."
      );
 
    }
 
  });
 
 
 
  if (campoBusca) {
 
    let temporizadorBusca;
 
 
    campoBusca.addEventListener("input", () => {
 
      clearTimeout(temporizadorBusca);
 
 
      temporizadorBusca = setTimeout(() => {
 
 
        const termo =
          campoBusca.value
          .trim()
          .toLowerCase();
 
 
 
        const filtrados =
          todosOsTreinos.filter((treino) =>
 
            treino.nome
            .toLowerCase()
            .includes(termo)
 
          );
 
 
 
        renderizarTreinos(filtrados);
 
 
      }, 400);
 
 
    });
 
  }
 
}// ===== Logout =====
 
const botaoLogout = document.getElementById("botao-logout");
 
 
if (botaoLogout) {
 
  botaoLogout.addEventListener("click", async () => {
 
    try {
 
      await fetch("/auth/logout", {
        method: "POST"
      });
 
 
      window.location.href = "/login";
 
 
    } catch (erro) {
 
      alert(
        "Não foi possível sair. Tente novamente."
      );
 
    }
 
  });
 
}
 
 
// ===== Concluir exercício =====
 
const listaExercicios =
  document.getElementById("lista-exercicios");
 
 
if (listaExercicios) {
 
 
  listaExercicios.addEventListener(
    "change",
    async (evento) => {
 
 
      if (
        !evento.target.classList.contains(
          "checkbox-concluido"
        )
      ) {
        return;
      }
 
 
      const itemHtml =
        evento.target.closest(
          ".item-exercicio"
        );
 
 
      const idExercicio =
        itemHtml.dataset.id;
 
 
 
      try {
 
 
        const resposta = await fetch(
          `/api/exercicios/${idExercicio}/concluir`,
          {
            method: "PATCH"
          }
        );
 
 
 
        if (!resposta.ok) {
 
          throw new Error();
 
        }
 
 
 
        const exercicioAtualizado =
          await resposta.json();
 
 
 
        itemHtml.classList.toggle(
 
          "item-exercicio--concluido",
 
          exercicioAtualizado.concluido
 
        );
 
 
 
      } catch (erro) {
 
 
        alert(
          "Erro ao atualizar exercício."
        );
 
 
        evento.target.checked =
          !evento.target.checked;
 
 
      }
 
 
    }
  );
 
}
 
// ===== Detalhes do treino (carrega o treino e os exercícios dele) =====
 
const conteudoTreino = document.getElementById("conteudo-treino");
 
if (conteudoTreino) {
 
  const mensagemCarregandoTreino = document.getElementById("mensagem-carregando-treino");
  const mensagemErroTreino = document.getElementById("mensagem-erro-treino");
  const nomeTreinoEl = document.getElementById("nome-treino");
  const contagemExerciciosEl = document.getElementById("contagem-exercicios");
  const listaExerciciosTreino = document.getElementById("lista-exercicios");
 
  // Pega o id do treino direto da URL, ex: /treinos/abc-123 -> "abc-123"
  const idTreino = window.location.pathname.split("/").pop();
 
  function criarItemExercicio(exercicio) {
    const item = document.createElement("li");
    item.className = "item-exercicio";
    if (exercicio.concluido) {
      item.classList.add("item-exercicio--concluido");
    }
    item.dataset.id = exercicio.id;
 
    item.innerHTML = `
      <span class="anilha">${exercicio.series}x${exercicio.repeticoes}</span>
      <div class="info-exercicio">
        <h3>${exercicio.nome}</h3>
      </div>
      <label class="opcao-concluido">
        <input type="checkbox" class="checkbox-concluido" ${exercicio.concluido ? "checked" : ""}>
        Concluído
      </label>
    `;
 
    return item;
  }
 
  async function carregarTreino() {
    try {
      const respostaTreino = await fetch(`/api/treinos/${idTreino}`);
 
      if (!respostaTreino.ok) {
        throw new Error("Treino não encontrado.");
      }
 
      const treino = await respostaTreino.json();
 
      // Busca os dados completos (nome, séries, repetições) de cada exercício do treino
      const exercicios = await Promise.all(
        treino.exercicios.map((exercicioId) =>
          fetch(`/api/exercicios/${exercicioId}`).then((resposta) => resposta.json())
        )
      );
 
      nomeTreinoEl.textContent = treino.nome;
      contagemExerciciosEl.textContent =
        exercicios.length === 1 ? "1 exercício" : `${exercicios.length} exercícios`;
 
      listaExerciciosTreino.innerHTML = "";
      exercicios.forEach((exercicio) => {
        listaExerciciosTreino.appendChild(criarItemExercicio(exercicio));
      });
 
      mensagemCarregandoTreino.hidden = true;
      conteudoTreino.hidden = false;
 
    } catch (erro) {
      mensagemCarregandoTreino.hidden = true;
      mostrarErro(mensagemErroTreino, "Não foi possível carregar este treino.");
    }
  }
 
  carregarTreino();
 
}
 
// ===== Catálogo de exercícios (listar + excluir) =====
 
const listaExerciciosCatalogo = document.getElementById("lista-exercicios-catalogo");
 
if (listaExerciciosCatalogo) {
 
  const mensagemCarregandoExercicios = document.getElementById("mensagem-carregando-exercicios");
  const mensagemVazioExercicios = document.getElementById("mensagem-vazio-exercicios");
 
  function criarItemExercicioCatalogo(exercicio) {
    const item = document.createElement("li");
    item.className = "item-exercicio-catalogo";
    item.dataset.id = exercicio.id;
 
    item.innerHTML = `
      <div>
        <h3>${exercicio.nome}</h3>
        <p>${exercicio.series}x${exercicio.repeticoes}</p>
      </div>
      <button type="button" class="botao botao--perigo botao-excluir-exercicio">
        Excluir
      </button>
    `;
 
    return item;
  }
 
  async function carregarExerciciosCatalogo() {
    try {
      const resposta = await fetch("/api/exercicios");
      const exercicios = await resposta.json();
 
      mensagemCarregandoExercicios.hidden = true;
 
      if (exercicios.length === 0) {
        mensagemVazioExercicios.hidden = false;
        return;
      }
 
      listaExerciciosCatalogo.innerHTML = "";
      exercicios.forEach((exercicio) => {
        listaExerciciosCatalogo.appendChild(criarItemExercicioCatalogo(exercicio));
      });
 
    } catch (erro) {
      mensagemCarregandoExercicios.textContent = "Erro ao carregar exercícios.";
    }
  }
 
  listaExerciciosCatalogo.addEventListener("click", async (evento) => {
    if (!evento.target.classList.contains("botao-excluir-exercicio")) return;
 
    const item = evento.target.closest(".item-exercicio-catalogo");
    const id = item.dataset.id;
 
    const confirmar = confirm("Tem certeza que deseja excluir este exercício?");
    if (!confirmar) return;
 
    try {
      const resposta = await fetch(`/api/exercicios/${id}`, { method: "DELETE" });
 
      if (!resposta.ok) {
        throw new Error();
      }
 
      item.remove();
 
      if (!listaExerciciosCatalogo.children.length) {
        mensagemVazioExercicios.hidden = false;
      }
 
    } catch (erro) {
      alert("Não foi possível excluir o exercício.");
    }
  });
 
  carregarExerciciosCatalogo();
}
 
 
// ===== Formulário de novo treino =====
 
const formTreino =
  document.getElementById("form-treino");
 
 
if (formTreino) {
 
 
  const selectAluno =
    document.getElementById("aluno");
 
 
  const listaCheckboxExercicios =
    document.getElementById(
      "lista-checkbox-exercicios"
    );
 
 
  const mensagemSemExercicios =
    document.getElementById(
      "mensagem-sem-exercicios"
    );
 
 
  const mensagemErro =
    document.getElementById(
      "mensagem-erro"
    );
 
 
 
  async function carregarAlunos() {
 
    try {
 
 
      const resposta =
        await fetch("/api/alunos");
 
 
      const alunos =
        await resposta.json();
 
 
 
      selectAluno.innerHTML =
        `
        <option value="">
          Selecione um aluno...
        </option>
        `;
 
 
 
      alunos.forEach((aluno) => {
 
 
        const opcao =
          document.createElement("option");
 
 
        opcao.value =
          aluno.id;
 
 
        opcao.textContent =
          aluno.nome;
 
 
        selectAluno.appendChild(opcao);
 
 
      });
 
 
 
    } catch (erro) {
 
 
      selectAluno.innerHTML =
        `
        <option>
          Erro ao carregar alunos
        </option>
        `;
 
 
    }
 
  }
 
 
 
 
 
  async function carregarExercicios() {
 
 
    try {
 
 
      const resposta =
        await fetch("/api/exercicios");
 
 
      const exercicios =
        await resposta.json();
 
 
 
 
      if (exercicios.length === 0) {
 
 
        mensagemSemExercicios.hidden =
          false;
 
 
        return;
 
      }
 
 
 
 
      listaCheckboxExercicios.innerHTML =
        exercicios.map((exercicio) => `
 
          <label class="opcao-checkbox">
 
            <input
              type="checkbox"
              name="exercicio"
              value="${exercicio.id}"
            >
 
            ${exercicio.nome}
 
            <span class="detalhe-checkbox">
              (${exercicio.series}x${exercicio.repeticoes})
            </span>
 
 
          </label>
 
        `).join("");
 
 
 
    } catch (erro) {
 
 
      mensagemSemExercicios.hidden =
        false;
 
 
      mensagemSemExercicios.textContent =
        "Erro ao carregar exercícios.";
 
 
    }
 
 
  }
 
 
 
 
 
  formTreino.addEventListener(
    "submit",
    async (evento) => {
 
 
      evento.preventDefault();
 
 
 
      const botao =
        formTreino.querySelector(
          "button[type='submit']"
        );
 
 
 
      esconderErro(mensagemErro);
 
      mostrarCarregando(botao);
 
 
 
 
      const exercicios =
        Array.from(
 
          formTreino.querySelectorAll(
            'input[name="exercicio"]:checked'
          )
 
        )
        .map(
          (checkbox) =>
            checkbox.value
        );
 
 
 
 
 
      const dados = {
 
 
        nome:
          formTreino.nome.value,
 
 
        alunoId:
          formTreino.aluno.value,
 
 
        instrutorId:
          formTreino.dataset.usuarioId,
 
 
        exercicios
 
      };
 
 
 
 
      try {
 
 
        const resposta =
          await fetch("/api/treinos", {
 
 
            method: "POST",
 
 
            headers: {
 
              "Content-Type":
                "application/json"
 
            },
 
 
            body:
              JSON.stringify(dados)
 
 
          });
 
 
 
 
        const resultado =
          await resposta.json();
 
 
 
 
 
        if (!resposta.ok) {
 
 
          mostrarErro(
 
            mensagemErro,
 
            resultado.erro ||
            "Não foi possível criar o treino."
 
          );
 
 
          esconderCarregando(botao);
 
 
          return;
 
 
        }
 
 
 
 
 
        window.location.href =
          `/treinos/${resultado.id}`;
 
 
 
 
 
      } catch (erro) {
 
 
        mostrarErro(
 
          mensagemErro,
 
          "Erro de conexão. Tente novamente."
 
        );
 
 
        esconderCarregando(botao);
 
 
      }
 
 
 
    }
 
  );
 
 
 
 
 
  carregarAlunos();
 
  carregarExercicios();
 
 
}
// ===== Formulário de novo exercício =====
 
const formExercicio = document.getElementById("form-exercicio");
 
if (formExercicio) {
  const mensagemErro = document.getElementById("mensagem-erro");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");
 
  formExercicio.addEventListener("submit", async (evento) => {
    evento.preventDefault();
 
    const botao = formExercicio.querySelector("button[type='submit']");
 
    esconderErro(mensagemErro);
    mensagemSucesso.hidden = true;
    mostrarCarregando(botao);
 
    const dados = {
      nome: formExercicio.nome.value,
      series: Number(formExercicio.series.value),
      repeticoes: Number(formExercicio.repeticoes.value),
    };
 
    try {
      const resposta = await fetch("/api/exercicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
 
      const resultado = await resposta.json();
 
      if (!resposta.ok) {
        mostrarErro(
          mensagemErro,
          resultado.erro || "Não foi possível criar o exercício."
        );
 
        esconderCarregando(botao);
        return;
      }
 
      mensagemSucesso.textContent =
        `Exercício "${resultado.nome}" criado com sucesso.`;
 
      mensagemSucesso.hidden = false;
 
      formExercicio.reset();
      formExercicio.series.value = 3;
      formExercicio.repeticoes.value = 12;
 
      esconderCarregando(botao);
 
      formExercicio.nome.focus();
 
    } catch (erro) {
      mostrarErro(
        mensagemErro,
        "Erro de conexão. Tente novamente."
      );
 
      esconderCarregando(botao);
    }
  });
  // ===== Perfil do usuário (upload de foto + edição de dados) =====

const formPerfil = document.getElementById("form-perfil");

if (formPerfil) {
  const mensagemErro = document.getElementById("mensagem-erro");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");
  const usuarioId = formPerfil.dataset.usuarioId;

  // Carrega dados do perfil ao entrar na página
  async function carregarPerfil() {
    try {
      const resposta = await fetch(`/api/alunos/${usuarioId}`);
      if (resposta.ok) {
        const aluno = await resposta.json();
        if (aluno.nome) document.getElementById("nome").value = aluno.nome;
        if (aluno.email) document.getElementById("email").value = aluno.email;
        if (aluno.idade) document.getElementById("idade").value = aluno.idade;
      }
    } catch (erro) {
      // Silencioso — pode ser instrutor (rota diferente)
    }
  }

  carregarPerfil();

  formPerfil.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const botao = formPerfil.querySelector("button[type='submit']");
    esconderErro(mensagemErro);
    mensagemSucesso.hidden = true;
    mostrarCarregando(botao);

    const inputFile = document.getElementById("foto");
    const arquivo = inputFile.files[0];

    try {
      // Se houver foto selecionada, envia primeiro via FormData
      if (arquivo) {
        const formData = new FormData();
        formData.append("foto", arquivo);

        const respostaFoto = await fetch(`/api/alunos/${usuarioId}/foto`, {
          method: "PATCH",
          body: formData,
        });

        if (!respostaFoto.ok) {
          const resultado = await respostaFoto.json();
          mostrarErro(mensagemErro, resultado.erro || "Não foi possível enviar a foto.");
          esconderCarregando(botao);
          return;
        }

        mensagemSucesso.textContent = "Foto atualizada com sucesso.";
        mensagemSucesso.hidden = false;
      }

      // Depois envia os dados de texto via JSON (PUT)
      const dados = {};
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const idade = document.getElementById("idade");
      const especialidade = document.getElementById("especialidade");

      if (nome) dados.nome = nome;
      if (email) dados.email = email;
      if (idade && idade.value) dados.idade = Number(idade.value);
      if (especialidade && especialidade.value) dados.especialidade = especialidade.value;

      if (Object.keys(dados).length > 0) {
        const respostaDados = await fetch(`/api/alunos/${usuarioId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });

        if (!respostaDados.ok) {
          const resultado = await respostaDados.json();
          mostrarErro(mensagemErro, resultado.erro || "Não foi possível atualizar os dados.");
          esconderCarregando(botao);
          return;
        }
      }

      if (!arquivo) {
        mensagemSucesso.textContent = "Dados atualizados com sucesso.";
        mensagemSucesso.hidden = false;
      }

      esconderCarregando(botao);

    } catch (erro) {
      mostrarErro(mensagemErro, "Erro de conexão. Tente novamente.");
      esconderCarregando(botao);
    }
  });
}


// ===== Edição de Treino =====

const formEditarTreino = document.getElementById("form-editar-treino");

if (formEditarTreino) {
  const mensagemErro = document.getElementById("mensagem-erro");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");
  const listaCheckboxExercicios = document.getElementById("lista-checkbox-exercicios");
  const mensagemSemExercicios = document.getElementById("mensagem-sem-exercicios");
  const treinoId = formEditarTreino.dataset.treinoId;

  async function carregarTreinoExistente() {
    try {
      const resposta = await fetch(`/api/treinos/${treinoId}`);
      if (!resposta.ok) throw new Error();
      const treino = await resposta.json();
      document.getElementById("nome").value = treino.nome;
      return treino.exercicios || [];
    } catch {
      mostrarErro(mensagemErro, "Treino não encontrado.");
      return [];
    }
  }

  async function carregarExerciciosDisponiveis(exerciciosAtuais) {
    try {
      const resposta = await fetch("/api/exercicios");
      const exercicios = await resposta.json();

      if (exercicios.length === 0) {
        mensagemSemExercicios.hidden = false;
        return;
      }

      listaCheckboxExercicios.innerHTML = exercicios.map((ex) => `
        <label class="opcao-checkbox">
          <input type="checkbox" name="exercicio" value="${ex.id}" ${exerciciosAtuais.includes(ex.id) ? "checked" : ""}>
          ${ex.nome}
          <span class="detalhe-checkbox">(${ex.series}x${ex.repeticoes})</span>
        </label>
      `).join("");
    } catch {
      mensagemSemExercicios.hidden = false;
      mensagemSemExercicios.textContent = "Erro ao carregar exercícios.";
    }
  }

  async function init() {
    const exerciciosAtuais = await carregarTreinoExistente();
    await carregarExerciciosDisponiveis(exerciciosAtuais);
  }

  init();

  formEditarTreino.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const botao = formEditarTreino.querySelector("button[type='submit']");
    esconderErro(mensagemErro);
    mensagemSucesso.hidden = true;
    mostrarCarregando(botao);

    try {
      // 1. Atualiza o nome do treino (PUT)
      const nome = document.getElementById("nome").value.trim();
      const respostaNome = await fetch(`/api/treinos/${treinoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      if (!respostaNome.ok) {
        const resultado = await respostaNome.json();
        mostrarErro(mensagemErro, resultado.erro || "Não foi possível atualizar o treino.");
        esconderCarregando(botao);
        return;
      }

      // 2. Atualiza os exercícios do treino (PATCH por exercício)
      const exerciciosSelecionados = Array.from(
        formEditarTreino.querySelectorAll('input[name="exercicio"]:checked')
      ).map((cb) => cb.value);

      // Remove exercícios que não estão mais selecionados
      const exerciciosRemovidos = Array.from(
        formEditarTreino.querySelectorAll('input[name="exercicio"]:not(:checked)')
      ).map((cb) => cb.value);

      for (const exercicioId of exerciciosRemovidos) {
        await fetch(`/api/treinos/${treinoId}/exercicios`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exercicioId, acao: "remover" }),
        });
      }

      for (const exercicioId of exerciciosSelecionados) {
        await fetch(`/api/treinos/${treinoId}/exercicios`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exercicioId, acao: "adicionar" }),
        });
      }

      mensagemSucesso.textContent = "Treino atualizado com sucesso.";
      mensagemSucesso.hidden = false;
      esconderCarregando(botao);

    } catch (erro) {
      mostrarErro(mensagemErro, "Erro de conexão. Tente novamente.");
      esconderCarregando(botao);
    }
  });
}


// ===== Edição de Aluno =====

const formEditarAluno = document.getElementById("form-editar-aluno");

if (formEditarAluno) {
  const mensagemErro = document.getElementById("mensagem-erro");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");
  const alunoId = formEditarAluno.dataset.alunoId;

  async function carregarAluno() {
    try {
      const resposta = await fetch(`/api/alunos/${alunoId}`);
      if (!resposta.ok) throw new Error();
      const aluno = await resposta.json();
      document.getElementById("nome").value = aluno.nome || "";
      document.getElementById("email").value = aluno.email || "";
      document.getElementById("idade").value = aluno.idade || "";
    } catch {
      mostrarErro(mensagemErro, "Aluno não encontrado.");
    }
  }

  carregarAluno();

  formEditarAluno.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const botao = formEditarAluno.querySelector("button[type='submit']");
    esconderErro(mensagemErro);
    mensagemSucesso.hidden = true;
    mostrarCarregando(botao);

    const dados = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      idade: Number(document.getElementById("idade").value),
    };

    try {
      const resposta = await fetch(`/api/alunos/${alunoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        const resultado = await resposta.json();
        mostrarErro(mensagemErro, resultado.erro || "Não foi possível atualizar o aluno.");
        esconderCarregando(botao);
        return;
      }

      mensagemSucesso.textContent = "Aluno atualizado com sucesso.";
      mensagemSucesso.hidden = false;
      esconderCarregando(botao);

    } catch (erro) {
      mostrarErro(mensagemErro, "Erro de conexão. Tente novamente.");
      esconderCarregando(botao);
    }
  });
}


}