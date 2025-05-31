//for encryption
import sha1 from "crypto-js/sha1";

//api #2 HaveIBeenPwned
export async function checkPasswordPwned(password: string): Promise<boolean> {
  const hash = sha1(password).toString().toUpperCase();
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await res.text();
  return text.includes(suffix);
}

//api #3 Generate random password
export async function generateRandomPassword(): Promise<string> {
  try {
    const res = await fetch("https://api.genratr.com/?length=16&uppercase&lowercase&special&numbers");

    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`);
    }

    const data = await res.json();

    if (!data.password || typeof data.password !== "string") {
      throw new Error("Invalid password format");
    }

    return data.password;
  } catch (error) {
    console.error("Failed to generate password:", error);
    throw new Error("Failed to generate password");
  }
}

//api #4 Get Geolocation
export async function getGeolocation(): Promise<any> {
  const res = await fetch("https://ipapi.co/json/");
  return await res.json();
}

//api #5 Get Favicon from Name
export function getFaviconFromName(name: string): string {
  const domain = name
    .toLowerCase()
    .replace(/\s+/g, "")            // removes spaces
    .replace(/[^\w.-]/g, "")        // removes special characters
    + ".com";

  return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
}

