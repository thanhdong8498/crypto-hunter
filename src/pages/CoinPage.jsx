import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinTable";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button, LinearProgress, Typography, styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
    },
}));
const Heading = styled(Typography)({
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
});
const SideBar = styled("div")(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
        width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
}));
const Description = styled(Typography)({
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
});

const MarketData = styled("div")(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
        alignItems: "start",
    },
}));

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const { currency, symbol, user, setAlert, watchlist } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    const inWatchlist = watchlist.includes(coin?.id);

    const addToWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef, { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] }, { merge: true });

            setAlert({
                open: true,
                message: `${coin.name} Added to the Watchlist !`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };

    const removeFromWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef, { coins: watchlist.filter((wish) => wish !== coin?.id) }, { merge: true });

            setAlert({
                open: true,
                message: `${coin.name} Removed from the Watchlist !`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };

    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <Container>
            <SideBar>
                <img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
                <Heading>{coin?.name}</Heading>
                <Description variant="subtitle1">{ReactHtmlParser(coin?.description.en.split(". ")[0])}.</Description>
                <MarketData>
                    <span style={{ display: "flex" }}>
                        <Heading variant="h5">Rank:</Heading>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {numberWithCommas(coin?.market_cap_rank)}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Heading variant="h5">Current Price:</Heading>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Heading variant="h5">Market Cap:</Heading>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)
                            )}
                            M
                        </Typography>
                    </span>
                    {user && (
                        <Button
                            variant="outlined"
                            style={{
                                width: "100%",
                                height: 40,
                                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                            }}
                            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                        >
                            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                        </Button>
                    )}
                </MarketData>
            </SideBar>
            <CoinInfo coin={coin} />
        </Container>
    );
};

export default CoinPage;
