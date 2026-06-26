import process from "node:process";

import { createServerFn } from "@tanstack/react-start";

import { bookingSchema, type BookingInput } from "@/lib/bookings/schema";

type BrevoRecipient = {
  email: string;
  name?: string;
};

type BrevoPayload = {
  sender: BrevoRecipient;
  to: BrevoRecipient[];
  subject: string;
  htmlContent: string;
  textContent: string;
  replyTo?: BrevoRecipient;
};

type SupabaseInsertError = {
  code?: string;
  message?: string;
};

const BREVO_TRANSACTIONS_API = "https://api.brevo.com/v3/smtp/email";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildDetailCard(label: string, value: string) {
  return `
    <div style="padding:14px 16px;border:1px solid #eadfc8;border-radius:16px;background:#fcfaf7;">
      <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#8a6a2f;font-weight:700;">${escapeHtml(label)}</div>
      <div style="margin-top:6px;font-size:14px;line-height:1.5;color:#1f2937;font-weight:600;">${escapeHtml(value)}</div>
    </div>
  `;
}

function buildPremiumEmailHtml(params: {
  kicker: string;
  headline: string;
  intro: string;
  details: Array<{ label: string; value: string }>;
  nextStepTitle: string;
  nextStepBody: string;
  ctaText: string;
  ctaHref: string;
  closingNote: string;
}) {
  const detailsMarkup = params.details.map((detail) => buildDetailCard(detail.label, detail.value)).join("");

  return `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#f6f1e8;">
        <div style="max-width:680px;margin:0 auto;padding:20px;font-family:Arial,Helvetica,sans-serif;color:#17324f;">
          <div style="overflow:hidden;border-radius:24px;background:linear-gradient(135deg,#173f74 0%,#2d5f9a 52%,#f0b544 100%);box-shadow:0 18px 40px rgba(17,58,97,.16);">
            <div style="padding:24px;color:#fff;">
              <div style="text-align:right;font-size:11px;letter-spacing:.24em;text-transform:uppercase;font-weight:700;opacity:.92;">
                Est. 2012
              </div>

              <div style="margin-top:20px;font-size:11px;letter-spacing:.28em;text-transform:uppercase;font-weight:700;opacity:.88;">
                ${escapeHtml(params.kicker)}
              </div>
              <h1 style="margin:8px 0 0;font-size:28px;line-height:1.15;letter-spacing:-0.02em;">${escapeHtml(params.headline)}</h1>
              <p style="margin:10px 0 0;max-width:560px;font-size:15px;line-height:1.65;opacity:.96;">${escapeHtml(params.intro)}</p>
            </div>

            <div style="background:#fff;padding:22px;border-top:1px solid rgba(234,223,200,.85);">
              <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;">
                ${detailsMarkup}
              </div>

              <div style="margin-top:18px;padding:18px;border:1px solid #eadfc8;border-radius:20px;background:#f8f3ea;">
                <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8a6a2f;font-weight:700;">${escapeHtml(params.nextStepTitle)}</div>
                <p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:#4b5563;">${escapeHtml(params.nextStepBody)}</p>
                <div style="margin-top:16px;">
                  <a href="${escapeHtml(params.ctaHref)}" style="display:inline-block;padding:11px 18px;border-radius:999px;background:#173f74;color:#fff;text-decoration:none;font-weight:700;font-size:13px;">
                    ${escapeHtml(params.ctaText)}
                  </a>
                </div>
              </div>

              <p style="margin:16px 0 0;font-size:11px;line-height:1.6;color:#6b7280;text-align:center;">${escapeHtml(params.closingNote)}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `.trim();
}

function mapBookingInsertError(error: SupabaseInsertError) {
  if (error.code === "42P01") {
    return "Bookings table not found. Run the SQL schema in your Supabase project.";
  }
  if (error.code === "42501") {
    return "Booking insert blocked by RLS/permissions. Re-run the booking SQL policy script.";
  }
  if (error.code === "23514") {
    return "Some booking values failed validation rules in the database.";
  }
  if (error.code === "22P02") {
    return "Invalid date or number format was submitted. Please check the form values.";
  }
  return "Couldn't save your enquiry. Please try again.";
}

function formatBookingDetails(data: BookingInput) {
  return {
    destination: data.destination ?? "Not specified",
    travelers: data.travelers,
    travelFrom: data.travel_from ?? "Not specified",
    travelTo: data.travel_to ?? "Not specified",
    notes: data.notes ?? "No additional notes",
  };
}

function getCustomerEmailContent(data: BookingInput, companyName: string) {
  const details = formatBookingDetails(data);
  return {
    subject: `Thank you for your enquiry, ${data.full_name}!`,
    textContent: [
      `Hi ${data.full_name},`,
      "",
      `Thanks for contacting ${companyName}. We have received your booking enquiry and our team will reach out shortly.`,
      "",
      "Your submitted details:",
      `Destination: ${details.destination}`,
      `Travelers: ${details.travelers}`,
      `Travel dates: ${details.travelFrom} to ${details.travelTo}`,
      `Phone: ${data.phone}`,
      `Notes: ${details.notes}`,
      "",
      "Warm regards,",
      companyName,
    ].join("\n"),
    htmlContent: buildPremiumEmailHtml({
      kicker: "Booking confirmation",
      headline: `Thanks for reaching out, ${data.full_name}.`,
      intro: `We’ve received your enquiry at ${companyName} and our travel team will review it shortly. Your trip request is already in motion.`,
      details: [
        { label: "Destination", value: details.destination },
        { label: "Travelers", value: String(details.travelers) },
        { label: "Travel dates", value: `${details.travelFrom} to ${details.travelTo}` },
        { label: "Phone", value: data.phone },
        { label: "Notes", value: details.notes },
      ],
      nextStepTitle: "What happens next",
      nextStepBody: "Our team will review your enquiry and contact you with the best-fit itinerary, pricing and availability options.",
      ctaText: "Call us now",
      ctaHref: "tel:+917204963703",
      closingNote: `Buddiez Holidays · ${companyName} · Your Journey, Our Comfort`,
    }),
  };
}

function getAgencyEmailContent(data: BookingInput, companyName: string) {
  const details = formatBookingDetails(data);
  return {
    subject: `New Booking Enquiry: ${data.full_name}`,
    textContent: [
      `A new booking enquiry was submitted on ${companyName}.`,
      "",
      `Name: ${data.full_name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Destination: ${details.destination}`,
      `Travelers: ${details.travelers}`,
      `Travel dates: ${details.travelFrom} to ${details.travelTo}`,
      `Notes: ${details.notes}`,
    ].join("\n"),
    htmlContent: buildPremiumEmailHtml({
      kicker: "New lead received",
      headline: `${data.full_name} submitted a booking enquiry.`,
      intro: `A new customer has asked for help planning a trip with ${companyName}. Their details are summarized below for quick follow-up.`,
      details: [
        { label: "Name", value: data.full_name },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Destination", value: details.destination },
        { label: "Travelers", value: String(details.travelers) },
        { label: "Travel dates", value: `${details.travelFrom} to ${details.travelTo}` },
        { label: "Notes", value: details.notes },
      ],
      nextStepTitle: "Suggested follow-up",
      nextStepBody: "Reply with itinerary options, availability and a concise quote. If the customer prefers a call, use the number below right away.",
      ctaText: "Reply to customer",
      ctaHref: `mailto:${escapeHtml(data.email)}`,
      closingNote: `Operations dashboard · ${companyName} · ${data.phone}`,
    }),
  };
}

async function sendBrevoEmail(payload: BrevoPayload, apiKey: string) {
  const response = await fetch(BREVO_TRANSACTIONS_API, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let json: any = undefined;
  try {
    json = text ? JSON.parse(text) : undefined;
  } catch (e) {
    // ignore JSON parse error
  }

  if (!response.ok) {
    console.error("[Brevo] send failed", response.status, text, json);
    throw new Error(`Brevo API failed (${response.status}): ${text}`);
  }

  console.info("[Brevo] send succeeded", response.status, json ?? text);
  return json;
}

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator(bookingSchema)
  .handler(async ({ data }) => {
    try {
      const bookingPayload = {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        travelers: data.travelers,
        travel_from: data.travel_from ?? null,
        travel_to: data.travel_to ?? null,
        destination: data.destination ?? null,
        notes: data.notes ?? null,
      };

      // Dynamically import the server-side Supabase admin client so import-time
      // failures (missing env) are caught by the outer try/catch and returned
      // as structured messages instead of causing a 500 before the handler runs.
      let insertError: SupabaseInsertError | null = null;
      try {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const result = await supabaseAdmin.from("bookings").insert(bookingPayload);
        insertError = result.error;
      } catch (error) {
        console.error("[Booking] Supabase client runtime error", error);
        const msg = error instanceof Error ? error.message : String(error);

        // Some bundlers / runtimes may surface CJS/require issues ("require is not defined").
        // In that case fall back to using Supabase's REST (PostgREST) endpoint via fetch
        // so the handler can still insert without importing the client library.
        if (msg.includes("require is not defined") || msg.includes("not defined") || msg.includes("Cannot find module")) {
          const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
          const SUPABASE_KEY =
            process.env.SUPABASE_SERVICE_ROLE_KEY ||
            process.env.SUPABASE_PUBLISHABLE_KEY ||
            process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

          if (!SUPABASE_URL || !SUPABASE_KEY) {
            return {
              ok: false,
              message: `Server configuration error while saving booking: ${msg}`,
            };
          }

          try {
            const restUrl = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/bookings`;
            const restRes = await fetch(restUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
                Prefer: "return=minimal",
              },
              body: JSON.stringify([bookingPayload]),
            });

            if (!restRes.ok) {
              const body = await restRes.text();
              console.error("[Booking] Supabase REST insert failed", restRes.status, body);
              return {
                ok: false,
                message: `Couldn't save your enquiry (DB). Server responded ${restRes.status}.`,
              };
            }
          } catch (restError) {
            console.error("[Booking] Supabase REST insert error", restError);
            const detail = restError instanceof Error ? restError.message : String(restError);
            return {
              ok: false,
              message: `Server configuration error while saving booking: ${detail}`,
            };
          }

          // REST insert succeeded — continue with emails.
        } else {
          const detail = msg;
          return {
            ok: false,
            message: `Server configuration error while saving booking: ${detail}`,
          };
        }
      }

      if (insertError) {
        console.error("[Booking] Supabase insert failed", insertError);
        return {
          ok: false,
          message: mapBookingInsertError(insertError),
        };
      }

      const apiKey = process.env.BREVO_API_KEY;
      const senderEmail = process.env.BREVO_SENDER_EMAIL;
      const senderName = process.env.BREVO_SENDER_NAME || "Buddiez Holidays";
      const teamEmail = process.env.BREVO_TEAM_EMAIL;
      const companyName = process.env.BREVO_COMPANY_NAME || "Buddiez Holidays";

      if (!apiKey || !senderEmail || !teamEmail) {
        console.warn(
          "[Booking] Brevo env vars missing. Required: BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_TEAM_EMAIL",
        );
        return {
          ok: true,
          message: "Thank you! Your enquiry was received. We'll reach out within 24 hours.",
        };
      }

      const sender = { email: senderEmail, name: senderName };
      const customerMail = getCustomerEmailContent(data, companyName);
      const agencyMail = getAgencyEmailContent(data, companyName);

      // IMPORTANT: await the sends. On serverless (Vercel), the function instance
      // is frozen/killed the moment the handler returns, so any non-awaited
      // ("fire-and-forget") fetch to Brevo gets terminated before it completes —
      // which is why the DB row saved but no email ever arrived.
      const emailResults = await Promise.allSettled([
        sendBrevoEmail(
          {
            sender,
            to: [{ email: data.email, name: data.full_name }],
            subject: customerMail.subject,
            htmlContent: customerMail.htmlContent,
            textContent: customerMail.textContent,
            replyTo: { email: teamEmail, name: companyName },
          },
          apiKey,
        ),
        sendBrevoEmail(
          {
            sender,
            to: [{ email: teamEmail, name: companyName }],
            subject: agencyMail.subject,
            htmlContent: agencyMail.htmlContent,
            textContent: agencyMail.textContent,
            replyTo: { email: data.email, name: data.full_name },
          },
          apiKey,
        ),
      ]);

      const [customerResult, agencyResult] = emailResults;
      if (customerResult.status === "rejected") {
        console.error("[Booking] Brevo customer email send failed", customerResult.reason);
      } else {
        console.info("[Booking] Brevo customer response", customerResult.value);
      }
      if (agencyResult.status === "rejected") {
        console.error("[Booking] Brevo agency email send failed", agencyResult.reason);
      } else {
        console.info("[Booking] Brevo agency response", agencyResult.value);
      }

      const anyEmailSent = emailResults.some((result) => result.status === "fulfilled");
      if (!anyEmailSent) {
        // DB row is saved, but no email went out. Tell the user honestly so they
        // know to expect a follow-up, while we surface the failure in logs.
        return {
          ok: true,
          message: "Thank you! Your enquiry was received. We'll reach out within 24 hours.",
        };
      }

      return {
        ok: true,
        message: "Thank you! We sent a confirmation email and will contact you soon.",
      };
    } catch (error) {
      console.error("[Booking] Unhandled submitBooking error", error);
      return {
        ok: false,
        message: "Unexpected booking error occurred. Please retry in a few seconds.",
      };
    }
  });
