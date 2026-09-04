const words = ["@Mia Zzz"];

// Delay settings (in milliseconds)
const typingSpeed = 250;         // Delay between each typed character
const deletingSpeed = 200;        // Delay between each deleted character
const pauseBetweenTyping = 1000; // After full word is typed
const pauseBetweenDeleting = 600; // After full word is deleted

let i = 0; // Index of current word
let j = 0; // Index of character
let isDeleting = false;
let isPaused = false;

function typeTitle() {
  const currentWord = words[i];
  const typedText = currentWord.substring(0, j);
  const cursor = isDeleting ? "" : "▍"; // blinking-style cursor (optional)
  document.title = typedText + cursor;

  if (isPaused) return;

  if (!isDeleting) {
    if (j < currentWord.length) {
      j++;
      setTimeout(typeTitle, typingSpeed);
    } else {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        i = (i + 1) % words.length;
        typeTitle();
      }, pauseBetweenTyping);
    }
  } else {
    if (j > 0) {
      j--;
      setTimeout(typeTitle, deletingSpeed);
    } else {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = false;
        typeTitle();
      }, pauseBetweenDeleting);
    }
  }
}

// Start typing once DOM is ready
window.addEventListener("DOMContentLoaded", typeTitle);

// Clipboard copy function
function copyToClipboard() {
  const text = "agirllostinreverie";
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("copy-toast");
    toast.classList.remove("hidden");
    toast.classList.add("opacity-100");

    // Hide after 2.5 seconds
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 2500);
  }).catch(err => {
    console.error("Failed to copy: ", err);
  });
}
