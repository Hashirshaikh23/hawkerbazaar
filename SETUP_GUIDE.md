# SheMarket - Local Setup Guide

Follow these steps to download and run the SheMarket project on your local machine.

---

## Step 1: Download All Files

You need to manually download all the project files from Figma Make. Here's the complete file structure:

### Create this folder structure:

```
shemarket/
├── public/
├── src/
│   ├── components/
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── card.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── switch.tsx
│   │   │   └── utils.ts
│   │   ├── Header.tsx
│   │   ├── HomePage.tsx
│   │   ├── ProductListPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrderConfirmationPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── VendorDashboard.tsx
│   │   ├── VendorOnboarding.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AuthModal.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── mockData.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

### Files to copy from Figma Make:

1. **Configuration files** (already provided):
   - `package.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - `tsconfig.node.json`
   - `index.html`
   - `.gitignore`

2. **Source files** - Copy these from the Figma Make interface:
   - All files in `/components/` folder
   - All files in `/lib/` folder
   - All files in `/styles/` folder
   - `/App.tsx`
   - `/src/main.tsx`

---

## Step 2: Install Node.js

If you don't have Node.js installed:

1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Install it (this also installs npm)
4. Verify installation by opening terminal/command prompt:
   ```bash
   node --version
   npm --version
   ```

---

## Step 3: Project Setup

### Option A: If you have all files downloaded

1. Open terminal/command prompt
2. Navigate to your project folder:
   ```bash
   cd path/to/shemarket
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   This will take a few minutes and download all required packages.

### Option B: Quick Start with Copy-Paste

1. Create a new folder called `shemarket`
2. Copy all the files maintaining the folder structure shown above
3. Open terminal in the `shemarket` folder
4. Run:
   ```bash
   npm install
   ```

---

## Step 4: Run the Development Server

After installation is complete:

```bash
npm run dev
```

You should see output like:
```
  VITE v5.4.2  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Step 5: Open in Browser

1. Open your web browser
2. Go to: `http://localhost:5173`
3. The SheMarket application should now be running!

---

## Common Issues & Solutions

### Issue: "npm: command not found"
**Solution**: Install Node.js (see Step 2)

### Issue: Port 5173 already in use
**Solution**: Either:
- Stop the other application using that port, OR
- Vite will automatically try port 5174, 5175, etc.

### Issue: Module not found errors
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
**Solution**: Make sure all files are copied correctly with proper folder structure

---

## Development Tips

### Hot Module Replacement (HMR)
- Changes you make to files will automatically refresh in the browser
- No need to restart the dev server

### Viewing on Mobile
1. Run: `npm run dev -- --host`
2. Look for the Network URL (e.g., `http://192.168.1.x:5173`)
3. Access this URL from your phone (must be on same WiFi)

### Building for Production
```bash
npm run build
```
This creates optimized files in the `dist/` folder

### Preview Production Build
```bash
npm run preview
```
Test the production build locally before deploying

---

## Recommended VS Code Extensions

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

---

## Next Steps After Setup

1. ✅ Verify all pages work:
   - Home page (`/`)
   - Products (`/products`)
   - Cart (`/cart`)
   - Vendor Dashboard (`/vendor`)
   - Admin Dashboard (`/admin`)

2. 🎨 Customize:
   - Update mock data in `/lib/mockData.ts`
   - Adjust colors in `/styles/globals.css`
   - Modify components as needed

3. 🚀 Deploy:
   - Deploy to Vercel, Netlify, or your preferred hosting
   - Run `npm run build` first

---

## Support

If you encounter issues:
1. Check that all files are copied correctly
2. Ensure Node.js version is 18 or higher
3. Delete `node_modules` and run `npm install` again
4. Check browser console for errors

---

## File Download Checklist

Use this checklist to ensure you have all files:

### Root Files
- [ ] package.json
- [ ] vite.config.ts
- [ ] tsconfig.json
- [ ] tsconfig.node.json
- [ ] index.html
- [ ] .gitignore
- [ ] README.md

### Source Files (src/)
- [ ] main.tsx
- [ ] App.tsx

### Components (src/components/)
- [ ] Header.tsx
- [ ] HomePage.tsx
- [ ] ProductListPage.tsx
- [ ] ProductDetailPage.tsx
- [ ] CartPage.tsx
- [ ] CheckoutPage.tsx
- [ ] OrderConfirmationPage.tsx
- [ ] OrdersPage.tsx
- [ ] VendorDashboard.tsx
- [ ] VendorOnboarding.tsx
- [ ] AdminDashboard.tsx
- [ ] AuthModal.tsx
- [ ] Footer.tsx

### UI Components (src/components/ui/)
- [ ] button.tsx
- [ ] input.tsx
- [ ] label.tsx
- [ ] select.tsx
- [ ] card.tsx
- [ ] badge.tsx
- [ ] tabs.tsx
- [ ] separator.tsx
- [ ] switch.tsx
- [ ] utils.ts

### Figma Components (src/components/figma/)
- [ ] ImageWithFallback.tsx

### Library (src/lib/)
- [ ] mockData.ts

### Styles (src/styles/)
- [ ] globals.css

---

Good luck! 🚀
