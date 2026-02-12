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

const estado = {};  // Guarda qué materias están hechas
const totalMaterias = materias.length;


// Actualizar barra de progreso
function actualizarProgreso() {
  const completadas = Object.values(estado).filter(v => v).length;
  const porcentaje = Math.round((completadas / totalMaterias) * 100);
  
  document.getElementById('progreso-texto').textContent = `${completadas}/${totalMaterias} (${porcentaje}%)`;
  document.getElementById('barra-progreso-fill').style.width = `${porcentaje}%`;
}

// Cargar el progreso guardado al iniciar
function cargarProgreso() {
  const guardado = localStorage.getItem('progresoMaterias');
  if (guardado) {
    const datos = JSON.parse(guardado);
    Object.assign(estado, datos);
  }
}

// Guardar el progreso en localStorage
function guardarProgreso() {
  localStorage.setItem('progresoMaterias', JSON.stringify(estado));
}

// Modal de exportar
function mostrarModalExportar() {
  const progreso = localStorage.getItem('progresoMaterias');
  
  if (!progreso || progreso === "{}") {
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
  const progreso = localStorage.getItem('progresoMaterias');
  
  const exportData = {
    fecha: new Date().toISOString(),
    progreso: JSON.parse(progreso),
    totalMaterias: totalMaterias,
    completadas: Object.values(JSON.parse(progreso)).filter(v => v).length
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
  const progreso = localStorage.getItem("progresoMaterias");

  if (!progreso || progreso === "{}") {
    mostrarModalAviso("Todavía no marcaste ninguna materia.");
    return;
  }

  const datos = JSON.parse(progreso);

  const completadas = Object.keys(datos).filter(id => datos[id]);

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Progreso - Malla Curricular APU", 10, 15);

  doc.setFontSize(12);
  doc.text(`Materias completadas: ${completadas.length}`, 10, 30);

  let y = 45;
  completadas.forEach((id, index) => {
    const materia = materias.find(m => m.id === id);
    doc.text(`- ${materia.nombre}`, 10, y);
    y += 8;
  });

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
  // Limpiar el objeto estado
  for (let key in estado) {
    delete estado[key];
  }
  // Actualizar la vista
  materias.forEach(m => {
    const div = document.getElementById(m.id);
    div.classList.remove('hecha');
    if (!m.correlativas.every(id => estado[id])) {
      div.classList.add('bloqueada');
    } else {
      div.classList.remove('bloqueada');
    }
  });
  actualizarProgreso();  // Actualizar barra de progreso
  cerrarModal();
}

// Función que renderiza la malla
function Malla() {
  // Cambiar color y bloquear correlativas
  materias.forEach(m => {
    const div = document.getElementById(m.id);
    if (estado[m.id]) {
      div.classList.add('hecha');
    } else {
      div.classList.remove('hecha');
    }

    if (!m.correlativas.every(id => estado[id])) {
      div.classList.add('bloqueada');
    } else {
      div.classList.remove('bloqueada');
    }

    // Evento click para marcar la materia como "hecha"
    div.onclick = () => {
      if (!div.classList.contains('bloqueada')) {
        estado[m.id] = !estado[m.id];
        guardarProgreso();  // Guardar después de cada cambio
        Malla();
      }
    };
  });

actualizarProgreso();  // Actualizar barra de progreso
}

cargarProgreso();  // Cargar el progreso al iniciar
Malla();
