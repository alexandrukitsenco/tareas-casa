import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";
import { User, db, eq } from "astro:db";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  /* Obtener el token de las cabeceras de la solicitud */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response(
      "Token no encontrado",
      { status: 401 }
    );
  }

  /* Verificar la id del token */
  try {
    const decodedCookie = await auth.verifyIdToken(idToken);
    const user = await auth.getUser(decodedCookie.uid);
    const dbUser = await db.select().from(User).where(eq(User.mail, user.email))
    if (!dbUser[0]) {
      await db.insert(User).values({mail: user.email}).then((res) => console.log(res))
    }
  } catch (error) {
    return new Response(
      "Token invalido",
      { status: 401 }
    );
  }

  /* Crear y establecer una cookie de sesión */
  const fiveDays = 60 * 60 * 24 * 13 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays,
  });

  cookies.set("session", sessionCookie, {
    path: "/",
  });

  return redirect("/dashboard");
};