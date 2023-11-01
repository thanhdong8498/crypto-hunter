import Login from "./Login";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AppBar, Backdrop, Box, Button, Fade, Modal, Tab, Tabs, styled } from "@mui/material";
import Signup from "./Signup";

const ModalComp = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const PaperComp = styled("div")(({ theme }) => ({
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
}));

const Google = styled(Box)({
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
});

export default function AuthModal() {
    const [open, setOpen] = useState(false);

    const { setAlert } = CryptoState();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                setAlert({
                    open: true,
                    message: `Sign Up Successful. Welcome ${res.user.email}`,
                    type: "success",
                });

                handleClose();
            })
            .catch((error) => {
                setAlert({
                    open: true,
                    message: error.message,
                    type: "error",
                });
                return;
            });
    };

    return (
        <div>
            <Button
                variant="contained"
                style={{
                    width: 85,
                    height: 40,
                    marginLeft: 15,
                    backgroundColor: "#EEBC1D",
                }}
                onClick={handleOpen}
            >
                Login
            </Button>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            ></Backdrop>
            <ModalComp
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <PaperComp>
                        <AppBar
                            position="static"
                            style={{
                                backgroundColor: "transparent",
                                color: "white",
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                style={{ borderRadius: 10 }}
                            >
                                <Tab label="Login" />
                                <Tab label="Sign Up" />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <Signup handleClose={handleClose} />}
                        <Google>
                            <span>OR</span>
                            <GoogleButton style={{ width: "100%", outline: "none" }} onClick={signInWithGoogle} />
                        </Google>
                    </PaperComp>
                </Fade>
            </ModalComp>
            <Backdrop />
        </div>
    );
}
