document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // LISTA DE JOGADORES ORGANIZADA
  // ===============================

  const playersByPosition = {

    "Goleiros": [
      "Rochet",
      "Anthoni",
      "Keiller"
    ],

    "Zagueiros": [
      "Félix Torres",
      "Mercado",
      "Victor Gabriel",
      "Clayton Sampaio",
      "Juninho"
    ],

    "Laterais": [
      "Braian Aguirre",
      "Bernabei",
      "Matheus Bahia",
      "Alan Benítez"
    ],

    "Volantes": [
      "Rodrigo Villagra",
      "Thiago Maia",
      "Bruno Henrique",
      "Rômulo",
      "Ronaldo"
    ],

    "Meias": [
      "Alan Patrick",
      "Bruno Tabata",
      "Gustavo Prado",
      "Yago Noal",
      "Alan Rodríguez"
    ],

    "Atacantes": [
      "Borré",
      "Enner Valencia",
      "Kayky",
      "Johan Carbonero",
      "Alerrandro",
      "Raykkonen",
      "Vitinho"
    ]
  };

  const playerSelect = document.getElementById("playerSelect");
  const field = document.getElementById("field");
  const formationSelect = document.getElementById("formationSelect");
  const generateBtn = document.getElementById("generateBtn");

  let selectedPlayer = null;

  // ===============================
  // POPULAR SELECT COM OPTGROUP
  // ===============================

  Object.keys(playersByPosition).forEach(position => {

    const group = document.createElement("optgroup");
    group.label = position;

    playersByPosition[position].forEach(player => {
      const option = document.createElement("option");
      option.value = player;
      option.textContent = player;
      group.appendChild(option);
    });

    playerSelect.appendChild(group);
  });

  playerSelect.addEventListener("change", () => {
    selectedPlayer = playerSelect.value;
  });

  // ===============================
  // FORMAÇÕES
  // ===============================

  const formations = {

    "4-4-2": [
      { top: "92%", left: "50%" }, // GK

      // Defesa
      { top: "75%", left: "20%" },
      { top: "75%", left: "40%" },
      { top: "75%", left: "60%" },
      { top: "75%", left: "80%" },

      // Meio
      { top: "50%", left: "20%" },
      { top: "50%", left: "40%" },
      { top: "50%", left: "60%" },
      { top: "50%", left: "80%" },

      // Ataque
      { top: "28%", left: "40%" },
      { top: "28%", left: "60%" }
    ],


    "4-3-3": [
      { top: "92%", left: "50%" },

      // Defesa
      { top: "75%", left: "20%" },
      { top: "75%", left: "40%" },
      { top: "75%", left: "60%" },
      { top: "75%", left: "80%" },

      // Meio
      { top: "50%", left: "35%" },
      { top: "50%", left: "50%" },
      { top: "50%", left: "65%" },

      // Ataque
      { top: "25%", left: "20%" },
      { top: "20%", left: "50%" },
      { top: "25%", left: "80%" }
    ],

    "3-5-2": [
      { top: "92%", left: "50%" },

      // Defesa
      { top: "75%", left: "35%" },
      { top: "75%", left: "50%" },
      { top: "75%", left: "65%" },

      // Meio
      { top: "50%", left: "15%" },
      { top: "50%", left: "35%" },
      { top: "50%", left: "50%" },
      { top: "50%", left: "65%" },
      { top: "50%", left: "85%" },

      // Ataque
      { top: "28%", left: "40%" },
      { top: "28%", left: "60%" }
    ],


  };

  // ===============================
  // FUNÇÃO PEGAR INICIAIS
  // ===============================

  function getInitials(name) {
    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  }

  // ===============================
  // RENDERIZAR FORMAÇÃO
  // ===============================

  function renderFormation() {

    field.querySelectorAll(".player-slot").forEach(el => el.remove());

    const selectedFormation = formations[formationSelect.value];
    if (!selectedFormation) return;

    const formationLabel = document.querySelector(".formation-label");
    formationLabel.textContent = formationSelect.value;


    selectedFormation.forEach((pos) => {

      const slot = document.createElement("div");
      slot.classList.add("player-slot");
      slot.style.top = pos.top;
      slot.style.left = pos.left;

      slot.innerHTML = `
        <div class="player-circle"></div>
        <div class="player-name"></div>
      `;

      slot.addEventListener("click", () => {

        if (!selectedPlayer) return;

        const initials = getInitials(selectedPlayer);

        slot.querySelector(".player-circle").textContent = initials;
        slot.querySelector(".player-name").textContent = selectedPlayer;

        playerSelect.value = "";
        selectedPlayer = null;
      });

      field.appendChild(slot);
    });
  }

  formationSelect.addEventListener("change", renderFormation);
  renderFormation();

  // ===============================
  // GERAR IMAGEM
  // ===============================

  generateBtn.addEventListener("click", async () => {

    if (typeof html2canvas === "undefined") {
      alert("html2canvas não carregou!");
      return;
    }

    try {

      const exportContainer = document.createElement("div");

      // 📱 STORY 1080x1920
      exportContainer.style.width = "1080px";
      exportContainer.style.height = "1920px";
      exportContainer.style.padding = "60px 40px"; // ↓ menos padding lateral
      exportContainer.style.boxSizing = "border-box";
      exportContainer.style.background = `
        radial-gradient(circle at top center, rgba(255,255,255,0.15), transparent 40%),
        radial-gradient(circle at bottom center, rgba(99, 99, 99, 0.6), transparent 70%),
        linear-gradient(180deg, #c8102e 0%, #b93045 100%)
      `;



      exportContainer.style.display = "flex";
      exportContainer.style.flexDirection = "column";
      exportContainer.style.alignItems = "center";
      exportContainer.style.justifyContent = "space-between";
      exportContainer.style.fontFamily = "Arial, sans-serif";
      exportContainer.style.position = "relative";

      // 🔥 TÍTULO
      const title = document.createElement("h1");
      title.innerText = "TREINADOR COLORADO";
      title.style.color = "white";
      title.style.fontSize = "70px";
      title.style.letterSpacing = "3px";
      title.style.margin = "0";
      title.style.textAlign = "center";

      // 🔥 Formação
      const formationText = document.createElement("div");
      formationText.innerText = `FORMAÇÃO ${formationSelect.value}`;
      formationText.style.color = "#FFD700";
      formationText.style.fontSize = "42px";
      formationText.style.fontWeight = "bold";
      formationText.style.marginTop = "15px";

      const header = document.createElement("div");
      header.style.textAlign = "center";
      header.appendChild(title);
      header.appendChild(formationText);

      // 🔥 CLONAR CAMPO (MAIOR AGORA)
      const fieldClone = field.cloneNode(true);

      // 🔥 AUMENTAR TAMANHO DOS JOGADORES SÓ NA IMAGEM
      const players = fieldClone.querySelectorAll(".player-circle");

      players.forEach(player => {
        player.style.width = "100px";   // tamanho do círculo
        player.style.height = "100px";
        player.style.fontSize = "40px"; // tamanho das iniciais
        player.style.borderWidth = "4px";
      });


      // 🔥 AUMENTAR NOMES DOS JOGADORES NA IMAGEM
      const names = fieldClone.querySelectorAll(".player-name");

      names.forEach(name => {
        name.style.fontSize = "28px";   // tamanho do nome
        name.style.marginTop = "10px";
        name.style.fontWeight = "600";
        name.style.textShadow = "0 4px 8px rgba(0,0,0,0.8)";
        name.style.letterSpacing = "1px";
      });



      fieldClone.style.width = "880px"; // 🔥 AQUI aumentei bastante
      fieldClone.style.maxWidth = "100%";
      fieldClone.style.boxShadow = "0 30px 80px rgba(0,0,0,0.7)";
      fieldClone.style.borderRadius = "25px";

      // 🔥 CTA
      const footer = document.createElement("div");
      footer.innerHTML = `
      <div style="text-align:center;">
        <p style="color:white; font-size:38px; font-weight:bold; margin:0;">
          Monte sua escalação agora!
        </p>
        <p style="color:#E31B22; font-size:32px; margin-top:15px;">
          treinadorcolorado.com
        </p>
      </div>
    `;

      // 🔥 MARCA D'ÁGUA
      const watermark = document.createElement("div");
      watermark.innerText = "Treinador Colorado";
      watermark.style.position = "absolute";
      watermark.style.bottom = "40px";
      watermark.style.right = "40px";
      watermark.style.color = "rgba(255,255,255,0.15)";
      watermark.style.fontSize = "36px";
      watermark.style.fontWeight = "bold";
      watermark.style.letterSpacing = "2px";

      exportContainer.appendChild(header);
      exportContainer.appendChild(fieldClone);
      exportContainer.appendChild(footer);
      exportContainer.appendChild(watermark);

      document.body.appendChild(exportContainer);

      const canvas = await html2canvas(exportContainer, {
        scale: 2,
        useCORS: true
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png", 1.0);
      link.download = "treinador-colorado-story.png";
      link.click();

      document.body.removeChild(exportContainer);

    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
    }

  });





});
