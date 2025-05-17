# MEDIIO - Interne Verwaltung

Eine React Native (Expo) Web-App zur internen Verwaltung von Kliniken, Einkaufsgemeinschaften, Lieferanten und Kunden.

## Funktionen

- Verwaltung von Kliniken mit Namen, Adressen und Ansprechpartnern
- Organisation von Einkaufsgemeinschaften und deren Klinikzugehörigkeiten
- Erfassung von Lieferanten und deren Produktangeboten
- Kundenverwaltung mit Klinikzugehörigkeiten

## Technologien

- React Native / Expo
- Zustand für State Management
- AsyncStorage für Datenpersistenz
- Expo Router für Navigation
- Lucide Icons

## Deployment

### Lokale Entwicklung

```bash
# Installieren der Abhängigkeiten
npm install

# Starten der Entwicklungsumgebung
npm start

# Starten der Web-Version
npm run start-web
```

### Vercel Deployment

Diese App ist für das Deployment auf Vercel optimiert. Folgen Sie diesen Schritten:

1. Pushen Sie das Repository zu GitHub
2. Verbinden Sie das Repository mit Vercel
3. Wichtig: Wählen Sie "create-react-app" als Framework-Preset
4. Die Konfiguration wird automatisch aus vercel.json geladen:
   - Build Command: `npm run vercel-build`
   - Output Directory: `web-build`
5. Klicken Sie auf "Deploy"

## Projektstruktur

```
mediio-app/
├── app/                  # Expo Router Dateien
├── components/           # UI-Komponenten
│   ├── sections/         # Hauptabschnitte der App
│   └── ui/               # Wiederverwendbare UI-Elemente
├── hooks/                # Custom React Hooks
├── stores/               # Zustand Stores
└── types/                # TypeScript Typdefinitionen
```

## Lizenz

Intern - Alle Rechte vorbehalten