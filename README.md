# Nodemailer API

Este proyecto utiliza Nodemailer para enviar correos electrónicos a través de una API. 
La API está diseñada para recibir solicitudes HTTP con un formato JSON y enviar un correo electrónico basado en la información proporcionada.

## Requisitos

- Node.js v14 o superior
- Nodemailer v6.7.2 o superior

## Instalación

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/alezcf/CapsulaEmail.git
2. Navega al directorio del proyecto:
   ```bash
   cd backend
3. Instala las dependencias:
   ```bash
   npm i

## Ejecución

1. Enviar un correo electrónico

Envía una solicitud POST a la siguiente ruta con el cuerpo en formato JSON:

  ```bash
  {{URL}}/api/email/send 
  ```
Formato del cuerpo de la solicitud (JSON):
  ```json
  {
    "email": "example@alumnos.ubiobio.cl",
    "subject": "ISW 2024 - 2",
    "message": "Prueba de envío realizada correctamente a través de Postman."
  }
  ```
Respuesta esperada:
  ```json
  {
      "status": "Success",
      "message": "Correo enviado con éxito"
      "data": {
          "from": *\*Nombre declarado del autor*\*, <Correo electronico del autor>,
          "to": <example@alumnos.ubiobio.cl>,
          "subject": <ISW 2024 - 2>,
          "text": <Prueba de envío realizada correctamente a través de Postman.>,
          "html": *<p>Prueba de envío realizada correctamente a través de Postman.</p>*
      }
  }
  ```
