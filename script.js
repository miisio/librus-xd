// Mock bazy danych użytkowników
const users = [
    { username: "uczen1", password: "haslo1", role: "student" },
    { username: "uczen2", password: "haslo2", role: "student" },
    { username: "nauczyciel1", password: "haslo123", role: "teacher" },
    { username: "nauczyciel2", password: "haslo456", role: "teacher" }
];

// Obsługa logowania
document.getElementById("login-form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Znajdź użytkownika w "bazie danych"
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Przechowuj dane użytkownika w localStorage
        localStorage.setItem("role", user.role);
        localStorage.setItem("username", username);
        window.location.href = "dashboard.html"; // Przekierowanie na stronę główną
    } else {
        document.getElementById("error-message").textContent = "Niepoprawny użytkownik lub hasło!";
    }
});

// Logika wylogowywania
function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "index.html"; // Powrót na stronę logowania
}

// Sprawdzenie roli użytkownika na dashboardzie
function setupDashboard() {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    if (!role || !username) {
        window.location.href = "index.html"; // Przekierowanie do logowania
    }

    const menu = document.getElementById("menu");
    const content = document.getElementById("content");

    // Zależnie od roli użytkownika, wypełniamy menu i treść
    if (role === "student") {
        menu.innerHTML = `
            <li><a href="grades.html">Oceny</a></li>
            <li><a href="attendance.html">Frekwencja</a></li>
            <li><a href="schedule.html">Plan lekcji</a></li>
        `;
        content.innerHTML = `<p>Witaj, ${username}!<p>`;
    } else if (role === "teacher") {
        menu.innerHTML = `
            <li><a href="grades.html">Oceny</a></li>
            <li><a href="schedule.html">Plan lekcji</a></li>
        `;
        content.innerHTML = `<p>Witaj, nauczycielu ${username}!<p>`;
    }
}

// Uruchamiamy funkcję ustawiającą dashboard, jeśli użytkownik jest już zalogowany
if (window.location.pathname === "/dashboard.html") {
    setupDashboard();
}
