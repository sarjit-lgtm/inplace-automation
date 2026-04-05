const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_BASE_URL = "https://services.leadconnectorhq.com";

async function ghlFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${GHL_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
      ...options.headers,
    },
  });
  return res.json();
}

export async function sendEmail(
  contactId: string,
  subject: string,
  htmlBody: string
) {
  return ghlFetch(`/conversations/messages`, {
    method: "POST",
    body: JSON.stringify({
      type: "Email",
      contactId,
      subject,
      html: htmlBody,
      locationId: GHL_LOCATION_ID,
    }),
  });
}

export async function updateContactCustomField(
  contactId: string,
  customFields: Record<string, string | number>
) {
  return ghlFetch(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify({ customFields }),
  });
}

export async function moveContactPipelineStage(
  contactId: string,
  pipelineId: string,
  stageId: string
) {
  return ghlFetch(`/opportunities/`, {
    method: "POST",
    body: JSON.stringify({
      contactId,
      pipelineId,
      pipelineStageId: stageId,
      locationId: GHL_LOCATION_ID,
    }),
  });
}
