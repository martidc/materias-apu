const materias = [
  //primer año. primer cuatrimestre
  { id: 'ei', nombre: 'Elementos de Informática', correlativas: [] },
  { id: 'algebra', nombre: 'Álgebra', correlativas: [] },
  { id: 'epya', nombre: 'Expresión de Problemas y Algoritmos', correlativas: [] },

  //primer año. segundo cuatrimestre
  { id: 'ayp1', nombre: 'Algorítmica y Programación I', correlativas: ['epya'] },
  { id: 'am', nombre: 'Analisis Matemático', correlativas: [] },
  { id: 'elymd', nombre: 'Elementos de lógica y matemática discretaa', correlativas: [] },
  { id: 'ingles', nombre: 'Ingles', correlativas: [] },
  
  //segundo año. primer cuatrimestre
  { id: 'ayp2', nombre: 'Algorítmica y Programación II', correlativas: ['ingles', 'ayp1'] },
  { id: 'adc', nombre: 'Arquitectura de Computadoras', correlativas: ['ingles', 'ei'] },
  { id: 'syo', nombre: 'Sistemas y Organizaciones', correlativas: ['ingles'] },

  //segundo año. segundo cuatrimestre
  { id: 'bd1', nombre: 'Base de Datos I', correlativas: ['ingles', 'ayp2'] },
  { id: 'estadistica', nombre: 'Estadística', correlativas: ['ingles', 'algebra', 'am'] },
  { id: 'poo', nombre: 'Programación Orientada a Objetos', correlativas: ['ingles', 'ayp2'] },

  //tercer año. primer cuatrimestre
  { id: 'lpyl', nombre: 'Laboratorio de programación y lenguajes', correlativas: ['poo'] },
  { id: 'ayds', nombre: 'Análisis y diseño de sistemas', correlativas: ['syo', 'bd1'] },
  { id: 'so', nombre: 'Sistemas operativos', correlativas: ['adc', 'ayp2'] },

  //tercer año. segundo cuatrimestre
  { id: 'ds', nombre: 'Desarrollo de Software', correlativas: ['poo', 'ayds'] },
];

// Estados: 0 = no hecha, 1 = hecha (cursada), 2 = aprobada (final rendido)
const estado = {};
const totalMaterias = materias.length;


// Actualizar barra de progreso — cursadas (amarillo) + rendidas (verde)
function actualizarProgreso() {
  const cursadas = Object.values(estado).filter(v => v === 1).length;
  const rendidas = Object.values(estado).filter(v => v === 2).length;
  const pctCursadas = (cursadas / totalMaterias) * 100;
  const pctRendidas = (rendidas / totalMaterias) * 100;

  const esMobile = window.innerWidth <= 600;
  document.getElementById('progreso-texto').textContent = esMobile
    ? `${cursadas + rendidas}/${totalMaterias} · ${rendidas}/${totalMaterias}`
    : `${cursadas + rendidas}/${totalMaterias} cursadas · ${rendidas}/${totalMaterias} rendidas`;
  document.getElementById('barra-progreso-cursadas').style.width = `${pctCursadas}%`;
  document.getElementById('barra-progreso-rendidas').style.width = `${pctRendidas}%`;
}

// Cargar el progreso guardado al iniciar
function cargarProgreso() {
  const guardado = localStorage.getItem('progresoMaterias');
  if (guardado) {
    const datos = JSON.parse(guardado);
    // Compatibilidad con versión anterior (true/false → 0/2)
    for (const [key, val] of Object.entries(datos)) {
      if (val === true) estado[key] = 2;
      else if (val === false || val === 0) estado[key] = 0;
      else estado[key] = val;
    }
  }
}

// Guardar el progreso en localStorage
function guardarProgreso() {
  localStorage.setItem('progresoMaterias', JSON.stringify(estado));
}

// Modal de exportar
function mostrarModalExportar() {
  const tieneProgreso = Object.values(estado).some(v => v > 0);
  
  if (!tieneProgreso) {
    mostrarModalAviso("Todavía no marcaste ninguna materia :(");
    return;
  }

  const modal = document.getElementById('modal-exportar');
  modal.style.display = 'flex';
}

function cerrarModalExportar() {
  const modal = document.getElementById('modal-exportar');
  modal.style.display = 'none';
}

// exportar a JSON
function exportarJSON() {
  const aprobadas = Object.values(estado).filter(v => v === 2).length;
  
  const exportData = {
    fecha: new Date().toISOString(),
    progreso: { ...estado },
    totalMaterias: totalMaterias,
    hechas: Object.values(estado).filter(v => v === 1).length,
    aprobadas: aprobadas
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `progreso-malla-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  cerrarModalExportar();
}

// Exportar a PDF
function exportarPDF() {
  const tieneProgreso = Object.values(estado).some(v => v > 0);

  if (!tieneProgreso) {
    mostrarModalAviso("Todavía no marcaste ninguna materia.");
    return;
  }

  const hechas = Object.keys(estado).filter(id => estado[id] === 1);
  const aprobadas = Object.keys(estado).filter(id => estado[id] === 2);
  const sinCursar = materias.filter(m => !estado[m.id] || estado[m.id] === 0).map(m => m.id);
  const faltaRendir = hechas; // cursadas pero sin final

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Progreso - Malla Curricular APU", 10, 15);

  let y = 30;

  function seccion(titulo, lista) {
    if (lista.length === 0) return;
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.text(`${titulo} (${lista.length}):`, 10, y);
    y += 9;
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    lista.forEach(id => {
      if (y > 280) { doc.addPage(); y = 20; }
      const materia = materias.find(m => m.id === id);
      doc.text(`- ${materia.nombre}`, 14, y);
      y += 7;
    });
    y += 5;
  }

  seccion('Falta cursar', sinCursar);
  seccion('Falta rendir final', faltaRendir);

  doc.save("progreso-malla.pdf");
  cerrarModalExportar();
}

function mostrarModalAviso(mensaje) {
  document.getElementById("texto-aviso").textContent = mensaje;
  document.getElementById("modal-aviso").style.display = "flex";
}

function cerrarModalAviso() {
  document.getElementById("modal-aviso").style.display = "none";
}


function exportarProgreso() {
  mostrarModalExportar();
}

// Reiniciar todo el progreso
function reiniciarProgreso() {
  mostrarModal();
}

// Mostrar modal personalizado
function mostrarModal() {
  const modal = document.getElementById('modal-reiniciar');
  modal.style.display = 'flex';
}

// Cerrar modal
function cerrarModal() {
  const modal = document.getElementById('modal-reiniciar');
  modal.style.display = 'none';
}

// Confirmar reinicio
function confirmarReinicio() {
  localStorage.removeItem('progresoMaterias');
  for (let key in estado) {
    delete estado[key];
  }
  materias.forEach(m => {
    const div = document.getElementById(m.id);
    div.classList.remove('hecha', 'aprobada');
    if (!m.correlativas.every(id => (estado[id] || 0) >= 2)) {
      div.classList.add('bloqueada');
    } else {
      div.classList.remove('bloqueada');
    }
  });
  actualizarProgreso();
  cerrarModal();
}

// Función que renderiza la malla
function Malla() {
  materias.forEach(m => {
    const div = document.getElementById(m.id);
    const est = estado[m.id] || 0;

    // Aplicar clases de estado
    div.classList.remove('hecha', 'aprobada');
    if (est === 1) div.classList.add('hecha');
    else if (est === 2) div.classList.add('aprobada');

    // Bloquear si no se aprobaron las correlativas (estado 2)
    const desbloqueada = m.correlativas.every(id => (estado[id] || 0) >= 2);
    if (!desbloqueada) {
      div.classList.add('bloqueada');
    } else {
      div.classList.remove('bloqueada');
    }

    // Click: ciclo 0 → 1 → 2 → 0
    div.onclick = () => {
      if (!div.classList.contains('bloqueada')) {
        estado[m.id] = ((estado[m.id] || 0) + 1) % 3;
        guardarProgreso();
        Malla();
      }
    };
  });

  actualizarProgreso();
}

cargarProgreso();
Malla();

function abrirHowTo() {
  document.getElementById('modal-howto').style.display = 'flex';
}

function cerrarHowTo() {
  document.getElementById('modal-howto').style.display = 'none';
}

// Cerrar modales al hacer click fuera del contenido
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Cerrar modales con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
    });
  }
});

// Modo oscuro
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
}

// Cargar preferencia de modo oscuro — siempre setea el ícono correcto
(function() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) document.body.classList.add('dark');
  const btn = document.getElementById('btn-dark-mode');
  if (btn) btn.innerHTML = isDark
    ? '<span class="material-symbols-outlined">sunny</span>'
    : '<span class="material-symbols-outlined">moon_stars</span>';
})();