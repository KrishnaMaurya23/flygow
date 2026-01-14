/**
 * Encryption Service
 * Provides AES-256-GCM encryption/decryption validation compatible with the NestJS backend.
 * Uses the Web Crypto API for performance and security.
 */

// Configuration constants matching the backend
const CONFIG = {
    algorithm: 'AES-GCM',
    length: 256,
    ivLength: 16, // Backend uses 16 bytes (128 bits) unlike standard 12 bytes
    // Backend: "const iv = crypto.randomBytes(this.ivLength);" (16 bytes)
    // Backend: "return `${iv.toString('base64')}:${tag.toString('base64')}:${encrypted}`;"
    //
    // WebCrypto AES-GCM imports keys and encrypts.
    // We CAN use 16 byte IVs in WebCrypto.

    salt: 'flygow-encryption-salt',
    iterations: 100000,
    digest: 'SHA-256'
};

class EncryptionService {
    private key: CryptoKey | null = null;
    private initialized = false;
    private initPromise: Promise<void> | null = null;

    constructor() {
        // Lazy initialization handled in methods or explicit init
    }

    /**
     * Initialize the service with the encryption key from environment
     * @param encryptionKeyString The raw string key from env
     */
    async initialize(encryptionKeyString: string | undefined) {
        if (this.initialized) return;
        if (this.initPromise) return this.initPromise;

        this.initPromise = (async () => {
            if (!encryptionKeyString || encryptionKeyString.length < 16) {
                console.error('EncryptionService: Key is missing or too short');
                throw new Error('Encryption key is required');
            }

            try {
                // 1. Import the password material
                const enc = new TextEncoder();
                const keyMaterial = await window.crypto.subtle.importKey(
                    'raw',
                    enc.encode(encryptionKeyString),
                    { name: 'PBKDF2' },
                    false,
                    ['deriveBits', 'deriveKey']
                );

                // 2. Derive the AES-GCM key
                this.key = await window.crypto.subtle.deriveKey(
                    {
                        name: 'PBKDF2',
                        salt: enc.encode(CONFIG.salt),
                        iterations: CONFIG.iterations,
                        hash: CONFIG.digest
                    },
                    keyMaterial,
                    { name: 'AES-GCM', length: CONFIG.length },
                    false,
                    ['encrypt', 'decrypt']
                );

                this.initialized = true;
                console.log('EncryptionService initialized successfully');
            } catch (err) {
                console.error('EncryptionService initialization failed', err);
                throw err;
            }
        })();

        return this.initPromise;
    }

    private async ensureInitialized() {
        if (!this.initialized) {
            // Try to get key from env if not explicitly initialized
            // Note: In Vite, env vars are exposed via import.meta.env
            const envKey = import.meta.env.VITE_ENCRYPTION_KEY;
            if (envKey) {
                await this.initialize(envKey);
            } else {
                throw new Error('EncryptionService not initialized and VITE_ENCRYPTION_KEY not found');
            }
        }
        if (!this.key) throw new Error('EncryptionService: Key not derived');
    }

    /**
     * Encrypts a string value
     * @param plaintext - The text to encrypt
     * @returns Encrypted string in format: iv:tag:encryptedData (base64 encoded)
     */
    async encrypt(plaintext: string | null | undefined): Promise<string | null> {
        if (!plaintext) return null;

        await this.ensureInitialized();

        try {
            const enc = new TextEncoder();
            const encodedText = enc.encode(plaintext);

            // Backend uses 16 bytes IV. We must match this.
            const iv = window.crypto.getRandomValues(new Uint8Array(16));

            // Encrypt
            // Note: Web Crypto AES-GCM 'encrypt' returns ciphertext WITH the auth tag appended at the end!
            // Node.js 'crypto' returns ciphertext and you have to getAuthTag() separately.
            // So we need to splitting the WebCrypto result.
            // The tag length is usually 128 bits (16 bytes) by default in WebCrypto AES-GCM.
            // Result = [Ciphertext][Tag] (Tag is last 16 bytes)

            const param = {
                name: 'AES-GCM',
                iv: iv,
                tagLength: 128 // 128 bits
            };

            const encryptedBuffer = await window.crypto.subtle.encrypt(
                param,
                this.key!,
                encodedText
            );

            // Extract tag and actual ciphertext
            const encryptedBytes = new Uint8Array(encryptedBuffer);
            const tagLengthBytes = 16;
            const ciphertextLength = encryptedBytes.length - tagLengthBytes;

            const ciphertext = encryptedBytes.slice(0, ciphertextLength);
            const tag = encryptedBytes.slice(ciphertextLength);

            // Convert to Base64
            const ivB64 = this.arrayBufferToBase64(iv);
            const tagB64 = this.arrayBufferToBase64(tag);
            const ciphertextB64 = this.arrayBufferToBase64(ciphertext);

            // Format: iv:tag:encryptedData
            return `${ivB64}:${tagB64}:${ciphertextB64}`;

        } catch (error) {
            console.error('Encryption failed:', error);
            return null;
        }
    }

    /**
     * Decrypts an encrypted string
     * @param encryptedData - The encrypted string in format: iv:tag:encryptedData
     */
    async decrypt(encryptedData: string | null | undefined): Promise<string | null> {
        if (!encryptedData || typeof encryptedData !== 'string') return null;

        // Check format roughly
        const parts = encryptedData.split(':');
        if (parts.length !== 3) return null;

        await this.ensureInitialized();

        try {
            const [ivB64, tagB64, ciphertextB64] = parts;

            const iv = this.base64ToArrayBuffer(ivB64);
            const tag = this.base64ToArrayBuffer(tagB64);
            const ciphertext = this.base64ToArrayBuffer(ciphertextB64);

            // Combine ciphertext and tag for Web Crypto
            // Web Crypto expects [Ciphertext][Tag]
            const combined = new Uint8Array(ciphertext.byteLength + tag.byteLength);
            combined.set(new Uint8Array(ciphertext), 0);
            combined.set(new Uint8Array(tag), ciphertext.byteLength);

            const decryptedBuffer = await window.crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: iv,
                    tagLength: 128
                },
                this.key!,
                combined
            );

            const dec = new TextDecoder();
            return dec.decode(decryptedBuffer);

        } catch (error) {
            // Don't log full error for security in prod, but helpful for debug
            console.warn('Decryption failed');
            return null;
        }
    }

    // Helper: Base64 to ArrayBuffer
    private base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binaryKey = window.atob(base64);
        const len = binaryKey.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryKey.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // Helper: ArrayBuffer to Base64
    private arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
}

export const encryptionService = new EncryptionService();
