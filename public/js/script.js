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


    item.innerHTML = `

      <a href="/treinos/${treino.id}" class="link-treino">

        <h3>${treino.nome}</h3>

        <p>
          ${treino.exercicios.length} exercício(s)
        </p>

      </a>

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

}// ===== Formulário de novo treino =====

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
          window.usuarioLogadoId,


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
}