// Snack Component - https://material-ui.com/components/snackbars/

import { Alert, Snackbar } from "@mui/material";
import { CryptoState } from "../CryptoContext";

const AlertComponent = () => {
    const { alert, setAlert } = CryptoState();

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlert({ open: false });
    };

    return (
        <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} elevation={10} variant="filled" severity={alert.type}>
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default AlertComponent;
