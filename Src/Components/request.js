import api from "../../api"

const requests = {
    fetchActionMovies: `/discover/movie?api_key=${api}&with_genres=28&page=`,
    fetchComedyMovies: `/discover/movie?api_key=${api}&with_genres=35&page=`,
    fetchHorrorMovies: `/discover/movie?api_key=${api}&with_genres=27&page=`,
    fetchRomanceMovies: `/discover/movie?api_key=${api}&with_genres=10749&page=`,
    fetchDocumentaries: `/discover/movie?api_key=${api}&with_genres=99&page=`,
    fetchTrending: `/trending/all/week?api_key=${api}&lanuage=en-US&page=3`,
    fetchTopRated: `/movie/top_rated?api_key=${api}&language=en-US&page=`,
    fetchNetflixOriginals: `/discover/tv?api_key=${api}&with_networks=213&page=`,
    fetchAdventureMovies: `/discover/movie?api_key=${api}&with_genres=12&page=`,
    fetchTrillerMovies: `/discover/movie?api_key=${api}&with_genres=53&page=`,
    fetchFantasyMovies: `/discover/movie?api_key=${api}&with_genres=14&page=`,
    fetchScienceFiction: `/discover/movie?api_key=${api}&with_genres=878&page=`,
    fetchMysteryMovie: `/discover/movie?api_key=${api}&with_genres=9648&page=`,
    fetchAnimationMovies: `/discover/movie?api_key=${api}&with_genres=16&page=`,
    fetchCrimeMovies: `/discover/movie?api_key=${api}&with_genres=80&page=`,
    fetchDrameMovies: `/discover/movie?api_key=${api}&with_genres=18&page=`,
    fetchWarMovies: `/discover/movie?api_key=${api}&with_genres=10752&page=`,
    fetchWesternMovies: `/discover/movie?api_key=${api}&with_genres=37&page=`,
    fetchFamilyMovies: `/discover/movie?api_key=${api}&with_genres=10751&page=`,
    fetchHistory: `/discover/movie?api_key=${api}&with_genres=36&page=`,
    fetchUpcoming: `/discover/movie?api_key=${api}&with_genres=36&page=`,
}

export default requests

