/**
 * GHL (GoHighLevel) API Client
 * Provides typed wrappers around the GHL REST API.
 */

const GHL_BASE = "https://services.leadconnectorhq.com";
const API_VERSION = "2021-07-28";

function getHeaders(): HeadersInit {
  const key = process.env.GHL_API_KEY;
  if (!key) throw new Error("GHL_API_KEY environment variable is not set");
  return {
    Authorization: `Bearer ${key}`,
    Version: API_VERSION,
    "Content-Type": "application/json",
  };
}

/** Small delay helper to avoid hammering the API on rapid sequential calls */
async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ghlFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${GHL_BASE}${path}`;
  const headers = getHeaders();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `GHL API error ${response.status} ${response.statusText} for ${path}: ${body}`
    );
  }

  return response.json() as Promise<T>;
}

// ─── Contact types ────────────────────────────────────────────────────────────

export interface GHLCustomField {
  id: string;
  value: string | string[] | number;
}

export interface GHLContactData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  customFields?: GHLCustomField[];
  source?: string;
  locationId?: string;
}

export interface GHLContact extends GHLContactData {
  id: string;
  dateAdded?: string;
  dateUpdated?: string;
}

export interface GHLContactResponse {
  contact: GHLContact;
}

export interface GHLContactsResponse {
  contacts: GHLContact[];
  total?: number;
}

// ─── Message types ────────────────────────────────────────────────────────────

export type GHLMessageType = "SMS" | "Email";

export interface GHLSendMessagePayload {
  type: GHLMessageType;
  contactId: string;
  message?: string;
  subject?: string;
  html?: string;
}

export interface GHLMessageResponse {
  messageId?: string;
  conversationId?: string;
  id?: string;
}

// ─── Client methods ───────────────────────────────────────────────────────────

/** Retrieve a contact by ID */
export async function getContact(contactId: string): Promise<GHLContact> {
  const data = await ghlFetch<GHLContactResponse>(`/contacts/${contactId}`);
  return data.contact;
}

/** Update a contact (supports tags, customFields, and any other writable fields) */
export async function updateContact(
  contactId: string,
  data: Partial<GHLContactData>
): Promise<GHLContact> {
  const result = await ghlFetch<GHLContactResponse>(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return result.contact;
}

/** Create a new contact */
export async function createContact(
  data: GHLContactData
): Promise<GHLContact> {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId)
    throw new Error("GHL_LOCATION_ID environment variable is not set");

  const payload = { ...data, locationId };
  const result = await ghlFetch<GHLContactResponse>(`/contacts/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result.contact;
}

/** Send an SMS to a contact */
export async function sendSMS(
  contactId: string,
  message: string
): Promise<GHLMessageResponse> {
  const locationId = process.env.GHL_LOCATION_ID;
  const payload: GHLSendMessagePayload & { locationId?: string } = {
    type: "SMS",
    contactId,
    message,
    locationId,
  };
  return ghlFetch<GHLMessageResponse>(`/conversations/messages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Send an Email to a contact */
export async function sendEmail(
  contactId: string,
  subject: string,
  html: string
): Promise<GHLMessageResponse> {
  const locationId = process.env.GHL_LOCATION_ID;
  const payload: GHLSendMessagePayload & { locationId?: string } = {
    type: "Email",
    contactId,
    subject,
    html,
    locationId,
  };
  return ghlFetch<GHLMessageResponse>(`/conversations/messages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Add one or more tags to a contact */
export async function addContactTag(
  contactId: string,
  tags: string[]
): Promise<GHLContact> {
  // Fetch existing tags first so we don't overwrite them
  const contact = await getContact(contactId);
  await delay(200);
  const existingTags: string[] = contact.tags ?? [];
  const merged = Array.from(new Set([...existingTags, ...tags]));
  return updateContact(contactId, { tags: merged });
}

/** Remove one or more tags from a contact */
export async function removeContactTag(
  contactId: string,
  tags: string[]
): Promise<GHLContact> {
  const contact = await getContact(contactId);
  await delay(200);
  const existingTags: string[] = contact.tags ?? [];
  const filtered = existingTags.filter((t) => !tags.includes(t));
  return updateContact(contactId, { tags: filtered });
}

/** Add a contact to a GHL workflow (for future use) */
export async function addContactToWorkflow(
  contactId: string,
  workflowId: string
): Promise<unknown> {
  return ghlFetch<unknown>(`/contacts/${contactId}/workflow/${workflowId}`, {
    method: "POST",
  });
}

/** Search contacts by a query string (name, email, phone, etc.) */
export async function searchContacts(query: string): Promise<GHLContact[]> {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId)
    throw new Error("GHL_LOCATION_ID environment variable is not set");

  const params = new URLSearchParams({ locationId, query });
  const data = await ghlFetch<GHLContactsResponse>(
    `/contacts/?${params.toString()}`
  );
  return data.contacts ?? [];
}

/** Look up a contact by phone number (searches by phone) */
export async function findContactByPhone(
  phone: string
): Promise<GHLContact | null> {
  try {
    const results = await searchContacts(phone);
    // Filter for an exact phone match since the search can be fuzzy
    const match = results.find((c) => {
      const normalized = (c.phone ?? "").replace(/\D/g, "");
      const target = phone.replace(/\D/g, "");
      return normalized === target || normalized.endsWith(target.slice(-10));
    });
    return match ?? null;
  } catch (err) {
    console.error("[GHL] findContactByPhone error:", err);
    return null;
  }
}
