"use strict";
import { loginService, registerService } from "../services/auth.service.js";
import { sendEmailDefault } from "../controllers/email.controller.js";
import {
  authValidation,
  cookieValidation,
  registerValidation,
} from "../validations/auth.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function login(req, res) {
  try {
    const { body } = req;

    const { error } = authValidation.validate(body);

    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const [accessToken, errorToken] = await loginService(body);

    if (errorToken) return handleErrorClient(res, 400, errorToken);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    handleSuccess(res, 200, "Inicio de sesión exitoso", { token: accessToken });
  } catch (error) {
    handleErrorServer(res, 500, "Error iniciando sesión", error.message);
  }
}

export async function register(req, res) {
  try {
    const { body } = req;

    const { error } = registerValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const [newUser, errorNewUser] = await registerService(body);

    if (errorNewUser) {
      return handleErrorClient(res, 400, errorNewUser);
    }

    const resEmail = await sendEmailDefault({ 
      body: {
        email: body.email,
        subject: "Cuenta registrada en ISW 2024 - 2!",
        message: `Bienvenido a la plataforma ${newUser.nombreCompleto}`,
      }
    });

    if (!resEmail.success) {
      console.error("Error enviando el correo:", resEmail.error);
    }

    handleSuccess(res, 201, "Usuario registrado con éxito", newUser);
  } catch (error) {
    console.error("Error capturado en el catch:", error);
    handleErrorServer(res, 500, "Error registrando al usuario", error.message);
  }
}





export async function logout(req, res) {
  try {
    const { cookies } = req;

    const { error } = cookieValidation.validate(cookies);

    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    res.clearCookie("jwt", { httpOnly: true });

    handleSuccess(res, 200, "Sesión cerrada exitosamente");
  } catch (error) {
    handleErrorServer(res, 500, "Error cerrando sesión", error.message);
  }
}