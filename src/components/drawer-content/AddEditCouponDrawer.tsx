import { Button, IconButton, Stack, Typography, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { couponFormSchema } from "../../utils/yup-config";
import { useDispatch } from "react-redux";
import { showAlert } from "../../rtk/feature/alertSlice";
import { useEffect } from "react";
import { StyledTextField } from "../../utils/helper";

interface CouponFormInputs {
    couponCode: string;
    couponName: string;
    discountType: string;
    discountAmount: number;
    startDate: string;
    endDate: string;
    maxUses: number;
}

interface AddEditCouponDrawerProps {
    handleClose: () => void;
    type?: "new" | "edit";
    initialData?: any;
}

export default function AddEditCouponDrawer({ handleClose, type = "new", initialData }: AddEditCouponDrawerProps) {
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CouponFormInputs>({
        resolver: yupResolver(couponFormSchema) as any,
        defaultValues: {
            couponCode: "",
            couponName: "",
            discountType: "flat",
            discountAmount: 0,
            startDate: "",
            endDate: "",
            maxUses: 0,
        }
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmit = async (data: CouponFormInputs) => {
        try {
            // Logic to create or edit coupon
            console.log("Coupon Data:", data);
            dispatch(
                showAlert({
                    message: `Coupon ${type === "new" ? "created" : "updated"} successfully`,
                    severity: "success",
                })
            );
            handleClose();
        } catch (error) {
            console.error("Error saving coupon:", error);
        }
    };

    return (
        <Stack gap={3} height={"100%"} sx={{ minWidth: { xs: "100%", sm: 400 } }}>
            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ width: "100%" }}
            >
                <Typography variant="h4" fontWeight={600}>
                    {type === "new" ? "Create new coupon" : "Edit coupon"}
                </Typography>
                <IconButton onClick={handleClose} sx={{ backgroundColor: "#F3F4F6" }}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
                <Stack justifyContent={"space-between"} height={"100%"} gap={3}>
                    <Stack gap={2.5}>
                        <Stack>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD", marginBottom: 4 }}>
                                Coupon code
                            </label>
                            <Controller
                                name="couponCode"
                                control={control}
                                render={({ field }) => (
                                    <StyledTextField
                                        {...field}
                                        placeholder="Enter Coupon code"
                                        fullWidth
                                        error={!!errors.couponCode}
                                        helperText={errors.couponCode?.message}
                                    />
                                )}
                            />
                        </Stack>

                        <Stack>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD", marginBottom: 4 }}>
                                Coupon name
                            </label>
                            <Controller
                                name="couponName"
                                control={control}
                                render={({ field }) => (
                                    <StyledTextField
                                        {...field}
                                        placeholder="Enter Coupon name"
                                        fullWidth
                                        error={!!errors.couponName}
                                        helperText={errors.couponName?.message}
                                    />
                                )}
                            />
                        </Stack>

                        <Stack>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD", marginBottom: 4 }}>
                                Discount type
                            </label>
                            <Controller
                                name="discountType"
                                control={control}
                                render={({ field }) => (
                                    <StyledTextField
                                        {...field}
                                        select
                                        fullWidth
                                        error={!!errors.discountType}
                                        helperText={errors.discountType?.message}
                                    >
                                        <MenuItem value="flat">Flat</MenuItem>
                                        <MenuItem value="percentage">Percentage</MenuItem>
                                    </StyledTextField>
                                )}
                            />
                        </Stack>

                        <Stack>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD", marginBottom: 4 }}>
                                Discount amount
                            </label>
                            <Controller
                                name="discountAmount"
                                control={control}
                                render={({ field }) => (
                                    <StyledTextField
                                        {...field}
                                        type="number"
                                        placeholder="Enter Discount amount"
                                        fullWidth
                                        error={!!errors.discountAmount}
                                        helperText={errors.discountAmount?.message}
                                    />
                                )}
                            />
                        </Stack>

                        <Stack flexDirection={"row"} gap={2}>
                            <Stack flex={1}>
                                <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD", marginBottom: 4 }}>
                                    Start Date
                                </label>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={({ field }) => (
                                        <StyledTextField
                                            {...field}
                                            type="date"
                                            fullWidth
                                            error={!!errors.startDate}
                                            helperText={errors.startDate?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack flex={1}>
                                <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD", marginBottom: 4 }}>
                                    End Date
                                </label>
                                <Controller
                                    name="endDate"
                                    control={control}
                                    render={({ field }) => (
                                        <StyledTextField
                                            {...field}
                                            type="date"
                                            fullWidth
                                            error={!!errors.endDate}
                                            helperText={errors.endDate?.message}
                                        />
                                    )}
                                />
                            </Stack>
                        </Stack>

                        <Stack>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "#4693DD", marginBottom: 4 }}>
                                Maximum uses
                            </label>
                            <Controller
                                name="maxUses"
                                control={control}
                                render={({ field }) => (
                                    <StyledTextField
                                        {...field}
                                        type="number"
                                        placeholder="Enter Maximum uses"
                                        fullWidth
                                        error={!!errors.maxUses}
                                        helperText={errors.maxUses?.message}
                                    />
                                )}
                            />
                        </Stack>
                    </Stack>

                    <Stack alignItems={"flex-end"} mt={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: "fit-content",
                                backgroundColor: "#0E6A37",
                                color: "white",
                                padding: "10px 32px",
                                borderRadius: "8px",
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": {
                                    backgroundColor: "#054F31",
                                }
                            }}
                        >
                            {type === "new" ? "Create" : "Update"}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
}
