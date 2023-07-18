# url-shortener
 
Este proyecto utiliza el serverless framework de sst para implementar una API que crea, obtiene y elimina urls acortados a partir de un url original. 

Endpoints:
- POST / -> Crear un nuevo url corto
- GET  /{id} -> redirigir al url original a partir del url corto
- DELETE /{ID} -> eliminar el url corto

Ejecutar:

Para correr de forma local, ejecutar los comandos:

`npm install`

`npx sst dev`
