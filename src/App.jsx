import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import { ThemeProvider, createTheme, styled } from "@mui/material";
import AlertComponent from "./components/AlertComponent";

const AppWrapper = styled("div")({
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
});
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <AppWrapper>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/coins/:id" element={<CoinPage />} />
                </Routes>
            </AppWrapper>
            <AlertComponent />
        </ThemeProvider>
    );
}

export default App;
