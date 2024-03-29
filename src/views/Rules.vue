<template>
  <v-container>
    <div class="rules">
      <h1>Rules</h1>

      <p>
        Rule #1: When something occurs that is not explicitly explained in the
        rules but where there is a precedent based on how we've done things in
        the past, that precedent will serve as a rule.
      </p>
      <p>
        The scoring in the competition is based on the matches in the English
        Premier League.
      </p>
      <p>
        Points scored in rescheduled matches will be counted for the match day
        the match was originally scheduled for. Example: Match day 5 is played
        on November 10th. The match between Arsenal and Aston Villa is
        rescheduled for March 5th. The points scored in that game will be added
        to the results in match day 5 when the match is played.
      </p>

      <h2>Scoring</h2>
      <p>
        The teams in the D11 league will play each other twice every season in
        38 match days. The team that scores the most goals in each match will
        gain 3 points, the loser will gain 0 points. If the game ends in a draw
        both teams will get 1 point each.
      </p>
      <p>
        Goals are awarded based on the number of player points the team
        accumulates in each match.
      </p>

      <table id="scoring" class="simple rules-table">
        <colgroup>
          <col id="player-points-column" />
          <col id="goals-for-player-points-column" />
        </colgroup>
        <tr>
          <th>Points</th>
          <th>Goals</th>
        </tr>
        <tr>
          <td>Below 1</td>
          <td>0</td>
        </tr>
        <tr>
          <td>1-4</td>
          <td>1</td>
        </tr>
        <tr>
          <td>5-9</td>
          <td>2</td>
        </tr>
        <tr>
          <td>10-14</td>
          <td>3</td>
        </tr>
        <tr>
          <td>15-19</td>
          <td>4</td>
        </tr>
        <tr>
          <td>20-24</td>
          <td>5</td>
        </tr>
        <tr>
          <td>25-29</td>
          <td>6</td>
        </tr>
        <tr>
          <td>30-34</td>
          <td>7</td>
        </tr>
        <tr>
          <td>Etc.</td>
          <td>Etc.</td>
        </tr>
      </table>

      <p>
        The team with the most points after 38 match days wins the league. If
        two or more teams have the same number of points, the team who's scored
        the most goals wins. If two or more teams still can't be separated, the
        team who's conceded the most goals wins. If a winner still can't be
        found the league will be decided by a penalty shootout at Nabben
        stadium.
      </p>
      <p>
        The fixture list will be made after the draft and published on this
        website.
      </p>
      <p>
        Match stats and ratings will be taken from www.whoscored.com. If
        Whoscored for some reason fail to produce stats or ratings then stats
        will be taken from www.premierleague.com and ratings will be taken from
        www.skysports.com. The stats and ratings will be updated soon after the
        matches are finished but as Whoscored has a habit of updating the
        ratings after a while the ratings will be finalized at approximately
        18:00 the day after the match was played.
      </p>
      <p>
        The Man of the Match (MoM) for each team in a Premier League match will
        be the player with the highest rating on www.whoscored.com. If two or
        more players on the same team share the highest rating then all of them
        will be shared MoM.
      </p>

      <h2>Player points</h2>

      <p>
        Each player will score points during a Premier League match according to
        this table.
      </p>

      <table id="player-points" class="simple rules-table">
        <colgroup>
          <col id="event-all-column" />
          <col id="points-all-column" />
        </colgroup>
        <tr>
          <th>Match event</th>
          <th class="points-column number-column">Points</th>
        </tr>
        <tr>
          <td>Rating 9.50 - 10.0</td>
          <td class="points-column number-column">5</td>
        </tr>
        <tr>
          <td>Rating 8.50 - 9.49</td>
          <td class="points-column number-column">3</td>
        </tr>
        <tr>
          <td>Rating 7.50 - 8.49</td>
          <td class="points-column number-column">2</td>
        </tr>
        <tr>
          <td>Rating 6.50 - 7.49</td>
          <td class="points-column number-column">1</td>
        </tr>
        <tr>
          <td>No rating</td>
          <td class="points-column number-column">0</td>
        </tr>
        <tr>
          <td>Rating 5.50 - 6.49</td>
          <td class="points-column number-column">0</td>
        </tr>
        <tr>
          <td>Rating 4.50 - 5.49</td>
          <td class="points-column number-column">-1</td>
        </tr>
        <tr>
          <td>Rating 3.50 - 4.49</td>
          <td class="points-column number-column">-2</td>
        </tr>
        <tr>
          <td>Rating 2.50 - 3.49</td>
          <td class="points-column number-column">-3</td>
        </tr>
        <tr>
          <td>Rating 1.50 - 2.49</td>
          <td class="points-column number-column">-4</td>
        </tr>
        <tr>
          <td>Rating 0.50 - 1.49</td>
          <td class="points-column number-column">-5</td>
        </tr>
        <tr>
          <td>Rating 0.00 - 0.49</td>
          <td class="points-column number-column">-6</td>
        </tr>
        <tr>
          <td>
            MoM
          </td>
          <td class="points-column number-column">4</td>
        </tr>
        <tr>
          <td>
            Shared MoM
          </td>
          <td class="points-column number-column">2</td>
        </tr>
        <tr>
          <td>
            Goal
          </td>
          <td class="points-column number-column">4</td>
        </tr>
        <tr>
          <td>
            Assist
          </td>
          <td class="points-column number-column">2</td>
        </tr>
        <tr>
          <td>
            Own goal
          </td>
          <td class="points-column number-column">-4</td>
        </tr>
        <tr>
          <td>
            Yellow card
          </td>
          <td class="points-column number-column">-1</td>
        </tr>
        <tr>
          <td>
            Red card
          </td>
          <td class="points-column number-column">-4</td>
        </tr>
      </table>

      <p>
        Additionally, goalkeepers and defenders will receive bonus points or
        negative points based on the number of goals their team concedes if the
        players participate in the match. Goalkeepers and defenders who do not
        participate in their teams match for a match day will receive one minus
        point.
      </p>

      <table id="goalkeeper-defender-points" class="simple rules-table">
        <colgroup>
          <col id="goals-conceded-column" />
          <col id="points-defender-column" />
        </colgroup>
        <tr>
          <th>Goals conceded</th>
          <th class="points-column number-column">Points</th>
        </tr>
        <tr>
          <td>Clean sheet</td>
          <td class="points-column number-column">4</td>
        </tr>
        <tr>
          <td>1</td>
          <td class="points-column number-column">0</td>
        </tr>
        <tr>
          <td>2</td>
          <td class="points-column number-column">-1</td>
        </tr>
        <tr>
          <td>3</td>
          <td class="points-column number-column">-2</td>
        </tr>
        <tr>
          <td>4</td>
          <td class="points-column number-column">-3</td>
        </tr>
        <tr>
          <td>Etc.</td>
          <td class="points-column number-column">Etc.</td>
        </tr>
        <tr>
          <td>Did not play</td>
          <td class="points-column number-column">-1</td>
        </tr>
      </table>

      <p>
        Also, midfielders will receive one bonus point if their team keeps a
        clean sheet.
      </p>

      <table id="midfielder-points" class="simple rules-table">
        <colgroup>
          <col id="goals-conceded-column" />
          <col id="points-defender-column" />
        </colgroup>
        <tr>
          <th>Goals conceded</th>
          <th class="points-column number-column">Points</th>
        </tr>
        <tr>
          <td>Clean sheet</td>
          <td class="points-column number-column">1</td>
        </tr>
      </table>

      <h2>Participation fee</h2>

      <p>
        The participation fee is 50 euro. This fee will be used for prize money
        for the teams finishing in first, second and third place. The exact
        rewards will depend on the number of participating teams. If the
        competition is full and 20 teams participate, the rewards will be 500
        euro for first place, 300 euro for second place and 200 euro for third
        place.
      </p>

      <h2>The draft</h2>

      <ul>
        <li>
          The draft will be held at a date close to the start of the season. It
          has traditionally been held on the thursday before the first match
          day. Time and location will be announced as the start of the season
          approaches.
        </li>
        <li>
          Be on time! The squad you manage to build in the draft will be in
          action on the first match day of the season. A preliminary list of
          available players will be provided at this web site.
        </li>
        <li>
          The actual list of available players will be provided at the draft.
        </li>
        <li>
          The number of teams in the competition cannot exceed 20 since there
          are only 20 teams in the Premier League. In the event that there are
          more than 20 willing owners, 2 owners can register one team as co
          owners.
        </li>
        <li>
          The draft will be held as an open auction. The owner of last seasons
          winning team will place the first bid on any of the available players.
          After this, any other owner may place a higher bid on that player, and
          so on. When noone wants to place a higher bid, the player will be
          added to the team owned by the highest bidder. Once a bid has been
          placed it cannot be cancelled.
        </li>
        <li>
          All players are unique and each player may only belong to one D11
          team.
        </li>
        <li>
          All teams will have £60 million to spend on players for their squads.
        </li>
        <li>
          There are no limitations on how many players from the same Premier
          League team can play for the same D11 team.
        </li>
        <li>
          There are no predetermined fees for any player. The minimum fee for
          all players is 0,5. A high bid also has to be at least 0,5 higher than
          the current high bid.
        </li>
        <li>
          Each team must have one goalkeeper, four defenders, four midfielders
          and two forwards in a 4-4-2 formation.
        </li>
        <li>
          It's up to each owner to make sure they can afford the bids they
          place. If it is noticed that an owner has placed a bid that is higher
          than he can afford or has won bids on too many players for one
          position, the bidding on the player will be restarted.
        </li>
      </ul>

      <h2>The transfer system</h2>
      <ul>
        <li>
          The transfer windows will open after the 8th, 16th, 24th and 32nd
          match week of the season. The exact date will be announced closer to
          the actual date.
        </li>
        <li>
          At any time before the transfer window opens owners will be able to
          log in to the web site and transfer list the players in their teams.
          The players will remain in the teams until the transfer window has
          opened and the owners will be able to remove players from the transfer
          list during this time. Before the deadline each owner will only be
          able to see which players his own team has transfer listed.
        </li>
        <li>
          A total of 13 transfers will be allowed for each team during the
          season.
        </li>
        <li>
          When the transfer window opens all transfer listed players will be
          removed from their teams. Once this deadline has passed it is too late
          for owners to regret transfer listing any players. Make sure all the
          players you want to get rid of and only players you want to get rid of
          are transfer listed when the transfer window opens! If you want to
          keep a player that has been removed from your team you will have to
          have the high bid for that player in the bidding.
        </li>
        <li>
          After the transfer window has opened owners will be able to log in and
          place bids on available players. Available players are those who did
          not belong to a D11 team before the transfer window opened and all
          those who were transfer listed by owners before the window opened.
          Owners will be able to bid on players they've transfer listed.
        </li>
        <li>
          Just like in the draft, all bids must end in .0 or 0.5. Note that you
          must take into consideration that you have to be able to bid 0.5 for
          each position in your team that you have to fill. If you've transfer
          listed three players and you have 10.0 to spend then the highest bid
          for each player will be 9.0. The web site will not let you enter bids
          that are too high.
        </li>
        <li>
          Before the deadline for placing bids has passed you will be able to
          change and/or remove your placed bids. After the deadline has passed
          it is too late to change, add or remove bids. Make sure all your bids
          are in order before the deadline passes.
        </li>
        <li>
          You can place bids on any number of players. If your team, for
          example, needs two midfielders it will get the first two midfielders
          you have the highest bid on.
        </li>
        <li>
          You can only place one bid on each individual player. This bid is the
          max fee you're prepared to pay for the player. If your placed bid is
          the highest bid the actual fee you'll pay for the player will be
          adjusted so that is 0.5 higher than the second highest bid. Example:
          Team A bids 15.0 for player P. The second highest bid is 10.0 from
          team B. Team A will get the player for a fee of 10.5.
        </li>
        <li>
          Bids are handled in player season points order. Bids for the available
          player that has the most points of all the available players on the
          day of the bidding will be handled first. Bids for the player with the
          second most points will be handled second and so on. If two players
          have the same number of points their bids will be handled in
          alphabetical order.
        </li>
        <li>
          The player will join the team with the highest bid. If two or more
          teams have the same highest bid then the player will join the team
          that is lowest in the table.
        </li>
        <li>
          Funds spent on successful bids will be subtracted from bids that have
          not yet been handled. Example: Team A can spend 15.0 and bids 15.0 for
          player P and 15.0 for player L. Player P has more points than player L
          so bids on player P are handled first. Team A gets player P for 10.5.
          The highest bid team A can place now is 4.5 so the bid from Team A on
          player L is adjusted to 4.5.
        </li>
        <li>
          If a team does not manage to fill all its empty positions the owner
          can try again the next day. The transfer window will remain open and
          the bidding procedure repeated every day until all teams have full
          squads again.
        </li>
        <li>
          If a Premier League match day starts before all teams are full, the
          unlucky ones will have to play with reduced squads in that match day.
          The competition management will try to make sure there are enough days
          in a transfer window before the next match day so that everyone will
          have time to fill their squads again.
        </li>
        <li>
          If a match is moved so it's played earlier than the rest of the match
          day it belongs to and the transfer window, and a D11 team buys a
          player that played in that match then the points for that player in
          that match will be added to the points of the D11 team for that match
          day.
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Rules"
};
</script>

<style lang="scss" scoped>
.rules-table {
  col,
  th,
  td {
    text-align: left;
    //width: 130px;
  }
  th:not(.points-column),
  td:not(.points-column) {
    width: 130px;
  }

  th.points-column,
  td.points-column {
    width: 50px;
    text-align: right;
  }
  margin-bottom: $d11-large-spacer;
}
</style>
