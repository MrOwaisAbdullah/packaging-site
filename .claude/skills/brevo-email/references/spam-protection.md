# Contact Form Spam Protection Reference

Complete implementation for protecting Brevo contact forms from spam.

> **Session learnings (Mar 2026):** A real bot campaign used names like `ssFeVZomc`, `yqPJkl0GU` with subject `Web Development` and bypassed basic validation. Added bot-name entropy detection and keyword-only subject scanning. Lowered spam threshold to `>=2`.

## Quick Start Checklist

- [ ] Honeypot field (hidden input)
- [ ] Rate limiting (5/hour per IP)
- [ ] Timing validation (min 2 seconds)
- [ ] Disposable email blocking (40+ domains)
- [ ] Bot-name entropy detection
- [ ] Subject keyword scan (not generic blocklist)
- [ ] Spam pattern detection (threshold >= 2)
- [ ] Minimum 3-word message check
- [ ] Input sanitization
- [ ] Silent bot rejection

---

## File: `lib/validation.ts`

Production-ready validation module with all 9 layers:

```typescript
/**
 * Server-side validation for contact form
 * Updated: expanded disposable list, bot-name entropy, threshold=2
 */

const DISPOSABLE_EMAIL_DOMAINS = [
  "tempmail.org", "tempmail.com", "tempmail.net", "tempmailaddress.com",
  "temp-mail.org", "temp-mail.io",
  "guerrillamail.com", "guerrillamail.org", "guerrillamail.net",
  "mailinator.com", "10minutemail.com", "throwaway.email",
  "getairmail.com", "yopmail.com", "maildrop.cc",
  "sharklasers.com", "fakeinbox.com", "incognitomail.org",
  "mailnesia.com", "trashmail.com", "throwawaymail.com",
  "randomail.net", "maildisposable.com", "disposablemail.com",
  "dispostable.com", "trashmail.me", "spamgourmet.com",
  "discard.email", "filzmail.com", "tempr.email",
  "getnada.com", "mohmal.com", "mailsac.com",
  "mailpoof.com", "trashmail.at", "trashmail.io",
  // Add more as discovered in production
];

const SPAM_PATTERNS = [
  /https?:\/\/[^\s]+/gi,                      // URLs in message
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, // Embedded emails
  /^[A-Z\s!?]{20,}$/,                          // All caps
  // Money / prize / gambling
  /\b(win|winner|won|prize|lottery|jackpot|earn \$|make \$|\$\d+|usd|free money|easy money|extra income|cash|payout|reward|bonus|gift card|coupon)\b/gi,
  // Financial spam
  /\b(viagra|cialis|bitcoin|crypto|forex|trading|investment|loan|debt|credit card|casino|poker|bet|gambling|nft|airdrop)\b/gi,
  // Urgency manipulation
  /\b(urgent|act now|limited time|click here|buy now|order now|sign up now|don'?t miss|expires|last chance|hurry|immediately)\b/gi,
  /(.)\\1{10,}/,   // Repeated chars
  /\+\d{10,}/g,   // Phone spam
];

export function validateHoneypot(value: string): { valid: boolean; isBot: boolean } {
  return value?.trim() ? { valid: false, isBot: true } : { valid: true, isBot: false };
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const clean = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return { valid: false, error: "Invalid email format" };
  if (clean.length > 255) return { valid: false, error: "Email address too long" };
  const domain = clean.split("@")[1];
  if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) return { valid: false, error: "Disposable email addresses are not allowed" };
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; error?: string } {
  const clean = name.trim();
  if (clean.length < 2) return { valid: false, error: "Name is too short" };
  if (clean.length > 100) return { valid: false, error: "Name is too long" };

  // Only letters, spaces, hyphens, apostrophes, dots
  if (!/^[a-zA-Z\u00C0-\u017F\s\-'\.]+$/u.test(clean)) {
    return { valid: false, error: "Name contains invalid characters" };
  }

  // Bot-name entropy detection
  // 1. Real names have vowels — random strings like 'sFqJMBbsd' typically don't
  const vowels = (clean.match(/[aeiouAEIOU]/g) || []).length;
  const vowelRatio = vowels / clean.replace(/\s/g, "").length;
  if (vowelRatio < 0.15 && clean.length > 4) {
    return { valid: false, error: "Please enter your real name" };
  }

  // 2. Bot strings like 'ssFeVZomc' are 8-12 chars with no space
  if (!/\s/.test(clean) && clean.length > 9) {
    return { valid: false, error: "Please enter your full name" };
  }

  // 3. Random camelCase: 'sFqJMBbsd' has too many mid-word capitals
  const midUpperRatio = (clean.slice(1).match(/[A-Z]/g) || []).length / clean.length;
  if (midUpperRatio > 0.35 && clean.length > 5) {
    return { valid: false, error: "Please enter your real name" };
  }

  return { valid: true };
}

export function validateSubject(subject: string): { valid: boolean; error?: string } {
  const clean = subject.trim();
  if (clean.length < 3) return { valid: false, error: "Subject is too short" };
  if (clean.length > 200) return { valid: false, error: "Subject is too long" };

  // Keyword scan only — do NOT use generic subject blocklist ('hello', 'help' are legit)
  const subjectSpam = [
    /\b(win|winner|won|prize|lottery|jackpot|\$\d+|free money|easy money|cash|reward|gift card)\b/gi,
    /\b(viagra|cialis|bitcoin|crypto|casino|poker|forex|investment|loan|credit card|nft|airdrop)\b/gi,
    /\b(urgent|act now|limited time|click here|buy now|sign up now|last chance|hurry)\b/gi,
  ];
  for (const p of subjectSpam) {
    if (p.test(clean)) return { valid: false, error: "Subject contains prohibited content" };
  }
  return { valid: true };
}

export function validateMessage(message: string): { valid: boolean; error?: string; spamScore?: number } {
  const clean = message.trim();
  if (clean.length < 10) return { valid: false, error: "Message is too short" };
  if (clean.length > 5000) return { valid: false, error: "Message is too long" };

  // Minimum 3 meaningful words — catches micro-spam like 'get $ now'
  const wordCount = clean.split(/\s+/).filter(w => w.length > 1).length;
  if (wordCount < 3) return { valid: false, error: "Message is too short. Please describe how I can help you." };

  let spamScore = 0;
  for (const p of SPAM_PATTERNS) { if (p.test(clean)) spamScore += 1; }

  const links = (clean.match(/https?:\/\//gi) || []).length;
  if (links > 2) spamScore += 2;

  const emails = (clean.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || []).length;
  if (emails > 1) spamScore += 1;

  const upperRatio = (clean.match(/[A-Z]/g) || []).length / clean.length;
  if (upperRatio > 0.7 && clean.length > 50) spamScore += 1;

  // Threshold: >=2 (was 3 — bots regularly hit exactly 2 signals)
  if (spamScore >= 2) return { valid: false, error: "Message appears to be spam", spamScore };
  return { valid: true, spamScore };
}

export function validateSubmissionTiming(timestamp?: number): { valid: boolean; error?: string } {
  if (!timestamp) return { valid: true };
  const diff = Date.now() - timestamp;
  if (diff < 2000) return { valid: false, error: "Form submitted too quickly" };
  if (diff > 24 * 60 * 60 * 1000) return { valid: false, error: "Form session expired" };
  return { valid: true };
}

export function validateContactForm(data: {
  name: string; email: string; subject: string; message: string;
  honeypot?: string; timestamp?: number;
}): { valid: boolean; errors: string[]; sanitizedData: { name: string; email: string; subject: string; message: string } } {
  const errors: string[] = [];

  if (data.honeypot !== undefined && !validateHoneypot(data.honeypot).valid) {
    return { valid: false, errors: ["Invalid submission"], sanitizedData: { name: "", email: "", subject: "", message: "" } };
  }

  const nameCheck = validateName(data.name);
  if (!nameCheck.valid) errors.push(nameCheck.error!);

  const emailCheck = validateEmail(data.email);
  if (!emailCheck.valid) errors.push(emailCheck.error!);

  const subjectCheck = validateSubject(data.subject);
  if (!subjectCheck.valid) errors.push(subjectCheck.error!);

  const messageCheck = validateMessage(data.message);
  if (!messageCheck.valid) errors.push(messageCheck.error!);

  if (data.timestamp) {
    const timingCheck = validateSubmissionTiming(data.timestamp);
    if (!timingCheck.valid) errors.push(timingCheck.error!);
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitizedData: {
      name: data.name.trim().slice(0, 100),
      email: data.email.trim().toLowerCase().slice(0, 255),
      subject: data.subject.trim().slice(0, 200),
      message: data.message.trim().slice(0, 5000),
    },
  };
}
```

---

## File: `lib/rate-limit.ts`

```typescript
interface RateLimitEntry { count: number; resetTime: number; }
const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_CONFIG = { maxRequests: 5, windowMs: 60 * 60 * 1000, prefix: "rate_limit:" };

export function checkRateLimit(id: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = `${RATE_LIMIT_CONFIG.prefix}${id}`;
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_CONFIG.windowMs });
    return { allowed: true, remaining: RATE_LIMIT_CONFIG.maxRequests - 1, resetTime: now + RATE_LIMIT_CONFIG.windowMs };
  }
  if (entry.count >= RATE_LIMIT_CONFIG.maxRequests) return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count, resetTime: entry.resetTime };
}

export function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [k, e] of rateLimitStore.entries()) { if (now > e.resetTime) rateLimitStore.delete(k); }
}

export function getClientIP(request: Request): string {
  const h = request.headers;
  return h.get("x-forwarded-for")?.split(",")[0].trim()
    || h.get("x-real-ip") || h.get("cf-connecting-ip") || "unknown";
}
```

---

## File: `app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { handleContactForm } from "@/lib/brevo";
import { checkRateLimit, getClientIP, cleanupExpiredEntries } from "@/lib/rate-limit";
import { validateContactForm } from "@/lib/validation";

if (Math.random() < 0.1) cleanupExpiredEntries(); // 10% chance cleanup per request

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, website, timestamp } = await request.json();
    const clientIP = getClientIP(request);

    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later.", success: false,
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000) },
        { status: 429, headers: { "Retry-After": Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString() } }
      );
    }

    const validation = validateContactForm({ name, email, subject, message, honeypot: website, timestamp });

    if (!validation.valid) {
      // Silent rejection for honeypot failures — never alert bots
      if (validation.errors.some(e => e === "Invalid submission")) {
        console.warn(`Bot blocked from IP: ${clientIP}`);
        return NextResponse.json({ success: true, message: "Message sent successfully!" });
      }
      return NextResponse.json({ error: validation.errors.join(". "), success: false }, { status: 400 });
    }

    const result = await handleContactForm(validation.sanitizedData);
    return NextResponse.json(
      { success: true, message: "Email sent successfully!", messageId: result.adminMessageId },
      { headers: { "X-RateLimit-Remaining": rateLimitResult.remaining.toString() } }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again later.", success: false }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" },
  });
}
```

---

## Honeypot Field (React)

```tsx
{/* Hidden from humans, traps bots that auto-fill all fields */}
<input
  type="text"
  name="website"
  value={formData.website}
  onChange={e => setFormData({ ...formData, website: e.target.value })}
  className="opacity-0 absolute top-0 left-0 h-0 w-0 z-[-1]"
  tabIndex={-1}
  autoComplete="one-time-code"
  aria-hidden="true"
/>
```

---

## Configuration Tuning

| Setting | Location | Default | More Strict | More Lenient |
|---------|----------|---------|-------------|--------------|
| Spam threshold | `validateMessage` | `>= 2` | `>= 1` | `>= 3` |
| Rate limit | `RATE_LIMIT_CONFIG.maxRequests` | `5` | `3` | `10` |
| Time window | `RATE_LIMIT_CONFIG.windowMs` | 1 hour | 2 hours | 30 min |
| Min submission time | `validateSubmissionTiming` | `2000ms` | `3000ms` | `1000ms` |
| Min name length | `validateName` | `2` | `3` | `2` |
| Min word count | `validateMessage` | `3` | `5` | `2` |

---

## Testing

```bash
# Test honeypot (returns success but no email sent)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello there!","website":"bot"}'

# Test disposable email (should be rejected)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@tempmail.org","subject":"Test","message":"Hello there!"}'

# Test bot name (should be rejected)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"sFqJMBbsd","email":"test@gmail.com","subject":"Test","message":"Hello there!"}'

# Test spam message (should be rejected with score)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@gmail.com","subject":"Test","message":"WIN $500 free money at https://spam.com"}'
```

---

## Production Considerations

1. **Persistent Storage**: Replace in-memory Map with Redis/Vercel KV for multi-instance deployments
2. **IP Spoofing**: Determined spammers can rotate IPs — add email-level rate limiting as backup
3. **Keep domain list updated**: Add newly discovered disposable domains as they appear
4. **Monitor logs**: Alert on high rejection rates — may indicate an active campaign
5. **Partial `Promise.all` failure**: If admin email sends but auto-reply fails (or vice versa), log the error but still return success to the user
