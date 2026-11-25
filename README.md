# Team Work Tracker

Static site (index.html) + optional Cloudflare Pages Function for shared storage.

## 1. Test on your PC
    cd team-tracker
    python -m http.server 8000      # open http://localhost:8000
Data is saved in your browser (localStorage) in this mode. Only you can see it.

## 2. Push to GitHub
    git init && git add . && git commit -m "team tracker"
    git remote add origin <your-repo-url> && git push -u origin main

## 3. Cloudflare Pages
Workers & Pages > Create > Pages > Connect to Git > pick the repo.
Build command: (none). Output directory: `/` (root).

## 4. Make data shared for the whole team
1. Cloudflare dashboard > Storage & Databases > KV > Create namespace `team-tracker`.
2. Your Pages project > Settings > Bindings (Functions) > Add > KV namespace:
   variable name `TASKS`, choose the namespace. Do this for Production.
3. Redeploy. Everyone now sees and adds tasks on the same board.

Protect the site (it has no login) with Cloudflare Access: Zero Trust > Access > Applications.
