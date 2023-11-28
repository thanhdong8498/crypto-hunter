import { AppBar, Container, MenuItem, Select, Toolbar, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Athentication/AuthModal";
import UserSidebar from "./Athentication/UserSidebar";

const Title = styled(Typography)({
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
});

const Header = () => {
    const { currency, setCurrency, user } = CryptoState();

    const navigate = useNavigate();
    return (
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Title
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Crypto Hunter
                    </Title>
                    <Select
                        variant="outlined"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currency}
                        style={{ width: 100, height: 40, marginLeft: 15 }}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={"VND"}>VND</MenuItem>
                        <MenuItem value={"USD"}>USD</MenuItem>
                    </Select>
                    {user ? <UserSidebar /> : <AuthModal />}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
