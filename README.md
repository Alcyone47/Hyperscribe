# HyperScribe

HyperScribe is a mobile app that turns handwritten notes into searchable digital text. Snap a photo of a page (or pick one from your gallery), and HyperScribe reads the handwriting line by line, suggests a title and summary, and saves the note to your account. Every AI feature runs on free, open-source models.

## Features

- **Capture with the camera or upload from your device.** Photos are resized and compressed before upload.
- **Full-page handwriting recognition:** [docTR](https://github.com/mindee/doctr) finds each line of text and [TrOCR](https://huggingface.co/microsoft/trocr-base-handwritten) reads it.
- **AI cleanup:** [Qwen2.5-0.5B-Instruct](https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct) fixes recognition mistakes (with undo).
- **Auto titles and summaries:** suggested automatically for every new scan, or on demand.
- **Semantic search:** [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) embeddings stored with pgvector find notes by meaning, alongside Postgres full-text keyword search.
- **Accounts** with email and password (Supabase Auth). Notes are protected by row-level security, so each user sees only their own.

## Tech stack

| Layer       | Tools                                                                   |
| ----------- | ----------------------------------------------------------------------- |
| Mobile app  | [Expo](https://expo.dev) SDK 51, React Native 0.74, Expo Router         |
| Styling     | NativeWind (Tailwind CSS for React Native), Poppins font                |
| Backend     | [Supabase](https://supabase.com) (Auth + Postgres)                      |
| AI service  | Python, FastAPI, PyTorch, Transformers, docTR, sentence-transformers, in `ocr-backend/` |

## Project structure

```
app/
  (auth)/          Sign-in and sign-up screens
  (tabs)/          Home, Camera, Device (gallery upload), and Profile tabs
  notes/[id].jsx   Note detail and editor
  search/[query].jsx  Search results
  api/             Supabase client, notes data access, AI backend clients
components/        Shared UI components
constants/         Icons, images, colors
hooks/             Shared hooks (e.g. OCR capture flow)
ocr-backend/       FastAPI AI service: OCR, cleanup, summaries, embeddings (see its README)
supabase/
  migrations/      Database schema (notes, profiles, RLS, full-text and vector search)
```

## Getting started

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) project
- Python 3.10+ for the AI service (tested with 3.13)
- The Expo Go app, or an Android emulator / iOS simulator

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a Supabase project.
2. Run the files in `supabase/migrations/` in order (`0001_notes.sql`, then `0002_ai_features.sql`) in the SQL editor, or apply them with the Supabase CLI (`supabase db push`).
3. If email confirmation is on (the Supabase default), new users must confirm their email before signing in.

### 3. Start the AI backend

```bash
cd ocr-backend
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS / Linux
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

The models (about 1.5 GB in total) download on first use, so the first requests are slow. For deployment to Hugging Face Spaces, see [`ocr-backend/README.md`](ocr-backend/README.md).

### 4. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```env
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
OCR_BACKEND_URL=http://<your-computer-lan-ip>:8000
```

- `OCR_BACKEND_URL` is the AI service's **base URL**. The app adds `/ocr`, `/embed`, and the other paths itself.
- On a physical device, use your computer's LAN IP instead of `localhost`.
- Variables are loaded at build time through `react-native-dotenv`. After changing `.env`, restart with a cleared cache: `npx expo start -c`.

### 5. Run the app

```bash
npm start          # Expo dev server (scan the QR code with Expo Go)
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser
```

## Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm start`     | Start the Expo dev server     |
| `npm run lint`  | Lint the project              |
| `npm test`      | Run Jest tests in watch mode  |

## How it works

1. The user captures or selects a photo on the **Camera** or **Device** tab.
2. The app resizes the image to 1600px wide, converts it to JPEG, and posts it to `/ocr`.
3. docTR detects the words on the page and groups them into lines. TrOCR reads each line, and the service returns `{ text, confidence }`.
4. The note editor opens with the text, and `/summarize` fills in a suggested title and summary in the background. **✨ Fix errors** sends the text to `/correct` for LLM cleanup.
5. On save, `/embed` turns the note into a 384-dimensional vector, stored in `notes.embedding` (pgvector).
6. Search runs the Postgres full-text query (`content_tsv`) and the `match_notes` vector-similarity function together, listing keyword matches first.

If the AI service is unreachable, notes still save and keyword search still works.

## Known limitations

- **Google sign-in isn't implemented yet.** The buttons are there, but the OAuth redirect flow isn't wired up.
- **Recognition speed:** on CPU, a full page takes roughly 10–30 seconds. The free Hugging Face Spaces tier adds a cold start after it has been idle.
- **Small language model:** Qwen2.5-0.5B keeps the service light enough for free hosting, but *Fix errors* can merge lines into one paragraph, and summaries occasionally add small details. Set `LLM_MODEL=Qwen/Qwen2.5-1.5B-Instruct` on the backend for better quality.
- **Long notes:** semantic search embeds only about the first 256 tokens of each note.
