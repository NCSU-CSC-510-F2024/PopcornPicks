import "../stylesheet.css";

import React, { useEffect, useState } from "react";
import { Button, Container, Spinner, Alert, Row } from "react-bootstrap";

import { addToWatchlist, deleteFromWatchlist, getWatchlist, predictMovies } from "../apiCalls";
import Navbar from "./NavBar";
import RecommendedMovies from "./RecommendedMovies";

const Home = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [genres, setGenres] = useState([]);
    const [imdbIds, setImdbIds] = useState([]);
    const [imdbRatings, setImdbRatings] = useState([]);
    const [watchlistStatus, setWatchlistStatus] = useState([]);

    useEffect(() => {
        const fetchAndPredict = async () => {
            setLoading(true);
            try {
                const response = await getWatchlist();
                const fectchedWatchlist = response.watchlist || [];
                console.log("Fetched watchlist:", fectchedWatchlist); // Debug log
                setWatchlist(fectchedWatchlist);
                setError(null);

                const movieTitles = fectchedWatchlist.slice(0, 5).map((movie) => movie.title);
                console.log("Movie titles:", movieTitles); // Debug log
                setMovies(movieTitles);
                const predictResponse = await predictMovies(movieTitles);
                console.log("Predict response:", predictResponse); // Debug log
                setRecommendations(predictResponse.recommendations);
                setGenres(predictResponse.genres);
                setImdbIds(predictResponse.imdb_id);
                setImdbRatings(predictResponse.imdb_ratings);
                setWatchlistStatus(predictResponse.Watchlist_status);
            } catch (err) {
                console.error("Error fetching watchlist or predicting movies:", err);
                setError("Failed to fetch watchlist or predicting movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchAndPredict();
    }, []);

    // const fetchWatchlist = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await getWatchlist();
    //         setWatchlist(response.watchlist || []);
    //         setError(null);
    //     } catch (err) {
    //         console.error("Error fetching watchlist:", err);
    //         setError("Failed to fetch watchlist. Please try again later.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handlePredict = async () => {
    //     setLoading(true);
    //     try {
    //         var movieTitles = watchlist.slice(0, 5).map((movie) => movie.title);
    //         console.log("Movie titles:", movieTitles); // Debug log
    //         setMovies(watchlist.slice(0, 5).map((movie) => movie.title));
    //         const predictResponse = await predictMovies(movies);
    //         setRecommendations(predictResponse.recommendations);
    //         setGenres(predictResponse.genres);
    //         setImdbIds(predictResponse.imdb_ids);
    //         setImdbRatings(predictResponse.imdb_ratings);
    //         setWatchlistStatus(predictResponse.Watchlist_status);
    //     } catch (err) {
    //         console.error("Error predicting movies:", err);
    //         setError("Failed to predict movies. Please try again later.");
    //     }
    //     setLoading(false);
    // };

    const handleWatchlistToggle = async (imdbId, currentStatus, index) => {
        try {
            if (currentStatus) {
                await deleteFromWatchlist(imdbId);
            } else {
                await addToWatchlist(imdbId);
            }
            const newWatchlistStatus = [...watchlistStatus];
            newWatchlistStatus[index] = !currentStatus;
            setWatchlistStatus(newWatchlistStatus);
        } catch (error) {
            console.error("Error updating watchlist:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <Container style={{ marginTop: "80px" }}>
                <h1 className="text-center mb-4 mt-5">
                    Recommended Movies Based On Your Watchlist:
                </h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading ? (
                    <Row className="d-flex justify-content-center mt-4">
                        <Spinner animation="border" role="status" className="spinner">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Row>
                ) : (
                    <RecommendedMovies
                        movies={recommendations}
                        genres={genres}
                        imdbIds={imdbIds}
                        watchlistStatus={watchlistStatus}
                        onWatchlistToggle={handleWatchlistToggle}
                        imdbRatings={imdbRatings}
                    />
                )}
            </Container>
        </div>
    );
};

export default Home;
