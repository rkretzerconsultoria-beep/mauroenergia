document.addEventListener("DOMContentLoaded", () => {
    // --- TAB SYSTEM ---
    const tabs = document.querySelectorAll(".nav-tab");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetTab = tab.getAttribute("data-tab");
            
            tabs.forEach(t => t.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(`tab-${targetTab}`).classList.add("active");
            
            if (targetTab === "simulator") {
                calculateFinance();
            }
        });
    });

    // --- DOCUMENTS SYSTEM ---
    const docButtons = document.querySelectorAll(".doc-tab-btn");
    const docViews = document.querySelectorAll(".doc-view");

    docButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetDoc = btn.getAttribute("data-doc");

            docButtons.forEach(b => b.classList.remove("active"));
            docViews.forEach(v => v.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(`doc-view-${targetDoc}`).classList.add("active");
        });
    });

    // --- SLIDESHOW SYSTEM ---
    let currentSlide = 1;
    const totalSlides = 8;
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");
    const slideCounter = document.getElementById("current-slide-num");
    const progressBar = document.getElementById("deck-progress-bar");
    const notesContent = document.getElementById("notes-content");
    const toggleNotesBtn = document.getElementById("toggle-notes");

    // Speaker Notes Data
    const speakerNotes = {
        1: "Olá, investidores e parceiros. Hoje apresentamos o projeto Rota Verde Paraná, uma oportunidade de investimento estruturado em infraestrutura de recarga para veículos elétricos que combina a urgência da transição energética com uma tese imobiliária altamente eficiente. Não estamos propondo apenas a venda de energia, mas a consolidação de pontos comerciais estratégicos e de alta conveniência, gerando retornos rápidos apoiados por uma das maiores margens de contribuição do mercado de infraestrutura atual. Vamos entender como transformaremos R$ 4 milhões em uma rede de recarga dominante no estado.",
        2: "O mercado de veículos elétricos no Brasil atingiu o seu ponto de inflexão. As vendas dobram ano a ano, e o Paraná destaca-se como o terceiro maior mercado do país. Contudo, os motoristas enfrentam uma grande dor: a falta de carregadores rápidos e de confiança. A maioria dos pontos atuais é lenta, oculta em subsolos de shoppings ou em locais inseguros à noite. Há uma corrida silenciosa pelo melhor 'real estate' da recarga urbana. Nossa tese foca em preencher esse gargalo imediatamente, ocupando as melhores localizações do estado antes que a concorrência se movimente.",
        3: "A nossa solução é a implantação de uma rede padronizada de 80 eletropostos rápidos de 40 kW DC no Paraná. Escolhemos a potência de 40 kW de forma extremamente estratégica: ela oferece recarga rápida (adiciona autonomia significativa em cerca de 30 a 40 minutos) sem exigir investimentos pesados em subestações de alta tensão, que seriam necessários para carregadores de 150 kW+. É o equilíbrio perfeito entre velocidade para o cliente e eficiência de CAPEX para o investidor. Tudo é monitorado via nuvem, minimizando a necessidade de equipe física local.",
        4: "O grande diferencial competitivo deste projeto não é a tecnologia do carregador em si, mas a escolha do ponto comercial. Fazer parceria com grandes redes de farmácias nos dá acesso imediato aos melhores endereços urbanos do Paraná. A farmácia oferece tudo o que o motorista de veículo elétrico quer enquanto espera: segurança, iluminação, banheiros e conveniência. Além disso, geramos um ciclo de benefício mútuo: trazemos um cliente premium para o estabelecimento, aumentando o tíquete médio deles, o que viabiliza a cessão das vagas de estacionamento a custo quase zero. É uma estratégia ganha-ganha imbatível.",
        5: "Vamos olhar para os números que sustentam este negócio. Vendemos o kWh a R$ 1,99. Nosso custo de energia é de R$ 0,42 por kWh, o que nos garante uma margem bruta inicial de quase 79%. Para gerenciar essa operação de forma enxuta, estimamos um OPEX de 12% sobre o faturamento bruto — cobrindo taxas de cartão, processamento de dados do aplicativo, suporte e manutenção preventiva. Isso nos deixa com uma Margem EBITDA de 66,9% ou R$ 1,33 líquidos a cada kWh comercializado. Trata-se de um modelo com alta geração de caixa e pouca sensibilidade a variações de custos indiretos.",
        6: "Nossa necessidade total de capital para implantar a rede completa de 80 pontos é de R$ 4 milhões. Conseguimos estruturar um CAPEX unitário extremamente enxuto de R$ 50 mil por ponto. A maior parte desse valor — 74% — vai direto para o ativo físico, o carregador rápido de 40 kW. Reservamos R$ 12 mil para a instalação física e elétrica, aproveitando a infraestrutura existente de energia das farmácias parceiras, o que reduz drasticamente o custo de obras civis. R$ 1 mil por ponto cobrem os projetos elétricos e aprovações. É um CAPEX direto, sem desperdícios, focado em colocar ativos para rodar rapidamente.",
        7: "A beleza deste modelo de negócio está na sensibilidade do retorno em relação ao uso dos carregadores. Se cada carregador for utilizado por apenas 1 hora e meia por dia — o que equivale a cerca de 2 ou 3 recargas curtas —, o EBITDA anual da rede será de R$ 2,33 milhões, gerando um payback de 20 meses. No nosso cenário base de 3 horas de uso diário por ponto, a rede gera R$ 4,66 milhões de EBITDA ao ano, pagando todo o investimento inicial em apenas 10 meses. Com a curva acelerada de adoção de VEs, qualquer aumento de utilização se traduz em caixa puro na veia do negócio, dada a altíssima margem de contribuição de 67%.",
        8: "Estamos diante de uma oportunidade clara de arbitragem de infraestrutura. Temos o mapeamento dos pontos, a viabilidade técnica e os parceiros comerciais prontos para assinar. Os R$ 4 milhões serão aplicados diretamente na compra de ativos reais com altíssima capacidade de geração de caixa. Convidamos vocês a se juntarem a nós no consórcio Rota Verde Paraná para capturar este mercado antes da consolidação dos players tradicionais de combustíveis. Obrigado e estamos abertos a perguntas e discussões de termos de investimento."
    };

    function updateSlide() {
        slides.forEach(slide => {
            slide.classList.remove("active");
            if (parseInt(slide.getAttribute("data-slide")) === currentSlide) {
                slide.classList.add("active");
            }
        });

        slideCounter.textContent = currentSlide;
        progressBar.style.width = `${(currentSlide / totalSlides) * 100}%`;
        notesContent.textContent = speakerNotes[currentSlide];
    }

    prevBtn.addEventListener("click", () => {
        if (currentSlide > 1) {
            currentSlide--;
            updateSlide();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentSlide < totalSlides) {
            currentSlide++;
            updateSlide();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (document.getElementById("tab-presentation").classList.contains("active")) {
            if (e.key === "ArrowRight" || e.key === " ") {
                if (currentSlide < totalSlides) {
                    currentSlide++;
                    updateSlide();
                }
            } else if (e.key === "ArrowLeft") {
                if (currentSlide > 1) {
                    currentSlide--;
                    updateSlide();
                }
            }
        }
    });

    toggleNotesBtn.addEventListener("click", () => {
        notesContent.classList.toggle("open");
    });

    updateSlide();


    // --- FINANCIAL SIMULATOR SYSTEM ---
    const simStations = document.getElementById("sim-stations");
    const simHours = document.getElementById("sim-hours");
    const simSalePrice = document.getElementById("sim-sale-price");
    const simEnergyCost = document.getElementById("sim-energy-cost");
    const simOpexRate = document.getElementById("sim-opex-rate");
    const resetBtn = document.getElementById("reset-sim");

    const valStations = document.getElementById("val-stations");
    const valHours = document.getElementById("val-hours");
    const valSalePrice = document.getElementById("val-sale-price");
    const valEnergyCost = document.getElementById("val-energy-cost");
    const valOpexRate = document.getElementById("val-opex-rate");

    const resCapex = document.getElementById("res-capex");
    const resRevenue = document.getElementById("res-revenue");
    const resEbitda = document.getElementById("res-ebitda");
    const resMargin = document.getElementById("res-margin");
    const resPayback = document.getElementById("res-payback");
    const simulationTableBody = document.querySelector("#simulation-table tbody");
    const chartViewport = document.getElementById("chart-viewport");

    function formatBRL(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    function calculateFinance() {
        const stations = parseInt(simStations.value);
        const hours = parseFloat(simHours.value);
        const salePrice = parseFloat(simSalePrice.value);
        const energyCost = parseFloat(simEnergyCost.value);
        const opexRate = parseFloat(simOpexRate.value) / 100;
        const powerKW = 40;
        const capexPerUnit = 50000;
        
        valStations.textContent = stations;
        valHours.textContent = hours.toFixed(1);
        valSalePrice.textContent = salePrice.toFixed(2);
        valEnergyCost.textContent = energyCost.toFixed(2);
        valOpexRate.textContent = simOpexRate.value;

        const totalCapex = stations * capexPerUnit;
        const monthlyData = [];
        const daysPerMonth = 30.4;
        let cumulativeFlow = 0;
        let paybackMonth = -1;

        // Ramp-up schedule
        const stationRamp = [
            0,
            0,
            Math.round(stations * 0.25),
            Math.round(stations * 0.625),
            stations, stations, stations, stations, stations, stations, stations, stations
        ];

        // CAPEX Outlays
        const capexSchedule = [
            totalCapex * 0.50,
            totalCapex * 0.375,
            totalCapex * 0.125,
            0, 0, 0, 0, 0, 0, 0, 0, 0
        ];

        for (let m = 0; m < 12; m++) {
            const activeStations = stationRamp[m];
            const capexOutlay = capexSchedule[m];
            
            const energyKWh = activeStations * hours * powerKW * daysPerMonth;
            const revenue = energyKWh * salePrice;
            const cogs = energyKWh * energyCost;
            const opex = revenue * opexRate;
            const ebitda = revenue - cogs - opex;
            const netFlow = ebitda - capexOutlay;
            cumulativeFlow += netFlow;

            if (cumulativeFlow >= 0 && paybackMonth === -1) {
                const prevCumulative = cumulativeFlow - netFlow;
                const portion = Math.abs(prevCumulative) / netFlow;
                paybackMonth = m + portion; 
            }

            monthlyData.push({
                month: m + 1,
                activeStations,
                revenue,
                cogs,
                opex,
                ebitda,
                capexOutlay,
                netFlow,
                cumulativeFlow
            });
        }

        const stabEnergyYear = stations * hours * powerKW * 365;
        const stabRevenueYear = stabEnergyYear * salePrice;
        const stabCogsYear = stabEnergyYear * energyCost;
        const stabOpexYear = stabRevenueYear * opexRate;
        const stabEbitdaYear = stabRevenueYear - stabCogsYear - stabOpexYear;
        const ebitdaMargin = (stabRevenueYear > 0) ? (stabEbitdaYear / stabRevenueYear) * 100 : 0;

        if (paybackMonth === -1) {
            const finalCumulative = monthlyData[11].cumulativeFlow;
            const monthlyStabEbitda = stabEbitdaYear / 12;
            if (finalCumulative < 0 && monthlyStabEbitda > 0) {
                paybackMonth = 12 + (Math.abs(finalCumulative) / monthlyStabEbitda);
            } else {
                paybackMonth = 999;
            }
        }

        resCapex.textContent = formatBRL(totalCapex);
        resRevenue.textContent = formatBRL(stabRevenueYear);
        resEbitda.textContent = formatBRL(stabEbitdaYear);
        resMargin.textContent = `${ebitdaMargin.toFixed(1)}%`;
        
        if (paybackMonth > 100) {
            resPayback.textContent = "Sem retorno";
        } else {
            resPayback.textContent = `${paybackMonth.toFixed(1)} meses`;
        }

        // Render Table
        simulationTableBody.innerHTML = "";
        let sumRevenue = 0;
        let sumCogs = 0;
        let sumOpex = 0;
        let sumEbitda = 0;
        let sumCapex = 0;
        let sumNetFlow = 0;

        monthlyData.forEach(row => {
            sumRevenue += row.revenue;
            sumCogs += row.cogs;
            sumOpex += row.opex;
            sumEbitda += row.ebitda;
            sumCapex += row.capexOutlay;
            sumNetFlow += row.netFlow;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="text-align: left; font-weight:500;">Mês ${row.month}</td>
                <td>${row.activeStations}</td>
                <td>${formatBRL(row.revenue)}</td>
                <td>${formatBRL(row.cogs)}</td>
                <td>${formatBRL(row.opex)}</td>
                <td class="text-success font-bold">${formatBRL(row.ebitda)}</td>
                <td>${formatBRL(row.capexOutlay)}</td>
                <td class="${row.netFlow >= 0 ? 'text-success' : 'text-danger'}">${formatBRL(row.netFlow)}</td>
                <td class="${row.cumulativeFlow >= 0 ? 'text-success' : 'text-danger'} font-bold">${formatBRL(row.cumulativeFlow)}</td>
            `;
            simulationTableBody.appendChild(tr);
        });

        // Totals row
        const trTotal = document.createElement("tr");
        trTotal.classList.add("highlight-total");
        trTotal.innerHTML = `
            <td style="text-align: left;">TOTAL ANO 1</td>
            <td>-</td>
            <td>${formatBRL(sumRevenue)}</td>
            <td>${formatBRL(sumCogs)}</td>
            <td>${formatBRL(sumOpex)}</td>
            <td>${formatBRL(sumEbitda)}</td>
            <td>${formatBRL(sumCapex)}</td>
            <td>${formatBRL(sumNetFlow)}</td>
            <td>-</td>
        `;
        simulationTableBody.appendChild(trTotal);

        // Render EBITDA Chart (All positive growing bars, no scary red bars)
        renderEbitdaChart(monthlyData);
    }

    function renderEbitdaChart(monthlyData) {
        chartViewport.innerHTML = "";
        
        // Find max EBITDA to scale the chart bars
        let maxEbitda = 0;
        monthlyData.forEach(m => {
            if (m.ebitda > maxEbitda) maxEbitda = m.ebitda;
        });

        // Fallback max if everything is 0
        if (maxEbitda === 0) maxEbitda = 10000;

        // Generate monthly bars
        monthlyData.forEach((m, idx) => {
            const col = document.createElement("div");
            col.className = "chart-bar-col";
            col.style.position = "absolute";
            col.style.left = `${(idx * 8) + 2}%`;
            col.style.width = "6%";
            col.style.height = "100%";
            col.style.zIndex = "3";

            // Tooltip
            const tooltip = document.createElement("div");
            tooltip.className = "chart-bar-tooltip";
            tooltip.textContent = `EBITDA Mês ${m.month}: ${formatBRL(m.ebitda)}`;
            col.appendChild(tooltip);

            // Bar
            const bar = document.createElement("div");
            bar.className = "chart-bar";
            
            // Calculate height proportional to maximum EBITDA
            // (since EBITDA starts at 0 and grows positive, heights are simple)
            const heightPercent = (m.ebitda / maxEbitda) * 100;
            bar.style.height = `${Math.max(heightPercent, 2)}%`; // Min height 2% for visual feedback
            
            // If month is construction phase (0 EBITDA), draw a small indicator block
            if (m.ebitda === 0) {
                bar.style.background = "rgba(255, 255, 255, 0.1)";
                tooltip.textContent = `Mês ${m.month}: Fase de Obras (R$ 0,00)`;
            } else {
                bar.style.background = "var(--primary-gradient)";
            }

            col.appendChild(bar);
            chartViewport.appendChild(col);
        });
    }

    [simStations, simHours, simSalePrice, simEnergyCost, simOpexRate].forEach(input => {
        input.addEventListener("input", calculateFinance);
    });

    resetBtn.addEventListener("click", () => {
        simStations.value = 80;
        simHours.value = 3.0;
        simSalePrice.value = 1.99;
        simEnergyCost.value = 0.42;
        simOpexRate.value = 12;
        calculateFinance();
    });

    calculateFinance();
});

function copyDocument(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Texto copiado com sucesso!");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
    });
}
