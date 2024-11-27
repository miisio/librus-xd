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
        // Przekierowanie do panelu z informacją o roli
        localStorage.setItem("role", user.role);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error-message").textContent = "Nieprawidłowy login lub hasło!";
    }
});

// Generowanie zawartości panelu
if (window.location.pathname.includes("dashboard.html")) {
    const role = localStorage.getItem("role");

    const menu = document.getElementById("menu");
    const content = document.getElementById("content");

    if (role === "student") {
        menu.innerHTML = `
            <li><a href="#grades">Oceny</a></li>
            <li><a href="#attendance">Frekwencja</a></li>
            <li><a href="#schedule">Plan lekcji</a></li>
            <li><a href="index.html">Wyloguj</a></li>
        `;

        content.innerHTML = `
            <h2>Oceny</h2>
            <p>Matematyka: 5</p>
            <p>Polski: 4</p>
            <h2>Frekwencja</h2>
            <p>Obecności: 90%</p>
            <h2>Plan lekcji</h2>
            <p>Poniedziałek: Matematyka, Polski, Historia</p>
        `;
    } else if (role === "teacher") {
        menu.innerHTML = `
            <li><a href="#grades">Zarządzaj ocenami</a></li>
            <li><a href="#attendance">Zarządzaj frekwencją</a></li>
            <li><a href="#schedule">Edytuj plan lekcji</a></li>
            <li><a href="index.html">Wyloguj</a></li>
        `;

        content.innerHTML = `
            <h2>Zarządzaj ocenami</h2>
            <p>Możesz dodawać, edytować i usuwać oceny uczniów.</p>
            <h2>Zarządzaj frekwencją</h2>
            <p>Oznaczaj obecności i nieobecności uczniów.</p>
            <h2>Edytuj plan lekcji</h2>
            <p>Ustaw nowe lekcje i terminy.</p>
        `;
    } else {
        content.innerHTML = `<p>Błąd: Nie rozpoznano roli użytkownika.</p>`;
    }
}
