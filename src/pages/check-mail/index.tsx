import { Box, Button, Grid, Typography } from '@mui/material';
import PublicLayout from '../../layouts/PublicLayout';
import { useEffect, type JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResendMutation } from '../../rtk/endpoints/authApi';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../rtk/feature/alertSlice';
import { encryptAES } from '../../utils/helper';
import { useTranslation } from 'react-i18next';

export default function CheckMail(): JSX.Element {
    const { t } = useTranslation();
    const [resend, {isSuccess}] = useResendMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const handleResendClick = async () => {
        if (!email) {
            dispatch(showAlert({
                message: t("checkMail.emailNotAvailable"),
                severity: 'error',
            }));
            return;
        }
        try {
            const encryptEmail = encryptAES(email);
            await resend({ email:encryptEmail, deviceType: "web", actionType: "forgot-password" }).unwrap();
            
            
        } catch (error) {
            console.error('Failed to resend link:', error);
        }
    }
    useEffect(() => {
        if (isSuccess) {
            dispatch(showAlert({
                message: t("checkMail.resetLinkResent"),
                severity: 'success',
            }));
        }
    }, [isSuccess]);
    return (
        <PublicLayout>
            <Grid container height="100vh">

                {/* Right side with content */}
                <Grid
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: 4,
                    }}
                >
                    <Box maxWidth={400} width="100%" textAlign="center">
                        <Typography variant="h5" fontWeight="bold" mb={2}>
                            {t("checkMail.title")}
                        </Typography>

                        <Typography variant="body1" mb={1}>
                            {t("checkMail.resetLinkSent")}{' '}
                            <Typography component="span" fontWeight="bold" ml={0.5}>
                                {email}
                            </Typography>
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ color: '#888', mt: 1 }}
                        >
                            {t("checkMail.didntReceiveLink")}{' '}
                            <Typography
                                component="span"
                                color="#2B2738"
                                fontWeight="bold"
                                sx={{ cursor: 'pointer' }}
                                onClick={handleResendClick}
                            >
                                {t("checkMail.resend")}
                            </Typography>
                        </Typography>

                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                                mt: 4,
                                borderRadius: '50px',
                                textTransform: 'none',
                                py: 1.5,
                                fontWeight: 'bold',
                                fontSize: '1rem',
                            }}
                            onClick={() => {
                                    navigate('/forgot-password');
                            }}
                        >
                            {t("checkMail.changeEmail")}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </PublicLayout>
    );
}
