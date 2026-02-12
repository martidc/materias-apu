# Malla curricular interactiva - APU

Proyecto web interactivo para visualizar y organizar el avance en la carrera **Analista de Programación Universitaria** mediante una malla curricular con correlativas, progreso guardado y sistema de reinicio.

## Demo
https://martidc.github.io/malla-curricular/


## Motivación
Hice este proyecto para visualizar el avance real en la carrera y practicar JavaScript a la vez.

## Funcionalidades

- Visualización por año y cuatrimestre  
- Bloqueo automático de materias según correlativas  
- Marcado de materias completadas con un click  
- Guardado automático del progreso usando **localStorage**  
- Barra de progreso dinámica con porcentaje completado  
- Botón para reiniciar avance con confirmación mediante modal  

---

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
├── index.html # Estructura principal de la malla
├── style.css # Estilos y diseño responsive
├── script.js # Lógica de correlativas, progreso y guardado
└── README.md # Documentación del proyecto
```

## ¿Cómo usarlo?

1) Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/malla-curricular.git
```

2) Abrir el proyecto:
- Entrar a la carpeta
- Abrir index.html en el navegador

3) Interacción:
- Click en una materia disponible para marcarla como completada
- Las correlativas se desbloquean automáticamente
- El progreso se guarda aunque se recargue la página
- En caso de querer reiniciar, presionar **Reiniciar**

## Autora
Desarrollado por Marti — estudiante de APU y desarrolladora en formación.

