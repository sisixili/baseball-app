import React from 'react';

const FavouriteButton = ({ userID, type, id, text, lightMode }) => {
  const handleAddFavourite = async () => {

    try {
      const response = await fetch('http://localhost:3001/favourite', {
        method: 'POST',
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, type, id, text }),
      });

      if (response.ok) {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
        console.log(await response.json())
      } else {
        const errorData = await response.json();
        alert(`Failed to add ${type}: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to add ${type} due to an error.`);
    }
  };

  return (
    <button className={lightMode? "favbutton":"dmfavbutton"} onClick={handleAddFavourite}> {/* lightMode ? "favbutton" : "dmfavbutton" */}
      Add Favourite {type.charAt(0).toUpperCase() + type.slice(1)} {/*text*/}
    </button>
  );
};

export default FavouriteButton;
