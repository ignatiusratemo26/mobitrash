import { useState, useEffect } from "react"
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/react";
import { CanceledError } from "axios";

interface Game {
    id: number;
    name: string;
    released: string;
    image_background: string;

}
interface FetchGamesResponse {
    count: number;
    results: Game[];
}

const GameGrid = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState('');

    useEffect(() =>{
        const controller = new AbortController();
        apiClient.get<FetchGamesResponse>('/games', { signal: controller.signal })
            .then(response => setGames(response.data.results))
            .catch(error => {
                if (error instanceof CanceledError) return;
                setError(error.message)
            });

            return () => controller.abort();
    }, []);

    return(
        <>
        {error && <Text>{error}</Text> }
        
        <ul>
            {games.map(game => (
                <li key={game.id}>
                    {/* <img src={game.image_background} alt={game.name} /> */}
                    <h2>{game.name}</h2>
                    <p>Released: {game.released}</p>
                </li>
            ))}
        </ul>
        </>
    )
}
export default GameGrid;