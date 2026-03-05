# Malla curricular interactiva - APU

Proyecto web interactivo para visualizar y organizar el avance en la carrera **Analista de Programación Universitaria** mediante una malla curricular con correlativas, progreso guardado, exportación de información y sistema de reinicio.

## Demo
https://martidc.github.io/materias-apu/

## Motivación
Hice este proyecto para visualizar el avance real en la carrera y practicar JavaScript a la vez.

## Funcionalidades

- Visualización por año y cuatrimestre  
- Bloqueo automático de materias según correlativas
- Sistema de tres estados por materia:
    - Sin cursar (estado inicial)
    - Cursada (un click) — se resalta en amarillo
    - Aprobada (dos clicks) — se resalta en verde
- Las correlativas se desbloquean solo al tener la materia aprobada
- Guardado automático del progreso usando **localStorage**  
- Barra de progreso dinámica con doble indicador: cursadas y aprobadas
- Modo oscuro con preferencia guardada entre sesiones  
- Modal de confirmación para reiniciar avance
- Sistema de exportación para guardar el avance de manera externa, tanto en:
    - **JSON**,  descarga el estado actual de las materias con fecha y estadísticas generales.
    - **PDF**,  genera un reporte con las materias que faltan cursar y las que faltan rendir

## Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript (Vanilla)  
- LocalStorage


## Estructura del proyecto
```bash
malla-curricular/
│
├── index.html
├── style.css
├── script.js
├── media/
│   ├── github-logo.svg
│   └── cafecito-logo.svg
└── README.md
```

## ¿Cómo usarlo?

1) Clonar el repositorio:

```bash
git clone https://github.com/martidc/materias-apu.git
```

2) Abrir el proyecto:
- Entrar a la carpeta
- Abrir index.html en el navegador

3) Interacción:
- Un click en una materia disponible para marcarla como cursada
- Dos clicks para marcarla como aprobada (final rendido)
- Tres clicks para volver al estado inicial
- Las correlativas se desbloquean automáticamente al aprobar las previas
- El progreso se guarda aunque se recargue la página
- Exportar el avance desde el botón Exportar
- Alternar entre modo claro y oscuro
- En caso de querer reiniciar, presionar **Reiniciar**

## Autora
Desarrollado por martidc 