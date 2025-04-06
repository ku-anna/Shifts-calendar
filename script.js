const users = ["Аня", "Вадим", "Іра"]; // Імена користувачів
const calendarElement = document.getElementById("calendar");
const monthYearElement = document.getElementById("monthYear");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

let currentDate = new Date();

// Функція для побудови календаря
function buildCalendar(month, year) {
  // Очищаємо календар перед новим місяцем
  calendarElement.innerHTML = "";

  // Заголовок місяця та року
  monthYearElement.textContent = `${month + 1}/${year}`;

  // Отримуємо перший день місяця
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Кількість днів у місяці
  const totalDaysInMonth = lastDayOfMonth.getDate();

  // Дні тижня (пн, вт, ср і т.д.)
  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

  // Створюємо таблицю
  let row = calendarElement.insertRow();
  daysOfWeek.forEach((day) => {
    let cell = row.insertCell();
    cell.textContent = day;
    cell.style.fontWeight = "bold";
  });

  // Додаємо дати в таблицю
  for (let i = 1; i <= totalDaysInMonth; i++) {
    // Якщо це перший день тижня, додаємо новий рядок
    if ((i + firstDayOfMonth.getDay()) % 7 === 1) {
      row = calendarElement.insertRow();
    }

    // Створюємо клітинку для дня
    const cell = row.insertCell();
    cell.textContent = i;

    // Додаємо дропдаун меню для вибору чергового
    const select = document.createElement("select");
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user;
      option.textContent = user;
      select.appendChild(option);
    });

    // Встановлюємо вибір з localStorage, якщо є
    const storedData = localStorage.getItem(`${year}-${month + 1}-${i}`);
    if (storedData) {
      select.value = storedData;
    }

    select.addEventListener("change", (event) => {
      localStorage.setItem(`${year}-${month + 1}-${i}`, event.target.value);
    });

    cell.appendChild(select);

    // Виділення вихідних (субота, неділя)
    if (cell.cellIndex === 6 || cell.cellIndex === 5) {
      cell.classList.add("weekend");
    }
  }
}

// Функція для зміни місяця
function changeMonth(increment) {
  currentDate.setMonth(currentDate.getMonth() + increment);
  buildCalendar(currentDate.getMonth(), currentDate.getFullYear());
}

// Слухачі подій для кнопок зміни місяця
prevMonthButton.addEventListener("click", () => changeMonth(-1));
nextMonthButton.addEventListener("click", () => changeMonth(1));

// Початкове завантаження календаря
buildCalendar(currentDate.getMonth(), currentDate.getFullYear());
