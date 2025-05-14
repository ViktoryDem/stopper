document.addEventListener("DOMContentLoaded", function () {
  const audioBlock = document.getElementById("audio-track");
  const videoBlock = document.getElementById("video-file");

  if (audioBlock) {
    playAudio();
  }

  if (videoBlock) {
    playVideo();
  }

  if (document.querySelector(".fraud-game")) {
    const popupHTML = `
      <div class="popup-wrapper" id="answerPopup">
        <div class="popup">
          <div class="popup__icon"></div>
          <div class="popup__text"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", popupHTML);
  }

  // Initialize quiz answer selection
  document.querySelectorAll(".answer").forEach((option) => {
    option.addEventListener("click", () => {
      option.classList.add("selected");

      const isCorrect = option.getAttribute("data-correct") === "true";
      showPopup(isCorrect, option.getAttribute("data-url"));
    });
  });
});

function playAudio() {
  const audioContainer = document.querySelector("#audio-track");
  const audioSrc = audioContainer.getAttribute("data-source");
  const playPauseBtn = document.querySelector("#playPause");
  const playIcon = document.querySelector("#play");
  const pauseIcon = document.querySelector("#pause");
  const timeDisplay = document.querySelector(".time-readout");

  if (!audioSrc) return;

  const wavesurfer = WaveSurfer.create({
    container: "#audio-track",
    waveColor: "#d9d9d9",
    progressColor: "#ff553c",
    cursorColor: "#263c3c",
    cursorWidth: 0,
    barWidth: 2,
    barGap: 3,
    barRadius: 2,
    height: 45,
    splitChannels: false,
    normalize: true,
  });

  wavesurfer.load(audioSrc);

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      wavesurfer.playPause();
    });
  }

  function toggleIcons(isPlaying) {
    if (playIcon && pauseIcon) {
      playIcon.style.display = isPlaying ? "none" : "";
      pauseIcon.style.display = isPlaying ? "" : "none";
    }
  }

  wavesurfer.on("play", () => toggleIcons(true));
  wavesurfer.on("pause", () => toggleIcons(false));

  wavesurfer.on("audioprocess", () => {
    const currentTime = Math.floor(wavesurfer.getCurrentTime());
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    if (timeDisplay) {
      timeDisplay.textContent = formattedTime;
    }
  });
}

function playVideo() {
  const video = document.getElementById("video-file");
  const btn = document.getElementById("videoToggle");

  if (!video || !btn) return;

  btn.addEventListener("click", () => {
    video.play();
    btn.style.display = "none";
  });

  video.addEventListener("click", () => {
    if (!video.paused) {
      video.pause();
      btn.style.display = "flex";
    }
  });

  video.addEventListener("ended", () => {
    btn.style.display = "flex";
  });
}

function showPopup(isCorrect, url) {
  const popupBg = document.querySelector(".popup-wrapper");
  const popup = document.querySelector(".popup");
  const icon = popup?.querySelector(".popup__icon");
  const text = popup?.querySelector(".popup__text");

  if (!popupBg || !popup || !icon || !text) return;

  popup.classList.remove("correct", "wrong");
  popup.classList.add(isCorrect ? "correct" : "wrong");
  icon.className =
    "popup__icon " + (isCorrect ? "icon-checked-new" : "icon-close");
  text.textContent = isCorrect ? "Correct choice" : "Wrong choice";
  popupBg.classList.add("active");

  // setTimeout(() => {
  //   const redirectUrl = isCorrect
  //     ? "../pages/correct-choice.html"
  //     : "../pages/wrong-choice.html";
  //   window.location.href = redirectUrl;
  // }, 1000);
  setTimeout(() => {
    window.location.href = url;
  }, 1000);
}
