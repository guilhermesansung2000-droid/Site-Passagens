// script.js - Lógica principal do site
// Este arquivo gerencia a busca de voos, filtragem, gráficos e alertas.
// Usa dados mockados de data.js para simulação. Para APIs reais, substitua as chamadas fetch.

// Inicialização do EmailJS (substitua pelas suas chaves reais de emailjs.com)
emailjs.init("YOUR_PUBLIC_KEY"); // Chave pública do EmailJS

// Elementos DOM
const searchForm = document.getElementById('flight-search');
const flightsList = document.getElementById('flights-list');
const sortBy = document.getElementById('sort-by');
const directFlights = document.getElementById('direct-flights');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const originInput = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const originSuggestions = document.getElementById('origin-suggestions');
const destinationSuggestions = document.getElementById('destination-suggestions');
const alertForm = document.getElementById('alert-form');
const pushAlertBtn = document.getElementById('push-alert');

// Dados mockados (de data.js)
let flightsData = [];

// Função para buscar voos (simulação de API)
// Em produção, substitua por chamadas reais, ex.: fetch('https://api.skyscanner.com/flights/live/search')
async function searchFlights(origin, destination, departureDate, returnDate) {
    // Simulação: Retorna dados de data.js
    // Exemplo de requisição real (comentado):
    // const response = await fetch(`https://api.skyscanner.com/flights/live/search?origin=${origin}&destination=${destination}&date=${departureDate}`, {
    //     headers: { 'X-RapidAPI-Key': 'YOUR_API_KEY' } // Use RapidAPI para Skyscanner
    // });
    // const data = await response.json();
    // return data.flights;

    // Simulação com dados mockados
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockFlightsData); // De data.js
        }, 1000); // Simula delay de API
    });
}

// Função para renderizar voos
function renderFlights(flights) {
    flightsList.innerHTML = '';
    flights.forEach(flight => {
        const card = document.createElement('div');
        card.className = 'flight-card';
        if (flight.price === Math.min(...flights.map(f => f.price))) {
            card.classList.add('best-deal'); // Destaque para menor preço
        }
        card.innerHTML = `
            <div>
                <h3>${flight.origin} → ${flight.destination}</h3>
                <p>Data: ${flight.departureDate} | Horário: ${flight.departureTime} - ${flight.arrivalTime}</p>
                <p>Duração: ${flight.duration} | Escalas: ${flight.stops}</p>
                <p>Bagagem: ${flight.baggage ? 'Incluída' : 'Não incluída'}</p>
            </div>
            <div>
                <p>Preço: R$ ${flight.price}</p>
                <button>Comprar</button>
            </div>
        `;
        flightsList.appendChild(card);
    });
}

// Função para filtrar e ordenar voos
function filterAndSortFlights(flights) {
    let filtered = flights.filter(f => f.price <= priceRange.value);
    if (directFlights.checked) {
        filtered = filtered.filter(f => f.stops === 0);
    }
    filtered.sort((a, b) => {
        if (sortBy.value === 'price') return a.price - b.price;
        if (sortBy.value === 'duration') return a.duration.localeCompare(b.duration);
        if (sortBy.value === 'stops') return a.stops - b.stops;
        return 0;
    });
    return filtered;
}

// Função para gerar gráfico de variação de preço (usando Chart.js)
function renderPriceChart(flights) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    const labels = flights.map(f => f.departureDate);
    const prices = flights.map(f => f.price);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Preço (R$)',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
        }
    });
}

// Auto-sugestão de aeroportos/destinos (simulação)
function setupSuggestions(input, suggestionsDiv) {
    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        const suggestions = mockAirports.filter(a => a.toLowerCase().includes(query));
        suggestionsDiv.innerHTML = '';
        if (suggestions.length > 0) {
            suggestionsDiv.style.display = 'block';
            suggestions.forEach(s => {
                const div = document.createElement('div');
                div.textContent = s;
                div.addEventListener('click', () => {
                    input.value = s;
                    suggestionsDiv.style.display = 'none';
                });
                suggestionsDiv.appendChild(div);
            });
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });
}

// Configuração de alertas de e-mail
alertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('alert-email').value;
    const price = document.getElementById('alert-price').value;
    // Simulação: Envia e-mail via EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { to_email: email, target_price: price })
        .then(() => alert('Alerta configurado!'))
        .catch(err => console.error('Erro no e-mail:', err));
});

// Configuração de notificações push
pushAlertBtn.addEventListener('click', () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('sw.js').then(reg => {
            reg.showNotification('Alerta Ativado', { body: 'Você será notificado de quedas de preço.' });
        });
    } else {
        alert('Notificações push não suportadas.');
    }
});

// Event listeners
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const origin = originInput.value;
    const destination = destinationInput.value;
    const departureDate = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;
    const flights = await searchFlights(origin, destination, departureDate, returnDate);
    flightsData = flights;
    const filtered = filterAndSortFlights(flightsData);
    renderFlights(filtered);
    renderPriceChart(filtered);
});

sortBy.addEventListener('change', () => {
    const filtered = filterAndSortFlights(flightsData);
    renderFlights(filtered);
});

directFlights.addEventListener('change', () => {
    const filtered = filterAndSortFlights(flightsData);
    renderFlights(filtered);
});

priceRange.addEventListener('input', () => {
    priceValue.textContent = priceRange.value;
    const filtered = filterAndSortFlights(flightsData);
    renderFlights(filtered);
});

// Inicializar auto-sugestões
setupSuggestions(originInput, originSuggestions);
setupSuggestions(destinationInput, destinationSuggestions);