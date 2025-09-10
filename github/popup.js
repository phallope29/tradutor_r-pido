const button = document.getElementById("translateBtn");
const resultDiv = document.getElementById("result");

button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Pega a palavra selecionada na página
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => window.getSelection().toString(),
    },
    (selection) => {
      const text = selection[0].result;
      if (!text) {
        resultDiv.innerText = "Selecione algo primeiro!";
        return;
      }

      // URL do Google Translate (API gratuita)
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(text)}`;

      fetch(url)
        .then((res) => res.json()
        .then((dat))
