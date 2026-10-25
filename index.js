// Each key matches an allergy checkbox, and its list contains label terms that may
// indicate that allergen. The scan checks only the lists for allergies the user selects.
const allergyWords = {
  peanuts: [
    "peanut", "peanuts", "arachis", "groundnut", "groundnuts", "arachis oil", "peanut oil", "beer nuts", "earth nuts",
    "frangipane", "goobers", "goober peas", "hydrolyzed plant protein", "hydrolyzed vegetable protein", "hypogaeic acid",
    "mandelona", "monkey nuts", "nu-nuts", "peanut flour", "satay", "satay sauce"
  ],
  soy: [
    "soybeans", "soybean", "edamame", "glycine max", "soya", "soy", "soja", "koji", "natto", "tempeh", "tofu",
    "bean curd", "doufu", "yuba", "hydrolyzed soy protein", "hsp", "hydrolyzed vegetable protein"
  ],
  wheat: [
    "wheat", "triticum", "bread crumbs", "bulgur", "cereal extract", "club wheat", "couscous", "cracker meal", "durum",
    "einkorn", "emmer", "farina", "farro", "flour", "all-purpose flour", "bread flour", "cake flour", "enriched flour",
    "graham flour", "high-gluten flour", "high-protein flour", "instant flour", "pastry flour", "self-rising flour",
    "soft wheat flour", "steel ground flour", "stone ground flour", "whole wheat flour", "freekeh", "hydrolyzed wheat protein",
    "kamut", "matzoh", "matzoh meal", "matzo", "matzah", "matza", "pasta", "seitan", "semolina", "spelt",
    "sprouted wheat", "triticale", "vital wheat gluten", "wheat bran", "wheat durum", "wheat germ", "wheat gluten",
    "wheat grass", "wheat malt", "wheat sprouts", "wheat starch", "wheat bran hydrolysate", "wheat germ oil",
    "wheat protein isolate", "whole wheat berries"
  ],
  fish: [
    "fish", "anchovy", "anchovies", "bass", "catfish", "cod", "flounder", "grouper", "haddock", "hake", "halibut",
    "herring", "mahi mahi", "mackerel", "monkfish", "perch", "pike", "pollock", "salmon", "sardine", "sardines",
    "snapper", "sole", "tilapia", "trout", "tuna", "surimi", "fish sauce", "fish stock", "worcestershire sauce",
    "caesar dressing", "bonito", "caviar", "roe", "isinglass", "omega-3 fish oil"
  ],
  eggs: [
    "egg", "eggs", "albumin", "albumen", "ovalbumin", "conalbumin", "ovomucoid", "ovoglobulin", "ovomucin", "lysozyme",
    "eggnog", "mayonnaise", "meringue", "surimi", "vitellin", "ovavitellin", "lecithin", "egg lecithin", "egg powder",
    "dried egg", "egg whites", "egg yolks", "globulin", "livetin", "simplesse"
  ],
  milk: [
    "milk", "butter", "casein", "caseinates", "whey", "whey protein", "lactalbumin", "lactoglobulin", "lactoferrin",
    "lactose", "curds", "ghee", "cream", "buttermilk", "cheese", "yogurt", "sour cream", "custard", "pudding",
    "nougat", "diacetyl", "milk solids", "milk powder", "dry milk solids", "condensed milk", "evaporated milk", "malted milk",
    "lactulose", "recident", "tagatose", "half & half", "goat milk", "sheep milk"
  ],
  tree_nuts: [
    "almond", "almonds", "walnut", "walnuts", "black walnut", "california walnut", "english walnut", "persian walnut",
    "cashew", "cashews", "filbert", "filberts", "hazelnut", "hazelnuts", "heartnut", "heartnuts", "japanese walnut",
    "macadamia nut", "macadamia nuts", "bush nut", "pecan", "pecans", "pine nut", "pine nuts", "pignoli", "pistachio",
    "pistachios", "brazil nut", "brazil nuts", "gianduja", "marzipan", "almond paste", "nougat", "pesto", "nut butter",
    "nut oil", "artificial nuts", "natural nut extract"
  ],
  sesame: [
    "sesame", "sesame seed", "sesame seeds", "sesame oil", "sesame paste", "tahini", "tahina", "til", "teel", "benne",
    "benne seed", "benni", "gingelly", "gingelly oil", "til oil", "gomasio", "halvah", "halva", "sesamol",
    "sesamolina", "sesamum indicum"
  ]
};

// Messages displayed to the user during scanning, reading, and error handling. Each language has its own set of messages.
const appMessages = {
  english: {
    loadingOcr: "The OCR library did not load. Check your internet connection and reload the page.",
    readingLabel: "Reading the label...",
    emptyText: "No readable text was found. Move closer, improve the lighting, and try again.",
    failedRead: "The label could not be read. Check your internet connection, improve the image, and try again.",
    selectionError: "Select at least one allergy before continuing.",
    safeMatch: "No selected allergy keywords were found in the text OCR could read.",
    unsafeMatchPrefix: "Matched label terms: "
  },
  spanish: {
    loadingOcr: "La biblioteca OCR no se cargó. Verifique su conexión a internet y vuelva a cargar la página.",
    readingLabel: "Leyendo la etiqueta...",
    emptyText: "No se encontró texto legible. Acérquese, mejore la iluminación e inténtelo de nuevo.",
    failedRead: "No se pudo leer la etiqueta. Verifique su conexión a internet, mejore la imagen e inténtelo de nuevo.",
    selectionError: "Seleccione al menos una alergia antes de continuar.",
    safeMatch: "No se encontraron palabras clave de alergias seleccionadas en el texto que el OCR pudo leer.",
    unsafeMatchPrefix: "Términos de etiqueta coincidentes: "
  },
  chinese: {
    loadingOcr: "OCR 库未加载。请检查您的互联网连接并重新加载页面。",
    readingLabel: "正在读取标签...",
    emptyText: "未找到可读文本。请移近一些、改善光线并重试。",
    failedRead: "无法读取标签。请检查您的互联网连接、改善图像并重试。",
    selectionError: "请在继续之前选择至少一种过敏原。",
    safeMatch: "在 OCR 可以读取的文本中未找到所选的过敏原关键词。",
    unsafeMatchPrefix: "匹配的标签条款: "
  },
  hindi: {
    loadingOcr: "OCR लाइब्रेरी लोड नहीं हुई। अपना इंटरनेट कनेक्शन जांचें और पेज को फिर से लोड करें।",
    readingLabel: "लेबल पढ़ा जा रहा है...",
    emptyText: "कोई पठनीय टेक्स्ट नहीं मिला। थोड़ा पास लाएं, लाइटिंग बेहतर करें, और फिर से प्रयास करें।",
    failedRead: "लेबल नहीं पढ़ा जा सका। अपना इंटरनेट कनेक्शन जांचें, इमेज बेहतर करें, और फिर से प्रयास करें।",
    selectionError: "आगे बढ़ने से पहले कम से कम एक एलर्जी चुनें।",
    safeMatch: "ओसीआर द्वारा पढ़े जा सकने वाले टेक्स्ट में कोई भी चुनी हुई एलर्जी के कीवर्ड नहीं मिले।",
    unsafeMatchPrefix: "मैच किए गए लेबल शब्द: "
  }
};



// Stores the allergen terms chosen by the user for the current scan.
const state = {
  activeKeywords: []
};

// Look up the HTML elements that the JavaScript needs to show screens, read input,
// control the camera, and display the scan result.
const allergyScreen = document.getElementById("allergy-setup");
const cameraScreen = document.getElementById("camera-screen");
const safeScreen = document.getElementById("safe-screen");
const unsafeScreen = document.getElementById("unsafe-screen");
const unverifiedScreen = document.getElementById("unverified-screen");
const resultScreen = document.getElementById("result-screen");
const unverifiedMessage = document.getElementById("unverified-message");
const videoElement = document.getElementById("webcam");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const captureButton = document.getElementById("capture-btn");
const selectionError = document.getElementById("selection-error");
const scanStatus = document.getElementById("scan-status");
const scanDetails = document.getElementById("scan-details");
const scanMatchMessage = document.getElementById("scan-match-message");
const recognizedTextElement = document.getElementById("recognized-text");



// Clear any previous allergen terms and uncheck the allergy boxes on page load.
function resetSelectionState() {
  state.activeKeywords = [];
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });
}

//Tracks what language the user has selected for the rotating hello message, updating all text on screens to that language. The default is English.
let currentLanguage = "english";
document.getElementById("chinese-btn").addEventListener("click", () => {
  currentLanguage = "chinese";
   document.body.setAttribute("data-lang", "chinese");
  document.getElementById("welcome-screen").style.display = "none";
  allergyScreen.style.display = "flex";
});
document.getElementById("spanish-btn").addEventListener("click", () => {
  currentLanguage = "spanish";
   document.body.setAttribute("data-lang", "spanish");
  document.getElementById("welcome-screen").style.display = "none";
  allergyScreen.style.display = "flex";
});
document.getElementById("english-btn").addEventListener("click", () => {
  currentLanguage = "english";
   document.body.setAttribute("data-lang", "english");
  document.getElementById("welcome-screen").style.display = "none";
  allergyScreen.style.display = "flex";
});
document.getElementById("hindi-btn").addEventListener("click", () => {
  currentLanguage = "hindi";
   document.body.setAttribute("data-lang", "hindi");
  document.getElementById("welcome-screen").style.display = "none";
  allergyScreen.style.display = "flex";
});


// Ask the browser for camera access, then show the live video in the webcam element.
function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("This browser does not support camera access.");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      videoElement.srcObject = stream;
      return videoElement.play();
    })
    .catch((error) => {
      console.error("Could not start camera:", error);
    });
}

// Make text easier to compare by using lowercase letters, removing punctuation,
// and replacing runs of punctuation or spaces with a single space.
function normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

// Compare the OCR result with the selected allergen terms, then show the result.
function checkLabelSafety(recognizedText) {
  // Surrounding the text with spaces lets the comparison match whole terms rather
  // than finding a short word inside a longer word.
  const normalizedText = ` ${normalizeText(recognizedText)} `;
  const detectedKeywords = state.activeKeywords.filter((keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    return normalizedKeyword && normalizedText.includes(` ${normalizedKeyword} `);
  });
  // Remove repeated terms in case the same term appears in multiple allergy lists.
  const uniqueDetectedKeywords = [...new Set(detectedKeywords)];

  // Keep the recognized text and matches available in the browser console for debugging.
  console.log("Recognized label text:", recognizedText);
  console.log("Selected allergen keywords found:", uniqueDetectedKeywords);
  showResultScreen(uniqueDetectedKeywords.length === 0, uniqueDetectedKeywords, recognizedText);
}

// Hide the camera and show either the safe or unsafe message and the OCR text.
// "Safe" here means only that no selected terms were found in the text OCR read.

// Next screen where the user will see if the food is safe or not based on the OCR results and their selected allergies

//safe screen
function showResultScreen(isSafe, detectedKeywords, recognizedText) {
  // Hide the camera and show either the safe or unsafe message and the OCR text.
  cameraScreen.style.display = "none";
  resultScreen.style.display = "flex";
  resultScreen.classList.toggle("is-safe", isSafe);
  resultScreen.classList.toggle("is-unsafe", !isSafe);
  safeScreen.style.display = isSafe ? "flex" : "none";
  unsafeScreen.style.display = isSafe ? "none" : "flex";
  unverifiedScreen.style.display = "none";
  scanDetails.style.display = "flex";
  scanMatchMessage.textContent = isSafe
    ? appMessages[currentLanguage].safeMatch
    : `${appMessages[currentLanguage].unsafeMatchPrefix}${detectedKeywords.join(", ")}`;
  recognizedTextElement.textContent = recognizedText;
}

// Show an error screen when the label could not be read well enough to check.
function showUnverifiedScreen(message) {
  cameraScreen.style.display = "none";
  resultScreen.style.display = "none";
  safeScreen.style.display = "none";
  unsafeScreen.style.display = "none";
  unverifiedMessage.textContent = message;
  unverifiedScreen.style.display = "flex";
}

// Gather the selected allergy terms, require at least one allergy, and then open
// the camera screen so the user can scan a food label.
document.getElementById("submit-allergies").addEventListener("click", () => {
  state.activeKeywords = [];
  selectionError.textContent = "";

  // Connect each checkbox in the HTML to its corresponding list of label terms.
  const allergySelections = [
    ["milk-checkbox", allergyWords.milk],
    ["eggs-checkbox", allergyWords.eggs],
    ["peanuts-checkbox", allergyWords.peanuts],
    ["tree-nuts-checkbox", allergyWords.tree_nuts],
    ["fish-checkbox", allergyWords.fish],
    ["soybeans-checkbox", allergyWords.soy],
    ["wheat-checkbox", allergyWords.wheat],
    ["sesame-checkbox", allergyWords.sesame]
  ];

  // Add the words for every checked allergy to the list used during scanning.
  allergySelections.forEach(([checkboxId, words]) => {
    const isSelected = document.getElementById(checkboxId).checked;
    if (isSelected) {
      state.activeKeywords = state.activeKeywords.concat(words);
    }
  });

  // Do not continue to scanning if the user has not selected an allergy to check.
  if (state.activeKeywords.length === 0) {
    selectionError.textContent = appMessages[currentLanguage].selectionError;
    return;
  }

  allergyScreen.style.display = "none";
  cameraScreen.style.display = "flex";
  startCamera();
});

// Take a still image from the live camera, send it to Tesseract.js for OCR
// (optical character recognition), and check the text it returns.
captureButton.addEventListener("click", () => {
  // The camera must have started and produced a frame before an image can be captured.
  if (!videoElement || !videoElement.videoWidth) {
    console.warn("The camera feed is not ready yet.");
    return;
  }

  // Match the canvas dimensions to the camera frame, then copy that frame onto it.
  canvas.width = videoElement.videoWidth || 1280;
  canvas.height = videoElement.videoHeight || 720;
  // picture of the label is drawn onto the canvas, which is then converted to a base64 image for OCR processing.
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Convert the captured canvas image to a format Tesseract.js can process.
  const imageBase64 = canvas.toDataURL("image/png");

  // OCR is loaded from the script in the HTML; show an error if it is unavailable.
  if (!window.Tesseract) {
    showUnverifiedScreen(appMessages[currentLanguage].loadingOcr);
    return;
  }

  // Prevent duplicate scans while OCR is working and show its current progress.
  captureButton.disabled = true;
  // loading message is displayed to inform the user that the label is being read.
  scanStatus.textContent = appMessages[currentLanguage].readingLabel;

  // Read English text from the image. Tesseract reports progress through logger;
  // the promise then either checks the recognized text or displays an error.
  window.Tesseract.recognize(imageBase64, "eng", {
    logger: (message) => {
      const progress = Number.isFinite(message.progress)
        ? ` ${Math.round(message.progress * 100)}%`
        : "";

      // Selects either the custom status string or handles the default localized label reading fallback
      const statusText = message.status === "recognizing text"
        ? appMessages[currentLanguage].readingLabel
        : (message.status || appMessages[currentLanguage].readingLabel);

      scanStatus.textContent = `${statusText}${progress}`;
    }
  })
    .then(({ data }) => {
      const recognizedText = data.text.trim();
      // An empty OCR result cannot be checked, so ask the user to try a clearer image.
      if (!recognizedText) {
        showUnverifiedScreen(appMessages[currentLanguage].emptyText);
        return;
      }
      checkLabelSafety(recognizedText);
    })
    .catch((error) => {
      // Log technical details for debugging and show a simpler message to the user.
      console.error("Could not read the label with Tesseract.js:", error);
      showUnverifiedScreen(appMessages[currentLanguage].failedRead);
    })

    .finally(() => {
      // Re-enable scanning and clear the progress message whether OCR succeeds or fails.
      captureButton.disabled = false;
      scanStatus.textContent = "";
    });
});

// Hide scan results or errors and return to the camera to take another picture.
function returnToCamera() {
  unverifiedScreen.style.display = "none";
  safeScreen.style.display = "none";
  unsafeScreen.style.display = "none";
  resultScreen.style.display = "none";
  cameraScreen.style.display = "flex";
}

// Let the user retry after either an unreadable scan or a displayed scan result.
document.getElementById("retry-scan").addEventListener("click", returnToCamera);
document.getElementById("retry-result-scan").addEventListener("click", returnToCamera);

// Start with a clean allergy checklist whenever the page loads.
resetSelectionState();
