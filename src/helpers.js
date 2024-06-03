export function parseToken(token) {
  if (!token) {
    return null;
  }

  // Split the token into header, payload, and signature
  const [, payloadBase64] = token.split(".");
  if (!payloadBase64) {
    return null;
  }

  // Decode the payload (Base64 decoding)
  const payloadJson = atob(payloadBase64);

  // Parse the payload JSON
  const payload = JSON.parse(payloadJson);

  // Extract and return the role
  return payload.role || null;
}
export const convertDate = (dateString) => {
  let givenDate = new Date(dateString);
  return givenDate.toLocaleDateString("en-US");
};
