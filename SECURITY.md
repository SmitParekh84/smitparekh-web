# Security Policy

The security of this project and its users is taken seriously. This document
describes which versions of the project receive security updates and how to
responsibly report a vulnerability.

## Supported Versions

This repository hosts the source for [smitparekh.co.in](https://www.smitparekh.co.in)
and is continuously deployed from the `main` branch. Only the latest released
state of `main` is supported with security updates.

| Version              | Supported          |
| -------------------- | ------------------ |
| `main` (latest)      | :white_check_mark: |
| Older commits / tags | :x:                |

If you are running a fork or a self-hosted copy, please rebase onto the
latest `main` before reporting an issue.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues,
discussions, or pull requests.**

Instead, report them privately using one of the following channels:

1. **GitHub Private Vulnerability Reporting** (preferred) — open a report at
   [github.com/SmitParekh84/smitparekh-web/security/advisories/new](https://github.com/SmitParekh84/smitparekh-web/security/advisories/new).
2. **Email** — send details to **smitparekh03@gmail.com** with the subject line
   `[SECURITY] smitparekh-web`.

Please include as much of the following information as possible to help us
triage the report quickly:

- A description of the vulnerability and its potential impact.
- Steps to reproduce, including affected URLs, endpoints, or components.
- Proof-of-concept code, screenshots, or logs (if available).
- The commit SHA, branch, or deployed environment where the issue was observed.
- Your name/handle and how you would like to be credited (optional).

### What to expect

- **Acknowledgement:** within **3 business days** of your report.
- **Initial assessment:** within **7 business days**, including whether the
  report is accepted, needs more information, or is declined (with reasoning).
- **Status updates:** at least every **14 days** until the issue is resolved
  or closed.
- **Resolution:** for accepted reports, a fix will be prepared and deployed
  to production. Once a fix is live, we will coordinate public disclosure with
  you and credit you in the release notes or security advisory if you wish.

If a report is declined (e.g., out of scope, by-design behaviour, or a
duplicate), you will receive an explanation and, where possible, guidance on
next steps.

## Scope

In scope:

- This repository (the Next.js frontend) and the production site at
  `https://www.smitparekh.co.in` and its subdomains.
- Vulnerabilities such as XSS, CSRF, SSRF, authentication or authorization
  bypass, injection flaws, sensitive data exposure, dependency vulnerabilities
  with a demonstrable exploit path, and misconfigurations with security impact.

Out of scope:

- Reports generated solely by automated scanners without a working
  proof-of-concept.
- Missing best-practice security headers without a demonstrated exploit.
- Denial-of-service attacks, volumetric/brute-force attacks, and rate-limit
  testing against the production site.
- Social engineering, phishing, or physical attacks against the maintainer
  or third parties.
- Vulnerabilities in third-party services or dependencies that are not
  configurable from this repository (please report those upstream).
- Issues affecting outdated browsers or platforms that are no longer
  supported by their vendors.

## Responsible Disclosure Guidelines

When researching potential vulnerabilities, please:

- Make a good-faith effort to avoid privacy violations, data destruction,
  service degradation, and disruption to other users.
- Only interact with accounts you own or have explicit permission to test.
- Do not access, modify, or exfiltrate data that does not belong to you.
- Give us a reasonable amount of time to investigate and remediate before
  publicly disclosing the issue.

Researchers who follow these guidelines will not be pursued or asked to pay
for actions taken in good faith while reporting in accordance with this
policy.

## Security Updates

Security fixes are released as part of normal commits to `main` and deployed
automatically. Significant issues will additionally be announced through a
[GitHub Security Advisory](https://github.com/SmitParekh84/smitparekh-web/security/advisories).
