let balance = 1250;
let nextClaimTime = localStorage.getItem("nextClaimTime");

const claimBtn = document.getElementById("claimButton");
const balanceDisplay = document.getElementById("balance");
const countdownDisplay = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = nextClaimTime - now;
  
  if (distance <= 0) {
    countdownDisplay.textContent = "00:00:00";
    claimBtn.disabled = false;
    claimBtn.textContent = "Claim +50";
  } else {
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    countdownDisplay.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    claimBtn.disabled = true;
    claimBtn.textContent = "Wait for next claim";
  }
}

claimBtn.addEventListener("click", () => {
  balance += 50;
  balanceDisplay.textContent = `${balance} IGENZ Points`;
  const nextClaim = new Date().getTime() + 24 * 60 * 60 * 1000;
  nextClaimTime = nextClaim;
  localStorage.setItem("nextClaimTime", nextClaim);
  updateCountdown();
});

function copyReferral() {
  const ref = document.getElementById("refLink");
  ref.select();
  ref.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Referral link copied!");
}

setInterval(updateCountdown, 1000);
if (!nextClaimTime) {
  const now = new Date().getTime();
  localStorage.setItem("nextClaimTime", now);
  nextClaimTime = now;
}
updateCountdown();