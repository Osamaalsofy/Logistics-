# Images Directory (`/public/images`)

This directory is configured to store all static image assets for the website.

### Folder Structure
- `/public/images/hero/`: Hero banners and container vessel backgrounds
- `/public/images/solutions/`: Freight, shipping, customs, and warehousing solution imagery
- `/public/images/fleet/`: Trucks, storage facilities, and fleet photos
- `/public/images/branding/`: Logos, icons, and badges

### Usage in Code
Any file placed inside `/public/images/` is directly accessible in React components via:
```tsx
<img src="/images/hero/wmremove-transformed.png" alt="Container Vessel" />
```
Or referenced in `/src/data/logisticsData.ts` under the `ASSETS` dictionary.
