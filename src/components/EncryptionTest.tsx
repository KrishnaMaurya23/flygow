import { useState } from 'react';
import { encryptionService } from '../utils/EncryptionService';
import { Button, Box, TextField, Typography, Paper } from '@mui/material';

const EncryptionTest = () => {
    const [input, setInput] = useState('Hello World');
    const [encrypted, setEncrypted] = useState<string>('');
    const [decrypted, setDecrypted] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [customEncrypted, setCustomEncrypted] = useState('');

    const handleEncrypt = async () => {
        try {
            setError('');
            const result = await encryptionService.encrypt(input);
            if (result) {
                setEncrypted(result);
                console.log('Encrypted:', result);
            } else {
                setError('Encryption returned null');
            }
        } catch (err: any) {
            setError('Encryption failed: ' + err.message);
        }
    };

    const handleDecrypt = async () => {
        try {
            setError('');
            const result = await encryptionService.decrypt(encrypted);
            if (result) {
                setDecrypted(result);
            } else {
                setError('Decryption returned null (check console)');
            }
        } catch (err: any) {
            setError('Decryption failed: ' + err.message);
        }
    };

    const handleDecryptCustom = async () => {
        try {
            setError('');
            const result = await encryptionService.decrypt(customEncrypted);
            if (result) {
                setDecrypted(result);
            } else {
                setError('Custom Decryption returned null');
            }
        } catch (err: any) {
            setError('Custom Decryption failed: ' + err.message);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, m: 4, maxWidth: 600 }}>
            <Typography variant="h5" gutterBottom>Encryption Service Test</Typography>

            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    label="Text to Encrypt"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </Box>

            <Button variant="contained" onClick={handleEncrypt} sx={{ mr: 1 }}>
                Encrypt
            </Button>

            {encrypted && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, wordBreak: 'break-all' }}>
                    <Typography variant="caption" display="block" gutterBottom>Encrypted Output (IV:Tag:Data):</Typography>
                    <code>{encrypted}</code>
                    <Button variant="outlined" size="small" sx={{ mt: 1, display: 'block' }} onClick={handleDecrypt}>
                        Test Decrypt This
                    </Button>
                </Box>
            )}

            <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="h6">Decrypt Existing Data</Typography>
                <TextField
                    fullWidth
                    label="Paste Encrypted String"
                    value={customEncrypted}
                    onChange={(e) => setCustomEncrypted(e.target.value)}
                    placeholder="iv:tag:data"
                />
                <Button variant="contained" onClick={handleDecryptCustom} sx={{ mt: 1 }}>
                    Decrypt Custom
                </Button>
            </Box>

            {decrypted && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
                    <Typography variant="caption" display="block">Decrypted Result:</Typography>
                    <Typography variant="body1">{decrypted}</Typography>
                </Box>
            )}

            {error && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#ffebee', color: 'error.main', borderRadius: 1 }}>
                    {error}
                </Box>
            )}
        </Paper>
    );
};

export default EncryptionTest;
