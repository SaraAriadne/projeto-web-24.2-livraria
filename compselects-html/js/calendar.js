document.addEventListener('DOMContentLoaded', function() {
    // Eventos predefinidos
    const predefinedEvents = {
        '2025-04-25': [
            {
                time: '10:00',
                title: 'Palestra: “Inteligência Artificial no Dia a Dia” – com Dr. Carlos Lima',
                description: 'Uma conversa sobre como a IA está transformando diferentes setores da sociedade.'
            }
        ],
        '2025-05-15': [
            {
                time: '10:45',
                title: 'Painel: O Futuro da Computação Quântica',
                description: 'Especialistas discutem os desafios e possibilidades dessa nova fronteira da tecnologia.'
            }
        ],
        '2025-06-15': [
            {
                time: '10:00',
                title: 'Workshop: Introdução à Programação com Python',
                description: 'Oficina prática para quem quer dar os primeiros passos na programação com Python.'
            }
        ],
        '2025-07-15': [
            {
                time: '10:00',
                title: 'Mesa Redonda: Segurança da Informação e Privacidade de Dados',
                description: 'Um debate sobre como proteger seus dados na era digital, com convidados da área de cibersegurança.'
            }
        ],
        '2025-08-20': [
            {
                time: '10:00',
                title: 'Minicurso: Desenvolvimento de Jogos com Unity',
                description: 'Aprenda a criar jogos 2D e 3D utilizando a engine Unity, com foco em lógica e design.'
            }
        ],
        '2025-09-05': [
            {
                time: '10:00',
                title: 'Talk: Mulheres na Computação – Desafios e Conquistas',
                description: 'Um bate-papo inspirador sobre a presença feminina na área da computação.'
            }
        ]
    };
    
    // Variáveis globais
    let currentDate = new Date();
    let selectedDate = null;
    
    // Elementos do DOM
    const calendarDays = document.getElementById('calendar-days');
    const monthYearElement = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const todayBtn = document.getElementById('today-btn');
    const nextEventBtn = document.getElementById('next-event-btn');
    const eventsDateElement = document.getElementById('events-date');
    const eventsContainer = document.getElementById('events-container');
    const descriptionModal = document.getElementById('descriptionModal');
    const closeModalBtn = document.getElementById('closeModal');
    const eventDetails = document.getElementById('eventDetails');
    
    // Inicializar calendário
    renderCalendar();
    
    // Event listeners
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    todayBtn.addEventListener('click', goToToday);
    nextEventBtn.addEventListener('click', goToNextEvent);
    closeModalBtn.addEventListener('click', () => {
        descriptionModal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    descriptionModal.addEventListener('click', (e) => {
        if (e.target === descriptionModal) {
            descriptionModal.style.display = 'none';
        }
    });
    
    // Função para ir para o dia atual
    function goToToday() {
        currentDate = new Date();
        selectedDate = new Date(currentDate);
        renderCalendar();
        showEventsForSelectedDate();
    }
    
    // Função para ir para o próximo evento
    function goToNextEvent() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const eventDates = Object.keys(predefinedEvents)
            .map(dateStr => {
                const parts = dateStr.split('-');
                return new Date(parts[0], parts[1]-1, parts[2]);
            })
            .sort((a, b) => a - b);
        
        let nextEventDate = null;
        for (const eventDate of eventDates) {
            if (eventDate >= today) {
                nextEventDate = eventDate;
                break;
            }
        }
        
        if (nextEventDate) {
            currentDate = new Date(nextEventDate);
            selectedDate = new Date(nextEventDate);
            renderCalendar();
            showEventsForSelectedDate();
        } else {
            alert('Não há eventos futuros agendados.');
        }
    }
    
    // Função para renderizar o calendário
    function renderCalendar() {
        calendarDays.innerHTML = '';
        
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                           'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        monthYearElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startDay = firstDay.getDay();
        const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        const daysInMonth = lastDay.getDate();
        const today = new Date();
        const isCurrentMonth = currentDate.getMonth() === today.getMonth() && 
                              currentDate.getFullYear() === today.getFullYear();
        
        // Dias do mês anterior
        for (let i = startDay; i > 0; i--) {
            calendarDays.appendChild(createDayElement(prevLastDay - i + 1, true));
        }
        
        // Dias do mês atual
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = createDayElement(i, false);
            
            if (isCurrentMonth && i === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            if (selectedDate && 
                currentDate.getFullYear() === selectedDate.getFullYear() &&
                currentDate.getMonth() === selectedDate.getMonth() &&
                i === selectedDate.getDate()) {
                dayElement.classList.add('selected');
            }
            
            calendarDays.appendChild(dayElement);
        }
        
        // Dias do próximo mês
        const totalCells = 42;
        const remainingCells = totalCells - (startDay + daysInMonth);
        for (let i = 1; i <= remainingCells; i++) {
            calendarDays.appendChild(createDayElement(i, true));
        }
    }
    
    // Criar elemento de dia
    function createDayElement(dayNumber, isOtherMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = `calendar-day ${isOtherMonth ? 'other-month' : ''}`;
        dayElement.textContent = dayNumber;
        
        if (!isOtherMonth) {
            dayElement.addEventListener('click', () => {
                document.querySelector('.selected')?.classList.remove('selected');
                dayElement.classList.add('selected');
                selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
                showEventsForSelectedDate();
            });
        }
        
        return dayElement;
    }
    
    // Mostrar eventos da data selecionada
    function showEventsForSelectedDate() {
        if (!selectedDate) return;
        
        const dateKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
        const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                           'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        
        eventsDateElement.textContent = `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]}`;
        eventsContainer.innerHTML = '';
        
        if (predefinedEvents[dateKey]?.length > 0) {
            predefinedEvents[dateKey].forEach((event, index) => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event-item';
                eventElement.innerHTML = `
                    <div class="event-time">${event.time}</div>
                    <div class="event-title">${event.title}</div>
                    <button class="view-details-btn" data-date="${dateKey}" data-index="${index}">
                        Ver detalhes
                    </button>
                `;
                eventsContainer.appendChild(eventElement);
            });

            document.querySelectorAll('.view-details-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const dateKey = this.getAttribute('data-date');
                    const eventIndex = this.getAttribute('data-index');
                    showEventDetails(dateKey, eventIndex);
                });
            });
        } else {
            eventsContainer.innerHTML = '<div class="no-events">Nenhum evento agendado para este dia</div>';
        }
    }
    
    // Mostrar detalhes do evento no modal
    function showEventDetails(dateKey, eventIndex) {
        const event = predefinedEvents[dateKey][eventIndex];
        const [year, month, day] = dateKey.split('-');
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                           'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezember'];
        
        eventDetails.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Data:</strong> ${day} de ${monthNames[parseInt(month)-1]} de ${year}</p>
            <p><strong>Horário:</strong> ${event.time || 'Não especificado'}</p>
            <p><strong>Descrição:</strong></p>
            <p>${event.description || 'Nenhuma descrição disponível'}</p>
        `;
        
        descriptionModal.style.display = 'flex';
    }
});