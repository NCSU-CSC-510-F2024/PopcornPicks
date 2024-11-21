import "../RecommendedMovies.css";

import { Badge, Button, Card, Col, OverlayTrigger, Row, Tooltip, Pagination, Dropdown, Form} from "react-bootstrap";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import React, { useState, useMemo } from "react";


const RecommendedMovies = ({
    movies,
    genres,
    imdbIds,
    watchlistStatus,
    onWatchlistToggle,
    imdbRatings,
}) => {

    const moviesPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState("Rating"); // Default sort criteria - rating.
    const [sortOrder, setSortOrder] = useState("desc"); // Default to decending order.
    

    // Filtering.
    const [selectedGenre, setSelectedGenre] = useState("");
    const [ratingRange, setRatingRange] = useState([0, 10]);
    const [showWatchlist, setShowWatchlist] = useState(null);
    const [yearRange, setYearRange] = useState([1955, 2017])

    //  Handle range slider change.
    const handleRatingRangeChange = (event, newValue) => {
        setRatingRange(newValue);
    };

    const handleYearRangeChange = (event, newValue) => {
        setYearRange(newValue);
    };

    const extractYearRange = (movies) => {
        const years = movies
            .map((movie) => {
                const match = movie.match(/\((\d{4})\)$/);
                return match ? parseInt(match[1], 10) : null;
            })
            .filter(Boolean); // Remove nulls.

        if (years.length === 0) return [1955, 2017]; // Fallback.

        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        return [minYear, maxYear];
    };

    useMemo(() => {
        const range = extractYearRange(movies);
        setYearRange(range);
    }, [movies]);

    // const years = useMemo(() => extractYears(movies), [movies]);

    const filteredMoviesData = useMemo(() => {
        const filteredIndices = movies.map((_, i) => i).filter((i) => {
            // Genre filtering.
            if (selectedGenre && !genres[i].includes(selectedGenre)) {
                return false;
            }
            // Rating range filtering.
            if (imdbRatings[i] < ratingRange[0] || imdbRatings[i] > ratingRange[1]) {
                return false;
            }
            // Watchlist filtering.
            if (showWatchlist !== null && watchlistStatus[i] !== showWatchlist) {
                return false;
            }

            const year = parseInt(movies[i].match(/\((\d{4})\)$/)?.[1]) || 0; // Extract year from title.
            if (year < yearRange[0] || year > yearRange[1]) {
                return false;
            }
            
            return true;
        });

        const sortedIndices = filteredIndices.sort((a, b) => {
            if (sortCriteria === "Rating") {
                return sortOrder === "asc"
                    ? imdbRatings[a] - imdbRatings[b]
                    : imdbRatings[b] - imdbRatings[a];
            } else if (sortCriteria === "Title") {
                return sortOrder === "asc"
                    ? movies[a].localeCompare(movies[b])
                    : movies[b].localeCompare(movies[a]);
            } else if (sortCriteria === "Genre") {
                return sortOrder === "asc"
                    ? genres[a].localeCompare(genres[b])
                    : genres[b].localeCompare(genres[a]);
            } else if (sortCriteria === "Year") {
                const yearA = parseInt(movies[a].match(/\((\d{4})\)$/)?.[1]) || 0; // Extract year from title.
                const yearB = parseInt(movies[b].match(/\((\d{4})\)$/)?.[1]) || 0;
                return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
            }
            return 0;
        });
    
        return {
            filteredMovies: filteredIndices.map(i => movies[i]),
            filteredGenres: filteredIndices.map(i => genres[i]),
            filteredImdbIds: filteredIndices.map(i => imdbIds[i]),
            filteredWatchlistStatus: filteredIndices.map(i => watchlistStatus[i]),
            filteredImdbRatings: filteredIndices.map(i => imdbRatings[i]),
        };
    }, [movies, genres, imdbIds, watchlistStatus, imdbRatings, selectedGenre, ratingRange, showWatchlist,yearRange, sortCriteria, sortOrder]);
    

    // Total number of pages.
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    // Sort the movies array based on selected criteria.
    

    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = filteredMoviesData.filteredMovies.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    const currentGeneres = filteredMoviesData.filteredGenres.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    const currentImdbIds = filteredMoviesData.filteredImdbIds.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    const currentWatchlistStatus = filteredMoviesData.filteredWatchlistStatus.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    const currentImdbRatings = filteredMoviesData.filteredImdbRatings.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    

    const handleSortChange = (criteria) => {
        if (sortCriteria === criteria) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortCriteria(criteria);
            setSortOrder("asc"); 
        }
        setCurrentPage(1);
    };


    // Handle page number change.
    const handlePageChange = (pageNumber) => { 
        setCurrentPage(pageNumber)
    }

    
    if (movies.length === 0) {
        return null;
    }

    const getPaginationItems = () => {
        const maxVisiblePages = 5;
        const items = [];
    
        // Show the first page always.
        items.push(
            <Pagination.Item
                key={1}
                active={1 === currentPage}
                onClick={() => handlePageChange(1)}
            >
                1
            </Pagination.Item>
        );
    
        // Show ellipsis before current range if needed.
        if (currentPage > maxVisiblePages) {
            items.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }
    
        // Calculate start and end of visible range.
        const startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxVisiblePages / 2));
    
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }
    
        // Show ellipsis after current range if needed.
        if (endPage < totalPages - 1) {
            items.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }
    
        // Show the last page always.
        items.push(
            <Pagination.Item
                key={totalPages}
                active={totalPages === currentPage}
                onClick={() => handlePageChange(totalPages)}
            >
                {totalPages}
            </Pagination.Item>
        );
    
        return items;
    };

    return (
        <div className="recommended-movies">
            <h2 className="mb-4 text-center">Recommended Movies</h2>
    
            {/* Filters and Sort Section */}
            <div
                className="filters-sort-section mb-4"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // gap: "10px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    backgroundColor: "#2f2f2f",
                    padding: "10px",
                    paddingBottom: "2px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                {/* Sort Dropdown */}
                <div className="sort-dropdown" style={{ display: "inline-block", minWidth: "30%" }}>
                    <Dropdown>
                        <Dropdown.Toggle
                            key={`${sortCriteria}-${sortOrder}`}
                            variant="outline-success"
                            size="sm"
                            id="sort-dropdown"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                            }}
                        >
                            <i
                                className={`bi ${
                                    sortOrder === "asc" ? "bi-sort-up" : "bi-sort-down"
                                }`}
                            ></i>
                            Sort by: {sortCriteria}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSortChange("Rating")}>
                                Rating
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange("Title")}>
                                Title
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange("Genre")}>
                                Genre
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange("Year")}>
                                Year
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
    
                {/* Genre Filter */}
                <div className="genre-filter" style={{ display: "inline-block", minWidth: "30%" }}>
                    <Dropdown onSelect={(genre) => setSelectedGenre(genre)}>
                        <Dropdown.Toggle variant="outline-success" size="sm">
                            <i class="bi bi-tag me-2"></i>
                            {selectedGenre ? `Genre: ${selectedGenre}` : "Filter by: Genre"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedGenre("")}>
                                All Genres
                            </Dropdown.Item>
                            {Array.from(new Set(genres.flatMap((g) => g.split("|")))).map(
                                (genre, index) => (
                                    <Dropdown.Item key={index} eventKey={genre}>
                                        {genre}
                                    </Dropdown.Item>
                                )
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* Watchlist Filter */}
                <div
                    className="watchlist-toggle"
                    style={{
                        // flex: "1 1 30%",
                        display: "inline-block",
                        minWidth: "30%",
                        textAlign: "flex-start",
                    }}
                >
                    <label style={{color:"#198754"}}>
                        <input
                            type="checkbox"
                            checked={showWatchlist}
                            onChange={(e) => setShowWatchlist(e.target.checked ? true : null)}
                            style={{ marginRight: "8px" }}
                        />
                         Watchlist Only
                    </label>
                </div>
    
                {/* Rating Range Filter */}
                <div
                    className="rating-range"
                    style={{
                        display: "inline-block",
                        // minWidth: "90px",
                        // display: "flex",
                        minWidth: "30%",
                        // flexDirection: "column",
                        alignItems: "flex-start",
                        marginTop: "7px"
                    }}
                >
                    <label style={{color:"#198754"}}>Rating</label>
                    <Box sx={{ width: "150px" }}>
                        <Slider
                            getAriaLabel={() => "Rating range"}
                            value={ratingRange}
                            onChange={handleRatingRangeChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={10}
                            sx={{
                                color: "#198754", // Change the slider's primary color (green in this case).
                                "& .MuiSlider-thumb": {
                                    backgroundColor: "#198754", // Change the thumb (handle) color.
                                },
                                "& .MuiSlider-track": {
                                    backgroundColor: "#198754", // Change the track color.
                                },
                                "& .MuiSlider-rail": {
                                    backgroundColor: "#ccc", // Change the rail color.
                                },
                                "& .MuiSlider-thumb:hover": {
                                    boxShadow: "0px 0px 0px 8px rgba(25, 135, 84, 0.2)", // Highlight thumb on hover.
                                },
                            }}
                        />
                    </Box>
                </div>

                {/* Year Range Filter */}
                <div
                    className="year-range"
                    style={{
                        // flex: "2 1 100px",
                        // minWidth: "100px",
                        display: "inline-block",
                        minWidth: "30%",
                        marginTop: "7px"
                        // display: "flex",
                        // flexDirection: "column",
                        // alignItems: "flex-start",
                    }}
                >
                    <label style={{ color: "#198754" }}>Year</label>
                    <Box sx={{ width: "150px" }}>
                        <Slider
                            getAriaLabel={() => "Year range"}
                            value={yearRange}
                            onChange={handleYearRangeChange}
                            valueLabelDisplay="auto"
                            min={1955}
                            max={2017}
                            sx={{
                                color: "#198754", // Change the slider's primary color (green in this case).
                                "& .MuiSlider-thumb": {
                                    backgroundColor: "#198754", // Change the thumb (handle) color.
                                },
                                "& .MuiSlider-track": {
                                    backgroundColor: "#198754", // Change the track color.
                                },
                                "& .MuiSlider-rail": {
                                    backgroundColor: "#ccc", // Change the rail color.
                                },
                                "& .MuiSlider-thumb:hover": {
                                    boxShadow: "0px 0px 0px 8px rgba(25, 135, 84, 0.2)", // Highlight thumb on hover.
                                },
                            }}
                        />
                    </Box>
                </div>                
            </div>
    
            {/* Movies Display */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {currentMovies.map((movie, index) => (
                    <Col key={index}>
                        <Card className="h-100 movie-card">
                            <Card.Body>
                                <Card.Title className="movie-title">{movie}</Card.Title>
                                <div className="genre-container">
                                    {currentGeneres[index].split("|").map((genre, genreIndex) => (
                                        <OverlayTrigger
                                            key={genreIndex}
                                            placement="top"
                                            overlay={
                                                <Tooltip id={`tooltip-${index}-${genreIndex}`}>
                                                    {genre}
                                                </Tooltip>
                                            }
                                        >
                                            <Badge bg="secondary" className="me-1 mb-1">
                                                {genre.substring(0, 3)}
                                            </Badge>
                                        </OverlayTrigger>
                                    ))}
                                </div>
    
                                <div className="rating-container">
                                    <Badge bg="info" className="me-1 mb-1">
                                        {currentImdbRatings[index]}/10
                                    </Badge>
                                </div>
                                <a
                                    href={`https://www.imdb.com/title/${currentImdbIds[index]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="imdb-link"
                                >
                                    IMDb 🔗
                                </a>
                            </Card.Body>
                            <Card.Footer>
                                {!currentWatchlistStatus[index] ? (
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() =>
                                            onWatchlistToggle(
                                                imdbIds[index],
                                                false,
                                                index + startIndex
                                            )
                                        }
                                        className="w-100"
                                    >
                                        Add to Watchlist
                                    </Button>
                                ) : (
                                    <Badge bg="success" className="w-100 py-2">
                                        Added to Watchlist
                                    </Badge>
                                )}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
    
            {/* Pagination */}
            <Pagination className="justify-content-center mt-4">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                { getPaginationItems()}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );    
};

export default RecommendedMovies;
