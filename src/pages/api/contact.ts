import type { APIRoute } from "astro";

export const prerender = false;
import { db, ensureContactTable } from "../../lib/db/turso";

function validateForm(form: {
  name: string;
  email: string;
  stage: string;
  brief: string;
}): string | null {
  for (const [key, value] of Object.entries(form)) {
    if (!value) return `${key} is required.`;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) return "Invalid email address.";

  return null;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const stage = String(formData.get("stage") ?? "").trim();
    const brief = String(formData.get("brief") ?? "").trim();

    const error = validateForm({ name, email, stage, brief });
    if (error) {
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await ensureContactTable();

    await db.execute({
      sql: "INSERT INTO contact_submissions (name, email, stage, brief) VALUES (?, ?, ?, ?)",
      args: [name, email, stage, brief],
    });

    return new Response(
      JSON.stringify({ success: true, message: "Submission received." }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
