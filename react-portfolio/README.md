# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contact Form Email (Node + SMTP)

This project now uses a Node mail server instead of EmailJS.

1. Copy `.env.example` to `.env`.
2. Set your SMTP credentials in `.env` (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc.).
3. Set `MAIL_TO` to the inbox that should receive contact form messages.
4. Run `npm run dev` to start both Vite and the Node email server.

The sender's entered email is used as `replyTo`, so you can directly reply to your client from the received email.

Rate limiting is disabled by default in local development (`RATE_LIMIT_ENABLED=false`) to avoid test-time `429` errors. Enable it in production and tune `RATE_LIMIT_MS` as needed.

### Gmail SMTP Quick Setup

1. Use a Gmail account for `SMTP_USER` and `MAIL_FROM`.
2. Enable 2-Step Verification on that Google account.
3. Generate a Google App Password and use that value as `SMTP_PASS`.
4. Keep `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, and `SMTP_SECURE=false`.
5. Restart `npm run dev` after editing `.env`.
6. Run `npm run check:email` to verify SMTP credentials before testing the contact form.

If sending fails, check the backend response message in the browser devtools Network tab. The API now returns specific setup/auth hints.
