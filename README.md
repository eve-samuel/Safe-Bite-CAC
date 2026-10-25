# Safe-Bite-CAC

## Run the app

Serve the project over `localhost` (camera access is not available to most pages opened as `file://` URLs). For example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser and allow camera access. Tesseract.js runs OCR in the browser; its library and English language data are loaded from jsDelivr, so an internet connection is needed the first time it is used. The captured image is processed in the browser and is not sent to an OCR backend.

OCR can miss or misread small, blurry, or poorly lit ingredient text. Always verify the package label directly.