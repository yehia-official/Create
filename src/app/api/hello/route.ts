// This file is intentionally left blank as it is no longer needed.
// The email sending logic has been moved to /api/send-parent-email/route.ts
// and the previous send-report route has been deleted.
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a simple hello world message
 *     description: A basic API endpoint to demonstrate server-side functionality in Next.js.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from the Backend!
 */
export async function GET(request: Request) {
  // This is server-side code. It runs on the server, not in the browser.
  // We can perform any backend logic here, like accessing a database,
  // calling other APIs, etc.

  const data = { message: "Hello from the Backend! This is a real API endpoint running on the server." };

  return NextResponse.json(data);
}
