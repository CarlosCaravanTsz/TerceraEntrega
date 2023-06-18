# TERCER ENTREGABLE
## Curso Profesional de Backend con Express
### Carlos Eduardo Caravantes Reynoso

En esta entrega se crea un servidor con Express que tiene dos rutas get: una para obtener una lista de productos con un parametro opcional "limit" y otra ruta que recibe
un id para retornar el producto correspondiente a ese id si es que existe.

Esto se logra por medio del ProductManager creado en clases pasadas, el cual es una interface para interactuar con una "base de datos" en formato txt que se emplea como
medio de persistencia.

### Prueba

Para probar el proyecto asegurarse de tener todos los archivos en una carpeta, clonar el repositorio y ejecutar "nodemon app.js" para correr el servidor.
A continuacion ir al navegador a la direccion localhost:8080/products y ver la lista de productos (que son 5 en el archivo products.txt, tiene que estar en la misma ruta).

A continuacion probar los siguientes endpoints:
- localhost:8080/products?limit=2
- localhost:8080/products?limit=3
- localhost:8080/products/2
- localhost:8080/products/5

y validar apropiadamente.
