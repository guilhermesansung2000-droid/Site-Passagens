// data.js - Dados mockados para simular respostas de APIs
// Em produção, substitua por dados reais das APIs.

const mockAirports = [
    "São Paulo (GRU)", "Rio de Janeiro (GIG)", "Brasília (BSB)", "Salvador (SSA)", "Recife (REC)"
];

const mockFlightsData = [
    {
        origin: "São Paulo (GRU)",
        destination: "Rio de Janeiro (GIG)",
        departureDate: "2023-10-01",
        departureTime: "08:00",
        arrivalTime: "09:30",
        duration: "1h 30m",
        stops: 0,
        price: 150,
        baggage: true
    },
    {
        origin: "São Paulo (GRU)",
        destination: "Rio de Janeiro (GIG)",
        departureDate: "2023-10-02",
        departureTime: "10:00",
        arrivalTime: "11:30",
        duration: "1h 30m",
        stops: 1,
        price: 200,
        baggage: false
    },
    {
        origin: "São Paulo (GRU)",
        destination: "Rio de Janeiro (GIG)",
        departureDate: "2023-10-03",
        departureTime: "12:00",
        arrivalTime: "13:30",
        duration: "1h 30m",
        stops: 0,
        price: 120, // Menor preço, destacado
        baggage: true
    }
    // Adicione mais dados conforme necessário
];