# LiveDesk AI — Deployment Guide

## Option 1: Netlify (Recommended for Frontend)

### Prerequisites
1. A GitHub account with the repository pushed
2. A Netlify account (free tier)
3. A Google Gemini API key ([get one free](https://aistudio.google.com/app/apikey))

### Steps

1. **Push the repository to GitHub:**
   ```bash
   git push origin main
   ```

2. **Import to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect the build settings

3. **Configure build settings:**
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/out`
   - Or use the Netlify Next.js Runtime for SSR support

4. **Set environment variables:**
   - `NEXT_PUBLIC_AI_ENGINE_URL` — URL of your deployed AI engine
   - `NEXT_PUBLIC_APP_URL` — Your Netlify site URL

5. **Deploy:**
   - Click "Deploy site"
   - Your site will be live at `https://your-site.netlify.app`

### Netlify Drop (Quick Deploy)

Build the project locally:
```bash
cd frontend
npm install
npm run build
```

Drag and drop the `frontend/out` folder onto [Netlify Drop](https://app.netlify.com/drop).

---

## Option 2: Vercel

1. Push to GitHub
2. Import into Vercel
3. Set environment variables
4. Deploy

---

## AI Engine Deployment

The AI engine can be deployed to any Node.js hosting platform:

### Railway / Render / Fly.io

1. Set the root directory to `ai-engine/`
2. Build command: `npm install`
3. Start command: `npm start`
4. Set environment variable: `GEMINI_API_KEY`

### Environment Variables

| Variable                  | Required | Description                          |
|---------------------------|----------|--------------------------------------|
| `GEMINI_API_KEY`          | Yes      | Google Gemini AI API key             |
| `TWILIO_ACCOUNT_SID`      | No       | Twilio account SID (for WhatsApp)    |
| `TWILIO_AUTH_TOKEN`       | No       | Twilio auth token                    |
| `TWILIO_WHATSAPP_NUMBER`  | No       | Twilio WhatsApp number               |
| `NEXT_PUBLIC_AI_ENGINE_URL` | Yes   | URL of the deployed AI engine        |
| `NEXT_PUBLIC_APP_URL`     | Yes      | Public URL of the frontend           |

## Post-Deployment Checklist

- [ ] Verify the avatar loads correctly
- [ ] Test speech-to-text functionality
- [ ] Test the chat interface
- [ ] Submit a visitor form
- [ ] Verify WhatsApp confirmation (if configured)
- [ ] Test the human handoff button
- [ ] Check mobile responsiveness
