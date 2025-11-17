// Sua tabela original (sem nenhuma alteração)
    const tabelaBaixoRisco = {
      0:    { 1000: 1100, 1200: 200, 1400: 0, 1600: 0, 1800: 0, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },
      200:  { 1000: 1100, 1200: 200, 1400: 0, 1600: 0, 1800: 0, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },
      400:  { 1000: 1200, 1200: 300, 1400: 0, 1600: 0, 1800: 0, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },
      600:  { 1000: 1200, 1200: 500, 1400: 0, 1600: 0, 1800: 0, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },
      800:  { 1000: 1300, 1200: 900, 1400: 600, 1600: 0, 1800: 0, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },
      1000: { 1000: 1400, 1200: 1000, 1400: 900, 1600: 300, 1800: 0, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },                           
      1200: { 1000: 1400, 1200: 1000, 1400: 900, 1600: 500, 1800: 0, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },
      1400: { 1000: 1300, 1200: 1000, 1400: 900, 1600: 800, 1800: 100, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },
      1600: { 1000: 1300, 1200: 1000, 1400: 900, 1600: 900, 1800: 500, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },
      1800: { 1000: 1100, 1200: 1000, 1400: 900, 1600: 900, 1800: 600, 2000: 0, 2200: 0,  2400: 0, 2500: 0 },
      2000: { 1000: 1100, 1200: 900, 1400: 700, 1600: 600, 1800: 500, 2000: 350, 2200: 0,  2400: 0, 2500: 0 },
      2200: { 1000: 600, 1200: 600, 1400: 500, 1600: 500, 1800: 400, 2000: 350, 2200: 250,  2400: 0, 2500: 0 },
      2400: { 1000: 100, 1200: 100, 1400: 100, 1600: 100, 1800: 100, 2000: 100, 2200: 100,  2400: 100, 2500: 0 },
      2500: { 1000: 0, 1200: 0, 1400: 0, 1600: 0, 1800: 0, 2000: 0, 2200: 0,  2400: 0, 2500: 0 }
    };

    // Lista ordenada das alturas de perigo da tabela
    const alturasTabela = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2500];

    // Encontra o valor imediatamente superior (ou igual)
    function encontrarValorSuperior(valorDigitado) {
      for (const h of alturasTabela) {
        if (valorDigitado <= h) {
          return h;
        }
      }
      return 2500; // se for maior que tudo, usa a linha mais conservadora
    }

    function calcularBaixoRisco(hPerigo, hEstrutura) {
      return tabelaBaixoRisco[hPerigo][hEstrutura];
    }

    document.getElementById("btnCalcular").addEventListener("click", () => {
      const valorDigitado = parseFloat(document.getElementById("hPerigo").value);
      const hEstrutura = document.getElementById("hEstrutura").value;
      const box = document.getElementById("resultado");

      if (isNaN(valorDigitado) || valorDigitado < 0 || !hEstrutura) {
        box.innerHTML = "<strong style='color:#c00;'>Preencha os campos corretamente.</strong>";
        box.style.display = "block";
        return;
      }

      // Aqui está a única mágica nova: pega o valor superior da tabela
      const hPerigoTabela = encontrarValorSuperior(valorDigitado);

      const resultado = calcularBaixoRisco(hPerigoTabela, hEstrutura);

      box.style.display = "block";

      if (resultado === null || resultado === undefined || resultado === 0 && valorDigitado <= 2500) {
        box.innerHTML = "Distância Horizontal Mínima:0 mm <br> <strong style='color:#0c0;'>Configuração de Proteção superior ao permitida pela norma.</strong>";
      } else {
        let msg = `<strong>Distância Horizontal Mínima:</strong> ${resultado} mm`;
        if (valorDigitado !== hPerigoTabela) {
          msg += `<br><small>(Usando referência conservadora de ${hPerigoTabela} mm)</small>`;
        }
        box.innerHTML = msg;
      }
    });