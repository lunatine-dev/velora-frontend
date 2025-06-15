import { PUBLIC_EGG_SECRET } from "$env/static/public";

function b64ToBytes(b64) {
    return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

export async function decryptPayload({ payload, session, meta }) {
    const passphrase = PUBLIC_EGG_SECRET;
    const encoder = new TextEncoder();

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(passphrase),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encoder.encode("salty-eggs"),
            iterations: 100_000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
    );

    // 🛠 Properly decode & join payload + tag
    const payloadBytes = b64ToBytes(payload);
    const tagBytes = b64ToBytes(meta);
    const data = new Uint8Array(payloadBytes.length + tagBytes.length);
    data.set(payloadBytes);
    data.set(tagBytes, payloadBytes.length);

    const iv = b64ToBytes(session);

    const decrypted = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv,
            tagLength: 128,
        },
        key,
        data
    );

    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decrypted));
}
