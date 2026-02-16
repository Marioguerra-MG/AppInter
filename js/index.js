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
    if (typeof html2canvas === "undefined") { alert("html2canvas não carregou!"); return; }

    try {
      const exportContainer = document.createElement("div");

      // 📱 Dimensão vertical Story leve
      exportContainer.style.width = "720px";
      exportContainer.style.height = "1280px";
      exportContainer.style.padding = "40px 30px";
      exportContainer.style.boxSizing = "border-box";
      exportContainer.style.background = `
        radial-gradient(circle at top center, rgba(255,255,255,0.15), transparent 40%),
        radial-gradient(circle at bottom center, rgba(0,0,0,0.3), transparent 70%),
        linear-gradient(180deg, #c8102e 0%, #b93045 100%)
      `;
      exportContainer.style.display = "flex";
      exportContainer.style.flexDirection = "column";
      exportContainer.style.alignItems = "center";
      exportContainer.style.justifyContent = "space-between";
      exportContainer.style.fontFamily = "Arial, sans-serif";
      exportContainer.style.position = "relative";

      // Cabeçalho
      const title = document.createElement("h1");
      title.innerText = "TREINADOR COLORADO";
      title.style.color = "white";
      title.style.fontSize = "50px";
      title.style.letterSpacing = "2px";
      title.style.margin = "0";
      title.style.textAlign = "center";

      const formationText = document.createElement("div");
      formationText.innerText = `FORMAÇÃO ${formationSelect.value}`;
      formationText.style.color = "#FFD700";
      formationText.style.fontSize = "30px";
      formationText.style.fontWeight = "bold";
      formationText.style.marginTop = "10px";

      const header = document.createElement("div");
      header.style.textAlign = "center";
      header.appendChild(title);
      header.appendChild(formationText);

      // Clonar campo
      const fieldClone = field.cloneNode(true);
      fieldClone.querySelectorAll(".player-circle").forEach(player => {
        player.style.width = "80px";
        player.style.height = "80px";
        player.style.fontSize = "30px";
        player.style.borderWidth = "3px";
      });
      fieldClone.querySelectorAll(".player-name").forEach(name => {
        name.style.fontSize = "22px";
        name.style.marginTop = "8px";
        name.style.fontWeight = "600";
        name.style.textShadow = "0 3px 6px rgba(0,0,0,0.7)";
        name.style.letterSpacing = "1px";
      });
      fieldClone.style.width = "600px";
      fieldClone.style.maxWidth = "100%";
      fieldClone.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
      fieldClone.style.borderRadius = "20px";

      // Footer
      const footer = document.createElement("div");
      footer.innerHTML = `
        <div style="text-align:center;">
          <p style="color:white; font-size:28px; font-weight:bold; margin:0;">
            Monte sua escalação agora!
          </p>
          <p style="color:#000000; font-size:24px; margin-top:10px;">
            app-inter.vercel.app/
          </p>
        </div>
      `;

      // Marca d'água
      const watermark = document.createElement("div");
      watermark.innerText = "Treinador Colorado";
      watermark.style.position = "absolute";
      watermark.style.bottom = "30px";
      watermark.style.right = "30px";
      watermark.style.color = "rgba(255,255,255,0.15)";
      watermark.style.fontSize = "28px";
      watermark.style.fontWeight = "bold";
      watermark.style.letterSpacing = "1px";

      exportContainer.appendChild(header);
      exportContainer.appendChild(fieldClone);
      exportContainer.appendChild(footer);
      exportContainer.appendChild(watermark);

      document.body.appendChild(exportContainer);

      // Gerar canvas nítido, mas leve
      const canvas = await html2canvas(exportContainer, { scale: 1.5, useCORS: true });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.85);
      link.download = "treinador-colorado-story.jpg";
      link.click();

      document.body.removeChild(exportContainer);

    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
    }
  });
});

