---
name: brevo-email
description: |
  Set up and integrate Brevo email service for transactional emails, marketing campaigns,
  and contact forms. This skill should be used when users ask to implement email functionality,
  configure Brevo, create email templates, set up webhooks, or protect contact forms from spam.
---

# Brevo Email Setup

## Version Compatibility

| Package | Tested Version | Notes |
|---------|----------------|-------|
| `@getbrevo/brevo` | 2.5.0 | Breaking changes before v2.0 |
| Next.js | 14.2.0 | App Router patterns |
| TypeScript | 5.x | — |

## What This Skill Does
- Set up Brevo API with domain authentication (SPF/DKIM/DMARC)
- Implement transactional emails (contact forms, auto-replies, templates)
- Build multi-layer spam protection (honeypot, rate limiting, bot detection)
- Generate light-themed HTML email templates

## What This Skill Does NOT Do
- Create Brevo account (user signs up at app.brevo.com)
- Design templates visually (use Brevo dashboard)
- Manage billing/credits

---

## Before Implementation

| Source | Gather |
|--------|--------|
| **Codebase** | Existing email implementations, env patterns, API route structure |
| **Conversation** | Email type, recipient volume, template needs, spam severity |
| **References** | See `references/` for full code implementations |
| **User** | Domain, sender email, admin email, site URLs |

---

## Required Clarifications

1. **Email types**: Transactional (contact form, order), marketing (newsletter), or both?
2. **Tech stack**: Next.js App Router, Express, serverless, or other?
3. **Existing setup**: Brevo account + API key + verified domain already set up?
4. **Volume**: Under 300/day (free tier) or higher?

## Optional Clarifications

5. **Webhook tracking**: Need delivery/open/bounce events?
6. **Spam tolerance**: Aggressive (threshold=2) or lenient (threshold=3)?

---

## External Setup (Brevo Dashboard)

### 1. Account & API Key
1. Sign up at https://app.brevo.com
2. **Settings > SMTP & API > API Keys** → Generate key
3. Add to `.env.local`: `BREVO_API_KEY=xkeysib-xxx`

### 2. Sender Domain Authentication (Required since Feb 2024)
1. **Settings > Senders > Senders & Domains** → Add domain
2. Add DNS records from Brevo dashboard:
```
TXT @ v=spf1 include:spf.brevo.com ~all
TXT brevo._domainkey  [DKIM 1 from Brevo]
TXT brevo2._domainkey [DKIM 2 from Brevo]
```
3. Verify in dashboard (15–60 min propagation)

### 3. Environment Variables
```bash
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxx
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_SENDER_NAME=Your Name
BREVO_ADMIN_EMAIL=admin@yourdomain.com
```

---

## Implementation Workflow

### 1. Install SDK
```bash
npm install @getbrevo/brevo
```

### 2. Brevo Client Module (`lib/brevo.ts`)
```typescript
import { TransactionalEmailsApi, SendSmtpEmail, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

const apiInstance = new TransactionalEmailsApi();
const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) throw new Error('BREVO_API_KEY not set');
apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);
export { apiInstance, SendSmtpEmail };
```

### 3. Send Patterns

**Direct HTML (Contact Form):**
```typescript
const email = new SendSmtpEmail();
email.sender = { email: process.env.BREVO_SENDER_EMAIL!, name: process.env.BREVO_SENDER_NAME! };
email.to = [{ email: to }];
email.subject = subject;
email.htmlContent = html; // See assets/templates/ for ready-made templates
await apiInstance.sendTransacEmail(email);
```

**Template-Based:**
```typescript
email.to = [{ email: to }];
email.templateId = 1; // Template ID from Brevo dashboard
email.params = { firstname: 'Alice', order_id: '123' };
await apiInstance.sendTransacEmail(email);
```

### 4. Contact Form Handler
```typescript
export async function handleContactForm(data: {
  name: string; email: string; subject: string; message: string
}) {
  const { senderEmail, senderName, adminEmail } = getEnvVars();

  const adminMsg = new SendSmtpEmail();
  adminMsg.sender = { email: senderEmail, name: senderName };
  adminMsg.to = [{ email: adminEmail }];
  adminMsg.subject = `New Message: ${data.subject}`;
  adminMsg.htmlContent = adminTemplate(data); // Use assets/templates/admin-notification.html

  const reply = new SendSmtpEmail();
  reply.sender = { email: senderEmail, name: senderName };
  reply.to = [{ email: data.email, name: data.name }];
  reply.subject = 'Message Received!';
  reply.htmlContent = autoReplyTemplate(data); // Use assets/templates/auto-reply.html

  await Promise.all([
    apiInstance.sendTransacEmail(adminMsg),
    apiInstance.sendTransacEmail(reply),
  ]);
}
```

> Full API route, validation module, and rate limiter: see [`references/spam-protection.md`](references/spam-protection.md)

---

## Spam Protection (9-Layer)

```
Layer 1: Honeypot field         → Traps bots that auto-fill
Layer 2: Rate limiting          → 5 submissions/hour per IP
Layer 3: Timing check           → Rejects < 2s submissions
Layer 4: Disposable email       → 40+ blocked domains
Layer 5: Bot-name detection     → Vowel ratio, no-space, camelCase entropy
Layer 6: Subject keyword scan   → Spam keywords only (not generic blocklist)
Layer 7: Spam score engine      → Threshold >= 2 (not 3)
Layer 8: Min word count         → 3+ meaningful words required
Layer 9: Input sanitization     → Length limits, character validation
```

> **Real-world note:** A common bot campaign submits with names like `ssFeVZomc`, `yqPJkl0GU` (no vowels, no space, random camelCase) and subject `Web Development`. Layers 5+6 were added specifically for this pattern.

> Full implementation: [`references/spam-protection.md`](references/spam-protection.md)

---

## Email Templates

All templates in `assets/templates/` use the light theme system. Each has a distinct visual identity:

| Template | File | Visual Approach | Key Placeholders |
|----------|------|-----------------|------------------|
| Admin Notification | `admin-notification.html` | Dark header + sender info table | `${safeName}`, `${safeEmail}`, `${safeSubject}`, `${safeMessage}` |
| Auto-Reply | `auto-reply.html` | ✅ checkmark + subject echo | `${safeName}`, `${safeSubject}`, `{{PROJECTS_URL}}`, `{{SERVICES_URL}}` |
| Welcome | `welcome.html` | Gradient accent strip + 3-step cards | `{{FIRSTNAME}}`, `{{DASHBOARD_URL}}`, `{{DOCS_URL}}` |
| Password Reset | `password-reset.html` | 🔒 amber lock + security notice | `{{FIRSTNAME}}`, `{{RESET_LINK}}`, `{{EXPIRY_HOURS}}` |
| Order Confirmation | `order-confirmation.html` | ✓ green header + items/totals table | `{{ORDER_ID}}`, `{{ITEM_NAME}}`, `{{ORDER_TOTAL}}`, `{{TRACKING_URL}}` |

**Light Theme Design Rules:**
- Light body `#f0f2f5` + white card — works in all email clients
- Dark header `#0d1117` — brand presence without dark-mode issues
- Inline styles only — clients strip `<style>` blocks
- `<table>` for data rows — Outlook doesn't support flexbox
- HTML entities for `→` `'` `"` `·` — raw Unicode may render as `?`

**Color Palette:**
| Role | Value |
|------|-------|
| Page bg | `#f0f2f5` |
| Card | `#ffffff` |
| Border | `#e1e4e8` |
| Footer bg | `#f6f8fa` |
| Body text | `#24292f` |
| Header bg | `#0d1117` |
| Accent | `#64F4AB` |
| CTA button | `#FECD1A` |

---

## Domain Standards

### Must Follow
- Set up SPF, DKIM, DMARC (mandatory since Feb 2024)
- Never commit API keys; use environment variables
- Escape all user-provided content in HTML emails
- Wrap all email calls in try/catch with logging
- Implement honeypot + rate limiting + validation on every contact form
- Return silent success for honeypot failures (never alert bots)

### Must Avoid
- ❌ Gmail/Yahoo as sender domains
- ❌ Hardcoded API keys
- ❌ Unescaped user content in emails
- ❌ Contact forms without spam protection
- ❌ Alerting bots when they're blocked
- ❌ Blocking subjects by keyword list (blocks real users saying "hello")
- ❌ Spam threshold >= 3 (bots hit exactly 2 signals)
- ❌ Dark email templates (poor client compatibility)
- ❌ Raw Unicode in HTML template literals (`→` should be `&#8594;`)

---

## Anti-Patterns

| Anti-Pattern | Correct Approach |
|---|---|
| Small disposable domain blocklist | Use 40+ domains, add on discovery |
| Only email validation, not name | Add vowel-ratio + camelCase entropy checks |
| Generic subject blocklist | Keyword-scan only |
| Spam threshold >= 3 | Lower to >= 2 |
| No min word count | Require 3 words minimum |
| Dark email templates | Light body + dark header accent |
| Raw Unicode in template strings | Use HTML entities |
| No error handling on `Promise.all` | Log partial failures, return success to user |

---

## Output Checklist

### Core Integration
- [ ] `@getbrevo/brevo` installed (^2.5.0)
- [ ] `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `BREVO_ADMIN_EMAIL` set
- [ ] Sender domain authenticated (SPF + DKIM 1 + DKIM 2)
- [ ] Brevo client module created
- [ ] Email sending wrapped in try/catch

### Contact Form
- [ ] Honeypot field implemented
- [ ] Rate limiting (5/hour per IP) via `lib/rate-limit.ts`
- [ ] 40+ disposable domains blocked
- [ ] Bot-name entropy detection (vowel ratio, no-space, camelCase)
- [ ] Subject keyword-scan (not generic blocklist)
- [ ] Spam threshold at >= 2
- [ ] 3-word minimum message
- [ ] Silent bot rejection (honeypot → return success)
- [ ] Email templates from `assets/templates/` used with HTML entities

---

## Error Handling

```typescript
try {
  const result = await apiInstance.sendTransacEmail(emailParams);
  return { success: true, messageId: result.body.messageId };
} catch (error: any) {
  if (error.response?.body) {
    console.error('Brevo API error:', error.response.body.message);
    return { success: false, error: error.response.body.message };
  }
  throw error;
}
```

---

## Reference Files

| File | When to Read |
|------|--------------|
| [`references/spam-protection.md`](references/spam-protection.md) | Full validation, rate-limit, API route code |
| [`references/api-endpoints.md`](references/api-endpoints.md) | All Brevo API endpoints reference |
| [`references/best-practices.md`](references/best-practices.md) | Deliverability, security guidelines |
| [`references/webhooks.md`](references/webhooks.md) | Webhook event types and payloads |
| [`references/troubleshooting.md`](references/troubleshooting.md) | Common errors and solutions |
| [`assets/templates/admin-notification.html`](assets/templates/admin-notification.html) | Admin email template |
| [`assets/templates/auto-reply.html`](assets/templates/auto-reply.html) | User auto-reply template |

## Official Documentation

| Resource | URL |
|----------|-----|
| API Docs | https://developers.brevo.com |
| Domain Authentication | https://help.brevo.com/hc/en-us/articles/12163873383186 |
| Webhooks | https://developers.brevo.com/docs/how-to-use-webhooks |
| Node.js SDK | https://github.com/getbrevo/brevo-node |