# Malla curricular interactiva - APU

Proyecto web interactivo para visualizar y organizar el avance en la carrera **Analista de Programación Universitaria** mediante una malla curricular con correlativas, progreso guardado, exportación de información y sistema de reinicio.

## Demo
https://martidc.github.io/materias-apu/

## Motivación
Hice este proyecto para visualizar el avance real en la carrera y practicar JavaScript a la vez.

## Funcionalidades

- Visualización por año y cuatrimestre  
- Bloqueo automático de materias según correlativas  
- Marcado de materias completadas con un click  
- Guardado automático del progreso usando **localStorage**  
- Barra de progreso dinámica con porcentaje completado  
- Modal de confirmación para reiniciar avance
- Sistema de exportación para guardar el avance de manera externa, tanto en:
    - **JSON**, donde se permite descargar el archivo con el estado actual de las materias completadas, incluyendo fecha y estadíticas generales.
    - **PDF**, pensada para generar un reporte visual del progreso.

## Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript (Vanilla)  
- LocalStorage

---

## Estructura del proyecto
```bash
malla-curricular/
│
├── index.html
├── style.css
├── script.js 
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
- Click en una materia disponible para marcarla como completada
- Las correlativas se desbloquean automáticamente
- El progreso se guarda aunque se recargue la página
- Se puede exportar el avance desde el botón **Exportar**
- En caso de querer reiniciar, presionar **Reiniciar**

## Autora
Desarrollado por martidc 
