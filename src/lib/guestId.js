export const getOrCreateGuestId = () => {
  if (typeof window === "undefined") return null;

  let guestId = localStorage.getItem("joepraise-guest-id");

  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("joepraise-guest-id", guestId);
  }

  return guestId;
};