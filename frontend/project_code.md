# Project Code Documentation

**Project Root:** `.`

**Total Files:** 44

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

**Size:** 357 bytes  
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx";

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

**Size:** 7043 bytes  
```jsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "Established Excellence",
    title: "New Waves Resort",
    subtitle: "A digital nomad sanctuary for the global citizen where luxury meets a legacy of social impact.",
  },
  {
    image: "https://images.pexels.com/photos/2163074/pexels-photo-2163074.jpeg", 
    upperTitle: "The Volcanic Oasis",
    title: "Paradise away from Home",
    subtitle: "Where dreams are made and relived. Discover our Unique Stone Beach for adventurers.",
  },
  
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "The Intellectual Hub",
    title: "Digital Nomad Sanctuary",
    subtitle: "Experience the unique synergy of volcanic coastlines and professional infrastructure.",
  },
  {
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "Culinary Heritage",
    title: "Atlantic Gastronomy",
    subtitle: "Freshness redefined. Savor the spirit of Limbe through our curated dining experience.",
  },{
    // NEW SLIDE ADDED HERE
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "Executive Infrastructure",
    title: "Designed by and for Professionals",
    subtitle: "A resort engineered for those who lead. We provide the silent efficiency required for high-stakes work in a sanctuary of peace.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

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
            {/* Dark contrast gradients for legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80" />
            <div className="absolute inset-0 bg-ocean/20 mix-blend-multiply opacity-50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 h-full container mx-auto flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-7xl mt-[-5vh]">
          {/* Upper Title remains as is */}
          <motion.span
            key={`upper-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lush font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 block"
          >
            {slides[current].upperTitle}
          </motion.span>

          {/* MAIN TITLE: Drastically increased size for "Sovereign" impact */}
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
              Make a Reservation
            </button>
            <button className="w-72 sm:w-auto border border-white/40 text-white backdrop-blur-md px-12 py-5 rounded-xl font-black transition-all uppercase text-[11px] tracking-[0.3em] hover:bg-white hover:text-ocean">
              The Foundation Story
            </button>
          </div>
        </div>
      </div>

      {/* Manual Switch Controls */}
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

      {/* Decorative Wave */}
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

### File: `src/components/Navbar.jsx`

**Size:** 5548 bytes  
```jsx
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/general/logo.png";

export default function Navbar() {
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
    { name: "Home", to: "/" },
    { name: "Our Story", to: "/story" },
    { name: "Experiences", to: "/experiences" },
    { name: "Dining", to: "/services/dining" },
    { name: "Accommodations", to: "/rooms" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-ocean/5">
      <div className="container flex items-center justify-between h-20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-[70]">
          <img src={logo} alt="Ngeme Logo" className="w-12 h-12" />
          {/* <span className="text-3xl font-bold text-ocean">Ngeme</span> */}
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.to} className="nav-link">
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Action Button & Hamburger */}
        <div className="flex items-center gap-4">
          <Link to="/book" className="btn-pay py-2! px-5! text-xs md:text-sm">
            Plan Your Stay
          </Link>
          
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-volcanic/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            
            {/* Sidebar Container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
              /* inset-y-0 and h-screen ensures the background covers the full height */
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
                  <h4 className="text-ocean font-bold uppercase tracking-widest text-xs mb-4">Location</h4>
                  <p className="text-volcanic/70 text-sm leading-relaxed mb-8">
                    Down Beach, Limbe<br />
                    South West Region, Cameroon
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

**Size:** 3079 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Culinary() {
  const dishes = [
    { name: "Atlantic Chargrilled Lobster", desc: "Caught daily from the Limbe coast, infused with local herbs.", price: "To be determined" },
    { name: "Traditional Limbe Sea Bream", desc: "Slow-roasted over volcanic stone heat for authentic depth.", price: "To be determined" },
    { name: "Mt. Cameroon Garden Salad", desc: "Organic greens from the mountain foothills.", price: "To be determined" }
  ];

  return (
    <section className="container py-24 bg-white rounded-t-[3rem] -mt-12 relative z-40">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* REPLACED: Image of local coastal cuisine instead of a hamburger */}
        <div className="relative group overflow-hidden rounded-2xl">
          <img 
            src="https://buyam.co/storage/products/medium_507c6d52-0ba8-43a5-b8bd-d4ed94fd5b8a.png" 
            alt="Cameroonian Coastal Gastronomy" 
            className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ocean/10 group-hover:bg-transparent transition-colors" />
        </div>

        <div>
          <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">Gastronomy</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-volcanic">Atlantic Flavors & Local Soul</h2>
          
          <p className="text-volcanic/70 text-lg leading-relaxed mb-6">
            Our kitchen is a tribute to the Gulf of Guinea. We blend traditional Cameroonian 
            techniques with global fine-dining standards, sourcing every ingredient from 
            the local Limbe markets and our own organic gardens.
          </p>

          {/* ADDED: Diplomat's specific phrasing */}
          <div className="mb-10 space-y-2">
            <p className="text-lush font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span>✦</span> Organically sourced foods
            </p>
            <p className="text-ocean font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span>✦</span> Promoting Cooking Classes for Long-Term residents/guests
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
          
          <Link to="/dining" className="btn-outline hover:text-lush hover:outline-lush mt-12 inline-block">View Full Menu</Link>
        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/Facilities.jsx`

**Size:** 7666 bytes  
```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Sparkles, 
  Wifi, 
  ConciergeBell, 
  UtensilsCrossed, 
  ChevronRight, 
  CheckCircle2,
  ChevronDown
} from "lucide-react";

const facilityCategories = [
  {
    id: "living",
    label: "The Residency",
    icon: Home,
    items: ["Adults Only", "Private Entrance", "Hardwood Floors", "Walk-in Closet", "Soundproof/Hypoallergenic", "Air Conditioning", "Laptop Safe"]
  },
  {
    id: "wellness",
    label: "Spa & Wellness",
    icon: Sparkles,
    items: ["Hot Tub/Jacuzzi", "Spa Tub", "Bathrobes & Slippers", "Bidet", "Premium Toiletries", "Rain Shower", "Deep Soak Bathtub"]
  },
  {
    id: "tech",
    label: "Connectivity",
    icon: Wifi,
    items: ["Free High Speed Wifi", "Streaming (Netflix)", "Socket Near Bed", "Flat-screen TV", "Cable Channels", "Global Languages Spoken"]
  },
  {
    id: "concierge",
    label: "Services",
    icon: ConciergeBell,
    items: ["24-Hour Security", "Private Check-in/out", "Airport Shuttle", "Daily Housekeeping", "Laundry & Suit Press", "Free Private Parking"]
  },
  {
    id: "culinary",
    label: "Kitchen & Dining",
    icon: UtensilsCrossed,
    items: ["Full Kitchenette", "Refrigerator", "Dining Area", "Electric Kettle", "Washing Machine", "Room Service", "Landmark View Terrace"]
  }
];

export default function Facilities() {
  const [activeTab, setActiveTab] = useState("living");
  const activeCategory = facilityCategories.find(c => c.id === activeTab);

  return (
    <section className="py-24 md:py-32 bg-white border-y border-sand overflow-hidden">
      <div className="container mx-auto px-6 lg:max-w-7xl">
        
        {/* Header - REPLACED "5-Star BS" with meaningful context */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-12">
          <div className="max-w-2xl">
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
                The Infrastructure
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic leading-[1] tracking-tight mb-6">
              World-Class <br /> Amenities
            </h2>
          </div>
          
          {/* New Explanatory Text Block */}
          <div className="lg:max-w-xs border-l-2 border-lush pl-8 py-2">
            <p className="text-volcanic/80 text-sm md:text-base leading-relaxed italic font-light">
              "We provide the invisible infrastructure that allows the global mind to rest, 
              ensuring every functional detail of your stay is met with precision 
              and local warmth."
            </p>
          </div>
        </div>

        {/* --- MOBILE VIEW (Accordion Style) --- */}
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

**Size:** 5944 bytes  
```jsx
import { Link } from "react-router";
import logo from "../../assets/general/logo.png";
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Youtube, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-volcanic pt-24 pb-12 text-sand overflow-hidden relative">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 text-[12rem] font-bold text-white/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
        NEW WAVES
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:max-w-7xl">
        {/* Newsletter Section */}
        <div className="bg-lush rounded-3xl p-8 md:p-16 mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="text-white text-3xl font-serif mb-4 italic">Stay Informed</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Join our exclusive network for updates on the Ocean-Side Dialogues and Fisiy Foundation progress.
            </p>
          </div>
          
          <form className="w-full max-w-md flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your Professional Email" 
              className="w-full flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-lush transition-colors"
            />
            <button className="bg-white text-ocean hover:bg-lush hover:text-white px-8 py-4 rounded-xl font-bold transition-all uppercase text-[10px] tracking-widest whitespace-nowrap flex-shrink-0">
              Join
            </button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20 border-b border-white/10 pb-20">
          <div className="lg:col-span-2">
            {/* Branding Section */}
            <div className="flex items-center gap-4 mb-8">
              <img 
                src={logo}
                alt="New Waves Logo" 
                className="w-12 h-12 object-contain" 
              />
              <h4 className="text-white text-2xl font-serif">New Waves Resort</h4>
            </div>
            <p className="max-w-sm text-sm text-white/60 leading-relaxed mb-8">
              A premier nomadic hub and hospitality sanctuary in Limbe, Cameroon. 
              As a vehicle for the Fisiy Foundation, we believe in the power of connection and social inclusivity.
            </p>
            {/* Social Icons - Integrated for High Visibility */}
            <div className="flex gap-5">
              <SocialIcon Icon={Instagram} href="#" />
              <SocialIcon Icon={Linkedin} href="#" />
              <SocialIcon Icon={Facebook} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Youtube} href="#" />
            </div>
          </div>
          
          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">The Legacy</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/foundation" className="text-white/50 hover:text-lush transition-colors duration-300 block">Fisiy Foundation</Link></li>
              <li><Link to="/dialogues" className="text-white/50 hover:text-lush transition-colors duration-300 block">Ocean-Side Dialogues</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Concierge</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/rooms" className="text-white/50 hover:text-lush transition-colors duration-300 block">Book a Suite</Link></li>
              
              <li><Link to="/contact" className="text-white/50 hover:text-lush transition-colors duration-300 block">Direct Inquiries</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Contact</h5>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-lush shrink-0 mt-0.5" />
                <span>Limbe, South West Region, Cameroon</span>
              </li>
              <li>info@newwavesresort.com</li>
              <li>+237 000 000 000</li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
          <div className="flex items-center gap-3">
            <span className="text-lush">✦</span> 
            <span>EST. 2025</span>
            <span className="hidden md:block opacity-20">|</span>
            <span>Limbe Sanctuary</span>
          </div>
          <p>© 2026 New Waves Resort — All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors text-lush">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors text-lush">Terms of Stay</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-component for clean Social Icon rendering
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

**Size:** 3399 bytes  
```jsx
import React, { useState } from 'react';
import { galleryData } from "../../data/galleryData";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "../ui/Lightbox";
import { ArrowRight } from "lucide-react";

function GalleryPreview() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  // Slicing 8 images to perfectly fill two rows of 4 on desktop
  const previewImages = galleryData.slice(0, 8);

  return (
    <section className="bg-volcanic py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto lg:max-w-[1440px] px-6 lg:px-12">
        
        {/* Header Logic: High Contrast Pure White on Volcanic */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
              The Perspective
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white italic leading-tight tracking-tight">
              A Glimpse into <br /> Serenity
            </h2>
          </div>
          
          <Link 
            to="/gallery" 
            className="group flex items-center gap-4 text-white font-black uppercase tracking-[0.4em] text-[10px] pb-3 border-b border-lush/50 hover:border-lush transition-all duration-300"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5 text-lush group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* 4-COLUMN GRID: Naturally reduces image size for a refined look */}
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
              
              {/* Elegant Hover Overlay - High Visibility White Text */}
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

**Size:** 2262 bytes  
```jsx
// app/components/sections/ImpactSection.jsx
import { motion } from "framer-motion";
import image1 from "../../assets/general/limbehouse.jpg";

export default function ImpactSection() {
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
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-xs">Fisiy Foundation Partnership</span>
          </div>
          <h2 className="text-5xl font-serif mb-8 leading-tight text-volcanic">A Purpose-Driven Presence</h2>
          <p className="text-lg text-volcanic/80 mb-6 leading-relaxed">
            Ngeme translates to "Sun of the Sea". More than a resort, this is a center for social inclusivity. 
            As a project born from the <strong>Fisiy Foundation</strong>, your stay contributes directly to community empowerment in Cameroon.
          </p>
          <ul className="space-y-4 mb-10">
            {['Proceeds support local education', 'Socially inclusive employment', 'Sustainable ecosystem growth', 'Prepares Youth to move to Opportunity (through digital training sponsored by FFLC)'].map((text) => (
              <li key={text} className="flex items-center gap-3 text-sm font-medium text-volcanic/70">
                <span className="w-1.5 h-1.5 bg-lush rounded-full"></span> {text}
              </li>
            ))}
          </ul>
          <button
           className="btn-outline"
           onClick={() => window.open('https://fisiyfoundation.org/', '_blank')}
           >Our Foundation Story</button>
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

**Size:** 1361 bytes  
```jsx
// app/components/sections/Infrastructure.jsx
import ServiceCard from "../ui/ServiceCard";

export default function Infrastructure() {
  const features = [
    {
      title: "Resilient Connectivity",
      description: "Dual-redundant Fiber & Starlink systems. Guaranteed low-latency for global board meetings.",
      icon: "🌐",
      to: "/nomads"
    },
    {
      title: "Energy Sovereignty",
      description: "Smart solar grid integration ensuring 24/7 power for work and leisure.",
      icon: "☀️",
      to: "/nomads"
    },
    {
      title: "Executive Suites",
      description: "Soundproofed conference facilities and boardrooms with high-end AV technology.",
      icon: "🏢",
      to: "/conferences"
    }
  ];

  return (
    <section className="bg-ocean py-24">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-white font-serif italic mb-4">Precision Infrastructure</h2>
          <p className="text-white/70 max-w-2xl">
            Reliability is our baseline. We provide the technical stability required by world-class leaders and digital professionals.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <ServiceCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/OceanSide.jsx`

**Size:** 2912 bytes  
```jsx
import React from 'react';
import { motion } from "framer-motion";
import { Mic2, GraduationCap } from "lucide-react";

function OceanSide() {
  return (
    <section className="py-20 md:py-35 text-center bg-volcanic relative overflow-hidden">
      {/* Subtle Structural Grain to prevent flat "digital" look */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section Identifier */}
          <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">
            Intellectual Sanctuary
          </span>

          {/* Primary Title - Pure White for maximum legibility */}
          <h2 className="font-serif italic text-white mb-6 text-5xl md:text-5xl tracking-tight leading-tight">
            The Ocean-Side Dialogues
          </h2>

          {/* Diplomat's Required Facilities - High Contrast Sub-Header */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-lush" />
              <span className="text-white font-bold uppercase tracking-[0.2em] text-[11px]">Learning</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <Mic2 size={16} className="text-lush" />
              <span className="text-white font-bold uppercase tracking-[0.2em] text-[11px]">Podcast Facilities</span>
            </div>
          </div>

          {/* Description - Using White with high opacity (90%) for the "Old Man's" eyes */}
          <p className="text-xl md:text-3xl text-white/90 mb-16 leading-relaxed font-light max-w-3xl mx-auto">
            A sanctuary for global thought leaders, convening to address 
            the pertinence of <span className="text-lush font-medium italic">African</span> and world issues.
          </p>

          {/* Premium Call to Action */}
          <div className="flex justify-center">
            <button className="bg-white text-volcanic px-14 py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] hover:bg-lush hover:text-white transition-all duration-500 shadow-2xl">
              Request Invitation
            </button>
          </div>
          
        </motion.div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lush/20 to-transparent" />
    </section>
  )
}

export default OceanSide;
```

---

### File: `src/components/sections/Partnerships.jsx`

**Size:** 3481 bytes  
```jsx
import { motion } from "framer-motion";

const partners = [
  { 
    name: "Fisiy Foundation", 
    role: "Social Impact Lead", 
    logo: "⚖️" 
  },
  { 
    name: "Global Policy Network", 
    role: "Strategic Partner", 
    logo: "🌍" 
  },
  { 
    name: "Limbe Artisanal Guild", 
    role: "Sustainable Sourcing", 
    logo: "🎨" 
  },
  { 
    name: "Fiber-Optic Backbone", 
    role: "High-Speed Connectivity", 
    logo: "⚡" 
  },
  { 
    name: "Cameroon Green Initiative", 
    role: "Eco-Certification", 
    logo: "🍃" 
  }
];

export default function Partnerships() {
  return (
    <section className="py-24 bg-white border-y border-sand">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          
          {/* Left Side: Strategic Text */}
          <div className="lg:col-span-1">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">Strategic Synergy</span>
            <h2 className="text-4xl font-serif mt-4 text-volcanic leading-tight">
              A Network of <br /> Global Excellence
            </h2>
            <p className="text-volcanic/70 mt-6 leading-relaxed text-sm">
              Ngeme operates at the intersection of international standards and local empowerment. 
              Our partnerships are carefully curated to ensure that every stay contributes to 
              a sustainable, reliable, and socially inclusive supply chain.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full border border-sand flex items-center justify-center text-xl">🤝</div>
              <span className="text-xs font-bold uppercase tracking-widest text-volcanic/40">
                Building a reliable community
              </span>
            </div>
          </div>

          {/* Right Side: Interactive Logo/Partner Grid */}
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
              
              {/* "Become a Partner" CTA Box */}
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="p-8 bg-lush rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer"
              >
                <p className="text-white font-serif italic text-lg mb-2">Join the Mission</p>
                <span className="text-[9px] text-sand/60 uppercase tracking-[0.2em]">Partner with us</span>
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

**Size:** 4756 bytes  
```jsx
import { motion } from "framer-motion";
import { 
  Users, 
  ShieldCheck, 
  Leaf, 
  Sparkles 
} from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Connection & Outreach",
    description: "Fostering deep connectivity between the global diaspora and their local networks through knowledge exchange and intellectual curiosity.",
    Icon: Users
  },
  {
    number: "02",
    title: "Outstanding Professional Security",
    description: "A sanctuary providing absolute physical and digital peace of mind, ensuring a safe space for high-level professional engagement.",
    Icon: ShieldCheck
  },
  {
    number: "03",
    title: "Sustainable Legacy",
    description: "Living our values through clean living, reliable supply-chain communities, and deep-rooted support for the Fisiy Foundation.",
    Icon: Leaf
  },
  {
    number: "04",
    title: "Luxury Redefined",
    subtext: "(Subtle and timeless)",
    description: "An experience where elegance meets purpose, prioritizing quiet quality and an enduring aesthetic that transcends the temporary.",
    Icon: Sparkles
  }
];

export default function Principles() {
  return (
    <section className="relative py-24 md:py-20 overflow-hidden bg-sand">
      {/* Subtle Background Texture */}
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
            The Ngeme Ethos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-lush mt-4 italic"
          >
            Our Guiding Principles
          </motion.h2>
          <div className="h-0.5 w-24 bg-lush mx-auto mt-8 opacity-40" />
        </div>

        {/* 4-Column Grid for Desktop Clarity */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((p, i) => {
            const IconComponent = p.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group relative p-10 rounded-[2.5rem] bg-white shadow-sm border border-ocean/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[420px]"
              >
                {/* Number Accent */}
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

                {/* Lucide Icon - Replaced Emoji Rubbish */}
                <div className="absolute top-10 right-10 text-lush opacity-20 group-hover:opacity-100 transition-all duration-500 scale-110">
                  <IconComponent size={32} strokeWidth={1.2} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Tagline */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-ocean font-black opacity-30">
            Strategic Outreach <span className="mx-4 text-lush">•</span> Absolute Security <span className="mx-4 text-lush">•</span> Timeless Luxury
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/ServiceGrid.jsx`

**Size:** 2539 bytes  
```jsx
import React from "react";
import ServiceDiscoveryCard from "../ui/ServiceDiscoveryCard";

const services = [
  {
    title: "Events/Banquet Hall & Conference Facilities",
    subtitle: "State-of-the-art venues for high-level professional engagement and refined celebrations.",
    category: "Professional",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    to: "/conferences"
  },
  {
    title: "World Class Swimming Pool",
    subtitle: "Limbe’s premier ocean-front aquatic experience, designed for absolute serenity.",
    category: "Leisure",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800",
    to: "/leisure"
  },
  {
    title: "In-House Library",
    subtitle: "A curated intellectual sanctuary for deep focus, research, and quiet reflection.",
    category: "Intellectual",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
    to: "/library"
  },
  {
    title: "Know Your Environs Guided Tours",
    subtitle: "Expertly curated journeys through Limbe's landmarks and the volcanic slopes of Mt. Cameroon.",
    category: "Experiences",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800",
    to: "/tours"
  }
];

export default function ServiceGrid() {
  return (
    <section className="container mx-auto py-24 bg-sand lg:max-w-7xl px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <span className="text-lush font-black tracking-[0.4em] uppercase text-[10px]">
            Excellence in Service
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-volcanic leading-tight">
            Everything you need, <br />
            <span className="italic">Expertly handled.</span>
          </h2>
        </div>
        <p className="text-volcanic/60 max-w-sm pb-2 text-sm leading-relaxed">
          From diplomatic-level security to world-class leisure, our services are 
          designed to support your vision and professional lifestyle.
        </p>
      </div>

      {/* 4-Column Grid: Keeping images smaller and more refined on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceDiscoveryCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
}
```

---

### File: `src/components/sections/Suites.jsx`

**Size:** 2149 bytes  
```jsx
import { motion } from "framer-motion";

const suites = [
  { name: "The Atlantic Horizon", size: "120sqm", price: "$350", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800" },
  { name: "Digital Nomad Studio", size: "65sqm", price: "$210", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800" },
  { name: "Executive Founders Suite", size: "180sqm", price: "$550", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" }
];

export default function Suites() {
  return (
    <section className="py-24 bg-sand">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">Accommodations</span>
            <h2 className="text-4xl md:text-4xl font-serif mt-4 italic text-volcanic">Designed for Luxury & Excellence</h2>
          </div>
          <p className="text-volcanic/60 max-w-xs text-sm">
            Whether for a high-level summit or a nomadic retreat, our suites offer a sanctuary of productivity.
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

**Size:** 5248 bytes  
```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Ngeme provides a rare combination of Atlantic tranquility and the robust infrastructure I need for international consulting. The reliability of the power and data systems is world-class.",
    author: "Dr. Amadou K.",
    role: "Global Policy Advisor",
    location: "Washington D.C."
  },
  {
    quote: "The focus on social inclusivity through the Fisiy Foundation makes every stay feel meaningful. It is rare to find a resort that balances luxury with such deep community impact.",
    author: "Sarah J.",
    role: "Executive Director, International NGO",
    location: "Geneva"
  },
  {
    quote: "A true sanctuary for the digital nomad. The conference facilities and the view of the volcanic coast create an environment that fosters both productivity and deep reflection.",
    author: "Jean-Pierre M.",
    role: "Tech Entrepreneur & Investor",
    location: "Paris"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Swipe logic for mobile
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50 && index < testimonials.length - 1) {
      setIndex(index + 1);
    } else if (info.offset.x > 50 && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="py-32 bg-sand/30 relative overflow-hidden">
      {/* Background Serif Accent */}
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
            Client Perspectives
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-volcanic italic">
            Trusted by the Global Community
          </h2>
          <div className="h-1 w-12 bg-lush mx-auto mt-8" />
        </div>

        {/* --- DESKTOP GRID (Hidden on Mobile) --- */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        {/* --- MOBILE SLIDER (Visible only on Mobile/Tablet) --- */}
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

          {/* Pagination Dots */}
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

        <div className="mt-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-volcanic/40 font-semibold">
            Member of the Global Sustainable Tourism Council
          </p>
        </div>
      </div>
    </section>
  );
}

// Extracted Card Component for Clean Engineering
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

**Size:** 5487 bytes  
```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const values = [
  {
    id: "exclusivity",
    title: "Exclusivity",
    label: "A Private Sanctuary",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1400",
    desc: "A resort designed for the discerning few, ensuring peace, tranquility, and professional focus."
  },
  {
    id: "connectivity",
    title: "Connectivity",
    label: "High-Speed Infrastructure",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400",
    desc: "Meeting a global network of digital nomads with enterprise-grade professional tools."
  },
  {
    id: "culture",
    title: "Local Culture",
    label: "Limbe Heritage",
    image: "https://images.unsplash.com/photo-1523474253046-2cd2c78b681e?auto=format&fit=crop&q=80&w=1400",
    desc: "Celebrating local cultures, crafts and Atlantic heritage through curated partnerships."
  },
  {
    id: "luxury",
    title: "Timeless Luxury",
    label: "Enduring Elegance",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1400",
    desc: "An aesthetic of comfort that transcends trends, rooted in architectural harmony."
  },
  {
    id: "organic",
    title: "Organic Produce",
    label: "Volcanic Soil",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1400",
    desc: "Fresh nourishment sourced directly from the fertile volcanic soils of the region."
  }
];

export default function ValuesSection() {
  const [activeId, setActiveId] = useState(values[0].id);

  const activeValue = values.find(v => v.id === activeId);

  return (
    // Replaced min-h-700 with h-auto and large padding for mobile flexibility
    <section className="relative w-full min-h-[800px] flex items-center py-20 overflow-hidden bg-volcanic">
      
      {/* Background Image - Adjusted opacity for mobile legibility */}
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
          {/* Gradient: Top-to-bottom on mobile, Left-to-right on Desktop */}
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-volcanic via-volcanic/80 lg:via-volcanic/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Container: Increased max-width to 1800px for browser expansion */}
      <div className="w-full relative z-10 mx-auto px-6 lg:px-20 max-w-[1800px] grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Interactive List */}
        <div className="space-y-4">
          <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">
            The Residency Pillars
          </span>
          
          <div className="flex flex-col">
            {values.map((v, index) => (
              <button
                key={v.id}
                // onClick for Mobile + onMouseEnter for Desktop
                onClick={() => setActiveId(v.id)}
                onMouseEnter={() => setActiveId(v.id)}
                className="group py-5 text-left relative outline-none"
              >
                <div className="flex items-center gap-6">
                  <span className={`text-[11px] font-black tracking-widest transition-colors duration-300 ${activeId === v.id ? 'text-lush' : 'text-white/20'}`}>
                    0{index + 1}
                  </span>
                  <h3 className={`text-3xl md:text-5xl lg:text-7xl font-serif transition-all duration-500 ${activeId === v.id ? 'text-white translate-x-4 md:translate-x-8' : 'text-white/20 group-hover:text-white/40'}`}>
                    {v.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: The Detail Card - Now Visible on Mobile as a "Slide-up" effect */}
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
                {activeValue.label}
              </span>
              <p className="text-white text-xl md:text-2xl leading-relaxed font-light">
                {activeValue.desc}
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

**Size:** 13711 bytes  
```jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { Check, X, Calendar, Users, Coffee, Waves, Search, ArrowUpDown } from "lucide-react";

const suites = [
  {
    id: "ocean-suite",
    title: "Ocean View Suite",
    price: 350,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000",
    description: "Wake up to the gentle sounds of the Atlantic and panoramic views of the shimmering coastline. Our Ocean View Suites blend modern comfort with traditional Cameroonian elegance.",
    amenities: ["Private Balcony", "King-size Bed", "Spacious Living Area", "En-suite Bathroom", "High-speed Wi-Fi"]
  },
  {
    id: "garden-bungalow",
    title: "Garden Bungalow",
    price: 280,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
    description: "Nestled amidst lush tropical gardens, our Garden Bungalows offer a tranquil escape. Enjoy privacy and serenity with easy access to the resort's facilities.",
    amenities: ["Private Patio", "Queen-size Bed", "Garden Views", "Outdoor Shower", "Personalized Concierge"]
  },
  {
    id: "executive-villa",
    title: "Executive Villa",
    price: 800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    description: "For those seeking ultimate luxury, our Executive Villas provide an unparalleled experience. Featuring multiple bedrooms, a private pool, and dedicated staff.",
    amenities: ["Private Infinity Pool", "Multiple Bedrooms", "Butler Service", "Gourmet Kitchen", "Panoramic Views"]
  },
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    price: 220,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000",
    description: "Our Deluxe Rooms offer a cozy yet elegant stay. Ideal for couples or solo travelers. Thoughtfully designed with comfort in mind for a peaceful retreat.",
    amenities: ["Comfortable Double Bed", "Modern Furnishings", "Smart TV", "Mini-Bar", "Room Service"]
  }
];

export default function Accommodations() {
  const [selectedSuite, setSelectedSuite] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

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
  }, [searchQuery, sortBy]);

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <section className="container mx-auto px-6 mb-12 text-center">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-lush font-black tracking-[0.5em] uppercase text-[10px] block mb-4"
          >
            The Residency
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif text-volcanic italic">Exquisite Sanctuaries</h1>
          <p className="text-volcanic/60 mt-6 max-w-2xl mx-auto text-lg">
            Designed for the intellectual nomad, our rooms offer the perfect balance of 
            African warmth and executive functionality.
          </p>
        </section>

        {/* Filter Bar */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic/40" />
              <input
                type="text"
                placeholder="Search suites..."
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
                <option value="default">Sort by</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <p className="text-volcanic/50 text-sm mt-4 text-center md:text-left">
            {filteredSuites.length} {filteredSuites.length === 1 ? 'sanctuary' : 'sanctuaries'} available
          </p>
        </section>

        {/* Suites Grid - 4 columns on large screens */}
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
                      <p className="text-[8px] uppercase tracking-[0.3em] font-black text-lush mb-2">Key Amenities</p>
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
                      Reserve
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* No results */}
        {filteredSuites.length === 0 && (
          <div className="text-center py-20">
            <p className="text-volcanic/40 text-lg">No suites match your search.</p>
          </div>
        )}
      </main>

      {/* Reservation Modal (unchanged, but keep it) */}
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

              {/* Modal Left: Info */}
              <div className="hidden lg:block relative bg-volcanic p-12 text-white">
                <div className="absolute inset-0 opacity-20">
                    <Waves className="w-full h-full text-white p-20" />
                </div>
                <div className="relative z-10">
                    <span className="text-lush font-black tracking-widest text-[10px] uppercase">Reservation Detail</span>
                    <h2 className="text-4xl font-serif mt-4 mb-6">{selectedSuite.title}</h2>
                    <p className="text-white/60 mb-8 italic">"A sanctuary for the global mind, rooted in the volcanic beauty of Limbe."</p>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Coffee className="text-lush" />
                            <span className="text-sm font-medium">Complimentary Organic Breakfast</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Users className="text-lush" />
                            <span className="text-sm font-medium">Concierge Guided Check-in</span>
                        </div>
                    </div>
                </div>
              </div>

              {/* Modal Right: Form */}
              <div className="p-8 md:p-12 bg-white">
                <h3 className="text-2xl font-serif text-volcanic mb-8">Booking Inquiry</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-lush">Arrival</label>
                        <input 
                          type="date" 
                          className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-lush">Departure</label>
                        <input 
                          type="date" 
                          className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors" 
                        />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-lush">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Dr. Julian F." 
                      className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-lush">Special Requirements</label>
                    <textarea 
                      placeholder="e.g. Dietary needs, Airport pickup, Workspace setup..." 
                      className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors resize-none" 
                      rows="3" 
                    />
                  </div>

                  <button className="w-full bg-lush hover:bg-volcanic text-white font-black py-5 rounded-xl uppercase text-[10px] tracking-[0.3em] transition-all">
                    Confirm Availability
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

**Size:** 10625 bytes  
```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { Send, MapPin, Globe, Shield, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("idle");

  return (
    <div className="bg-sand min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="relative pt-32 pb-24 w-full">
        <div className="container mx-auto px-6">
          
          {/* Header Section */}
          <div className="max-w-4xl mb-16 md:mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lush font-black tracking-[0.5em] uppercase text-[10px] block mb-4"
            >
              Concierge & Inquiries
            </motion.span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-8xl font-serif text-volcanic leading-[1.1] tracking-tight"
            >
              Begin Your <br />
              <span className="italic text-lush">Atlantic Residency</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-volcanic/60 text-lg md:text-xl mt-8 max-w-2xl leading-relaxed italic font-light"
            >
              Our team specializes in coordinating long-term stays, corporate retreats, and foundation visits. Reach out to discuss your specific professional or physical requirements.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* RIGHT COLUMN (The Form) - Forced to Top on Mobile using order-1 */}
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
                    <h3 className="text-3xl font-serif text-ocean mb-4">Inquiry Received</h3>
                    <p className="text-volcanic/60 text-sm max-w-xs mx-auto leading-relaxed">
                        Your message has been encrypted and sent to our concierge. Expect a response within 4 professional hours.
                    </p>
                    <button 
                      onClick={() => setFormStatus("idle")} 
                      className="mt-10 text-lush font-black text-[10px] uppercase tracking-[0.3em] border-b-2 border-lush pb-1 hover:text-volcanic hover:border-volcanic transition-colors"
                    >
                        Submit another request
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
                      <FormInput label="Full Name" placeholder="e.g. Dr. Amadou K." />
                      <FormInput label="Professional Email" type="email" placeholder="amadou@network.org" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <FormInput label="Phone / WhatsApp" placeholder="+237 ..." />
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-lush/60 ml-1">Nature of Inquiry</label>
                        <select className="w-full bg-sand/40 border-none rounded-2xl px-6 py-5 text-sm focus:ring-2 focus:ring-lush outline-none appearance-none cursor-pointer text-volcanic font-medium">
                          <option>Executive Residency (1 week+)</option>
                          <option>Corporate Summit / Retreat</option>
                          <option>Fisiy Foundation Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-lush/60 ml-1">Special Requirements</label>
                      <textarea 
                        rows="5" 
                        className="w-full bg-sand/40 border-none rounded-[2rem] px-6 py-5 text-sm focus:ring-2 focus:ring-lush outline-none resize-none text-volcanic font-medium" 
                        placeholder="Workspace needs, security coordination, or dietary standards..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === "sending"}
                      className="w-full bg-volcanic hover:bg-lush text-white font-black py-7 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-6 uppercase text-[11px] tracking-[0.5em] group disabled:opacity-70"
                    >
                      {formStatus === "sending" ? "Relaying Message..." : "Send Secure Inquiry"}
                      <Send className={`w-4 h-4 transition-transform duration-500 ${formStatus === "sending" ? "animate-pulse" : "group-hover:translate-x-2 group-hover:-translate-y-1"}`} />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* LEFT COLUMN (Map & Details) - Moves below form on Mobile using order-2 */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-10">
              
              {/* Map Container - Fixed width issue by using w-full */}
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
                    <p className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Coastal Residency</p>
                  </div>
                  <p className="text-white/80 text-base font-serif italic leading-relaxed">
                    Ngeme, Mile 4 Coastal Road,<br /> Limbe, Cameroon
                  </p>
                </div>
              </motion.div>

              {/* Secure Infrastructure Badge */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2.5rem] bg-lush text-white shadow-2xl relative overflow-hidden group"
              >
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <Shield className="text-lush w-6 h-6" />
                        <h4 className="font-serif italic text-2xl text-white">Secure Infrastructure</h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/70 uppercase tracking-[0.3em] font-bold">
                        Equipped with Starlink enterprise-grade connectivity to ensure 24/7 high-speed dialogue for global professional missions.
                    </p>
                </div>
                <Globe className="absolute -right-10 -bottom-10 w-40 h-40 text-white/5 group-hover:text-white/10 transition-colors duration-700" />
              </motion.div>

              {/* Direct Contacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactCard 
                    label="Concierge" 
                    value="residency@newwavesresort.com" 
                />
                <ContactCard 
                    label="Foundation" 
                    value="impact@fisiyfoundation.org" 
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Reusable Sub-components for professional consistency
function FormInput({ label, type = "text", placeholder }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-lush/60 ml-1">{label}</label>
      <input 
        type={type} 
        required 
        className="w-full bg-sand/40 border-none rounded-2xl px-6 py-5 text-sm focus:ring-2 focus:ring-lush transition-all outline-none text-volcanic font-medium" 
        placeholder={placeholder} 
      />
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

**Size:** 12304 bytes  
```jsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { menuItems } from "../data/menuData";
import { Search, Coffee, UtensilsCrossed, Wine, Cookie, Sparkles, Leaf, X } from "lucide-react";

// Category icons and labels
const categories = [
  { id: "all", label: "All", icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: "appetizers", label: "Appetizers", icon: <Sparkles className="w-4 h-4" /> },
  { id: "mains", label: "Mains", icon: <Coffee className="w-4 h-4" /> },
  { id: "desserts", label: "Desserts", icon: <Cookie className="w-4 h-4" /> },
  { id: "drinks", label: "Drinks", icon: <Wine className="w-4 h-4" /> },
];

export default function Dining() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilters, setDietaryFilters] = useState({
    vegan: false,
    "gluten-free": false,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Reset search when category changes (optional)
  const handleCategoryChange = (categoryId) => {
    setFilter(categoryId);
    setSearchQuery("");
  };

  // Toggle dietary filter
  const toggleDietary = (diet) => {
    setDietaryFilters((prev) => ({ ...prev, [diet]: !prev[diet] }));
  };

  // Filtered items based on category, search, and dietary
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (filter !== "all" && item.category !== filter) return false;

      // Search filter (case insensitive)
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Dietary filters: if any dietary filter is active, the item must have that tag
      const activeDiets = Object.keys(dietaryFilters).filter((d) => dietaryFilters[d]);
      if (activeDiets.length > 0) {
        // Check if item's dietary array contains all active diets? Or any? We'll use "any" for flexibility.
        return activeDiets.some((diet) => item.dietary.includes(diet));
      }

      return true;
    });
  }, [filter, searchQuery, dietaryFilters]);

  return (
    <div className="min-h-screen bg-sand/30">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
            >
                <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">
                Volcanic Harvest & Purity
                </span>
                <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Atlantic Gastronomy, <br />
                <span className="italic text-lush">100% Organic by Nature.</span>
                </h1>
                <p className="text-volcanic/70 text-xl max-w-2xl leading-relaxed">
                Our menu is a sanctuary for the health-conscious mind. Every ingredient is 
                strictly <spand className="text-volcanic">organic and pesticide-free</spand>, harvested directly from the nutrient-rich 
                volcanic soils of the Fako region. From our unadulterated cold-pressed oils 
                to our daily coastal catch, we serve only what is pure, seasonal, and 
                chemically untouched, bringing you the true, vibrant energy of Cameroon.
                </p>
            </motion.div>
            </section>

        {/* Filters Bar */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Category Pills */}
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

            {/* Search and Filter Toggle */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic/40" />
                <input
                  type="text"
                  placeholder="Search dishes..."
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
                <span className="text-xs uppercase tracking-wider">Dietary</span>
              </button>
            </div>
          </div>

          {/* Dietary Filters Panel */}
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
                    <span className="text-sm">Vegan</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietaryFilters["gluten-free"]}
                      onChange={() => toggleDietary("gluten-free")}
                      className="w-4 h-4 text-lush border-sand rounded focus:ring-lush"
                    />
                    <span className="text-sm">Gluten-Free</span>
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

        {/* Menu Grid */}
        <section className="container mx-auto px-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-volcanic/50 text-lg">No dishes match your criteria.</p>
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
                      {/* Dietary tags on image */}
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

        {/* Chef's Note */}
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
              <h2 className="text-3xl md:text-5xl font-serif mb-6 italic">A Letter from the Chef</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                "Every dish tells the story of our land, the volcanic richness that grows our spices, the Atlantic that gives us fish, and the hands of local farmers who have cultivated these flavors for generations. I invite you to taste Cameroon with us."
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-px bg-lush/50" />
                <span className="text-lush font-bold uppercase tracking-widest text-xs">Food, Made with Love</span>
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

**Size:** 24246 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { ArrowRight, Star, Globe, Shield, Leaf, Eye, Heart, User, Award, ExternalLink, Home, Briefcase, HandHeart } from "lucide-react";

// Milestones now blend resort and foundation
const milestones = [
    {
        year: "2014",
        title: "Foundation Born",
        description: "Dr. Fisiy establishes the Fisiy Foundation in Washington DC.",
        fullStory: "Long before the resort, there was a vision for accountable governance in Africa. Dr. Cyprian Fisiy founded the Fisiy Foundation and Leadership Center as a 501(c)(3) to address deficits in local governance and foster citizen engagement.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
    },
    {
        year: "2018",
        title: "The Resort Dream",
        description: "A idea to bridge high-end comfort with deep social impact.",
        fullStory: "Dr. Fisiy imagined a place where global travelers could experience Cameroon's beauty while directly fueling the foundation's work. Ngeme was conceived as a self-sustaining engine for change.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800"
    },
    {
        year: "2023",
        title: "Breaking Ground",
        description: "Construction begins on the volcanic shores of Limbe.",
        fullStory: "Local craftsmen taught our architects traditional techniques. Every worker employed was a step toward economic empowerment, a principle Dr. Fisiy held as non‑negotiable.",
        image: "https://images.unsplash.com/photo-1596701062351-8c0c16913c54?auto=format&fit=crop&q=80&w=800"
    },
    {
        year: "2025",
        title: "Opening & Legacy",
        description: "Ngeme launches, committing 20% of profits to the foundation.",
        fullStory: "Today, New Waves Resort stands as a sanctuary for the intellectual nomad, and a testament to how luxury can fund lasting change in local communities.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800"
    },
];

// Impact stats combine resort and foundation metrics
const impactStats = [
    { value: "20%", label: "Of profits to foundation", detail: "Funding education, infrastructure, and livelihoods" },
    { value: "120+", label: "Local jobs created", detail: "Fair wages and training for community members" },
    { value: "450", label: "Fisiy scholarships", detail: "Awarded through foundation programs" },
    { value: "15k", label: "Mangroves planted", detail: "Coastal restoration with community partners" },
];

// Foundation program areas (with links)
const foundationPrograms = [
    {
        icon: <Home className="w-8 h-8 text-lush" />,
        title: "Cameroon-boxes",
        description: "Small local infrastructure, foot paths, bridges, latrines, built with full community participation.",
        link: "https://fisiyfoundation.org/programs/cameroon-boxes",
    },
    {
        icon: <Briefcase className="w-8 h-8 text-lush" />,
        title: "Vocational Training",
        description: "Multi-purpose centers offering youth skills training, libraries, and internet access.",
        link: "https://fisiyfoundation.org/programs/vocational-training",
    },
    {
        icon: <HandHeart className="w-8 h-8 text-lush" />,
        title: "Livelihood Support",
        description: "Self-help groups gain better access to markets and funding.",
        link: "https://fisiyfoundation.org/programs/livelihood-support",
    },
];

export default function OurStory() {
    return (
        <div className="flex flex-col min-h-screen bg-sand/20">
            <Navbar />

            <main className="flex-grow">
                {/* ===== HERO SECTION (resort-focused) ===== */}
                <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
                    <div className="container mx-auto px-6 grid lg:grid-cols-2 items-center gap-16 z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px] mb-6 block">
                                Heritage & Horizon
                            </span>
                            <h1 className="text-5xl md:text-8xl font-serif text-volcanic leading-[1.05] mb-10 tracking-tight">
                                Our Story. <br /> <span className="italic text-lush">A Legacy of Impact.</span>
                            </h1>
                            <p className="text-volcanic/80 text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-8">
                                On the volcanic shores of Limbe, New Waves Resot was born from a simple idea: that world-class hospitality can be a force for social change. Every stay here supports the Fisiy Foundation's mission to build accountable institutions across Africa.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-5">
                                <Link
                                    to="/contact"
                                    className="group relative flex items-center justify-center bg-volcanic text-white px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em]">Join the Narrative</span>
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

                {/* ===== IMPACT NUMBERS (blended) ===== */}
                <section className="py-20 bg-volcanic text-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                            {impactStats.map((stat, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className="text-5xl md:text-6xl font-serif text-lush mb-3 group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                                    <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</div>
                                    <p className="text-white/20 text-xs max-w-[150px] mx-auto leading-relaxed">{stat.detail}</p>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-white/40 text-center text-sm max-w-2xl mx-auto mt-16 italic">
                            Ngeme exists to make luxury meaningful, by reinvesting in the communities that welcome you.
                        </p>
                    </div>
                </section>

                {/* ===== THE VISION: RESORT + FOUNDATION ===== */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">Two Wings, One Mission</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">Where Luxury Meets Purpose</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-sand/5 p-12 rounded-[3rem] border border-sand/30"
                            >
                                <Eye className="w-12 h-12 text-lush mb-8" />
                                <h3 className="text-3xl font-serif text-volcanic mb-6">Ngeme's Vision</h3>
                                <p className="text-volcanic/70 text-lg leading-relaxed">
                                    To create a sanctuary for the intellectual nomad, where world-class comfort inspires deep work, and where every guest becomes part of a larger story: the renewal of the social contract between citizens and their local governments across Africa.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-sand/5 p-12 rounded-[3rem] border border-sand/30"
                            >
                                <Heart className="w-12 h-12 text-lush mb-8" />
                                <h3 className="text-3xl font-serif text-volcanic mb-6">Foundation's Mission</h3>
                                <p className="text-volcanic/70 text-lg leading-relaxed">
                                    To address deficits in local governance in Sub-Saharan Africa by fostering a culture of service, accountability and mutual respect, building inclusive, resilient institutions for responsive local engagement.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===== FOUNDER'S STORY (accurate, with photo) ===== */}
                <section className="py-32 bg-sand/10">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">The Visionary</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">Dr. Cyprian F. Fisiy</h2>
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
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
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
                                <p className="mb-4">
                                    <span className="text-2xl font-serif text-lush">Dr. Cyprian F. Fisiy</span> is a Principal Social Scientist and Social Development Team Leader in the Africa Region of The World Bank. He has previously served as World Bank co-coordinator for Involuntary Resettlement (1997) and Resettlement Specialist for Africa (1994), working on investment programs in Lesotho, Chad, Cameroon and Côte d'Ivoire.
                                </p>
                                <p className="mb-4">
                                    Prior to the World Bank, he conducted research on sustainable forest management in Cameroon and was a Research Fellow at the African Studies Center in Leiden and the University of Wageningen. He holds a Ph.D. in the Anthropology of Law from the University of Leiden (1992).
                                </p>
                                <p className="mb-4">
                                    In 2014, Dr. Fisiy founded the Fisiy Foundation and Leadership Center in Washington DC as a 501(c)(3) nonprofit. Ngeme Resort is his dream to create a sustainable funding engine for that mission, proving that hospitality can be a catalyst for accountable governance and community empowerment.
                                </p>
                                <p className="mb-6">
                                    He resides in Alexandria with his wife, Grace Forgwei, and their four children.
                                </p>
                                <div className="flex items-center gap-4 text-volcanic">
                                    <div className="w-12 h-px bg-lush/50" />
                                    <span className="text-sm font-bold uppercase tracking-widest">The Visionary Founder</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===== HOW NGEME SUPPORTS THE FOUNDATION ===== */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">Your Stay Fuels Change</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">Programs You Support</h2>
                            <p className="text-volcanic/60 text-lg max-w-2xl mx-auto mt-6">
                                Through the Fisiy Foundation, a portion of New Wave Resort's profits directly fund these initiatives in Sub-Saharan Africa.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {foundationPrograms.map((program, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-sand/5 p-10 rounded-[2rem] border border-sand/50 hover:shadow-xl transition-all"
                                >
                                    <div className="mb-8 p-4 bg-lush/10 rounded-2xl inline-block">
                                        {program.icon}
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
                                        <span>Learn more on foundation site</span>
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== MILESTONES TIMELINE ===== */}
                <section className="py-32 bg-sand/10">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">Timeline of Intent</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">From Foundation to Resort</h2>
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

                {/* ===== PHILOSOPHY: INTELLECTUAL NOMAD ===== */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-24">
                            <div className="lg:w-1/2">
                                <h2 className="text-4xl md:text-6xl font-serif text-volcanic mb-10 leading-tight">
                                    Built for the <br /><span className="italic text-lush">Intellectual Nomad</span>
                                </h2>
                                <p className="text-volcanic/70 leading-relaxed text-xl font-medium mb-8">
                                    Ngeme is more than a resort, it's a hub for writers, researchers, and entrepreneurs who seek both inspiration and infrastructure. Our coworking pavilions face the Atlantic, and our library holds volumes that spark dialogue between African thought leaders and the world.
                                </p>
                                <p className="text-volcanic/60 leading-relaxed text-lg font-light">
                                    Every element, from locally woven textiles to menus featuring indigenous ingredients, roots you in Cameroonian authenticity while delivering global standards of comfort.
                                </p>
                            </div>

                            <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
                                <PhilosophyCard 
                                    icon={<Shield className="text-lush w-6 h-6" />}
                                    title="Sovereign Security"
                                    desc="A high‑level sanctuary for professional peace of mind."
                                />
                                <PhilosophyCard 
                                    icon={<Leaf className="text-lush w-6 h-6" />}
                                    title="Regenerative by Design"
                                    desc="Every stay contributes to mangrove reforestation."
                                />
                                <PhilosophyCard 
                                    icon={<Globe className="text-lush w-6 h-6" />}
                                    title="Global Vision, Local Soul"
                                    desc="A hub where the world learns from Cameroon."
                                />
                                <PhilosophyCard 
                                    icon={<Star className="text-lush w-6 h-6" />}
                                    title="Elite Standard"
                                    desc="World‑class infrastructure meets indigenous wisdom."
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* ===== FOOTER (resort + foundation) ===== */}
                <Footer />
            </main>
        </div>
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

**Size:** 11279 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { 
  Waves, 
  PlaneTakeoff, 
  Car, 
  Compass, 
  Utensils, 
  Mic2, 
  ShieldCheck, 
  Wifi,
  ArrowUpRight,
  Wind,
  Leaf,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "intellectual-talks",
    title: "Ocean-Side Intellectual Talks",
    category: "Thought Leadership",
    icon: <Mic2 className="w-8 h-8" />,
    description: "Curated evening dialogues under the stars. We bring together global thinkers and local leaders to discuss governance, tech, and the future of Africa.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "dining",
    title: "Atlantic Gastronomy",
    category: "Dining",
    icon: <Utensils className="w-8 h-8" />,
    description: "Farm-to-table excellence. Our chefs use volcanic-soil produce and fresh Atlantic catch to redefine Cameroonian fine dining.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "transfers",
    title: "Diplomatic Transfers",
    category: "Transport",
    icon: <PlaneTakeoff className="w-8 h-8" />,
    description: "Seamless airport pickups from Douala International. We handle the logistics so your transition from the world to the sanctuary is effortless.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "expeditions",
    title: "Volcanic Expeditions",
    category: "Exploration",
    icon: <Compass className="w-8 h-8" />,
    description: "Private guided tours to Mount Cameroon and the historic sites of Bimbia. Adventure rooted in deep geographical and social history.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "fleet",
    title: "Premium Fleet",
    category: "Mobility",
    icon: <Car className="w-8 h-8" />,
    description: "Chauffeur-driven or private luxury rentals. High-clearance vehicles maintained to international standards for your regional travels.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "library",
    title: "The Fisiy Research Library",
    category: "Knowledge Hub",
    icon: <BookOpen className="w-8 h-8" />,
    description: "A private collection of African literature, law, and social science. A quiet sanctuary for deep work, research, and cross-continental dialogue.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000"
  },
];

export default function Services() {
  const navigate = useNavigate();
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
              The Service Protocol
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-8xl font-serif text-volcanic leading-tight mb-8"
            >
              Seamless <span className="italic text-lush">Infrastructure</span><br />for the Global Mind.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-volcanic/70 text-xl max-w-2xl leading-relaxed"
            >
              At Ngeme Resort, service is a silent partner to your productivity. We provide the 
              logistics, security, and nourishment required for high-stakes intellectual work,
              all while honoring the volcanic soul of Cameroon.
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
                    {service.icon}
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
                    Discover More <ArrowUpRight className="w-4 h-4 text-lush group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
            {/* Volcanic texture overlay */}
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
                Bespoke <span className="text-lush italic">Requests</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                Our concierge team is trained in diplomatic protocol. Whether you require a private 
                translator, specialized research assistance, or specific dietary logistics,
                from volcanic soil produce to rare archival materials, we are here to facilitate.
              </p>
              <button onClick={() => navigate('/contact')} className="bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-white hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                Contact the Concierge
              </button>
            </div>
          </motion.div>
        </section>

        {/* Service Philosophy */}
        <section className="container mx-auto px-6 mt-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
                The Ngeme Standard
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">
                Rooted in <span className="italic text-lush">Volcanic Soil</span>, Reaching Global Heights
              </h2>
              <p className="text-volcanic/70 text-lg leading-relaxed">
                Every service we offer is filtered through a lens of cultural integrity and ecological 
                mindfulness. From the vehicles we maintain to the ingredients we source, we prioritize 
                partnerships that uplift local communities and preserve the raw beauty of the Cameroon coastline.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand/40 text-center">
                <Wifi className="w-8 h-8 text-lush mx-auto mb-4" />
                <div className="text-2xl font-serif text-volcanic">High Speed Wifi</div>
                <div className="text-xs text-volcanic/50 uppercase tracking-wider">Global Connectivity</div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand/40 text-center">
                <ShieldCheck className="w-8 h-8 text-lush mx-auto mb-4" />
                <div className="text-2xl font-serif text-volcanic">24/7</div>
                <div className="text-xs text-volcanic/50 uppercase tracking-wider">Sovereign Protection</div>
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

**Size:** 11613 bytes  
```jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { 
  Utensils, Coffee, Wine, Leaf, ChefHat, Clock, MapPin, 
  Star, ArrowRight, Users, Sun, Sunset, Moon 
} from "lucide-react";

// Sample menu highlights
const menuHighlights = [
  { name: "Grass-Fed Ribeye", description: "300g ribeye from cattle raised on volcanic pastures, grilled over open flame.", price: 8900 },
  { name: "Mbongo Tchobi Prawns", description: "Juicy prawns simmered in a dark, aromatic spice broth with fresh crayfish.", price: 2400 },
  { name: "Ndolé Vegetarian", description: "Creamy bitterleaf stew with peanuts, served with boiled plantains.", price: 4500 },
  { name: "Poisson Braisé", description: "Whole barracuda marinated in spicy mixture, grilled over charcoal.", price: 6500 },
];

const diningExperiences = [
  { icon: <Sun className="w-6 h-6" />, title: "Beachfront Breakfast", description: "Start your day with fresh pastries, tropical fruit, and volcanic coffee steps from the Atlantic." },
  { icon: <Sunset className="w-6 h-6" />, title: "Sundowner Sessions", description: "Cocktails and small plates as the sun sets over the water, a nightly ritual." },
  { icon: <Moon className="w-6 h-6" />, title: "Private Moonlit Dinners", description: "An intimate multi‑course feast on the beach, just for you." },
];

const testimonials = [
  { quote: "The most memorable meal of our lives, not just for the food, but for the setting and the stories behind every ingredient.", author: "— The Thompson Family, UK" },
  { quote: "Chef Mireille’s tasting menu is a journey through Cameroon. Don’t miss the plantain crisps with kati‑kati.", author: "— Dr. Amina S., Nigeria" },
];

export default function AtlanticGastronomy() {
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Dining</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Atlantic <span className="italic text-lush">Gastronomy</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                Our culinary philosophy is simple: honor the volcanic soil that grows our spices, the Atlantic that provides our catch, and the hands that have cultivated these flavors for generations.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                Every dish tells a story, of farmers who practice terraced agriculture on Mount Cameroon’s slopes, of fishermen who still launch their pirogues by hand, and of recipes passed down through centuries. We invite you to taste Cameroon.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">The Lighthouse Pavilion & Beach</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Daily 7am – 10pm</span>
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
                <p className="text-xl font-serif italic">"Cooking is an act of love. We put a piece of our land on every plate."</p>
                <p className="text-white/70 mt-2">— Chef Mireille Ndongo</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dining Experiences */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">Ways to Dine</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
              From sunrise coffee to moonlit feasts, choose the setting that suits your mood.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {diningExperiences.map((exp, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">{exp.icon}</div>
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
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">Menu Highlights</h2>
          <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
            A taste of what awaits. Our full menu changes seasonally with the freshest catches and harvests.
          </p>
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
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Chef's Table */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">The Chef's Table</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  For the ultimate culinary experience, reserve our Chef’s Table. Seated just steps from the open kitchen, you’ll enjoy a custom multi‑course tasting menu crafted by Chef Mireille herself, with wine pairings from our cellar.
                </p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <ChefHat className="text-lush w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Interactive experience – ask questions, learn techniques, watch the magic unfold.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wine className="text-lush w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Exclusive wine pairings featuring Cameroonian and international labels.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="text-lush w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Intimate setting for up to 8 guests – perfect for special celebrations.</span>
                  </li>
                </ul>
                <button className="mt-8 bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                  Inquire About Chef's Table
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
          <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">What Our Guests Say</h2>
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

        {/* Call to Action */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Reserve Your Table</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Whether it’s a romantic dinner, a family celebration, or a business meal, we look forward to hosting you.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              Make a Reservation <ArrowRight className="w-4 h-4" />
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

**Size:** 7273 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { 
  PlaneTakeoff, Car, Shield, Clock, MapPin, Wifi, 
  Coffee, Briefcase, ArrowRight, Star 
} from "lucide-react";

const fleetFeatures = [
  { icon: <Shield className="w-6 h-6" />, text: "Chauffeurs trained in diplomatic protocol" },
  { icon: <Clock className="w-6 h-6" />, text: "Flight tracking – we adjust to your schedule" },
  { icon: <Wifi className="w-6 h-6" />, text: "In-vehicle Wi-Fi and charging" },
  { icon: <Coffee className="w-6 h-6" />, text: "Complimentary refreshments" },
];

const testimonials = [
  { quote: "After a long flight, stepping into a waiting Ngeme vehicle felt like coming home. Flawless.", author: "— Ambassador K. Mbaye, Senegal" },
  { quote: "They handled our group of 12 with multiple stops effortlessly. Truly professional.", author: "— Dr. Linda T., USA" },
];

export default function DiplomaticTransfers() {
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Transport</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Diplomatic <span className="italic text-lush">Transfers</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                Your journey begins the moment you land. Our professional chauffeurs and late‑model vehicles ensure your transition from Douala International to Ngeme is seamless, safe, and serene.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                We track every flight, handle your luggage with care, and provide amenities designed for the traveler who expects more. Whether you're arriving for business or leisure, we set the tone.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Douala International Airport (DLA)</span>
                </div>
                <div className="flex items-center gap-3">
                  <PlaneTakeoff className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">24/7 availability</span>
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
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">The Transfer Experience</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
              More than a ride, we manage every detail so you can arrive refreshed.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {fleetFeatures.map((feat, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">{feat.icon}</div>
                  </div>
                  <p className="text-volcanic/80 font-medium">{feat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Options */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-12 text-center">Our Fleet</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Executive Sedan", capacity: 3, image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600" },
              { name: "Luxury SUV", capacity: 6, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600" },
              { name: "VIP Van", capacity: 10, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600" },
            ].map((vehicle, idx) => (
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
          <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">Trusted by Discerning Travelers</h2>
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
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Arrange Your Transfer</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Provide your flight details, and we'll be waiting when you arrive.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              Book a Transfer <ArrowRight className="w-4 h-4" />
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

**Size:** 8573 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { BookOpen, Search, Globe, Clock, Users, Award, ArrowRight, BookMarked } from "lucide-react";

const collectionHighlights = [
  { title: "African Philosophy", count: "1,200+ volumes", icon: <BookOpen className="w-8 h-8" /> },
  { title: "Cameroonian Law", count: "800+ texts", icon: <BookMarked className="w-8 h-8" /> },
  { title: "Post-Colonial Literature", count: "600+ titles", icon: <BookOpen className="w-8 h-8" /> },
  { title: "Rare Manuscripts", count: "50+ archival items", icon: <Award className="w-8 h-8" /> },
];

const services = [
  { icon: <Search className="w-6 h-6" />, title: "Research Assistance", description: "Librarians available to help locate materials and navigate databases." },
  { icon: <Globe className="w-6 h-6" />, title: "Digital Access", description: "High-speed internet and subscriptions to academic journals." },
  { icon: <Users className="w-6 h-6" />, title: "Scholar Residencies", description: "Dedicated workspace for visiting researchers." },
];

export default function FisiyLibrary() {
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Knowledge Hub</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                The Fisiy <span className="italic text-lush">Research Library</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                A sanctuary for the serious mind. Our library houses a private collection of African literature, law, social science, and rare archival materials, curated over decades by Dr. Cyprian Fisiy and colleagues.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                With reading rooms overlooking the Atlantic, high‑speed internet, and a librarian on hand, it's the perfect environment for deep work, writing, and cross‑continental dialogue.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Clock className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Open daily 8am – 8pm</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Resort guests & visiting scholars</span>
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
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">The Collection</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
              A living archive focused on African thought, law, and letters.
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              {collectionHighlights.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">{item.icon}</div>
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
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-12 text-center">Beyond the Stacks</h2>
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
                  <div className="text-lush">{s.icon}</div>
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
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Scholar Residencies</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  We offer dedicated workspace and accommodation packages for researchers, writers, and academics. Stay for a week or a month, immerse yourself in the collection and the landscape.
                </p>
                <ul className="space-y-3 text-white/80">
                  <li>• Private study carrels with ocean views</li>
                  <li>• Access to rare materials and digital databases</li>
                  <li>• Weekly seminars with fellow residents</li>
                  <li>• Inclusive meal plan at the resort</li>
                </ul>
                <button className="mt-8 bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                  Apply for Residency
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
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Plan Your Research Visit</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Whether you're a guest at the resort or a scholar seeking a quiet place to work, we welcome you.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              Inquire About Access <ArrowRight className="w-4 h-4" />
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

**Size:** 25091 bytes  
```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { 
  Mic2, Calendar, Users, MapPin, Star, ArrowRight, Quote, 
  Youtube, Play, X, Clock, BookOpen, Globe, Award, Eye 
} from "lucide-react";

// Sample past talks data with YouTube links
const pastTalks = [
  {
    id: 1,
    title: "The Future of African Governance: Digital Democracy",
    speaker: "Dr. Ngozi Okonjo-Iweala",
    speakerTitle: "WTO Director-General",
    date: "March 12, 2026",
    description: "In this powerful address, Dr. Okonjo-Iweala explores how digital transformation is reshaping governance across the continent, from blockchain voting systems to AI-driven public service delivery. She argues that Africa has a unique opportunity to leapfrog traditional bureaucratic models and build institutions that are more transparent, accountable, and inclusive than those in the West.",
    youtubeId: "5Aa9Mc1VqKE", // Replace with actual YouTube IDs
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    duration: "54:32",
    views: "2.4K"
  },
  {
    id: 2,
    title: "Planetary Entanglements: Africa in the Anthropocene",
    speaker: "Prof. Achille Mbembe",
    speakerTitle: "Philosopher & Political Theorist",
    date: "February 8, 2026",
    description: "Professor Mbembe delivers a profound meditation on Africa's relationship to the planet, how the continent's ecological wisdom, forged over millennia, offers vital lessons for a world facing climate catastrophe. He challenges the audience to rethink development not as extraction but as reciprocal care between human and non-human worlds.",
    youtubeId: "5Aa9Mc1VqKE",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600",
    duration: "1:12:18",
    views: "3.1K"
  },
  {
    id: 3,
    title: "The Danger of a Single Story: Reimagining African Narratives",
    speaker: "Chimamanda Ngozi Adichie",
    speakerTitle: "Author",
    date: "January 19, 2026",
    description: "Building on her legendary TED Talk, Chimamanda engages in a intimate conversation about the power of stories to shape perceptions, and the responsibility of African writers to tell their own tales. She reads from unpublished work and discusses how literature can heal the wounds of colonial historiography.",
    youtubeId: "5Aa9Mc1VqKE",
    image: "https://images.unsplash.com/photo-1544717301-9cdcb1f5940f?auto=format&fit=crop&q=80&w=600",
    duration: "1:08:45",
    views: "5.7K"
  },
  {
    id: 4,
    title: "Restorative Justice: Lessons from Post-Apartheid South Africa",
    speaker: "Judge Albie Sachs",
    speakerTitle: "Former Justice, Constitutional Court of South Africa",
    date: "December 5, 2025",
    description: "Judge Sachs shares riveting stories from the Truth and Reconciliation Commission and reflects on how societies torn by conflict can begin to heal. He argues that true justice is not punitive but restorative, a lesson as urgent for divided democracies today as it was in 1994.",
    youtubeId: "5Aa9Mc1VqKE",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    duration: "1:24:09",
    views: "1.8K"
  },
  {
    id: 5,
    title: "AI and the Future of African Governance",
    speaker: "Dr. Fei-Fei Li (via satellite)",
    speakerTitle: "Co-Director, Stanford Human-Centered AI Institute",
    date: "November 22, 2025",
    description: "In a historic satellite link, Dr. Li discusses how artificial intelligence can be harnessed for public good, from predicting disease outbreaks to optimizing crop yields. She emphasizes the need for African leadership in shaping AI ethics, ensuring that algorithms reflect the continent's diverse cultures and values.",
    youtubeId: "5Aa9Mc1VqKE",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    duration: "1:05:22",
    views: "4.2K"
  }
];

const upcomingEvents = [
  { date: "May 15, 2026", topic: "AI and the Future of African Governance", speaker: "Dr. Fei-Fei Li (via satellite)" },
  { date: "June 3, 2026", topic: "Restorative Justice: Lessons from the Global South", speaker: "Judge Albie Sachs" },
  { date: "July 21, 2026", topic: "African Philosophy in the 21st Century", speaker: "Prof. Souleymane Bachir Diagne" },
];

export default function IntellectualTalks() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAllTalks, setShowAllTalks] = useState(false);

  // For empty state demonstration (comment out the pastTalks array above and uncomment below to test)
  // const pastTalks = [];

  const displayedTalks = showAllTalks ? pastTalks : pastTalks.slice(0, 3);

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero - enriched with more context */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">
                Thought Leadership
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Ocean-Side <span className="italic text-lush">Intellectual Talks</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                Where the Atlantic meets the avant‑garde. Our signature series brings together the world's brightest minds for intimate dialogues under the stars. Each session is a deep dive into the ideas shaping our continent and our century, from philosophy and governance to technology and the arts.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                What began in 2023 as intimate conversations around a fire pit has grown into a globally recognized forum. Past speakers include Nobel laureates, heads of state, and cultural icons, all invited not for their titles, but for their willingness to think out loud, to question orthodoxy, and to engage with our guests as equals.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">The Lighthouse Pavilion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Every Thursday evening</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Recorded & archived on YouTube</span>
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
                <p className="text-xl font-serif italic">"The future is not something we enter. The future is something we create."</p>
                <p className="text-white/70 mt-2">— Prof. Achille Mbembe, February 2026</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Experience - expanded with more text */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6 text-center">More Than a Lecture</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-3xl mx-auto mb-12">
              We reject the passive auditorium model. Our talks are designed for genuine intellectual exchange, where the distance between speaker and audience dissolves, and ideas flow freely.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-lush/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-lush" />
                </div>
                <h3 className="text-xl font-serif text-volcanic mb-3">Intimate Setting</h3>
                <p className="text-volcanic/60">Limited to 30 guests, allowing genuine exchange between audience and speaker. No podiums, no barriers, just chairs arranged in a circle under the stars.</p>
              </div>
              <div className="text-center">
                <div className="bg-lush/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-lush" />
                </div>
                <h3 className="text-xl font-serif text-volcanic mb-3">Global Voices, Local Wisdom</h3>
                <p className="text-volcanic/60">We deliberately pair international thought leaders with Cameroonian elders, activists, and artists. The result is a dialogue that transcends cultural boundaries.</p>
              </div>
              <div className="text-center">
                <div className="bg-lush/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-lush" />
                </div>
                <h3 className="text-xl font-serif text-volcanic mb-3">Lasting Archive</h3>
                <p className="text-volcanic/60">Every talk is professionally recorded and made available on our YouTube channel, building a growing library of African intellectual thought for the world.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Past Talks - Video Cards */}
        <section className="container mx-auto px-6 mb-20">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic">Past Talks</h2>
              <p className="text-volcanic/60 text-lg mt-2">Watch full recordings of previous sessions</p>
            </div>
            {pastTalks.length > 3 && (
              <button 
                onClick={() => setShowAllTalks(!showAllTalks)}
                className="flex items-center gap-2 text-lush font-bold uppercase tracking-wider text-sm hover:gap-3 transition-all"
              >
                {showAllTalks ? "Show Less" : "View All Talks"} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {pastTalks.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-16 text-center border border-sand/40">
              <Youtube className="w-16 h-16 text-lush/30 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-volcanic mb-3">Coming Soon</h3>
              <p className="text-volcanic/50 text-lg max-w-md mx-auto mb-6">
                Our inaugural talk series launches in June 2026. We're curating an extraordinary lineup of thinkers, subscribe to be notified.
              </p>
              <button className="bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                Get Notified
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
                      <img 
                        src={talk.image} 
                        alt={talk.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
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
                  <button 
                    onClick={() => setShowAllTalks(true)}
                    className="inline-flex items-center gap-2 bg-volcanic text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-lush transition-colors"
                  >
                    Load All {pastTalks.length} Talks <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Upcoming Events */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 text-center">Upcoming Dialogues</h2>
              <p className="text-white/60 text-lg text-center max-w-2xl mx-auto mb-12">
                Join us under the stars for these upcoming conversations. Space is limited, reservations recommended.
              </p>
              <div className="space-y-4 max-w-3xl mx-auto">
                {upcomingEvents.map((event, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-white/20"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-lush font-bold text-sm">{event.date}</span>
                      </div>
                      <h3 className="text-xl font-serif text-white mb-1">{event.topic}</h3>
                      <p className="text-white/70">with {event.speaker}</p>
                    </div>
                    <button className="bg-lush text-volcanic px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap">
                      Reserve Seat
                    </button>
                  </motion.div>
                ))}
              </div>
              <p className="text-white/40 text-center mt-8 text-sm max-w-2xl mx-auto">
                All talks are complimentary for resort guests. External attendance is available by prior arrangement, please contact our concierge.
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters - new section with deeper context */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
                The Vision
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Why Intellectual Talks?</h2>
              <p className="text-volcanic/70 text-lg leading-relaxed mb-6">
                In an age of soundbites and algorithms, we believe in the power of slow, sustained thought. The most urgent problems facing Africa and the world, climate change, inequality, democratic backsliding, cannot be solved by quick fixes. They require deep, interdisciplinary dialogue.
              </p>
              <p className="text-volcanic/70 text-lg leading-relaxed mb-6">
                Our talks are designed to model what that dialogue looks like: rigorous, respectful, and radically open. We invite speakers not to deliver a monologue, but to enter into conversation with our guests, with local thinkers, and with the place itself, the volcanic shores of Limbe, where Africa meets the Atlantic.
              </p>
              <p className="text-volcanic/70 text-lg leading-relaxed">
                Each talk is recorded and archived, creating a growing digital library of African intellectual thought, accessible to anyone, anywhere, for free. Because the conversations that happen here shouldn't end at the water's edge.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Award className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">12</div>
                <div className="text-xs text-volcanic/50">Talks to date</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Users className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">360+</div>
                <div className="text-xs text-volcanic/50">Attendees</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Globe className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">14</div>
                <div className="text-xs text-volcanic/50">Countries represented</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Youtube className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">17K+</div>
                <div className="text-xs text-volcanic/50">YouTube views</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Join the Conversation</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Whether you're a guest at Ngeme or a scholar visiting Cameroon, we invite you to be part of these transformative evenings. Subscribe to our newsletter for updates on upcoming talks and new video releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                Attend a Talk <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="https://youtube.com/@ngemeresort" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-2 border-volcanic text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all"
              >
                <Youtube className="w-4 h-4" /> Watch on YouTube
              </a>
            </div>
          </div>
        </section>

        {/* YouTube Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-volcanic/80 backdrop-blur-lg"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2rem] max-w-4xl w-full overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 z-10 bg-volcanic text-white p-2 rounded-full hover:bg-lush transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  {/* YouTube Embed */}
                  <div className="relative pt-[56.25%] bg-black">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
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

**Size:** 6785 bytes  
```jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { Car, Fuel, Settings, Users, Wifi, Shield, ArrowRight, Map, Star } from "lucide-react";

const vehicles = [
  { name: "Land Rover Defender", type: "4x4", capacity: 5, features: ["Off-road ready", "AC", "Bluetooth"], image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600" },
  { name: "Mercedes-Benz V-Class", type: "Luxury Van", capacity: 7, features: ["Leather seats", "Wi-Fi", "Mini-bar"], image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600" },
  { name: "Toyota Land Cruiser", type: "SUV", capacity: 5, features: ["High clearance", "Snorkel", "GPS"], image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600" },
];

const services = [
  { icon: <Car className="w-6 h-6" />, title: "Self-Drive", description: "For those who prefer independence, fully insured, delivered to the resort." },
  { icon: <Users className="w-6 h-6" />, title: "Chauffeur-Driven", description: "Professional local driver who doubles as a guide." },
  { icon: <Map className="w-6 h-6" />, title: "Regional Travel", description: "Available for trips to Yaoundé, Kribi, or further." },
];

export default function PremiumFleet() {
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Mobility</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Premium <span className="italic text-lush">Fleet</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                Explore Cameroon at your own pace with our meticulously maintained fleet of luxury vehicles. Whether you prefer the independence of self‑drive or the insight of a local chauffeur, we provide the wheels for your journey.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                All vehicles are equipped for the region,high clearance, air conditioning, and modern safety features. We deliver to the resort and handle all paperwork.
              </p>
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
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">Our Vehicles</h2>
          <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
            Choose from our selection of premium vehicles, each maintained to international standards.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {vehicles.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-sand/40"
              >
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
                    View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Service Options */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-sand/40">
            <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">How You Want to Drive</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((s, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">{s.icon}</div>
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
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Reserve Your Vehicle</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Contact our fleet team to check availability and arrange delivery.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              Inquire About Rental <ArrowRight className="w-4 h-4" />
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
- **Total files extracted:** 44
- **Output file:** `project_code.md`
- **Generated on:** 2026-03-25 10:06:52
