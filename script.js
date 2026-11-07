
const subjects = [
    {
        name: "Computer Graphics",
        units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
    },
    {
        name: "Web & Internet Technology",
        units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
    },
    {
        name: "Artificial Intelligence",
        units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
    },
    {
        name: "Analytics & Digital Awareness",
        units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
    }
];

// Load saved progress from browser
let completed = JSON.parse(
    localStorage.getItem("bcaProgress") || "[]"
);

// Display all subjects
function displaySubjects() {

    const container = document.getElementById("subjects");

    container.innerHTML = "";

    subjects.forEach((subject, subjectIndex) => {

        const completedCount = subject.units.filter(
            (_, unitIndex) =>
                completed.includes(`${subjectIndex}-${unitIndex}`)
        ).length;

        const progress =
            (completedCount / subject.units.length) * 100;

        const card = document.createElement("div");

        card.className = "subject-card";

        card.innerHTML = `
            <h3>${subject.name}</h3>

            <div class="progress-info">
                <span>Progress</span>
                <span>${Math.round(progress)}%</span>
            </div>

            <div class="progress-bar">
                <div class="progress-fill"
                     style="width: ${progress}%">
                </div>
            </div>

            ${subject.units.map((unit, unitIndex) => {

                const id = `${subjectIndex}-${unitIndex}`;

                return `
                    <div class="unit">
                        <input
                            type="checkbox"
                            id="${id}"
                            ${completed.includes(id) ? "checked" : ""}
                            onchange="toggleUnit('${id}')"
                        >

                        <label for="${id}">${unit}</label>
                    </div>
                `;

            }).join("")}
        `;

        container.appendChild(card);
    });

    updateDashboard();
}

// Mark a unit complete or incomplete
function toggleUnit(id) {

    if (completed.includes(id)) {

        completed = completed.filter(item => item !== id);

    } else {

        completed.push(id);

    }

    // Save progress in browser
    localStorage.setItem(
        "bcaProgress",
        JSON.stringify(completed)
    );

    displaySubjects();
}

// Update overall statistics
function updateDashboard() {

    const total = subjects.reduce(
        (sum, subject) => sum + subject.units.length, 0
    );

    const done = completed.length;

    const percentage = Math.round((done / total) * 100);

    document.getElementById("totalUnits").textContent = total;

    document.getElementById("completedUnits").textContent = done;

    document.getElementById("percentage").textContent =
        percentage + "%";
}

// Start the application
displaySubjects();
