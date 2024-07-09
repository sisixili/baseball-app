import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Players() {
    const [listOfPlayers, setListOfPlayers] = useState([]);
    const [name, setName] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3001/players?page=${page}&limit=25&search=${search}`, { // NOTE HARDCODED 25 limit
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              console.log("FETCH failed");
            }
          })
          .then((data) => {
            if (data.error) {
              console.log(data.error);
            } else {
              setListOfPlayers(data.players);
              setTotalPages(data.totalPages);
            }
          })
          .catch((error) => console.log("ERROR", error));
      }, [page, search]); // ,limit

    function handleChange(event) {
        setName(event.target.value);
    }
    
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      setSearch(name);
      setPage(1); // Reset to the first page on new search
    };

    const handlePreviousPage = () => {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const handleNextPage = () => {
      setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

  return (
    <div>
      <div className="pageTitle">
        <h2>Search All Players</h2>
      </div>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="input"
          onChange={handleChange}
          placeholder="Search by Last Name"
        />
        <button className="input" type="submit">Search</button>
      </form>
      <div className="Players">
        <div className="NameList">
          {listOfPlayers.map((player) => (
            <div className="player" key={player.playerID}>
              <Link to={`/players/${player.playerID}`}>
                {player.nameFirst} {player.nameLast}
              </Link>
            </div>
          ))}

        </div>
        <div className="pagMargins">
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Players;
