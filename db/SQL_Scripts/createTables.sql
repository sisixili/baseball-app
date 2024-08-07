CREATE TABLE IF NOT EXISTS Players (
    playerID VARCHAR(9) NOT NULL,
    birthYear INT(11) DEFAULT NULL,
    birthMonth INT(11) DEFAULT NULL,
    birthDay INT(11) DEFAULT NULL,
    birthCountry VARCHAR(255) DEFAULT NULL,
    deathYear INT(11) DEFAULT NULL,
    deathMonth INT(11) DEFAULT NULL,
    deathDay INT(11) DEFAULT NULL,
    nameFirst VARCHAR(255) DEFAULT NULL,
    nameLast VARCHAR(255) DEFAULT NULL,
    weight INT(11) DEFAULT NULL,
    height INT(11) DEFAULT NULL,
    bats VARCHAR(255) DEFAULT NULL,
    throws VARCHAR(255) DEFAULT NULL,
    debut VARCHAR(255) DEFAULT NULL,
    finalGame VARCHAR(255) DEFAULT NULL,
    bbrefID VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (playerID),
    CHECK(birthYear IS NULL OR birthYear >= 1814),
    CHECK(birthMonth IS NULL OR (birthMonth >= 1 AND birthMonth <= 12)),
    CHECK(birthDay IS NULL OR (birthDay >= 1 AND birthDay <= 31)),
    CHECK(deathYear IS NULL OR deathYear >= birthYear),
    CHECK(deathMonth IS NULL OR (deathMonth >= 1 AND deathMonth <= 12)),
    CHECK(deathDay IS NULL OR (deathDay >= 1 AND deathDay <= 31)),
    CHECK(weight IS NULL OR weight > 0),
    CHECK(height IS NULL OR height > 0),
    CHECK(bats IS NULL OR bats = 'L' OR bats = 'R' OR bats = 'B'),
    CHECK(throws IS NULL OR throws = 'L' OR throws = 'R' OR throws = 'B' OR throws = 'S')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX FavouritePlayerInformation ON Players(playerID, nameFirst, nameLast);
 

CREATE TABLE IF NOT EXISTS Franchises (
    franchiseID VARCHAR(3) NOT NULL,
    franchiseName VARCHAR(50) DEFAULT NULL,
    isActive VARCHAR(2) DEFAULT NULL,       
    PRIMARY KEY (franchiseID),
    UNIQUE KEY (franchiseID, franchiseName),
    CHECK(isActive IS NULL OR isActive = 'Y' OR isActive = 'N')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS Teams (
    yearID SMALLINT(6) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    teamID CHAR(3) NOT NULL,
    franchiseID VARCHAR(3) NOT NULL,
    divisionID CHAR(1) DEFAULT NULL,
    teamRank SMALLINT(6) DEFAULT NULL,
    G SMALLINT(6) DEFAULT NULL,
    gamesAtHome SMALLINT(6) DEFAULT NULL,
    W SMALLINT(6) DEFAULT NULL,
    L SMALLINT(6) DEFAULT NULL,
    divisionWin VARCHAR(1) DEFAULT NULL,
    wildCardWin VARCHAR(1) DEFAULT NULL,
    leagueWin VARCHAR(1) DEFAULT NULL,
    worldSeriesWin VARCHAR(1) DEFAULT NULL,
    R SMALLINT(6) DEFAULT NULL,
    AB SMALLINT(6) DEFAULT NULL,
    H SMALLINT(6) DEFAULT NULL,
    2B SMALLINT(6) DEFAULT NULL,
    3B SMALLINT(6) DEFAULT NULL,
    HR SMALLINT(6) DEFAULT NULL,
    BB SMALLINT(6) DEFAULT NULL,
    SO SMALLINT(6) DEFAULT NULL,
    SB SMALLINT(6) DEFAULT NULL,
    CS SMALLINT(6) DEFAULT NULL,
    HBP SMALLINT(6) DEFAULT NULL,
    SF SMALLINT(6) DEFAULT NULL,
    RA SMALLINT(6) DEFAULT NULL,
    ER SMALLINT(6) DEFAULT NULL,
    ERA double DEFAULT NULL,
    CG SMALLINT(6) DEFAULT NULL,
    SHO SMALLINT(6) DEFAULT NULL,
    SV SMALLINT(6) DEFAULT NULL,
    outsRecorded INT(11) DEFAULT NULL,
    HA SMALLINT(6) DEFAULT NULL,
    HRA SMALLINT(6) DEFAULT NULL,
    BBA SMALLINT(6) DEFAULT NULL,
    SOA SMALLINT(6) DEFAULT NULL,
    E INT(11) DEFAULT NULL,
    DP INT(11) DEFAULT NULL,
    FP double DEFAULT NULL,
    name VARCHAR(50) DEFAULT NULL,
    park VARCHAR(255) DEFAULT NULL,
    attendance INT(11) DEFAULT NULL,
    PRIMARY KEY (yearID, teamID),
    FOREIGN KEY (franchiseID) REFERENCES Franchises(franchiseID),
    CHECK(yearID >= 1871),
    CHECK(gamesAtHome IS NULL OR (gamesAtHome >= 0 AND G IS NOT NULL AND gamesAtHome <= G)),
    CHECK(gamesAtHome IS NULL or gamesAtHome >= 0),
    CHECK(W IS NULL OR (W >= 0 AND G IS NOT NULL AND W <= G)),
    CHECK(L IS NULL OR (L >= 0 AND G IS NOT NULL AND L <= G)),
    CHECK(divisionWin IS NULL OR divisionWin = 'Y' OR divisionWin = 'N'),
    CHECK(wildCardWin IS NULL OR wildCardWin = 'Y' OR wildCardWin = 'N'),
    CHECK(leagueWin IS NULL OR leagueWin = 'Y' OR leagueWin = 'N'),
    CHECK(worldSeriesWin IS NULL OR worldSeriesWin = 'Y' OR worldSeriesWin = 'N'),
    CHECK(R IS NULL OR R >= 0),
    CHECK(AB IS NULL OR AB >= 0),
    CHECK(H IS NULL OR H >= 0),
    CHECK(2B IS NULL OR 2B >= 0),
    CHECK(3B IS NULL OR 3B >= 0),
    CHECK(HR IS NULL OR HR >= 0),
    CHECK(BB IS NULL OR BB >= 0),
    CHECK(SO IS NULL OR SO >= 0),
    CHECK(SB IS NULL OR SB >= 0),
    CHECK(CS IS NULL OR CS >= 0),
    CHECK(HBP IS NULL OR HBP >= 0),
    CHECK(SF IS NULL OR SF >= 0),
    CHECK(RA IS NULL OR RA >= 0),
    CHECK(ER IS NULL OR ER >= 0),
    CHECK(ERA IS NULL OR ERA >= 0),
    CHECK(CG IS NULL OR (CG >= 0 AND G IS NOT NULL AND CG <= G)),
    CHECK(SHO IS NULL OR SHO >= 0),
    CHECK(SV IS NULL OR (SV >= 0 AND G IS NOT NULL AND SV <= G)),
    CHECK(outsRecorded IS NULL OR outsRecorded >= 0),
    CHECK(HA IS NULL OR HA >= 0),
    CHECK(HRA IS NULL OR HRA >= 0),
    CHECK(BBA IS NULL OR BBA >= 0),
    CHECK(SOA IS NULL OR SOA >= 0),
    CHECK(E IS NULL OR E >= 0),
    CHECK(DP IS NULL OR DP >= 0),
    CHECK(FP IS NULL OR (FP >= 0 AND FP <= 1)),
    CHECK(attendance IS NULL OR attendance >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX FavouriteTeamInformation ON Teams(teamID, yearID, name);
CREATE INDEX FranchiseWinningHistory ON Teams(franchiseID, yearID, W);
CREATE INDEX SingleYearTeams ON Teams(yearID, teamID);
CREATE INDEX FranchisesTeams ON Teams(franchiseID);


CREATE TABLE IF NOT EXISTS Parks (
    parkAlias VARCHAR(255) DEFAULT NULL,
    parkID VARCHAR(255) NOT NULL,
    parkName VARCHAR(255) DEFAULT NULL,
    city VARCHAR(255) DEFAULT NULL,
    state VARCHAR(255) DEFAULT NULL,
    country VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (parkID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS AllstarFull (
    playerID VARCHAR(9) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    gameNumber SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    playedInGame SMALLINT(6) DEFAULT NULL,
    startingPosition SMALLINT(6) DEFAULT NULL,
    PRIMARY KEY (playerID, yearID, gameNumber),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    -- FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    CHECK(yearID >= 1871),
    CHECK(gameNumber >= 0),
    CHECK(playedInGame IS NULL OR playedInGame = 0 OR playedInGame = 1),
    CHECK(startingPosition IS NULL OR (startingPosition >= 1 AND startingPosition <= 10))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX SingleYearAllStars ON AllstarFull(playerID);


CREATE TABLE IF NOT EXISTS Appearances (
    yearID SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    playerID VARCHAR(9) NOT NULL,
    G SMALLINT(6) DEFAULT NULL,
    GS SMALLINT(6) DEFAULT NULL,
    G_batting SMALLINT(6) DEFAULT NULL,
    G_defense SMALLINT(6) DEFAULT NULL,
    G_p SMALLINT(6) DEFAULT NULL,
    G_c SMALLINT(6) DEFAULT NULL,
    G_1b SMALLINT(6) DEFAULT NULL,
    G_2b SMALLINT(6) DEFAULT NULL,
    G_3b SMALLINT(6) DEFAULT NULL,
    G_ss SMALLINT(6) DEFAULT NULL,
    G_lf SMALLINT(6) DEFAULT NULL,
    G_cf SMALLINT(6) DEFAULT NULL,
    G_rf SMALLINT(6) DEFAULT NULL,
    G_of SMALLINT(6) DEFAULT NULL,
    G_dh SMALLINT(6) DEFAULT NULL,
    G_ph SMALLINT(6) DEFAULT NULL,
    G_pr SMALLINT(6) DEFAULT NULL,
    PRIMARY KEY (yearID, teamID, playerID),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    CHECK(yearID >= 1871),
    CHECK(G IS NULL OR G >= 0),
    CHECK(GS IS NULL OR GS >= 0),
    -- CHECK(G_batting IS NULL OR (G_batting >= 0 AND G IS NOT NULL AND G_batting <= G)),
    -- CHECK(G_defense IS NULL OR (G_defense >= 0 AND G IS NOT NULL AND G_defense <= G)),
    CHECK(G_p IS NULL OR (G_p >= 0 AND G IS NOT NULL AND G_p <= G)),
    CHECK(G_c IS NULL OR (G_c >= 0 AND G IS NOT NULL AND G_c <= G)),
    CHECK(G_1b IS NULL OR (G_1b >= 0 AND G IS NOT NULL AND G_1b <= G)),
    CHECK(G_2b IS NULL OR (G_2b >= 0 AND G IS NOT NULL AND G_2b <= G)),
    CHECK(G_3b IS NULL OR (G_3b >= 0 AND G IS NOT NULL AND G_3b <= G)),
    CHECK(G_ss IS NULL OR (G_ss >= 0 AND G IS NOT NULL AND G_ss <= G)),
    CHECK(G_lf IS NULL OR (G_lf >= 0 AND G IS NOT NULL AND G_lf <= G)),
    CHECK(G_cf IS NULL OR (G_cf >= 0 AND G IS NOT NULL AND G_cf <= G)),
    CHECK(G_rf IS NULL OR (G_rf >= 0 AND G IS NOT NULL AND G_rf <= G)),
    -- CHECK(G_of IS NULL OR (G_of >= 0 AND G IS NOT NULL AND G_of <= G)),
    CHECK(G_dh IS NULL OR (G_dh >= 0 AND G IS NOT NULL AND G_dh <= G)),
    CHECK(G_ph IS NULL OR (G_ph >= 0 AND G IS NOT NULL AND G_ph <= G)),
    CHECK(G_pr IS NULL OR (G_pr >= 0 AND G IS NOT NULL AND G_pr <= G))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS AwardsPlayers (
    playerID VARCHAR(9) NOT NULL,
    awardID VARCHAR(255) NOT NULL,
    yearID SMALLINT(6) NOT NULL CHECK(yearID >= 1871),
    leagueID CHAR(2) NOT NULL, 
    didTie VARCHAR(1) DEFAULT NULL CHECK(didTie IS NULL OR didTie = 'Y'),
    note VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (playerID, awardID, yearID, leagueID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX SingleYearAwards ON AwardsPlayers(playerID);


CREATE TABLE IF NOT EXISTS Batting (
    playerID VARCHAR(9) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    stint SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    G SMALLINT(6) DEFAULT NULL,
    AB SMALLINT(6) DEFAULT NULL,
    R SMALLINT(6) DEFAULT NULL,
    H SMALLINT(6) DEFAULT NULL,
    2B SMALLINT(6) DEFAULT NULL,
    3B SMALLINT(6) DEFAULT NULL,
    HR SMALLINT(6) DEFAULT NULL,
    RBI SMALLINT(6) DEFAULT NULL,
    SB SMALLINT(6) DEFAULT NULL,
    CS SMALLINT(6) DEFAULT NULL,
    BB SMALLINT(6) DEFAULT NULL,
    SO SMALLINT(6) DEFAULT NULL,
    IBB SMALLINT(6) DEFAULT NULL,
    HBP SMALLINT(6) DEFAULT NULL,
    SH SMALLINT(6) DEFAULT NULL,
    SF SMALLINT(6) DEFAULT NULL,
    GIDP SMALLINT(6) DEFAULT NULL,
    PRIMARY KEY (playerID, yearID, stint),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    CHECK(yearID >= 1871),
    CHECK(stint >= 1),
    CHECK(G IS NULL OR G >= 0),
    CHECK(AB IS NULL OR AB >= 0),
    CHECK(R IS NULL OR R >= 0),
    CHECK(H IS NULL OR H >= 0),
    CHECK(2B IS NULL OR 2B >= 0),
    CHECK(3B IS NULL OR 3B >= 0),
    CHECK(HR IS NULL OR HR >= 0),
    CHECK(RBI IS NULL OR RBI >= 0),
    CHECK(SB IS NULL OR SB >= 0),
    CHECK(CS IS NULL OR CS >= 0),
    CHECK(BB IS NULL OR BB >= 0),
    CHECK(SO IS NULL OR SO >= 0),
    CHECK(IBB IS NULL OR IBB >= 0),
    CHECK(HBP IS NULL OR HBP >= 0),
    CHECK(SH IS NULL OR SH >= 0),
    CHECK(SF IS NULL OR SF >= 0),
    CHECK(GIDP IS NULL OR GIDP >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX SingleBatter ON Batting(playerID);
CREATE INDEX SingleYearBattersWithTeams ON Batting(yearID, teamID);


CREATE TABLE IF NOT EXISTS BattingPost (
    round varchar(10) NOT NULL,
    playerID VARCHAR(9) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    G SMALLINT(6) DEFAULT NULL,
    AB SMALLINT(6) DEFAULT NULL,
    R SMALLINT(6) DEFAULT NULL,
    H SMALLINT(6) DEFAULT NULL,
    2B SMALLINT(6) DEFAULT NULL,
    3B SMALLINT(6) DEFAULT NULL,
    HR SMALLINT(6) DEFAULT NULL,
    RBI SMALLINT(6) DEFAULT NULL,
    SB SMALLINT(6) DEFAULT NULL,
    CS SMALLINT(6) DEFAULT NULL,
    BB SMALLINT(6) DEFAULT NULL,
    SO SMALLINT(6) DEFAULT NULL,
    IBB SMALLINT(6) DEFAULT NULL,
    HBP SMALLINT(6) DEFAULT NULL,
    SH SMALLINT(6) DEFAULT NULL,
    SF SMALLINT(6) DEFAULT NULL,
    GIDP SMALLINT(6) DEFAULT NULL,
    PRIMARY KEY (playerID, yearID, round),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    CHECK(yearID >= 1871),
    CHECK(G IS NULL OR G >= 0),
    CHECK(AB IS NULL OR AB >= 0),
    CHECK(R IS NULL OR R >= 0),
    CHECK(H IS NULL OR H >= 0),
    CHECK(2B IS NULL OR 2B >= 0),
    CHECK(3B IS NULL OR 3B >= 0),
    CHECK(HR IS NULL OR HR >= 0),
    CHECK(RBI IS NULL OR RBI >= 0),
    CHECK(SB IS NULL OR SB >= 0),
    CHECK(CS IS NULL OR CS >= 0),
    CHECK(BB IS NULL OR BB >= 0),
    CHECK(SO IS NULL OR SO >= 0),
    CHECK(IBB IS NULL OR IBB >= 0),
    CHECK(HBP IS NULL OR HBP >= 0),
    CHECK(SH IS NULL OR SH >= 0),
    CHECK(SF IS NULL OR SF >= 0),
    CHECK(GIDP IS NULL OR GIDP >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX SinglePlayoffBatter ON BattingPost(playerID);
CREATE INDEX SingleYearPlayoffBattersWithTeams ON BattingPost(yearID, teamID);



CREATE TABLE IF NOT EXISTS Fielding (
    playerID VARCHAR(9) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    stint SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    position VARCHAR(2) NOT NULL,
    G SMALLINT(6) DEFAULT NULL,
    GS SMALLINT(6) DEFAULT NULL,
    outsRecorded SMALLINT(6) DEFAULT NULL,
    PO SMALLINT(6) DEFAULT NULL,
    A SMALLINT(6) DEFAULT NULL,
    E SMALLINT(6) DEFAULT NULL,
    DP SMALLINT(6) DEFAULT NULL,
    PB SMALLINT(6) DEFAULT NULL,
    WP SMALLINT(6) DEFAULT NULL,
    SB SMALLINT(6) DEFAULT NULL,
    CS SMALLINT(6) DEFAULT NULL,
    PRIMARY KEY (playerID, yearID, stint, position),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    CHECK(yearID >= 1871),
    CHECK(stint >= 1),
    CHECK(position = 'P' OR position = 'C' OR position = '1B' OR position = '2B' OR position = '3B' OR position = 'SS' OR position = 'OF'),
    CHECK(G IS NULL OR G >= 0),
    -- CHECK(GS IS NULL OR (GS >= 0 AND G IS NOT NULL AND GS <= G)),
    CHECK(outsRecorded IS NULL OR outsRecorded >= 0),
    CHECK(PO IS NULL OR PO >= 0),
    CHECK(A IS NULL OR A >= 0),
    CHECK(E IS NULL OR E >= 0),
    CHECK(DP IS NULL OR DP >= 0),
    CHECK(PB IS NULL OR PB >= 0),
    CHECK(WP IS NULL OR WP >= 0),
    CHECK(SB IS NULL OR SB >= 0),
    CHECK(CS IS NULL OR CS >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX SingleYearFieldersWithTeams ON Fielding(yearID, teamID);
CREATE INDEX SingleFielderWithPositions ON Fielding(playerID, position);


CREATE TABLE IF NOT EXISTS FieldingPost (
    round varchar(10) NOT NULL,
    playerID VARCHAR(9) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    position VARCHAR(2) NOT NULL,
    G SMALLINT(6) DEFAULT NULL,
    GS SMALLINT(6) DEFAULT NULL,
    outsRecorded SMALLINT(6) DEFAULT NULL,
    PO SMALLINT(6) DEFAULT NULL,
    A SMALLINT(6) DEFAULT NULL,
    E SMALLINT(6) DEFAULT NULL,
    DP SMALLINT(6) DEFAULT NULL,
    TP SMALLINT(6) DEFAULT NULL,
    PB SMALLINT(6) DEFAULT NULL,
    SB SMALLINT(6) DEFAULT NULL,
    CS SMALLINT(6) DEFAULT NULL,
    PRIMARY KEY (playerID, yearID, round, position),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    CHECK(yearID >= 1871),
    CHECK(position = 'P' OR position = 'C' OR position = '1B' OR position = '2B' OR position = '3B' OR position = 'SS' OR position = 'LF' OR position = 'CF' OR position = 'RF'),
    CHECK(G IS NULL OR G >= 0),
    -- CHECK(GS IS NULL OR (GS >= 0 AND G IS NOT NULL AND GS <= G)),
    CHECK(outsRecorded IS NULL OR outsRecorded >= 0),
    CHECK(PO IS NULL OR PO >= 0),
    CHECK(A IS NULL OR A >= 0),
    CHECK(E IS NULL OR E >= 0),
    CHECK(DP IS NULL OR DP >= 0),
    CHECK(TP IS NULL OR TP >= 0),
    CHECK(PB IS NULL OR PB >= 0),
    CHECK(SB IS NULL OR SB >= 0),
    CHECK(CS IS NULL OR CS >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX SingleYearPlayoffFieldersWithTeams ON FieldingPost(yearID, teamID);
CREATE INDEX SinglePlayoffFielder ON FieldingPost(playerID);


CREATE TABLE IF NOT EXISTS FieldingOFSplit (
    playerID VARCHAR(9) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    stint SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    position VARCHAR(2) NOT NULL,
    G SMALLINT(6) DEFAULT NULL,
    GS SMALLINT(6) DEFAULT NULL,
    outsRecorded SMALLINT(6) DEFAULT NULL,
    PO SMALLINT(6) DEFAULT NULL,
    A SMALLINT(6) DEFAULT NULL,
    E SMALLINT(6) DEFAULT NULL,
    DP SMALLINT(6) DEFAULT NULL,
    PB SMALLINT(6) DEFAULT NULL,
    WP SMALLINT(6) DEFAULT NULL,
    SB SMALLINT(6) DEFAULT NULL,
    CS SMALLINT(6) DEFAULT NULL,
    PRIMARY KEY (playerID, yearID, stint, position),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    CHECK(yearID >= 1871),
    CHECK(stint >= 1),
    CHECK(position = 'LF' OR position = 'CF' OR position = 'RF'),
    CHECK(G IS NULL OR G >= 0),
    -- CHECK(GS IS NULL OR (GS >= 0 AND G IS NOT NULL AND GS <= G)),
    CHECK(outsRecorded IS NULL OR outsRecorded >= 0),
    CHECK(PO IS NULL OR PO >= 0),
    CHECK(A IS NULL OR A >= 0),
    CHECK(E IS NULL OR E >= 0),
    CHECK(DP IS NULL OR DP >= 0),
    CHECK(PB IS NULL OR PB >= 0),
    CHECK(WP IS NULL OR WP >= 0),
    CHECK(SB IS NULL OR SB >= 0),
    CHECK(CS IS NULL OR CS >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS HallOfFame (
    playerID VARCHAR(10) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    wasInducted VARCHAR(1) NOT NULL,
    PRIMARY KEY (playerID, yearID, wasInducted),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    CHECK(yearID >= 1871),
    CHECK(wasInducted = 'N' OR wasInducted = 'Y')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS HomeGames (
    yearID SMALLINT(6) NOT NULL CHECK(yearID >= 1871),        
    leagueID CHAR(2) DEFAULT NULL,
    teamID CHAR(3) NOT NULL,              
    parkID VARCHAR(255) NOT NULL,              
    spanFirst VARCHAR(255) DEFAULT NULL,
    spanLast VARCHAR(255) DEFAULT NULL,
    gamesPlayedAtHome INT(11) DEFAULT NULL,
    gamesWithFans INT(11) DEFAULT NULL,
    totalAttendance INT(11) DEFAULT NULL,
    PRIMARY KEY (yearID, teamID, parkID),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (parkID) REFERENCES Parks(parkID),
    CHECK(gamesPlayedAtHome IS NULL OR gamesPlayedAtHome >= 0),
    CHECK(gamesWithFans IS NULL OR (gamesWithFans >= 0 AND gamesPlayedAtHome IS NOT NULL AND gamesWithFans <= gamesPlayedAtHome)),
    CHECK(totalAttendance IS NULL OR totalAttendance >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX TeamHomeGames ON HomeGames(yearID, teamID, gamesWithFans);


CREATE TABLE IF NOT EXISTS Pitching (
    playerID VARCHAR(9) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    stint SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    W SMALLINT(6) DEFAULT NULL,
    L SMALLINT(6) DEFAULT NULL,
    G SMALLINT(6) DEFAULT NULL,
    GS SMALLINT(6) DEFAULT NULL,
    CG SMALLINT(6) DEFAULT NULL,
    SHO SMALLINT(6) DEFAULT NULL,
    SV SMALLINT(6) DEFAULT NULL,
    outsRecorded INT(11) DEFAULT NULL,
    H SMALLINT(6) DEFAULT NULL,
    ER SMALLINT(6) DEFAULT NULL,
    HR SMALLINT(6) DEFAULT NULL,
    BB SMALLINT(6) DEFAULT NULL,
    SO SMALLINT(6) DEFAULT NULL,
    BAOpponents double DEFAULT NULL,
    ERA double DEFAULT NULL,
    IBB SMALLINT(6) DEFAULT NULL,
    WP SMALLINT(6) DEFAULT NULL,
    HBP SMALLINT(6) DEFAULT NULL,
    BK SMALLINT(6) DEFAULT NULL,
    BFP smallint(6) DEFAULT NULL,
    GF SMALLINT(6) DEFAULT NULL,
    R SMALLINT(6) DEFAULT NULL,
    SH SMALLINT(6) DEFAULT NULL,
    SF SMALLINT(6) DEFAULT NULL,
    GIDP SMALLINT(6) DEFAULT NULL,
    PRIMARY KEY (playerID, yearID, stint),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    CHECK(yearID >= 1871),
    CHECK(stint >= 1),
    CHECK(W IS NULL OR (W >= 0 AND G IS NOT NULL AND W <= G)),
    CHECK(L IS NULL OR (L >= 0 AND G IS NOT NULL AND L <= G)),
    CHECK(G IS NULL OR G >= 0),
    CHECK(GS IS NULL OR (GS >= 0 AND G IS NOT NULL AND GS <= G)),
    CHECK(CG IS NULL OR (CG >= 0 AND GS IS NOT NULL AND CG <= GS)),
    -- CHECK(SHO IS NULL OR (SHO >= 0 AND CG IS NOT NULL AND SHO <= CG)),
    CHECK(SV IS NULL OR (SV >= 0 AND G IS NOT NULL AND SV <= G)),
    CHECK(outsRecorded IS NULL OR outsRecorded >= 0),
    CHECK(H IS NULL OR H >= 0),
    CHECK(ER IS NULL OR ER >= 0),
    CHECK(HR IS NULL OR HR >= 0),
    CHECK(BB IS NULL OR BB >= 0),
    CHECK(SO IS NULL OR SO >= 0),
    -- CHECK(BAOpponents IS NULL OR (BAOpponents >= 0 AND BAOpponents <= 1)),
    CHECK(ERA IS NULL OR ERA >= 0),
    CHECK(IBB IS NULL OR IBB >= 0),
    CHECK(WP IS NULL OR WP >= 0),
    CHECK(HBP IS NULL OR HBP >= 0),
    CHECK(BK IS NULL OR BK >= 0),
    CHECK(GF IS NULL OR (GF >= 0 AND G IS NOT NULL AND GF <= G)),
    CHECK(R IS NULL OR R >= 0),
    CHECK(SH IS NULL OR SH >= 0),
    CHECK(SF IS NULL OR SF >= 0),
    CHECK(GIDP IS NULL OR GIDP >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX SingleYearPitchersWithTeams ON Pitching(yearID, teamID);
CREATE INDEX SinglePitcher ON Pitching(playerID);


CREATE TABLE IF NOT EXISTS PitchingPost (
    round varchar(10) NOT NULL,
    playerID VARCHAR(9) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    leagueID CHAR(2) DEFAULT NULL,
    W SMALLINT(6) DEFAULT NULL,
    L SMALLINT(6) DEFAULT NULL,
    G SMALLINT(6) DEFAULT NULL,
    GS SMALLINT(6) DEFAULT NULL,
    CG SMALLINT(6) DEFAULT NULL,
    SHO SMALLINT(6) DEFAULT NULL,
    SV SMALLINT(6) DEFAULT NULL,
    outsRecorded INT(11) DEFAULT NULL,
    H SMALLINT(6) DEFAULT NULL,
    ER SMALLINT(6) DEFAULT NULL,
    HR SMALLINT(6) DEFAULT NULL,
    BB SMALLINT(6) DEFAULT NULL,
    SO SMALLINT(6) DEFAULT NULL,
    BAOpponents double DEFAULT NULL,
    ERA double DEFAULT NULL,
    IBB SMALLINT(6) DEFAULT NULL,
    WP SMALLINT(6) DEFAULT NULL,
    HBP SMALLINT(6) DEFAULT NULL,
    BK SMALLINT(6) DEFAULT NULL,
    BFP smallint(6) DEFAULT NULL,
    GF SMALLINT(6) DEFAULT NULL,
    R SMALLINT(6) DEFAULT NULL,
    SH SMALLINT(6) DEFAULT NULL,
    SF SMALLINT(6) DEFAULT NULL,
    GIDP SMALLINT(6) DEFAULT NULL,
    PRIMARY KEY (playerID, yearID, round),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    CHECK(yearID >= 1871),
    CHECK(W IS NULL OR (W >= 0 AND G IS NOT NULL AND W <= G)),
    CHECK(L IS NULL OR (L >= 0 AND G IS NOT NULL AND L <= G)),
    CHECK(G IS NULL OR G >= 0),
    CHECK(GS IS NULL OR (GS >= 0 AND G IS NOT NULL AND GS <= G)),
    CHECK(CG IS NULL OR (CG >= 0 AND GS IS NOT NULL AND CG <= GS)),
    CHECK(SHO IS NULL OR (SHO >= 0 AND CG IS NOT NULL AND SHO <= CG)),
    CHECK(SV IS NULL OR (SV >= 0 AND G IS NOT NULL AND SV <= G)),
    CHECK(outsRecorded IS NULL OR outsRecorded >= 0),
    CHECK(H IS NULL OR H >= 0),
    CHECK(ER IS NULL OR ER >= 0),
    CHECK(HR IS NULL OR HR >= 0),
    CHECK(BB IS NULL OR BB >= 0),
    CHECK(SO IS NULL OR SO >= 0),
    CHECK(BAOpponents IS NULL OR (BAOpponents >= 0 AND BAOpponents <= 1)),
    CHECK(ERA IS NULL OR ERA >= 0),
    CHECK(IBB IS NULL OR IBB >= 0),
    CHECK(WP IS NULL OR WP >= 0),
    CHECK(HBP IS NULL OR HBP >= 0),
    CHECK(BK IS NULL OR BK >= 0),
    CHECK(GF IS NULL OR (GF >= 0 AND G IS NOT NULL AND GF <= G)),
    CHECK(R IS NULL OR R >= 0),
    CHECK(SH IS NULL OR SH >= 0),
    CHECK(SF IS NULL OR SF >= 0),
    CHECK(GIDP IS NULL OR GIDP >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX SinglePlayoffPitcher ON PitchingPost(playerID);
CREATE INDEX SingleYearPlayoffPitchersWithTeams ON PitchingPost(yearID, teamID);


CREATE TABLE IF NOT EXISTS SeriesPost (
    yearID smallint(6) NOT NULL,
    round varchar(10) NOT NULL,
    winningTeamID varchar(3) DEFAULT NULL,
    winningLeagueID varchar(2) DEFAULT NULL,
    losingTeamID varchar(3) DEFAULT NULL,
    losingLeagueID varchar(2) DEFAULT NULL,
    wins smallint(6) DEFAULT NULL,
    losses smallint(6) DEFAULT NULL,
    ties smallint(6) DEFAULT NULL,
    PRIMARY KEY (yearID, round),
    UNIQUE KEY (yearID, round, winningTeamID),
    FOREIGN KEY (yearID, winningTeamID) REFERENCES Teams(yearID, teamID),
    FOREIGN KEY (yearID, losingTeamID) REFERENCES Teams(yearID, teamID),
    CHECK(yearID >= 1871),
    CHECK(wins IS NULL OR wins >= 0),
    CHECK(losses IS NULL OR losses >= 0),
    CHECK(ties IS NULL OR ties >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS Users (
    userID VARCHAR(50) NOT NULL,
    nameFirst VARCHAR(255) NOT NULL,
    nameLast VARCHAR(255) NOT NULL,
    pwd VARCHAR(255) NOT NULL,
    PRIMARY KEY (userID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS FavouriteFranchises (
    userID VARCHAR(50) NOT NULL,
    franchiseID VARCHAR(3) NOT NULL,
    PRIMARY KEY (userID, franchiseID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (franchiseID) REFERENCES Franchises(franchiseID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS FavouriteTeams (
    userID VARCHAR(50) NOT NULL,
    yearID SMALLINT(6) NOT NULL,
    teamID CHAR(3) NOT NULL,
    PRIMARY KEY (userID, yearID, teamID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (yearID, teamID) REFERENCES Teams(yearID, teamID),
    CHECK(yearID >= 1871)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS FavouritePlayers (
    userID VARCHAR(50) NOT NULL,
    playerID VARCHAR(9) NOT NULL,
    PRIMARY KEY (userID, playerID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
