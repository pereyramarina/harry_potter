const url = "./assets/docs/students.json";
const overlay = document.querySelector('.overlay');
const input = document.getElementById('input');
const searchInput = document.getElementById('search');
const list = document.querySelector('.list');

let studentsArrayObj = [];

// Función para obtener los estudiantes desde el JSON
async function getStudents() {
    overlay.classList.add('active');
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        studentsArrayObj = await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
    } finally {
        overlay.classList.remove('active');
    }
}

// Función para mostrar los estudiantes filtrados
function displayStudents(students) {
    list.innerHTML = ''; // Limpiar la lista anterior
    students.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${student.nombre}</strong> - ${student.casa}`;
        list.appendChild(li);
    });
}

// Evento que se activa al escribir en el campo de búsqueda
searchInput.addEventListener('input', async () => {
    if (studentsArrayObj.length === 0) {
        await getStudents(); // Cargar los estudiantes si aún no se ha hecho
    }
    const query = searchInput.value.toLowerCase(); // Obtener el valor del campo de búsqueda
    const filteredStudents = studentsArrayObj.filter(student =>
        student.nombre.toLowerCase().includes(query) // Filtrar por nombre
    );
    displayStudents(filteredStudents); // Mostrar solo los resultados filtrados
});