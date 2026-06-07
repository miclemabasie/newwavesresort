# Project Code Documentation

**Project Root:** `.`

**Total Files:** 46

---

## Directory: `root`

### File: `README.md`

**Size:** 1157 bytes  
```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```

---

### File: `eslint.config.js`

**Size:** 758 bytes  
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

---

### File: `index.html`

**Size:** 382 bytes  
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/assets/general/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>newwavesresort</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### File: `vite.config.js`

**Size:** 224 bytes  
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

## Directory: `src`

### File: `src/App.css`

**Size:** 2061 bytes  
```css
@import "tailwindcss";

@theme {
  /* --- Typography --- */
  --font-sans:
    "Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  /* --- Limbe Resort Color Palette --- */
  --color-ocean: #1e6baf;
  --color-sand: #f4f1ea;
  --color-volcanic: #2d2d2d;
  --color-lush: #f29f47;

  /* --- UI Polish --- */
  --shadow-resort: 0 4px 20px rgba(26, 95, 122, 0.08);
}

/* --- Base Styles --- */
@layer base {
  html,
  body {
    @apply bg-sand text-volcanic antialiased;
    scroll-behavior: smooth;
  }

  /* Typography Defaults */
  h1,
  h2,
  h3,
  h4 {
    @apply font-bold tracking-tight text-ocean;
    line-height: 1.2;
  }

  h1 {
    @apply text-4xl md:text-6xl mb-6;
  }
  h2 {
    @apply text-3xl md:text-4xl mb-4;
  }
  p {
    @apply mb-4 leading-relaxed opacity-90;
  }

  a {
    @apply transition-colors duration-300;
    color: var(--color-ocean);
    text-decoration: none;
  }

  a:hover {
    @apply text-lush;
  }

  button {
    @apply cursor-pointer transition-all duration-300 active:scale-95;
    font-family: inherit;
  }
}

/* --- Component Shortcuts --- */
@layer components {
  .btn-primary {
    @apply px-8 py-4 bg-ocean text-white rounded-lg font-semibold 
           hover:bg-volcanic hover:shadow-lg inline-block text-center;
  }

  .btn-pay {
    @apply px-8 py-4 bg-lush! text-volcanic rounded-lg font-semibold 
           hover:bg-volcanic! hover:text-white hover:shadow-lg inline-block text-center;
  }

  .btn-outline {
    @apply px-8 py-4 border-2 border-volcanic text-volcanic rounded-lg font-semibold 
           hover:bg-lush hover:text-white inline-block text-center;
  }

  .container {
    @apply max-w-7xl mx-auto px-6 md:px-12;
  }

  .nav-link {
    @apply text-sm font-medium text-volcanic/80 hover:text-lush transition-colors py-2;
  }

  .nav-link.active {
    @apply text-lush border-b-2 border-lush;
  }

  .card {
    @apply bg-white rounded-2xl p-6 shadow-[var(--shadow-resort)];
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
}
```

---

### File: `src/App.jsx`

**Size:** 1897 bytes  
```jsx
// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'; 
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/Contact';
import ComingSoon from './pages/ComingSoon';
import OurStory from './pages/OurStory';
import Services from './pages/Section';
import Dining from './pages/Dining';
import Accommodations from './pages/Accomodations';
import IntellectualTalks from './pages/services/IntellectualTalk';
import AtlanticGastronomy from './pages/services/AtlanticGastronomy';
import DiplomaticTransfers from './pages/services/DiplomaticTransfers';
import VolcanicExpeditions from './pages/services/VolcanicExpeditions';
import PremiumFleet from './pages/services/PremiumFleet';
import FisiyLibrary from './pages/services/FisiyLibrary';


function App() {
  return (
    <Routes>`1`
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="story" element={<OurStory />} />
      <Route path="rooms" element={<Accommodations />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="dialogues" element={<ComingSoon />} />
      <Route path="foundation" element={<ComingSoon />} />
      <Route path="experiences" element={<Services />} />
      <Route path="services/dining" element={<Dining />} />

      <Route path="/services/intellectual-talks" element={<IntellectualTalks />} />
      <Route path="/services/culinary" element={<AtlanticGastronomy />} />
      <Route path="/services/transfers" element={<DiplomaticTransfers />} />
      <Route path="/services/expeditions" element={<VolcanicExpeditions />} />
      <Route path="/services/fleet" element={<PremiumFleet />} />
      <Route path="/services/library" element={<FisiyLibrary />} />
    </Routes>
  );
}

export default App;

// 12electron@3#T
```

---

### File: `src/code_generator.py`

**Size:** 11730 bytes  
```python
"""
Project Code Extractor Script
Scans through all project files and creates a single markdown file with all code.
"""

import os
import sys
from pathlib import Path
import mimetypes
import datetime


class ProjectCodeExtractor:
    def __init__(self, root_dir=None, output_file="payment_code.md"):
        """
        Initialize the code extractor.

        Args:
            root_dir: Starting directory (defaults to current directory)
            output_file: Name of the output markdown file
        """
        self.root_dir = Path(root_dir) if root_dir else Path.cwd()
        self.output_file = Path(output_file)

        # Common directories to exclude
        self.exclude_dirs = {
            "venv",
            "env",
            ".venv",
            ".env",
            "test",
            "__pycache__",
            ".pytest_cache",
            ".mypy_cache",
            ".git",
            ".svn",
            ".hg",
            "node_modules",
            "dist",
            "build",
            ".idea",
            ".vscode",
            ".vs",
            "coverage",
            ".coverage",
            "logs",
            "log",
            "tmp",
            "temp",
            ".tox",
            ".hypothesis",
        }

        # Common files to exclude
        self.exclude_files = {
            self.output_file.name,  # Don't include the output file itself
            ".gitignore",
            ".env",
            ".env.local",
            "package-lock.json",
            "yarn.lock",
            "requirements.txt",
            "Pipfile.lock",
            "poetry.lock",
            "pyproject.toml",
            "*.pyc",
            "*.pyo",
            "*.pyd",
            "*.so",
            "*.dll",
            "*.dylib",
            "*.class",
            "*.jar",
            "*.war",
            "*.db",
            "*.sqlite",
            "*.sqlite3",
        }

        # File extensions to include (empty list means include all)
        # You can customize this if you want only specific file types
        self.include_extensions = {
            ".py",
            ".js",
            ".ts",
            ".jsx",
            ".tsx",
            ".html",
            ".htm",
            ".css",
            ".scss",
            ".less",
            ".java",
            ".cpp",
            ".c",
            ".h",
            ".hpp",
            ".go",
            ".rs",
            ".rb",
            ".php",
            ".sql",
            ".sh",
            ".bash",
            ".bat",
            ".yml",
            ".yaml",
            ".json",
            ".xml",
            ".md",
            ".txt",
            ".csv",
            ".vue",
            ".svelte",
        }

    def should_exclude(self, path):
        """Check if a path should be excluded."""
        # Check if any excluded directory is in the path
        for part in path.parts:
            if part in self.exclude_dirs:
                return True

        # Check if file is in exclude list
        if path.name in self.exclude_files:
            return True

        # Check file extensions
        if path.is_file():
            # Check if it's a binary file
            mime_type, _ = mimetypes.guess_type(str(path))
            if mime_type and not mime_type.startswith("text/"):
                return True

            # If we have specific extensions to include, check them
            if self.include_extensions:
                if path.suffix not in self.include_extensions:
                    return True

        return False

    def get_file_content(self, file_path):
        """Read file content with proper encoding handling."""
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()
        except UnicodeDecodeError:
            # Try with different encodings
            for encoding in ["latin-1", "iso-8859-1", "cp1252"]:
                try:
                    with open(file_path, "r", encoding=encoding) as f:
                        return f.read()
                except UnicodeDecodeError:
                    continue

            # If all fails, return empty string
            print(f"Warning: Could not read {file_path} (binary file?)")
            return ""
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return ""

    def scan_project(self):
        """Scan the project and collect all files."""
        print(f"Scanning project from: {self.root_dir}")
        print(f"Excluding directories: {', '.join(sorted(self.exclude_dirs))}")

        files = []
        total_size = 0

        for file_path in self.root_dir.rglob("*"):
            # Skip if should be excluded
            if self.should_exclude(file_path):
                continue

            if file_path.is_file():
                try:
                    # Get file size
                    size = file_path.stat().st_size

                    # Skip very large files (optional - you can adjust this)
                    if size > 10 * 1024 * 1024:  # 10MB
                        print(
                            f"Skipping large file: {file_path} ({size/1024/1024:.1f} MB)"
                        )
                        continue

                    # Get relative path
                    rel_path = file_path.relative_to(self.root_dir)

                    files.append(
                        {"path": rel_path, "full_path": file_path, "size": size}
                    )

                    total_size += size
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

        print(f"\nFound {len(files)} files (total: {total_size/1024/1024:.2f} MB)")
        return files

    def create_markdown(self, files):
        """Create markdown file with all code."""
        print(f"\nCreating markdown file: {self.output_file}")

        with open(self.output_file, "w", encoding="utf-8") as md_file:
            # Write header
            md_file.write(f"# Project Code Documentation\n\n")
            md_file.write(f"**Project Root:** `{self.root_dir}`\n\n")
            md_file.write(f"**Total Files:** {len(files)}\n\n")
            md_file.write("---\n\n")

            # Group files by directory for better organization
            files_by_dir = {}
            for file_info in files:
                dir_path = str(file_info["path"].parent)
                if dir_path == ".":
                    dir_path = "root"

                if dir_path not in files_by_dir:
                    files_by_dir[dir_path] = []
                files_by_dir[dir_path].append(file_info)

            # Write files by directory
            for dir_path in sorted(files_by_dir.keys()):
                md_file.write(f"## Directory: `{dir_path}`\n\n")

                for file_info in sorted(
                    files_by_dir[dir_path], key=lambda x: x["path"]
                ):
                    file_path = file_info["path"]
                    full_path = file_info["full_path"]

                    # Get file extension for code block language
                    extension = file_path.suffix.lower()
                    lang_map = {
                        ".py": "python",
                        ".js": "javascript",
                        ".ts": "typescript",
                        ".jsx": "jsx",
                        ".tsx": "tsx",
                        ".html": "html",
                        ".htm": "html",
                        ".css": "css",
                        ".scss": "scss",
                        ".less": "less",
                        ".java": "java",
                        ".cpp": "cpp",
                        ".c": "c",
                        ".h": "c",
                        ".go": "go",
                        ".rs": "rust",
                        ".rb": "ruby",
                        ".php": "php",
                        ".sql": "sql",
                        ".sh": "bash",
                        ".bash": "bash",
                        ".yml": "yaml",
                        ".yaml": "yaml",
                        ".json": "json",
                        ".xml": "xml",
                        ".md": "markdown",
                        ".txt": "text",
                        ".vue": "vue",
                        ".svelte": "html",
                    }

                    language = lang_map.get(extension, "text")

                    # Write file header
                    md_file.write(f"### File: `{file_path}`\n\n")
                    md_file.write(f"**Size:** {file_info['size']} bytes  \n")

                    # Get and write file content
                    content = self.get_file_content(full_path)

                    if content.strip():
                        md_file.write(f"```{language}\n")
                        md_file.write(content)

                        # Ensure the file ends with newline
                        if not content.endswith("\n"):
                            md_file.write("\n")

                        md_file.write("```\n\n")
                    else:
                        md_file.write("*File is empty*\n\n")

                    md_file.write("---\n\n")

            # Add summary
            md_file.write("## Summary\n\n")
            md_file.write(f"- **Project scanned from:** `{self.root_dir}`\n")
            md_file.write(f"- **Total files extracted:** {len(files)}\n")
            md_file.write(f"- **Output file:** `{self.output_file}`\n")
            md_file.write(
                f"- **Generated on:** {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
            )

        print(f"✓ Markdown file created successfully: {self.output_file}")
        print(f"✓ Total size: {self.output_file.stat().st_size/1024/1024:.2f} MB")

    def run(self):
        """Run the full extraction process."""
        try:
            files = self.scan_project()

            if not files:
                print("No files found to process!")
                return

            self.create_markdown(files)

        except KeyboardInterrupt:
            print("\n\nProcess interrupted by user.")
            sys.exit(1)
        except Exception as e:
            print(f"\nError: {e}")
            import traceback

            traceback.print_exc()
            sys.exit(1)


def main():
    """Main function with command line argument support."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Extract all code from a project into a single markdown file."
    )
    parser.add_argument(
        "--root",
        "-r",
        default=".",
        help="Root directory to start scanning (default: current directory)",
    )
    parser.add_argument(
        "--output",
        "-o",
        default="project_code.md",
        help="Output markdown file name (default: project_code.md)",
    )
    parser.add_argument(
        "--exclude", nargs="+", default=[], help="Additional directories to exclude"
    )
    parser.add_argument(
        "--include-all",
        action="store_true",
        help="Include all file types (not just text files)",
    )

    args = parser.parse_args()

    # Create extractor
    extractor = ProjectCodeExtractor(root_dir=args.root, output_file=args.output)

    # Add additional exclusions
    if args.exclude:
        extractor.exclude_dirs.update(args.exclude)

    # If include-all is specified, clear the extensions filter
    if args.include_all:
        extractor.include_extensions = set()

    # Run the extraction
    extractor.run()


if __name__ == "__main__":
    # Add datetime import for the template string
    import datetime

    main()
```

---

### File: `src/i18n.js`

**Size:** 641 bytes  
```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend) // loads translations from /public/locales
  .use(LanguageDetector) // detects user language
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
```

---

### File: `src/index.css`

**Size:** 1154 bytes  
```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

---

### File: `src/main.jsx`

**Size:** 336 bytes  
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import App from './App.jsx'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

---

## Directory: `src/components`

### File: `src/components/Hero.jsx`

**Size:** 5491 bytes  
```jsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const slides = t('hero.slides', { returnObjects: true });
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAuto(false); 
  };

  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(nextSlide, 7000); 
    return () => clearInterval(timer);
  }, [isAuto, nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-volcanic">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.img 
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 12, ease: "easeOut" }}
              src={slides[current].image} 
              className="w-full h-full object-cover" 
              alt="Resort View" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80" />
            <div className="absolute inset-0 bg-ocean/20 mix-blend-multiply opacity-50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 h-full container mx-auto flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-7xl mt-[-5vh]">
          <motion.span
            key={`upper-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lush font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 block"
          >
            {slides[current].upperTitle}
          </motion.span>

          <motion.h1 
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[clamp(3.5rem,12vw,11rem)] font-serif leading-[0.95] mb-8 text-white drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] italic"
          >
            {slides[current].title}
          </motion.h1>
          
          <motion.p 
            key={`sub-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto font-light text-white mb-12 leading-relaxed px-4 drop-shadow-md"
          >
            {slides[current].subtitle}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="w-72 sm:w-auto bg-white text-ocean px-12 py-5 rounded-xl font-black transition-all uppercase text-[11px] tracking-[0.3em] hover:bg-lush hover:text-white shadow-2xl">
              {t('common.reservation')}
            </button>
            <button className="w-72 sm:w-auto border border-white/40 text-white backdrop-blur-md px-12 py-5 rounded-xl font-black transition-all uppercase text-[11px] tracking-[0.3em] hover:bg-white hover:text-ocean">
              {t('common.foundation_story')}
            </button>
          </div>
        </div>
      </div>

      {/* Manual Switch Controls (unchanged) */}
      <div className="absolute inset-x-0 bottom-24 z-40 flex justify-between items-center container mx-auto pointer-events-none px-10">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-white hover:text-white transition-all backdrop-blur-sm"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-1">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button 
          onClick={() => { nextSlide(); setIsAuto(false); }}
          className="pointer-events-auto w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-white hover:text-white transition-all backdrop-blur-sm"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-1">
            <path d="M9 18l6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Decorative Wave (unchanged) */}
      <div className="absolute bottom-0 left-0 w-full z-40 leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px] fill-sand">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,91.54,118.14,81.22,176.5,69.57,235.43,57.81,321.39,56.44,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
```

---

### File: `src/components/LanguageSwitcher.jsx`

**Size:** 2868 bytes  
```jsx
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-volcanic/70 hover:text-lush transition-colors bg-white/50 rounded-lg border border-sand/30 hover:border-lush/50"
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="uppercase text-xs font-bold">{currentLanguage.code}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-sand/30 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                i18n.language === lang.code
                  ? 'bg-lush/10 text-lush font-medium'
                  : 'text-volcanic/70 hover:bg-sand/30 hover:text-lush'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="capitalize">{lang.name}</span>
              {i18n.language === lang.code && (
                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### File: `src/components/Navbar.jsx`

**Size:** 5568 bytes  
```jsx
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import logo from "../assets/general/logo1.png";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navItems = [
    { name: t('nav.home'), to: "/" },
    { name: t('nav.our_story'), to: "/story" },
    { name: t('nav.experiences'), to: "/experiences" },
    { name: t('nav.dining'), to: "/services/dining" },
    { name: t('nav.accommodations'), to: "/rooms" },
    { name: t('nav.gallery'), to: "/gallery" },
    { name: t('nav.contact'), to: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-ocean/5">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-[70]">
          <img src={logo} alt="Ngeme Logo" className="w-12 h-12" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.to} className="nav-link">
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Action Button & Language Switcher & Hamburger */}
        <div className="flex items-center gap-4">
          <Link to="/book" className="btn-pay py-2! px-5! text-xs md:text-sm">
            {t('common.plan_your_stay')}
          </Link>

          {/* Language Switcher */}
          <LanguageSwitcher />

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-[70] p-2 text-lush focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-center transition-colors"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-current block transition-colors"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-center transition-colors"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (unchanged except links) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-volcanic/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
              className="fixed inset-y-0 right-0 h-screen w-[85%] max-w-sm bg-sand z-[65] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-10 pt-32 pb-10">
                <div className="flex flex-col gap-8 text-left">
                  {navItems.map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      key={item.name}
                    >
                      <NavLink 
                        to={item.to} 
                        className={({ isActive }) => 
                          `text-3xl font-serif block transition-colors ${
                            isActive ? "text-lush" : "text-volcanic hover:text-lush"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-16 pt-10 border-t border-ocean/10">
                  <h4 className="text-ocean font-bold uppercase tracking-widest text-xs mb-4">{t('footer.contact_title')}</h4>
                  <p className="text-volcanic/70 text-sm leading-relaxed mb-8">
                    {t('footer.address')}
                  </p>
                  
                  <div className="flex gap-4">
                    {['Instagram', 'Facebook', 'TripAdvisor'].map((social) => (
                      <span key={social} className="text-[10px] uppercase tracking-tighter border border-ocean/20 px-2 py-1 rounded text-ocean/60">
                        {social}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

---

## Directory: `src/components/sections`

### File: `src/components/sections/Cultinary.jsx`

**Size:** 2457 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Culinary() {
  const { t } = useTranslation();
  const dishes = t('culinary.dishes', { returnObjects: true });

  return (
    <section className="container py-24 bg-white rounded-t-[3rem] -mt-12 relative z-40">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative group overflow-hidden rounded-2xl">
          <img 
            src="https://buyam.co/storage/products/medium_507c6d52-0ba8-43a5-b8bd-d4ed94fd5b8a.png" 
            alt="Cameroonian Coastal Gastronomy" 
            className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ocean/10 group-hover:bg-transparent transition-colors" />
        </div>

        <div>
          <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">{t('culinary.section_tag')}</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-volcanic">{t('culinary.title')}</h2>
          
          <p className="text-volcanic/70 text-lg leading-relaxed mb-6">
            {t('culinary.description')}
          </p>

          <div className="mb-10 space-y-2">
            <p className="text-lush font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span>✦</span> {t('culinary.badges.organic')}
            </p>
            <p className="text-ocean font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span>✦</span> {t('culinary.badges.cooking_classes')}
            </p>
          </div>

          <div className="space-y-8">
            {dishes.map((dish, i) => (
              <div key={i} className="flex justify-between items-start border-b border-sand pb-6">
                <div>
                  <h4 className="text-ocean font-bold">{dish.name}</h4>
                  <p className="text-xs text-volcanic/60 mt-1 italic">{dish.desc}</p>
                </div>
                <span className="font-serif italic text-ocean">{dish.price}</span>
              </div>
            ))}
          </div>
          
          <Link to="/dining" className="btn-outline hover:text-lush hover:outline-lush mt-12 inline-block">{t('culinary.button')}</Link>
        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/Facilities.jsx`

**Size:** 7158 bytes  
```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Home, Sparkles, Wifi, ConciergeBell, UtensilsCrossed, ChevronRight, CheckCircle2, ChevronDown } from "lucide-react";

export default function Facilities() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("living");
  
  const facilityCategories = [
    { id: "living", label: t('facilities.categories.living.label'), icon: Home, items: t('facilities.categories.living.items', { returnObjects: true }) },
    { id: "wellness", label: t('facilities.categories.wellness.label'), icon: Sparkles, items: t('facilities.categories.wellness.items', { returnObjects: true }) },
    { id: "tech", label: t('facilities.categories.tech.label'), icon: Wifi, items: t('facilities.categories.tech.items', { returnObjects: true }) },
    { id: "concierge", label: t('facilities.categories.concierge.label'), icon: ConciergeBell, items: t('facilities.categories.concierge.items', { returnObjects: true }) },
    { id: "culinary", label: t('facilities.categories.culinary.label'), icon: UtensilsCrossed, items: t('facilities.categories.culinary.items', { returnObjects: true }) },
  ];

  const activeCategory = facilityCategories.find(c => c.id === activeTab);

  return (
    <section className="py-24 md:py-32 bg-white border-y border-sand overflow-hidden">
      <div className="container mx-auto px-6 lg:max-w-7xl">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-12">
          <div className="max-w-2xl">
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
              {t('facilities.section_tag')}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic leading-[1] tracking-tight mb-6">
              {t('facilities.title')}
            </h2>
          </div>
          
          <div className="lg:max-w-xs border-l-2 border-lush pl-8 py-2">
            <p className="text-volcanic/80 text-sm md:text-base leading-relaxed italic font-light">
              "{t('facilities.quote')}"
            </p>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="lg:hidden space-y-4">
          {facilityCategories.map((cat) => {
            const Icon = cat.icon;
            const isOpen = activeTab === cat.id;
            return (
              <div key={cat.id} className="border-b border-sand pb-2">
                <button
                  onClick={() => setActiveTab(isOpen ? "" : cat.id)}
                  className={`w-full flex items-center justify-between py-6 transition-all duration-300 ${isOpen ? "text-lush" : "text-ocean"}`}
                >
                  <div className="flex items-center gap-5">
                    <Icon className={`w-5 h-5 ${isOpen ? "text-lush" : "text-ocean/40"}`} />
                    <span className="font-bold uppercase tracking-[0.2em] text-[12px]">{cat.label}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180 text-lush" : "opacity-30"}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-5 py-6 px-2 bg-sand/20 rounded-2xl mb-4">
                        {cat.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <CheckCircle2 className="w-4 h-4 text-lush shrink-0" />
                            <span className="text-volcanic text-base font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-6">
            {facilityCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full flex items-center justify-between p-8 rounded-[2rem] transition-all duration-500 group border-2 ${
                    isActive 
                    ? "bg-ocean text-white shadow-2xl translate-x-6 border-ocean" 
                    : "bg-transparent text-ocean hover:bg-sand/40 border-transparent hover:border-sand"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <Icon strokeWidth={isActive ? 2 : 1.5} className={`w-6 h-6 transition-colors duration-500 ${isActive ? "text-lush" : "text-ocean/40 group-hover:text-ocean"}`} />
                    <span className="font-bold uppercase tracking-[0.25em] text-[11px]">
                      {cat.label}
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-all duration-500 ${isActive ? "opacity-100 text-lush" : "opacity-20 text-ocean"}`} />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-sand/20 rounded-[4rem] p-24 relative min-h-[650px] border border-sand shadow-inner flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <div className="flex items-center gap-8 mb-16">
                  <h3 className="text-5xl font-serif text-ocean italic">{activeCategory?.label}</h3>
                  <div className="h-px flex-1 bg-ocean/10" />
                </div>
                
                <div className="grid grid-cols-2 gap-y-12 gap-x-16">
                  {activeCategory?.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-6 group">
                      <CheckCircle2 className="w-6 h-6 text-lush mt-0.5 shrink-0" />
                      <span className="text-volcanic font-medium text-xl xl:text-2xl leading-snug tracking-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/Footer.jsx`

**Size:** 5580 bytes  
```jsx
import { Link } from "react-router";
import { useTranslation } from 'react-i18next';
import logo from "../../assets/general/logo1.png";
import { Instagram, Linkedin, Facebook, Twitter, Youtube, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-volcanic pt-24 pb-12 text-sand overflow-hidden relative">
      <div className="absolute top-0 right-0 text-[12rem] font-bold text-white/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
        NEW WAVES
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:max-w-7xl">
        <div className="bg-lush rounded-3xl p-8 md:p-16 mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="text-white text-3xl font-serif mb-4 italic">{t('footer.newsletter_title')}</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {t('footer.newsletter_text')}
            </p>
          </div>
          
          <form className="w-full max-w-md flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={t('footer.newsletter_placeholder')}
              className="w-full flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-lush transition-colors"
            />
            <button className="bg-white text-ocean hover:bg-lush hover:text-white px-8 py-4 rounded-xl font-bold transition-all uppercase text-[10px] tracking-widest whitespace-nowrap flex-shrink-0">
              {t('footer.newsletter_button')}
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20 border-b border-white/10 pb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <img src={logo} alt="New Waves Logo" className="w-12 h-12 object-contain" />
              <h4 className="text-white text-2xl font-serif">{t('footer.brand_name')}</h4>
            </div>
            <p className="max-w-sm text-sm text-white/60 leading-relaxed mb-8">
              {t('footer.brand_description')}
            </p>
            <div className="flex gap-5">
              <SocialIcon Icon={Instagram} href="#" />
              <SocialIcon Icon={Linkedin} href="#" />
              <SocialIcon Icon={Facebook} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Youtube} href="#" />
            </div>
          </div>
          
          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">{t('footer.legacy_title')}</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/foundation" className="text-white/50 hover:text-lush transition-colors duration-300 block">{t('footer.legacy_foundation')}</Link></li>
              <li><Link to="/dialogues" className="text-white/50 hover:text-lush transition-colors duration-300 block">{t('footer.legacy_dialogues')}</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">{t('footer.concierge_title')}</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/rooms" className="text-white/50 hover:text-lush transition-colors duration-300 block">{t('footer.concierge_book')}</Link></li>
              <li><Link to="/contact" className="text-white/50 hover:text-lush transition-colors duration-300 block">{t('footer.concierge_inquiries')}</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">{t('footer.contact_title')}</h5>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-lush shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </li>
              <li>{t('footer.email')}</li>
              <li>{t('footer.phone')}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
          <div className="flex items-center gap-3">
            <span className="text-lush">✦</span> 
            <span>{t('footer.est')}</span>
            <span className="hidden md:block opacity-20">|</span>
            <span>{t('footer.sanctuary')}</span>
          </div>
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors text-lush">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors text-lush">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon, href }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-lush hover:border-lush hover:-translate-y-1 transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={18} strokeWidth={1.5} />
    </a>
  );
}
```

---

### File: `src/components/sections/GalleryPreview.jsx`

**Size:** 3226 bytes  
```jsx
import React, { useState } from 'react';
import { galleryData } from "../../data/galleryData";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "../ui/Lightbox";
import { ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';

function GalleryPreview() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const previewImages = galleryData.slice(0, 8);

  return (
    <section className="bg-volcanic py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto lg:max-w-[1440px] px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
              {t('gallery_preview.section_tag')}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white italic leading-tight tracking-tight">
              {t('gallery_preview.title')}
            </h2>
          </div>
          
          <Link 
            to="/gallery" 
            className="group flex items-center gap-4 text-white font-black uppercase tracking-[0.4em] text-[10px] pb-3 border-b border-lush/50 hover:border-lush transition-all duration-300"
          >
            {t('gallery_preview.button')}
            <ArrowRight className="w-5 h-5 text-lush group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {previewImages.map((item, index) => (
            <motion.div 
              key={item.id} 
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 group shadow-2xl"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-volcanic/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-lush font-black uppercase tracking-[0.4em] text-[9px] mb-2">
                  {item.category}
                </span>
                <p className="text-white font-serif text-lg italic translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox 
            images={previewImages} 
            index={selectedIndex} 
            setIndex={setSelectedIndex} 
            close={() => setSelectedIndex(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default GalleryPreview;
```

---

### File: `src/components/sections/ImpactSection.jsx`

**Size:** 2083 bytes  
```jsx
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import image1 from "../../assets/general/image2.jpeg";

export default function ImpactSection() {
  const { t } = useTranslation();

  return (
    <section className="container py-24">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-lush"></span>
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-xs">{t('impact.section_tag')}</span>
          </div>
          <h2 className="text-5xl font-serif mb-8 leading-tight text-volcanic">{t('impact.title')}</h2>
          <p className="text-lg text-volcanic/80 mb-6 leading-relaxed">
            {t('impact.description')}
          </p>
          <ul className="space-y-4 mb-10">
            {[
              'impact.list.education',
              'impact.list.employment',
              'impact.list.sustainability',
              'impact.list.digital'
            ].map((key) => (
              <li key={key} className="flex items-center gap-3 text-sm font-medium text-volcanic/70">
                <span className="w-1.5 h-1.5 bg-lush rounded-full"></span> {t(key)}
              </li>
            ))}
          </ul>
          <button
            className="btn-outline"
            onClick={() => window.open('https://fisiyfoundation.org/', '_blank')}
          >
            {t('impact.button')}
          </button>
        </motion.div>
        
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={image1} 
            alt="Ngeme Vision" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/Infrastructure.jsx`

**Size:** 814 bytes  
```jsx
import { useTranslation } from 'react-i18next';
import ServiceCard from "../ui/ServiceCard";

export default function Infrastructure() {
  const { t } = useTranslation();
  const features = t('infrastructure.features', { returnObjects: true });

  return (
    <section className="bg-ocean py-24">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-white font-serif italic mb-4">{t('infrastructure.title')}</h2>
          <p className="text-white/70 max-w-2xl">{t('infrastructure.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <ServiceCard key={f.title} title={f.title} description={f.description} icon={f.icon} to={f.to} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/OceanSide.jsx`

**Size:** 2179 bytes  
```jsx
import React from 'react';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Mic2, GraduationCap } from "lucide-react";

function OceanSide() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-35 text-center bg-volcanic relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">
            {t('ocean_side.section_tag')}
          </span>

          <h2 className="font-serif italic text-white mb-6 text-5xl md:text-5xl tracking-tight leading-tight">
            {t('ocean_side.title')}
          </h2>

          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-lush" />
              <span className="text-white font-bold uppercase tracking-[0.2em] text-[11px]">{t('ocean_side.badge_learning')}</span>
            </div>
            
          </div>

          <p className="text-xl md:text-3xl text-white/90 mb-16 leading-relaxed font-light max-w-3xl mx-auto">
            {t('ocean_side.subtitle')}
          </p>

          <div className="flex justify-center">
            <button className="bg-white text-volcanic px-14 py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] hover:bg-lush hover:text-white transition-all duration-500 shadow-2xl">
              {t('ocean_side.button')}
            </button>
          </div>
          
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lush/20 to-transparent" />
    </section>
  )
}

export default OceanSide;
```

---

### File: `src/components/sections/Partnerships.jsx`

**Size:** 2768 bytes  
```jsx
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Partnerships() {
  const { t } = useTranslation();
  const partners = t('partnerships.partners', { returnObjects: true });

  return (
    <section className="py-24 bg-white border-y border-sand">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          
          <div className="lg:col-span-1">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">{t('partnerships.section_tag')}</span>
            <h2 className="text-4xl font-serif mt-4 text-volcanic leading-tight">
              {t('partnerships.title')}
            </h2>
            <p className="text-volcanic/70 mt-6 leading-relaxed text-sm">
              {t('partnerships.description')}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full border border-sand flex items-center justify-center text-xl">🤝</div>
              <span className="text-xs font-bold uppercase tracking-widest text-volcanic/40">
                Building a reliable community
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {partners.map((partner, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, backgroundColor: "var(--color-sand)" }}
                  className="p-8 border border-sand rounded-2xl flex flex-col items-center text-center transition-colors duration-300"
                >
                  <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all">
                    {partner.logo}
                  </div>
                  <h4 className="text-sm font-bold text-volcanic uppercase tracking-tighter">
                    {partner.name}
                  </h4>
                  <p className="text-[10px] text-lush font-medium mt-1 uppercase tracking-widest">
                    {partner.role}
                  </p>
                </motion.div>
              ))}
              
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="p-8 bg-lush rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer"
              >
                <p className="text-white font-serif italic text-lg mb-2">{t('partnerships.cta')}</p>
                <span className="text-[9px] text-sand/60 uppercase tracking-[0.2em]">{t('partnerships.cta_sub')}</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/Principles.jsx`

**Size:** 3778 bytes  
```jsx
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Users, ShieldCheck, Leaf, Sparkles } from "lucide-react";

const iconMap = {
  "Connection & Outreach": Users,
  "Outstanding Professional Security": ShieldCheck,
  "Sustainable Legacy": Leaf,
  "Luxury Redefined": Sparkles,
};

export default function Principles() {
  const { t } = useTranslation();
  const principles = t('principles.items', { returnObjects: true });

  return (
    <section className="relative py-24 md:py-20 overflow-hidden bg-sand">
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1469474099711-423907c111e4?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lush font-black tracking-[0.5em] uppercase text-[10px]"
          >
            {t('principles.section_tag')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-lush mt-4 italic"
          >
            {t('principles.title')}
          </motion.h2>
          <div className="h-0.5 w-24 bg-lush mx-auto mt-8 opacity-40" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((p, i) => {
            const IconComponent = iconMap[p.title] || Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group relative p-10 rounded-[2.5rem] bg-white shadow-sm border border-ocean/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[420px]"
              >
                <div className="text-ocean/10 font-serif text-6xl mb-6 group-hover:text-lush/20 transition-colors">
                  {p.number}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-ocean font-serif text-2xl leading-tight group-hover:text-lush transition-colors">
                    {p.title}
                  </h3>
                  {p.subtext && (
                    <span className="text-lush/60 text-[10px] font-black uppercase tracking-[0.2em] mt-2 block italic">
                      {p.subtext}
                    </span>
                  )}
                </div>
                
                <p className="text-volcanic/70 text-base leading-relaxed font-light mt-auto">
                  {p.description}
                </p>

                <div className="absolute top-10 right-10 text-lush opacity-20 group-hover:opacity-100 transition-all duration-500 scale-110">
                  <IconComponent size={32} strokeWidth={1.2} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-ocean font-black opacity-30">
            {t('principles.tagline')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/ServiceGrid.jsx`

**Size:** 1456 bytes  
```jsx
import React from "react";
import { useTranslation } from 'react-i18next';
import ServiceDiscoveryCard from "../ui/ServiceDiscoveryCard";

export default function ServiceGrid() {
  const { t } = useTranslation();
  const services = t('service_grid.services', { returnObjects: true });

  return (
    <section className="container mx-auto py-24 bg-sand lg:max-w-7xl px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <span className="text-lush font-black tracking-[0.4em] uppercase text-[10px]">
            {t('service_grid.section_tag')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-volcanic leading-tight">
            {t('service_grid.title')} <br />
            <span className="italic">{t('service_grid.title_italic')}</span>
          </h2>
        </div>
        <p className="text-volcanic/60 max-w-sm pb-2 text-sm leading-relaxed">
          {t('service_grid.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceDiscoveryCard 
            key={index} 
            title={service.title} 
            subtitle={service.subtitle} 
            category={service.category} 
            image={service.image} 
            to={service.to} 
          />
        ))}
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/Suites.jsx`

**Size:** 1688 bytes  
```jsx
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Suites() {
  const { t } = useTranslation();
  const suites = t('suites.suites', { returnObjects: true });

  return (
    <section className="py-24 bg-sand">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">{t('suites.section_tag')}</span>
            <h2 className="text-4xl md:text-4xl font-serif mt-4 italic text-volcanic">{t('suites.title')}</h2>
          </div>
          <p className="text-volcanic/60 max-w-xs text-sm">
            {t('suites.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {suites.map((suite, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-volcanic/5 shadow-resort">
                <img src={suite.img} alt={suite.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-serif text-volcanic">{suite.name}</h3>
              <div className="flex justify-between items-center mt-2 pb-4 border-b border-ocean/10 text-xs tracking-widest uppercase opacity-60">
                <span>{suite.size}</span>
                <span>From {suite.price} / Night</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/Testimonials.jsx`

**Size:** 4234 bytes  
```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t('testimonials.testimonials', { returnObjects: true });
  const [index, setIndex] = useState(0);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50 && index < testimonials.length - 1) {
      setIndex(index + 1);
    } else if (info.offset.x > 50 && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="py-32 bg-sand/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
        <span className="text-[30rem] font-serif leading-none">“</span>
      </div>

      <div className="container relative z-10 px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lush font-bold tracking-[0.4em] uppercase text-[10px]"
          >
            {t('testimonials.section_tag')}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-volcanic italic">
            {t('testimonials.title')}
          </h2>
          <div className="h-1 w-12 bg-lush mx-auto mt-8" />
        </div>

        {/* <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div> */}

        <div className="lg:hidden relative">
          <div className="overflow-visible">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex cursor-grab active:cursor-grabbing"
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-2">
                  <TestimonialCard t={t} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  index === i ? "w-8 bg-lush" : "w-2 bg-ocean/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* <div className="mt-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-volcanic/40 font-semibold">
            Member of the Global Sustainable Tourism Council
          </p>
        </div> */}
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <motion.div 
      className="bg-white p-10 rounded-2xl shadow-[0_10px_40px_rgba(26,95,122,0.04)] border border-ocean/5 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex gap-1 mb-6 text-[10px] text-lush">
          {Array(5).fill("✦").map((star, idx) => <span key={idx}>{star}</span>)}
        </div>
        
        <p className="text-volcanic/80 leading-relaxed italic mb-8 font-light text-lg">
          "{t.quote}"
        </p>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-sand">
        <div className="h-10 w-10 rounded-full bg-sand flex items-center justify-center text-ocean font-serif font-bold text-xs shadow-inner shrink-0">
          {t.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="min-w-0">
          <h4 className="text-ocean font-bold text-xs uppercase tracking-tighter leading-none mb-1 truncate">
            {t.author}
          </h4>
          <p className="text-[9px] text-volcanic/50 uppercase tracking-widest font-medium truncate">
            {t.role} <span className="mx-1 text-lush">•</span> {t.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
```

---

### File: `src/components/sections/Values.jsx`

**Size:** 4766 bytes  
```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';

const valueKeys = [
  { id: "exclusivity", titleKey: "values.exclusivity.title", labelKey: "values.exclusivity.label", descKey: "values.exclusivity.desc", image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1400" },
  { id: "connectivity", titleKey: "values.connectivity.title", labelKey: "values.connectivity.label", descKey: "values.connectivity.desc", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400" },
  { id: "culture", titleKey: "values.culture.title", labelKey: "values.culture.label", descKey: "values.culture.desc", image: "https://images.unsplash.com/photo-1523474253046-2cd2c78b681e?auto=format&fit=crop&q=80&w=1400" },
  { id: "luxury", titleKey: "values.luxury.title", labelKey: "values.luxury.label", descKey: "values.luxury.desc", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1400" },
  { id: "organic", titleKey: "values.organic.title", labelKey: "values.organic.label", descKey: "values.organic.desc", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1400" },
];

export default function ValuesSection() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(valueKeys[0].id);
  const activeValue = valueKeys.find(v => v.id === activeId);

  return (
    <section className="relative w-full min-h-[800px] flex items-center py-20 overflow-hidden bg-volcanic">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={activeValue.image} 
            className="w-full h-full object-cover grayscale-[20%]" 
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-volcanic via-volcanic/80 lg:via-volcanic/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="w-full relative z-10 mx-auto px-6 lg:px-20 max-w-[1800px] grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-4">
          <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">
            {t('values.section_tag')}
          </span>
          
          <div className="flex flex-col">
            {valueKeys.map((v, index) => (
              <button
                key={v.id}
                onClick={() => setActiveId(v.id)}
                onMouseEnter={() => setActiveId(v.id)}
                className="group py-5 text-left relative outline-none"
              >
                <div className="flex items-center gap-6">
                  <span className={`text-[11px] font-black tracking-widest transition-colors duration-300 ${activeId === v.id ? 'text-lush' : 'text-white/20'}`}>
                    0{index + 1}
                  </span>
                  <h3 className={`text-3xl md:text-5xl lg:text-7xl font-serif transition-all duration-500 ${activeId === v.id ? 'text-white translate-x-4 md:translate-x-8' : 'text-white/20 group-hover:text-white/40'}`}>
                    {t(v.titleKey)}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[2rem] md:rounded-[3.5rem] w-full max-w-xl mx-auto lg:ml-auto"
            >
              <span className="text-lush font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
                {t(activeValue.labelKey)}
              </span>
              <p className="text-white text-xl md:text-2xl leading-relaxed font-light">
                {t(activeValue.descKey)}
              </p>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-12 bg-lush" />
                <span className="text-white/30 text-[9px] uppercase tracking-widest font-black">
                  Refining the Sanctuary
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
```

---

## Directory: `src/components/ui`

### File: `src/components/ui/Lightbox.jsx`

**Size:** 2427 bytes  
```jsx
import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ images, index, setIndex, close }) {
  if (index === null) return null;

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-volcanic/95 backdrop-blur-xl flex items-center justify-center touch-none"
    >
      <button onClick={close} className="absolute top-10 right-10 z-[110] text-white hover:text-lush p-4">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      <div className="absolute inset-x-10 flex justify-between items-center pointer-events-none hidden md:flex">
        <button onClick={prev} className="pointer-events-auto p-4 text-white/50 hover:text-white"><svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-1"><path d="M15 18l-6-6 6-6" /></svg></button>
        <button onClick={next} className="pointer-events-auto p-4 text-white/50 hover:text-white"><svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-1"><path d="M9 18l6-6-6-6" /></svg></button>
      </div>

      <div className="relative w-full max-w-5xl h-[70vh] px-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset }) => {
              if (offset.x > 100) prev();
              else if (offset.x < -100) next();
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing flex flex-col items-center"
          >
            <img src={images[index].image} alt={images[index].title} className="w-full h-full object-contain" />
            <div className="mt-8 text-center text-white">
              <h3 className="text-2xl font-serif">{images[index].title}</h3>
              <p className="text-lush uppercase tracking-[0.3em] text-[10px] mt-2">{images[index].category}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
```

---

### File: `src/components/ui/ServiceCard.jsx`

**Size:** 1020 bytes  
```jsx
// app/components/ui/ServiceCard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function ServiceCard({ title, description, icon, to }) {
  return (
    <Link to={to} className="block group">
      <motion.div 
        whileHover={{ y: -10 }}
        className="card h-full flex flex-col items-start hover:border-lush/30 transition-all duration-500"
      >
        <div className="text-4xl mb-6 p-4 bg-sand rounded-xl group-hover:bg-ocean group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
        <h3 className="text-xl mb-3 group-hover:text-ocean">{title}</h3>
        <p className="text-sm text-volcanic/70 leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        <span className="text-xs font-bold uppercase tracking-widest text-lush flex items-center gap-2">
          Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </motion.div>
    </Link>
  );
}
```

---

### File: `src/components/ui/ServiceDiscoveryCard.jsx`

**Size:** 2336 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function ServiceDiscoveryCard({ title, subtitle, image, to, category }) {
  return (
    <Link to={to} className="group relative block w-full h-[450px] overflow-hidden rounded-2xl bg-volcanic">
      {/* Background Image with Zoom Effect */}
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
      />

      {/* Sophisticated Gradient Overlay (Luxury Standard) */}
      <div className="absolute inset-0 bg-gradient-to-t from-volcanic via-volcanic/20 to-transparent opacity-90" />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Category Badge */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-lush"
        >
          {category}
        </motion.span>

        {/* Title */}
        <h3 className="text-2xl font-serif text-white mb-2 leading-tight">
          {title}
        </h3>

        {/* Description / Subtitle (Reveals on Hover) */}
        <div className="overflow-hidden">
          <p className="text-sm text-sand/80 leading-relaxed max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-hover:mb-6">
            {subtitle}
          </p>
        </div>

        {/* The Action Line */}
        <div className="flex items-center gap-4 text-white">
          <div className="h-px w-8 bg-white/50 transition-all duration-500 group-hover:w-12 group-hover:bg-lush" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Discover Detail</span>
        </div>
      </div>

      {/* Top Right Detail (Optional Corner Accent) */}
      <div className="absolute top-6 right-6 h-10 w-10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </Link>
  );
}
```

---

### File: `src/components/ui/SmartImage.jsx`

**Size:** 1347 bytes  
```jsx
import { motion } from "framer-motion";

export default function SmartImage({ item }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative group overflow-hidden rounded-xl bg-volcanic aspect-square cursor-pointer"
    >
      {/* The Image */}
      <img 
        src={item.image} 
        alt={item.title} 
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
      />

      {/* Interactive Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        <span className="text-[10px] uppercase tracking-widest text-lush font-bold mb-2">
          {item.category}
        </span>
        <h4 className="text-white text-xl font-serif">{item.title}</h4>
        <p className="text-white/70 text-xs mt-2 line-clamp-2">
          {item.description}
        </p>
        
        {/* Decorative corner bracket */}
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/30 group-hover:border-lush transition-colors" />
      </div>
    </motion.div>
  );
}
```

---

## Directory: `src/data`

### File: `src/data/galleryData.js`

**Size:** 2155 bytes  
```javascript
export const galleryData = [
  {
    id: 1,
    title: "Atlantic Vista",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200",
    description: "The main resort facade facing the Gulf of Guinea.",
  },
  {
    id: 2,
    title: "Executive Nomad Suite",
    category: "Interiors",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200",
    description: "Equipped with ergonomic workstations and Atlantic views.",
  },
  {
    id: 3,
    title: "The Infinity Edge",
    category: "Leisure",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200",
    description: "Limbe's largest volcanic-view pool.",
  },
  {
    id: 4,
    title: "Coastal Culinary",
    category: "Dining",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200",
    description: "Fresh seafood served on the volcanic sand terrace.",
  },
  {
    id: 5,
    title: "Night at Ngeme",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    description: "Starlit evenings at the resort.",
  },
  {
    id: 6,
    title: "The Dialogue Lounge",
    category: "Professional",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    description: "Where intellectual leaders gather.",
  },
  // Add more as needed for the full gallery page...
  {
    id: 7,
    title: "Coastal Culinary",
    category: "Dining",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200",
    description: "Fresh seafood served on the volcanic sand terrace.",
  },
  {
    id: 8,
    title: "Executive Nomad Suite",
    category: "Interiors",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200",
    description: "Equipped with ergonomic workstations and Atlantic views.",
  },
];
```

---

### File: `src/data/menuData.js`

**Size:** 2028 bytes  
```javascript
export const menuItems = [
  {
    id: 1,
    name: "Plantain Crisps with Spicy Kati-Kati",
    category: "appetizers",
    description:
      "Thinly sliced, fried plantains served with a fiery pepper sauce made from local kati-kati peppers.",
    price: 1800,
    dietary: ["vegan", "gluten-free"],
    image:
      "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Mbongo Tchobi Prawns",
    category: "appetizers",
    description:
      "Juicy prawns simmered in a dark, aromatic Cameroonian spice both, traditionally made with fresh crayfish and bitter herbs.",
    price: 2400,
    dietary: ["gluten-free"],
    image:
      "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Grassed Beef & Kati-Kati",
    category: "mains",
    description:
      "Tender beef fillet from grass-fed cattle, grilled over volcanic coals and glazed with a reduction of kati-kati peppers and local honey.",
    price: 6500,
    dietary: ["gluten-free"],
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Ndolé Vegetarian",
    category: "mains",
    description:
      "Creamy bitterleaf stew with peanuts, smoked fish (optional), and a medley of local vegetables. Served with boiled plantains or bobolo.",
    price: 4500,
    dietary: ["vegan-option"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Grilled Rockfish with Yellow Sauce",
    category: "mains",
    description:
      "Fresh Atlantic rockfish, grilled and topped with a vibrant yellow sauce made from turmeric, ginger, and palm oil. Served with vegetable rice.",
    price: 5900,
    dietary: ["gluten-free"],
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800",
  },
];
```

---

## Directory: `src/pages`

### File: `src/pages/Accomodations.jsx`

**Size:** 12266 bytes  
```jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { Check, X, Calendar, Users, Coffee, Waves, Search, ArrowUpDown } from "lucide-react";

export default function Accommodations() {
  const { t } = useTranslation();
  const suitesData = t('accomodations.suites', { returnObjects: true });
  const [selectedSuite, setSelectedSuite] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Add image URLs if not present in translation
  const suites = suitesData.map((suite, idx) => ({
    ...suite,
    image: suite.image || [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000"
    ][idx % 4],
    amenities: suite.amenities || t(`facilities.categories.${idx === 0 ? 'living' : idx === 1 ? 'wellness' : 'tech'}.items`, { returnObjects: true }).slice(0, 5)
  }));

  const filteredSuites = useMemo(() => {
    let filtered = suites.filter(suite =>
      suite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suite.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [searchQuery, sortBy, suites]);

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <section className="container mx-auto px-6 mb-12 text-center">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-lush font-black tracking-[0.5em] uppercase text-[10px] block mb-4"
          >
            {t('accommodations.section_tag')}
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif text-volcanic italic">{t('accommodations.title')}</h1>
          <p className="text-volcanic/60 mt-6 max-w-2xl mx-auto text-lg">
            {t('accommodations.subtitle')}
          </p>
        </section>

        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic/40" />
              <input
                type="text"
                placeholder={t('accommodations.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-sand/60 bg-white text-volcanic placeholder:text-volcanic/40 focus:outline-none focus:border-lush"
              />
            </div>

            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-4 h-4 text-volcanic/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-sand/60 rounded-full py-3 px-5 text-sm text-volcanic focus:outline-none focus:border-lush"
              >
                <option value="default">{t('accommodations.sort_by')}</option>
                <option value="low-high">{t('accommodations.sort_low_high')}</option>
                <option value="high-low">{t('accommodations.sort_high_low')}</option>
              </select>
            </div>
          </div>

          <p className="text-volcanic/50 text-sm mt-4 text-center md:text-left">
            {filteredSuites.length} {filteredSuites.length === 1 ? t('accommodations.suites_available') : t('accommodations.suites_available_plural')}
          </p>
        </section>

        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredSuites.map((suite, idx) => (
                <motion.div 
                  key={suite.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-reset border border-sand group hover:shadow-2xl transition-shadow flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={suite.image} 
                      alt={suite.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                      <span className="text-lush font-serif font-bold text-sm">${suite.price}</span>
                      <span className="text-[8px] text-volcanic/60 uppercase tracking-widest ml-1">/ night</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif text-volcanic mb-3">{suite.title}</h3>
                    <p className="text-volcanic/60 text-xs leading-relaxed mb-4 line-clamp-3">
                      {suite.description}
                    </p>

                    <div className="space-y-2 mb-5">
                      <p className="text-[8px] uppercase tracking-[0.3em] font-black text-lush mb-2">{t('accommodations.amenities')}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {suite.amenities.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-3 h-3 text-lush flex-shrink-0" strokeWidth={3} />
                            <span className="text-[9px] font-bold text-volcanic/80 uppercase tracking-tighter truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedSuite(suite)}
                      className="w-full bg-volcanic hover:bg-lush text-white font-black py-4 rounded-xl transition-all shadow-md uppercase text-[9px] tracking-[0.3em] mt-auto"
                    >
                      {t('accommodations.reserve')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {filteredSuites.length === 0 && (
          <div className="text-center py-20">
            <p className="text-volcanic/40 text-lg">No suites match your search.</p>
          </div>
        )}
      </main>

      {/* Reservation Modal */}
      <AnimatePresence>
        {selectedSuite && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSuite(null)}
              className="absolute inset-0 bg-volcanic/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-sand w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl grid lg:grid-cols-2"
            >
              <button 
                onClick={() => setSelectedSuite(null)}
                className="absolute top-6 right-6 z-20 bg-volcanic text-white p-2 rounded-full hover:bg-lush transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="hidden lg:block relative bg-volcanic p-12 text-white">
                <div className="absolute inset-0 opacity-20">
                  <Waves className="w-full h-full text-white p-20" />
                </div>
                <div className="relative z-10">
                  <span className="text-lush font-black tracking-widest text-[10px] uppercase">{t('accommodations.modal.title')}</span>
                  <h2 className="text-4xl font-serif mt-4 mb-6">{selectedSuite.title}</h2>
                  <p className="text-white/60 mb-8 italic">"{t('accommodations.modal.description')}"</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Coffee className="text-lush" />
                      <span className="text-sm font-medium">{t('accommodations.modal.breakfast')}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Users className="text-lush" />
                      <span className="text-sm font-medium">{t('accommodations.modal.concierge')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 bg-white">
                <h3 className="text-2xl font-serif text-volcanic mb-8">{t('accommodations.modal.booking_title')}</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-lush">{t('accommodations.modal.arrival')}</label>
                      <input type="date" className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-lush">{t('accommodations.modal.departure')}</label>
                      <input type="date" className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-lush">{t('accommodations.modal.full_name')}</label>
                    <input type="text" placeholder="Dr. Julian F." className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-lush">{t('accommodations.modal.special_requirements')}</label>
                    <textarea placeholder={t('accommodations.modal.special_placeholder')} className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors resize-none" rows="3" />
                  </div>

                  <button className="w-full bg-lush hover:bg-volcanic text-white font-black py-5 rounded-xl uppercase text-[10px] tracking-[0.3em] transition-all">
                    {t('accommodations.modal.confirm')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
```

---

### File: `src/pages/ComingSoon.jsx`

**Size:** 3918 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router";
import logo from "../assets/general/logo.png";

export default function ComingSoon() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-volcanic flex items-center justify-center">
      
      {/* Background Layer - High-end Ocean Texture */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover opacity-40" 
          alt="Ocean Texture" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-ocean/20 to-volcanic" />
      </div>

      {/* Decorative Branding Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.02] pointer-events-none select-none whitespace-nowrap z-10">
        EVOLUTION
      </div>

      {/* Content Layer */}
      <div className="relative z-20 text-center px-6 max-w-3xl">
        
        {/* The Refined Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 flex justify-center"
        >
          <img 
            src={logo}
            alt="New Waves Logo" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl" 
          />
        </motion.div>

        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lush font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-4 block"
        >
          A New Chapter in Excellence
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight"
        >
          Coming Soon
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/60 text-base md:text-lg font-light italic mb-10 max-w-xl mx-auto"
        >
          We are currently refining this experience to meet the standards of the global nomad. Stay connected as we redefine the Atlantic coast.
        </motion.p>

        {/* Action / Navigation back */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/" className="w-full sm:w-auto bg-white text-ocean px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-lush hover:text-white transition-all shadow-2xl">
            Return Home
          </Link>
          <button className="w-full sm:w-auto border border-white/20 text-white/70 backdrop-blur-md px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
            Join the Waitlist
          </button>
        </motion.div>
      </div>

      {/* Bottom Subtle Waves - matching the Hero */}
      <div className="absolute bottom-0 left-0 w-full z-40 leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px] fill-sand">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,91.54,118.14,81.22,176.5,69.57,235.43,57.81,321.39,56.44,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
```

---

### File: `src/pages/Contact.jsx`

**Size:** 9887 bytes  
```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { Send, MapPin, Globe, Shield, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState("idle");

  return (
    <div className="bg-sand min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="relative pt-32 pb-24 w-full">
        <div className="container mx-auto px-6">
          
          <div className="max-w-4xl mb-16 md:mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lush font-black tracking-[0.5em] uppercase text-[10px] block mb-4"
            >
              {t('contact.section_tag')}
            </motion.span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-8xl font-serif text-volcanic leading-[1.1] tracking-tight"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-volcanic/60 text-lg md:text-xl mt-8 max-w-2xl leading-relaxed italic font-light"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7 order-1 lg:order-2 bg-white p-8 md:p-16 lg:p-20 rounded-[3rem] shadow-resort border border-sand"
            >
              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div 
                    key="success" 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-lush/10 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Send className="text-lush w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-serif text-ocean mb-4">{t('common.inquiry_received')}</h3>
                    <p className="text-volcanic/60 text-sm max-w-xs mx-auto leading-relaxed">
                      {t('common.inquiry_success')}
                    </p>
                    <button 
                      onClick={() => setFormStatus("idle")} 
                      className="mt-10 text-lush font-black text-[10px] uppercase tracking-[0.3em] border-b-2 border-lush pb-1 hover:text-volcanic hover:border-volcanic transition-colors"
                    >
                      {t('common.submit_another')}
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={(e) => { 
                      e.preventDefault(); 
                      setFormStatus("sending"); 
                      setTimeout(() => setFormStatus("success"), 2000); 
                    }} 
                    className="space-y-10"
                  >
                    <div className="grid md:grid-cols-2 gap-10">
                      <FormInput label={t('contact.form.full_name')} placeholder={t('contact.form.full_name_placeholder')} />
                      <FormInput label={t('contact.form.email')} type="email" placeholder={t('contact.form.email_placeholder')} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <FormInput label={t('contact.form.phone')} placeholder="+237 ..." />
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-lush/60 ml-1">{t('contact.form.inquiry_type')}</label>
                        <select className="w-full bg-sand/40 border-none rounded-2xl px-6 py-5 text-sm focus:ring-2 focus:ring-lush outline-none appearance-none cursor-pointer text-volcanic font-medium">
                          <option>{t('contact.form.inquiry_options.executive')}</option>
                          <option>{t('contact.form.inquiry_options.corporate')}</option>
                          <option>{t('contact.form.inquiry_options.partnership')}</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-lush/60 ml-1">{t('contact.form.special_requirements')}</label>
                      <textarea 
                        rows="5" 
                        className="w-full bg-sand/40 border-none rounded-[2rem] px-6 py-5 text-sm focus:ring-2 focus:ring-lush outline-none resize-none text-volcanic font-medium" 
                        placeholder={t('contact.form.special_placeholder')}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === "sending"}
                      className="w-full bg-volcanic hover:bg-lush text-white font-black py-7 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-6 uppercase text-[11px] tracking-[0.5em] group disabled:opacity-70"
                    >
                      {formStatus === "sending" ? t('common.sending') : t('contact.form.submit')}
                      <Send className={`w-4 h-4 transition-transform duration-500 ${formStatus === "sending" ? "animate-pulse" : "group-hover:translate-x-2 group-hover:-translate-y-1"}`} />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-10">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white relative"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.467385551323!2d9.1666!3d4.0167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDEnMDAuMCJOIDnCsDEwJzAwLjAiRQ!5e0!3m2!1sen!2scm!4v1700000000000!5m2!1sen!2scm" 
                  className="w-full h-full border-0 grayscale contrast-125"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                <div className="absolute bottom-6 left-6 right-6 bg-volcanic/95 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-3">
                    <MapPin className="text-lush w-5 h-5" />
                    <p className="text-white font-black text-[10px] uppercase tracking-[0.3em]">{t('contact.info.address_title')}</p>
                  </div>
                  <p className="text-white/80 text-base font-serif italic leading-relaxed">
                    {t('contact.info.address')}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2.5rem] bg-lush text-white shadow-2xl relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <Shield className="text-lush w-6 h-6" />
                    <h4 className="font-serif italic text-2xl text-white">{t('contact.info.secure_title')}</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed text-white/70 uppercase tracking-[0.3em] font-bold">
                    {t('contact.info.secure_desc')}
                  </p>
                </div>
                <Globe className="absolute -right-10 -bottom-10 w-40 h-40 text-white/5 group-hover:text-white/10 transition-colors duration-700" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactCard label={t('contact.info.concierge')} value={t('contact.info.concierge_email')} />
                <ContactCard label={t('contact.info.foundation')} value={t('contact.info.foundation_email')} />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FormInput({ label, type = "text", placeholder }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-lush/60 ml-1">{label}</label>
      <input type={type} required className="w-full bg-sand/40 border-none rounded-2xl px-6 py-5 text-sm focus:ring-2 focus:ring-lush transition-all outline-none text-volcanic font-medium" placeholder={placeholder} />
    </div>
  );
}

function ContactCard({ label, value }) {
  return (
    <div className="p-8 bg-white rounded-[2rem] border border-sand shadow-sm hover:shadow-md transition-shadow">
      <span className="block text-[10px] uppercase tracking-widest text-lush font-black mb-3">{label}</span>
      <p className="text-sm font-serif text-ocean break-all">{value}</p>
    </div>
  );
}
```

---

### File: `src/pages/Dining.jsx`

**Size:** 11179 bytes  
```jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { Search, Coffee, UtensilsCrossed, Wine, Cookie, Sparkles, Leaf, X } from "lucide-react";

export default function Dining() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilters, setDietaryFilters] = useState({
    vegan: false,
    "gluten-free": false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", label: t('dining.filters.all'), icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: "appetizers", label: t('dining.filters.appetizers'), icon: <Sparkles className="w-4 h-4" /> },
    { id: "mains", label: t('dining.filters.mains'), icon: <Coffee className="w-4 h-4" /> },
    { id: "desserts", label: t('dining.filters.desserts'), icon: <Cookie className="w-4 h-4" /> },
    { id: "drinks", label: t('dining.filters.drinks'), icon: <Wine className="w-4 h-4" /> },
  ];

  const menuItems = t('dining.menuItems', { returnObjects: true });

  const handleCategoryChange = (categoryId) => {
    setFilter(categoryId);
    setSearchQuery("");
  };

  const toggleDietary = (diet) => {
    setDietaryFilters((prev) => ({ ...prev, [diet]: !prev[diet] }));
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (filter !== "all" && item.category !== filter) return false;

      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      const activeDiets = Object.keys(dietaryFilters).filter((d) => dietaryFilters[d]);
      if (activeDiets.length > 0) {
        return activeDiets.some((diet) => item.dietary.includes(diet));
      }

      return true;
    });
  }, [filter, searchQuery, dietaryFilters, menuItems]);

  return (
    <div className="min-h-screen bg-sand/30">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">
              {t('dining.section_tag')}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
              {t('dining.title')} <br />
              <span className="italic text-lush">{t('dining.title_italic')}</span>
            </h1>
            <p className="text-volcanic/70 text-xl max-w-2xl leading-relaxed">
              {t('dining.description')}
            </p>
          </motion.div>
        </section>

        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all ${
                    filter === cat.id
                      ? "bg-lush border-lush text-volcanic font-bold"
                      : "bg-white border-sand/60 text-volcanic/70 hover:border-lush/50"
                  }`}
                >
                  {cat.icon}
                  <span className="text-xs uppercase tracking-wider">{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic/40" />
                <input
                  type="text"
                  placeholder={t('dining.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-sand/60 bg-white text-volcanic placeholder:text-volcanic/40 focus:outline-none focus:border-lush"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-sand/60 bg-white text-volcanic/70 hover:border-lush"
              >
                <Leaf className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">{t('dining.filters.dietary')}</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-6 bg-white rounded-2xl border border-sand/60 flex flex-wrap gap-4">
                  <span className="text-sm font-bold text-volcanic/60 uppercase tracking-wider">Filter by:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietaryFilters.vegan}
                      onChange={() => toggleDietary("vegan")}
                      className="w-4 h-4 text-lush border-sand rounded focus:ring-lush"
                    />
                    <span className="text-sm">{t('dining.filters.vegan')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietaryFilters["gluten-free"]}
                      onChange={() => toggleDietary("gluten-free")}
                      className="w-4 h-4 text-lush border-sand rounded focus:ring-lush"
                    />
                    <span className="text-sm">{t('dining.filters.gluten_free')}</span>
                  </label>
                  {(dietaryFilters.vegan || dietaryFilters["gluten-free"]) && (
                    <button
                      onClick={() => setDietaryFilters({ vegan: false, "gluten-free": false })}
                      className="ml-auto text-volcanic/50 hover:text-lush"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="container mx-auto px-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-volcanic/50 text-lg">{t('dining.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-sand/50 shadow-sm hover:shadow-2xl transition-all"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-volcanic/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        {item.dietary.includes("vegan") && (
                          <span className="bg-lush/90 backdrop-blur-sm text-volcanic text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Vegan</span>
                        )}
                        {item.dietary.includes("gluten-free") && (
                          <span className="bg-lush/90 backdrop-blur-sm text-volcanic text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">GF</span>
                        )}
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-serif text-volcanic group-hover:text-lush transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-lush font-serif text-lg">{item.price.toLocaleString()} XAF</span>
                      </div>
                      <p className="text-volcanic/60 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        <section className="container mx-auto px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-volcanic rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, #7aa65a 2px, transparent 2px)`,
              backgroundSize: '40px 40px'
            }} />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif mb-6 italic">{t('dining.chef_note_title')}</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {t('dining.chef_note_quote')}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-px bg-lush/50" />
                <span className="text-lush font-bold uppercase tracking-widest text-xs">{t('dining.chef_note_signature')}</span>
                <div className="w-12 h-px bg-lush/50" />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

---

### File: `src/pages/GalleryPage.jsx`

**Size:** 7743 bytes  
```jsx
import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { galleryData } from "../data/galleryData";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(galleryData.map((item) => item.category))];
  }, []);

  const filteredImages = useMemo(() => {
    return activeCategory === "All"
      ? galleryData
      : galleryData.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setSelectedIndex(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      
      <header className="container mx-auto pt-20 pb-12 text-center lg:max-w-5xl">
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]"
        >
          Visual Legacy
        </motion.span>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-serif mt-6 text-volcanic tracking-tight"
        >
          Visualize the <span className="italic text-lush">Legacy.</span>
        </motion.h1>
      </header>

      {/* STICKY CATEGORY NAV */}
      <nav className="sticky top-[70px] z-40 bg-sand/80 backdrop-blur-md border-y border-volcanic/5 mb-12">
        <div className="container mx-auto overflow-x-auto no-scrollbar py-4 px-6 flex justify-start md:justify-center items-center gap-8 md:gap-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative whitespace-nowrap text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                activeCategory === cat ? "text-lush" : "text-volcanic/40 hover:text-volcanic"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-lush"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

     {/* 4-COLUMN GRID SECTION */}
      <main className="container mx-auto pb-32 lg:max-w-[1440px]">
        <LayoutGroup>
          <motion.div 
            layout
            /* Changed to lg:grid-cols-4 for smaller, tighter desktop view */
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((item, index) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedIndex(index)}
                  className="cursor-pointer group relative"
                >
                  {/* Tighter aspect ratio for 4-column layout */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-volcanic/5 border border-volcanic/5 shadow-sm transition-transform duration-500 group-hover:scale-[1.03]">
                    
                    <div className="w-full h-full">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-volcanic/90 via-volcanic/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                       <span className="text-lush font-black uppercase tracking-[0.3em] text-[8px] mb-1">
                         {item.category}
                       </span>
                       <h3 className="text-white text-lg font-serif italic leading-tight">
                         {item.title}
                       </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </main>

      {/* Lightbox remains full-screen for detailed viewing */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox 
            images={filteredImages} 
            index={selectedIndex} 
            setIndex={setSelectedIndex} 
            close={() => setSelectedIndex(null)} 
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function Lightbox({ images, index, setIndex, close }) {
  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-volcanic/98 backdrop-blur-2xl flex items-center justify-center touch-none"
    >
      <button 
        onClick={close}
        className="absolute top-6 right-6 z-[110] text-white/50 hover:text-lush transition-all p-3 bg-white/5 rounded-full"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      <div className="hidden md:flex absolute inset-x-8 justify-between items-center pointer-events-none">
        <button onClick={prev} className="pointer-events-auto p-4 text-white/20 hover:text-white transition-all bg-white/10 rounded-full">
          <ChevronLeft size={32} strokeWidth={1} />
        </button>
        <button onClick={next} className="pointer-events-auto p-4 text-white/20 hover:text-white transition-all bg-white/10 rounded-full">
          <ChevronRight size={32} strokeWidth={1} />
        </button>
      </div>

      <div className="relative w-full max-w-5xl h-[80vh] px-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="w-full h-full flex flex-col items-center"
          >
            <img 
              src={images[index].image} 
              alt={images[index].title}
              className="w-full h-full object-contain"
            />
            <div className="mt-8 text-center">
              <h3 className="text-white text-2xl font-serif italic">{images[index].title}</h3>
              <p className="text-lush font-black uppercase tracking-[0.4em] text-[9px] mt-2">
                {images[index].category}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
```

---

### File: `src/pages/Home.jsx`

**Size:** 1407 bytes  
```jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ImpactSection from "../components/sections/ImpactSection";
import Infrastructure from "../components/sections/Infrastructure"; 
import Cultinary from "../components/sections/Cultinary"; 
import Suites from "../components/sections/Suites"; 
import GalleryPreview from "../components/sections/GalleryPreview"; 
import Parnershtips from "../components/sections/Partnerships"; 
import Footer from "../components/sections/Footer";
import Testimonials from "../components/sections/Testimonials";
import Principles from "../components/sections/Principles";
import Facilities from "../components/sections/Facilities";
import Values from "../components/sections/Values";
import ServiceGrid from "../components/sections/ServiceGrid";
import OceanSide from "../components/sections/OceanSide";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-ocean selection:text-white bg-sand">
      <Navbar />
      
      <Hero />
      <ImpactSection />
      <Values />
      <Principles />
      <Infrastructure />

      {/* Abstracted Service Section with Diplomat's phrasing */}
      <ServiceGrid />

      <Facilities />

      <OceanSide />

      <Cultinary />
      <Suites />
      <GalleryPreview />
      <Testimonials />
      <Parnershtips />
      
      <Footer />
    </div>
  );
}
```

---

### File: `src/pages/OurStory.jsx`

**Size:** 14458 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useTranslation, Trans } from 'react-i18next';
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import fisiy from "../assets/general/doctorfisiy.jpg"
import { ArrowRight, Star, Globe, Shield, Leaf, Eye, Heart, User, Award, ExternalLink, Home, Briefcase, HandHeart } from "lucide-react";

export default function OurStory() {
  const { t } = useTranslation();
  const milestones = t('our_story.milestones.items', { returnObjects: true });
  const programs = t('our_story.programs.programs', { returnObjects: true });
  const philosophyCards = t('our_story.philosophy.cards', { returnObjects: true });

  return (
    <div className="flex flex-col min-h-screen bg-sand/20">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 items-center gap-16 z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px] mb-6 block">
                {t('our_story.hero.tag')}
              </span>
              <h1 className="text-5xl md:text-8xl font-serif text-volcanic leading-[1.05] mb-10 tracking-tight">
                {t('our_story.hero.title')} <br /> <span className="italic text-lush">{t('our_story.hero.title_italic')}</span>
              </h1>
              <p className="text-volcanic/80 text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-8">
                {t('our_story.hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/contact"
                  className="group relative flex items-center justify-center bg-volcanic text-white px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em]">{t('our_story.hero.button')}</span>
                  <div className="absolute inset-0 bg-lush translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200"
                className="w-full h-full object-cover"
                alt="Ngeme Resort Aerial View"
              />
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-1/4 h-full bg-sand/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
        </section>

        {/* IMPACT NUMBERS */}
        <section className="py-20 bg-volcanic text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              <StatCard value={t('our_story.impact_stats.title')} label={t('our_story.impact_stats.label')} detail={t('our_story.impact_stats.detail')} />
              <StatCard value={t('our_story.impact_stats.jobs')} label={t('our_story.impact_stats.jobs_label')} detail={t('our_story.impact_stats.jobs_detail')} />
              <StatCard value={t('our_story.impact_stats.scholarships')} label={t('our_story.impact_stats.scholarships_label')} detail={t('our_story.impact_stats.scholarships_detail')} />
              <StatCard value={t('our_story.impact_stats.mangroves')} label={t('our_story.impact_stats.mangroves_label')} detail={t('our_story.impact_stats.mangroves_detail')} />
            </div>
            <p className="text-white/40 text-center text-sm max-w-2xl mx-auto mt-16 italic">
              Ngeme exists to make luxury meaningful, by reinvesting in the communities that welcome you.
            </p>
          </div>
        </section>

        {/* THE VISION */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">{t('our_story.vision.tag')}</span>
              <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">{t('our_story.vision.title')}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
              <VisionCard icon={<Eye className="w-12 h-12 text-lush mb-8" />} title={t('our_story.vision.resort_title')} desc={t('our_story.vision.resort_desc')} />
              <VisionCard icon={<Heart className="w-12 h-12 text-lush mb-8" />} title={t('our_story.vision.foundation_title')} desc={t('our_story.vision.foundation_desc')} />
            </div>
          </div>
        </section>

        {/* FOUNDER'S STORY */}
        <section className="py-32 bg-sand/10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">{t('our_story.founder.tag')}</span>
              <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">{t('our_story.founder.name')}</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30">
                  <img
                    src={fisiy}
                    alt="Dr. Cyprian F. Fisiy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-lush text-volcanic p-6 rounded-full shadow-xl">
                  <Award className="w-8 h-8" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg text-volcanic/80"
              >
                <Trans i18nKey="our_story.founder.bio" components={{ span: <span className="text-2xl font-serif text-lush" /> }} />
                <div className="flex items-center gap-4 text-volcanic mt-6">
                  <div className="w-12 h-px bg-lush/50" />
                  <span className="text-sm font-bold uppercase tracking-widest">{t('our_story.founder.signature')}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROGRAMS */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">{t('our_story.programs.tag')}</span>
              <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">{t('our_story.programs.title')}</h2>
              <p className="text-volcanic/60 text-lg max-w-2xl mx-auto mt-6">
                {t('our_story.programs.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {programs.map((program, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-sand/5 p-10 rounded-[2rem] border border-sand/50 hover:shadow-xl transition-all"
                >
                  <div className="mb-8 p-4 bg-lush/10 rounded-2xl inline-block">
                    {i === 0 && <Home className="w-8 h-8 text-lush" />}
                    {i === 1 && <Briefcase className="w-8 h-8 text-lush" />}
                    {i === 2 && <HandHeart className="w-8 h-8 text-lush" />}
                  </div>
                  <h3 className="text-2xl font-serif text-volcanic mb-4">{program.title}</h3>
                  <p className="text-volcanic/70 leading-relaxed mb-8">
                    {program.description}
                  </p>
                  <a 
                    href={program.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lush font-medium hover:text-volcanic transition-colors group"
                  >
                    <span>{program.link_text}</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MILESTONES TIMELINE */}
        <section className="py-32 bg-sand/10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">{t('our_story.milestones.tag')}</span>
              <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">{t('our_story.milestones.title')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -15 }}
                  className="relative group bg-volcanic rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-volcanic via-volcanic/40 to-transparent" />
                  
                  <div className="absolute bottom-0 p-8 text-white w-full">
                    <span className="text-lush font-serif text-5xl block mb-4 italic">{item.year}</span>
                    <h4 className="text-2xl font-serif mb-4 tracking-wide">{item.title}</h4>
                    <p className="text-sm text-white/70 leading-relaxed font-light group-hover:text-white transition-colors duration-300 line-clamp-6">
                      {item.fullStory}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-24">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-6xl font-serif text-volcanic mb-10 leading-tight">
                  {t('our_story.philosophy.title')} <br /><span className="italic text-lush">{t('our_story.philosophy.title_italic')}</span>
                </h2>
                <p className="text-volcanic/70 leading-relaxed text-xl font-medium mb-8">
                  {t('our_story.philosophy.description')}
                </p>
                <p className="text-volcanic/60 leading-relaxed text-lg font-light">
                  {t('our_story.philosophy.subdescription')}
                </p>
              </div>

              <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
                {philosophyCards.map((card, i) => (
                  <PhilosophyCard key={i} icon={i === 0 ? <Shield className="text-lush w-6 h-6" /> : i === 1 ? <Leaf className="text-lush w-6 h-6" /> : i === 2 ? <Globe className="text-lush w-6 h-6" /> : <Star className="text-lush w-6 h-6" />} title={card.title} desc={card.desc} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

// Helper components
function StatCard({ value, label, detail }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center group"
    >
      <div className="text-5xl md:text-6xl font-serif text-lush mb-3 group-hover:scale-110 transition-transform duration-500">{value}</div>
      <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{label}</div>
      <p className="text-white/20 text-xs max-w-[150px] mx-auto leading-relaxed">{detail}</p>
    </motion.div>
  );
}

function VisionCard({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-sand/5 p-12 rounded-[3rem] border border-sand/30"
    >
      {icon}
      <h3 className="text-3xl font-serif text-volcanic mb-6">{title}</h3>
      <p className="text-volcanic/70 text-lg leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function PhilosophyCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-sand/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-serif text-volcanic mb-4">{title}</h3>
      <p className="text-sm text-volcanic/60 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}
```

---

### File: `src/pages/Section.jsx`

**Size:** 8897 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { ArrowUpRight, Waves, Wind, Leaf, Mic2, Utensils, PlaneTakeoff, Car, Compass, BookOpen, Wifi, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const services = t('services.service_list', { returnObjects: true });

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero Header */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block"
            >
              {t('services.hero.tag')}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-8xl font-serif text-volcanic leading-tight mb-8"
            >
              {t('services.hero.title')} <span className="italic text-lush">{t('services.hero.title_italic')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-volcanic/70 text-xl max-w-2xl leading-relaxed"
            >
              {t('services.hero.description')}
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-sand/50 shadow-lg hover:shadow-2xl transition-all duration-500 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-lush/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-volcanic/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-lush shadow-lg">
                    {/* Icon placeholder - we could map based on id */}
                    {service.id === 'intellectual-talks' && <Mic2 className="w-8 h-8" />}
                    {service.id === 'dining' && <Utensils className="w-8 h-8" />}
                    {service.id === 'transfers' && <PlaneTakeoff className="w-8 h-8" />}
                    {service.id === 'expeditions' && <Compass className="w-8 h-8" />}
                    {service.id === 'fleet' && <Car className="w-8 h-8" />}
                    {service.id === 'library' && <BookOpen className="w-8 h-8" />}
                  </div>
                </div>

                <div className="p-10 relative z-20">
                  <span className="text-lush font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
                    {service.category}
                  </span>
                  <h3 className="text-2xl font-serif text-volcanic mb-4 group-hover:text-lush transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-volcanic/60 leading-relaxed text-sm mb-8">
                    {service.description}
                  </p>
                  
                  <Link 
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-volcanic font-black uppercase tracking-widest text-[9px] border-b border-lush pb-2 group-hover:gap-4 transition-all group-hover:text-lush"
                  >
                    {t('common.learn_more')} <ArrowUpRight className="w-4 h-4 text-lush group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bespoke Concierge Section */}
        <section className="container mx-auto px-6 mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-volcanic rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px), 
                                radial-gradient(circle at 80% 70%, #7aa65a 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
            
            <div className="absolute top-0 right-0 opacity-10">
              <Waves className="w-96 h-96 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 opacity-10 rotate-12">
              <Wind className="w-80 h-80 text-lush/30" />
            </div>
            <div className="absolute top-1/2 left-1/4 opacity-5">
              <Leaf className="w-40 h-40 text-lush" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                {t('services.bespoke.title')}
              </h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                {t('services.bespoke.description')}
              </p>
              <button onClick={() => navigate('/contact')} className="bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-white hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                {t('services.bespoke.button')}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Service Philosophy */}
        <section className="container mx-auto px-6 mt-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
                {t('services.philosophy.tag')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">
                {t('services.philosophy.title')} <span className="italic text-lush">{t('services.philosophy.title_italic')}</span>
              </h2>
              <p className="text-volcanic/70 text-lg leading-relaxed">
                {t('services.philosophy.description')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand/40 text-center">
                <Wifi className="w-8 h-8 text-lush mx-auto mb-4" />
                <div className="text-2xl font-serif text-volcanic">{t('services.philosophy.badges.wifi')}</div>
                <div className="text-xs text-volcanic/50 uppercase tracking-wider">{t('services.philosophy.badges.wifi_sub')}</div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand/40 text-center">
                <ShieldCheck className="w-8 h-8 text-lush mx-auto mb-4" />
                <div className="text-2xl font-serif text-volcanic">{t('services.philosophy.badges.security')}</div>
                <div className="text-xs text-volcanic/50 uppercase tracking-wider">{t('services.philosophy.badges.security_sub')}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

---

## Directory: `src/pages/services`

### File: `src/pages/services/AtlanticGastronomy.jsx`

**Size:** 8917 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { ChefHat, Clock, MapPin, ArrowRight, Sun, Sunset, Moon } from "lucide-react";

export default function AtlanticGastronomy() {
  const { t } = useTranslation();
  const page = t('service_pages.atlantic_gastronomy', { returnObjects: true });
  const { hero, experiences_title, experiences_sub, experiences, menu_title, menu_sub, menuHighlights, view_full_menu, chef_table, testimonials_title, testimonials, cta_title, cta_sub, cta_button } = page;

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">{hero.tag}</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">{hero.title}</h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">{hero.description}</p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">{hero.subdescription}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.hours}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200"
                alt="Gourmet dining"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcanic/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <ChefHat className="text-lush w-8 h-8 mb-2" />
                <p className="text-xl font-serif italic">"{hero.chef_quote}"</p>
                <p className="text-white/70 mt-2">{hero.chef_name}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dining Experiences */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">{experiences_title}</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">{experiences_sub}</p>
            <div className="grid md:grid-cols-3 gap-8">
              {experiences.map((exp, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">
                      {idx === 0 && <Sun className="w-6 h-6" />}
                      {idx === 1 && <Sunset className="w-6 h-6" />}
                      {idx === 2 && <Moon className="w-6 h-6" />}
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-volcanic mb-2">{exp.title}</h3>
                  <p className="text-volcanic/60">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Highlights */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">{menu_title}</h2>
          <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">{menu_sub}</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {menuHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-sand/40 flex justify-between items-start gap-4"
              >
                <div>
                  <h3 className="text-xl font-serif text-volcanic mb-1">{item.name}</h3>
                  <p className="text-volcanic/60 text-sm">{item.description}</p>
                </div>
                <span className="text-lush font-serif text-lg whitespace-nowrap">{item.price.toLocaleString()} XAF</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/dining/menu" className="inline-flex items-center gap-2 text-lush font-bold uppercase tracking-wider text-sm hover:gap-3 transition-all">
              {view_full_menu} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Chef's Table */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{chef_table.title}</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">{chef_table.description}</p>
                <ul className="space-y-3 text-white/80">
                  {chef_table.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-lush w-5 h-5 mt-1 flex-shrink-0">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                  {chef_table.button}
                </button>
              </div>
              <div className="h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0f?auto=format&fit=crop&q=80&w=800" 
                  alt="Chef's table"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">{testimonials_title}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-sand/40">
                <div className="flex text-lush mb-4">{"★".repeat(5)}</div>
                <p className="text-volcanic/80 italic mb-4">"{t.quote}"</p>
                <p className="text-volcanic/60 font-bold">{t.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{cta_title}</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">{cta_sub}</p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              {cta_button} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

---

### File: `src/pages/services/DiplomaticTransfers.jsx`

**Size:** 5983 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { PlaneTakeoff, Car, Shield, Clock, MapPin, Wifi, Coffee, ArrowRight } from "lucide-react";

export default function DiplomaticTransfers() {
  const { t } = useTranslation();
  const page = t('service_pages.diplomatic_transfers', { returnObjects: true });
  const { hero, features_title, features_sub, features, fleet_title, vehicles, testimonials_title, testimonials, cta_title, cta_sub, cta_button } = page;

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">{hero.tag}</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">{hero.title}</h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">{hero.description}</p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">{hero.subdescription}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <PlaneTakeoff className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.hours}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury car"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Fleet Features */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">{features_title}</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">{features_sub}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feat, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">
                      {idx === 0 && <Shield className="w-6 h-6" />}
                      {idx === 1 && <Clock className="w-6 h-6" />}
                      {idx === 2 && <Wifi className="w-6 h-6" />}
                      {idx === 3 && <Coffee className="w-6 h-6" />}
                    </div>
                  </div>
                  <p className="text-volcanic/80 font-medium">{feat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Options */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-12 text-center">{fleet_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {vehicles.map((vehicle, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-sand/40">
                <img src={vehicle.image} alt={vehicle.name} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-serif text-volcanic mb-2">{vehicle.name}</h3>
                  <p className="text-volcanic/60">Capacity: {vehicle.capacity} passengers</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">{testimonials_title}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-sand/40">
                <p className="text-volcanic/80 italic mb-4">"{t.quote}"</p>
                <p className="text-volcanic/60 font-bold">{t.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{cta_title}</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">{cta_sub}</p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              {cta_button} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

---

### File: `src/pages/services/FisiyLibrary.jsx`

**Size:** 7411 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { BookOpen, Search, Globe, Clock, Users, Award, ArrowRight, BookMarked } from "lucide-react";

export default function FisiyLibrary() {
  const { t } = useTranslation();
  const page = t('service_pages.fisiy_library', { returnObjects: true });
  const { hero, collection_title, collection_sub, collection_highlights, services_title, services, residency, cta_title, cta_sub, cta_button } = page;

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">{hero.tag}</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">{hero.title}</h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">{hero.description}</p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">{hero.subdescription}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Clock className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.audience}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200"
                alt="Library interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Collection Highlights */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">{collection_title}</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">{collection_sub}</p>
            <div className="grid md:grid-cols-4 gap-8">
              {collection_highlights.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">
                      {idx === 0 && <BookOpen className="w-8 h-8" />}
                      {idx === 1 && <BookMarked className="w-8 h-8" />}
                      {idx === 2 && <BookOpen className="w-8 h-8" />}
                      {idx === 3 && <Award className="w-8 h-8" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-serif text-volcanic mb-1">{item.title}</h3>
                  <p className="text-lush font-bold">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Library Services */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-12 text-center">{services_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-sand/40 text-center"
              >
                <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-lush">
                    {idx === 0 && <Search className="w-6 h-6" />}
                    {idx === 1 && <Globe className="w-6 h-6" />}
                    {idx === 2 && <Users className="w-6 h-6" />}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-volcanic mb-2">{s.title}</h3>
                <p className="text-volcanic/60">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Residency Info */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{residency.title}</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">{residency.description}</p>
                <ul className="space-y-3 text-white/80">
                  {residency.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <button className="mt-8 bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                  {residency.button}
                </button>
              </div>
              <div className="h-[300px] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" 
                  alt="Reading room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{cta_title}</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">{cta_sub}</p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              {cta_button} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

---

### File: `src/pages/services/IntellectualTalk.jsx`

**Size:** 16889 bytes  
```jsx


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { Mic2, Calendar, Users, MapPin, Star, ArrowRight, Quote, Youtube, Play, X, Clock, BookOpen, Globe, Award, Eye } from "lucide-react";

export default function IntellectualTalks() {
  const { t } = useTranslation();
  const page = t('service_pages.intellectual_talks', { returnObjects: true });
  const { hero, experience_title, experience_sub, experience_features, past_talks_title, past_talks_sub, upcoming_title, upcoming_sub, upcoming_events, free_note, why_title, why_text, why_text2, why_text3, stats, cta_title, cta_sub, cta_button, youtube_button } = page;

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAllTalks, setShowAllTalks] = useState(false);

  const pastTalks = t('service_pages.intellectual_talks.pastTalks', { returnObjects: true }) || [];
  const displayedTalks = showAllTalks ? pastTalks : pastTalks.slice(0, 3);

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">{hero.tag}</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">{hero.title}</h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">{hero.description}</p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">{hero.subdescription}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.schedule}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.archive}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://www.goodthingsguy.com/wp-content/uploads/2023/02/1677225977116.jpeg"
                alt="Intellectual Talk"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcanic/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-lush font-bold text-sm mb-2">FEATURED MOMENT</p>
                <p className="text-xl font-serif italic">"{hero.featured_quote}"</p>
                <p className="text-white/70 mt-2">{hero.featured_speaker}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Experience */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6 text-center">{experience_title}</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-3xl mx-auto mb-12">{experience_sub}</p>
            <div className="grid md:grid-cols-3 gap-8">
              {experience_features.map((feat, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    {idx === 0 && <Users className="w-8 h-8 text-lush" />}
                    {idx === 1 && <Globe className="w-8 h-8 text-lush" />}
                    {idx === 2 && <BookOpen className="w-8 h-8 text-lush" />}
                  </div>
                  <h3 className="text-xl font-serif text-volcanic mb-3">{feat.title}</h3>
                  <p className="text-volcanic/60">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Talks */}
        <section className="container mx-auto px-6 mb-20">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic">{past_talks_title}</h2>
              <p className="text-volcanic/60 text-lg mt-2">{past_talks_sub}</p>
            </div>
            {pastTalks.length > 3 && (
              <button onClick={() => setShowAllTalks(!showAllTalks)} className="flex items-center gap-2 text-lush font-bold uppercase tracking-wider text-sm hover:gap-3 transition-all">
                {showAllTalks ? t('service_pages.intellectual_talks.show_less') : t('service_pages.intellectual_talks.view_all')} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {pastTalks.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-16 text-center border border-sand/40">
              <Youtube className="w-16 h-16 text-lush/30 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-volcanic mb-3">{t('service_pages.intellectual_talks.coming_soon.title')}</h3>
              <p className="text-volcanic/50 text-lg max-w-md mx-auto mb-6">{t('service_pages.intellectual_talks.coming_soon.description')}</p>
              <button className="bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                {t('common.get_notified')}
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedTalks.map((talk, idx) => (
                  <motion.div
                    key={talk.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-sand/40 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                    onClick={() => setSelectedVideo(talk)}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img src={talk.image} alt={talk.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-volcanic/30 group-hover:bg-volcanic/50 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-lush rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-volcanic ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {talk.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lush text-xs font-bold">{talk.date}</span>
                        <span className="text-volcanic/30">•</span>
                        <span className="text-volcanic/50 text-xs">{talk.views} views</span>
                      </div>
                      <h3 className="text-xl font-serif text-volcanic mb-2 line-clamp-2">{talk.title}</h3>
                      <p className="text-volcanic/70 font-medium mb-1">{talk.speaker}</p>
                      <p className="text-volcanic/50 text-sm mb-4">{talk.speakerTitle}</p>
                      <p className="text-volcanic/60 text-sm line-clamp-3">{talk.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {!showAllTalks && pastTalks.length > 3 && (
                <div className="text-center mt-12">
                  <button onClick={() => setShowAllTalks(true)} className="inline-flex items-center gap-2 bg-volcanic text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-lush transition-colors">
                    {t('service_pages.intellectual_talks.load_all', { count: pastTalks.length })} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Upcoming Events */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 text-center">{upcoming_title}</h2>
              <p className="text-white/60 text-lg text-center max-w-2xl mx-auto mb-12">{upcoming_sub}</p>
              <div className="space-y-4 max-w-3xl mx-auto">
                {upcoming_events.map((event, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-white/20">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-lush font-bold text-sm">{event.date}</span>
                      </div>
                      <h3 className="text-xl font-serif text-white mb-1">{event.topic}</h3>
                      <p className="text-white/70">with {event.speaker}</p>
                    </div>
                    <button className="bg-lush text-volcanic px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap">
                      {t('common.reserve_seat')}
                    </button>
                  </motion.div>
                ))}
              </div>
              <p className="text-white/40 text-center mt-8 text-sm max-w-2xl mx-auto">{free_note}</p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">{t('service_pages.intellectual_talks.why_title')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{why_title}</h2>
              <p className="text-volcanic/70 text-lg leading-relaxed mb-6">{why_text}</p>
              <p className="text-volcanic/70 text-lg leading-relaxed mb-6">{why_text2}</p>
              <p className="text-volcanic/70 text-lg leading-relaxed">{why_text3}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Award className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">{stats.talks}</div>
                <div className="text-xs text-volcanic/50">{stats.talks_label}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Users className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">{stats.attendees}</div>
                <div className="text-xs text-volcanic/50">{stats.attendees_label}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Globe className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">{stats.countries}</div>
                <div className="text-xs text-volcanic/50">{stats.countries_label}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Youtube className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">{stats.views}</div>
                <div className="text-xs text-volcanic/50">{stats.views_label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{cta_title}</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">{cta_sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                {cta_button} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://youtube.com/@ngemeresort" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border-2 border-volcanic text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                <Youtube className="w-4 h-4" /> {youtube_button}
              </a>
            </div>
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-volcanic/80 backdrop-blur-lg" onClick={() => setSelectedVideo(null)}>
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[2rem] max-w-4xl w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 bg-volcanic text-white p-2 rounded-full hover:bg-lush transition-colors"><X className="w-5 h-5" /></button>
                  <div className="relative pt-[56.25%] bg-black">
                    <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`} title={selectedVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-volcanic mb-2">{selectedVideo.title}</h3>
                    <p className="text-lush font-medium mb-1">{selectedVideo.speaker}</p>
                    <p className="text-volcanic/50 text-sm mb-4">{selectedVideo.date} • {selectedVideo.duration}</p>
                    <p className="text-volcanic/70">{selectedVideo.description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
```

---

### File: `src/pages/services/PremiumFleet.jsx`

**Size:** 5359 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { Car, Users, Map, ArrowRight } from "lucide-react";

export default function PremiumFleet() {
  const { t } = useTranslation();
  const page = t('service_pages.premium_fleet', { returnObjects: true });
  const { hero, fleet_title, fleet_sub, vehicles, services_title, services, cta_title, cta_sub, cta_button } = page;

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">{hero.tag}</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">{hero.title}</h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">{hero.description}</p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">{hero.subdescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury SUV"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Vehicle Grid */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">{fleet_title}</h2>
          <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">{fleet_sub}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {vehicles.map((v, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-2xl overflow-hidden border border-sand/40">
                <img src={v.image} alt={v.name} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-serif text-volcanic mb-1">{v.name}</h3>
                  <p className="text-lush text-sm mb-3">{v.type} • {v.capacity} seats</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {v.features.map((f, i) => (
                      <span key={i} className="bg-sand/30 text-volcanic/70 text-xs px-2 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                  <button className="text-lush font-bold uppercase tracking-wider text-xs flex items-center gap-1 group">
                    {t('common.view_details')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Service Options */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-sand/40">
            <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">{services_title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((s, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">
                      {idx === 0 && <Car className="w-6 h-6" />}
                      {idx === 1 && <Users className="w-6 h-6" />}
                      {idx === 2 && <Map className="w-6 h-6" />}
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-volcanic mb-2">{s.title}</h3>
                  <p className="text-volcanic/60">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{cta_title}</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">{cta_sub}</p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              {cta_button} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

---

### File: `src/pages/services/VolcanicExpeditions.jsx`

**Size:** 7390 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { Compass, Mountain, Camera, Map, Users, Calendar, ArrowRight, Shield } from "lucide-react";

const expeditions = [
  { title: "Summit Mount Cameroon", difficulty: "Challenging", duration: "2 days", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" },
  { title: "Bimbia Slave Trade Route", difficulty: "Easy", duration: "4 hours", image: "https://images.unsplash.com/photo-1596649299486-4cdea56fd59d?auto=format&fit=crop&q=80&w=600" },
  { title: "Crater Lakes Hike", difficulty: "Moderate", duration: "6 hours", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600" },
];

const guides = [
  { name: "Emmanuel N.", specialty: "Volcanology & Birding", experience: "12 years", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  { name: "Jeannette M.", specialty: "Cultural History", experience: "8 years", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
];

export default function VolcanicExpeditions() {
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Exploration</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Volcanic <span className="italic text-lush">Expeditions</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                Step beyond the resort and into the heart of Cameroon’s geological and cultural wonders. Our private guided tours take you to Mount Cameroon, the highest peak in West Africa, and the historic sites of Bimbia, where the Atlantic meets painful history and resilient memory.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                Each expedition is led by expert local guides who share not only facts but stories, of volcanic eruptions, of the slave trade, of the flora and fauna that thrive in this unique landscape.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Compass className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Private & small groups</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Safety equipment & first aid</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"
                alt="Mount Cameroon"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Expeditions Grid */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">Signature Expeditions</h2>
          <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
            Choose your adventure, each can be customized to your interests and fitness level.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {expeditions.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-sand/40"
              >
                <img src={exp.image} alt={exp.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-serif text-volcanic mb-2">{exp.title}</h3>
                  <div className="flex justify-between text-sm text-volcanic/60 mb-4">
                    <span className="flex items-center gap-1"><Map className="w-4 h-4" /> {exp.difficulty}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {exp.duration}</span>
                  </div>
                  <button className="text-lush font-bold uppercase tracking-wider text-xs flex items-center gap-1 group">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meet the Guides */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-sand/40">
            <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">Your Guides</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              {guides.map((guide, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <img src={guide.image} alt={guide.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-lush/20" />
                  <h3 className="text-xl font-serif text-volcanic">{guide.name}</h3>
                  <p className="text-lush font-medium">{guide.specialty}</p>
                  <p className="text-volcanic/60 text-sm">{guide.experience} experience</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Begin Your Journey</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Contact our expeditions team to plan your private tour. Custom itineraries available.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              Inquire About an Expedition <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

---

## Summary

- **Project scanned from:** `.`
- **Total files extracted:** 46
- **Output file:** `project_code.md`
- **Generated on:** 2026-06-07 16:08:59
