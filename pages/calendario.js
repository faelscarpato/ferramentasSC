// calendario.js

const currentMonthElement = document.getElementById('currentMonth');
const calendarBodyElement = document.getElementById('calendar-body');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const appointmentDateInput = document.getElementById('appointmentDate');
const appointmentTitleInput = document.getElementById('appointmentTitle');
const addAppointmentButton = document.getElementById('addAppointment');
const appointmentListElement = document.getElementById('appointmentList');

let currentDate = new Date();

// Função para renderizar o calendário
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
    });
    currentMonthElement.textContent = `${dateString.split(',')[1]}`;

    let dayCounter = 1;
    let calendarHTML = '<table><thead><tr>';
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    for (const day of daysOfWeek) {
        calendarHTML += `<th>${day}</th>`;
    }
    calendarHTML += '</tr></thead><tbody><tr>';

    // Espaços em branco antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        calendarHTML += '<td></td>';
    }

    while (dayCounter <= daysInMonth) {
        calendarHTML += `<td data-date="${formatDate(new Date(year, month, dayCounter))}">${dayCounter}</td>`;
        if ((firstDayOfMonth.getDay() + dayCounter) % 7 === 0) {
            calendarHTML += '</tr><tr>';
        }
        dayCounter++;
    }

    calendarHTML += '</tr></tbody></table>';
    calendarBodyElement.innerHTML = calendarHTML;

	//Adicionar listener para os dias
	document.querySelectorAll('#calendar-body td[data-date]').forEach(day => {
    day.addEventListener('click', () => {
         const date = day.dataset.date;
         appointmentDateInput.value = date;  //Preenche o calendario com a data
    });
	})
}

// Função para formatar a data no formato AAAA-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



// Função para avançar para o próximo mês
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Função para voltar para o mês anterior
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

// Event listeners para os botões de navegação
nextMonthButton.addEventListener('click', nextMonth);
prevMonthButton.addEventListener('click', prevMonth);

// Event listeners para adicionar compromissos
addAppointmentButton.addEventListener('click', addAppointment);

// Array para armazenar compromissos
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];//Carregar lista de compromissos, se houver

renderAppointments();


// Função para adicionar um compromisso
function addAppointment() {
    const date = appointmentDateInput.value;
    const title = appointmentTitleInput.value;

	//Validacao
    if (!date || !title) {
        alert('Por favor, preencha a data e o título do compromisso.');
        return;
    }

    const appointment = {
        date: date,
        title: title
    };

    appointments.push(appointment);
     localStorage.setItem('appointments', JSON.stringify(appointments)); //Salvar no LocalStorage

	renderAppointments();//Atualiza a lista
    
    //Limpar os campos do formulário
    appointmentDateInput.value = "";
    appointmentTitleInput.value = "";
}

// Função para remover um compromisso
function removeAppointment(index) {
    appointments.splice(index, 1);
     localStorage.setItem('appointments', JSON.stringify(appointments)); //Salvar no LocalStorage

     renderAppointments();//Atualiza a lista
}

function renderAppointments() {
    appointmentListElement.innerHTML = '';

    //Agrupar compromissos por data
    const groupedAppointments = {};

    appointments.forEach(appointment => {
        if (!groupedAppointments[appointment.date]) {
            groupedAppointments[appointment.date] = [];
        }
        groupedAppointments[appointment.date].push(appointment);
    });

    // Exibir cada grupo de compromissos
    for (const date in groupedAppointments) {
        const appointmentsForDate = groupedAppointments[date];

        const dateHeader = document.createElement('li');
        dateHeader.textContent = formatDateReadable(date);
        dateHeader.classList.add('appointment-date-header');
        appointmentListElement.appendChild(dateHeader);

        appointmentsForDate.forEach((appointment, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${appointment.title} 
                <button class="remove-appointment" data-index="${appointments.indexOf(appointment)}">Remover</button>
            `;
            appointmentListElement.appendChild(listItem);
        });
     }
     //Adicionar listener aos botões remove
     document.querySelectorAll('.remove-appointment').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            removeAppointment(index);
        });
    });
}

function formatDateReadable(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Renderiza o calendário na inicialização
renderCalendar();

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})