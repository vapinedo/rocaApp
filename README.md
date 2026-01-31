 # Prueba Técnica Frontend – ROCA
 
 ## Objetivo
 
 Evaluar criterios técnicos reales en desarrollo frontend con React, más allá de la construcción visual, validando manejo de estado, consumo de APIs, calidad de código y capacidad de explicar decisiones técnicas.
 - **Duración estimada:** 5 horas
 - **Modalidad:** Implementación + entrevista técnica posterior
 - **Lenguaje:** React + TypeScript
 - **Ejecución:** npm / yarn / pnpm
 
 ## Alcance de la Prueba
 
 Construir una aplicación web en React que permita visualizar y gestionar movimientos de inventario, consumiendo una API simulada (mock).
 
 ## Requisitos Generales
 
 - React + TypeScript
 - No es necesario usar Docker
 - El proyecto debe poder ejecutarse con:
	 - `npm install`
	 - `npm run dev` / `start`
 - La API debe ser simulada (mock)
 - Se permite usar plantillas públicas (Vite, CRA, Next.js, etc.)
 
 ## API Simulada (Obligatorio)
 
 La información debe provenir de una API simulada. Puedes elegir una opción estilo MSW (Mock Service Worker)
 
 ### Endpoints requeridos
 
 - `POST /auth/login` → retorna token simulado
 - `GET /stock-moves` (con filtros y paginación)
 - `GET /stock-moves/:id`
 - `PATCH /stock-moves/:id` (editar referencia)
 
 ## Pantallas a Construir
 
 1. **Login (simulado)**
		- Formulario simple
		- Guarda token simulado en memoria o localStorage
		- Sin token no se puede acceder al resto de la app
 2. **Listado de Movimientos**
		- Tabla con:
			- Fecha
			- Producto
			- Bodega
			- Tipo (IN / OUT / ADJUST)
			- Cantidad
			- Referencia
		- Filtros:
			- Producto (texto)
			- Bodega (select)
			- Tipo (select)
		- Estados:
			- loading
			- error (mostrar mensaje)
			- empty state
		- Paginación (client o server, justificar)
 3. **Detalle de Movimiento**
		- Mostrar información completa
		- Permitir editar únicamente el campo “reference”
		- Validación: 3–60 caracteres
		- Al guardar, reflejar el cambio en el listado sin recargar la página
 
 ## Manejo de Estado y Errores
 
 - Puedes usar cualquier estrategia de estado.
 - Debe existir manejo claro de errores:
	 - Si la API retorna error, debe mostrarse una notificación visible para el usuario
 
 ## Testing (Mínimo)
 
 - Al menos 2 tests unitarios o de integración
 - Se puede usar Jest, Vitest, React Testing Library
 - Tests deben aportar valor real
 
 ## Bonus (Opcional)
 
 - Persistir filtros en URL
 - Optimistic update al editar referencia
 - Accesibilidad básica
 - Cypress
 
 ## Evaluación
 
 Se evaluará:
 - Calidad y organización del código
 - Manejo de estado y datos
 - Manejo de errores